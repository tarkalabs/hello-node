"use strict";
require("bootstrap/dist/css/bootstrap.css");
import angular from "angular";
import uiRouter from "angular-ui-router";

var app = angular.module("app",[uiRouter])

class MainController {
  constructor($scope) {
    console.log("i am here");
    $scope.name = "Vagmi";
    this.message = "Welcom";
  }
}
var config = ($urlRouterProvider,$stateProvider) => {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state("home",{
    url: "/",
    template: require("./templates/main.html"),
    controller: MainController,
  });
}
config.$inject = ["$urlRouterProvider","$stateProvider"];

angular.module("app").config(config).controller("MainController", MainController);

