const {fetchUser} = require("./fetchUser");

afterEach(() => require("../test/clearDatabase")());
afterEach(() => require("../test/clearUserDatabase")());

const env = {
    DB_USER: "pass",
    DB_PASSWORD: "example",
    DB_HOST: "localhost",
    DB_PORT: "27017",
    DB_NAME: "pass",
    SECRET: "hello world!",
    ACCESS_TOKEN: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOnRydWUsImlhdCI6MTY1Mzg3NDAxM30.PDa_NPahbV8-xPlb4djOuQLr-xpMBvs8-LXiV-bzdZU",
    USER_HOST: "localhost",
    USER_PORT: "8081",
};

jest.mock("../../environment", () => env);

describe("Fetch user", () => {
    describe("Auth adding", () => {
        test("Should create", async () => {
            const user = await fetchUser([]);
            
            console.log(user);
            
            
        });
    });
});
