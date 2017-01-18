// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services' , 'ngCordova' ])

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

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
    
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })
    .state('singup', {
      url: '/singup',
      templateUrl: 'templates/singup.html',
      controller: 'SignupCtrl'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
     .state('tab.NewPass', {
        url: '/pass',
        views: {
            'tab-account': {
                templateUrl: 'templates/account-newpass.html',
                controller : 'AccountPassCtrl'
            }
        }
    })

  
//======================ADMIN TICKET
    
    
    .state('tab.ticketdash', {
        url: '/ticket',
        views: {
            'tab-ticket': {
                templateUrl: 'templates/tab-ticket.html',
                controller : 'TicketdashCtrl'
            }
        }
    })
  
    .state('tab.ticketdash.state', {
        url: '/{state}',
        views: {
            'tab-ticket@tab': {
                templateUrl: 'templates/ticket-state.html',
                controller : 'NewTicketdashCtrl'
            }
        }
    })
  
  
  .state('tab.ticketdash.state.state-detail', {
    url: '/:ticketDetail',
    views: {
      'tab-ticket@tab': {
        templateUrl: 'templates/ticket-state-detail.html',
        controller: 'TicketDetailCtrl'
      }
    }
  })
  
  //======================ADMIN CHAT
  
      .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
           controller: 'ChatDetailCtrl'    
         
        }
      }
    })
  
  
  //================================================== USER DIRECTIVES
  
    // setup an abstract state for the tabs directive
    .state('tabU', {
    url: '/tabU',
    abstract: true,
    templateUrl: 'templates/tabsU.html'
  })
   
  
  //==================================USER TICKET
    .state('tabU.ticketdash', {
        url: '/Uticket',
        views: {
            'tabU-ticket': {
                templateUrl: 'templates/tabU-ticket.html',
                  controller : 'TicketdashCtrl'
            }
        }
    })
  
     .state('tabU.NewTicket', {
        url: 'NEW',
        views: {
            'tabU-ticket': {
                templateUrl: 'templates/tabU-NEWticket.html',
                controller : 'PostNEWTicketCtrl'
            }
        }
    })
  
  
      .state('tabU.ticketdash.state', {
        url: '/{state}',
        views: {
            'tabU-ticket@tabU': {
                templateUrl: 'templates/Uticket-state.html',
                controller : 'NewTicketdashCtrl'
            }
        }
    })
  
    .state('tabU.ticketdash.state.state-detail', {
    url: '/:ticketDetail',
    views: {
      'tabU-ticket@tabU': {
        templateUrl: 'templates/Uticket-state-detail.html',
        controller: 'TicketDetailCtrl'
      }
    }
  })
  //==================================USER CHAT
  
        .state('tabU.chats', {
      url: '/chats',
      views: {
        'tabU-chats': {
          templateUrl: 'templates/tabU-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
  
      .state('tabU.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tabU-chats': {
          templateUrl: 'templates/chat-detail.html',
           controller: 'ChatDetailCtrl'    
         
        }
      }
    })
  //========================USER account
    .state('tabU.account', {
    url: '/account',
    views: {
      'tabU-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  
   .state('tabU.NewPass', {
        url: '/pass',
        views: {
            'tabU-account': {
                templateUrl: 'templates/account-newpass.html',
                controller : 'AccountPassCtrl'
            }
        }
    })
  
  
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
