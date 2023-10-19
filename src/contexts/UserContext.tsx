import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/auth-service";
import http from "../services/httpService";
import User from "../domain/entities/User";
import { UserContext } from "../utils/types";
import UsersService from "../services/users-service";
import BookmarkInputModel from "../domain/api-models/bookmark-input-model";
import { userCredentialsDto } from "../utils/dtos";
import UserCredentialsModel from "../domain/api-models/user-credentials-model";

const authService = new AuthService();
const usersService = new UsersService(authService);
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
		http.setToken(authService.getToken());
	});

	//When this component is mounted it will make a request to current-user endopoint, if that request has a valid token we should get the current user
	useEffect(() => {
		async function getCurrentUser() {
			try {
				setUserIsloading(true);
				const user = await authService.getCurrentUser();
				setUser(user);
				setUserIsloading(false);
			} catch (err) {
				setUserIsloading(false);
				return null;
			}
		}
		getCurrentUser();
	}, []);

	const addBookmark = async function (content: BookmarkInputModel) {
		try {
			setError(null);
			setUserIsloading(true);
			const user = await usersService.addBookmark(content);
			setUser(user);
			setUserIsloading(false);
		} catch (err) {
			setError(http.handleError(err));
			setUserIsloading(false);
		}
	};

	const editBookmark = async function (id: string, content: BookmarkInputModel) {
		try {
			setError(null);
			setUserIsloading(true);
			const user = await usersService.editBookmark(id, content);
			setUser(user);
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
			const user = await authService.logUserIn(credentials as UserCredentialsModel);
			setUser(user);
			setUserIsloading(false);
		} catch (err) {
			setError(http.handleError(err));
			setUserIsloading(false);
		}
	};

	const logout = function () {
		localStorage.removeItem(tokenKey);
	};

	const updateUser = async function (content: userCredentialsDto) {
		try {
			setError(null);
			setUserIsloading(true);
			const user = await usersService.updateUser(content as UserCredentialsModel);
			setUser(user);
			setUserIsloading(false);
			setSuccessMessage("User info successfully updated");
		} catch (err) {
			setError(http.handleError(err));
			setUserIsloading(false);
		}
	};

	const removeBookmark = async function (id: string) {
		try {
			setError(null);
			setUserIsloading(true);
			const user = await usersService.removeBookmark(id);
			setUser(user);
			setUserIsloading(false);
		} catch (err) {
			setError(http.handleError(err));
			setUserIsloading(false);
		}
	};

	const signup = async function (credentials: userCredentialsDto) {
		try {
			setError(null);
			setUserIsloading(true);
			const user = await usersService.createUser(credentials as UserCredentialsModel);
			setUser(user);
			setUserIsloading(false);
		} catch (err) {
			setError(http.handleError(err));
			setUserIsloading(false);
		}
	};

	const providerValue = {
		addBookmark,
		editBookmark,
		error,
		login,
		logout,
		removeBookmark,
		signup,
		successMessage,
		updateUser,
		user,
		userIsLoading,
	};

	return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
}

export default UserContext;
