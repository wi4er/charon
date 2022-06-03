const process = require("process");

class Environment {
    /**
     * Порт приложения
     */
    get APP_PORT() {
        return process.env.APP_PORT || 8080;
    }

    /**
     * Пользователь базы данных
     */
    get DB_USER() {
        return process.env.DB_USER || "pass";
    }

    /**
     * Пароль для базы данных
     */
    get DB_PASSWORD() {
        return process.env.DB_PASSWORD || "example";
    }

    /**
     * Хост для базы данных
     */
    get DB_HOST() {
        return process.env.DB_HOST || "localhost";
    }

    /**
     * Порт базы данных
     */
    get DB_PORT() {
        return process.env.DB_PORT || "27017";
    }

    /**
     * Имя базы данных
     */
    get DB_NAME() {
        return process.env.DB_NAME || "pass";
    }

    get DB_URL() {
        return process.env.DB_URL;
    }

    get USE_SSL() {
        return process.env.USE_SSL;
    }

    get USER_HOST() {
        return process.env.USER_HOST || "localhost"
    }

    get USER_PORT() {
        return process.env.USER_PORT || "8081"
    }

    get SECRET() {
        return process.env.SECRET || "hello world !";
    }

    get ACCESS_TOKEN() {
        return process.env.ACCESS_TOKEN || "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiYWRtaW4iOnRydWUsImlhdCI6MTY1Mzg3NDAxM30.PDa_NPahbV8-xPlb4djOuQLr-xpMBvs8-LXiV-bzdZU";
    }

    get DEFAULT_PUBLIC_GROUP() {
        return process.env.DEFAULT_PUBLIC_GROUP;
    }

    get ENABLE_PUBLIC_USER() {
        return process.env.ENABLE_PUBLIC_USER || true;
    }
}

module.exports = new Environment();
