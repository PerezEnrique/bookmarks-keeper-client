import React, { useContext, useState, FormEvent } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Box, TextField, Typography, Alert, Link } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import UserContext from "../contexts/UserContext";
import { logUserIn as logUserInSchema } from "../utils/validation-schemas/users-validation-schemas";
import useJoiValidation from "../hooks/useJoiValidation";
import { UserDTO, errorsObject} from "../types";

export default function LoginPage() {
	const { login, userIsLoading, error } = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<errorsObject | null>(null);

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setErrors(null);

		const validationErrors = useJoiValidation<UserDTO>(logUserInSchema, { username, password });
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
					error={errors?.username?.length ? true : false } //this component from material/ui won't accept truthy falsy booleans
					helperText={errors?.username}
					inputProps={{ maxLength: 30 }}
					InputLabelProps={{ required: false }}
				/>
				<TextField
					label="password"
					type="password"
					value={password}
					required
					onChange={(e) => setPassword(e.target.value)}
					error={errors?.password?.length ? true : false } //this component from material/ui won't accept truthy falsy booleans
					helperText={errors?.password}
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
