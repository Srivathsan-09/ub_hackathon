import datetime
from database import SessionLocal
from models import API, AuditLog

def generate_demo_data():
    """
    Generates fake APIs to demonstrate discovery and zombie detection.
    """
    db = SessionLocal()
    try:
        demo_apis = [
            {
                "name": "User Authentication",
                "endpoint": "/api/user/login",
                "source": "github",
                "status": "Active",
                "request_count": 500,
                "last_used": datetime.datetime.utcnow()
            },
            {
                "name": "Payment Processing",
                "endpoint": "/api/payment/process",
                "source": "kubernetes",
                "status": "Active",
                "request_count": 250,
                "last_used": datetime.datetime.utcnow()
            },
            {
                "name": "Legacy Data Transfer",
                "endpoint": "/api/legacy-transfer",
                "source": "github",
                "status": "Zombie",
                "request_count": 0,
                "last_used": datetime.datetime.utcnow() - datetime.timedelta(days=45)
            },
            {
                "name": "Old Auth v1",
                "endpoint": "/api/v1/old-auth",
                "source": "kubernetes",
                "status": "Zombie",
                "request_count": 2,
                "last_used": datetime.datetime.utcnow() - datetime.timedelta(days=60)
            },
            {
                "name": "Internal Debug",
                "endpoint": "/api/internal/debug",
                "source": "nginx",
                "status": "Deprecated",
                "request_count": 10,
                "last_used": datetime.datetime.utcnow() - datetime.timedelta(days=5)
            }
        ]

        for api_data in demo_apis:
            existing = db.query(API).filter(API.endpoint == api_data["endpoint"]).first()
            if not existing:
                api = API(**api_data)
                db.add(api)
                db.commit()
                db.refresh(api)
                
                log = AuditLog(api_id=api.id, action="Generated for Demo")
                db.add(log)
                db.commit()
        
        print("Demo data generated successfully.")
    finally:
        db.close()

if __name__ == "__main__":
    generate_demo_data()
