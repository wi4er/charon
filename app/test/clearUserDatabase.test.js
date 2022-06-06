const clearUserDatabase = require("./clearUserDatabase");

describe("User clearance", () => {
    test("Should clear", () => {
        clearUserDatabase();
    });
});
