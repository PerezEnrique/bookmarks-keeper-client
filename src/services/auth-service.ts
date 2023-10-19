import UserCredentialsModel from "../domain/api-models/user-credentials-model";
import User from "../domain/entities/User";
import AuthServiceInterface from "../domain/services/auth-service-interface";
import http from "./httpService";

export default class AuthService implements AuthServiceInterface {
    private readonly tokenKey = "auth-token";

    getToken = () => {
		return localStorage.getItem(this.tokenKey);
	};

    getCurrentUser = async (): Promise<User | null> => {
        const { data } = await http.get(`/auth/current-user`);
        return data;
    }
    
    logUserIn = async (user: UserCredentialsModel): Promise<User | null> => {
        const { data, headers } = await http.post(`/auth/login`, user);
        const token = headers["authorization"];
        this.storeToken(token);
        return data;
    }

    storeToken = (token: string) : void => {
        localStorage.setItem(this.tokenKey, token);
    }
}