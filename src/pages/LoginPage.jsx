import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Box, TextField, Typography, Alert, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import UserContext from "../contexts/UserContext";
import { logUserIn } from "../utils/validation-schemas/users-validation-schemas";
import useJoiValidation from "../hooks/useJoiValidation";

export default function LoginPage() {
	const { login, userIsLoading, error } = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		setErrors(null);

		const validationErrors = useJoiValidation(logUserIn, { username, password });
		if (validationErrors) {
			setErrors(validationErrors);
			return;
		}

		await login({ username, password });
	};

	return (
		<Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
			<Typography component="h1" variant="h3" align="center" mb={3}>
				Log in
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
				<LoadingButton loading={userIsLoading} type="submit" variant="contained">
					Send
				</LoadingButton>
			</Box>
			<Typography align="center">
				Don't have an account?{" "}
				<Link to="/sign-up" component={RouterLink}>
					Sign up
				</Link>
			</Typography>
		</Container>
	);
}
