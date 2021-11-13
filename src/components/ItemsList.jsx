import Masonry from "@mui/lab/Masonry";
import React from "react";

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
			{!loading && totalItems.length && !itemsToDisplay && onNoSearchResults}
			{!loading && itemsToDisplay && (
				<Masonry columns={3} spacing={3}>
					{itemsToDisplay.map(children || render)}
				</Masonry>
			)}
		</main>
	);
}
