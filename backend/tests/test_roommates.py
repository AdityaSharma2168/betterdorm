from fastapi.testclient import TestClient
from app.main import app
from app.models.roommate_request import RoommateRequest
from app.schemas.roommate import RoommateRequestCreate, RoommateRequestResponse

client = TestClient(app)

def test_create_roommate_request():
    request_data = {
        "user_id": "test_user_id",
        "preferred_gender": "female",
        "max_rent": 500,
        "start_date": "2023-09-01",
        "end_date": "2024-05-31"
    }
    response = client.post("/api/roommates/", json=request_data)
    assert response.status_code == 201
    assert response.json()["user_id"] == request_data["user_id"]

def test_get_roommate_requests():
    response = client.get("/api/roommates/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_find_roommate_request_by_id():
    request_data = {
        "user_id": "test_user_id",
        "preferred_gender": "female",
        "max_rent": 500,
        "start_date": "2023-09-01",
        "end_date": "2024-05-31"
    }
    create_response = client.post("/api/roommates/", json=request_data)
    request_id = create_response.json()["id"]

    response = client.get(f"/api/roommates/{request_id}")
    assert response.status_code == 200
    assert response.json()["id"] == request_id

def test_delete_roommate_request():
    request_data = {
        "user_id": "test_user_id",
        "preferred_gender": "female",
        "max_rent": 500,
        "start_date": "2023-09-01",
        "end_date": "2024-05-31"
    }
    create_response = client.post("/api/roommates/", json=request_data)
    request_id = create_response.json()["id"]

    delete_response = client.delete(f"/api/roommates/{request_id}")
    assert delete_response.status_code == 204

    get_response = client.get(f"/api/roommates/{request_id}")
    assert get_response.status_code == 404