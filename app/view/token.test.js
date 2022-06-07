const request = require("supertest");
const app = require("..");
const createToken = require("../permission/createToken");
const jwt = require("jsonwebtoken");
const {postUser} = require("../fetch/fetchUser");
const Hash = require("../model/Hash");

afterEach(() => require("../test/clearDatabase")());
afterEach(() => require("../test/clearUserDatabase")());
beforeAll(() => require("../model/connection/connect")());
afterAll(() => require("../model/connection/connect").disconnect());


const env = {
    DB_USER: "pass",
    DB_PASSWORD: "example",
    DB_HOST: "localhost",
    DB_PORT: "27017",
    DB_NAME: "pass",
    SECRET: "hello world!",
    ENABLE_PUBLIC_USER: "1",
    ACCESS_TOKEN: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOnRydWUsImlhdCI6MTY1Mzg3NDAxM30.PDa_NPahbV8-xPlb4djOuQLr-xpMBvs8-LXiV-bzdZU",
    USER_HOST: "localhost",
    USER_PORT: "8081",
};

jest.mock("../../environment", () => env);

describe("Token endpoint", function () {
    describe("Auth getting by contact", () => {
        test("Should get token", async () => {
            const user = await postUser({
                uniq: [{
                    uniq: "EMAIL",
                    value: "123",
                }]
            });

            const hash = await new Hash({
                user: user._id,
                hash: "12345678c543e3107845db15c9c7206e8b494827",
                algorithm: "md5",
            }).save();

            await request(app)
                .get("/token/password/")
                .set("contact", "123")
                .set("password", "12345")
                .expect(200)
                .then(res => {
                    console.log(res.body);
                    
                    
                    // expect(res.text.length).toBe(188);
                });
        });

        test("Should get token from many users", async () => {
            await request(app)
                .post("/contact/")
                .send({_id: "PHONE"})
                .set(...require("./mock/auth"))
                .expect(201);

            await request(app)
                .post("/user/")
                .send({contact: [{contact: "PHONE", value: "WRONG"}]})
                .set(...require("./mock/auth"))
                .expect(201)
                .then(response => response.body);

            const user = await request(app)
                .post("/user/")
                .send({contact: [{contact: "PHONE", value: "123"}]})
                .set(...require("./mock/auth"))
                .expect(201)
                .then(response => response.body);

            await request(app)
                .post("/user/")
                .send({contact: [{contact: "PHONE", value: "ANOTHER"}]})
                .set(...require("./mock/auth"))
                .expect(201)
                .then(response => response.body);

            await request(app)
                .post("/auth/")
                .send({
                    user: user._id,
                    hash: "d8578edf8458ce06fbc5bb76a58c5ca4"
                })
                .set(...require("./mock/auth"));

            await request(app)
                .get("/token/password/")
                .set("contact", "123")
                .set("password", "qwerty")
                .expect(200)
                .then(res => {
                    expect(res.text.length).toBe(188);
                });
        });

        test("Shouldn't get token with wrong password", async () => {
            await request(app)
                .post("/contact/")
                .send({_id: "PHONE"})
                .set(...require("./mock/auth"))
                .expect(201);

            const user = await request(app)
                .post("/user/")
                .send({contact: [{contact: "PHONE", value: "123"}]})
                .set(...require("./mock/auth"))
                .expect(201)
                .then(response => response.body);

            await request(app)
                .post("/auth/")
                .send({
                    user: user._id,
                    hash: "d8578edf8458ce06fbc5bb76a58c5ca4"
                })
                .set(...require("./mock/auth"));

            await request(app)
                .get("/token/password/")
                .set("contact", "123")
                .set("password", "wrong")
                .expect(403);
        });

        test("Shouldn't get token without password", async () => {
            await request(app)
                .post("/contact/")
                .send({_id: "PHONE"})
                .set(...require("./mock/auth"))
                .expect(201);

            await request(app)
                .post("/user/")
                .send({contact: [{contact: "PHONE", value: "123"}]})
                .set(...require("./mock/auth"))
                .expect(201)

            await request(app)
                .get("/token/password/")
                .set("contact", "123")
                .set("password", "qwerty")
                .expect(403);
        });

        test("Shouldn't get token without contact", async () => {
            await request(app)
                .post("/user/")
                .set(...require("./mock/auth"))
                .expect(201);

            await request(app)
                .get("/token/password/")
                .set("contact", "123")
                .set("password", "qwerty")
                .expect(403);
        });

        test("Shouldn't get token without user", async () => {
            await request(app)
                .get("/token/password/")
                .set("contact", "123")
                .set("password", "qwerty")
                .expect(403);
        });
    });
    //
    // describe("Auth getting by id", () => {
    //     test("Should get token", async () => {
    //         const user = await request(app)
    //             .post("/user/")
    //             .set(...require("./mock/auth"))
    //             .expect(201)
    //             .then(response => response.body);
    //
    //         await request(app)
    //             .post("/auth/")
    //             .send({
    //                 user: user._id,
    //                 hash: "d8578edf8458ce06fbc5bb76a58c5ca4"
    //             })
    //             .set(...require("./mock/auth"));
    //
    //         await request(app)
    //             .get(`/token/password/${user._id}/`)
    //             .set("password", "qwerty")
    //             .expect(200)
    //             .then(res => {
    //                 expect(res.text.length).toBe(188);
    //             });
    //     });
    //
    //     test("Shouldn't get token without password", async () => {
    //         const user = await request(app)
    //             .post("/user/")
    //             .set(...require("./mock/auth"))
    //             .expect(201)
    //             .then(response => response.body);
    //
    //         await request(app)
    //             .get(`/token/password/${user._id}/`)
    //             .set("password", "qwerty")
    //             .expect(403);
    //     });
    //
    //     test("Shouldn't get token with user id", async () => {
    //         await request(app)
    //             .get(`/token/password/123/`)
    //             .set("password", "qwerty")
    //             .expect(500);
    //     });
    //
    //     test("Shouldn't get token without user", async () => {
    //         await request(app)
    //             .get(`/token/password/111112222233333444445555/`)
    //             .set("password", "qwerty")
    //             .expect(403);
    //     });
    // });
    //
    // describe("Password managing", () => {
    //     test("Shouldn't add password without token", async () => {
    //         await request(app)
    //             .post("/token/password/")
    //             .set("password", "qwerty")
    //             .expect(403);
    //     });
    //
    //     test("Should add password to user", async () => {
    //         const user = await request(app)
    //             .post("/user/")
    //             .send({contact: [{contact: "PHONE", value: "123"}]})
    //             .set(...require("./mock/auth"))
    //             .expect(201)
    //             .then(response => response.body);
    //
    //         await request(app)
    //             .post("/token/password/")
    //             .set("password", "old")
    //             .set("authorization", createToken(user))
    //             .expect(201);
    //     });
    //
    //     test("Shouldn't add password twice", async () => {
    //         const user = await request(app)
    //             .post("/user/")
    //             .send({contact: [{contact: "PHONE", value: "123"}]})
    //             .set(...require("./mock/auth"))
    //             .expect(201)
    //             .then(response => response.body);
    //
    //         await request(app)
    //             .post("/token/password/")
    //             .set("password", "old")
    //             .set("authorization", createToken(user))
    //             .expect(201);
    //
    //         await request(app)
    //             .post("/token/password/")
    //             .set("password", "new")
    //             .set("authorization", createToken(user))
    //             .expect(400);
    //     });
    //
    //     test("Should add password for correct user", async () => {
    //         const first = await request(app)
    //             .post("/user/")
    //             .set(...require("./mock/auth"))
    //             .expect(201)
    //             .then(response => response.body);
    //
    //         const second = await request(app)
    //             .post("/user/")
    //             .set(...require("./mock/auth"))
    //             .expect(201)
    //             .then(response => response.body);
    //
    //         await request(app)
    //             .post("/token/password/")
    //             .set("password", "first")
    //             .set("authorization", createToken(first))
    //             .expect(201);
    //
    //         await request(app)
    //             .post("/token/password/")
    //             .set("password", "second")
    //             .set("authorization", createToken(second))
    //             .expect(201);
    //     });
    //
    //
    //     test("Should add and update password", async () => {
    //         const user = await request(app)
    //             .post("/user/")
    //             .send({contact: [{contact: "PHONE", value: "123"}]})
    //             .set(...require("./mock/auth"))
    //             .expect(201)
    //             .then(response => response.body);
    //
    //         await request(app)
    //             .post("/token/password/")
    //             .set("password", "old")
    //             .set("authorization", createToken(user))
    //             .expect(201);
    //
    //         await request(app)
    //             .put("/token/password/")
    //             .set("password", "new")
    //             .set("authorization", createToken(user))
    //             .expect(201);
    //     });
    //
    //     test("Should add and delete password", async () => {
    //         const user = await request(app)
    //             .post("/user/")
    //             .send({contact: [{contact: "PHONE", value: "123"}]})
    //             .set(...require("./mock/auth"))
    //             .expect(201)
    //             .then(response => response.body);
    //
    //         await request(app)
    //             .post("/token/password/")
    //             .set("password", "old")
    //             .set("authorization", createToken(user))
    //             .expect(201);
    //
    //         await request(app)
    //             .delete("/token/password/")
    //             .set("authorization", createToken(user))
    //             .expect(200);
    //     });
    //
    //     test("Shouldn't delete nonexistent password", async () => {
    //         const user = await request(app)
    //             .post("/user/")
    //             .send({contact: [{contact: "PHONE", value: "123"}]})
    //             .set(...require("./mock/auth"))
    //             .expect(201)
    //             .then(response => response.body);
    //
    //         await request(app)
    //             .delete("/token/password/")
    //             .set("authorization", createToken(user))
    //             .expect(400);
    //     });
    // });
});

describe("Public token endpoint", () => {
    describe("Public token getting", () => {
        test("Should get token", async () => {
            await request(app)
                .get("/token/public/")
                .expect(200)
                .then(res => {
                    const token = jwt.decode(res.body.authorization.slice(7))

                    expect(token.id.length).toBe(24);
                    expect(token.admin).toBe(false);
                });
        });

        test("Should get sized token", async () => {
            await request(app)
                .get("/token/public/")
                .expect(200)
                .then(res => {
                    expect(res.text.length).toBe(194);
                });
        });
    });
});
