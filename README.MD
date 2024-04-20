# Thinkerer
Breaking thought Bubbles by reducing information biases.

## Setup

Clone this Repo
```
git clone git@github.com:nicolascepeda/thinkerer.git
```

### Frontend

Create a file called app/.env
```
REACT_APP_WHISPER_API_KEY="YOUR API KEY HERE"
REACT_APP_BACKEND_API="http://localhost:8000" # this should be a good default
```

Run the frontend
```
cd app
npm install
npm run
```

### Backend

Run the backend
```
cd api 
pip install -r requirements
python -m uvicorn index:app --reload
```