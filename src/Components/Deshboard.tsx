import CovidGraph from './graph/CovidGraph';
import CovidMap from './Map/CovidMap'
import '../App.css'
function Deshboard() {
    return (
        <div className='w-full flex flex-col justify-center'>
            <div className='p-3 text-white text-xl font-bold bg-stone border border-gray-200 flex justify-center'>
                <div>
                    Graph for COVID-19 Cases
                </div>
            </div>
            <div className='w-full flex justify-center '>
                <div className='w-95% py-5 flex justify-center'>
                    <CovidGraph />
                </div>
            </div>
            <div className='p-3 text-white text-xl font-bold bg-stone border border-gray-200 flex justify-center'>
                <div>
                    Map for COVID-19 Cases
                </div>
            </div>
            <div className='w-full flex justify-center '>
                    <div className='w-95% py-5 relative'>
                        <CovidMap/>
                    </div>
                </div>
        </div>
    );
}

export default Deshboard;