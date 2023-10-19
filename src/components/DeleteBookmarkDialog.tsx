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

type DeleteBookmarkDialogProps = {
	bookmarkId: string,
	bookmarkName: string,
	open: boolean,
	handleClose: () => void
}

export default function DeleteBookmarkDialog({
	bookmarkId,
	bookmarkName,
	open,
	handleClose,
}: DeleteBookmarkDialogProps) {

	const { removeBookmark } = useContext(UserContext);

	const handleDelete = async (id: string) => {
		await removeBookmark(id);
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
