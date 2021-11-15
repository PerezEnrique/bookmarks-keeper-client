import React, { useContext, useState, useEffect } from "react";
import {
	Box,
	CssBaseline,
	CircularProgress,
	Container,
	Grid,
	Typography,
} from "@mui/material";
import UserContext from "../contexts/UserContext";
import ItemsList from "../components/ItemsList";
import BookmarkCard from "../components/BookmarkCard";
import Header from "../components/Header";

export default function HomePage({ location }) {
	const { user, userIsLoading } = useContext(UserContext);
	const { username, bookmarks } = user;

	const [itemsToDisplay, setItemsToDisplay] = useState([]);
	const [searchText, setSearchText] = useState("");

	//set bookmarks to display to all user's bookmarks, everytime user changes
	useEffect(() => {
		if (userIsLoading) return;
		if (bookmarks.length < 1) return;
		setItemsToDisplay([...bookmarks]);
	}, [userIsLoading, user]);

	useEffect(() => {
		if (userIsLoading) return;
		if (bookmarks.length < 1) return;

		let filteredBookmarks = [...bookmarks];
		filteredBookmarks = bookmarks.filter((bookmark) => {
			const regex = new RegExp(searchText, "i");
			return regex.test(bookmark.name);
		});
		setItemsToDisplay(filteredBookmarks);
	}, [userIsLoading, user, searchText]);

	return (
		<React.Fragment>
			<CssBaseline />
			<Header location={location} searchText={searchText} handleSearch={setSearchText} />
			<Container sx={{ mt: 6 }}>
				<Typography component="h1" variant="h4" mb={3}>
					Your bookmarks, {username}
				</Typography>
				<ItemsList
					totalItems={bookmarks}
					itemsToDisplay={itemsToDisplay} //for the moment it is going to be equal to totalBookmarks
					loading={userIsLoading}
					onLoading={
						<Box sx={{ textAlign: "center" }}>
							<CircularProgress />
						</Box>
					}
					onNoItem={
						<Typography component="h2" variant="h5">
							There's no bookmark to show. Create one?
						</Typography>
					}
					onNoSearchResults={
						<Typography component="h2" variant="h5">
							There's no results for "{searchText}"
						</Typography>
					}
				>
					{(bookmark) => (
						<Grid item key={bookmark._id} item xs={12} md={6} lg={4}>
							<BookmarkCard bookmark={bookmark} />
						</Grid>
					)}
				</ItemsList>
			</Container>
		</React.Fragment>
	);
}
