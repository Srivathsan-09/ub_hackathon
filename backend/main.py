from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
import models, database, github_scanner, k8s_scanner, nginx_parser, discovery_service, ai_risk
from database import get_db

models.Base.metadata.create_all(bind=database.engine)

app = FastAPI(title="Zombie API Discovery & Defense")
ai_engine = ai_risk.AIRiskEngine()

@app.get("/")
def read_root():
    return {"message": "Welcome to Zombie API Discovery & Defense API"}

@app.get("/apis", response_model=List[dict])
def get_all_apis(db: Session = Depends(get_db)):
    apis = db.query(models.API).all()
    return [
        {
            "id": a.id, "name": a.name, "endpoint": a.endpoint, 
            "source": a.source, "status": a.status, 
            "last_used": a.last_used, "request_count": a.request_count,
            "risk_score": a.risk_score, "risk_category": a.risk_category
        } for a in apis
    ]

@app.get("/apis/zombies")
def get_zombie_apis(db: Session = Depends(get_db)):
    zombies = db.query(models.API).filter(models.API.status == "Zombie").all()
    return zombies

@app.post("/scan/github")
async def scan_github(repo_url: str = "https://github.com/demo/api", db: Session = Depends(get_db)):
    scanner = github_scanner.GitHubScanner()
    results = await scanner.scan_repository(repo_url)
    return {"status": "success", "discovered": len(results)}

@app.post("/scan/kubernetes")
def scan_kubernetes(namespace: str = "default", db: Session = Depends(get_db)):
    scanner = k8s_scanner.K8sScanner()
    results = scanner.scan_services(namespace)
    return {"status": "success", "discovered": len(results)}

@app.post("/scan/nginx")
def scan_nginx(db: Session = Depends(get_db)):
    parser = nginx_parser.NginxParser()
    results = parser.parse_logs()
    # Trigger classification after log parsing
    discovery_service.DiscoveryService.classify_apis()
    return {"status": "success", "traffic_points": len(results)}

@app.post("/analyze/{api_id}")
async def run_ai_analysis(api_id: int):
    result = await ai_engine.analyze_api(api_id)
    return result

@app.post("/remediate")
def remediate_api(api_id: int, action: str, db: Session = Depends(get_db)):
    api = db.query(models.API).filter(models.API.id == api_id).first()
    if not api:
        raise HTTPException(status_code=404, detail="API not found")
    
    api.status = "Decommissioned" if action == "disable" else api.status
    log = models.AuditLog(api_id=api_id, action=f"Remediation: {action}")
    db.add(log)
    db.commit()
    return {"status": "success", "action": action}
