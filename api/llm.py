import keys
from groq import Groq
import json
import re

client = Groq(api_key=keys.GROQ_API_KEY)

def complete_json(text, temperature=0.0,max_tokens=1024,json=False):
    res = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": text,
            }
        ],
        model="llama3-70b-8192", #llama3-8b-8192
        temperature=temperature,
        max_tokens=max_tokens,
        response_format= {"type": "json_object"}
    )
    return res.choices[0].message.content

def db_lookup(text, temperature=0.0,max_tokens=1024,json=False):
    titles = list(map(lambda x: x['title'], events_db))
    prompt = f"""
    Here are the world events that I already know of: {titles}
    Give me the index (starting at 0) of the closest, most relevant event to the given query: {text}.
    Make sure it's between 0 and {len(titles)-1}.
    If you can't find anything that is more than 50% relevant, return -1.
    Just return the number, nothing else. Only the number.
    """
    res = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="llama3-70b-8192", #llama3-8b-8192
        temperature=temperature,
        max_tokens=max_tokens,
        # response_format= {"type": "json_object"}
    )
    result = res.choices[0].message.content
    regex = re.compile(r'(-?\d+).*', flags=re.DOTALL)
    result = regex.search(result).group(1)
    result = int(result) if result is not None else -1
    return result

events_db = []

def world_event(topic_name):
    # do we have this topic cached?
    print("Size of events database:", len(events_db))
    
    found_index = db_lookup(topic_name)
    print("I found index", found_index)
    if found_index > -1:
        return events_db[found_index]
    events = []
    for year in ['2023', '2022', '2021']:

        prompt = f"""You are a talented political commentator who's able to comment on a political event from multiple angles. Keep your summary about the news politically neutral.

    Given the following world event {topic_name}

    Return a JSON with the following keys: 
    title, neutral_summary, events (list of relevant news about the topic)

    Every event has the following keys: date, title, neutral_summary, comments_political_left (array), comments_political_right (array)

    Return at least 5 events.
    Return the events from most recent to last recent.
    Make sure the event is in year {year}.
    Double-check the validity of the data. Make sure it's fact-based.

    Make sure that you respect the provided schema of the JSON object.
    Don't return anything else. Just the JSON."""
        res = complete_json(prompt)
        obj = json.loads(res)
        
        obj["summary"] = obj["neutral_summary"]
        del obj["neutral_summary"]
        
        for evt in obj["events"]:
            evt["summary"] = evt["neutral_summary"]
            del evt["neutral_summary"]

        # events.append(obj["events"])
        events += (obj["events"])
    
    obj["events"] = events

    events_db.append(obj)
    return obj

def company_news(company_name):
    return {"title" : "nothing yet here"}

def message_classifier(message):
    prompt = f"""Given the user inquiry <<<>>> which category best fits:
    - world_event
    - company_news
    - other
    
    <<<{message}>>>
    
    return ONLY a JSON with the following keys category, title
    """
    res = complete_json(prompt)
    obj = json.loads(res)
    return {"type" : obj['category'], "name" : obj['title']}
