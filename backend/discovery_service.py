import datetime
from sqlalchemy.orm import Session
from .models import API, AuditLog
from .database import SessionLocal

class DiscoveryService:
    @staticmethod
    def classify_apis():
        """
        Classifies APIs into Active, Deprecated, or Zombie based on traffic and code reference.
        """
        db = SessionLocal()
        try:
            apis = db.query(API).all()
            now = datetime.datetime.utcnow()
            zombie_threshold = now - datetime.timedelta(days=30)
            
            for api in apis:
                old_status = api.status
                
                # Logic:
                # 1. If last used is very old (or never), and source is not 'github' (not in code recently)
                if api.last_used < zombie_threshold and api.request_count < 5:
                    api.status = "Zombie"
                elif api.request_count > 0 and api.request_count < 20:
                    api.status = "Deprecated"
                elif api.request_count >= 20:
                    api.status = "Active"
                
                if old_status != api.status:
                    log = AuditLog(api_id=api.id, action=f"Status changed from {old_status} to {api.status}")
                    db.add(log)
            
            db.commit()
            return {"status": "Classification complete"}
        finally:
            db.close()

if __name__ == "__main__":
    DiscoveryService.classify_apis()
