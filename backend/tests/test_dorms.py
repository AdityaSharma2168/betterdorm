from fastapi.testclient import TestClient
from app.main import app
from app.models.dorm import Dorm
from app.schemas.dorm import DormCreate, DormUpdate

client = TestClient(app)

def test_create_dorm():
    dorm_data = {
        "name": "Cozy Dorm Room",
        "location": "123 College Ave",
        "price": 500,
        "description": "A cozy dorm room available for rent.",
        "amenities": ["WiFi", "Laundry", "Gym"],
        "latitude": 40.7128,
        "longitude": -74.0060
    }
    response = client.post("/dorms/", json=dorm_data)
    assert response.status_code == 201
    assert response.json()["name"] == dorm_data["name"]

def test_get_dorms():
    response = client.get("/dorms/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_update_dorm():
    dorm_data = {
        "name": "Updated Dorm Room",
        "location": "123 College Ave",
        "price": 550,
        "description": "An updated cozy dorm room available for rent.",
        "amenities": ["WiFi", "Laundry", "Gym", "Pool"],
        "latitude": 40.7128,
        "longitude": -74.0060
    }
    dorm_id = "some_dorm_id"  # Replace with a valid dorm ID
    response = client.put(f"/dorms/{dorm_id}", json=dorm_data)
    assert response.status_code == 200
    assert response.json()["name"] == dorm_data["name"]

def test_delete_dorm():
    dorm_id = "some_dorm_id"  # Replace with a valid dorm ID
    response = client.delete(f"/dorms/{dorm_id}")
    assert response.status_code == 204

def test_dorm_not_found():
    dorm_id = "invalid_dorm_id"
    response = client.get(f"/dorms/{dorm_id}")
    assert response.status_code == 404