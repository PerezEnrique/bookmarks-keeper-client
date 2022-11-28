import React, { useContext, useState, useEffect } from "react";
import {
	Alert,
	Box,
	Button,
	CssBaseline,
	Chip,
	CircularProgress,
	Container,
	Drawer,
	Grid,
	Link,
	Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
import UserContext from "../contexts/UserContext";
import AddBookmarkDialog from "../components/AddBookmarkDialog";
import ItemsList from "../components/ItemsList";
import BookmarkCard from "../components/BookmarkCard";
import Header from "../components/Header";
import NavDrawer from "../components/NavDrawer";
import { Bookmark } from "../utils/types/bookmark.type";

export default function HomePage({ location } : {location: Location}) {
	const { user, userIsLoading, error } = useContext(UserContext);
	const { username, bookmarks } = user!; //Since this is a protected route user will never be null here

	const [itemsToDisplay, setItemsToDisplay] = useState<Bookmark[]>([]);
	const [searchText, setSearchText] = useState("");
	const [filterTags, setFilterTags] = useState<string[]>([]);
	const [addModal, setAddModal] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);

	const handleDrawerOpen = () => {
		setDrawerOpen(!drawerOpen);
	};

	const handleClickOnTag = (tag: string) => {
		const tagsArray = [...filterTags];

		if (tagsArray.includes(tag)) return;

		tagsArray.push(tag);
		setFilterTags(tagsArray);
	};

	const handleDeleteTagFilter = (tag: string) => {
		const tagsArray = filterTags.filter((elem) => elem !== tag);
		setFilterTags(tagsArray);
	};

	//set bookmarks to display to all user's bookmarks, everytime user changes
	useEffect(() => {
		if (userIsLoading) return;
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
			<Header
				location={location}
				searchText={searchText}
				handleSearch={setSearchText}
				handleClickOnMenu={handleDrawerOpen}
			/>
			<Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
				<NavDrawer />
			</Drawer>
			<Container sx={{ mt: 6 }}>
				<Typography component="h1" variant="h4" mb={2} sx={{ fontWeight: 700 }}>
					Your bookmarks, {username}
				</Typography>
				<Button
					variant="contained"
					sx={{ mb: 3 }}
					endIcon={<AddIcon sx={{ mb: "2.5px" }} />}
					onClick={() => setAddModal(true)}
				>
					Add bookmark
				</Button>
				{error && (
					<Alert severity="error" sx={{ maxWidth: 500, mb: 2 }}>
						{error}
					</Alert>
				)}
				<AddBookmarkDialog open={addModal} handleClose={() => setAddModal(false)} />
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
					itemsToDisplay={itemsToDisplay}
					loading={userIsLoading}
					onLoading={
						<Box sx={{ textAlign: "center" }}>
							<CircularProgress />
						</Box>
					}
					onNoItem={
						<Typography component="h2" variant="h5">
							There's no bookmark to show.{" "}
							<Link
								component="button"
								underline="none"
								variant="h5"
								onClick={() => setAddModal(true)}
							>
								Create one
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
					<Grid container spacing={2}>
						{itemsToDisplay.map((bookmark) => (
							<Grid item key={bookmark._id} xs={12} md={6} lg={4}>
								<BookmarkCard bookmark={bookmark} handleClickOnTag={handleClickOnTag} />
							</Grid>
						))}
					</Grid>
				</ItemsList>
			</Container>
		</React.Fragment>
	);
}
