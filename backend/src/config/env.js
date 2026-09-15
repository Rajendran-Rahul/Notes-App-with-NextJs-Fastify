import "dotenv/config";
function required(key) {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
}
export const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT ?? 3000),
    DB_HOST: required("DB_HOST"),
    DB_PORT: Number(process.env.DB_PORT ?? 3306),
    DB_NAME: required("DB_NAME"),
    DB_USER: required("DB_USER"),
    DB_PASSWORD: process.env.DB_PASSWORD ?? "",
    LOG_LEVEL: process.env.LOG_LEVEL ?? "info",
};
