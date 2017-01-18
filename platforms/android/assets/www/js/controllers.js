angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, IPaddress,Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    var vm = this;
    $scope.IP = "http://"+IPaddress.returnIP()+"/API/Webservice/upload/";
    
      Chats.getChat().then(function(data){
       vm.chatz = data;
           console.log(data);
          
           if(  vm.chatz.gotdata != false){
       $scope.chats = vm.chatz;
               
        }   
   });        
    

})

.controller('ChatDetailCtrl', function($scope, $stateParams, IPaddress,Chats, $interval ,$ionicScrollDelegate) {
        
    
     $scope.IP = "http://"+IPaddress.returnIP()+"/API/Webservice/upload/";
        $scope.paras = $stateParams;
        $scope.refresher = 1;
         Chats.getReplies($scope.paras.chatId).then(function(data){
             $scope.hold = data;
             $scope.reply = data;
               $ionicScrollDelegate.scrollBottom(true);
           });
    
    
    $scope.$watch('hold', function(newVal, oldVal){
    
        if(newVal == oldVal) {
       
        }
        else{

        }
        

    });
    
     $interval( function() {
            Chats.getReplies($scope.paras.chatId).then(function(data){
                $scope.reply = data; 
                console.log("refreshed")
                   
           });
     }, 2000);

    
    

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

.controller('AccountCtrl', function($scope ,$ionicPopup, AccChangeName ,AccChangeStatus , $cordovaImagePicker, $ionicHistory, $timeout, UserService , IPaddress,$state) {
  var counteri = 0;
    $scope.image =  UserService.UserCred.ID + ".png?" + counteri;
    $scope.doRefresh = function() {
        counteri++;
    
    $scope.image = UserService.UserCred.ID
    $timeout(function () {
             
       
        $scope.image =  UserService.UserCred.ID + ".png?" + counteri;
        console.log( $scope.image );
          $state.go($state.current, $stateParams, {reload: true, inherit: false});
         
      },200).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };
    
    

    $scope.IP = "http://"+IPaddress.returnIP()+"/API/Webservice/upload/";
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
                                        
                        return $scope.data.newNick;
                      }
                    }
                  }
                ]
              });
            
              myPopup.then(function(res) {
                  
            if(res){      
              AccChangeName.setName(res).then(function(data){  
                 
                  if(data.status  == true){ $scope.details.NICK = res; }
              });
            }
                  
            });


     };
        $scope.showChangeStatus = function() {
        $scope.data = {};
     var goon = false;
  
                var myPopup = $ionicPopup.show({
                template: ' <input type="text" placeholder="Change Current Status"  ng-model="data.newStatus" />',
                title: 'Change Status',
                scope: $scope,
                buttons: [
                  { text: 'Cancel' },
                  { text: '<b>Apply</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                      if (!$scope.data.newStatus) {
                        e.preventDefault();
                      } else {                    
                            goon = true;                           
                        return $scope.data.newStatus;
                      }
                    }
                  }
                ]
              });
            
              myPopup.then(function(res) {
                  
            if(res){      
              AccChangeStatus.setStatus(res).then(function(data){  
                 
                  if(data.status  == true){ $scope.details.STATUS = res; }
              });
            }
                  
            });


     };
    
     $scope.LogOut = function() {
         $state.go('login');
         $timeout(function () {
             
          $ionicHistory.clearCache();
          $ionicHistory.clearHistory();
         
      },300) 
    
           
     
     };
    
     $scope.showChangePass = function() {
           $state.go('tabU.NewPass');
     
     };
    
     $scope.ChangeDisplay= function(){
              var optionz = {
        maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
        width: 240,
        height: 240,
        quality: 80            // Higher is better
    };
       
       
       
       
       
      $cordovaImagePicker.getPictures(optionz).then(function (results) {
                  // Destination URL 
        function win(r) {
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
    }

    function fail(error) {
        alert("An error has occurred: Code = " + error.code);
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }

         console.log(FileTransfer);
      
     var url = encodeURI("http://"+IPaddress.returnIP()+"/API/Webservice/Upload.php");  
    
     var targetPath = results[0];
 
    
    var filename = targetPath.split("/").pop();
    var filetype = filename.split(".").pop(); 
          
    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=filename;
          
    //if(filetype == "jpg"){      
    options.mimeType="image/png";
    //}
    //else{
    // options.mimeType="image/png";
    //}
                    //  var alertPopup = $ionicPopup.alert({
                    //    title: 'error',
                    //    template: filetype + " yolo " + options.mimeType
                   //     });      
          
          
    var params = {};
    params.directory = "upload";
    params.fileName = filename;
    params.rename = UserService.UserCred.ID;  
    options.params = params;


           
      var ft = new FileTransfer();
   
             
     ft.upload(targetPath, url, win, fail, options);
          
         
           counteri++;   
           $scope.image =  UserService.UserCred.ID + ".png?" + counteri;
          $state.go($state.current, $stateParams, {reload: true, inherit: false});
         
   $scope.image = "default";
          
          
    }, function(error) {
                        var alertPopup = $ionicPopup.alert({
                        title: 'error',
                        template: 'error' 
                        });
    }); 
   
       
         
     
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
       
      }
      
      
  }); 
    };
    
    $scope.showip = IPaddress.returnIP();
  
    
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
     
     
      $scope.signup = function() {
          
           $state.go('singup');
          
      }
     
})

.controller('SignupCtrl', function($scope,$state,UserService , $cordovaFileTransfer, NewUser , $ionicHistory , $ionicPopup , $stateParams , IPaddress) {
     $scope.data = {};
    $scope.submit = function() {
         
        NewUser.newuser($scope.data).then(function(data){
            
          function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
            var url = encodeURI("http://"+IPaddress.returnIP()+"/API/Webservice/Upload.php");  

            var targetPath = "http://"+IPaddress.returnIP()+"/API/Webservice/default.png";
            
            
            var filename = targetPath.split("/").pop();
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=filename;
            options.mimeType="image/png";

             console.log(FileTransfer);     
            
                    $scope.team = data;
                      

                    if($scope.team.status == false)
                    {
                        var alertPopup = $ionicPopup.alert({
                        title: 'Sign up failed!',
                        template: 'Something went wrong please register again'
                        });
                    }
                    else if($scope.team.status == true)
                    {
                        var params = {};
                        params.directory = "upload";
                        params.fileName = filename;
                        params.rename = $scope.team.ID;  
                        options.params = params;



                        var ft = new FileTransfer();
                        ft.upload(targetPath, url, win, fail, options);
                        
                        
                        
                        var alertPopup = $ionicPopup.alert({
                        title: 'Sign up Success!',
                        template: 'Resgistration complete, please log in with your credentials'
                        });
                        $state.go('singup');
                        
                         $ionicHistory.nextViewOptions({
                                disableBack: true
                            });
                        
                         $state.go('login');
                    }
                   else if($scope.team.status == "taken"){
                        var alertPopup = $ionicPopup.alert({
                        title: 'Name Taken',
                        template: 'Sorry the Username had already been taken'
                        });
                    }
            
        }); 
          
      };
    
      $scope.test = function() {
      
  
            
          function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }
            var url = encodeURI("http://"+IPaddress.returnIP()+"/API/Webservice/Upload.php");  

            var targetPath = "http://"+IPaddress.returnIP()+"/API/Webservice/default.png";
            
            
            var filename = targetPath.split("/").pop();
            var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=filename;
            options.mimeType="image/png";

             console.log(FileTransfer);     
            var params = {};
            params.directory = "upload";
            params.fileName = filename;
            params.rename = "kylo";  
            options.params = params;



            var ft = new FileTransfer();
            ft.upload(targetPath, url, win, fail, options);
                        
      
      };
    
     
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
           
           if(  vm.ticket.gotdata != false){
       $scope.tics = vm.ticket;
       $scope.tics.titleType = $scope.paras.state; 
            }   
   });    
})

.controller('TicketDetailCtrl', function($scope,$state,$ionicScrollDelegate,$ionicPopup,$stateParams,TicketHistory, $rootScope,IPaddress, $ionicHistory ,$interval,UserService, $ionicHistory ) {
  $scope.details = TicketHistory.setTicketID($stateParams.ticketDetail);
   $scope.paras = $stateParams;
   console.log($scope.paras);
    var vm = this
   $scope.IP = "http://"+IPaddress.returnIP()+"/API/Webservice/upload/";
    
    
     $interval( function() {
     TicketHistory.getReplies($scope.details.TIC_ID).then(function(data){
       $scope.reply = data;
     
      }); 
     }, 5000);

    
        

       TicketHistory.getReplies($scope.details.TIC_ID).then(function(data){
       $scope.reply = data;
       $ionicScrollDelegate.scrollBottom(true);
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
                   $ionicScrollDelegate.scrollBottom(true);
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
