from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import os
from datetime import datetime, timedelta
from jose import JWTError, jwt
import uuid
import asyncio
import json
import requests
import subprocess
import socket
import whois
import dns.resolver
import nmap
from collections import defaultdict
import random

app = FastAPI(title="OSINT Nexus API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017/osint_nexus")
client = AsyncIOMotorClient(MONGO_URL)
db = client.osint_nexus

# Security
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))

security = HTTPBearer()

# Pydantic models
class User(BaseModel):
    id: str
    username: str
    email: str
    created_at: datetime

class Investigation(BaseModel):
    id: str
    user_id: str
    module: str
    target: str
    status: str
    results: Dict[Any, Any]
    created_at: datetime
    updated_at: datetime

class AlertItem(BaseModel):
    id: str
    title: str
    severity: str
    description: str
    timestamp: datetime

class RecentActivity(BaseModel):
    id: str
    module: str
    target: str
    status: str
    timestamp: datetime

class ModuleStats(BaseModel):
    module: str
    success_rate: float
    total_runs: int
    last_run: Optional[datetime]

# Mock data generators
def generate_mock_alerts():
    severities = ["high", "medium", "low"]
    titles = [
        "Suspicious Domain Activity Detected",
        "New Dark Web Mention Found",
        "Social Media Profile Changes",
        "Network Anomaly Detected",
        "Cryptocurrency Transaction Alert",
        "Geolocation Data Breach",
        "Email Exposure in Data Leak"
    ]
    
    alerts = []
    for i in range(3):
        alert = AlertItem(
            id=str(uuid.uuid4()),
            title=random.choice(titles),
            severity=random.choice(severities),
            description=f"Alert description for {random.choice(titles).lower()}",
            timestamp=datetime.now() - timedelta(minutes=random.randint(5, 120))
        )
        alerts.append(alert)
    return alerts

def generate_mock_activities():
    modules = ["OSINT", "GEOINT", "SOCMINT", "HUMINT", "SIGINT", "Darknet", "Crypto", "Network"]
    statuses = ["completed", "in-progress", "failed"]
    
    activities = []
    for i in range(5):
        activity = RecentActivity(
            id=str(uuid.uuid4()),
            module=random.choice(modules),
            target=f"target_{random.randint(100, 999)}",
            status=random.choice(statuses),
            timestamp=datetime.now() - timedelta(minutes=random.randint(1, 60))
        )
        activities.append(activity)
    return activities

def generate_mock_module_stats():
    modules = [
        "OSINT", "GEOINT", "PEOPLEOSINT", "HUMINT", "SIGINT", 
        "SOCMINT", "Darknet", "Cryptanalysis", "Network", "Blockchain"
    ]
    
    stats = []
    for module in modules:
        stat = ModuleStats(
            module=module,
            success_rate=random.uniform(0.7, 0.95),
            total_runs=random.randint(50, 500),
            last_run=datetime.now() - timedelta(minutes=random.randint(1, 1440))
        )
        stats.append(stat)
    return stats

# API Routes
@app.get("/")
async def root():
    return {"message": "OSINT Nexus API - Enterprise Intelligence Platform"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}

@app.get("/api/dashboard/overview")
async def get_dashboard_overview():
    """Get dashboard overview data"""
    return {
        "alerts": generate_mock_alerts(),
        "recent_activities": generate_mock_activities(),
        "module_stats": generate_mock_module_stats()
    }

@app.get("/api/modules")
async def get_modules():
    """Get all intelligence modules"""
    modules = [
        {
            "id": "osint",
            "name": "OSINT",
            "title": "Open Source Intelligence",
            "description": "Gather intelligence from publicly available sources",
            "tools": ["theHarvester", "Sherlock", "SpiderFoot", "Maltego CE"],
            "icon": "search",
            "color": "#1976d2"
        },
        {
            "id": "geoint",
            "name": "GEOINT",
            "title": "Geospatial Intelligence",
            "description": "Location-based intelligence and mapping",
            "tools": ["Satellite Imagery", "GPS Analysis", "Location Mapping"],
            "icon": "map",
            "color": "#388e3c"
        },
        {
            "id": "peopleosint",
            "name": "PEOPLEOSINT",
            "title": "People Intelligence",
            "description": "Person-focused open source intelligence",
            "tools": ["Social Profiles", "Background Checks", "Identity Verification"],
            "icon": "person",
            "color": "#f57c00"
        },
        {
            "id": "humint",
            "name": "HUMINT",
            "title": "Human Intelligence",
            "description": "Intelligence from human sources and personas",
            "tools": ["Persona Creation", "Chat Simulation", "Social Engineering"],
            "icon": "psychology",
            "color": "#7b1fa2"
        },
        {
            "id": "sigint",
            "name": "SIGINT",
            "title": "Signals Intelligence",
            "description": "Electronic signals and communications intelligence",
            "tools": ["Network Scanning", "RF Monitoring", "Signal Analysis"],
            "icon": "wifi",
            "color": "#d32f2f"
        },
        {
            "id": "socmint",
            "name": "SOCMINT",
            "title": "Social Media Intelligence",
            "description": "Intelligence from social media platforms",
            "tools": ["Sentiment Analysis", "Network Mapping", "Trend Analysis"],
            "icon": "share",
            "color": "#1976d2"
        },
        {
            "id": "darknet",
            "name": "Darknet",
            "title": "Dark Web Monitoring",
            "description": "Monitor dark web activities and threats",
            "tools": ["TOR Analysis", "Hidden Services", "Threat Feeds"],
            "icon": "security",
            "color": "#424242"
        },
        {
            "id": "cryptanalysis",
            "name": "Cryptanalysis",
            "title": "Cryptographic Analysis",
            "description": "Analyze and break cryptographic systems",
            "tools": ["Hashcat", "John the Ripper", "Cipher Analysis"],
            "icon": "lock",
            "color": "#f57c00"
        },
        {
            "id": "network",
            "name": "Network",
            "title": "Network Analysis",
            "description": "Network infrastructure analysis and monitoring",
            "tools": ["Nmap", "Wireshark", "Network Topology"],
            "icon": "device_hub",
            "color": "#388e3c"
        },
        {
            "id": "blockchain",
            "name": "Blockchain",
            "title": "Blockchain Analysis",
            "description": "Cryptocurrency and blockchain investigation",
            "tools": ["Address Analysis", "Transaction Tracking", "Clustering"],
            "icon": "currency_bitcoin",
            "color": "#ff9800"
        }
    ]
    return {"modules": modules}

@app.post("/api/modules/{module_id}/execute")
async def execute_module_tool(module_id: str, payload: Dict[str, Any]):
    """Execute a tool within a specific module"""
    
    # Mock execution based on module
    if module_id == "osint":
        return await execute_osint_tool(payload)
    elif module_id == "geoint":
        return await execute_geoint_tool(payload)
    elif module_id == "peopleosint":
        return await execute_peopleosint_tool(payload)
    elif module_id == "humint":
        return await execute_humint_tool(payload)
    elif module_id == "sigint":
        return await execute_sigint_tool(payload)
    elif module_id == "socmint":
        return await execute_socmint_tool(payload)
    elif module_id == "darknet":
        return await execute_darknet_tool(payload)
    elif module_id == "cryptanalysis":
        return await execute_cryptanalysis_tool(payload)
    elif module_id == "network":
        return await execute_network_tool(payload)
    elif module_id == "blockchain":
        return await execute_blockchain_tool(payload)
    else:
        raise HTTPException(status_code=404, detail="Module not found")

# Individual tool execution functions (mock implementations)
async def execute_osint_tool(payload: Dict[str, Any]):
    tool = payload.get("tool", "")
    target = payload.get("target", "")
    
    # Simulate processing time
    await asyncio.sleep(2)
    
    if tool == "theHarvester":
        return {
            "status": "completed",
            "results": {
                "emails": [f"admin@{target}", f"info@{target}", f"support@{target}"],
                "domains": [f"mail.{target}", f"www.{target}", f"ftp.{target}"],
                "ips": ["192.168.1.1", "10.0.0.1", "172.16.0.1"]
            }
        }
    elif tool == "Sherlock":
        return {
            "status": "completed",
            "results": {
                "found_profiles": [
                    {"platform": "Twitter", "url": f"https://twitter.com/{target}"},
                    {"platform": "GitHub", "url": f"https://github.com/{target}"},
                    {"platform": "Instagram", "url": f"https://instagram.com/{target}"}
                ]
            }
        }
    
    return {"status": "completed", "results": {"message": f"Executed {tool} on {target}"}}

async def execute_geoint_tool(payload: Dict[str, Any]):
    await asyncio.sleep(1.5)
    
    return {
        "status": "completed",
        "results": {
            "coordinates": {"lat": 40.7128, "lng": -74.0060},
            "location": "New York, NY",
            "elevation": "10m",
            "satellite_imagery": "Available",
            "nearby_infrastructure": ["Bridges", "Airports", "Ports"]
        }
    }

async def execute_peopleosint_tool(payload: Dict[str, Any]):
    await asyncio.sleep(2)
    
    return {
        "status": "completed",
        "results": {
            "identity": {
                "name": payload.get("target", "Unknown"),
                "possible_locations": ["New York", "California", "Texas"],
                "age_range": "25-35",
                "occupation": "Software Engineer"
            },
            "social_presence": {
                "platforms": ["LinkedIn", "Twitter", "Facebook"],
                "activity_level": "High",
                "network_size": "500+"
            }
        }
    }

async def execute_humint_tool(payload: Dict[str, Any]):
    await asyncio.sleep(1)
    
    return {
        "status": "completed",
        "results": {
            "persona_created": True,
            "background": "Professional software developer",
            "cover_story": "Attending tech conference",
            "interaction_points": ["Common interests", "Professional networking", "Industry events"]
        }
    }

async def execute_sigint_tool(payload: Dict[str, Any]):
    await asyncio.sleep(3)
    
    return {
        "status": "completed",
        "results": {
            "network_scan": {
                "active_hosts": 15,
                "open_ports": [80, 443, 22, 3389],
                "services": ["HTTP", "HTTPS", "SSH", "RDP"]
            },
            "signal_analysis": {
                "frequency_bands": ["2.4GHz", "5GHz"],
                "protocols": ["WiFi", "Bluetooth", "Cellular"]
            }
        }
    }

async def execute_socmint_tool(payload: Dict[str, Any]):
    await asyncio.sleep(2)
    
    return {
        "status": "completed",
        "results": {
            "sentiment_analysis": {
                "positive": 65,
                "negative": 20,
                "neutral": 15
            },
            "network_analysis": {
                "connections": 250,
                "influential_nodes": ["@techleader", "@industry_expert"],
                "communities": ["Tech", "Startup", "AI/ML"]
            }
        }
    }

async def execute_darknet_tool(payload: Dict[str, Any]):
    await asyncio.sleep(4)
    
    return {
        "status": "completed",
        "results": {
            "tor_status": "Connected",
            "hidden_services": [
                {"name": "Market Alpha", "status": "Online"},
                {"name": "Forum Beta", "status": "Offline"},
                {"name": "Service Gamma", "status": "Online"}
            ],
            "threat_indicators": ["Malware samples", "Stolen credentials", "Exploit kits"]
        }
    }

async def execute_cryptanalysis_tool(payload: Dict[str, Any]):
    await asyncio.sleep(5)
    
    return {
        "status": "completed",
        "results": {
            "hash_analysis": {
                "algorithm": "SHA-256",
                "strength": "Strong",
                "crack_time": "Not feasible"
            },
            "cipher_analysis": {
                "type": "AES-256",
                "mode": "CBC",
                "vulnerability": "None detected"
            }
        }
    }

async def execute_network_tool(payload: Dict[str, Any]):
    await asyncio.sleep(3)
    
    return {
        "status": "completed",
        "results": {
            "topology": {
                "nodes": 25,
                "edges": 45,
                "clusters": 3
            },
            "traffic_analysis": {
                "protocols": {"HTTP": 45, "HTTPS": 35, "SSH": 15, "FTP": 5},
                "bandwidth_usage": "85%",
                "anomalies": 2
            }
        }
    }

async def execute_blockchain_tool(payload: Dict[str, Any]):
    await asyncio.sleep(2.5)
    
    return {
        "status": "completed",
        "results": {
            "address_analysis": {
                "balance": "1.25 BTC",
                "transaction_count": 47,
                "first_seen": "2023-01-15",
                "last_activity": "2024-08-30"
            },
            "transaction_graph": {
                "incoming": 23,
                "outgoing": 24,
                "clustering_score": 0.75
            }
        }
    }

@app.get("/api/investigations")
async def get_investigations():
    """Get user investigations"""
    # Mock investigations data
    investigations = [
        {
            "id": str(uuid.uuid4()),
            "module": "OSINT",
            "target": "example.com",
            "status": "completed",
            "created_at": datetime.now() - timedelta(hours=2),
            "updated_at": datetime.now() - timedelta(minutes=30)
        },
        {
            "id": str(uuid.uuid4()),
            "module": "SOCMINT",
            "target": "@username",
            "status": "in-progress",
            "created_at": datetime.now() - timedelta(minutes=45),
            "updated_at": datetime.now() - timedelta(minutes=5)
        }
    ]
    return {"investigations": investigations}

@app.get("/api/notifications")
async def get_notifications():
    """Get user notifications"""
    notifications = [
        {
            "id": str(uuid.uuid4()),
            "title": "Investigation Complete",
            "message": "Your OSINT investigation on example.com has finished",
            "type": "success",
            "read": False,
            "timestamp": datetime.now() - timedelta(minutes=15)
        },
        {
            "id": str(uuid.uuid4()),
            "title": "New Threat Alert",
            "message": "Suspicious activity detected in dark web monitoring",
            "type": "warning",
            "read": False,
            "timestamp": datetime.now() - timedelta(hours=1)
        }
    ]
    return {"notifications": notifications}

@app.get("/api/profile")
async def get_profile():
    """Get user profile"""
    return {
        "id": str(uuid.uuid4()),
        "username": "analyst_001",
        "email": "analyst@osintnexus.com",
        "avatar": "https://i.pravatar.cc/150?img=1",
        "created_at": datetime.now() - timedelta(days=30),
        "investigations_count": 47,
        "success_rate": 0.92
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)