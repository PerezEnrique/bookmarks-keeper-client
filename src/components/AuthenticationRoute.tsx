import React, { useContext } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function AuthenticationRoute({
	path,
	component: Component,
	render,
	...rest
} : RouteProps) {	
	const { user } = useContext(UserContext);
	return (
		<Route
			path={path}
			{...rest}
			render={(props) => {
				if (user) return <Redirect to="/home" />;
				if (Component) return <Component {...props} />;
				if (render) return render(props);
			}}
		/>
	);
}
