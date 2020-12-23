import React from "react";
import Card from "./Card";
import "./CardList.css";

export const CardList = (props) => {
	return (
		<div className="card-list">
			{props.redditData.map((data) => {
				return <Card key={data.id} redditData={data} />;
			})}
		</div>
	);
};
