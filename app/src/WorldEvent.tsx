import React, { useEffect, useState } from 'react';
import './WorldEvent.css';
import { useParams } from 'react-router-dom';
import { Topic } from './model';

interface Props {
  topic : Topic;
  close : Function;
}

const WorldEvent: React.FC<Props> = (props: Props) => {
    const [inited, setInited] = useState<boolean>(false);
    const [information, setInformation] = useState<any>(undefined);

    const [event, setEvent] = useState<any>(undefined);

    useEffect(() => {
      if(!inited){
        const fetchData = async () => {
          await fetch("http://localhost:8000/world_event/" + props.topic.name,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "GET"
          })
          .then((response) => response.json())
          .then((res: any) => {
            setInformation(res);
            setInited(true);
          });
      }
      fetchData()
        .catch(console.error);
    }
    }, []);

    const close = () => {
        props.close()
    }

    const timeline = () => {
        return <div className="timeline">
<ol className="relative border-s border-gray-200">
    {information?.events.map((evt : any) => <li className="mb-10 ms-4 clickable" key={evt.title} onClick={e => event == evt ? setEvent(undefined) : setEvent(evt)}>
            <div className="absolute w-3 h-3 brand-bg rounded-full mt-1.5 -start-1.5 border border-white border-gray-900"></div>
            <h3 className="text-lg font-semibold text-gray-900">{evt.title}</h3>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400">{evt.date}</time>
            <p className="mb-4 text-base font-normal text-gray-500">{evt.summary}</p>
            <p className="text-gray-500 text-sm text-right">
            {event == evt ? "Hide Comments" : "Show Comments"}
            </p>
            {event == evt ? <div className="comments">
              <ul className="text-gray-500 text-sm ">
                {evt.comments_political_left.map((comment:any) => <li>{comment}</li>)}
                {evt.comments_political_right.map((comment:any) => <li>{comment}</li>)}
              </ul>
            </div> : ''}
</li>)}
    </ol>
    </div>
    }

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
            <div className="header relative">
              <h1 className="mb-4 mr-10 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">{props.topic.name}</h1>
              <div className="absolute top-0 right-0 p-2 clickable" onClick={evt => close()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
            {inited ? 
                <div>
                    <p className="summary">{information.summary}</p>
                    {timeline()}
                </div>
                :
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-400 rounded"></div>
                <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-400 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-400 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-400 rounded"></div>
                </div>
                </div>
            </div>
            }
        </div>
    );
};

export default WorldEvent;
