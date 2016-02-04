"use strict";
require("bootstrap/dist/css/bootstrap.css");
import angular from "angular";
import uiRouter from "angular-ui-router";
import posts from "./posts";
import MainController from "./main_controller.js";

var app = angular.module("app",[uiRouter, posts])

var config = ($urlRouterProvider,$stateProvider) => {
  $urlRouterProvider.otherwise('/');
  $stateProvider.state("home",{
    url: "/",
    template: require("./templates/main.html"),
    controller: MainController,
    controllerAs: "main"
  });
}
config.$inject = ["$urlRouterProvider","$stateProvider"];

angular.module("app").config(config).controller("MainController", MainController);

