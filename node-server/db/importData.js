// Connect to the MongoDB instance
var db = new Mongo().getDB("airbnb");

// Define your collections
var collections = [
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
    "wishlists"
];

// Iterate through each collection
for (var i = 0; i < collections.length; i++) {
    var collectionName = collections[i];
    print("Processing collection: " + collectionName);

    var initCollection = db.getCollection(collectionName);

    var jsonFileName = "airbnb." + collectionName + ".json";
    var jsonFilePath = "db/dataJson/" + jsonFileName;

    // Check if the JSON file exists
    if (!cat(jsonFilePath)) {
        // Insert a document into the collection if the JSON file doesn't exist
        initCollection.insertOne({"collectionName": collectionName, "created": true});
        print("Document inserted into " + collectionName);
    } else {
        // Load JSON data from file
        var jsonData = JSON.parse(cat(jsonFilePath));

        // Iterate through each document in the data
        for (var j = 0; j < jsonData.length; j++) {
            var doc = jsonData[j];

            // Modify _id fields
            if (doc._id && doc._id.$oid) {
                doc._id = ObjectId(doc._id.$oid);
            }

            // Modify other fields as needed

            // Insert the document into the collection
            initCollection.insertOne(doc);

            // Print progress message
            print("Inserted document " + (j + 1) + " into " + collectionName);
        }

        print("Data inserted successfully into " + collectionName);
    }
}
