angular.module("couplesApp", ['ngRoute'])
    .factory('_', ['$window', function($window) {
        return $window._; // assumes underscore has already been loaded on the page
    }])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl:"couples-name.html",
                controller: "CouplesController"
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
        this.getNamesByGender = function(gender) {;
            if(gender == "both"){
                console.log("request for both genders")
                return this.getNames();
            }
            else {
                var url = "names/gender/" + gender;
                console.log(url);
                return $http.get(url).
                    then(function(response) {
                        return response;
                    }, function(response) {
                        alert("Error finding this name");
                        console.log(response);
                    });
                }
        }
    })

    .controller("CouplesController", function($scope, Names, _) {
         //var maleNames = {"aaron":{"name":"Aaron","syllables":["Aaron"]},"abraham":{"name":"Abraham","syllables":["A","bra","ham"]},"adam":{"name":"Adam","syllables":["A","dam"]},"adrian":{"name":"Adrian","syllables":["A","dri","an"]},"aidan":{"name":"Aidan","syllables":["Ai","dan"]},"aiden":{"name":"Aiden","syllables":["Ai","den"]},"alan":{"name":"Alan","syllables":["Al","an"]},"albert":{"name":"Albert","syllables":["Al","bert"]},"alec":{"name":"Alec","syllables":["Al","ec"]},"alejandro":{"name":"Alejandro","syllables":["A","le","jan","dro"]},"alex":{"name":"Alex","syllables":["Al","ex"]},"alexander":{"name":"Alexander","syllables":["Al","ex","an","der"]},"alexis":{"name":"Alexis","syllables":["A","lex","is"]},"alfred":{"name":"Alfred","syllables":["Al","fred"]},"allen":{"name":"Allen","syllables":["All","en"]},"alvin":{"name":"Alvin","syllables":["Al","vin"]},"andre":{"name":"Andre","syllables":["An","dre"]},"andres":{"name":"Andres","syllables":["An","dre","s"]},"andrew":{"name":"Andrew","syllables":["And","rew"]},"angel":{"name":"Angel","syllables":["An","gel"]},"anthony":{"name":"Anthony","syllables":["An","tho","ny"]},"antonio":{"name":"Antonio","syllables":["An","to","nio"]},"arthur":{"name":"Arthur","syllables":["Ar","thur"]},"ashton":{"name":"Ashton","syllables":["Ash","ton"]},"austin":{"name":"Austin","syllables":["Aus","tin"]},"ayden":{"name":"Ayden","syllables":["Ay","den"]},"barry":{"name":"Barry","syllables":["Barry"]},"benjamin":{"name":"Benjamin","syllables":["Ben","ja","min"]},"bernard":{"name":"Bernard","syllables":["Ber","nard"]},"bill":{"name":"Bill","syllables":["Bill"]},"billy":{"name":"Billy","syllables":["Billy"]},"blake":{"name":"Blake","syllables":["Blake"]},"bob":{"name":"Bob","syllables":["Bob"]},"bobby":{"name":"Bobby","syllables":["Bobby"]},"brad":{"name":"Brad","syllables":["Brad"]},"braden":{"name":"Braden","syllables":["Bra","den"]},"bradley":{"name":"Bradley","syllables":["Bradley"]},"brady":{"name":"Brady","syllables":["Bra","dy"]},"brandon":{"name":"Brandon","syllables":["Bran","don"]},"brayden":{"name":"Brayden","syllables":["Bray","den"]},"brendan":{"name":"Brendan","syllables":["Bren","dan"]},"brent":{"name":"Brent","syllables":["Brent"]},"brett":{"name":"Brett","syllables":["Brett"]},"brian":{"name":"Brian","syllables":["Bri","an"]},"brody":{"name":"Brody","syllables":["Bro","dy"]},"bruce":{"name":"Bruce","syllables":["Bruce"]},"bryan":{"name":"Bryan","syllables":["Bry","an"]},"bryce":{"name":"Bryce","syllables":["Bryce"]},"bryson":{"name":"Bryson","syllables":["Bry","son"]},"caden":{"name":"Caden","syllables":["Ca","den"]},"caleb":{"name":"Caleb","syllables":["Ca","leb"]},"calvin":{"name":"Calvin","syllables":["Cal","vin"]},"cameron":{"name":"Cameron","syllables":["Cam","eron"]},"carl":{"name":"Carl","syllables":["Carl"]},"carlos":{"name":"Carlos","syllables":["Car","los"]},"carson":{"name":"Carson","syllables":["Car","son"]},"carter":{"name":"Carter","syllables":["Car","ter"]},"casey":{"name":"Casey","syllables":["Ca","sey"]},"cesar":{"name":"Cesar","syllables":["Ce","sar"]},"chad":{"name":"Chad","syllables":["Chad"]},"charles":{"name":"Charles","syllables":["Char","les"]},"chase":{"name":"Chase","syllables":["Chase"]},"chris":{"name":"Chris","syllables":["Chris"]},"christian":{"name":"Christian","syllables":["Chris","tian"]},"christopher":{"name":"Christopher","syllables":["Chris","to","pher"]},"clarence":{"name":"Clarence","syllables":["Clar","ence"]},"clayton":{"name":"Clayton","syllables":["Clay","ton"]},"clifford":{"name":"Clifford","syllables":["Cliff","ord"]},"clinton":{"name":"Clinton","syllables":["Clin","ton"]},"cody":{"name":"Cody","syllables":["Co","dy"]},"colby":{"name":"Colby","syllables":["Colby"]},"cole":{"name":"Cole","syllables":["Cole"]},"colin":{"name":"Colin","syllables":["Col","in"]},"collin":{"name":"Collin","syllables":["Coll","in"]},"colton":{"name":"Colton","syllables":["Col","ton"]},"conner":{"name":"Conner","syllables":["Conn","er"]},"connor":{"name":"Connor","syllables":["Conn","or"]},"cooper":{"name":"Cooper","syllables":["Coop","er"]},"corey":{"name":"Corey","syllables":["Cor","ey"]},"cory":{"name":"Cory","syllables":["Cor","y"]},"craig":{"name":"Craig","syllables":["Craig"]},"cristian":{"name":"Cristian","syllables":["Cris","tian"]},"curtis":{"name":"Curtis","syllables":["Curtis"]},"dakota":{"name":"Dakota","syllables":["Da","ko","ta"]},"dale":{"name":"Dale","syllables":["Dale"]},"dalton":{"name":"Dalton","syllables":["Dal","ton"]},"damian":{"name":"Damian","syllables":["Da","mi","an"]},"damon":{"name":"Damon","syllables":["Da","mon"]},"dan":{"name":"Dan","syllables":["Dan"]},"daniel":{"name":"Daniel","syllables":["Dan","iel"]},"danny":{"name":"Danny","syllables":["Dann","y"]},"darin":{"name":"Darin","syllables":["Dar","in"]},"darius":{"name":"Darius","syllables":["Dar","i","us"]},"darrell":{"name":"Darrell","syllables":["Darr","ell"]},"darren":{"name":"Darren","syllables":["Darr","en"]},"darryl":{"name":"Darryl","syllables":["Darr","yl"]},"daryl":{"name":"Daryl","syllables":["Dar","yl"]},"dave":{"name":"Dave","syllables":["Dave"]},"david":{"name":"David","syllables":["Da","vid"]},"dean":{"name":"Dean","syllables":["Dean"]},"dennis":{"name":"Dennis","syllables":["Denn","is"]},"derek":{"name":"Derek","syllables":["Der","ek"]},"derrick":{"name":"Derrick","syllables":["Derr","ick"]},"devin":{"name":"Devin","syllables":["Dev","in"]},"devon":{"name":"Devon","syllables":["De","von"]},"diego":{"name":"Diego","syllables":["Die","go"]},"dillon":{"name":"Dillon","syllables":["Dill","on"]},"dominic":{"name":"Dominic","syllables":["Dom","i","nic"]},"don":{"name":"Don","syllables":["Don"]},"donald":{"name":"Donald","syllables":["Dona","ld"]},"donovan":{"name":"Donovan","syllables":["Don","o","van"]},"douglas":{"name":"Douglas","syllables":["Doug","las"]},"drew":{"name":"Drew","syllables":["Drew"]},"duane":{"name":"Duane","syllables":["Duane"]},"dustin":{"name":"Dustin","syllables":["Dus","tin"]},"dwayne":{"name":"Dwayne","syllables":["Dwayne"]},"dylan":{"name":"Dylan","syllables":["Dy","lan"]},"earl":{"name":"Earl","syllables":["Earl"]},"eddie":{"name":"Eddie","syllables":["Edd","ie"]},"edgar":{"name":"Edgar","syllables":["Ed","gar"]},"eduardo":{"name":"Eduardo","syllables":["Ed","uar","do"]},"edward":{"name":"Edward","syllables":["Ed","ward"]},"edwin":{"name":"Edwin","syllables":["Ed","win"]},"eli":{"name":"Eli","syllables":["E","li"]},"elias":{"name":"Elias","syllables":["E","li","as"]},"elijah":{"name":"Elijah","syllables":["E","li","jah"]},"emmanuel":{"name":"Emmanuel","syllables":["E","mman","uel"]},"eric":{"name":"Eric","syllables":["Eric"]},"erick":{"name":"Erick","syllables":["Er","ick"]},"erik":{"name":"Erik","syllables":["E","rik"]},"ernest":{"name":"Ernest","syllables":["Er","nest"]},"ethan":{"name":"Ethan","syllables":["E","than"]},"eugene":{"name":"Eugene","syllables":["Eu","gene"]},"evan":{"name":"Evan","syllables":["Ev","an"]},"fernando":{"name":"Fernando","syllables":["Fer","nan","do"]},"francis":{"name":"Francis","syllables":["Fran","cis"]},"francisco":{"name":"Francisco","syllables":["Fran","cis","co"]},"frank":{"name":"Frank","syllables":["Frank"]},"franklin":{"name":"Franklin","syllables":["Frank","lin"]},"fred":{"name":"Fred","syllables":["Fred"]},"frederick":{"name":"Frederick","syllables":["Fred","e","rick"]},"gabriel":{"name":"Gabriel","syllables":["Ga","bri","el"]},"gage":{"name":"Gage","syllables":["Gage"]},"garrett":{"name":"Garrett","syllables":["Garr","ett"]},"gary":{"name":"Gary","syllables":["Gar","y"]},"gavin":{"name":"Gavin","syllables":["Ga","vin"]},"gene":{"name":"Gene","syllables":["Gene"]},"geoffrey":{"name":"Geoffrey","syllables":["Geoff","rey"]},"george":{"name":"George","syllables":["George"]},"gerald":{"name":"Gerald","syllables":["Ger","ald"]},"gilbert":{"name":"Gilbert","syllables":["Gil","bert"]},"giovanni":{"name":"Giovanni","syllables":["Gio","van","ni"]},"glen":{"name":"Glen","syllables":["Glen"]},"glenn":{"name":"Glenn","syllables":["Glenn"]},"gordon":{"name":"Gordon","syllables":["Gor","don"]},"grant":{"name":"Grant","syllables":["Grant"]},"greg":{"name":"Greg","syllables":["Greg"]},"gregg":{"name":"Gregg","syllables":["Gregg"]},"gregory":{"name":"Gregory","syllables":["Greg","o","ry"]},"guy":{"name":"Guy","syllables":["Guy"]},"harold":{"name":"Harold","syllables":["Har","old"]},"harry":{"name":"Harry","syllables":["Harr","y"]},"hayden":{"name":"Hayden","syllables":["Hay","den"]},"hector":{"name":"Hector","syllables":["Hec","tor"]},"henry":{"name":"Henry","syllables":["Hen","ry"]},"herbert":{"name":"Herbert","syllables":["Her","bert"]},"howard":{"name":"Howard","syllables":["How","ard"]},"hunter":{"name":"Hunter","syllables":["Hun","ter"]},"ian":{"name":"Ian","syllables":["I","an"]},"isaac":{"name":"Isaac","syllables":["I","saac"]},"isaiah":{"name":"Isaiah","syllables":["I","sai","ah"]},"ivan":{"name":"Ivan","syllables":["I","van"]},"jack":{"name":"Jack","syllables":["Jack"]},"jackson":{"name":"Jackson","syllables":["Jack","son"]},"jacob":{"name":"Jacob","syllables":["Ja","cob"]},"jaden":{"name":"Jaden","syllables":["Ja","den"]},"jaime":{"name":"Jaime","syllables":["Jai","me"]},"jake":{"name":"Jake","syllables":["Jake"]},"jalen":{"name":"Jalen","syllables":["Ja","len"]},"james":{"name":"James","syllables":["James"]},"jamie":{"name":"Jamie","syllables":["Ja","mie"]},"jared":{"name":"Jared","syllables":["Jar","ed"]},"jason":{"name":"Jason","syllables":["Jason"]},"javier":{"name":"Javier","syllables":["Ja","vier"]},"jay":{"name":"Jay","syllables":["Jay"]},"jayden":{"name":"Jayden","syllables":["Jay","den"]},"jeff":{"name":"Jeff","syllables":["Jeff"]},"jeffery":{"name":"Jeffery","syllables":["Jeff","ery"]},"jeffrey":{"name":"Jeffrey","syllables":["Jeff","rey"]},"jeremiah":{"name":"Jeremiah","syllables":["Jer","e","miah"]},"jeremy":{"name":"Jeremy","syllables":["Jer","e","my"]},"jermaine":{"name":"Jermaine","syllables":["Jer","maine"]},"jerome":{"name":"Jerome","syllables":["Je","rome"]},"jerry":{"name":"Jerry","syllables":["Jerr","y"]},"jesse":{"name":"Jesse","syllables":["Jess","e"]},"jesus":{"name":"Jesus","syllables":["Je","sus"]},"jim":{"name":"Jim","syllables":["Jim"]},"jimmy":{"name":"Jimmy","syllables":["Jimmy"]},"joe":{"name":"Joe","syllables":["Joe"]},"joel":{"name":"Joel","syllables":["Joel"]},"john":{"name":"John","syllables":["John"]},"johnathan":{"name":"Johnathan","syllables":["John","a","than"]},"johnny":{"name":"Johnny","syllables":["Johnny"]},"jon":{"name":"Jon","syllables":["Jon"]},"jonah":{"name":"Jonah","syllables":["Jo","nah"]},"jonathan":{"name":"Jonathan","syllables":["Jonathan"]},"jonathon":{"name":"Jonathon","syllables":["Jon","a","thon"]},"jordan":{"name":"Jordan","syllables":["Jor","dan"]},"jorge":{"name":"Jorge","syllables":["Jor","ge"]},"jose":{"name":"Jose","syllables":["Jose"]},"joseph":{"name":"Joseph","syllables":["Jo","seph"]},"joshua":{"name":"Joshua","syllables":["Jo","shu","a"]},"josiah":{"name":"Josiah","syllables":["Jo","si","ah"]},"juan":{"name":"Juan","syllables":["Juan"]},"julian":{"name":"Julian","syllables":["Ju","li","an"]},"justin":{"name":"Justin","syllables":["Jus","tin"]},"kaden":{"name":"Kaden","syllables":["Ka","den"]},"kaleb":{"name":"Kaleb","syllables":["Ka","leb"]},"karl":{"name":"Karl","syllables":["Karl"]},"keith":{"name":"Keith","syllables":["Keith"]},"kelly":{"name":"Kelly","syllables":["Kell","y"]},"kenneth":{"name":"Kenneth","syllables":["Kenn","eth"]},"kent":{"name":"Kent","syllables":["Kent"]},"kerry":{"name":"Kerry","syllables":["Ke","rry"]},"kevin":{"name":"Kevin","syllables":["Kev","in"]},"kirk":{"name":"Kirk","syllables":["Kirk"]},"kristopher":{"name":"Kristopher","syllables":["Kris","to","pher"]},"kurt":{"name":"Kurt","syllables":["Kurt"]},"kyle":{"name":"Kyle","syllables":["Kyle"]},"lance":{"name":"Lance","syllables":["Lance"]},"landon":{"name":"Landon","syllables":["Lan","don"]},"larry":{"name":"Larry","syllables":["Larr","y"]},"lawrence":{"name":"Lawrence","syllables":["Lawrence"]},"lee":{"name":"Lee","syllables":["Lee"]},"leon":{"name":"Leon","syllables":["Le","on"]},"leonard":{"name":"Leonard","syllables":["Leon","ard"]},"leonardo":{"name":"Leonardo","syllables":["Le","o","nar","do"]},"leroy":{"name":"Leroy","syllables":["Le","roy"]},"leslie":{"name":"Leslie","syllables":["Les","lie"]},"levi":{"name":"Levi","syllables":["Le","vi"]},"liam":{"name":"Liam","syllables":["Li","am"]},"logan":{"name":"Logan","syllables":["Lo","gan"]},"lonnie":{"name":"Lonnie","syllables":["Lonn","ie"]},"louis":{"name":"Louis","syllables":["Lou","is"]},"lucas":{"name":"Lucas","syllables":["Luc","as"]},"luis":{"name":"Luis","syllables":["Luis"]},"luke":{"name":"Luke","syllables":["Luke"]},"malachi":{"name":"Malachi","syllables":["Mal","a","chi"]},"malik":{"name":"Malik","syllables":["Mal","ik"]},"manuel":{"name":"Manuel","syllables":["Man","uel"]},"marc":{"name":"Marc","syllables":["Marc"]},"marco":{"name":"Marco","syllables":["Mar","co"]},"marcus":{"name":"Marcus","syllables":["Mar","cus"]},"mario":{"name":"Mario","syllables":["Ma","ri","o"]},"mark":{"name":"Mark","syllables":["Mark"]},"martin":{"name":"Martin","syllables":["Martin"]},"marvin":{"name":"Marvin","syllables":["Mar","vin"]},"mason":{"name":"Mason","syllables":["Ma","son"]},"mathew":{"name":"Mathew","syllables":["Math","ew"]},"matthew":{"name":"Matthew","syllables":["Matth","ew"]},"maurice":{"name":"Maurice","syllables":["Maur","ice"]},"max":{"name":"Max","syllables":["Max"]},"maxwell":{"name":"Maxwell","syllables":["Max","well"]},"melvin":{"name":"Melvin","syllables":["Mel","vin"]},"micah":{"name":"Micah","syllables":["Mi","cah"]},"michael":{"name":"Michael","syllables":["Mi","chael"]},"micheal":{"name":"Micheal","syllables":["Mi","cheal"]},"miguel":{"name":"Miguel","syllables":["Mi","guel"]},"mike":{"name":"Mike","syllables":["Mike"]},"mitchell":{"name":"Mitchell","syllables":["Mitch","ell"]},"nathan":{"name":"Nathan","syllables":["Na","than"]},"nathaniel":{"name":"Nathaniel","syllables":["Na","than","iel"]},"neil":{"name":"Neil","syllables":["Neil"]},"nicholas":{"name":"Nicholas","syllables":["Nich","o","las"]},"nicolas":{"name":"Nicolas","syllables":["Nic","o","las"]},"noah":{"name":"Noah","syllables":["No","ah"]},"nolan":{"name":"Nolan","syllables":["No","lan"]},"norman":{"name":"Norman","syllables":["Nor","man"]},"oliver":{"name":"Oliver","syllables":["Ol","i","ver"]},"omar":{"name":"Omar","syllables":["O","mar"]},"oscar":{"name":"Oscar","syllables":["Os","car"]},"owen":{"name":"Owen","syllables":["Ow","en"]},"parker":{"name":"Parker","syllables":["Par","ker"]},"patrick":{"name":"Patrick","syllables":["Pat","rick"]},"paul":{"name":"Paul","syllables":["Paul"]},"pedro":{"name":"Pedro","syllables":["Pe","dro"]},"perry":{"name":"Perry","syllables":["Pe","rry"]},"peter":{"name":"Peter","syllables":["Pe","ter"]},"peyton":{"name":"Peyton","syllables":["Pey","ton"]},"philip":{"name":"Philip","syllables":["Philip"]},"phillip":{"name":"Phillip","syllables":["Phillip"]},"preston":{"name":"Preston","syllables":["Pres","ton"]},"ralph":{"name":"Ralph","syllables":["Ralph"]},"randall":{"name":"Randall","syllables":["Randall"]},"randy":{"name":"Randy","syllables":["Ran","dy"]},"ray":{"name":"Ray","syllables":["Ray"]},"raymond":{"name":"Raymond","syllables":["Ray","mond"]},"reginald":{"name":"Reginald","syllables":["Reg","i","nald"]},"ricardo":{"name":"Ricardo","syllables":["Ri","car","do"]},"richard":{"name":"Richard","syllables":["Rich","ard"]},"rick":{"name":"Rick","syllables":["Rick"]},"rickey":{"name":"Rickey","syllables":["Rick","ey"]},"ricky":{"name":"Ricky","syllables":["Rick","y"]},"riley":{"name":"Riley","syllables":["Ri","ley"]},"robert":{"name":"Robert","syllables":["Ro","bert"]},"roberto":{"name":"Roberto","syllables":["Ro","ber","to"]},"rodney":{"name":"Rodney","syllables":["Rod","ney"]},"roger":{"name":"Roger","syllables":["Ro","ger"]},"ronald":{"name":"Ronald","syllables":["Ron","ald"]},"ronnie":{"name":"Ronnie","syllables":["Ronn","ie"]},"ross":{"name":"Ross","syllables":["Ross"]},"roy":{"name":"Roy","syllables":["Roy"]},"ruben":{"name":"Ruben","syllables":["Ru","ben"]},"russell":{"name":"Russell","syllables":["Russ","ell"]},"ryan":{"name":"Ryan","syllables":["Ry","an"]},"samuel":{"name":"Samuel","syllables":["Samuel"]},"scott":{"name":"Scott","syllables":["Scott"]},"sean":{"name":"Sean","syllables":["Sean"]},"sebastian":{"name":"Sebastian","syllables":["Se","bas","tian"]},"sergio":{"name":"Sergio","syllables":["Ser","gio"]},"seth":{"name":"Seth","syllables":["Seth"]},"shane":{"name":"Shane","syllables":["Shane"]},"shannon":{"name":"Shannon","syllables":["Shann","on"]},"shaun":{"name":"Shaun","syllables":["Shaun"]},"shawn":{"name":"Shawn","syllables":["Shawn"]},"spencer":{"name":"Spencer","syllables":["Spen","cer"]},"stanley":{"name":"Stanley","syllables":["Stan","ley"]},"stephen":{"name":"Stephen","syllables":["Steph","en"]},"steve":{"name":"Steve","syllables":["Steve"]},"steven":{"name":"Steven","syllables":["Stev","en"]},"stuart":{"name":"Stuart","syllables":["Stu","art"]},"tanner":{"name":"Tanner","syllables":["Tann","er"]},"taylor":{"name":"Taylor","syllables":["Tay","lor"]},"terrance":{"name":"Terrance","syllables":["Terr","ance"]},"terrence":{"name":"Terrence","syllables":["Terr","ence"]},"terry":{"name":"Terry","syllables":["Terr","y"]},"theodore":{"name":"Theodore","syllables":["The","o","dore"]},"thomas":{"name":"Thomas","syllables":["Tho","mas"]},"tim":{"name":"Tim","syllables":["Tim"]},"timothy":{"name":"Timothy","syllables":["Tim","o","thy"]},"todd":{"name":"Todd","syllables":["Todd"]},"tom":{"name":"Tom","syllables":["Tom"]},"tommy":{"name":"Tommy","syllables":["Tomm","y"]},"tony":{"name":"Tony","syllables":["Ton","y"]},"tracy":{"name":"Tracy","syllables":["Tra","cy"]},"travis":{"name":"Travis","syllables":["Tra","vis"]},"trenton":{"name":"Trenton","syllables":["Tren","ton"]},"trevor":{"name":"Trevor","syllables":["Tre","vor"]},"tristan":{"name":"Tristan","syllables":["Tris","tan"]},"troy":{"name":"Troy","syllables":["Troy"]},"tyler":{"name":"Tyler","syllables":["Ty","ler"]},"tyrone":{"name":"Tyrone","syllables":["Ty","rone"]},"vernon":{"name":"Vernon","syllables":["Ver","non"]},"victor":{"name":"Victor","syllables":["Vic","tor"]},"vincent":{"name":"Vincent","syllables":["Vincent"]},"walter":{"name":"Walter","syllables":["Walter"]},"warren":{"name":"Warren","syllables":["Warr","en"]},"wayne":{"name":"Wayne","syllables":["Wayne"]},"wesley":{"name":"Wesley","syllables":["Wes","ley"]},"william":{"name":"William","syllables":["Will","iam"]},"willie":{"name":"Willie","syllables":["Will","ie"]},"wyatt":{"name":"Wyatt","syllables":["Wy","att"]},"xavier":{"name":"Xavier","syllables":["Xa","vi","er"]},"zachary":{"name":"Zachary","syllables":["Zach","a","ry"]}};
         //var femaleNames = {"aaliyah":{"name":"Aaliyah","syllables":["Aa","liy","ah"]},"abby":{"name":"Abby","syllables":["Abb","y"]},"abigail":{"name":"Abigail","syllables":["Ab","i","gail"]},"addison":{"name":"Addison","syllables":["Add","i","son"]},"adriana":{"name":"Adriana","syllables":["Ad","ria","na"]},"adrianna":{"name":"Adrianna","syllables":["Ad","ri","ann","a"]},"adrienne":{"name":"Adrienne","syllables":["Ad","ri","enne"]},"aimee":{"name":"Aimee","syllables":["Ai","mee"]},"alana":{"name":"Alana","syllables":["A","lan","a"]},"alejandra":{"name":"Alejandra","syllables":["A","le","jan","dra"]},"alexa":{"name":"Alexa","syllables":["A","lex","a"]},"alexandra":{"name":"Alexandra","syllables":["A","lex","andra"]},"alexandria":{"name":"Alexandria","syllables":["Al","ex","an","dri","a"]},"alexia":{"name":"Alexia","syllables":["A","lex","i","a"]},"alexis":{"name":"Alexis","syllables":["A","lex","is"]},"alice":{"name":"Alice","syllables":["Al","ice"]},"alicia":{"name":"Alicia","syllables":["A","li","cia"]},"alisha":{"name":"Alisha","syllables":["A","lish","a"]},"alison":{"name":"Alison","syllables":["Al","i","son"]},"allison":{"name":"Allison","syllables":["All","i","son"]},"alondra":{"name":"Alondra","syllables":["A","lon","dra"]},"alyssa":{"name":"Alyssa","syllables":["A","lyss","a"]},"amanda":{"name":"Amanda","syllables":["A","man","da"]},"amber":{"name":"Amber","syllables":["Am","ber"]},"amelia":{"name":"Amelia","syllables":["A","me","li","a"]},"amy":{"name":"Amy","syllables":["A","my"]},"ana":{"name":"Ana","syllables":["A","na"]},"andrea":{"name":"Andrea","syllables":["An","dre","a"]},"angel":{"name":"Angel","syllables":["An","gel"]},"angela":{"name":"Angela","syllables":["An","gel","a"]},"angelica":{"name":"Angelica","syllables":["An","gel","i","ca"]},"angelina":{"name":"Angelina","syllables":["An","ge","li","na"]},"angie":{"name":"Angie","syllables":["An","gie"]},"anita":{"name":"Anita","syllables":["A","ni","ta"]},"ann":{"name":"Ann","syllables":["Ann"]},"anna":{"name":"Anna","syllables":["Ann","a"]},"anne":{"name":"Anne","syllables":["Anne"]},"annette":{"name":"Annette","syllables":["A","nnette"]},"april":{"name":"April","syllables":["A","pril"]},"ariana":{"name":"Ariana","syllables":["Ar","i","an","a"]},"arianna":{"name":"Arianna","syllables":["A","rian","na"]},"ariel":{"name":"Ariel","syllables":["Ar","i","el"]},"ashlee":{"name":"Ashlee","syllables":["Ash","lee"]},"ashley":{"name":"Ashley","syllables":["Ash","ley"]},"ashlyn":{"name":"Ashlyn","syllables":["Ash","lyn"]},"aubrey":{"name":"Aubrey","syllables":["Aub","rey"]},"audrey":{"name":"Audrey","syllables":["Aud","rey"]},"autumn":{"name":"Autumn","syllables":["Au","tumn"]},"ava":{"name":"Ava","syllables":["A","va"]},"avery":{"name":"Avery","syllables":["A","ver","y"]},"bailey":{"name":"Bailey","syllables":["Bai","ley"]},"barbara":{"name":"Barbara","syllables":["Bar","bar","a"]},"becky":{"name":"Becky","syllables":["Beck","y"]},"belinda":{"name":"Belinda","syllables":["Be","lin","da"]},"beth":{"name":"Beth","syllables":["Beth"]},"bethany":{"name":"Bethany","syllables":["Beth","a","ny"]},"betty":{"name":"Betty","syllables":["Bett","y"]},"beverly":{"name":"Beverly","syllables":["Bev","er","ly"]},"bianca":{"name":"Bianca","syllables":["Bian","ca"]},"bonnie":{"name":"Bonnie","syllables":["Bonn","ie"]},"brandi":{"name":"Brandi","syllables":["Bran","di"]},"brandy":{"name":"Brandy","syllables":["Bran","dy"]},"breanna":{"name":"Breanna","syllables":["Bre","ann","a"]},"brenda":{"name":"Brenda","syllables":["Bren","da"]},"briana":{"name":"Briana","syllables":["Bri","an","a"]},"brianna":{"name":"Brianna","syllables":["Bri","ann","a"]},"bridget":{"name":"Bridget","syllables":["Bridg","et"]},"brittany":{"name":"Brittany","syllables":["Britt","a","ny"]},"brittney":{"name":"Brittney","syllables":["Britt","ney"]},"brooke":{"name":"Brooke","syllables":["Brooke"]},"brooklyn":{"name":"Brooklyn","syllables":["Brook","lyn"]},"caitlin":{"name":"Caitlin","syllables":["Cait","lin"]},"caitlyn":{"name":"Caitlyn","syllables":["Cait","lyn"]},"camila":{"name":"Camila","syllables":["Ca","mi","la"]},"candace":{"name":"Candace","syllables":["Can","dace"]},"candice":{"name":"Candice","syllables":["Can","dice"]},"carla":{"name":"Carla","syllables":["Car","la"]},"carly":{"name":"Carly","syllables":["Car","ly"]},"carmen":{"name":"Carmen","syllables":["Car","men"]},"carol":{"name":"Carol","syllables":["Car","ol"]},"caroline":{"name":"Caroline","syllables":["Ca","ro","line"]},"carolyn":{"name":"Carolyn","syllables":["Car","o","lyn"]},"carrie":{"name":"Carrie","syllables":["Carr","ie"]},"casey":{"name":"Casey","syllables":["Ca","sey"]},"cassandra":{"name":"Cassandra","syllables":["Ca","ssan","dra"]},"cassidy":{"name":"Cassidy","syllables":["Cass","i","dy"]},"cassie":{"name":"Cassie","syllables":["Cass","ie"]},"catherine":{"name":"Catherine","syllables":["Ca","the","rine"]},"cathy":{"name":"Cathy","syllables":["Cath","y"]},"charlene":{"name":"Charlene","syllables":["Char","lene"]},"charlotte":{"name":"Charlotte","syllables":["Char","lotte"]},"chelsea":{"name":"Chelsea","syllables":["Chel","sea"]},"chelsey":{"name":"Chelsey","syllables":["Chel","sey"]},"cheryl":{"name":"Cheryl","syllables":["Cher","yl"]},"cheyenne":{"name":"Cheyenne","syllables":["Chey","enne"]},"chloe":{"name":"Chloe","syllables":["Chlo","e"]},"christie":{"name":"Christie","syllables":["Chris","tie"]},"christina":{"name":"Christina","syllables":["Chris","tin","a"]},"christine":{"name":"Christine","syllables":["Chris","tine"]},"christy":{"name":"Christy","syllables":["Chris","ty"]},"cindy":{"name":"Cindy","syllables":["Cin","dy"]},"claire":{"name":"Claire","syllables":["Claire"]},"claudia":{"name":"Claudia","syllables":["Clau","di","a"]},"colleen":{"name":"Colleen","syllables":["Co","lleen"]},"connie":{"name":"Connie","syllables":["Conn","ie"]},"courtney":{"name":"Courtney","syllables":["Court","ney"]},"cristina":{"name":"Cristina","syllables":["Cri","sti","na"]},"crystal":{"name":"Crystal","syllables":["Crys","tal"]},"cynthia":{"name":"Cynthia","syllables":["Cyn","thi","a"]},"daisy":{"name":"Daisy","syllables":["Dai","sy"]},"dana":{"name":"Dana","syllables":["Da","na"]},"daniela":{"name":"Daniela","syllables":["Dan","ie","la"]},"danielle":{"name":"Danielle","syllables":["Dan","ielle"]},"darlene":{"name":"Darlene","syllables":["Dar","lene"]},"dawn":{"name":"Dawn","syllables":["Dawn"]},"deanna":{"name":"Deanna","syllables":["De","ann","a"]},"debbie":{"name":"Debbie","syllables":["Debb","ie"]},"deborah":{"name":"Deborah","syllables":["Deb","o","rah"]},"debra":{"name":"Debra","syllables":["Deb","ra"]},"delaney":{"name":"Delaney","syllables":["De","la","ney"]},"denise":{"name":"Denise","syllables":["De","nise"]},"desiree":{"name":"Desiree","syllables":["De","si","ree"]},"destiny":{"name":"Destiny","syllables":["Des","ti","ny"]},"diamond":{"name":"Diamond","syllables":["Di","a","mond"]},"diana":{"name":"Diana","syllables":["Di","an","a"]},"diane":{"name":"Diane","syllables":["Di","ane"]},"dominique":{"name":"Dominique","syllables":["Do","mi","nique"]},"donna":{"name":"Donna","syllables":["Donn","a"]},"doris":{"name":"Doris","syllables":["Dor","is"]},"dorothy":{"name":"Dorothy","syllables":["Dor","o","thy"]},"ebony":{"name":"Ebony","syllables":["Eb","o","ny"]},"eileen":{"name":"Eileen","syllables":["Ei","leen"]},"elaine":{"name":"Elaine","syllables":["E","laine"]},"elizabeth":{"name":"Elizabeth","syllables":["E","liz","a","beth"]},"ella":{"name":"Ella","syllables":["Ell","a"]},"ellen":{"name":"Ellen","syllables":["Ell","en"]},"ellie":{"name":"Ellie","syllables":["Ell","ie"]},"emily":{"name":"Emily","syllables":["Em","i","ly"]},"emma":{"name":"Emma","syllables":["Emm","a"]},"erica":{"name":"Erica","syllables":["Er","i","ca"]},"erika":{"name":"Erika","syllables":["E","ri","ka"]},"erin":{"name":"Erin","syllables":["Er","in"]},"eva":{"name":"Eva","syllables":["E","va"]},"evelyn":{"name":"Evelyn","syllables":["Ev","e","lyn"]},"faith":{"name":"Faith","syllables":["Faith"]},"felicia":{"name":"Felicia","syllables":["Fe","li","cia"]},"frances":{"name":"Frances","syllables":["Fran","ces"]},"gabriela":{"name":"Gabriela","syllables":["Gab","ri","ela"]},"gabriella":{"name":"Gabriella","syllables":["Ga","briel","la"]},"gabrielle":{"name":"Gabrielle","syllables":["Ga","brie","lle"]},"gail":{"name":"Gail","syllables":["Gail"]},"genesis":{"name":"Genesis","syllables":["Gen","e","sis"]},"gianna":{"name":"Gianna","syllables":["Gia","nna"]},"gina":{"name":"Gina","syllables":["Gi","na"]},"giselle":{"name":"Giselle","syllables":["Gi","selle"]},"glenda":{"name":"Glenda","syllables":["Glen","da"]},"gloria":{"name":"Gloria","syllables":["Glor","i","a"]},"grace":{"name":"Grace","syllables":["Grace"]},"gracie":{"name":"Gracie","syllables":["Gra","cie"]},"gwendolyn":{"name":"Gwendolyn","syllables":["Gwen","do","lyn"]},"hailey":{"name":"Hailey","syllables":["Hai","ley"]},"haley":{"name":"Haley","syllables":["Ha","ley"]},"hannah":{"name":"Hannah","syllables":["Hann","ah"]},"hayley":{"name":"Hayley","syllables":["Hay","ley"]},"heather":{"name":"Heather","syllables":["Hea","ther"]},"heidi":{"name":"Heidi","syllables":["Hei","di"]},"helen":{"name":"Helen","syllables":["Hel","en"]},"holly":{"name":"Holly","syllables":["Holl","y"]},"hope":{"name":"Hope","syllables":["Hope"]},"isabel":{"name":"Isabel","syllables":["I","sa","bel"]},"isabella":{"name":"Isabella","syllables":["I","sa","bel","la"]},"isabelle":{"name":"Isabelle","syllables":["I","sa","belle"]},"jackie":{"name":"Jackie","syllables":["Jack","ie"]},"jaclyn":{"name":"Jaclyn","syllables":["Jac","lyn"]},"jacqueline":{"name":"Jacqueline","syllables":["Ja","cque","line"]},"jada":{"name":"Jada","syllables":["Ja","da"]},"jade":{"name":"Jade","syllables":["Jade"]},"jaime":{"name":"Jaime","syllables":["Jai","me"]},"jamie":{"name":"Jamie","syllables":["Ja","mie"]},"jane":{"name":"Jane","syllables":["Jane"]},"janet":{"name":"Janet","syllables":["Jan","et"]},"janice":{"name":"Janice","syllables":["Jan","ice"]},"jasmin":{"name":"Jasmin","syllables":["Jas","min"]},"jasmine":{"name":"Jasmine","syllables":["Jas","mine"]},"jayla":{"name":"Jayla","syllables":["Jay","la"]},"jazmin":{"name":"Jazmin","syllables":["Jaz","min"]},"jean":{"name":"Jean","syllables":["Jean"]},"jeanette":{"name":"Jeanette","syllables":["Jea","nette"]},"jeanne":{"name":"Jeanne","syllables":["Jeanne"]},"jenna":{"name":"Jenna","syllables":["Jenn","a"]},"jennifer":{"name":"Jennifer","syllables":["Jenn","i","fer"]},"jenny":{"name":"Jenny","syllables":["Jenn","y"]},"jessica":{"name":"Jessica","syllables":["Jess","i","ca"]},"jill":{"name":"Jill","syllables":["Jill"]},"jillian":{"name":"Jillian","syllables":["Jill","i","an"]},"jo":{"name":"Jo","syllables":["Jo"]},"joan":{"name":"Joan","syllables":["Joan"]},"joann":{"name":"Joann","syllables":["Jo","ann"]},"joanna":{"name":"Joanna","syllables":["Jo","ann","a"]},"joanne":{"name":"Joanne","syllables":["Jo","anne"]},"jocelyn":{"name":"Jocelyn","syllables":["Joce","lyn"]},"jodi":{"name":"Jodi","syllables":["Jo","di"]},"jody":{"name":"Jody","syllables":["Jo","dy"]},"jordan":{"name":"Jordan","syllables":["Jor","dan"]},"jordyn":{"name":"Jordyn","syllables":["Jor","dyn"]},"joy":{"name":"Joy","syllables":["Joy"]},"joyce":{"name":"Joyce","syllables":["Joyce"]},"judith":{"name":"Judith","syllables":["Ju","dith"]},"judy":{"name":"Judy","syllables":["Ju","dy"]},"julia":{"name":"Julia","syllables":["Ju","li","a"]},"juliana":{"name":"Juliana","syllables":["Ju","li","a","na"]},"julie":{"name":"Julie","syllables":["Ju","lie"]},"kaitlin":{"name":"Kaitlin","syllables":["Kait","lin"]},"kaitlyn":{"name":"Kaitlyn","syllables":["Kait","lyn"]},"kara":{"name":"Kara","syllables":["Kar","a"]},"karen":{"name":"Karen","syllables":["Kar","en"]},"kari":{"name":"Kari","syllables":["Kar","i"]},"karina":{"name":"Karina","syllables":["Ka","ri","na"]},"karla":{"name":"Karla","syllables":["Kar","la"]},"kate":{"name":"Kate","syllables":["Kate"]},"katelyn":{"name":"Katelyn","syllables":["Kate","lyn"]},"katherine":{"name":"Katherine","syllables":["Kath","e","rine"]},"kathleen":{"name":"Kathleen","syllables":["Kath","leen"]},"kathryn":{"name":"Kathryn","syllables":["Kath","ryn"]},"kathy":{"name":"Kathy","syllables":["Kath","y"]},"katie":{"name":"Katie","syllables":["Ka","tie"]},"katrina":{"name":"Katrina","syllables":["Ka","tri","na"]},"kayla":{"name":"Kayla","syllables":["Kay","la"]},"kaylee":{"name":"Kaylee","syllables":["Kay","lee"]},"kelli":{"name":"Kelli","syllables":["Kell","i"]},"kellie":{"name":"Kellie","syllables":["Kell","ie"]},"kelly":{"name":"Kelly","syllables":["Kell","y"]},"kelsey":{"name":"Kelsey","syllables":["Kel","sey"]},"kendall":{"name":"Kendall","syllables":["Ken","dall"]},"kendra":{"name":"Kendra","syllables":["Ken","dra"]},"kennedy":{"name":"Kennedy","syllables":["Kenn","e","dy"]},"kerri":{"name":"Kerri","syllables":["Kerr","i"]},"kerry":{"name":"Kerry","syllables":["Kerr","y"]},"kiara":{"name":"Kiara","syllables":["Ki","ar","a"]},"kim":{"name":"Kim","syllables":["Kim"]},"kimberly":{"name":"Kimberly","syllables":["Kim","ber","ly"]},"kirsten":{"name":"Kirsten","syllables":["Kir","sten"]},"krista":{"name":"Krista","syllables":["Kris","ta"]},"kristen":{"name":"Kristen","syllables":["Kris","ten"]},"kristi":{"name":"Kristi","syllables":["Kris","ti"]},"kristie":{"name":"Kristie","syllables":["Kris","tie"]},"kristin":{"name":"Kristin","syllables":["Kris","tin"]},"kristina":{"name":"Kristina","syllables":["Kris","ti","na"]},"kristine":{"name":"Kristine","syllables":["Kris","ti","ne"]},"kristy":{"name":"Kristy","syllables":["Kris","ty"]},"krystal":{"name":"Krystal","syllables":["Krys","tal"]},"kylee":{"name":"Kylee","syllables":["Ky","lee"]},"kylie":{"name":"Kylie","syllables":["Ky","lie"]},"lacey":{"name":"Lacey","syllables":["La","cey"]},"latasha":{"name":"Latasha","syllables":["La","tash","a"]},"latoya":{"name":"Latoya","syllables":["La","toy","a"]},"laura":{"name":"Laura","syllables":["Laur","a"]},"lauren":{"name":"Lauren","syllables":["Laur","en"]},"laurie":{"name":"Laurie","syllables":["Laur","ie"]},"layla":{"name":"Layla","syllables":["Lay","la"]},"leah":{"name":"Leah","syllables":["Le","ah"]},"leslie":{"name":"Leslie","syllables":["Les","lie"]},"liliana":{"name":"Liliana","syllables":["Li","li","ana"]},"lillian":{"name":"Lillian","syllables":["Lill","i","an"]},"lilly":{"name":"Lilly","syllables":["Lill","y"]},"lily":{"name":"Lily","syllables":["Lil","y"]},"linda":{"name":"Linda","syllables":["Lin","da"]},"lindsay":{"name":"Lindsay","syllables":["Lind","say"]},"lindsey":{"name":"Lindsey","syllables":["Lind","sey"]},"lisa":{"name":"Lisa","syllables":["Li","sa"]},"loretta":{"name":"Loretta","syllables":["Lo","rett","a"]},"lori":{"name":"Lori","syllables":["Lor","i"]},"lorraine":{"name":"Lorraine","syllables":["Lo","rraine"]},"lucy":{"name":"Lucy","syllables":["Lu","cy"]},"lydia":{"name":"Lydia","syllables":["Lyd","i","a"]},"lynn":{"name":"Lynn","syllables":["Lynn"]},"mackenzie":{"name":"Mackenzie","syllables":["Ma","cken","zie"]},"madeline":{"name":"Madeline","syllables":["Mad","e","line"]},"madelyn":{"name":"Madelyn","syllables":["Mad","e","lyn"]},"madison":{"name":"Madison","syllables":["Mad","i","son"]},"makayla":{"name":"Makayla","syllables":["Ma","kay","la"]},"makenzie":{"name":"Makenzie","syllables":["Ma","ken","zie"]},"mallory":{"name":"Mallory","syllables":["Mall","o","ry"]},"mandy":{"name":"Mandy","syllables":["Man","dy"]},"marcia":{"name":"Marcia","syllables":["Mar","cia"]},"margaret":{"name":"Margaret","syllables":["Mar","ga","ret"]},"maria":{"name":"Maria","syllables":["Ma","ri","a"]},"mariah":{"name":"Mariah","syllables":["Ma","ri","ah"]},"marie":{"name":"Marie","syllables":["Ma","rie"]},"marilyn":{"name":"Marilyn","syllables":["Mar","i","lyn"]},"marisa":{"name":"Marisa","syllables":["Ma","ri","sa"]},"marissa":{"name":"Marissa","syllables":["Ma","riss","a"]},"martha":{"name":"Martha","syllables":["Mar","tha"]},"mary":{"name":"Mary","syllables":["Ma","ry"]},"maureen":{"name":"Maureen","syllables":["Mau","reen"]},"maya":{"name":"Maya","syllables":["May","a"]},"mckenzie":{"name":"Mckenzie","syllables":["M","cken","zie"]},"meagan":{"name":"Meagan","syllables":["Meag","an"]},"megan":{"name":"Megan","syllables":["Meg","an"]},"meghan":{"name":"Meghan","syllables":["Megh","an"]},"melanie":{"name":"Melanie","syllables":["Mel","a","nie"]},"melinda":{"name":"Melinda","syllables":["Me","lin","da"]},"melissa":{"name":"Melissa","syllables":["Me","liss","a"]},"melody":{"name":"Melody","syllables":["Mel","o","dy"]},"mercedes":{"name":"Mercedes","syllables":["Mer","ce","des"]},"meredith":{"name":"Meredith","syllables":["Mer","e","dith"]},"mia":{"name":"Mia","syllables":["Mi","a"]},"michaela":{"name":"Michaela","syllables":["Mi","cha","e","la"]},"michele":{"name":"Michele","syllables":["Mi","che","le"]},"michelle":{"name":"Michelle","syllables":["Mi","chelle"]},"mikayla":{"name":"Mikayla","syllables":["Mi","kay","la"]},"mindy":{"name":"Mindy","syllables":["Min","dy"]},"miranda":{"name":"Miranda","syllables":["Mi","ran","da"]},"misty":{"name":"Misty","syllables":["Mis","ty"]},"molly":{"name":"Molly","syllables":["Moll","y"]},"monica":{"name":"Monica","syllables":["Mon","i","ca"]},"monique":{"name":"Monique","syllables":["Mo","nique"]},"morgan":{"name":"Morgan","syllables":["Mor","gan"]},"mya":{"name":"Mya","syllables":["My","a"]},"nancy":{"name":"Nancy","syllables":["Nan","cy"]},"naomi":{"name":"Naomi","syllables":["Na","o","mi"]},"natalia":{"name":"Natalia","syllables":["Na","ta","lia"]},"natalie":{"name":"Natalie","syllables":["Nat","a","lie"]},"natasha":{"name":"Natasha","syllables":["Na","tash","a"]},"nevaeh":{"name":"Nevaeh","syllables":["Ne","va","eh"]},"nichole":{"name":"Nichole","syllables":["Ni","chole"]},"nicole":{"name":"Nicole","syllables":["Ni","cole"]},"nina":{"name":"Nina","syllables":["Ni","na"]},"norma":{"name":"Norma","syllables":["Nor","ma"]},"olivia":{"name":"Olivia","syllables":["O","liv","i","a"]},"paige":{"name":"Paige","syllables":["Paige"]},"pam":{"name":"Pam","syllables":["Pam"]},"pamela":{"name":"Pamela","syllables":["Pam","e","la"]},"patricia":{"name":"Patricia","syllables":["Pa","tric","ia"]},"patty":{"name":"Patty","syllables":["Patt","y"]},"paula":{"name":"Paula","syllables":["Pau","la"]},"payton":{"name":"Payton","syllables":["Pay","ton"]},"peggy":{"name":"Peggy","syllables":["Pegg","y"]},"penny":{"name":"Penny","syllables":["Penn","y"]},"peyton":{"name":"Peyton","syllables":["Pey","ton"]},"phyllis":{"name":"Phyllis","syllables":["Phyll","is"]},"priscilla":{"name":"Priscilla","syllables":["Pri","scill","a"]},"rachael":{"name":"Rachael","syllables":["Ra","chael"]},"rachel":{"name":"Rachel","syllables":["Ra","chel"]},"raven":{"name":"Raven","syllables":["Ra","ven"]},"reagan":{"name":"Reagan","syllables":["Rea","gan"]},"rebecca":{"name":"Rebecca","syllables":["Re","becc","a"]},"rebekah":{"name":"Rebekah","syllables":["R","ebek","ah"]},"regina":{"name":"Regina","syllables":["Re","gin","a"]},"renee":{"name":"Renee","syllables":["Re","nee"]},"rhonda":{"name":"Rhonda","syllables":["Rhon","da"]},"riley":{"name":"Riley","syllables":["Ri","ley"]},"rita":{"name":"Rita","syllables":["Ri","ta"]},"roberta":{"name":"Roberta","syllables":["Ro","ber","ta"]},"robin":{"name":"Robin","syllables":["Ro","bin"]},"robyn":{"name":"Robyn","syllables":["Ro","byn"]},"rose":{"name":"Rose","syllables":["Rose"]},"ruby":{"name":"Ruby","syllables":["Ru","by"]},"ruth":{"name":"Ruth","syllables":["Ruth"]},"rylee":{"name":"Rylee","syllables":["Ry","lee"]},"sabrina":{"name":"Sabrina","syllables":["Sa","brin","a"]},"sadie":{"name":"Sadie","syllables":["Sa","die"]},"sally":{"name":"Sally","syllables":["Sall","y"]},"samantha":{"name":"Samantha","syllables":["Sa","man","tha"]},"sandra":{"name":"Sandra","syllables":["San","dra"]},"sandy":{"name":"Sandy","syllables":["San","dy"]},"sara":{"name":"Sara","syllables":["Sa","ra"]},"sarah":{"name":"Sarah","syllables":["Sar","ah"]},"savannah":{"name":"Savannah","syllables":["Sa","vann","ah"]},"selena":{"name":"Selena","syllables":["Se","le","na"]},"serenity":{"name":"Serenity","syllables":["Se","ren","i","ty"]},"shannon":{"name":"Shannon","syllables":["Shann","on"]},"shari":{"name":"Shari","syllables":["Shar","i"]},"sharon":{"name":"Sharon","syllables":["Shar","on"]},"shawna":{"name":"Shawna","syllables":["Shaw","na"]},"sheena":{"name":"Sheena","syllables":["Shee","na"]},"sheila":{"name":"Sheila","syllables":["Shei","la"]},"shelby":{"name":"Shelby","syllables":["Shel","by"]},"shelia":{"name":"Shelia","syllables":["She","lia"]},"shelley":{"name":"Shelley","syllables":["Shell","ey"]},"shelly":{"name":"Shelly","syllables":["Shell","y"]},"sheri":{"name":"Sheri","syllables":["Sher","i"]},"sherri":{"name":"Sherri","syllables":["Sherr","i"]},"sherry":{"name":"Sherry","syllables":["Sherr","y"]},"sheryl":{"name":"Sheryl","syllables":["Sher","yl"]},"shirley":{"name":"Shirley","syllables":["Shir","ley"]},"sierra":{"name":"Sierra","syllables":["Si","err","a"]},"skylar":{"name":"Skylar","syllables":["Sky","lar"]},"sofia":{"name":"Sofia","syllables":["So","fi","a"]},"sonia":{"name":"Sonia","syllables":["Son","ia"]},"sonya":{"name":"Sonya","syllables":["Son","ya"]},"sophia":{"name":"Sophia","syllables":["So","phi","a"]},"sophie":{"name":"Sophie","syllables":["So","phie"]},"stacey":{"name":"Stacey","syllables":["Sta","cey"]},"stacie":{"name":"Stacie","syllables":["Sta","cie"]},"stacy":{"name":"Stacy","syllables":["Sta","cy"]},"stefanie":{"name":"Stefanie","syllables":["Ste","fa","nie"]},"stephanie":{"name":"Stephanie","syllables":["Steph","a","nie"]},"sue":{"name":"Sue","syllables":["Sue"]},"summer":{"name":"Summer","syllables":["Summ","er"]},"susan":{"name":"Susan","syllables":["Su","san"]},"suzanne":{"name":"Suzanne","syllables":["Su","zanne"]},"sydney":{"name":"Sydney","syllables":["Syd","ney"]},"sylvia":{"name":"Sylvia","syllables":["Syl","vi","a"]},"tabitha":{"name":"Tabitha","syllables":["Tab","i","tha"]},"tamara":{"name":"Tamara","syllables":["Ta","ma","ra"]},"tami":{"name":"Tami","syllables":["Tam","i"]},"tammie":{"name":"Tammie","syllables":["Tamm","ie"]},"tammy":{"name":"Tammy","syllables":["Tamm","y"]},"tanya":{"name":"Tanya","syllables":["Tan","ya"]},"tara":{"name":"Tara","syllables":["Tar","a"]},"tasha":{"name":"Tasha","syllables":["Tash","a"]},"taylor":{"name":"Taylor","syllables":["Tay","lor"]},"teresa":{"name":"Teresa","syllables":["Te","re","sa"]},"terri":{"name":"Terri","syllables":["Terr","i"]},"terry":{"name":"Terry","syllables":["Terr","y"]},"theresa":{"name":"Theresa","syllables":["The","re","sa"]},"tiffany":{"name":"Tiffany","syllables":["Tiff","a","ny"]},"tina":{"name":"Tina","syllables":["Ti","na"]},"toni":{"name":"Toni","syllables":["Ton","i"]},"tonya":{"name":"Tonya","syllables":["Ton","ya"]},"tracey":{"name":"Tracey","syllables":["Tra","cey"]},"traci":{"name":"Traci","syllables":["Tra","ci"]},"tracie":{"name":"Tracie","syllables":["Tra","cie"]},"tracy":{"name":"Tracy","syllables":["Tra","cy"]},"tricia":{"name":"Tricia","syllables":["Tric","ia"]},"trinity":{"name":"Trinity","syllables":["Trin","i","ty"]},"valeria":{"name":"Valeria","syllables":["Va","le","ria"]},"valerie":{"name":"Valerie","syllables":["Val","e","rie"]},"vanessa":{"name":"Vanessa","syllables":["Va","ness","a"]},"veronica":{"name":"Veronica","syllables":["Ve","ron","i","ca"]},"vicki":{"name":"Vicki","syllables":["Vick","i"]},"vickie":{"name":"Vickie","syllables":["Vick","ie"]},"victoria":{"name":"Victoria","syllables":["Vic","tor","i","a"]},"virginia":{"name":"Virginia","syllables":["Vir","gin","ia"]},"wanda":{"name":"Wanda","syllables":["Wan","da"]},"wendy":{"name":"Wendy","syllables":["Wen","dy"]},"whitney":{"name":"Whitney","syllables":["Whit","ney"]},"yolanda":{"name":"Yolanda","syllables":["Yo","lan","da"]},"yvette":{"name":"Yvette","syllables":["Y","vette"]},"yvonne":{"name":"Yvonne","syllables":["Y","vonne"]},"zoe":{"name":"Zoe","syllables":["Zo","e"]},"zoey":{"name":"Zoey","syllables":["Zo","ey"]}};

        $scope.updateGender = function(selectedGender) {
            $scope.gender = selectedGender;
            if(!(typeof $scope.name === "undefined" || $scope.name == "")
                && $scope.nicknames != null){
                $scope.findMatches($scope.name);
            }
        }

        $scope.findCouples = function(name1Model, name2Model){
            Names.getNameByName(name1Model).
            then(function(doc) {
                var name1 = doc.data;
                Names.getNameByName(name2Model).
                then(function(doc) {
                    var name2 = doc.data;
                    var nickNames = nicknamesForCouple(name1, name2);
                    $scope.coupleNames = formatDisplay(nickNames);
                    $scope.showCouples = true;
                    $scope.couplesString = name1.name + " + " + name2.name;
                }, function(response) {
                    alert(response);
                });
            }, function(response) {
                alert(response);
            });
        }


        $scope.findMatches= function(name){
            Names.getNameByName(name).
            then(function(doc) {
                if(doc.data != null) {
                    //Found a name
                    var name1Model = doc.data;
                    Names.getNamesByGender($scope.gender).
                    then(function(doc) {
                        //received list of names in gender
                        var names = doc.data;
                        var nicknames = [];
                        name1Model.cachedPrefixes = getPrefixes(name1Model.syllables);
                        name1Model.cachedSuffixes = getSuffixes(name1Model.syllables);
                        angular.forEach(names, function(value, key){
                            var nicknameModels = nicknamesForCouple(name1Model, value);
                            if (nicknameModels !== null && !_.isEmpty(nicknameModels)) {
                                nicknames.push(_.max(nicknameModels, function(nicknameModel) {
                                    return nicknameModel.score;
                                }));
                            }
                        });
                        $scope.nicknames = formatDisplay(nicknames);
                        console.log(nicknames);
                    },function(response) {
                    alert(response);
                    });
                }
                else {
                    if(name.indexOf("-") > 0)
                    {
                        var copyName = name;
                        // parse the name
                        var newName = {
                            name : copyName.replace("-",""),
                            syllables : copyName.split("-"),
                            gender : $scope.newGender
                        }
                        Names.createName(newName).
                        then(function(doc) {
                            $scope.name = newName.name;
                            $scope.promptInput = false;
                            $scope.findMatches(newName.name);

                        }, function(response) {
                            alert(response);
                        });

                    }
                    else{
                        $scope.promptInput = true;
                    }
                }
            }, function(response) {
                alert(response);
            });
        }

        var formatDisplay = function(nicknames) {
            var nicknameModels = _.chain(nicknames)
                .groupBy(function(model) {
                    return model.nickname;
                })
                .map(function(models) {
                    return _.max(models, function(model) { return model.score });
                })
                .sortBy(function(model) {
                    return -model.score;
                })
                .value()
                .slice(0, 10);
            
            angular.forEach(nicknameModels, function(nicknameModels) {
                nicknameModels.score = Math.round(nicknameModels.score * 100);
            });
            return nicknameModels;
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
            //parse the syllable string
            name.syllables = $scope.syllableString.split("-");

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