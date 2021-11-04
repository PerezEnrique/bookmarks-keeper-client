import http from "./httpService";

export function getCurrentUser() {
	return http.get(`/auth/current-user`);
}

export function login(credentials) {
	return http.post(`/auth/login`, credentials);
}
