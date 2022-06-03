const fetchUser = require("./fetchUser");

describe("Fetch user", () => {
    describe("Auth adding", () => {
        test("Should create", async () => {
            const user = await fetchUser("123");
            
            console.log(user);
            
            
        });
    });
});
