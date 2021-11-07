import React, { createContext, useState, useEffect } from "react";
import http from "../services/httpService";
import {
	login as doLogin,
	getCurrentUser as doGetCurrentUser,
} from "../services/authService";
import { signup as doSignup } from "../services/usersService";
import useErrorHandler from "../hooks/useErrorHandler";

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState(null);
	const [userIsLoading, setUserIsloading] = useState(false);
	const [error, setError] = useState(null);

	const tokenKey = "auth-token";

	//with this when we have a token in our local storage it will be send by axios in a header in future request
	useEffect(() => {
		http.setToken(getToken());
	});

	//When this component is mounted it will make a request to current-user endopoint, if that request has a valid token we should get the current user
	useEffect(() => {
		async function getCurrentUser() {
			try {
				setUserIsloading(true);
				const { data } = await doGetCurrentUser();
				setUser(data);
				setUserIsloading(false);
			} catch (err) {
				setUserIsloading(false);
				return null;
			}
		}
		getCurrentUser();
	}, []);

	const getToken = function () {
		return localStorage.getItem(tokenKey);
	};

	const signup = async function (credentials) {
		try {
			setUserIsloading(true);
			const { headers, data } = await doSignup(credentials);
			const token = headers["authorization"];
			localStorage.setItem(tokenKey, token);
			setUser(data);
			setUserIsloading(data);
		} catch (err) {
			setError(useErrorHandler(err));
		}
	};

	const login = async function (credentials) {
		try {
			setUserIsloading(true);
			const { headers, data } = await doLogin(credentials);
			const token = headers["authorization"];
			localStorage.setItem(tokenKey, token);
			setUser(data);
			setUserIsloading(false);
		} catch (err) {
			setError(useErrorHandler(err));
		}
	};

	const logout = function () {
		localStorage.removeItem(tokenKey);
	};

	const providerValue = {
		user,
		userIsLoading,
		error,
		login,
		signup,
		logout,
	};

	return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
}

export default UserContext;
