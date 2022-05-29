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
