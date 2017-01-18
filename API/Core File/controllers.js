angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    var vm = this;
      Chats.getChat().then(function(data){
       vm.chatz = data;
           console.log(data);
          
           if(  vm.chatz.gotdata != false){
       $scope.chats = vm.chatz;
               
        }   
   });        
    

})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats, $ionicScrollDelegate) {
       $scope.paras = $stateParams;
    
         Chats.getReplies($scope.paras.chatId).then(function(data){
               $scope.reply = data;
               $ionicScrollDelegate.scrollBottom(true);
           });

    $scope.sendMessage = function() {
    
           Chats.setReplies( $scope.data.message ,$scope.paras.chatId).then(function(data){

               Chats.getReplies($scope.paras.chatId).then(function(data){
               $scope.reply = data;
            delete $scope.data.message;
                $ionicScrollDelegate.scrollBottom(true);
               
               });
            
            
        });

    }

    
})

.controller('AccountCtrl', function($scope ,$ionicPopup, AccChangeName , UserService , $state) {
 // $scope.settings = {
//    enableFriends: true
//  };
    $scope.details = UserService.UserCred;
        $scope.showChangeName = function() {
        $scope.data = {};

  
                var myPopup = $ionicPopup.show({
                template: ' <input type="text" placeholder="New Display Name"  ng-model="data.newNick" />',
                title: 'Change Display Name',
                scope: $scope,
                buttons: [
                  { text: 'Cancel' },
                  { text: '<b>Apply</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                      if (!$scope.data.newNick) {
                        e.preventDefault();
                      } else {                    
                         // var inside = { text1: $scope.data.oldpass , text2: $scope.data.newpass1 };                                                   
                        return $scope.data.newNick;
                      }
                    }
                  }
                ]
              });

              myPopup.then(function(res) {
              AccChangeName.setName(res).then(function(data){  
                 console.log(data);
                  if(data.status  == true){ $scope.details.NICK = res; }



              });
            });


     };
    
     $scope.LogOut = function() {
           $state.go('login');
     
     };
    
         $scope.showChangePass = function() {
           $state.go('tabU.NewPass');
     
     };
    
    
})

.controller('AccountPassCtrl', function($scope ,$ionicPopup, AccChangePass , UserService , $state) {
    $scope.data = {};
    $scope.ChangePass = function(){
     var errocheck = 0;   
            if ($scope.data.oldpass && $scope.data.newpass1 && $scope.data.newpass2) {
             
                if ($scope.data.newpass1 != $scope.data.newpass2)
                {
                    var alertPopup = $ionicPopup.alert({
                    title: 'Not Match',
                    template: 'Missmatch of New password'
                    });
                }
                else
                {
                        AccChangePass.setPass($scope.data).then(function(data){  
                            if(data.status != true){
                                var alertPopup = $ionicPopup.alert({
                                title: 'Wrong Password',
                                template: 'Your old password is wrong'
                                });
                            }
                            else{
                                var alertPopup = $ionicPopup.alert({
                                title: 'SUCCESS',
                                template: 'Your password have been changed'
                                });
                                if( UserService.UserCred.ACCESS == "ADMIN"){ $state.go('tab.account');}
                                else if( UserService.UserCred.ACCESS == "USER"){ $state.go('tabU.account');}
                                
                            }
                           
                        });
                }
            } 
            else {     
                    var alertPopup = $ionicPopup.alert({
                    title: 'Invalid Input!',
                    template: 'Please fill in all input'
                    });
            }
    };
    
})


.controller('LoginCtrl', function($scope,$state,UserService ,GetCred  ,$ionicPopup, $timeout, $stateParams , IPaddress) {
    $scope.data = {};
    
    $scope.myPopup = function (){
    var myPopup = $ionicPopup.show({
    template: '<input type="text" ng-model="data.ip">',
    title: 'Enter Server IP',
    subTitle: 'Server IP config',
    scope: $scope,
    buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.data.ip) {
            //don't allow the user to close unless he enters wifi password
            e.preventDefault();
          } else {
            return $scope.data.ip;
          }
        }
      }
    ]
  });

  myPopup.then(function(res) {
      if(res){
      
      IPaddress.setIP(res);
            
            $scope.showip = IPaddress.returnIP();
        console.log($scope.showip);
      }
      
      
  }); 
    };
    
    $scope.showip = IPaddress.returnIP();
    console.log($scope.showip);
    
   //Login function
    $scope.data = { access: "USER" };
    
     $scope.logins = function() {
                if ($scope.data.username && $scope.data.password) {
                GetCred.getCredential($scope.data.username, $scope.data.password , $scope.data.access)
                .then(function(data)
                {   

                    $scope.team = data;
                        //console.log($scope.team);

                    if($scope.team.status != true)
                    {
                        var alertPopup = $ionicPopup.alert({
                        title: 'Login failed!',
                        template: 'Please check your credentials!'
                        });
                    }
                    else
                    {
                        UserService.UserCred = $scope.team ;
                        console.log($scope.team);
                        delete $scope.data.username;
                         delete $scope.data.password;
                        if( $scope.data.access == "ADMIN"){ $state.go('tab.ticketdash');}
                        else if( $scope.data.access == "USER"){ $state.go('tabU.ticketdash');}
                          
                    }


             }) 
            } else {     
                    var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                    });
            }

    } //end logins
     
})


.controller('TicketdashCtrl', function($scope, $state ,$stateParams, $timeout, TicketCount) {
   
    
     TicketCount.getCount().then(function(data){
        $scope.count = data;
        
    }); 
    
    
    $scope.gotoNewTicket = function(){
    $state.go('tabU.ticketdash.New');

};
})

.controller('PostNEWTicketCtrl', function($scope,$state ,$ionicPopup ,PostTicket) {
 $scope.data = {};
 $scope.submitTicket = function() {
 
         if ($scope.data.subject && $scope.data.body) {
                    PostTicket.SubmitTic($scope.data).then(function(data){

                            $scope.team = data;

                        if($scope.team.status == true){

                            var alertPopup = $ionicPopup.alert({
                            title: 'Done',
                            template: 'Your ticket have been submitted'
                            });
                     $state.go('tabU.ticketdash');

                        }
                    })
            }else {     
                    var alertPopup = $ionicPopup.alert({
                    title: 'Sent failed!',
                    template: 'Please fill in all input'
                    });
            }
 }

})


.controller('NewTicketdashCtrl', function( $scope ,$stateParams, TicketHistory ) {
       
       var vm = this;
     $scope.paras = $stateParams;
    
  console.log($scope.paras.state);
    
       TicketHistory.getTicket($scope.paras.state).then(function(data){
       vm.ticket = data;
            console.log(data);
           if(  vm.ticket.gotdata != false){
       $scope.tics = vm.ticket;
       $scope.tics.titleType = $scope.paras.state; 
            }   
   });    
})

.controller('TicketDetailCtrl', function($scope, $state,$ionicScrollDelegate ,$ionicPopup, $stateParams, TicketHistory, $rootScope,  $ionicHistory ,$interval,UserService, $ionicHistory ) {
  $scope.details = TicketHistory.setTicketID($stateParams.ticketDetail);
   $scope.paras = $stateParams;
   console.log($scope.paras);
    var vm = this

     /*    $interval( function() {
     TicketHistory.getReplies($scope.details.TIC_ID).then(function(data){
//       $scope.reply = data;
       //$ionicScrollDelegate.scrollBottom();
  //      }); 
     }, 5000);
*/
    
        

       TicketHistory.getReplies($scope.details.TIC_ID).then(function(data){
       $scope.reply = data;
       $ionicScrollDelegate.scrollBottom();
        }); 
  
     
    //$scope.reply =  TicketHistory.getReplies( $scope.details.TIC_ID);

         
    
    $scope.showReplyPop = function() {
    $scope.data = {};

  //An elaborate, custom popup
            var myPopup = $ionicPopup.show({
            template: '<textarea ng-model="data.reply" style="overflow:auto;resize:none" rows="10"  placeholder="your message here" ></textarea> ',
            title: 'New Reply',
            scope: $scope,
            buttons: [
              { text: 'Cancel' },
              {
                text: '<b>Sent</b>',
                type: 'button-positive',
                onTap: function(e) {
                  if (!$scope.data.reply) {
                    //don't allow the user to close unless he enters wifi password
                    e.preventDefault();

                  } else {
                    return $scope.data.reply;
                  }
                }
              }
            ]
          });

          myPopup.then(function(res) {
           // console.log('Tapped!', res);
              
              if(res){
                    TicketHistory.setReplies(res,$scope.details.TIC_ID).then(function(data){
                 //   console.log(data);
                    });
                  
                   TicketHistory.getReplies($scope.details.TIC_ID).then(function(data){
                   $scope.reply = data;
                   $ionicScrollDelegate.scrollBottom();
                   });
              }
              

        });


 };
      
    
       $scope.showHandlePop = function() {
       
             var confirmPopup = $ionicPopup.confirm({
             title: 'Handle Ticket',
             template: 'Are you sure you want to handle this ticket?'
            });

            confirmPopup.then(function(res) {
             if(res) {
                
                  TicketHistory.setHandle($scope.details.TIC_ID).then(function(data){});                        
                    
                            $state.go('tab.ticketdash.state.state-detail', {
                            state:'PENDING',
                            ticketDetail : $scope.details.TIC_ID,
                       });
                   
             } else {
              
             }
            });

  
       };
    
    
         $scope.showSolvePop = function() {
       
             var confirmPopup = $ionicPopup.confirm({
             title: 'Solved Ticket',
             template: 'Are you sure you want to mark ticket as Solved?'
            });

            confirmPopup.then(function(res) {
             if(res) {
                
                  TicketHistory.setSolved($scope.details.TIC_ID).then(function(data){});                        
                      
                 
                        if(UserService.UserCred.ACCESS == "ADMIN"){
                             $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                            $state.go('tab.ticketdash.state.state-detail', {
                            state:'SOLVED',
                            ticketDetail : $scope.details.TIC_ID,
                            });
                        }
                        if(UserService.UserCred.ACCESS == "USER"){
                                
                            $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                              $state.go('tabU.ticketdash');
                        }
                   
             } else {
              
             }
            });

  
       };
              
    

    
    
    
})

;
