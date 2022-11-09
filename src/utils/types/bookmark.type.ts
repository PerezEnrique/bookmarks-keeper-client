import { BaseModel } from "./base.type";

export type Bookmark = BaseModel & {
    name: string,
    url: string,
    title: string,
    description: string,
    imageUrl: string,
    tags: string[]
}

export type BookmarkDTO = Omit<Bookmark, "_id" | "title" | "description" | "imageUrl">;