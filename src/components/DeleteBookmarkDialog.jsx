import React, { useContext } from "react";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
} from "@mui/material";
import UserContext from "../contexts/UserContext";

export default function DeleteBookmarkDialog({
	bookmarkId,
	bookmarkName,
	open,
	handleClose,
}) {
	const { removeBookmark } = useContext(UserContext);

	const handleDelete = async (_id) => {
		await removeBookmark(_id);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">Confirm deleteion</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					Delete {bookmarkName} bookmark?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={() => handleDelete(bookmarkId)} color="error">
					Delete
				</Button>
			</DialogActions>
		</Dialog>
	);
}
