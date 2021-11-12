import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
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
}) {
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);

	return (
		<Card>
			<CardContent>
				<Typography component="h2" variant="h5" mb="1">
					{name}
				</Typography>
				<Link href={url} underline="none">
					{url}
				</Link>
				<Stack direction="row" spacing={1} sx={{ mt: 1 }}>
					{tags.map((tag) => (
						<Chip
							key={uuidv4()}
							clickable
							component={RouterLink}
							to="#"
							size="small"
							label={tag}
							color="primary"
						/>
					))}
				</Stack>
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
				currentData={{ url, name, tags }}
				open={editModal}
				handleClose={() => setEditModal(false)}
			/>
			<DeleteBookmarkDialog
				bookmarkId={_id}
				open={deleteModal}
				handleClose={() => setDeleteModal(false)}
			/>
		</Card>
	);
}
