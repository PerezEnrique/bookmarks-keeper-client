import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
	Alert,
	Box,
	Button,
	Chip,
	Dialog,
	DialogTitle,
	Stack,
	TextField,
} from "@mui/material";
import UserContext from "../contexts/UserContext";
import useJoiValidation from "../hooks/useJoiValidation";
import { editBookmark as editBookmarkSchema } from "../utils/validation-schemas/bookmarks-validation-schemas";

export default function EditBookmarkDialog({
	currentData: { _id, url: currentUrl, name: currentName, tags: currentTags },
	open,
	handleClose,
}) {
	const { editBookmark, error } = useContext(UserContext);

	const [url, setUrl] = useState(currentUrl);
	const [name, setName] = useState(currentName);
	const [tags, setTags] = useState(currentTags);
	const [newTag, setNewTag] = useState("");
	const [errors, setErrors] = useState(null);

	//to add the new tag when user press enter
	const handleAddTag = (e) => {
		if (newTag.length > 50) {
			setErrors({
				...errors,
				tags: "tag length must be less or equal to 50 characters long",
			});
			return;
		}
		const tagsArray = [...tags];

		if (tagsArray.includes(newTag)) {
			setErrors({ ...errors, tags: "this bookmark already have that tag" });
			return;
		}

		tagsArray.push(newTag);
		setTags(tagsArray);
		setNewTag("");
	};

	const handleTagDelete = (tag) => {
		const tagsArray = tags.filter((elem) => elem !== tag);
		setTags(tagsArray);
		setNewTag("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const validationErrors = useJoiValidation(editBookmarkSchema, { url, name, tags });
		if (validationErrors) {
			setErrors(validationErrors);
			return;
		}

		await editBookmark(_id, { url, name, tags });
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<Box sx={{ px: 4 }}>
				<DialogTitle>Edit bookmark</DialogTitle>
				{error && (
					<Alert severity="error" sx={{ mb: 1 }}>
						{error}
					</Alert>
				)}
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						mb: 3,
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						alignItems: "center",
						"& > :not(style)": {
							my: 1,
							width: { sm: "450px" },
							maxWidth: { xs: "227px", sm: "initial" },
						},
					}}
				>
					<TextField
						label="url"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						error={errors && errors.url && errors.url.length > 0}
						helperText={errors && errors.url}
					></TextField>
					<TextField
						label="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						error={errors && errors.name && errors.name.length > 0}
						helperText={errors && errors.name}
					></TextField>
					<Stack direction={{ xs: "column", sm: "row" }} alignItems="center">
						<TextField
							sx={{ mb: { xs: 1, sm: 0 }, mr: { sm: 1 } }}
							label="tags"
							value={newTag}
							onChange={(e) => setNewTag(e.target.value)}
							helperText="Add a tag and press enter"
							error={errors && errors.tags && errors.tags.length > 0}
							helperText={errors && errors.tags}
						></TextField>
						<Button variant="contained" onClick={handleAddTag}>
							Add tag
						</Button>
					</Stack>
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
