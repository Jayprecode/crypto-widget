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
				<table id="widget">
					<tbody>
						<tr>
							{listings.map(({ name }) => (
								<th>{name}</th>
							))}
						</tr>
					</tbody>
				</table>
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
	#widget {
		text-align: center;
		font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
		border-collapse: collapse;
		border: 3px solid #ddd;
		width: 100%;
	}

	#widget td,
	#widget th {
		border: 1px solid #ddd;
		padding: 8px;
	}

	#widget tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	#widget tr:hover {
		background-color: #ddd;
	}

	#widget th {
		padding-top: 12px;
		padding-bottom: 12px;
		text-align: center;
		background-color: #4caf50;
		color: white;
	}
`;

export default App;
