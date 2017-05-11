// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'angular-filepicker', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, filepickerProvider) {



  filepickerProvider.setKey('AlAFUBzCPRPqE9MByPXb8z'); //file picker id


  $ionicConfigProvider.tabs.position('bottom'); //tabs going to stay on bottom forever

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    controller:""
  })

  // Each tab has its own nav history stack:


//login


  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: "AuthCtrl"
  })


        .state('newidea', {
      url: '/newidea',
      templateUrl: 'templates/newidea.html',
      controller: "NewCtrl"
  })






      //home route


      .state('tab.home', {
      url: '/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/tab-home.html',
          controller: 'HomeCtrl'
        }
      }
    })



    .state('tab.homeprofile', {
    url: '/home/profile/:id',
    views: {
      'tab-home': {
        templateUrl: 'templates/hprofile.html'
        ,
        controller: 'TdetailCtrl'
      }
    }
  })


            .state('tab.hideatail', {
        url: '/home/ideas/:id',
        views: {
          'tab-home': {
            templateUrl: 'templates/ideadetail.html'
            ,
            controller: 'IdetailCtrl'
      }
    }
  })
    


    .state('tab.detail', {
      url: '/detail',
      views: {
        'tab-ideas': {
          templateUrl: 'templates/ideadetail.html',
          controller: 'DetailCtrl'
        }
      }
    })






    .state('tab.search', {
      url: '/search',
      views: {
        'tab-home': {
          templateUrl: 'templates/hsearch.html',
          controller: 'SearchCtrl'
        }
      }
    })


    .state('tab.sortby', {
      url: '/sortby',
      views: {
        'tab-home': {
          templateUrl: 'templates/sortby.html',
          controller: 'SortCtrl'
        }
      }
    })


    .state('tab.challenge', {
      url: '/challenge',
      views: {
        'tab-home': {
          templateUrl: 'templates/challenge.html'
          ,
          controller: 'ChaCtrl'
        }
      }
    })



  //
  // .state('tab.newidea', {
  //   url: '/newidea',
  //   views: {
  //     'tab-newidea': {
  //       templateUrl: 'templates/tab-newidea.html',
  //       controller: 'DashCtrl'
  //     }
  //   }
  // })

   .state('tab.ideas', {
    url: '/ideas',
    views: {
      'tab-ideas': {
        templateUrl: 'templates/tab-ideas.html',
        controller: 'IdeasCtrl'
      }
    }
  })


    .state('tab.ideasearch', {
      url: '/ideasearch',
      views: {
        'tab-ideas': {
          templateUrl: 'templates/search.html',
          controller: 'SearchCtrl'
        }
      }
    })


     // .state('tab.ideadetail', {
     //   url: '/ideas/ideadetail',
     //   views: {
     //     'tab-ideas': {
     //      templateUrl: 'templates/ideadetail.html'
          //  ,
          // controller: 'IdeadetailsDetailCtrl'
     //     }
     //   }
     // })



        .state('tab.ideatail', {
        url: '/ideas/:id',
        views: {
          'tab-ideas': {
            templateUrl: 'templates/ideadetail.html'
            ,
            controller: 'IdetailCtrl'
      }
    }
  })


            .state('tab.editidea', {
        url: '/ideas/edit/:id',
        views: {
          'tab-ideas': {
            templateUrl: 'templates/edit.html'
            ,
            controller: 'IeditCtrl'
      }
    }
  })






        .state('tab.ideasauthor', {
    url: '/ideas/profile/:id',
    views: {
      'tab-ideas': {
        templateUrl: 'templates/iprofile.html'
        ,
        controller: 'TdetailCtrl'
      }
    }
  })





     .state('tab.reply', {
       url: '/ideas/ideadetail/comment/reply',
       views: {
         'tab-ideas': {
          templateUrl: 'templates/reply.html'
          //  ,
          // controller: 'IdeadetailsDetailCtrl'
         }
       }
     })






  .state('tab.notify', {
    url: '/notify',
    views: {
      'tab-notify': {
        templateUrl: 'templates/notify.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingCtrl'
      }
    }
  })


    .state('tab.tdetail', {
    url: '/settings/profile/team/:id',
    views: {
      'tab-settings': {
        templateUrl: 'templates/iprofile.html'
        ,
        controller: 'TdetailCtrl'
      }
    }
  })




    .state('tab.profile', {
    url: '/settings/profile',
    views: {
      'tab-settings': {
        templateUrl: 'templates/myprofile.html'
        ,
        controller: 'ProfileCtrl'
      }
    }
  })


      .state('pedit', {
      url: '/pedit',
      templateUrl: 'templates/profileedit.html',
      controller: "PeditCtrl"
  })
    


        .state('tab.profileedit', {
    url: '/settings/profile/profileedit',
    views: {
      'tab-settings': {
        templateUrl: 'templates/profileedit.html'
        // ,
        // controller: 'profileCtrl'
      }
    }
  })



  .state('tab.help', {
    url: '/help',
    views: {
      'tab-settings': {
        templateUrl: 'templates/help.html'
        ,
        controller: 'helpCtrl'
      }
    }
  })


  .state('tab.tutor', {
    url: '/tutor',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tutor.html'
        ,
        controller: 'tutorCtrl'
      }
    }
  })


  .state('tab.term', {
    url: '/term',
    views: {
      'tab-settings': {
        templateUrl: 'templates/term.html'
        ,
        controller: 'termCtrl'
      }
    }
  })







  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
