import React, { useEffect, useState } from 'react';
import './ViewTopic.css';
import { Topic } from './model';

interface Props {
  topic: Topic;
  close: Function;
}

const apiUrl = process.env.REACT_APP_BACKEND_API || "";

const ViewTopic: React.FC<Props> = (props: Props) => {
  const [inited, setInited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [information, setInformation] = useState<any>(undefined);

  const [event, setEvent] = useState<any>(undefined);

  useEffect(() => {
    if (!inited && !loading) {
      setLoading(true);
      console.log("Fetching data")

      const fetchData = async () => {
        await fetch(apiUrl + "/topic/" + props.topic.type + "/" + props.topic.name,
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
          
          {/*props.topic.type === "company2_news" ? <div id="area-chart">
            <div id="apexcharts9vw4g26tl" class="apexcharts-canvas apexcharts9vw4g26tl apexcharts-theme-light" style="width: 352px; height: 269px;">
              <svg id="SvgjsSvg1137" width="352" height="269" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev" class="apexcharts-svg apexcharts-zoomable hovering-zoom" xmlns:data="ApexChartsNS" transform="translate(0, 0)" style={"background: transparent;"}><foreignObject x="0" y="0" width="352" height="269"><div class="apexcharts-legend" xmlns="http://www.w3.org/1999/xhtml" style="max-height: 134.5px;"></div></foreignObject><rect id="SvgjsRect1142" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe"></rect><g id="SvgjsG1183" class="apexcharts-yaxis" rel="0" transform="translate(-18, 0)"></g><g id="SvgjsG1139" class="apexcharts-inner apexcharts-graphical" transform="translate(2, 30)"><defs id="SvgjsDefs1138"><clipPath id="gridRectMask9vw4g26tl"><rect id="SvgjsRect1144" width="358" height="217" x="-5" y="-5" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><clipPath id="forecastMask9vw4g26tl"></clipPath><clipPath id="nonForecastMask9vw4g26tl"></clipPath><clipPath id="gridRectMarkerMask9vw4g26tl"><rect id="SvgjsRect1145" width="352" height="211" x="-2" y="-2" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fff"></rect></clipPath><linearGradient id="SvgjsLinearGradient1150" x1="0" y1="0" x2="0" y2="1"><stop id="SvgjsStop1151" stop-opacity="0.55" stop-color="rgba(26,86,219,0.55)" offset="0"></stop><stop id="SvgjsStop1152" stop-opacity="0" stop-color="rgba(28,100,242,0)" offset="1"></stop><stop id="SvgjsStop1153" stop-opacity="0" stop-color="rgba(28,100,242,0)" offset="1"></stop></linearGradient></defs><line id="SvgjsLine1143" x1="347.5" y1="0" x2="347.5" y2="207" stroke="#b6b6b6" stroke-dasharray="3" stroke-linecap="butt" class="apexcharts-xcrosshairs" x="347.5" y="0" width="1" height="207" fill="#b1b9c4" filter="none" fill-opacity="0.9" stroke-width="1"></line><g id="SvgjsG1156" class="apexcharts-grid"><g id="SvgjsG1157" class="apexcharts-gridlines-horizontal" style="display: none;"><line id="SvgjsLine1160" x1="0" y1="0" x2="348" y2="0" stroke="#e0e0e0" stroke-dasharray="4" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1161" x1="0" y1="20.7" x2="348" y2="20.7" stroke="#e0e0e0" stroke-dasharray="4" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1162" x1="0" y1="41.4" x2="348" y2="41.4" stroke="#e0e0e0" stroke-dasharray="4" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1163" x1="0" y1="62.099999999999994" x2="348" y2="62.099999999999994" stroke="#e0e0e0" stroke-dasharray="4" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1164" x1="0" y1="82.8" x2="348" y2="82.8" stroke="#e0e0e0" stroke-dasharray="4" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1165" x1="0" y1="103.5" x2="348" y2="103.5" stroke="#e0e0e0" stroke-dasharray="4" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1166" x1="0" y1="124.2" x2="348" y2="124.2" stroke="#e0e0e0" stroke-dasharray="4" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1167" x1="0" y1="144.9" x2="348" y2="144.9" stroke="#e0e0e0" stroke-dasharray="4" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1168" x1="0" y1="165.6" x2="348" y2="165.6" stroke="#e0e0e0" stroke-dasharray="4" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1169" x1="0" y1="186.29999999999998" x2="348" y2="186.29999999999998" stroke="#e0e0e0" stroke-dasharray="4" stroke-linecap="butt" class="apexcharts-gridline"></line><line id="SvgjsLine1170" x1="0" y1="206.99999999999997" x2="348" y2="206.99999999999997" stroke="#e0e0e0" stroke-dasharray="4" stroke-linecap="butt" class="apexcharts-gridline"></line></g><g id="SvgjsG1158" class="apexcharts-gridlines-vertical" style="display: none;"></g><line id="SvgjsLine1172" x1="0" y1="207" x2="348" y2="207" stroke="transparent" stroke-dasharray="0" stroke-linecap="butt"></line><line id="SvgjsLine1171" x1="0" y1="1" x2="0" y2="207" stroke="transparent" stroke-dasharray="0" stroke-linecap="butt"></line></g><g id="SvgjsG1159" class="apexcharts-grid-borders" style="display: none;"></g><g id="SvgjsG1146" class="apexcharts-area-series apexcharts-plot-series"><g id="SvgjsG1147" class="apexcharts-series" zIndex="0" seriesName="Newxusers" data:longestSeries="true" rel="1" data:realIndex="0"><path id="SvgjsPath1154" d="M 0 207 L 0 41.400000000000546C 24.359999999999996 41.400000000000546 45.239999999999995 126.27000000000044 69.6 126.27000000000044C 93.96 126.27000000000044 114.83999999999999 86.94000000000051 139.2 86.94000000000051C 163.56 86.94000000000051 184.44 14.490000000000691 208.8 14.490000000000691C 233.16 14.490000000000691 254.04 190.4400000000005 278.4 190.4400000000005C 302.76 190.4400000000005 323.64 86.94000000000051 348 86.94000000000051C 348 86.94000000000051 348 86.94000000000051 348 207M 348 86.94000000000051z" fill="url(#SvgjsLinearGradient1150)" fill-opacity="1" stroke-opacity="1" stroke-linecap="butt" stroke-width="0" stroke-dasharray="0" class="apexcharts-area" index="0" clip-path="url(#gridRectMask9vw4g26tl)" pathTo="M 0 207 L 0 41.400000000000546C 24.359999999999996 41.400000000000546 45.239999999999995 126.27000000000044 69.6 126.27000000000044C 93.96 126.27000000000044 114.83999999999999 86.94000000000051 139.2 86.94000000000051C 163.56 86.94000000000051 184.44 14.490000000000691 208.8 14.490000000000691C 233.16 14.490000000000691 254.04 190.4400000000005 278.4 190.4400000000005C 302.76 190.4400000000005 323.64 86.94000000000051 348 86.94000000000051C 348 86.94000000000051 348 86.94000000000051 348 207M 348 86.94000000000051z" pathFrom="M -1 6768.900000000001 L -1 6768.900000000001 L 69.6 6768.900000000001 L 139.2 6768.900000000001 L 208.8 6768.900000000001 L 278.4 6768.900000000001 L 348 6768.900000000001"></path><path id="SvgjsPath1155" d="M 0 41.400000000000546C 24.359999999999996 41.400000000000546 45.239999999999995 126.27000000000044 69.6 126.27000000000044C 93.96 126.27000000000044 114.83999999999999 86.94000000000051 139.2 86.94000000000051C 163.56 86.94000000000051 184.44 14.490000000000691 208.8 14.490000000000691C 233.16 14.490000000000691 254.04 190.4400000000005 278.4 190.4400000000005C 302.76 190.4400000000005 323.64 86.94000000000051 348 86.94000000000051" fill="none" fill-opacity="1" stroke="#1a56db" stroke-opacity="1" stroke-linecap="butt" stroke-width="6" stroke-dasharray="0" class="apexcharts-area" index="0" clip-path="url(#gridRectMask9vw4g26tl)" pathTo="M 0 41.400000000000546C 24.359999999999996 41.400000000000546 45.239999999999995 126.27000000000044 69.6 126.27000000000044C 93.96 126.27000000000044 114.83999999999999 86.94000000000051 139.2 86.94000000000051C 163.56 86.94000000000051 184.44 14.490000000000691 208.8 14.490000000000691C 233.16 14.490000000000691 254.04 190.4400000000005 278.4 190.4400000000005C 302.76 190.4400000000005 323.64 86.94000000000051 348 86.94000000000051" pathFrom="M -1 6768.900000000001 L -1 6768.900000000001 L 69.6 6768.900000000001 L 139.2 6768.900000000001 L 208.8 6768.900000000001 L 278.4 6768.900000000001 L 348 6768.900000000001" fill-rule="evenodd"></path><g id="SvgjsG1148" class="apexcharts-series-markers-wrap apexcharts-hidden-element-shown" data:realIndex="0"><g class="apexcharts-series-markers"><circle id="SvgjsCircle1187" r="0" cx="348" cy="86.94000000000051" class="apexcharts-marker wb8uemykk no-pointer-events" stroke="#ffffff" fill="#1a56db" fill-opacity="1" stroke-width="2" stroke-opacity="0.9" default-marker-size="0"></circle></g></g></g><g id="SvgjsG1149" class="apexcharts-datalabels" data:realIndex="0"></g></g><line id="SvgjsLine1173" x1="0" y1="0" x2="348" y2="0" stroke="#b6b6b6" stroke-dasharray="0" stroke-width="1" stroke-linecap="butt" class="apexcharts-ycrosshairs"></line><line id="SvgjsLine1174" x1="0" y1="0" x2="348" y2="0" stroke-dasharray="0" stroke-width="0" stroke-linecap="butt" class="apexcharts-ycrosshairs-hidden"></line><g id="SvgjsG1175" class="apexcharts-xaxis" transform="translate(0, 0)"><g id="SvgjsG1176" class="apexcharts-xaxis-texts-g" transform="translate(0, 4)"></g></g><g id="SvgjsG1184" class="apexcharts-yaxis-annotations"></g><g id="SvgjsG1185" class="apexcharts-xaxis-annotations"></g><g id="SvgjsG1186" class="apexcharts-point-annotations"></g><rect id="SvgjsRect1188" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe" class="apexcharts-zoom-rect"></rect><rect id="SvgjsRect1189" width="0" height="0" x="0" y="0" rx="0" ry="0" opacity="1" stroke-width="0" stroke="none" stroke-dasharray="0" fill="#fefefe" class="apexcharts-selection-rect"></rect></g></svg><div class="apexcharts-tooltip apexcharts-theme-light" style="left: 184.734px; top: 89.94px;"><div class="apexcharts-tooltip-series-group apexcharts-active" style="order: 1; display: flex;"><span class="apexcharts-tooltip-marker" style="background-color: rgb(26, 86, 219);"></span><div class="apexcharts-tooltip-text" style="font-family: Inter, sans-serif; font-size: 12px;"><div class="apexcharts-tooltip-y-group"><span class="apexcharts-tooltip-text-y-label">New users: </span><span class="apexcharts-tooltip-text-y-value">6456</span></div><div class="apexcharts-tooltip-goals-group"><span class="apexcharts-tooltip-text-goals-label"></span><span class="apexcharts-tooltip-text-goals-value"></span></div><div class="apexcharts-tooltip-z-group"><span class="apexcharts-tooltip-text-z-label"></span><span class="apexcharts-tooltip-text-z-value"></span></div></div></div></div><div class="apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom apexcharts-theme-light" style="left: 296.297px; top: 239px;"><div class="apexcharts-xaxistooltip-text" style="font-family: Inter, sans-serif; font-size: 12px; min-width: 63.1719px;">06 February</div></div><div class="apexcharts-yaxistooltip apexcharts-yaxistooltip-0 apexcharts-yaxistooltip-left apexcharts-theme-light"><div class="apexcharts-yaxistooltip-text"></div></div></div></div>
  : ''*/}
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
