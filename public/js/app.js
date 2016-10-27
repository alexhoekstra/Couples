angular.module("couplesApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl:"couples-name.html",
                controller: "CouplesController",
                resolve: {
                    names: function(Names) {
                        return Names.getNames();
                    }
                }
            })
            .when("/list",{
                templateUrl: "list.html",
                controller: "ListController",
                resolve: {
                    names: function(Names) {
                        return Names.getNames();
                    }
                }
            })
            .when("/new/name", {
                controller: "NewNameController",
                templateUrl: "name-form.html"
            })
            .when("/name/:nameId", {
                controller: "EditNameController",
                templateUrl: "name.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })

    /*.service("CoupleNames", function($http) {
        this.allNames = function(name) {
            var nameList = $http.get("/names").
            then()
        }
    })*/

    .service("Names", function($http) {
        this.getNames = function() {
            return $http.get("/names").
                then(function(response) {   
                    return response;
                }, function(response) {
                    alert("Error finding Names.");
                });
        }
        this.createName = function(name) {
            return $http.post("/names", name).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creating name.");
                });
        }
        this.getName = function(nameId) {
            var url = "/names/" + nameId;
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding this name.");
                });
        }
        this.editName = function(name) {
            var url = "/names/" + name._id;
            console.log(name._id);
            return $http.put(url, name).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error editing this name.");
                    console.log(response);
                });
        }
        this.deleteName = function(nameId) {
            var url = "/names/" + nameId;
            return $http.delete(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error deleting this name.");
                    console.log(response);
                });
        }
        this.getNameByName = function(name) {
            var url = "/namebyname/"+ name;
            console.log(url);
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding this name");
                    console.log(response);
                });
        }
    })

    .controller("CouplesController", function(names, $scope, Names) {
        $scope.names = names.data;
        $scope.updateGender = function(selectedGender) {
            $scope.gender = selectedGender;
        }

        $scope.findMatches= function(name){
            Names.getNameByName(name).
                then(function(doc) {
                    console.log(doc.name);
                }, function(response) {
                    alert(response);
                });

        }
    })
    .controller("ListController", function(names, $scope) {
        $scope.names = names.data;
    })
    .controller("NewNameController", function($scope, $location, Names) {
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.saveName = function(name) {
            Names.createName(name).then(function(doc) {
                var nameUrl = "/name/" + doc.data._id;
                $location.path(nameUrl);
            }, function(response) {
                alert(response);
            });
        }
    })
    .controller("EditNameController", function($scope, $routeParams, Names) {
        Names.getName($routeParams.nameId).then(function(doc) {
            $scope.name = doc.data;
        }, function(response) {
            alert(response);
        });

        $scope.toggleEdit = function() {
            $scope.editMode = true;
            $scope.nameFormUrl = "name-form.html";
        }

        $scope.back = function() {
            $scope.editMode = false;
            $scope.nameFormUrl = "";
        }

        $scope.saveName = function(name) {
            Names.editName(name);
            $scope.editMode = false;
            $scope.nameFormUrl = "";
        }

        $scope.deleteName = function(nameId) {
            Names.deleteName(nameId);
        }
    });