import { BaseModel } from "./base.type";
import { Bookmark } from "./bookmark.type";

export type User = BaseModel & {
    username: string,
    bookmarks: Bookmark[]
}

export type UserDTO = {
    username: string,
    password: string,
    passwordConfirm?: string
};