import React, { useEffect, useState } from 'react';
import { Topic } from './model';

interface Props {
  event : any;
  close : Function;
}

const ViewDetails: React.FC<Props> = (props: Props) => {
    const close = () => {
        props.close()
    }

    console.log("event:", props.event)

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
            <div className="header relative">
              <h1 className="mb-4 mr-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">{props.event.title}</h1>
              <div className="absolute top-0 right-0 p-2 clickable" onClick={evt => close()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
                <div>
                    <p className="summary">{props.event.summary}</p>
                </div>
        </div>
    );
};

export default ViewDetails;
