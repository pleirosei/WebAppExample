var students = angular.module('studentsApp', ['ngRoute', 'ngResource']);

students.config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/', {
        controller: 'studentsController',
        templateUrl: 'students.html'
    }).
        otherwise({ redirectTo: '/'});

}]);

angular.module('studentsApp')
    .factory('StudentFactory', ['$http', function($http) {

        var urlBase = '/students';
        var studentFactory = {};

        studentFactory.getStudents = function() {
            return $http.get(urlBase);
        };

        studentFactory.getStudent = function(id) {
            return $http.get(urlBase + '/' + id);
        };

        studentFactory.addStudent = function(student) {
            return $http.post(urlBase, student);
        };

        studentFactory.updateStudent = function(student) {
            return $http.put(urlBase + '/' + student.ID, student);
        };

        studentFactory.deleteStudent = function(id) {
            return $http.delete(urlBase + '/' + id);
        };

        return studentFactory;
    }]);