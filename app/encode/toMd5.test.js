const toMd5 = require("./toMd5");

describe("MD5 conversion", () => {
    test("Should convert", () => {
        const hash = toMd5("123");

        expect(hash).toHaveLength(39);
    });
});
