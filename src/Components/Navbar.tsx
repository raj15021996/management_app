import React from 'react';
import managementImg from '../assets/Image/management.png'
function Navbar() {
    return (
        <div className='h-14 bg-light-gray'>
            <div className='flex text-white text-2xl h-full font-semibold items-center p-6'>
               <img className='h-1/9' src={managementImg} alt='management'/> 
               <div>Management</div>
            </div>
        </div>
    );
}

export default Navbar;