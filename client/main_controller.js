export default class MainController {
  constructor($scope) {
    console.log("i am here");
    $scope.name = "Vagmi";
    this.message = "Welcom";
  }
  refreshPosts() {
    console.log("call the api");
  }
  gotoPosts() {
    this.loadingMessage = "Loading posts...";
  }

}
