import pytest
from app.core.database import get_database

@pytest.fixture(scope="session")
def db():
    db = get_database()
    yield db
    db.client.close()