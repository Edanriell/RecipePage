import dotenv from "dotenv";
dotenv.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` });

const config = {
	port: process.env.PORT,
	dbUrl: process.env.DB_URL
};

export default config;
