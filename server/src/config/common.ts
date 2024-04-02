import dotenv from "dotenv";

dotenv.config({ path: __dirname + `/../../.env.${process.env.NODE_ENV}` });

const appConfig = {
	port: process.env.PORT,
	dbUrl: process.env.DB_URL,
	isEndpointLogsSilenced: process.env.ENDPOINT_LOGS,
	packageVersion: process.env.PACKAGE_VERSION
};

export { appConfig };
