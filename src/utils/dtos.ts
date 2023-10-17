import Bookmark from "../domain/Bookmark";
import User from "../domain/User";

export type bookmarkInputDto = Omit<Bookmark, "id" | "createdAt" | "description" | "imageUrl" | "title" >;

export type bookmarkDto = Bookmark;

export type userCredentialsDto = {
    username: string;
    password: string,
    passwordConfirm?: string
  }

export type userDto = User;