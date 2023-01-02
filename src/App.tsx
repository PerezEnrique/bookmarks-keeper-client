import React from "react";
import { UserProvider } from "./contexts/UserContext";
import AppRouter from "./AppRouter";
import "./assets/styles/fonts.css";

export default function App() {
	return (
		<UserProvider>
			<AppRouter />
		</UserProvider>
	);
}
