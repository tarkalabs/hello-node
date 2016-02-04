"use strict";
require("bootstrap/dist/css/bootstrap.css");
import angular from "angular";
var app = angular.module("app",[]);

class MainController {
  constructor($scope) {
    $scope.name = "Vagmi";
    this.message = "Welcom";
  }
}
app.controller("MainController", MainController);

