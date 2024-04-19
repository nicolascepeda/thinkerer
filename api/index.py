from fastapi import FastAPI, Response, Depends, HTTPException,Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from starlette.datastructures import MutableHeaders

import json
import logging
import llm


# python -m uvicorn index:app --reload
 
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost","http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/world_event/{name}")
def get_world_event(name):
    return {
    "title" : "Ukrain War",
    "type" : "world_event",
    "summary" : "The conflict in Ukraine began with Russia's annexation of Crimea in 2014, followed by the war in Donbass. It has resulted in significant casualties and displacements. Efforts for resolution face challenges due to geopolitical tensions. Political factions advocate for differing approaches, ranging from diplomatic solutions to more assertive responses. The conflict remains unresolved, with sporadic violence continuing.",
    "events": [
      {
        "date": "2014",
        "title": "Annexation of Crimea by Russia",
        "summary": "Following political turmoil in Ukraine, Russia annexes Crimea, sparking international condemnation and sanctions.",
        "comments_political_left": ["Seen as a violation of international law and Ukrainian sovereignty, prompting condemnation and sanctions from the left-leaning political groups."],
        "comments_political_right": ["Some right-leaning groups argue for a more assertive response against Russia, emphasizing the need to defend Ukrainian sovereignty."]
      },
      {
        "date": "2014-2015",
        "title": "War in Donbass",
        "summary": "Conflict erupts between Ukrainian government forces and pro-Russian separatists in the Donbass region, leading to thousands of deaths and displacements.",
        "comments_political_left": ["Many left-leaning groups advocate for a peaceful resolution to the conflict, emphasizing diplomacy and dialogue."],
        "comments_political_right": ["Some right-leaning factions support a more militaristic approach, calling for increased support for Ukrainian armed forces and a harder stance against the separatists."]
      },
      {
        "date": "2019",
        "title": "Election of Volodymyr Zelensky",
        "summary": "Comedian and political newcomer Volodymyr Zelensky wins the Ukrainian presidential election in a landslide victory, promising anti-corruption reforms and peace.",
        "comments_political_left": ["Seen as a win for progressive forces, Zelensky's election is welcomed by left-leaning groups hopeful for reform and peace initiatives."],
        "comments_political_right": ["Some right-leaning factions express skepticism about Zelensky's lack of political experience and ability to handle the complex challenges facing Ukraine."]
      },
      {
        "date": "2022",
        "title": "Renewal of Conflict in Eastern Ukraine",
        "summary": "Renewed clashes occur between Ukrainian forces and separatists in Eastern Ukraine, leading to fears of a further escalation of the conflict.",
        "comments_political_left": ["Many left-leaning groups call for renewed efforts towards a peaceful resolution, urging dialogue and negotiation to end the violence."],
        "comments_political_right": ["Some right-leaning factions advocate for a tougher response to the separatists, including increased military support for Ukrainian forces and a more aggressive stance against Russia's involvement."]
      }
    ]
  }

@app.get("/message/{message}")
def get_message(message):
    prompt = f"""Given the user inquiry <<<>>> which category best fits:
    - world_event
    - company_news
    - other
    
    <<<{message}>>>
    
    return ONLY a JSON with the following keys category, title
    """
    res = llm.complete_json(prompt)
    obj = json.loads(res)
    return {"type" : obj['category'], "name" : obj['title']}