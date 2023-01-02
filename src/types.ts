export type BaseType = {
    _id: string
}

export type Bookmark = BaseType & {
    name: string,
    url: string,
    title: string,
    description: string,
    imageUrl: string,
    tags: string[]
}

export type BookmarkDTO = Omit<Bookmark, "_id" | "title" | "description" | "imageUrl">;

export type User = BaseType & {
    username: string,
    bookmarks: Bookmark[]
}

export type UserDTO = {
    username: string,
    password: string,
    passwordConfirm?: string
};

export type errorsObject = {
    [key: string]: string
}

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