import keys
from groq import Groq
import json

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

def world_event(topic_name):
    prompt = f"""You are a talented political commentator who's able to comment on a political event from multiple angles. Keep your summary about the news politically neutral.

Given the following world event {topic_name}

Return a JSON with the following keys: 
title, neutral_summary, events (list of relevant news about the topic)

Every event has the following keys: date, title, neutral_summary, comments_political_left (array), comments_political_right (array)

Make sure that you respect the provided schema of the JSON object.
Don't return anything else. Just the JSON."""
    res = complete_json(prompt)
    obj = json.loads(res)
    
    obj["summary"] = obj["neutral_summary"]
    del obj["neutral_summary"]
    
    for evt in obj["events"]:
        evt["summary"] = evt["neutral_summary"]
        del evt["neutral_summary"]
        evt['comments'] = []
        if evt['comments_political_left']:
            for com in evt['comments_political_left']:
                evt['comments'].append({"content" : com, "type" : "political_left"})
        if evt['comments_political_right']:
            for com in evt['comments_political_right']:
                evt['comments'].append({"content" : com, "type" : "political_right"})
    
    return obj

def company_news(company_name):
    prompt = f"""You are a financial analyst commentator who's able to comment the performance of companies from multiple angles.

Given the following company {company_name}

Return a JSON with the following keys: 
title, neutral_summary, events (list of relevant news about the company)

Every event has the following keys: date, title, neutral_summary, comments_bullish (array), comments_bearish (array), sentiment_score (-5 for very bad, 5 for very good)

Make sure that you respect the provided schema of the JSON object.
Don't return anything else. Just the JSON."""
    res = complete_json(prompt)
    obj = json.loads(res)
    
    obj["summary"] = obj["neutral_summary"]
    
    for evt in obj["events"]:
        evt["summary"] = evt["neutral_summary"]
        del evt["neutral_summary"]
        
        evt['comments'] = []
        evt['sentiment_score'] = int(evt['sentiment_score'])
        if evt['comments_bullish']:
            for com in evt['comments_bullish']:
                evt['comments'].append({"content" : com, "type" : "bullish"})
        if evt['comments_bearish']:
            for com in evt['comments_bearish']:
                evt['comments'].append({"content" : com, "type" : "bearish"})
    
    return obj

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