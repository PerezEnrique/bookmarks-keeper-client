import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Box, TextField, Typography, Button, Link } from "@mui/material";
import UserContext from "../contexts/UserContext";

export default function LoginPage() {
	const { login } = useContext(UserContext);

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		await login({ username, password });
	};

	return (
		<Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
			<Typography component="h1" variant="h3" align="center" mb={3}>
				Log in
			</Typography>
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
				<Button type="submit" variant="contained">
					Send
				</Button>
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
