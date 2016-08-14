angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('themesCtrl', function($scope) {
})

.controller('searchCtrl', function($scope, $http) {
    $scope.definitionArray = [];
    $scope.adjectiveArray = [];
    $scope.nounArray = [];
    $scope.synonymArray = [];
    $scope.antonymArray = [];

    /*Function to search the word entered by the user*/
    $scope.searchWord = function(x) {
        $scope.definitionArray = [];
        $scope.adjectiveArray = [];
        $scope.nounArray = [];
        $scope.synonymArray = [];
        $scope.antonymArray = [];
        $scope.errorInSearch = false;
        $scope.errorOccurred = false;


        $http({
            method: 'GET',
            url: 'https://en.wiktionary.org/w/api.php?format=json&action=query&titles=' + x + '&rvprop=content&prop=revisions&redirects=1'
        }).then(function successCallback(response) {
            var keyVal = Object.keys(response.data.query.pages);
            if (keyVal == -1) {
                $scope.errorInSearch = true;
            }
            var longString = response.data.query.pages[keyVal].revisions[0]['*'];
            $scope.extractHeadings(longString);

        }, function errorCallback(response) {
            console.log("error occurred");
            $scope.errorOccurred = true;
            console.log(response);
        });
    }

    /*Function to extract Verb, Adjective, Noun, Synonyms and Antonyms sections from the long string in the http response*/
    $scope.extractHeadings = function(strng) {
        console.log(strng);
        if (strng.indexOf("===Verb===") !== -1) {
            var verbSection = strng.substring(strng.indexOf("===Verb===") + 10).substring(0, strng.substring(strng.indexOf("===Verb===") + 10).indexOf("=="));
            var verbSectionTemp = verbSection;
            while (verbSectionTemp.indexOf("# {{") !== -1) {
                if (verbSectionTemp.substr(verbSectionTemp.indexOf("# ") + 2).indexOf("#") == -1) {
                    var a = verbSectionTemp.substr(verbSectionTemp.indexOf("# ") + 2).slice(0, verbSectionTemp.substr(verbSectionTemp.indexOf("# ") + 2).indexOf("=="))
                } else {
                    var a = verbSectionTemp.substr(verbSectionTemp.indexOf("# {{") + 4).slice(0, verbSectionTemp.substr(verbSectionTemp.indexOf("# {{") + 4).indexOf("#"))
                }
                a = a.slice(a.indexOf("}}") + 3);
                a = a.replace(/[\[\]']/g, '');
                console.log(a);
                $scope.definitionArray.push(a);
                verbSectionTemp = verbSectionTemp.replace("# {{", "");
            }
        }

        if (strng.indexOf("===Adjective===") !== -1) {
            var adjectiveSection = strng.substring(strng.indexOf("===Adjective===") + 15).substring(0, strng.substring(strng.indexOf("===Adjective===") + 15).indexOf("=="));
            var adjectiveSectionTemp = adjectiveSection;
            while (adjectiveSectionTemp.indexOf("# ") !== -1) {
                if (adjectiveSectionTemp.substr(adjectiveSectionTemp.indexOf("# ") + 2).indexOf("#") == -1) {
                    var c = adjectiveSectionTemp.substr(adjectiveSectionTemp.indexOf("# ") + 2).slice(0, adjectiveSectionTemp.substr(adjectiveSectionTemp.indexOf("# ") + 2).indexOf("=="))
                } else {
                    var c = adjectiveSectionTemp.substr(adjectiveSectionTemp.indexOf("# ") + 2).slice(0, adjectiveSectionTemp.substr(adjectiveSectionTemp.indexOf("# ") + 2).indexOf("#"))
                }
                if (c.indexOf("}}") !== -1) {
                    c = c.slice(c.indexOf("}}") + 3);
                }
                c = c.replace(/[\[\]']/g, '');
                console.log(c);
                $scope.adjectiveArray.push(c);
                adjectiveSectionTemp = adjectiveSectionTemp.replace("# ", "");
            }
        }

        if (strng.indexOf("===Noun===") !== -1) {
            var nounSection = strng.substring(strng.indexOf("===Noun===") + 10).substring(0, strng.substring(strng.indexOf("===Noun===") + 10).indexOf("=="));
            var nounSectionTemp = nounSection;
            while (nounSectionTemp.indexOf("# ") !== -1) {
                if (nounSectionTemp.substr(nounSectionTemp.indexOf("# ") + 2).indexOf("#") == -1) {
                    var d = nounSectionTemp.substr(nounSectionTemp.indexOf("# ") + 2).slice(0, nounSectionTemp.substr(nounSectionTemp.indexOf("# ") + 2).indexOf("=="))
                } else {
                    var d = nounSectionTemp.substr(nounSectionTemp.indexOf("# ") + 2).slice(0, nounSectionTemp.substr(nounSectionTemp.indexOf("# ") + 2).indexOf("#"))
                }
                if (d.indexOf("}}") !== -1) {
                    d = d.slice(d.indexOf("}}") + 3);
                }
                d = d.replace(/[\[\]']/g, '');
                console.log(d);
                $scope.nounArray.push(d);
                nounSectionTemp = nounSectionTemp.replace("# ", "");
            }
        }

        if (strng.indexOf("===Synonyms===") !== -1) {
            var synonymSection = strng.substring(strng.indexOf("===Synonyms===") + 14).substring(0, strng.substring(strng.indexOf("=Synonyms===") + 14).indexOf("=="));
            var synonymSectionTemp = synonymSection;
            while (synonymSectionTemp.indexOf("{{l|en|") !== -1) {
                var e = synonymSectionTemp.substr(synonymSectionTemp.indexOf("{{l|en|") + 7).slice(0, synonymSectionTemp.substr(synonymSectionTemp.indexOf("{{l|en|") + 7).indexOf("}}"))
                e = e.replace(/[\[\]']/g, '');
                console.log(e);
                $scope.synonymArray.push(e);
                synonymSectionTemp = synonymSectionTemp.replace("{{l|en|", "");
            }
        }

        if (strng.indexOf("===Antonyms===") !== -1) {
            var antonymSection = strng.substring(strng.indexOf("===Antonyms===") + 14).substring(0, strng.substring(strng.indexOf("=Antonyms===") + 14).indexOf("=="));
            var antonymSectionTemp = antonymSection;
            while (antonymSectionTemp.indexOf("{{l|en|") !== -1) {
                var f = antonymSectionTemp.substr(antonymSectionTemp.indexOf("{{l|en|") + 7).slice(0, antonymSectionTemp.substr(antonymSectionTemp.indexOf("{{l|en|") + 7).indexOf("}}"))
                f = f.replace(/[\[\]']/g, '');
                console.log(f);
                $scope.antonymArray.push(f);
                antonymSectionTemp = antonymSectionTemp.replace("{{l|en|", "");
            }
        }
    }

});