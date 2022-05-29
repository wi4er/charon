const request = require("supertest");
const app = require("..");

afterEach(() => require("../model").clearDatabase());

describe("Auth endpoint", () => {
    describe("Auth fields", () => {
        test("Should get list", async () => {
            await request(app)
                .get("/auth/")
                .set(...require("./mock/auth"))
                .expect(200)
                .expect(res => expect(res.body).toEqual([]));
        });

        test("Should post item", async () => {
            await request(app)
                .post("/auth/")
                .set(...require("./mock/auth"))
                .send({
                    user: "123",
                    hash: "333",
                    algorithm: "SHA256",
                })
                .expect(201)
                .expect(res => {
                    expect(res.body.user).toEqual("123");
                });
        });
    });
});
