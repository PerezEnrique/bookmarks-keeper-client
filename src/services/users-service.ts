import BookmarkInputModel from "../domain/api-models/bookmark-input-model";
import UserCredentialsModel from "../domain/api-models/user-credentials-model";
import User from "../domain/entities/User";
import AuthServiceInterface from "../domain/services/auth-service-interface";
import HttpServiceInterface from "./http-service-interface";
import UsersServiceInterface from "../domain/services/users-service-interface";

export default class UsersService implements UsersServiceInterface {
  private readonly http: HttpServiceInterface<User>; 
  private readonly authService: AuthServiceInterface;

  constructor(http: HttpServiceInterface<User>,authService: AuthServiceInterface) {
    this.authService = authService;
    this.http = http;
  }

  addBookmark = async (bookmark: BookmarkInputModel): Promise<User | null> => {
    const { data } = await this.http.post<User>("/users/bookmarks", bookmark);
    return data;
  };

  createUser = async (user: UserCredentialsModel): Promise<User | null> => {
    const { headers, data } = await this.http.post<User>(`/users`, user);
    const token = headers["authorization"];
    this.authService.storeToken(token);
    return data;
  };

  editBookmark = async (
    bookmarkId: string,
    bookmark: BookmarkInputModel
  ): Promise<User | null> => {
    const { data } = await this.http.put<User>(`/users/bookmarks/${bookmarkId}`, bookmark);
    return data;
  };

  updateUser = async (user: UserCredentialsModel): Promise<User | null> => {
    const { headers, data } = await this.http.put<User>("/users", user);
    const token = headers["authorization"];
    this.authService.storeToken(token);
    return data;
  };

  removeBookmark = async (bookmarkId: string): Promise<User | null> => {
    const { data } = await this.http.delete<User>(`/users/bookmarks/${bookmarkId}`);
    return data;
  };
}
