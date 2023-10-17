import Bookmark from "./Bookmark";

export default class User {
  readonly id: string;
  bookmarks: Bookmark[];
  username: string;

  constructor(
    id: string,
    bookmarks: Bookmark[],
    username: string
  ) {
    this.id = id;
    this.bookmarks = bookmarks;
    this.username = username;
  }
}
