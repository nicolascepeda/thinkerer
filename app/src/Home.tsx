import React, { useState } from 'react';
import './Home.css';
import { Message, Topic } from './model';
import WorldEvent from './WorldEvent';

const Home: React.FC = () => {
    const [currentTopic, setCurrentTopic] = useState<Topic | undefined>(undefined);
    const [inputValue, setInputValue] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [sending, setSending] = useState<boolean>(false)
    
    const suggestions : Topic[] = [
        {"type" : "world_event", "name" : "War in Ukrain"}, 
        {"type" : "world_event", "name" : "Israel-Palestina Conflict"}, 
        {"type" : "world_event", "name" : "World War II"}];

    const openTopic = (topic : Topic) => {
        setCurrentTopic(topic)
    }

    const sendMessage = async () => {
        setMessages([... messages, {"role" : "USER", "content" : inputValue}]);
        setSending(true);
        await fetch("http://localhost:8000/message/" + inputValue,
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "GET"
          })
          .then((response) => response.json())
          .then((topic: any) => {
            setMessages([... messages, {"role" : "USER", "content" : inputValue}, {"role" : "ASSISTANT", "topic" : topic}]);
            setSending(false)
            setInputValue('')
          });
    }

    const render = () => {
        if(currentTopic?.type == "world_event"){
            return <WorldEvent topic={currentTopic} close={() => setCurrentTopic(undefined)}></WorldEvent>
        }
        return renderHome();
    }

    const renderSuggestions = () => {
        return <div className="mb-4 suggestions">
        <h3 className="text-s font-normal text-gray-500">Which world event do you want to explore today?</h3>
          {suggestions.map((suggestion, index) => (
              <button
                  key={index}
                  className="text-sm brand-bg px-4 py-2 rounded-full mr-2 mb-2"
                  onClick={() => openTopic(suggestion)}
              >
                  {suggestion.name}
              </button>
          ))}
      </div>
    }

    const renderMessages = () => {
        return <div id="messageArea" className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg : Message, idx : number) => <div key={idx} className={"p-3 flex rounded items-center rounded max-w-xs " + (msg.role === "ASSISTANT" ? " brand-bg " : " bg-gray-200 ml-auto ") + (!!msg.topic ? " clickable " : "")} onClick={evt => msg.topic ? setCurrentTopic(msg.topic) : ''}>
                {msg.content ? msg.content : ''}

                {msg.topic ? <p>Let's see what we know about <strong>{msg.topic.name}</strong></p> : ''}
                {msg.topic ? <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg> : ''}
            </div>)}
            </div>
    }

    const renderHome = () => {
        return <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
            <div className="header">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Thinkerer</h1>
              <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">Breaking the bubble</p>
              <img src="/logo.png" className="logo"/>
            </div>

            {messages.length === 0 ? renderSuggestions() : renderMessages()}
            
            <div className="flex items-center">
                <input
                    type="text"
                    value={inputValue}
                    disabled={sending}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type your message here..."
                />
                <button className="ml-2 p-2 brand-bg text-black rounded-full" disabled={inputValue?.length === 0} onClick={evt => sendMessage()}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </div>
    }

    return render()
};

export default Home;
