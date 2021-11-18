import React, { useState } from "react";
import {
	Box,
	Card,
	CardMedia,
	CardContent,
	CardActions,
	IconButton,
	Chip,
	Link,
	Typography,
	Stack,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { v4 as uuidv4 } from "uuid";
import EditBookmarkDialog from "./EditBookmarkDialog";
import DeleteBookmarkDialog from "./DeleteBookmarkDialog";

export default function BookmarkCard({
	bookmark: { _id, url, imageUrl, title, name, description, tags },
	handleClickOnTag,
}) {
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	return (
		<Card sx={{ maxWidth: 400, mx: "auto" }}>
			<CardContent>
				<Typography component="h2" variant="h5" mb="1" sx={{ fontWeight: 700 }}>
					{name}
				</Typography>
				<Link href={url} underline="none">
					{url}
				</Link>
				<Box sx={{ mt: 1, display: "flex", flexWrap: "wrap" }}>
					{tags.map((tag) => (
						<Chip
							key={uuidv4()}
							clickable
							size="small"
							label={tag}
							color="primary"
							onClick={() => handleClickOnTag(tag)}
							sx={{ mr: 1, mb: 1 }}
						/>
					))}
				</Box>
			</CardContent>
			<Box
				sx={{
					width: "90%",
					paddingLeft: "5px",
					mx: "auto",
					borderLeftWidth: 2.5,
					borderLeftStyle: "solid",
					borderLeftColor: "primary.main",
				}}
			>
				<CardContent sx={{ padding: 0 }}>
					<Typography component="h4" variant="h7">
						{title}
					</Typography>
					<Typography color="text.secondary" fontSize="0.9rem">
						{description}
					</Typography>
				</CardContent>
				<CardMedia
					component="img"
					image={imageUrl}
					alt={`${name} url preview`}
					sx={{ display: "block", maxWidth: "100%", maxHeight: 215 }}
				/>
			</Box>
			<CardActions>
				<IconButton
					aria-label="edit bookmark"
					onClick={() => setEditModal(true)}
					sx={{ ml: "auto" }}
				>
					<Edit />
				</IconButton>
				<IconButton
					aria-label="delete bookmark"
					onClick={() => setDeleteModal(true)}
					sx={{ ml: "auto" }}
				>
					<Delete />
				</IconButton>
			</CardActions>
			<EditBookmarkDialog
				currentData={{ _id, url, name, tags }}
				open={editModal}
				handleClose={() => setEditModal(false)}
			/>
			<DeleteBookmarkDialog
				bookmarkId={_id}
				bookmarkName={name}
				open={deleteModal}
				handleClose={() => setDeleteModal(false)}
			/>
		</Card>
	);
}
