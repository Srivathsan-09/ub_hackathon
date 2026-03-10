import httpx
import json
import redis
import os
from .database import SessionLocal
from .models import API, AuditLog

# Redis setup for caching
redis_client = redis.Redis(host='localhost', port=6379, db=0, decode_responses=True)

class AIRiskEngine:
    def __init__(self, ollama_url: str = "http://localhost:11434/api/generate"):
        self.ollama_url = ollama_url

    async def analyze_api(self, api_id: int):
        """
        Analyzes an API using a local LLM (Ollama) to determine risk scores and recommendations.
        """
        db = SessionLocal()
        try:
            api = db.query(API).filter(API.id == api_id).first()
            if not api:
                return {"error": "API not found"}

            # Check cache
            cache_key = f"api_risk_{api.id}_{api.endpoint}"
            cached_result = redis_client.get(cache_key)
            if cached_result:
                return json.loads(cached_result)

            # Prompt for LLM
            prompt = f"""
            Analyze the security risk for the following API:
            Name: {api.name}
            Endpoint: {api.endpoint}
            Source: {api.source}
            Status: {api.status}
            Request Count: {api.request_count}
            Last Used: {api.last_used}

            Provide a risk score (0-10), risk category (Low, Medium, High, Critical), 
            and a short security recommendation. Return ONLY JSON.
            Example: {{"score": 7.5, "category": "High", "recommendation": "Disable unused legacy endpoint"}}
            """

            try:
                async with httpx.AsyncClient(timeout=30.0) as client:
                    response = await client.post(self.ollama_url, json={
                        "model": "llama3",
                        "prompt": prompt,
                        "stream": False
                    })
                    
                    if response.status_code == 200:
                        result_text = response.json().get("response", "{}")
                        # Clean up result if LLM added markdown
                        result_text = re.sub(r'```json\n|\n```', '', result_text).strip()
                        result = json.loads(result_text)
                    else:
                        raise Exception("Ollama error")
            except Exception as e:
                print(f"Error calling Ollama: {e}")
                # Mock result if Ollama is unavailable
                result = {
                    "score": 8.0 if api.status == "Zombie" else 2.0,
                    "category": "Critical" if api.status == "Zombie" else "Low",
                    "recommendation": "Verify if endpoint is still needed and decommission if unused."
                }

            # Update API record
            api.risk_score = result.get("score", 0.0)
            api.risk_category = result.get("category", "Unknown")
            api.recommendation = result.get("recommendation", "No recommendation")
            db.commit()

            # Cache result for 1 hour
            redis_client.setex(cache_key, 3600, json.dumps(result))

            return result
        finally:
            db.close()

import re # needed for regex cleanup above 
