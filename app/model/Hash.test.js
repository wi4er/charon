const Auth = require("./Hash");
const User = require("./User");

afterEach(() => require("../model").clearDatabase());
beforeAll(() => require("../model").connect())
afterAll(() => require("../model").disconnect());

describe("Auth entity", () => {
    describe("Auth adding", function () {
        test("Should create", async () => {
            const user = await new User().save();
            const auth = await new Auth({
                user: user._id,
                hash: "123"
            }).save();

            expect(auth.hash).toBe("123");
        });

        test("Shouldn't create without user", async () => {
            await expect(new Auth({
                hash: "123"
            }).save()).rejects.toThrow();
        });

        test("Shouldn't create without hash", async () => {
            await expect(new Auth({
                user: await new User().save()._id,
            }).save()).rejects.toThrow();
        });

        test("Should add item or update", async () => {
            const upsert = await Auth.updateOne({}, {}, {upsert: true})

            const item = await Auth.findById(upsert.upsertedId);
        });
    });
});
