import UserCredentialsModel from "../domain/api-models/user-credentials-model";
import User from "../domain/entities/User";
import AuthServiceInterface from "../domain/services/auth-service-interface";
import HttpServiceInterface from "./http-service-interface";

export default class AuthService implements AuthServiceInterface {
    private readonly http: HttpServiceInterface<User>; 
    private readonly tokenKey = "auth-token";

    constructor(http: HttpServiceInterface<User>) {
        this.http = http;
    }

    getToken = () => {
		return localStorage.getItem(this.tokenKey);
	};

    getCurrentUser = async (): Promise<User | null> => {
        const { data } = await this.http.get<User>(`/auth/current-user`);
        return data;
    }
    
    logUserIn = async (user: UserCredentialsModel): Promise<User | null> => {
        const { data, headers } = await this.http.post<User>(`/auth/login`, user);
        const token = headers["authorization"];
        this.storeToken(token);
        return data;
    }

    storeToken = (token: string) : void => {
        localStorage.setItem(this.tokenKey, token);
    }
}