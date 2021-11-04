import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";

export default function HomePage() {
	const { user } = useContext(UserContext);

	return (
		<div>
			<h1>This will be the homepage</h1>
			<p>Current user is {user.username}</p>
		</div>
	);
}
