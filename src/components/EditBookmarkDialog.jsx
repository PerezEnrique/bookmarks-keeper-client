import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import UserContext from "../contexts/UserContext";
import { Box, Button, Chip, Dialog, DialogTitle, Stack, TextField } from "@mui/material";

export default function EditBookmarkDialog({
	currentData: { _id, url: currentUrl, name: currentName, tags: currentTags },
	open,
	handleClose,
}) {
	const { editBookmark } = useContext(UserContext);

	const [url, setUrl] = useState(currentUrl);
	const [name, setName] = useState(currentName);
	const [tags, setTags] = useState(currentTags);
	const [newTag, setNewTag] = useState("");

	//to add the new tag when user press enter
	const handleKeyUp = (e) => {
		if (e.code == "Enter") {
			const tagsArray = [...tags];
			tagsArray.push(newTag);
			setTags(tagsArray);
			setNewTag("");
		}
	};

	const handleTagDelete = (tag) => {
		const tagsArray = tags.filter((elem) => elem !== tag);
		setTags(tagsArray);
		setNewTag("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		await editBookmark(_id, { url, name, tags });
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<Box sx={{ px: 4 }}>
				<DialogTitle>Edit bookmark</DialogTitle>
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						alignItems: "center",
						"& > :not(style)": { my: 1 },
					}}
				>
					<TextField
						label="url"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					></TextField>
					<TextField
						label="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					></TextField>
					<TextField
						label="tags"
						value={newTag}
						onChange={(e) => setNewTag(e.target.value)}
						onKeyUp={handleKeyUp}
						helperText="Add a tag and press enter"
					></TextField>
					<Stack direction="row" spacing={1}>
						{tags.map((tag) => (
							<Chip
								key={uuidv4()}
								size="small"
								label={tag}
								color="primary"
								onDelete={() => handleTagDelete(tag)}
							/>
						))}
					</Stack>
					<Button type="submit" variant="contained">
						Send
					</Button>
				</Box>
			</Box>
		</Dialog>
	);
}
