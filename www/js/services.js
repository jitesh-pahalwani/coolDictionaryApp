angular.module('starter').service('dictionaryService',['$q',function($q){
                    var dataToShare;
                    var setTheme = function(x){
                    dataToShare=x;
                    console.log("dataToShare",dataToShare);
                    };
                    
                    var getTheme = function(){
                    return dataToShare;
                    };
                    
                    return {
                    setTheme: setTheme,
                    getTheme: getTheme
                    };
                    
                    
                    
                    }]
)