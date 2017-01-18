angular.module('starter.services', [])

.factory('Chats', function( $http , $q, UserService, IPaddress) {
    
    function getChat(){
     var deferred = $q.defer();    
         $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/ChatStuff.php',
               {'ME'               : UserService.UserCred.ID,
                'access'           : UserService.UserCred.ACCESS
               })
          
        .success(function (data){
             console.log(data);
         deferred.resolve (data);
         DataHold = data;     
        }); 
        
        return deferred.promise;
    }
    
     function getReplies(chatID){
        
       
         
        var deferred = $q.defer();
        
         $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/ChatReplies.php',
               {'ME'            : UserService.UserCred.ID,
                'THEM'          : chatID
               })
          
        .success(function (data){
        
         deferred.resolve (data);
        }); 
        
        return deferred.promise;
    
    }
    function setReplies(msg,chatID){
        
         var deferred = $q.defer();
        
         $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/ChatNewReplies.php',
               {'ME'            : UserService.UserCred.ID,
                'THEM'          : chatID,
                'MSG'           : msg
               })
          
        .success(function (data){
         //    console.log(data);
         deferred.resolve (data);
        }); 
        
        return deferred.promise;
        
    
    }
    
  return {
        getChat     : getChat,
      getReplies    : getReplies,
       setReplies   :  setReplies
  };
})

.service('UserService', function() {
  var UserCred;

   
 return UserCred;
  
})    

.service('IPaddress', function( $window) {

  var ipad;
    if(window.localStorage.getItem("IP") == undefined)
    {
        console.log(window.localStorage.getItem("IP"));
        window.localStorage.setItem("IP", "192.168.0.100") 
    }
    var ipad= window.localStorage.getItem("IP");
   // console.log(ipad);
    
    this.setIP = function(newip){
     window.localStorage.setItem("IP", newip) 
    ipad =     newip;
   ipad= window.localStorage.getItem("IP");
    console.log(ipad);
    }
    
    this.returnIP = function(){
      
        return ipad;
    };
})


.service('GetCred', function( $http , $q , IPaddress) {
    
    
    this.getCredential = function(name, pw, acs)
    {
   
    var deferred = $q.defer();  
     $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/Webservice.php?action=login',
               {'user_name'     : name, 
                'pass_word'     : pw,
                'access'        : acs
               })
     .success(function (data)
      {
       // console.log(data);
        deferred.resolve(data);
     })
         .error(function (data)
     {
         console.log("error");      
         deferred.reject();
     }); 
        return deferred.promise;
    
    }    
})

.factory('TicketHistory', function($http , $q, UserService, IPaddress) {

    var TicketDetail;
    var DataHold;
    
   
        
    function getTicket(Ttypes){
     var deferred = $q.defer();
       console.log( UserService.UserCred.ACCESS);
        
         $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/TicketingStuff.php',
               {'user_ID'          : UserService.UserCred.ID,
                'Tran_Type'        : Ttypes,
                'access'           : UserService.UserCred.ACCESS,
               })
          
        .success(function (data){
         deferred.resolve (data);
      // console.log(UserService.UserCred.ACC_ID);
         DataHold = data;     
        }); 
        
        return deferred.promise;
    }

    function setTicketID(ticID){
    transactionDetail = ticID;
        
      for (var i = 0; i < DataHold.length; i++) {
         
        if (DataHold[i].TIC_ID == ticID) {
           // console.log(DataHold[i]);
            return DataHold[i];
        }
      }
        
    }
    
    function getReplies(tickID){
        
        var deferred = $q.defer();
        
         $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/TicketReplies.php',
               {//'user_ID'     : 1001,
                'user_ID'       : UserService.UserCred.ID,
                'Ticket'        : tickID
               })
          
        .success(function (data){
         //    console.log(data);
         deferred.resolve (data);
        }); 
        
        return deferred.promise;
    
    }
    
    function setReplies(replies, ticketID){
        
         var deferred = $q.defer();
        
         $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/NewTicketReplies.php',
               {//'user_ID'       : 1001,
                'user_ID'         : UserService.UserCred.ID,
                'Replied'         : replies,
                'ticID'           : ticketID
               })
          
        .success(function (data){
         //    console.log(data);
         deferred.resolve (data);
        }); 
        
        return deferred.promise;
        
    
    }
    
    function setHandle(ticketID){
        
         var deferred = $q.defer();
        
         $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/TicketHandle.php?action=Handle',
               {
                'user_ID'         : UserService.UserCred.ID,
                'ticID'           : ticketID
               })
          
        .success(function (data){
         //    console.log(data);
         deferred.resolve (data);
        }); 
        
        return deferred.promise;
        
    
    }
    
    function setSolved(ticketID){
        
         var deferred = $q.defer();
        
         $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/TicketHandle.php?action=Solve',
               {
                'user_ID'         : UserService.UserCred.ID,
                'ticID'           : ticketID
               })
          
        .success(function (data){
         //    console.log(data);
         deferred.resolve (data);
        }); 
        
        return deferred.promise;
        
    
    }   
   
    return{
        getTicket : getTicket,
        setTicketID : setTicketID,
        getReplies : getReplies,
        setReplies : setReplies,
        setHandle  : setHandle,
        setSolved  : setSolved
    }; 
    
    
})

.service('TicketCount', function( $http , $q , IPaddress , UserService) {
         this.getCount = function()
    {
             
      var deferred = $q.defer();
    
         $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/TicketHandle.php?action=Count',
               {
                'user_ID'     : UserService.UserCred.ID,
                'acs'         : UserService.UserCred.ACCESS,
               })
          
        .success(function (data){
         //    console.log(data);
         deferred.resolve (data);
        }); 
        
        return deferred.promise;
         }
    
})

.service('PostTicket', function( $http , $q , IPaddress , UserService) {
    
      this.SubmitTic = function(CtrlScope){
         var deferred = $q.defer();  
         $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/WebNewTicket.php',
               {'user_ID'          : UserService.UserCred.ID,
                'Tic_sub'          : CtrlScope.subject,
                'Tic_body'         : CtrlScope.body
               })
          
        .success(function (data){
             console.log(data)
         deferred.resolve (data);
         
        }); 
        
        return deferred.promise;
    
            
    }
    
})

.service('AccChangeName', function( $http , $q , IPaddress , UserService) {
    
      this.setName = function(yolo){
          
         var deferred = $q.defer();  
         $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/AccountControll.php?action=Name',
               {'user_ID'          : UserService.UserCred.ID,
                'newname'          : yolo
               })
          
        .success(function (data){
             console.log(data)
         deferred.resolve (data);
         
        }); 
        
        return deferred.promise;
    
            
    }
    
})

.service('AccChangeStatus', function( $http , $q , IPaddress , UserService) {
    
      this.setStatus = function(yolo){
          
         var deferred = $q.defer();  
         $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/AccountControll.php?action=Status',
               {'user_ID'          : UserService.UserCred.ID,
                'newstatus'          : yolo
               })
          
        .success(function (data){
             console.log(data)
         deferred.resolve (data);
         
        }); 
        
        return deferred.promise;
    
            
    }
    
})

.service('AccChangePass', function( $http , $q , IPaddress , UserService) {
    
      this.setPass = function(yolo){
        
         var deferred = $q.defer();  
         $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/AccountControll.php?action=Pass',
               {'user_ID'          : UserService.UserCred.ID,
                'oldpass'          : yolo.oldpass,
                'newpass'          : yolo.newpass1
               })
          
        .success(function (data){

         deferred.resolve (data);
         
        }); 
        
        return deferred.promise;
    
            
    }
    
})

.service('NewUser', function( $http , $q , IPaddress ) {
    
      this.newuser = function(passed){
       
         var deferred = $q.defer();  
         $http.post('http://'+IPaddress.returnIP()+'/API/Webservice/InsertUser.php',
               {'username'          : passed.username,
                'display'          : passed.displayname,
                'password'          : passed.password
               })
          
        .success(function (data){

         deferred.resolve (data);
         
        }); 
        
        return deferred.promise;
    
            
    }
    
})


;
