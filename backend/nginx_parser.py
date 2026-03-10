import re
import datetime
from database import SessionLocal
from models import API, AuditLog

# Regex for common NGINX access log format: 
# 127.0.0.1 - - [10/Mar/2026:23:59:00 +0000] "GET /api/user/login HTTP/1.1" 200 123 "-" "-"
LOG_PATTERN = r'\[(?P<time>.+?)\] "(?P<method>\w+) (?P<endpoint>/\S*).*?" (?P<status>\d+)'

class NginxParser:
    def __init__(self, log_path: str = None):
        self.log_path = log_path

    def parse_logs(self, log_content: str = None):
        """
        Parses NGINX logs to identify active API traffic and update request counts.
        """
        print("Parsing NGINX logs...")
        if not log_content and self.log_path and os.path.exists(self.log_path):
            with open(self.log_path, 'r') as f:
                log_content = f.read()
        
        if not log_content:
            # Simulated log for demo
            log_content = """
            [10/Mar/2026:10:00:00 +0000] "GET /api/user/login HTTP/1.1" 200
            [10/Mar/2026:10:05:00 +0000] "POST /api/payment/process HTTP/1.1" 201
            [10/Mar/2026:10:10:00 +0000] "GET /api/user/login HTTP/1.1" 200
            """

        matches = re.finditer(LOG_PATTERN, log_content)
        traffic_data = {}

        for match in matches:
            ep = match.group('endpoint')
            traffic_data[ep] = traffic_data.get(ep, 0) + 1

        db = SessionLocal()
        try:
            for ep, count in traffic_data.items():
                api = db.query(API).filter(API.endpoint == ep).first()
                if api:
                    api.request_count += count
                    api.last_used = datetime.datetime.utcnow()
                    api.status = "Active" # Traffic seen, mark as active
                else:
                    # New API discovered from logs
                    api = API(
                        name=f"Observed: {ep}",
                        endpoint=ep,
                        source="nginx",
                        status="Active",
                        request_count=count,
                        last_used=datetime.datetime.utcnow()
                    )
                    db.add(api)
                
                db.commit()
            return traffic_data
        finally:
            db.close()

if __name__ == "__main__":
    parser = NginxParser()
    parser.parse_logs()
