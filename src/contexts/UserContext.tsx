import React, { createContext, useState, useEffect } from "react";
import http from "../services/httpService";
import { UserContext } from "../utils/types";
import User from "../domain/User";
import { bookmarkInputDto, userCredentialsDto } from "../utils/dtos";

const UserContext = createContext<UserContext>({} as UserContext);

export type UserProviderProps = {
	children: JSX.Element | JSX.Element[]
}

export function UserProvider({ children } : UserProviderProps) {
	const [user, setUser] = useState<User | null>(null);
	const [userIsLoading, setUserIsloading] = useState(false);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

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
				const { data } = await http.get(`/auth/current-user`);
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

	const signup = async function (credentials: userCredentialsDto) {
		try {
			setError(null);
			setUserIsloading(true);
			const { headers, data } = await http.post(`/users`, credentials);
			const token = headers["authorization"];
			localStorage.setItem(tokenKey, token);
			setUser(data);
			setUserIsloading(false);
		} catch (err) {
			setError(http.handleError(err));
			setUserIsloading(false);
		}
	};

	const login = async function (credentials: userCredentialsDto) {
		try {
			setError(null);
			setUserIsloading(true);
			const { headers, data } = await http.post(`/auth/login`, credentials);
			const token = headers["authorization"];
			localStorage.setItem(tokenKey, token);
			setUser(data);
			setUserIsloading(false);
		} catch (err) {
			setError(http.handleError(err));
			setUserIsloading(false);
		}
	};

	const updateUser = async function (content: userCredentialsDto) {
		try {
			setError(null);
			setUserIsloading(true);
			const { headers, data } = await http.put("/users", content);
			const token = headers["authorization"];
			localStorage.setItem(tokenKey, token);
			setUser(data);
			setUserIsloading(false);
			setSuccessMessage("User info successfully updated");
		} catch (err) {
			setError(http.handleError(err));
			setUserIsloading(false);
		}
	};

	const logout = function () {
		localStorage.removeItem(tokenKey);
	};

	const addBookmark = async function (content: bookmarkInputDto) {
		try {
			setError(null);
			setUserIsloading(true);
			const { data } = await http.post("/users/bookmarks", content);
			setUser(data);
			setUserIsloading(false);
		} catch (err) {
			setError(http.handleError(err));
			setUserIsloading(false);
		}
	};

	const editBookmark = async function (id: string, content: bookmarkInputDto) {
		try {
			setError(null);
			setUserIsloading(true);
			const { data } = await http.put(`/users/bookmarks/${id}`, content);
			setUser(data);
			setUserIsloading(false);
		} catch (err) {
			setError(http.handleError(err));
			setUserIsloading(false);
		}
	};

	const removeBookmark = async function (id: string) {
		try {
			setError(null);
			setUserIsloading(true);
			const { data } = await http.delete(`/users/bookmarks/${id}`);
			setUser(data);
			setUserIsloading(false);
		} catch (err) {
			setError(http.handleError(err));
			setUserIsloading(false);
		}
	};

	const providerValue = {
		user,
		userIsLoading,
		successMessage,
		error,
		login,
		signup,
		updateUser,
		logout,
		addBookmark,
		editBookmark,
		removeBookmark,
	};

	return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
}

export default UserContext;
