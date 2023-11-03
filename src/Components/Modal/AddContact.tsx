import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import {Card,Input} from "@material-tailwind/react";
import { addContactToRedux, editContactInRedux } from "../../redux/slice/ContactSlice";

type ContactProps = {
    show: boolean;
    editData: any;
    showEdit: boolean;
    setShowEdit: (showEdit: boolean) => void;
    setShow: (open: boolean) => void;
    seteditData: (editData: any) => void;
};
interface FormInput {
    id: any;
    firstName: string;
    lastName: string;
    status: string;
}
export default function AddContact({ show, setShow, editData, seteditData, showEdit, setShowEdit }: ContactProps) {

    const initialVal: FormInput = { id: "", firstName: "", lastName: "", status: "" };
    const [formInputField, setFormInputField] = useState<FormInput>(editData);
    const [errorMessage, setErrorMessage] = useState<Partial<FormInput>>({});
    const dispatch = useDispatch()
    const handleClose = () => {
        setShow(false);
        setShowEdit(false)
        setErrorMessage({})
        seteditData(initialVal)
    }

    useEffect(() => {
        setFormInputField(editData);
    }, [editData]);

    //getting random id from uuid
    const generateRandomId = () => {
        const randomId = uuidv4();
        return randomId;
    };
    //update data
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormInputField({ ...formInputField, [name]: value });
    };
    //validate input data
    const validate = (values: any) => {
        const errors: any = {};
        if (values.firstName === "") {
            errors.firstName = "First name is required.";
        }
        if (values.lastName === "") {
            errors.lastName = "Last Name is required.";
        }
        if (values.status === "") {
            errors.status = "Status is required.";
        }
        return errors;
    };

    const handleformsubmit = () => {
        const formError: any = validate(formInputField)
        formInputField.id = generateRandomId();
        const updatedContact: FormInput = {
            id: editData.id,
            firstName: formInputField.firstName,
            lastName: formInputField.lastName,
            status: formInputField.status,
        };
        if (Object.keys(formError).length > 0) {
            setErrorMessage(formError)
        }
        else {
            if (showEdit) {
                dispatch(editContactInRedux(updatedContact)); //edit action dispatch
            } else {
                dispatch(addContactToRedux(formInputField));  //add contact actioin dispatch
            }
            seteditData(initialVal);
            setFormInputField(initialVal);
            setShow(false);
            setShowEdit(false);
        }
    }
    return (
        <>
            {(show || showEdit) ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto mt-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t text-black">
                                    <h3 className="text-3xl font-semibold text-black">
                                        Contact Detail
                                    </h3>
                                    <button
                                        className="p-1 ml-auto border-0  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={handleClose}
                                    >
                                        <span className="">
                                            x
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <Card color="transparent" shadow={false} className="p-4">
                                    <form className=" mb-2 w-80 max-w-screen-lg sm:w-96 text-black">
                                        <div className="mb-4 flex flex-col gap-1">
                                            <div className="flex">
                                                <div className="w-25% mr-1">
                                                    <label>First Name</label>
                                                </div>
                                                <div className="w-80%">
                                                    <Input size="lg" className="border-blue-950"
                                                        name="firstName"
                                                        value={formInputField.firstName}
                                                        onChange={handleChange}
                                                    />
                                                    <div>
                                                        <div className="text-red">{errorMessage.firstName}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex mt-2">
                                                <div className="w-25% mr-1">
                                                    <label>Last Name</label>
                                                </div>
                                                <div className="w-80%">
                                                    <Input size="lg" className="border-blue-950"
                                                        name="lastName"
                                                        value={formInputField.lastName}
                                                        onChange={handleChange}
                                                    />
                                                    <div>
                                                        <div className="text-red">{errorMessage.lastName}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex mt-10">
                                                <div className="w-25% mr-1">
                                                    <label>Status</label>
                                                </div>
                                                <div className="w-80%">
                                                    <div className="mb-[0.125rem] block min-h-[1.5rem] ">
                                                        <input
                                                            type="radio"
                                                            name="status"
                                                            value='Active'
                                                            checked={formInputField.status === 'Active'}
                                                            onClick={handleChange}
                                                            id="radioDefault01" />

                                                        <label
                                                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                                        >
                                                            Active
                                                        </label>
                                                    </div>
                                                    <div className="mb-[0.125rem] block min-h-[1.5rem] ">
                                                        <input
                                                            type="radio"
                                                            name="status"
                                                            value="Inactive"
                                                            checked={formInputField.status === 'Inactive'}
                                                            onClick={handleChange}
                                                            id="radioDefault02"
                                                        />
                                                        <label
                                                            className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                                                        >
                                                            Inactive
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <div className="text-red">{errorMessage.status}</div>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </form>
                                </Card>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={handleformsubmit}
                                    >
                                        Save Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}