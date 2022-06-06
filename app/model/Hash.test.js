const Hash = require("./Hash");

afterEach(() => require("../test/clearDatabase")());
beforeAll(() => require("./connection/connect")());
afterAll(() => require("./connection/connect").disconnect());

jest.mock("../../environment", () => ({
    DB_USER: "pass",
    DB_PASSWORD: "example",
    DB_HOST: "localhost",
    DB_PORT: "27017",
    DB_NAME: "pass",
    ENABLE_PUBLIC_USER: "1",
}));

describe("Hash entity", () => {
    describe("Hash fields", () => {
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

        test("Shouldn't create without user", async () => {
            await expect(new Hash({
                hash: "123",
                algorithm: "md5",
            }).save()).rejects.toThrow();
        });

        test("Shouldn't create without hash", async () => {
            await expect(new Hash({
                user: "123",
                algorithm: "md5",
            }).save()).rejects.toThrow();
        });

        test("Shouldn't create without algorithm", async () => {
            await expect(new Hash({
                hash: "123",
                user: "123",
            }).save()).rejects.toThrow();
        });

        test("Should add item or update", async () => {
            // const upsert = await Hash.updateOne({}, {}, {upsert: true})
            //
            // const item = await Hash.findById(upsert.upsertedId);
        });
    });
});
