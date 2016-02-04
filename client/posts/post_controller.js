export default class PostController {
  constructor($scope, entry) {
    console.log(entry);
    this.entry = entry.data;
    //console.log($stateParams.postId);
    //$http.get(`/posts/$stateParams.postId`).then((post) => {
      //$scope.post = post.data;
    //})

  }
}
