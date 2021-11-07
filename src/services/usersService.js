import http from "./httpService";

export function signup(credentials) {
	return http.post(`/users`, credentials);
}
