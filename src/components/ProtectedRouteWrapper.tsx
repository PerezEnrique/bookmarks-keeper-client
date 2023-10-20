import React, { useContext } from "react";
import UserContext from "../contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouteWrapper() {
	const { user } = useContext(UserContext);
	
	if(!user) {
		return <Navigate to="/log-in" />;
	}

	return <Outlet/>
}
