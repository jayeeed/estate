import pandas as pd
from db import airbnb_db
from bson import ObjectId

import time, json, os

# Your collection names
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

print("Connecting to the 'airbnb' database")
for collection in collections:
    print(collection)
    init_collection = airbnb_db[collection]

    json_file_name = "airbnb." + collection + ".json"
    json_file_path = "db/dataJson/" + json_file_name

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


user_collection = airbnb_db["users"]
properties_collection = airbnb_db["allproperties"]
recommended_collection = airbnb_db["recommended_properties"]
bookings_collection = airbnb_db["bookings"]
price_prediction = airbnb_db["prediction"]
description_collection = airbnb_db["description"]
review_collection = airbnb_db["reviews"]


def get_data():
    data_from_mongodb = properties_collection.find()
    data_df = pd.DataFrame(data_from_mongodb)
    return data_df


# client = MongoClient('mongodb://e-state-db:fIyl4EwvEG34NxzhnwyAqJLreVDbqFpNnyPAIwsAWfwAKYurQ3SqqFe9xRQ2Sisg29vx9i2j6QhvACDbZzq40w==@e-state-db.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@e-state-db@')
