let pass = db.getSiblingDB("pass");

pass.createUser(
    {
        user: "pass",
        pwd: "example",
        roles: [
            {
                role: "readWrite",
                db: "auth"
            }
        ]
    }
);
