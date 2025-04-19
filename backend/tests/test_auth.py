from fastapi import FastAPI
from fastapi.testclient import TestClient
from app.api.routes.auth import router as auth_router
from app.models.user import User
from app.services.auth_service import AuthService

app = FastAPI()
app.include_router(auth_router)

client = TestClient(app)

def test_register_user():
    response = client.post("/auth/register", json={"username": "testuser", "password": "testpass"})
    assert response.status_code == 201
    assert response.json()["username"] == "testuser"

def test_login_user():
    client.post("/auth/register", json={"username": "testuser", "password": "testpass"})
    response = client.post("/auth/login", data={"username": "testuser", "password": "testpass"})
    assert response.status_code == 200
    assert "access_token" in response.json()

def test_login_invalid_user():
    response = client.post("/auth/login", data={"username": "invaliduser", "password": "wrongpass"})
    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid credentials"