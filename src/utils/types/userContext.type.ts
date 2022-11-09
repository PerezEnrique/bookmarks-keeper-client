import { BookmarkDTO } from "./bookmark.type";
import { User, UserDTO } from "./user.type";

export type UserContext = {
    user: User | null,
    userIsLoading: boolean,
    successMessage: string | null,
    error: string | null,
    signup(credentials: UserDTO): void,
    login(credentials: UserDTO): void,
    updateUser(content: UserDTO): void,
    logout(): void,
    addBookmark(content: BookmarkDTO): void,
    editBookmark(_id: string, content: BookmarkDTO): void,
    removeBookmark(_id: string): void,
}