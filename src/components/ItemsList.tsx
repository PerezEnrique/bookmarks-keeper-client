import React from "react";

type ItemsListProps<T> = {
	totalItems: T[],
	itemsToDisplay: T[],
	loading: boolean,
	onNoItem: string | JSX.Element | JSX.Element[]
	onLoading: unknown,
	onNoSearchResults: string | JSX.Element | JSX.Element[]
	children: JSX.Element | JSX.Element[]
}

export default function ItemsList<T>({
	totalItems,
	itemsToDisplay,
	loading,
	onNoItem,
	onLoading,
	onNoSearchResults,
	children,
}: ItemsListProps<T>) {
	return (
		<main style={{ marginBottom: "25px" }}>
			{loading && onLoading}
			{!loading && !totalItems.length && onNoItem}
			{!loading && !!totalItems.length && !itemsToDisplay.length && onNoSearchResults}
			{!loading && !!itemsToDisplay.length && children}
		</main>
	);
}
