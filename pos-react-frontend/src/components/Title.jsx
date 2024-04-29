/* eslint-disable react/prop-types */
// import React from 'react';

export default function Title({ title }) {
    return (
        <div className=" m-4 bg-orange-200 text-orange-950 basis-6/12">
            <h1 className=" text-4xl font-bold">{title}</h1>
        </div>
    );
}
