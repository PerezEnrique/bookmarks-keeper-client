import React, { useContext, useState, useEffect } from "react";
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

export default function SignupPage() {
	const { signup, error } = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [errors, setErrors] = useState(null);

	//to keep track of server errors
	useEffect(() => {
		setErrors({ fromServer: error });
	}, [error]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		await signup({ username, password });
	};

	return (
		<Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
			<Typography component="h1" variant="h3" align="center" mb={3}>
				Sign up
			</Typography>
			{errors && errors.fromServer && (
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
				/>
				<TextField
					label="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<TextField
					label="confirm password"
					type="password"
					value={passwordConfirm}
					onChange={(e) => setPasswordConfirm(e.target.value)}
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
