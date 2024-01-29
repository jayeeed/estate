from dotenv import load_dotenv
from pymongo import MongoClient
import os, json

load_dotenv()
# COSMOSDB_CONN = os.getenv("COSMOSDB_CONN")
MONGODB_URL = os.getenv("MONGODB_URL")
MONGDB_URI = os.getenv("MONGDB_URI")
# print(type(MONGDB_URI))

if MONGODB_URL is None:
    # Replace 'fallback_url' with the desired fallback URL
    fallback_url = MONGDB_URI
    MONGODB_URL = fallback_url

client = MongoClient("mongodb://localhost:27017/")
print(MONGODB_URL)

airbnb_db = client["airbnb"]


# Check if the database exists
if "airbnb" in client.list_database_names():
    airbnb_db = client["airbnb"]
    print("Connected to the 'airbnb' database")

    # Insert a test document into the 'test' collection
    airbnb_db["test"].insert_one({"database": "created"})
    print("Test document inserted successfully.")
else:
    print("Error: The 'airbnb' database does not exist.")
