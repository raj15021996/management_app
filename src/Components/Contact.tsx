import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import NotFound from './NotFound';
import AddContact from './Modal/AddContact';
import { deleteContactFromRedux } from '../redux/slice/ContactSlice';
interface FormInput {
    id: any;
    firstName: string;
    lastName: string;
    status: string;
}
interface RootState {
    contactDetail: FormInput[]; // Assuming `Contact` is the type for your contact object
}
const Contact = () => {
    const initialVal = { id: "", firstName: "", lastName: "", status: "" };
    const [show, setShow] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [editData, seteditData] = useState(initialVal)
    const dispatch = useDispatch()

    //get data from redux store
    const contactDetail = useSelector((state: RootState) => { return state.contactDetail });

    const handleDelete = (id: any) => {
        dispatch(deleteContactFromRedux(id)); //dispatch action
    };
    const handleEdit =(id: any) => {
        const formVal: any = contactDetail.find((item) => item.id === id)
        seteditData(formVal)
        setShowEdit(true)
    }
    return (
        <div className='p-10 text-white'>
            <div className="border-blue-950 border-2 rounded-lg">
                <div className='flex h-full items-center justify-center p-6 cursor-pointer bg-stone font-semibold text-xl'
                    onClick={() => setShow(true)}>
                    <div className='pr-4 text-2xl'>
                        <span><BsFillPersonPlusFill /></span>
                    </div>
                    <div>
                        <span>Add Contact</span>
                    </div>
                </div>
                {
                    contactDetail.length == 0 ?
                        <div className='flex h-full items-center justify-center '><NotFound /></div> :
                        <div className='flex flex-wrap'>
                            {
                                contactDetail.map((item) => (
                                    <div className=" w-20% bg-stone border border-gray-200 rounded-lg shadow  m-5 pt-5 px-3 min-w-max">

                                        <div className="flex flex-col items-center pb-10">
                                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                                <span>{item.firstName}</span><span className='mx-1'>{item.lastName}</span></h5>
                                            <span className="text-sm text-white-500 dark:text-white-400"><span className='mr-1'>Status:</span>{item.status}</span>
                                            <div className="flex mt-4 space-x-3 md:mt-6">
                                                <button onClick={() => handleEdit(item.id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</button>
                                                <button onClick={() => handleDelete(item.id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                }
                <div>
                    <AddContact show={show} setShow={setShow} editData={editData} seteditData={seteditData}
                        showEdit={showEdit} setShowEdit={setShowEdit} />
                </div>
            </div>

        </div>
    )
}
export default Contact;
