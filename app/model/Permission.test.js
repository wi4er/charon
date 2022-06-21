const Permission = require("./Permission");

afterEach(() => require("../../test/clearDatabase")());
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

describe("Permission entity", () => {
    describe("Permission fields", () => {
        test("Should update dates", async () => {
            const inst = await new Permission({
                entity: "HASH",
                method: "GET",
                group: 1,
            }).save();

            const {timestamp, created} = inst;
            inst.created = new Date();
            await inst.save();

            expect(inst.timestamp).not.toBe(timestamp);
            expect(inst.created).toBe(created);
        });

        test("Should create permission for group", async () => {
            await new Permission({
                entity: "HASH",
                method: "GET",
                group: 1,
            }).save();
        });

        test("Shouldn't create without method", async () => {
            await expect(
                new Permission({
                    entity: "WRONG",
                }).save()
            ).rejects.toThrow();
        });

        test("Shouldn't create without method", async () => {
            await expect(
                new Permission({
                    method: "GET",
                }).save()
            ).rejects.toThrow("Path `entity` is required.");
        });
    });
});
