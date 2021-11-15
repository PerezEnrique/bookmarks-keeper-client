import React, { useContext } from "react";
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

export default function HomePage() {
	const { user, userIsLoading } = useContext(UserContext);

	const searchText = "temporary value for search text";

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
