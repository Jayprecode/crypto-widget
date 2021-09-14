import React, { useState } from "react";
import styled from "styled-components";
import useInterval from "./hooks/index";

function App() {
	const [listings, setListing] = useState([]);

	const fetchData = () => {
		fetch("http://localhost:5000/list-widget")
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
				<table className="widget">
					<thread className="widget--header">
						<tr>
							<th>#</th>
							<th>Crypto</th>
							<th>Price(USD)</th>
							<th>
								Price in Naira(#540)
							</th>
							<th>Market Cap</th>
							<th>Volume</th>
						</tr>
					</thread>
					<tbody>
						{listings.map(({ name, id, cmc_rank, quote }) => (
							<tr key={id}>
								<td>{cmc_rank}</td>
								<td>{name}</td>
								<td>{quote.USD.price}</td>
								<td>{quote.USD.price * 540}</td>
								<td>{quote.USD.market_cap}</td>
								<td>{quote.USD.volume_24h}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</AppWrapper>
	);
}

const AppWrapper = styled.div`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, 10%);
	.widget {
		width: 874px;
		/* max-width: 100%; */
		background-color: #22272e;
		border-radius: 13px;
		display: grid;
		margin-bottom: 50px;
		th,
		td {
			padding: 10px 20px;
			border: 1px solid #282f38;
		}

		tr:first-child th:first-child {
			border-top-left-radius: 10px;
		}

		tr:last-child th:last-child {
			border-top-right-radius: 10px;
		}

		tr:last-child td:first-child {
			border-bottom-left-radius: 10px;
		}

		tr:last-child td:last-child {
			border-bottom-right-radius: 10px;
		}

		td {
			color: #adbac7;
		}

		.widget--header {
			font-weight: 700;
			width: 100%;
		}
		.widget--header tr th:first-child {
			padding: 10px 23px;
		}
		.widget--header tr th:nth-child(2) {
			padding: 10px 52px;
		}
		.widget--header tr th:nth-child(3) {
			padding: 10px 48px;
		}
		.widget--header tr th:nth-child(4) {
			padding: 10px 20px;
			text-align: center;
		}
		.widget--header tr th:nth-child(5) {
			padding: 10px 46px;
			text-align: center;
		}
		.widget--header tr th:nth-child(6) {
			padding: 10px 57.7px;
			text-align: center;
		}

		.widget--header,
		.widget {
			text-align: left;
		}
	}
`;

export default App;
