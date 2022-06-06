try {
    const app = require("express")();

    app.use(require("cors")({}));
    app.use(require('body-parser').json());
    app.use(require("./permission"));
    app.use(require("./model"));

    app.get("/", (req, res) => {
        res.send("<h1 style='display: flex; align-items: center; justify-content: center; height: 100vh'> $$$ CHARON $$$ </h1>");
    });

    app.use("/auth/", require("./view/auth"));
    app.use("/token/", require("./view/token"));

    app.use(require("./exception"));

    module.exports = app;
} catch (err) {
    module.exports = (req, res) => {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({message: err.message}));
        res.end();

        console.error(err);
    }
}
