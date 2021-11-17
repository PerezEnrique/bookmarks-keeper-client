import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import AuthenticationRoute from "./components/AuthenticationRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function AppRouter() {
	return (
		<Router>
			<Switch>
				<AuthenticationRoute path="/sign-up" component={SignupPage} />
				<ProtectedRoute path="/profile" component={ProfilePage} />
				<ProtectedRoute path="/home" component={HomePage} />
				<Route path="/not-found" component={NotFoundPage} />
				<Route path="/log-out" component={LogoutPage} />
				<AuthenticationRoute path="/log-in" component={LoginPage} />
				<Redirect exact from="/" to="/log-in" />
				<Redirect to="not-found" />
			</Switch>
		</Router>
	);
}
