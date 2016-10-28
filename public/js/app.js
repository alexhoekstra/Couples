angular.module("couplesApp", ['ngRoute'])
    .factory('_', ['$window', function($window) {
        return $window._; // assumes underscore has already been loaded on the page
    }])
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

    .controller("CouplesController", function(names, $scope, Names, _) {
        $scope.names = names.data;
        $scope.updateGender = function(selectedGender) {
            $scope.gender = selectedGender;
        }

        $scope.findMatches= function(name){
            Names.getNameByName(name).
            then(function(doc) {
                    //Found a name
                    var nicknames = [];
                    var name1Model = doc.data;
                    name1Model.cachedPrefixes = getPrefixes(name1Model.syllables);
                    name1Model.cachedSuffixes = getSuffixes(name1Model.syllables);

                    _.each(names, function(value, key){
                        _.each(value, function(value, key){
                            console.log(value);
                        });
                    });

                    //function(name) {
                        //console.log(name);
                        // var nicknameModels = nicknamesForCouple(name1Model, nameModel);
                        //     if (nicknameModels !== null && !_.isEmpty(nicknameModels)) {
                        //         nicknames.push(_.max(nicknameModels, function(nicknameModel) {
                        //             return nicknameModel.score;
                        //         }));
                        //     }
                    //});

                }, function(response) {
                    alert(response);
                });

        }

        var getPrefixes = function(syllables) {
            var prefixes = [];
            var prefix = '';
            var i;

            if (syllables.length === 1) {
              // single syllable names may break on the first vowel
              var name = syllables[0];
              for (i = 0; i < name.length; i++) {
                prefix += name[i];
                if ('aeiou'.indexOf(name[i].toLowerCase()) > -1) {
                  break;
                }
              }
              if (name.length > prefix.length) {
                return [prefix, name];
              }
              return [name];
            }

            for (i = 0; i < syllables.length - 1; i++) {
              prefix += syllables[i];

              // disallow single character prefix
              if (i !== 0 || syllables[i].length > 1) {
                prefixes.push(prefix);
              }
            }

            return prefixes;
        };

        var getSuffixes = function(syllables) {
            var suffixes = [];
            var suffix = '';

            // single syllable words have no suffixes
            if (syllables.length === 1) {
              return [];
            }

            for (var i = syllables.length - 1; i > 0 ; i--) {
              suffix = syllables[i] + suffix;

              // disallow single character suffix
              if (i !== syllables.length - 1 || syllables[i].length > 1) {
                suffixes.push(suffix);
              }
            }
            return suffixes;
        };

          // returns a list of nickname models
        var nicknamesForCouple = function(name1Model, name2Model) {
            var nicknames = [];

            var appendNicknames = function(name1Model, name2Model, nicknames) {
                var suffixes = name2Model.cachedSuffixes || getSuffixes(name2Model.syllables);
                if (suffixes.length) {
                    var prefixes = name1Model.cachedPrefixes || getPrefixes(name1Model.syllables);
                    _.each(prefixes, function(prefix) {
                        _.each(suffixes, function(suffix) {
                            var nicknameModel = {
                            nickname: null,
                            prefix: prefix,
                            suffix: suffix,
                            name1: name1Model.name,
                            name2: name2Model.name,
                            score: null
                            };

                            nicknameModel.nickname = calculateNickname(nicknameModel);
                            nicknameModel.score = calculateScore(nicknameModel);

                            if (nicknameModel.score !== null) {
                            nicknames.push(nicknameModel);
                            }
                        });
                    });
                }
            };

            appendNicknames(name1Model, name2Model, nicknames);
            appendNicknames(name2Model, name1Model, nicknames);
            return nicknames;
        };

        function calculateNickname(nicknameModel) {
            var nickname;

            // squash identical characters on prefix/suffix boundary
            if (nicknameModel.prefix[nicknameModel.prefix.length - 1] === nicknameModel.suffix[0]) {
                nickname = nicknameModel.prefix + nicknameModel.suffix.substring(1);
            } else {
                nickname = nicknameModel.prefix + nicknameModel.suffix;
            }
            return nickname;
        }

        // score from 0 to 1
        // returns null for invalid nicknames
        function calculateScore(nicknameModel) {
            // detect nicknames which have been squashed
            if (nicknameModel.nickname.length !== nicknameModel.prefix.length + nicknameModel.suffix.length) {
                var concat = nicknameModel.prefix + nicknameModel.suffix;
                if (nicknameModel.name1 === concat || nicknameModel.name2 === concat) {
                    return null;
                }
            }

            var score = Math.max(
                natural.JaroWinklerDistance(nicknameModel.nickname, nicknameModel.name1),
                natural.JaroWinklerDistance(nicknameModel.nickname, nicknameModel.name2));
            
            if (score === 1) {
                return null;
            }

            // penalize using the entire name as a prefix
            if (nicknameModel.prefix === nicknameModel.name1) {
                score *= 0.7;
            }
            // penalize short prefixes and suffixes
            if (nicknameModel.prefix.length < 3) {
                score *= 0.75;
            } else if (nicknameModel.prefix.length < 4) {
                score *= 0.99;
            }
            if (nicknameModel.suffix.length < 3) {
                score *= 0.75;
            } else if (nicknameModel.suffix.length < 4) {
                score *= 0.98;
            }

            return score;
        }


        var natural = (function() {
            // Computes the Jaro distance between two string -- intrepreted from:
            // http://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
            // s1 is the first string to compare
            // s2 is the second string to compare
            var distance = function(s1, s2) {
                if (typeof(s1) != "string" || typeof(s2) != "string") return 0;
                if (s1.length == 0 || s2.length == 0) 
                    return 0;
                s1 = s1.toLowerCase(), s2 = s2.toLowerCase();
                var matchWindow = (Math.floor(Math.max(s1.length, s2.length) / 2.0)) - 1;
                var matches1 = new Array(s1.length);
                var matches2 = new Array(s2.length);
                var m = 0; // number of matches
                var t = 0; // number of transpositions
        
                // find matches
                for (var i = 0; i < s1.length; i++) {
                    var matched = false;
        
                    // check for an exact match
                    if (s1[i] ==  s2[i]) {
                        matches1[i] = matches2[i] = matched = true;
                        m++
                    }
        
                    // check the "match window"
                    else {
                        // this for loop is a little brutal
                        for (k = (i <= matchWindow) ? 0 : i - matchWindow;
                            (k <= i + matchWindow) && k < s2.length && !matched;
                            k++) {
                                if (s1[i] == s2[k]) {
                                    if(!matches1[i] && !matches2[k]) {
                                        m++;
                                    }
            
                                        matches1[i] = matches2[k] = matched = true;
                                    }
                                }
                    }
                }
        
                if(m == 0)
                    return 0.0;
        
                // count transpositions
                var k = 0;
        
            for(var i = 0; i < s1.length; i++) {
                if(matches1[k]) {
                    while(!matches2[k] && k < matches2.length)
                        k++;
                    if(s1[i] != s2[k] &&  k < matches2.length)  {
                        t++;
                    }
                    k++;
                }
            }
             
            //debug helpers:
            //console.log(" - matches: " + m);
            //console.log(" - transpositions: " + t);
            t = t / 2.0;
            return (m / s1.length + m / s2.length + (m - t) / m) / 3;
            }
         
            // Computes the Winkler distance between two string -- intrepreted from:
            // http://en.wikipedia.org/wiki/Jaro%E2%80%93Winkler_distance
            // s1 is the first string to compare
            // s2 is the second string to compare
            // dj is the Jaro Distance (if you've already computed it), leave blank and the method handles it
            var JaroWinklerDistance = function(s1, s2, dj) {
                var jaro;
                (typeof(dj) == 'undefined')? jaro = distance(s1,s2) : jaro = dj;
                var p = 0.1; //
                var l = 0 // length of the matching prefix
                while(s1[l] == s2[l] && l < 4)
                    l++;
                 
                return jaro + l * p * (1 - jaro);
            }

            return {
                JaroWinklerDistance: JaroWinklerDistance
            };
        }());



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