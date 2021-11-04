import React from "react";
import { UserProvider } from "./contexts/UserContext";
import AppRouter from "./AppRouter";

export default function App() {
	return (
		<UserProvider>
			<AppRouter />
		</UserProvider>
	);
}
