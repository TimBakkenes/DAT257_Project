from fastapi.testclient import TestClient
from main import app
from database_dev import *
import postgres_connection
import subprocess

client = TestClient(app)

conn = psycopg2.connect(host="localhost", dbname="postgres", user="postgres", password="POSTGRES", port="5432")
cursor = conn.cursor()


def test_login():
    response = client.get("/api/get/login", params={"username": "11111111", "password": "a"})
    assert response.status_code == 200
    assert response.json() == True

def test_get_users():
    response = client.get("/api/get/get_users")
    assert response.status_code == 200
    assert response.json() is not None
    assert len(response.json()) > 0


def test_add_favourite():
    response = client.post("/api/post/add_favourite", json={"user":'11111111', "store": 'Test store'})
    assert response.status_code == 200
    assert response.json() is None

def test_add_store():
    result = postgres_connection.add_store('store2','33333333', 'testing store', 55.098780, 10.897645)
    assert result == "Success"

def test_get_favourites():
    testuser = "22222222"
    response = client.get(f"/api/get/get_favourites?user={testuser}")
    assert response.status_code == 200
    assert response.json() is not None
    assert len(response.json()) > 0
    
# def test_get_rating():
#     test_query = """INSERT INTO Ratings (rating_user, store, rating) VALUES ('11111111', 'Test store', 3);"""
#     cursor.execute(test_query)
#     conn.commit()
#     response = client.get("/api/get/get_ratings", params={"user": '11111111', "store": 'Test store'})
#     assert response.status_code == 200
#     assert response.json() == [[3]]

def test_get_all_stores_ratings():
    response = client.get("/api/get/get_all_stores_ratings")
    assert response.status_code == 200
    assert response.json() is not None
    assert len(response.json()) > 0
        
if __name__ == "__main__":
    subprocess.run(["python3", "backend/api/database_dev.py"], check=True)
    import pytest
    pytest.main()