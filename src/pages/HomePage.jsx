import React, { useContext, useState, useEffect } from "react";
import {
	Box,
	CssBaseline,
	Chip,
	CircularProgress,
	Container,
	Grid,
	Link,
	Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import UserContext from "../contexts/UserContext";
import ItemsList from "../components/ItemsList";
import BookmarkCard from "../components/BookmarkCard";
import Header from "../components/Header";

export default function HomePage({ location }) {
	const { user, userIsLoading } = useContext(UserContext);
	const { username, bookmarks } = user;

	const [itemsToDisplay, setItemsToDisplay] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [filterTags, setFilterTags] = useState([]);

	const handleClickOnTag = (tag) => {
		const tagsArray = [...filterTags];
		tagsArray.push(tag);
		setFilterTags(tagsArray);
	};

	const handleDeleteTagFilter = (tag) => {
		const tagsArray = filterTags.filter((elem) => elem !== tag);
		setFilterTags(tagsArray);
	};

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

		//filter by query
		filteredBookmarks = filteredBookmarks.filter((bookmark) => {
			const regex = new RegExp(searchText, "i");
			return regex.test(bookmark.name);
		});

		//filter by tag
		filteredBookmarks = filteredBookmarks.filter((bookmark) => {
			return filterTags.every((tag) => {
				return bookmark.tags.includes(tag);
			});
		});

		setItemsToDisplay(filteredBookmarks);
	}, [userIsLoading, searchText, filterTags]);

	return (
		<React.Fragment>
			<CssBaseline />
			<Header location={location} searchText={searchText} handleSearch={setSearchText} />
			<Container sx={{ mt: 6 }}>
				<Typography component="h1" variant="h4" mb={2} sx={{ fontWeight: 700 }}>
					Your bookmarks, {username}
				</Typography>
				{!!filterTags.length && (
					<Box component="section" sx={{ mb: 3, ml: { md: "70%" } }}>
						<Typography mb={1} color="text.secondary">
							Filtering tags:
						</Typography>
						<Box
							sx={{ display: "flex", flexWrap: "wrap", maxWidth: "18rem", ml: "2rem" }}
						>
							{filterTags.map((tag) => (
								<Chip
									key={uuidv4()}
									clickable
									size="small"
									label={tag}
									color="primary"
									onDelete={() => handleDeleteTagFilter(tag)}
									sx={{ mr: 1, mb: 1 }}
								/>
							))}
						</Box>
					</Box>
				)}
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
							There's no bookmark to show.{" "}
							<Link to="#" component={RouterLink} underline="none">
								Create one?
							</Link>
						</Typography>
					}
					onNoSearchResults={
						<Typography component="h2" variant="h5">
							There's no results for {searchText && `"${searchText}"`}{" "}
							{searchText && !!filterTags.length && "with"}{" "}
							{!!filterTags.length && `tags ${filterTags.join(", ")}`}
						</Typography>
					}
				>
					{(bookmark) => (
						<Grid item key={bookmark._id} item xs={12} md={6} lg={4}>
							<BookmarkCard bookmark={bookmark} handleClickOnTag={handleClickOnTag} />
						</Grid>
					)}
				</ItemsList>
			</Container>
		</React.Fragment>
	);
}
