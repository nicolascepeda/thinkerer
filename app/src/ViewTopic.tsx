import React, { useEffect, useState } from 'react';
import './ViewTopic.css';
import { Topic } from './model';

interface Props {
  topic: Topic;
  close: Function;
}

const ViewTopic: React.FC<Props> = (props: Props) => {
  const [inited, setInited] = useState<boolean>(false);
  const [information, setInformation] = useState<any>(undefined);

  const [event, setEvent] = useState<any>(undefined);

  useEffect(() => {
    if (!inited) {
      const fetchData = async () => {
        await fetch("http://localhost:8000/topic/" + props.topic.type + "/" + props.topic.name,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "GET"
          })
          .then((response) => response.json())
          .then((res: any) => {
            if (!inited && !information) {
              setInformation(res);
              setInited(true);
            }
          });
      }
      fetchData()
        .catch(console.error);
    }
  }, [props.topic.name, inited]);

  const close = () => {
    props.close()
  }

  const downIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 inline-block text-red-400">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
  </svg>

  const upIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 inline-block text-green-400">
    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
  </svg>

  const renderComment = (comment: any) => {
    if (comment.type === "bearish") {
      return <p>{comment.content} {downIcon}</p>
    }
    if (comment.type === "bullish") {
      return <p>{comment.content} {upIcon}
      </p>
    }

    return <p>{comment.content}</p>
  }

  const timeline = () => {
    return <div className="timeline">
      <ol className="relative border-s border-gray-200">
        {information?.events.map((evt: any, idx: number) => <li className="mb-10 ms-4 clickable" key={evt.title} onClick={e => event === evt ? setEvent(undefined) : setEvent(evt)}>
          <div className="absolute w-3 h-3 brand-bg rounded-full mt-1.5 -start-1.5 border border-white border-gray-900"></div>
          <h3 className="text-lg font-semibold text-gray-900">
            {evt.sentiment_score > 0 ? upIcon : ''}
            {evt.sentiment_score < 0 ? downIcon : ''}
            {evt.title}
          </h3>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400">{evt.date}</time>
          <p className="mb-4 text-base font-normal text-gray-500">{evt.summary}</p>
          <p className="text-gray-500 text-sm text-right">
            {event === evt ? "Hide Comments" : "Show Comments"}
          </p>
          {event === evt ? <div className="comments">
            <ul className="text-gray-500 text-sm ">
              {evt.comments.map((comment: any, idx: number) => <li key={idx}>{renderComment(comment)}</li>)}
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

export default ViewTopic;
