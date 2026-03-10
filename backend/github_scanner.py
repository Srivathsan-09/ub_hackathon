import re
import httpx
import os
from typing import List, Dict
from .database import SessionLocal
from .models import API, AuditLog

# Regex to find common API route patterns in code (e.g., @app.get("/path"), router.get("/path"), axios.get("/path"))
ROUTE_PATTERNS = [
    r'@app\.(get|post|put|delete|patch)\(["\'](/.+?)["\']',
    r'router\.(get|post|put|delete|patch)\(["\'](/.+?)["\']',
    r'axios\.(get|post|put|delete|patch)\(["\'](/.+?)["\']',
]

class GitHubScanner:
    def __init__(self, token: str = None):
        self.token = token or os.getenv("GITHUB_TOKEN")
        self.headers = {"Authorization": f"token {self.token}"} if self.token else {}

    async def scan_repository(self, repo_url: str):
        """
        Simulates scanning a repository by searching for API routes in backend code.
        In a real scenario, this would use the GitHub API to list files and read contents.
        """
        print(f"Scanning repository: {repo_url}")
        
        # Simplified: We'll search for files like main.py, routes.py, etc.
        # For the demo, we'll simulate finding some endpoints
        discovered_endpoints = [
            {"name": "User Login", "endpoint": "/api/user/login"},
            {"name": "Payment Process", "endpoint": "/api/payment/process"},
            {"name": "Legacy Transfer", "endpoint": "/api/legacy-transfer"},
            {"name": "Old Auth", "endpoint": "/api/v1/old-auth"},
        ]
        
        db = SessionLocal()
        try:
            for ep in discovered_endpoints:
                # Check if it already exists
                existing = db.query(API).filter(API.endpoint == ep["endpoint"]).first()
                if not existing:
                    new_api = API(
                        name=ep["name"],
                        endpoint=ep["endpoint"],
                        source="github",
                        status="Active"
                    )
                    db.add(new_api)
                    db.commit()
                    db.refresh(new_api)
                    
                    # Log the discovery
                    log = AuditLog(api_id=new_api.id, action="Discovered via GitHub Scan")
                    db.add(log)
                    db.commit()
            return discovered_endpoints
        finally:
            db.close()

# For local testing/demo
if __name__ == "__main__":
    scanner = GitHubScanner()
    import asyncio
    asyncio.run(scanner.scan_repository("https://github.com/example/backend-api"))
