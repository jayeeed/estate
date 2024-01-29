import subprocess
import time

subprocess.check_call(["python3", "-m", "pip", "install", "pymongo"])
from pymongo import MongoClient
import json, os
from bson import ObjectId

# Create a client connection to your MongoDB instance
client = MongoClient("mongodb://0.0.0.0:27017")

# Initialize your database
db = client["airbnb"]

if db != "None":
    print("connected")

collections = [
    "allproperties",
    "amenities",
    "bookings",
    "description",
    "payments",
    "prediction",
    "recommended_properties",
    "reviews",
    "typeofplaces",
    "users",
    "wishlists",
]


# Initialize your collection
for collection in collections:
    print(collection)
    init_collection = db[collection]

    json_file_name = "airbnb." + collection + ".json"
    json_file_path = "dataJson/" + json_file_name

    # Check if the JSON file exists
    if not os.path.exists(json_file_path):
        init_collection.insert_one({"collectionName": collection, "created": True})
    else:
        # Load your JSON data
        with open(json_file_path) as f:
            data = json.load(f)

        # Modify _id fields
        for doc in data:
            if "_id" in doc and "$oid" in doc["_id"]:
                doc["_id"] = ObjectId(doc["_id"]["$oid"])

            if "userId" in doc and "$oid" in doc["userId"]:
                doc["userId"] = ObjectId(doc["userId"]["$oid"])

            if "propertyId" in doc and "$oid" in doc["propertyId"]:
                doc["propertyId"] = ObjectId(doc["propertyId"]["$oid"])

            if "reviewedBy" in doc and "$oid" in doc["reviewedBy"]:
                doc["reviewedBy"] = ObjectId(doc["reviewedBy"]["$oid"])

            if "renterUserId" in doc and "$oid" in doc["renterUserId"]:
                doc["renterUserId"] = ObjectId(doc["renterUserId"]["$oid"])

            if "hostUserId" in doc and "$oid" in doc["hostUserId"]:
                doc["hostUserId"] = ObjectId(doc["hostUserId"]["$oid"])

            if "paymentId" in doc and "$oid" in doc["paymentId"]:
                doc["paymentId"] = ObjectId(doc["paymentId"]["$oid"])

            if "amenitiesIds" in doc and "$oid" in doc["amenitiesIds"]:
                doc["amenitiesIds"] = ObjectId(doc["amenitiesIds"]["$oid"])

            time.sleep(0.1)

            if "located" in doc and "osm_id" in doc["located"]:
                osm_id = doc["located"]["osm_id"]

                if isinstance(osm_id, dict) and "$numberLong" in osm_id:
                    # Extract the value from the dictionary with "$numberLong"
                    doc["located"]["osm_id"] = int(osm_id["$numberLong"])
                elif isinstance(osm_id, int):
                    # Already an integer, nothing to change
                    pass
                else:
                    # Handle other cases or raise an exception
                    # raise ValueError(f"Unsupported osm_id type: {type(osm_id)}")
                    doc["located"]["osm_id"] = 000000
                    print(f"Unsupported osm_id type: {type(osm_id)}")

        # Insert data into the collection
        init_collection.insert_many(data)

        print(f"Data inserted successfully into {collection}.")
