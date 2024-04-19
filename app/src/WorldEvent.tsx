import React, { useState } from 'react';
import './WorldEvent.css';
import { useParams } from 'react-router-dom';

const WorldEvent: React.FC = (props) => {
    const { name } = useParams(); 

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
            <div className="header">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">{name}</h1>
            </div>
        </div>
    );
};

export default WorldEvent;
