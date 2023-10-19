import BookmarkInputModel from "../domain/api-models/bookmark-input-model";
import UserCredentialsModel from "../domain/api-models/user-credentials-model";
import User from "../domain/entities/User";
import AuthServiceInterface from "../domain/services/auth-service-interface";
import UsersServiceInterface from "../domain/services/users-service-interface";
import http from "./httpService";

export default class UsersService implements UsersServiceInterface {
  private readonly authService: AuthServiceInterface;
  constructor(authService: AuthServiceInterface) {
    this.authService = authService;
  }

  addBookmark = async (bookmark: BookmarkInputModel): Promise<User | null> => {
    const { data } = await http.post("/users/bookmarks", bookmark);
    return data;
  };

  createUser = async (user: UserCredentialsModel): Promise<User | null> => {
    const { headers, data } = await http.post(`/users`, user);
    const token = headers["authorization"];
    this.authService.storeToken(token);
    return data;
  };

  editBookmark = async (
    bookmarkId: string,
    bookmark: BookmarkInputModel
  ): Promise<User | null> => {
    const { data } = await http.put(`/users/bookmarks/${bookmarkId}`, bookmark);
    return data;
  };

  updateUser = async (user: UserCredentialsModel): Promise<User | null> => {
    const { headers, data } = await http.put("/users", user);
    const token = headers["authorization"];
    this.authService.storeToken(token);
    return data;
  };

  removeBookmark = async (bookmarkId: string): Promise<User | null> => {
    const { data } = await http.delete(`/users/bookmarks/${bookmarkId}`);
    return data;
  };
}
