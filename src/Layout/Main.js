import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <h3 className='text-center p-3'>User Authentication</h3>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;