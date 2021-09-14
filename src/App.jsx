import React, { useState } from "react";
import styled from "styled-components";
import useInterval from "./hooks/index";

const myHeaders = new Headers();
myHeaders.append("X-CMC_PRO_API_KEY", "75a514d4-602f-4a5d-b969-92f035d41f62");

const requestOptions = {
	method: "GET",
	headers: myHeaders,
};

function App() {
	const [listings, setListing] = useState([]);

	const fetchData = () => {
		fetch(
			"https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
			requestOptions
		)
			.then((res) => res.json())
			.then((res) => {
				setListing([...res.data]);
				console.log("=========>", res);
			})
			.catch((err) => console.log("=====ERR====>", err));
	};

	useInterval(() => {
		fetchData();
	}, 5000);

	return (
		<AppWrapper>
			<div>
				{listings.map(({ name }) => (
					<p>{name}</p>
				))}
			</div>
		</AppWrapper>
	);
}

const AppWrapper = styled.div`
	.App {
		text-align: center;
	}
	.App-header {
		background-color: #282c34;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: calc(10px + 2vmin);
		color: white;
	}
`;

export default App;
