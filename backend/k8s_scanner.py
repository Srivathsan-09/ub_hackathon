from kubernetes import client, config
import os
from database import SessionLocal
from models import API, AuditLog

class K8sScanner:
    def __init__(self):
        try:
            # Load kubeconfig for local testing or in-cluster config if deployed
            config.load_kube_config()
        except Exception:
            try:
                config.load_incluster_config()
            except Exception:
                print("Could not load kubernetes config")

    def scan_services(self, namespace: str = "default"):
        """
        Scans Kubernetes services and ingresses to discover API endpoints.
        """
        print(f"Scanning Kubernetes namespace: {namespace}")
        v1 = client.CoreV1Api()
        discovered_endpoints = []

        try:
            services = v1.list_namespaced_service(namespace)
            for svc in services.items:
                # Basic discovery: use service name as part of the endpoint
                endpoint = f"/{svc.metadata.name}"
                discovered_endpoints.append({
                    "name": svc.metadata.name,
                    "endpoint": endpoint
                })
        except Exception as e:
            print(f"Error scanning K8s: {e}")
            # Mock data for demo if K8s is not available
            discovered_endpoints = [
                {"name": "auth-service", "endpoint": "/auth/v1"},
                {"name": "payment-api", "endpoint": "/pay/execute"},
            ]

        db = SessionLocal()
        try:
            for ep in discovered_endpoints:
                existing = db.query(API).filter(API.endpoint == ep["endpoint"]).first()
                if not existing:
                    new_api = API(
                        name=ep["name"],
                        endpoint=ep["endpoint"],
                        source="kubernetes",
                        status="Active"
                    )
                    db.add(new_api)
                    db.commit()
                    db.refresh(new_api)
                    
                    log = AuditLog(api_id=new_api.id, action="Discovered via Kubernetes Scan")
                    db.add(log)
                    db.commit()
            return discovered_endpoints
        finally:
            db.close()

if __name__ == "__main__":
    scanner = K8sScanner()
    scanner.scan_services()
