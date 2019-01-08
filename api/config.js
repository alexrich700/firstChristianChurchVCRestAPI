module.exports = {
    MONGOURL: process.env.MONGOURL || "mongodb://localhost:27017/0",
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY || "notasecretkey1324",
    CLIENT_ID: process.env.CLIENT_ID
}