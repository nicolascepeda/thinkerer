from fastapi import FastAPI, Response, Depends, HTTPException,Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.datastructures import MutableHeaders

import json
import logging

# python -m uvicorn index:app --reload
 
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost","http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/example-get")
def global_vars(user_id: int = Depends(get_auth)):
    return "test"

@app.post("/example-post/{type}/")
def thought_gpt(example):
    print("Object: ", example)
    return "asdas"