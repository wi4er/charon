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

    get SECRET() {
        return process.env.SECRET || "hello world !";
    }

    get DEFAULT_PUBLIC_GROUP() {
        return process.env.DEFAULT_PUBLIC_GROUP;
    }

    get ENABLE_PUBLIC_USER() {
        return !!process.env.ENABLE_PUBLIC_USER;
    }
}

module.exports = new Environment();
