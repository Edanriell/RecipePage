import rateLimit from "express-rate-limit";

const rateLimiterConfig = rateLimit({
	windowMs: 24 * 60 * 60 * 1000, // 24 hrs in milliseconds
	limit: 100, // maximum number of request inside a window
	message: "You have exceeded the 100 requests in 24 hrs limit!", // the message when they exceed limit
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

export { rateLimiterConfig };
