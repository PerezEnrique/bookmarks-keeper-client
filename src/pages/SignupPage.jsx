import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
	Container,
	Box,
	TextField,
	Typography,
	Button,
	Link,
	Alert,
} from "@mui/material";
import UserContext from "../contexts/UserContext";
import { createUser } from "../utils/validation-schemas/users-validation-schemas";
import useJoiValidation from "../hooks/useJoiValidation";

export default function SignupPage() {
	const { signup, error } = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [errors, setErrors] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

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
				<Button type="submit" variant="contained">
					Send
				</Button>
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
