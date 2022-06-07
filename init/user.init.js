let user = db.getSiblingDB("user");

user.createUser(
    {
        user: "user",
        pwd: "example",
        roles: [
            {
                role: "readWrite",
                db: "user"
            }
        ]
    }
);

user.runCommand(
    {
        insert: "uniq",
        documents: [{
            _id: "EMAIL",
            timestamp: new Date(),
        }]
    }
);

user.runCommand(
    {
        insert: "uniq",
        documents: [{
            _id: "PHONE",
            timestamp: new Date(),
        }]
    }
);
