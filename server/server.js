const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();

var corsOptions = {
	origin: "http://localhost:3000",
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const port = 5000;

const requestOptions = {
	method: "GET",
	headers: { "X-CMC_PRO_API_KEY": "75a514d4-602f-4a5d-b969-92f035d41f62" },
};

const fetchData = () => {};

app.get("/", (req, res) => {
	return res.status(200).json({
		status: 200,
		message: "API running",
	});
});

app.get("/list-widget", (req, res) => {
	fetch(
		"https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20",
		requestOptions
	)
		.then((response) => response.json())
		.then((response) => {
			return res.status(200).json({
				status: 200,
				data: response.data,
			});
		});
});

app.listen(port, () => {
	console.log(`Now listening on port ${port}`);
});
