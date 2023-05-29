import React from 'react';
import { RxCrossCircled} from 'react-icons/rx';

function NotFound() {
    return (
        <div className='bg-light-white flex justify-around p-5 border "border-blue-950 h-full items-center bg-stone m-4 rounded-lg '>
            <div className='px-3 text-2xl text-red'>
              <span >
                <RxCrossCircled/>
              </span>
            </div>
            <div>
                <span>
                    No contact found. Please add contact from create contact button
                </span>
            </div>
        </div>
    );
}

export default NotFound;