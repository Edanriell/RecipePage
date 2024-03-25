import { NextFunction, Request, Response } from "express";
import tooBusy from "toobusy-js";

const tooBusyConfig = (request: Request, response: Response, next: NextFunction) => {
	if (tooBusy()) {
		response.status(503).send("Server too busy!");
	} else {
		next();
	}
};

tooBusy.onLag(function (currentLag: number) {
	console.error("Event loop lag detected! Latency: " + currentLag + "ms");
});

export { tooBusyConfig };
