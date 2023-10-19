export default class BookmarkInputModel {
  name: string;
  tags: string[];
  url: string;

  constructor(
    name: string,
    tags: string[],
    url: string
  ) {
    this.name = name;
    this.tags = tags;
    this.url = url;
  }
}
