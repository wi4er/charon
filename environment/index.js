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
        return process.env.DB_USER;
    }

    /**
     * Пароль для базы данных
     */
    get DB_PASSWORD() {
        return process.env.DB_PASSWORD;
    }

    /**
     * Хост для базы данных
     */
    get DB_HOST() {
        return process.env.DB_HOST;
    }

    /**
     * Порт базы данных
     */
    get DB_PORT() {
        return process.env.DB_PORT;
    }

    /**
     * Имя базы данных
     */
    get DB_NAME() {
        return process.env.DB_NAME;
    }

    get DB_URL() {
        return process.env.DB_URL;
    }

    get USE_SSL() {
        return process.env.USE_SSL;
    }

    get USER_HOST() {
        return process.env.USER_HOST;
    }

    get USER_PORT() {
        return process.env.USER_PORT;
    }

    get SECRET() {
        return process.env.SECRET;
    }

    get ACCESS_TOKEN() {
        return process.env.ACCESS_TOKEN;
    }

    get DEFAULT_PUBLIC_GROUP() {
        return process.env.DEFAULT_PUBLIC_GROUP;
    }

    get ENABLE_PUBLIC_USER() {
        return !!process.env.ENABLE_PUBLIC_USER;
    }
}

module.exports = new Environment();
