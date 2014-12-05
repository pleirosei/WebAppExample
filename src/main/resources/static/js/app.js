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


angular.module('studentsApp')
    .controller('studentsController', ['$scope', 'studentFactory', function($scope, studentFactory) {

        $scope.status;
        $scope.students;

        getStudents();

        function getStudents() {
            studentFactory.getStudents()
                .success(function (students) {
                    $scope.students = students;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load students ' + error.message
                });
        }

        $scope.updateStudent = function(id) {
            var student;
            for(var i = 0; i < $scope.students.length; i++) {
                var currentStudent = $scope.students[i];
                if (currentStudent.id === id) {
                    student = currentStudent;
                    break;
                }
            }

            studentFactory.updateStudent(student)
                .success(function () {
                    $scope.status = 'Student Updated!  Refreshing List';
                })
                .error(function (error) {
                    $scope.status = 'Unable to update Student ' + error.message;
                });
        };

        $scope.addStudent = function() {
            //Fake Student Data
            var student = {
                id: 10,
                firstName: 'JoJo',
                lastName: 'AJ'
            };

            studentFactory.addStudent(student)
                .success(function () {
                    $scope.status = 'Student Added!  Refreshing student list';
                })
                .error(function(error) {
                    $scope.status = 'Unable to add student: ' + error.message;
                });
        };

        $scope.deleteStudent = function(id) {
            studentFactory.deleteStudent(id)
                .success(function() {
                    $scope.status = 'Student Deleted!  Refreshing student list';
                    for(var i = 0; i < $scope.students.length; i++) {
                        var student = $scope.students[i];
                        if(student.id === id) {
                            $scope.students.splice(i, 1);
                            break;
                        }
                    }
                })
                .error(function(error) {
                    $scope.status = 'Unable to delete student: ' + error.message;
                });
        };


    }
    ]);