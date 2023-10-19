import UserCredentialsModel from "../api-models/user-credentials-model";
import User from "../entities/User";

export default interface AuthServiceInterface {
    getToken() : void;
    getCurrentUser() : Promise<User | null>;
    logUserIn(user: UserCredentialsModel) : Promise<User | null>
    storeToken(token: string): void
}