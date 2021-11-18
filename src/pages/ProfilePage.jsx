import React, { useState, useContext } from "react";
import { Alert, Box, CssBaseline, Container, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import UserContext from "../contexts/UserContext";
import Header from "../components/Header";
import { updateUser as updateUserSchema } from "../utils/validation-schemas/users-validation-schemas";
import useJoiValidation from "../hooks/useJoiValidation";

export default function ProfilePage() {
	const { user, updateUser, userIsLoading, successMessage, error } =
		useContext(UserContext);

	const [username, setUsername] = useState(user.username);
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [errors, setErrors] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setErrors(null);

		const validationErrors = useJoiValidation(updateUserSchema, {
			username,
			password,
			passwordConfirm,
		});
		if (validationErrors) {
			setErrors(validationErrors);
			return;
		}

		await updateUser({ username, password });
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<Header location={location} />
			<Container component="main" sx={{ mt: 6 }}>
				<Typography component="h1" variant="h4" mb={2} sx={{ fontWeight: 700 }}>
					Profile info
				</Typography>
				{successMessage && (
					<Alert severity="success" sx={{ maxWidth: "30rem", mb: 1 }}>
						{successMessage}
					</Alert>
				)}
				{error && (
					<Alert severity="error" sx={{ maxWidth: "30rem", mb: 1 }}>
						{error}
					</Alert>
				)}
				<Box
					component="form"
					onSubmit={handleSubmit}
					sx={{
						maxWidth: "30rem",
						mb: 3,
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
						alignItems: "center",
						"& > :not(style)": { my: 1, width: "100%" },
					}}
				>
					<TextField
						label="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						error={errors && errors.username && errors.username.length > 0} //because this component from material/ui doesn't accept truthy falsy booleans
						helperText={errors && errors.username}
					/>
					<TextField
						label="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						error={errors && errors.password && errors.password.length > 0}
						helperText={errors && errors.password}
					/>
					<TextField
						label="confirm password"
						type="password"
						value={passwordConfirm}
						onChange={(e) => setPasswordConfirm(e.target.value)}
						error={errors && errors.passwordConfirm && errors.passwordConfirm.length > 0}
						helperText={errors && errors.passwordConfirm}
					/>
					<LoadingButton loading={userIsLoading} type="submit" variant="contained">
						Update profile
					</LoadingButton>
				</Box>
			</Container>
		</React.Fragment>
	);
}
