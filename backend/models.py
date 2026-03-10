from sqlalchemy import Column, Integer, String, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class API(Base):
    __tablename__ = "apis"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    endpoint = Column(String, unique=True, index=True)
    source = Column(String) # github, kubernetes, nginx, gateway
    status = Column(String, default="Active") # Active, Deprecated, Zombie
    last_used = Column(DateTime, default=datetime.datetime.utcnow)
    request_count = Column(Integer, default=0)
    risk_score = Column(Float, default=0.0)
    risk_category = Column(String, nullable=True)
    recommendation = Column(String, nullable=True)

    logs = relationship("AuditLog", back_populates="api")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)
    api_id = Column(Integer, ForeignKey("apis.id"))
    action = Column(String)
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)

    api = relationship("API", back_populates="logs")
