require('dotenv').load()

module.exports = {
    MONGOURL: process.env.MONGOURL || "mongodb://localhost:27017/0",
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY || "notasecretkey1324",
    CLIENT_ID: process.env.CLIENT_ID || "",
    SENDGRID_API: process.env.SENDGRID_API || "",
    RESET_KEY: process.env.RESET_KEY || "notaresetkey"
}