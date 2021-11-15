import React from "react";
import { Grid } from "@mui/material";

export default function ItemsList({
	totalItems,
	itemsToDisplay,
	loading,
	onNoItem,
	onLoading,
	onNoSearchResults,
	render,
	children,
}) {
	return (
		<main>
			{loading && onLoading}
			{!loading && !totalItems.length && onNoItem}
			{!loading && !!totalItems.length && !itemsToDisplay.length && onNoSearchResults}
			{!loading && !!itemsToDisplay.length && (
				<Grid container spacing={2}>
					{itemsToDisplay.map(children || render)}
				</Grid>
			)}
		</main>
	);
}
