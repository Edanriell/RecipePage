import { connect } from "mongoose";

import { appConfig } from "./common";

// import mongoose, { connect } from 'mongoose';
// mongoose.set('debug', true); // <--- Enables debug logs

const connectToMongoDb = async () => {
	const mongoDbUri = appConfig.dbUrl ?? "mongodb://localhost:27017";
	await connect(mongoDbUri);
};

export { connectToMongoDb };
