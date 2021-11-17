import React from "react";
export default function ItemsList({
	totalItems,
	itemsToDisplay,
	loading,
	onNoItem,
	onLoading,
	onNoSearchResults,
	children,
}) {
	return (
		<main style={{ marginBottom: "25px" }}>
			{loading && onLoading}
			{!loading && !totalItems.length && onNoItem}
			{!loading && !!totalItems.length && !itemsToDisplay.length && onNoSearchResults}
			{!loading && !!itemsToDisplay.length && children}
		</main>
	);
}
