import angular from "angular";
import uiRouter from "angular-ui-router";
import PostsController from "./posts_controller";
import PostController from "./post_controller";

var posts = angular.module("posts",[uiRouter]);

var config = ($stateProvider) => {
  let $http = angular.injector(['ng']).get('$http');
  $stateProvider.state("home.posts",{
    url: "posts",
    template: require("./templates/posts.html"),
    controller: PostsController,
    controllerAs: "posts",
    resolve: {
      posts: () => $http.get("/posts")
    }
  });
  $stateProvider.state("home.posts.post",{
    url: "/:postId",
    template: require("./templates/post.html"),
    controller: PostController,
    controllerAs: "post",
    resolve: {
      entry: ($stateParams) => $http.get("/posts/"+$stateParams.postId)
    }
  });
}
config.$inject = ['$stateProvider'];
posts.config(config);


export default posts.name;
