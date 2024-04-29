// import React from 'react';

import { UserCheck } from 'react-feather';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Header() {
    const [user, setUser] = useState('Admin');

    const handleChangeUser = () => {
        if (user === 'Admin') {
            setUser('Customer');
        } else {
            setUser('Admin');
        }
    };

    return (
        <div className=" basis-1/12 bg-orange-300 rounded-t-lg flex items-center justify-between">
            <div>
                <h1 className=" m-4 text-8xl font-bold text-orange-950 italic font-serif ">
                    Nice Cafe{' '}
                </h1>
            </div>
            <nav className=" font-bold m-4 text-orange-950">
                <div className=" flex justify-end m-2">
                    <div className=" flex gap-2">
                        <UserCheck onClick={handleChangeUser} /> <h2>{user}</h2>
                    </div>
                </div>
                <div className={user === 'Customer' && 'hidden'}>
                    <Link className="hover:text-orange-800" to="/">
                        Order
                    </Link>{' '}
                    |{' '}
                    <Link className="hover:text-orange-800" to="/product">
                        Product
                    </Link>{' '}
                    |
                    <Link className="hover:text-orange-800" to="/category">
                        {' '}
                        Category
                    </Link>{' '}
                    |
                    <Link className="hover:text-orange-800" to="/transaction">
                        {' '}
                        Transaction History
                    </Link>
                </div>
            </nav>
        </div>
    );
}
