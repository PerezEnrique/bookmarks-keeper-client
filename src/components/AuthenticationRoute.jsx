import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../contexts/UserContext";

export default function AuthenticationRoute({
	path,
	component: Component,
	render,
	...rest
}) {
	//We need render because is posible that this auth route needs aditional custom props
	//render is the function you pass to render={--> (props) <--}
	//...rest is because is possible this object might have other properties.

	const { user } = useContext(UserContext);

	return (
		<Route
			path={path}
			{...rest}
			render={(props) => {
				if (user) return <Redirect to="/home" />;
				else if (Component) return <Component {...props} />;
				else return render(props); //We are passing this props to the component that this render function will return
			}}
		/>
	);
}
