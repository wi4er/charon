const encode = require(".");

describe("Password encryption", () => {
    test("Should encode", () => {
        encode.encrypt("qwerty", "12345678", "md5");
    });

    test("Shouldn't encode with wrong algorithm", () => {
        expect(() => {
            encode.encrypt("qwerty", "12345678", "wrong");
        }).toThrow();
    });
});
