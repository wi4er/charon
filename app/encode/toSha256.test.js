const toSha256 = require("./toSha256");

describe("SHA 256 conversion", () => {
    test("Should ", () => {
        expect(toSha256("123")).toBe("a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3");
    });
});
