import React, { useContext, useEffect } from "react";
import UserContext from "../contexts/UserContext";

export default function LogoutPage() {
	const { logout } = useContext(UserContext);

	useEffect(() => {
		logout();
		window.location = "/";
	}, []);

	return null;
}
