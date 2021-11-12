import React, { useContext } from "react";
import { CssBaseline, CircularProgress, Container, Typography } from "@mui/material";
import UserContext from "../contexts/UserContext";
import ItemsList from "../components/ItemsList";
import BookmarkCard from "../components/BookmarkCard";

export default function HomePage() {
	const { user, userIsLoading } = useContext(UserContext);

	const searchText = "temporary value for search text ";

	return (
		<React.Fragment>
			<CssBaseline />
			<Container sx={{ mt: 6 }}>
				<Typography component="h1" variant="h4" mb={3}>
					Your bookmarks, {user.username}
				</Typography>
				<ItemsList
					totalItems={user.bookmarks}
					itemsToDisplay={user.bookmarks} //for the moment it is going to be equal to totalBookmarks
					searchText={searchText}
					loading={userIsLoading}
					onLoading={<CircularProgress />}
					onNoItem={
						<Typography variant="h2">There's no bookmark to show. Create one?</Typography>
					}
					onNoSearchResult={(searchText) => (
						<Typography variant="h2">There's no results for {searchText}</Typography>
					)}
				>
					{(bookmark) => <BookmarkCard key={bookmark._id} bookmark={bookmark} />}
				</ItemsList>
			</Container>
		</React.Fragment>
	);
}
