const request = require("supertest");
const app = require("..");

afterEach(() => require("../test/clearDatabase")());
afterEach(() => require("../test/clearUserDatabase")());

const env = {
    DB_USER: "pass",
    DB_PASSWORD: "example",
    DB_HOST: "localhost",
    DB_PORT: "27017",
    DB_NAME: "pass",
    SECRET: "hello world!",
};

jest.mock("../../environment", () => env);

describe("Auth endpoint", () => {
    describe("Auth fields", () => {
        test("Should get list", async () => {
            await request(app)
                .get("/auth/")
                .set(...require("./mock/auth")())
                .expect(200)
                .expect(res => expect(res.body).toEqual([]));
        });

        test("Should post item", async () => {
            await request(app)
                .post("/auth/")
                .set(...require("./mock/auth")())
                .send({
                    user: "123",
                    hash: "333",
                    algorithm: "sha256",
                })
                .expect(201)
                .expect(res => {
                    expect(res.body.user).toEqual("123");
                    expect(res.body.hash).toEqual("333");
                    expect(res.body.algorithm).toEqual("sha256");
                });
        });

        test("Should update item", async () => {
            const id = await request(app)
                .post("/auth/")
                .set(...require("./mock/auth")())
                .send({
                    user: "123",
                    hash: "333",
                    algorithm: "sha256",
                })
                .expect(201)
                .then(res => res.body._id);

            await request(app)
                .put(`/auth/${id}/`)
                .set(...require("./mock/auth")())
                .send({
                    _id: id,
                    user: "321",
                    hash: "444",
                    algorithm: "md5",
                })
                .expect(200)
                .expect(res => {
                    expect(res.body.user).toEqual("321");
                    expect(res.body.hash).toEqual("444");
                    expect(res.body.algorithm).toEqual("md5");
                });
        });

        test("Should delete item", async () => {
            const id = await request(app)
                .post("/auth/")
                .set(...require("./mock/auth")())
                .send({
                    user: "123",
                    hash: "333",
                    algorithm: "sha256",
                })
                .expect(201)
                .then(res => res.body._id);

            await request(app)
                .delete(`/auth/${id}/`)
                .set(...require("./mock/auth")())
                .expect(200)
                .then(res => {
                    expect(res.body.user).toBe("123");
                });
        });
    });
});
