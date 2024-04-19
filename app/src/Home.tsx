import React, { useState } from 'react';
import './Home.css';

const Home: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessage] = useState([]);
    

    const suggestions = ["War in Ukrain", "Israel-Palestina Conflict", "Tesla", "OpenAI", "META"];

    const open = (topic : string) => {
        document.location.href = "/world_event/" + topic
    }

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
            <div className="header">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Thinkerer</h1>
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">Breaking the bubble</p>
              <img src="/logo.png" className="logo"/>
            </div>

            {messages.length === 0 ?
            <div className="mb-4 suggestions">
            <h3 className="text-s font-normal text-gray-500">What do you want to explore today?</h3>
              {suggestions.map((suggestion, index) => (
                  <button
                      key={index}
                      className="text-sm brand-bg px-4 py-2 rounded-full mr-2 mb-2"
                      onClick={() => open(suggestion)}
                  >
                      {suggestion}
                  </button>
              ))}
          </div>
          :
          <div id="messageArea" className="flex-1 overflow-y-auto p-4 space-y-4">
    <div className="p-3 rounded brand-bg max-w-xs">Hello, how can I help you today?</div>
    <div className="p-3 rounded bg-gray-200 max-w-xs ml-auto">I need help with TailwindCSS.</div>
    <div className="p-3 flex rounded items-center brand-bg max-w-xs clickable" onClick={evt => open("test")}>Sure, what do you need help with?
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
    </div>
  </div>}
            
            <div className="flex items-center">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message here..."
                />
                <button className="ml-2 p-2 bg-gray-500 text-white rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.172 7l-6.586 6.586a2 2 0 101.414 1.414L16.586 8.414a2 2 0 00-2.828-2.828l-6.364 6.364"
                        />
                    </svg>
                </button>
                <button className="ml-2 p-2 bg-gray-300 text-gray-700 rounded-full">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 18.75V5.25m0 13.5V21m0-15.75l-3 3m3-3l3 3m-3-3v13.5m6-10.5a9 9 0 11-12 0"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Home;
