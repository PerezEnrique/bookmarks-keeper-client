import React, { useContext, useState, FormEvent, MouseEventHandler } from "react";
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
import { LoadingButton } from "@mui/lab";
import UserContext from "../contexts/UserContext";
import useJoiValidation from "../hooks/useJoiValidation";
import { addBookmark as addBookmarkSchema } from "../utils/validation-schemas/bookmarks-validation-schemas";
import { BookmarkDTO, errorsObject } from "../types";

type AddBookmarkDialogProps = {
	open: boolean,
	handleClose: () => void
}

export default function AddBookmarkDialog({ open, handleClose }: AddBookmarkDialogProps) {
	const { addBookmark, userIsLoading, error } = useContext(UserContext);

	const [url, setUrl] = useState("");
	const [name, setName] = useState("");
	const [tags, setTags] = useState<string[]>([]);
	const [newTag, setNewTag] = useState("");
	const [errors, setErrors] = useState<errorsObject | null>(null);

	//to add the new tag when user press enter
	const handleAddTag: MouseEventHandler = (e) => {
		const currentErrors = { ...errors };
		delete currentErrors.tags;
		setErrors(currentErrors);

		if (newTag.length < 1) {
			setErrors({
				...errors,
				tags: "You can't add an empty tag",
			});
			return;
		}

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

	const handleTagDelete = (tag: string) => {
		const tagsArray = tags.filter((elem) => elem !== tag);
		setTags(tagsArray);
		setNewTag("");
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validationErrors = useJoiValidation<BookmarkDTO>(addBookmarkSchema, { url, name, tags });
		if (validationErrors) {
			setErrors(validationErrors);
			return;
		}

		await addBookmark({ url, name, tags });

		setUrl("");
		setName("");
		setTags([]);
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<Box sx={{ px: 4 }}>
				<DialogTitle>Add bookmark</DialogTitle>
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
						required
						onChange={(e) => setUrl(e.target.value)}
						error={errors?.url?.length ? true : false } //this component from material/ui won't accept truthy falsy booleans
						helperText={errors?.url}
						InputLabelProps={{ required: false }}
					></TextField>
					<TextField
						label="name"
						value={name}
						required
						onChange={(e) => setName(e.target.value)}
						error={errors?.name?.length ? true : false } //this component from material/ui won't accept truthy falsy booleans
						helperText={errors?.name}
						inputProps={{ maxLength: 50 }}
						InputLabelProps={{ required: false }}
					></TextField>
					<Stack direction={{ xs: "column", sm: "row" }} alignItems="center">
						<TextField
							sx={{ mb: { xs: 1, sm: 0 }, mr: { sm: 1 } }}
							label="tags"
							value={newTag}
							onChange={(e) => setNewTag(e.target.value)}
							error={errors?.tags?.length ? true : false } //this component from material/ui won't accept truthy falsy booleans
							helperText={errors?.tags}
							inputProps={{ maxLength: 50 }}
						></TextField>
						<Button variant="contained" onClick={handleAddTag}>
							Add tag
						</Button>
					</Stack>
					<Box sx={{ display: "flex", flexWrap: "wrap" }}>
						{tags.map((tag) => (
							<Chip
								key={uuidv4()}
								size="small"
								label={tag}
								color="primary"
								onDelete={() => handleTagDelete(tag)}
								sx={{ mr: 1, mb: 1 }}
							/>
						))}
					</Box>
					<LoadingButton loading={userIsLoading} type="submit" variant="contained">
						Send
					</LoadingButton>
				</Box>
			</Box>
		</Dialog>
	);
}
