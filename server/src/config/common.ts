import dotenv from "dotenv";

dotenv.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` });

const appConfig = {
	port: process.env.PORT,
	dbUrl: process.env.DB_URL
};

export { appConfig };
