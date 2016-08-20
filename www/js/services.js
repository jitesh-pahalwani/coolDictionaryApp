angular.module('starter').service('dictionaryService',['$q',function($q){
                    var historyArrayToShare=[];
                    //var db = window.sqlitePlugin.openDatabase({name: 'demo.db', location: 'default'});
                    var setHistoryArray = function(x){
                    historyArrayToShare=x;
                    console.log("historyArrayToShare",historyArrayToShare);
                    };
                    
                    var getHistoryArray = function(){
                        /*db.executeSql("SELECT * FROM recentSearches", [], function (resultSet) {
        alert("inside executeSql");
    for(i=0;i<resultSet.rows.length;i++){    
    alert(resultSet.rows.item(i).word);
    historyArrayToShare.push(resultSet.rows.item(i).word);
    }
    });*/
                    return historyArrayToShare;
                    };
                    
                    return {
                    setHistoryArray: setHistoryArray,
                    getHistoryArray: getHistoryArray
                    };
                    
                    
                    
                    }]
)