import BookmarkInputModel from "../api-models/bookmark-input-model";
import UserCredentialsModel from "../api-models/user-credentials-model";
import User from "../entities/User";

export default interface UsersServiceInterface {
    addBookmark(bookmark: BookmarkInputModel) : Promise<User | null>
    editBookmark(bookmarkId: string, bookmark: BookmarkInputModel) : Promise<User | null>
    updateUser(user: UserCredentialsModel) : Promise<User | null>
    removeBookmark(bookmarkId: string) : Promise<User | null>
    createUser(user: UserCredentialsModel): Promise<User | null>;
}