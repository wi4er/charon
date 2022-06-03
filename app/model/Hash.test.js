const Hash = require("./Hash");

afterEach(() => require(".").clearDatabase());
beforeAll(() => require(".").connect())
afterAll(() => require(".").disconnect());

jest.mock("../../environment", () => ({
    DB_USER: "pass",
    DB_PASSWORD: "example",
    DB_HOST: "localhost",
    DB_PORT: "27017",
    DB_NAME: "pass",
}));

describe("Hash entity", () => {
    describe("Hash adding", () => {
        test("Should create", async () => {
            const auth = await new Hash({
                user: "333",
                hash: "123",
                algorithm: "sha256",
            }).save();

            expect(auth.hash).toBe("123");
            expect(auth.user).toBe("333");
            expect(auth.algorithm).toBe("sha256");
        });

        test("Shouldn't create with wrong algorithm", async () => {
            await expect(new Hash({
                user: "333",
                hash: "123",
                algorithm: "wrong",
            }).save()).rejects.toThrow();
        });

        // test("Shouldn't create without user", async () => {
        //     await expect(new Auth({
        //         hash: "123"
        //     }).save()).rejects.toThrow();
        // });
        //
        // test("Shouldn't create without hash", async () => {
        //     await expect(new Auth({
        //         user: await new User().save()._id,
        //     }).save()).rejects.toThrow();
        // });
        //
        // test("Should add item or update", async () => {
        //     const upsert = await Auth.updateOne({}, {}, {upsert: true})
        //
        //     const item = await Auth.findById(upsert.upsertedId);
        // });
    });
});
