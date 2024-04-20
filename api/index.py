from fastapi import FastAPI, Response, Depends, HTTPException,Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.datastructures import MutableHeaders

import json
import logging
import llm
import time


# python -m uvicorn index:app --reload
 
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost","http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/topic/{topic_type}/{topic_name}")
def topic_information(topic_type, topic_name):
    if topic_type == "world_event":
      return llm.world_event(topic_name)
    if topic_name == "company_news":
      return llm.company_news(topic_name)
    

@app.get("/message/{message}")
def get_message(message):
    return llm.message_classifier(message)