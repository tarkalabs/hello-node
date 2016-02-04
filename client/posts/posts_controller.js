export default class PostsController {
  constructor($scope, posts) {
    this.entries = posts.data;
  }
}
