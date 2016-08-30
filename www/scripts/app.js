
var app = angular.module("Glms", ["ngRoute"])
				 .config(function ($routeProvider) {
					 $routeProvider
						.when("/home", {
							templateUrl: "templates/home.html",
					
						})
						.when("/course", {
							templateUrl: "templates/course.html",
							controller: "courseController"
						})
						.when("/quiz", {
							templateUrl: "templates/quiz.html",
							controller: "quizController"
						})
						.otherwise({
							redirectTo: "/home"
						})
				 })
				 .controller("courseController", function($scope) {
					 $scope.buttonName = "阅读";
					 $scope.time = 10000;
					 
					 $scope.onClick = function() {
						 $scope.buttonName = "已阅读"; 
					  }
					}
					
				 )
				 .controller("quizController", function($scope) {
					 
					 $scope.submitAnswer = function() {
						 $scope.message = "回答已提交";
					  }
					}
					
				 )
				 .directive('timerbutton', function($timeout, $interval){
					  return {
						restrict: 'AE',
						transclude: true,
						scope: {
						  showTimer: '=',
						  onClick: '&',
						  timeout: '='
						},
						link: function(scope, element, attrs){
						  scope.timer = true;
						  scope.timerCount = scope.timeout;
						  var counter = $interval(function(){
							scope.timerCount = scope.timerCount - 1000;
						  }, 1000);
						  
						  $timeout(function(){
							 scope.timer = false;
							 $interval.cancel(counter);
							 scope.showTimer = false;
						  }, scope.timeout);
						},
						template: '<button class="btn btn-rounded btn-noborder btn-lg btn-primary" ng-click="onClick()" ng-disabled="timer"><span ng-transclude></span>&nbsp<span ng-if="showTimer">({{ timerCount / 1000 }}秒后)</span></button>'
					  };
					});