import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AuthenticationRoute from "./components/AuthenticationRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function AppRouter() {
	return (
		<Router>
			<Switch>
				<ProtectedRoute path="/home" component={HomePage} />
				<Route path="/not-found" component={NotFoundPage} />
				<AuthenticationRoute path="/sign-up" component={SignupPage} />
				<Route path="/log-out" component={LogoutPage} />
				<AuthenticationRoute path="/log-in" component={LoginPage} />
				<Redirect exact from="/" to="/log-in" />
				<Redirect to="not-found" />
			</Switch>
		</Router>
	);
}
