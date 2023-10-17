import User from "../domain/User"
import { bookmarkInputDto, userCredentialsDto} from "./dtos"

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
    addBookmark(content: bookmarkInputDto): void,
    editBookmark(_id: string, content: bookmarkInputDto): void,
    removeBookmark(_id: string): void,
}