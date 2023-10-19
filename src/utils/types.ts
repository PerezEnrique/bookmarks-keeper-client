import BookmarkInputModel from "../domain/api-models/bookmark-input-model"
import User from "../domain/entities/User"
import { userCredentialsDto } from "./dtos"

export type errorsObject = {
    [key: string]: string
}

export type UserContext = {
    user: User | null,
    userIsLoading: boolean,
    successMessage: string | null,
    error: string | null,
    signup(credentials: userCredentialsDto): void,
    login(credentials: userCredentialsDto): void,
    updateUser(content: userCredentialsDto): void,
    logout(): void,
    addBookmark(content: BookmarkInputModel): void,
    editBookmark(_id: string, content: BookmarkInputModel): void,
    removeBookmark(_id: string): void,
}