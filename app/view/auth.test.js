const request = require("supertest");
const app = require("..");

afterEach(() => require("../model").clearDatabase());

describe("Auth endpoint", function () {
    describe("Auth fields", () => {
        test("Should get list", async () => {
            await request(app)
                .get("/auth/")
                .set(...require("./mock/auth"))
                .expect(200)
                .expect(res => expect(res.body).toEqual([]));
        });
    });
});
