// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform,$rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

      var db = null;
      db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
      db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS recentSearches (word text primary key)');
    //tx.executeSql('INSERT INTO recentSearches VALUES (?)', ["perplex"]);
    //tx.executeSql('INSERT INTO recentSearches VALUES (?)', ["conducive"]);
  }, function(error) {
    alert('Database Creation ERROR: ' + error.message);
  }, function() {
    //alert('Populated database OK');
    //db.executeSql("SELECT * FROM recentSearches", [], function (resultSet) {
    //alert(resultSet.rows.item(1).word);
//});
  });
    
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  //$ionicConfigProvider.views.maxCache(0);
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/history.html',
          controller: 'historyCtrl'
        }
      }
    })
    .state('app.themes', {
      url: '/themes',
      views: {
        'menuContent': {
          templateUrl: 'templates/themes.html',
          controller: 'themesCtrl'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/search');
});
