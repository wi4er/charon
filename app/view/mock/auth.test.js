const generate = require("./auth");

const env = {
    SECRET: "hello world!",
};

jest.mock("../../../environment", () => env);

describe("Auth", function () {
    test("Should ", () => {
        console.log(generate());
    });
});
