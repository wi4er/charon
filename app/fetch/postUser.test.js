const postUser = require("./postUser");

afterEach(() => require("../../test/clearDatabase")());
afterEach(() => require("../../test/clearUserDatabase")());

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

describe("Post user", () => {
    test("Should post user", async () => {
        const item = await postUser();

        expect(item._id.length).toBe(24);
    });

    test("Should post user with uniq", async () => {
        const item = await postUser({
            uniq: {
                uniq: "EMAIL",
                value: "VALUE",
            }
        });
        
        expect(item.uniq[0].uniq).toBe("EMAIL");
        expect(item.uniq[0].value).toBe("VALUE");
    });
});
