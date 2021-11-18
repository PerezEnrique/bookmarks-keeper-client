import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Box, TextField, Typography, Link, Alert } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import UserContext from "../contexts/UserContext";
import { createUser } from "../utils/validation-schemas/users-validation-schemas";
import useJoiValidation from "../hooks/useJoiValidation";

export default function SignupPage() {
	const { signup, userIsLoading, error } = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [errors, setErrors] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setErrors(null);

		const validationErrors = useJoiValidation(createUser, {
			username,
			password,
			passwordConfirm,
		});
		if (validationErrors) {
			setErrors(validationErrors);
			return;
		}

		await signup({ username, password });
	};

	return (
		<Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
			<Typography component="h1" variant="h3" align="center" mb={3}>
				Sign up
			</Typography>
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
					"& > :not(style)": { my: 1, width: 3 / 4 },
				}}
			>
				<TextField
					label="username"
					value={username}
					required
					onChange={(e) => setUsername(e.target.value)}
					error={errors && errors.username && errors.username.length > 0} //because this component from material/ui doesn't accept truthy falsy booleans
					helperText={errors && errors.username}
					inputProps={{ maxLength: 30 }}
					InputLabelProps={{ required: false }}
				/>
				<TextField
					label="password"
					type="password"
					value={password}
					required
					onChange={(e) => setPassword(e.target.value)}
					error={errors && errors.password && errors.password.length > 0}
					helperText={errors && errors.password}
					inputProps={{ minLength: 5, maxLength: 1024 }}
					InputLabelProps={{ required: false }}
				/>
				<TextField
					label="confirm password"
					type="password"
					value={passwordConfirm}
					required
					onChange={(e) => setPasswordConfirm(e.target.value)}
					error={errors && errors.passwordConfirm && errors.passwordConfirm.length > 0}
					helperText={errors && errors.passwordConfirm}
					inputProps={{ minLength: 5, maxLength: 1024 }}
					InputLabelProps={{ required: false }}
				/>
				<LoadingButton loading={userIsLoading} type="submit" variant="contained">
					Send
				</LoadingButton>
			</Box>
			<Typography align="center">
				Already have an account?{" "}
				<Link to="/log-in" component={RouterLink}>
					Log in
				</Link>
			</Typography>
		</Container>
	);
}
