angular.module('starter.controllers', [])

.controller('AppCtrl',['$scope', '$ionicModal','$rootScope','dictionaryService' ,function($scope, $ionicModal,$rootScope,dictionaryService) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    $scope.$on('$ionicView.enter', function(e) {
            if(dictionaryService.getTheme() == undefined){
          dictionaryService.setTheme("Batman");
    }
    $scope.themeVar = dictionaryService.getTheme();
    });

/*Capturing emitted data from Child controller and broadcasting the data to another child controller*/
$scope.$on('historyItemClick', function(e,data) {
    $rootScope.$broadcast("sendWordToSearch", data);
    });

    $rootScope.returnStyleForBackgroundImage = function(){
  $scope.themeVar = dictionaryService.getTheme();

if($scope.themeVar == "Joker"){
return {
"background-image": "url(images/joker.jpg)",
"background-size":"contain"
}
}
else{
  $scope.themeVar="Batman";
 return {
"background-image": "url(images/batman.jpg)",
"background-size":"contain"
}
}
}

$rootScope.styleForSubItem = function(){

if($scope.themeVar == "Joker"){
return {
    "background-color": "#1D0925",
    "opacity": "0.8",
    "color": "#D7F3D3",
    "font-weight": "bold"
}
}
else{
  $scope.themeVar="Batman";
 return {
    "background-color": "black",
    "opacity": "0.8",
    "color": "white",
    "font-weight": "bold"
}
}
}

$rootScope.styleForThemeItem = function(){
  $scope.themeVar = dictionaryService.getTheme();

if($scope.themeVar == "Joker"){
return {
    "opacity": "0.8",
    "color": "#87D37C",
    "font-weight": "bold"
}
}
else{
  $scope.themeVar="Batman";
 return {
    "opacity": "0.8",
    "color": "black",
    "font-weight": "bold"
}
}
}

$rootScope.styleForItemDivider = function(){
  $scope.themeVar = dictionaryService.getTheme();

if($scope.themeVar == "Joker"){
return {
"background-color": "#9B59B6",
    "color": "#D7F3D3",
    "font-weight": "bold"
}
}
else{
  $scope.themeVar="Batman";
 return {
"background-color": "#526374",
    "color": "white",
    "font-weight": "bold"
}
}
}

$rootScope.styleForMenuItemDivider = function(){

if($scope.themeVar == "Joker"){
return {
    "color": "#D7F3D3",
    "font-weight": "bold"
}
}
else{
  $scope.themeVar="Batman";
 return {
    "color": "white",
    "font-weight": "bold"
}
}
}

$rootScope.styleForErrorDiv = function(){

if($scope.themeVar == "Joker"){
return {
"background-color": "#9B59B6",
    "color": "#D7F3D3",
    "font-weight": "bold",
    "padding": "5px",
    "text-align": "center"
}
}
else{
  $scope.themeVar="Batman";
 return {
"background-color": "#526374",
    "color": "white",
    "font-weight": "bold",
    "padding": "5px",
    "text-align": "center"
}
}
}

$rootScope.styleForInputInset = function(){

if($scope.themeVar == "Joker"){
return {
"background-color": "#9B59B6"
}
}
else{
  $scope.themeVar="Batman";
 return {
"background-color": "#526374",
}
}
}

$rootScope.styleForMenuInputInset = function(){

if($scope.themeVar == "Joker"){
return {
"background-color": "#1D0925"
}
}
else{
  $scope.themeVar="Batman";
 return {
"background-color": "#526374",
}
}
}

$rootScope.styleForMenuHeader = function(){

if($scope.themeVar == "Joker"){
return {
"background-color": "#1D0925"
}
}
else{
  $scope.themeVar="Batman";
 return {
"background-color": "#526374",
}
}
}

$rootScope.styleForHeaderBar = function(){

if($scope.themeVar == "Joker"){
return {
"background-color": "purple"
}
}
else{
  $scope.themeVar="Batman";
 return {
"background-color": "#091826",
}
}
}

$rootScope.styleForCrossIcon = function(){

if($scope.themeVar == "Joker"){
return {
"color": "#1D0925"
}
}
else{
  $scope.themeVar="Batman";
 return {
"color": "#091826",
}
}
}

$rootScope.styleForButton = function(){

if($scope.themeVar == "Joker"){
return {
    "font-weight": "bold",
    "color": "#1D0925"
}
}
else{
  $scope.themeVar="Batman";
 return {
    "font-weight": "bold",
    "color": "#091826"
}
}
}

$rootScope.styleForMenuItem = function(){

if($scope.themeVar == "Joker"){
return {
"background-color": "purple",
    "color": "#D7F3D3"
}
}
else{
  $scope.themeVar="Batman";
 return {
"background-color": "#22313F",
    "color": "white"
}
}
}

$rootScope.styleForAboutItem = function(){

if($scope.themeVar == "Joker"){
return {
"background-color": "#9B59B6",
    "color": "#D7F3D3"
}
}
else{
  $scope.themeVar="Batman";
 return {
"background-color": "#526374",
    "color": "white"
}
}
}

}])

.controller('themesCtrl',['$scope','dictionaryService', function($scope,dictionaryService) {
    $scope.themeSelected=dictionaryService.getTheme();

$scope.themeClick = function(){
dictionaryService.setTheme($scope.themeSelected);
}
}])

.controller('aboutCtrl',['$scope', function($scope) {

    $scope.openLinkedInURL=function(){
        window.open("https://in.linkedin.com/in/jitesh-pahalwani-48259a78", '_system');
    }

    $scope.openGitHubURL=function(){
        window.open("https://github.com/jitesh-pahalwani/coolDictionaryApp", '_system');
    }

}])

.controller('historyCtrl',['$scope','$state','dictionaryService', function($scope,$state,dictionaryService) {
    $scope.showSpinner=false;
    $scope.recentSearchesFromDbToBind=[];

    /*Event to fetch recently searched words from Database every time this view is loaded*/
    $scope.$on('$ionicView.enter', function(e) {
        $scope.fetchFromDb();
    });

    /*Function to fetch all recent searches from Database*/
    $scope.fetchFromDb = function(){
        var db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
        $scope.showSpinner=true;
        $scope.recentSearchesFromDbToBind.length=0;
        db.executeSql("SELECT * FROM recentSearches", [], function (resultSet) {
    for(i=0;i<resultSet.rows.length;i++){    
    $scope.recentSearchesFromDbToBind.push(resultSet.rows.item(i).word);
    }
    $scope.recentSearchesFromDbToBind.reverse();
    $scope.showSpinner=false;
    });
    }

    /*Function to invoke search of a word from recent history*/
    $scope.searchFromHistory= function(wordFromHistory){
        $state.go('app.search');
        $scope.$emit("historyItemClick", wordFromHistory);
    }
}])

.controller('searchCtrl',['$scope','$http','$rootScope','$ionicNavBarDelegate','dictionaryService', function($scope, $http,$rootScope,$ionicNavBarDelegate,dictionaryService) {
    $ionicNavBarDelegate.showBackButton(false);
    $scope.definitionArray = [];
    $scope.adjectiveArray = [];
    $scope.nounArray = [];
    $scope.synonymArray = [];
    $scope.antonymArray = [];
    $scope.showSpinner=false;

/*    $scope.returnStyleForBackgroundImage = function(){
  $scope.themeVar = dictionaryService.getTheme();

if($scope.themeVar == "Joker"){
return $scope.styleObj={
"background-image": "url(images/joker.jpg)"
}
}
else{
  $scope.themeVar="Batman";
 return $scope.styleObj={
"background-image": "url(images/batman.jpg)"
}
}
}*/

    /*Capturing the broadcasted data from parent controller*/
    $rootScope.$on('sendWordToSearch', function(e,data) {
        document.getElementById("searchInputBox").value = data;
    $scope.searchWord(data);
    });

    /*Function to search the word entered by the user*/
    $scope.searchWord = function(x) {
        $scope.showSpinner=true;
        $scope.definitionArray = [];
        $scope.adjectiveArray = [];
        $scope.nounArray = [];
        $scope.synonymArray = [];
        $scope.antonymArray = [];
        $scope.errorInSearch = false;
        $scope.errorOccurred = false;
        $scope.noString=false;

    if(x){
        $http({
            method: 'GET',
            url: 'https://en.wiktionary.org/w/api.php?format=json&action=query&titles=' + x.toLowerCase() + '&rvprop=content&prop=revisions&redirects=1'
        }).then(function successCallback(response) {
            var keyVal = Object.keys(response.data.query.pages);
            if (keyVal == -1) {
                $scope.errorInSearch = true;
                $scope.showSpinner=false;
            }
            var longString = response.data.query.pages[keyVal].revisions[0]['*'];
            $scope.extractHeadings(longString);
            $scope.dbtransac(x);
        }, function errorCallback(response) {
            console.log("error occurred");
            $scope.errorOccurred = true;
            console.log(response);
            $scope.showSpinner=false;
        });
    }
    else{
            $scope.noString=true;
            $scope.showSpinner=false;
        }    
    }

    /*Function to insert the searched word in Database*/
    $scope.dbtransac = function(wordToInsertInDb){
        var db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
        db.transaction(function(tx) {
    tx.executeSql('INSERT INTO recentSearches VALUES (?)', [wordToInsertInDb]);
  }, function(error) {
    //alert('Database Connection ERROR: ' + error.message);
  }, function() {
    //alert('Database Connection Successful');
        })
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
        $scope.showSpinner=false;
    }

}]);