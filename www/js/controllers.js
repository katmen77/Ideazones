angular.module('starter.controllers', ['ionic.ion.headerShrink'])


      .controller('IeditCtrl', function(Icons, $stateParams, $scope, Posts, Users, $ionicHistory, $rootScope, filepickerService, $timeout, $ionicPopup, $cordovaCamera) {





        $scope.$on('$ionicView.beforeEnter', function() {
          $scope.icon = Icons.decide($scope.post.filename); // for showing file icon base on file type
          $rootScope.hideTabs = true;   // hid tabs true: show navigation bar, false: hide
        });

        $scope.$on('$ionicView.leave', function() {
          $rootScope.hideTabs = false;
        });

        $scope.post = Posts.idetail($stateParams.id);  //use url id to locate which post need to put into edit idea



//choose how to pick up a file, pop up a window to choose

 $scope.pickFile = function() {  
     $ionicPopup.show({
     title: 'Please choose your option',
     scope: $scope,
     buttons: [
       { text: 'Take a photo',
         type: 'button-balanced',
         onTap: function(){takePhoto()}
       },
       {
         text: 'Choose from library',
         type: 'button-royal',
         onTap: function(){takeLib()}

       },
       {
         text: 'Upload from file',
         type: 'button-black',
         onTap: function(){pickFile()}
       },
       {
         text: "Cancel",
         type: 'button-assertive'
       }
     ]
   });
  };




          $scope.file = {}; //file variable for file pick up
          var n = Date.now(); // file name in take photo or pick from library, today's date data.


//pick a picture from library. The source type decide either choose from library or take photo, other instruction
// can find from cordova camera plugin library

    function takeLib() {

            var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 400,
        targetHeight: 400,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };



// get picture with option on the top,  directly use camera data as url and it is going to store in database as url


      $cordovaCamera.getPicture(options).then(function (imageData) {

        $scope.post.fileurl = "data:image/jpeg;base64," + imageData;
      $scope.post.filename = n +'.jpg';  // file name base on the date they take the pic
      $scope.post.filedetail = "";  // because it is not pick up from online, the file detail is going to be empty
      Posts.editidea($scope.post);  //take picture is going to change the post directly

        $scope.icon = Icons.decide($scope.post.filename);  // show the file type base on the extention.



      }, function (err) {
        // error
      });
    };




//take photo function, decided by sourcetype

       function takePhoto() {



        var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 400,
        targetHeight: 400,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {




        $scope.post.fileurl = "data:image/jpeg;base64," + imageData;
      $scope.post.filename = n +'.jpg';
      $scope.post.filedetail = "";
              Posts.editidea($scope.post);
              $scope.icon = Icons.decide($scope.post.filename);




      }, function (err) {
        // error
      });
    };




//pick up file from filepicker

       function pickFile(){
     filepickerService.pick(
       {container:"modal", cropDim: [400, 400], imageDim: [400, 400], services: ['GOOGLE_DRIVE', 'IMAGE_SEARCH', 'GITHUB']},filepush,  function(FPError){
         console.log(FPError.toString()); //option for file picker, use filepicker "pick" function
       }
     )};


    function filepush(Blob){ //after successed, Blob is going to reply from file picker, it include a lot data

      $timeout(function(){ // do not know why, after filepicker success pick up 
      }, 220);
      console.log(Blob);
      $scope.post.fileurl = Blob.url; //file url equal to link from internet in filepicker
      $scope.post.filename = Blob.filename; //file name from filepicker
      $scope.post.filedetail = Blob; //filedetail for deleting the file
      Posts.editidea($scope.post);  //change the post once success
              $scope.icon = Icons.decide($scope.post.filename);
    };




        //pickimage function， same as pick up file function
 $scope.pickImage = function() {
     $ionicPopup.show({
     title: 'Please choose your option',
     scope: $scope,
     buttons: [
       { text: 'Take a photo',
         type: 'button-balanced',
         onTap: function(){takePhotoimage()}
       },
       {
         text: 'Choose from library',
         type: 'button-royal',
         onTap: function(){takeLibimage()}

       },
       {
         text: 'Upload from file',
         type: 'button-black',
         onTap: function(){pickImage()}
       },
       {
         text: "Cancel",
         type: 'button-assertive'
       }
     ]
   });
  };
          $scope.file = {};
          var n = Date.now();
    function takeLibimage() {
            var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 400,
        targetHeight: 400,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.post.image = "data:image/jpeg;base64," + imageData;
      Posts.editidea($scope.post);

      }, function (err) {
        // error
      });
    };



       function takePhotoimage() {
       var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 400,
        targetHeight: 400,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {


        $scope.post.image = "data:image/jpeg;base64," + imageData; //image do not have file name, thus only have image data

              Posts.editidea($scope.post);

      }, function (err) {
        // error
      });
    };



   function pickImage(){

     filepickerService.pick(
       {container:"modal", mimetype: 'image/*', cropDim: [400, 400], imageDim: [400, 400], services: ['GOOGLE_DRIVE', 'IMAGE_SEARCH', 'GITHUB']},imagepush,  function(FPError){
         console.log(FPError.toString());
       }
     )};


    function imagepush(Blob){
      console.log(123);
      $timeout(function(){
      }, 220);
      console.log(Blob);
      $scope.post.image = Blob.url;
      $scope.post.imagedetail = Blob; //detial for delete pic from file picker
      console.log($scope.post.imagedetail);
      Posts.editidea($scope.post);
    };


//delete file function with cross image on right top

    $scope.deletefile = function(){ 
      if ($scope.post.filedetail == ""){ //if file do not have detial means not from file picker, just wipe out file url and file name
        $scope.post.fileurl = "";
        $scope.post.filename = "";
      }else{
      filepicker.remove(  //if file have detail equal to file from file picker use file picker function remove
      $scope.post.filedetail,
      function(){
        console.log("Removed");
        $timeout(function(){}, 2); //refresh file icon after success remove the file
        $scope.post.fileurl = "";
        $scope.post.filename = "";
        Posts.editidea($scope.post);
        console.log($scope.post.fileurl);
        console.log($scope.post.filename);
      }
    );
      };
    };


        $scope.editidea = function(){ //edit file with the new setting
          console.log("editidea");
          console.log($scope.post);
          Posts.editidea($scope.post);
          $ionicHistory.goBack(); // after edit, go back to previous screen
        };


//go back function
        $scope.back = function(){
          $ionicHistory.goBack();
        };


//open the challenge view so that people can choose challenge from expand view
        $scope.h1 = false;
        $scope.open = function(){
          $scope.h1 = !$scope.h1;
        };
//base on challenge id put a tick after each idea
        if ($scope.post.challenge_id == 1){$scope.class1 = "ion-android-star"}else{};
        if ($scope.post.challenge_id == 2){$scope.class2 = "ion-android-star"}else{};
        if ($scope.post.challenge_id == 3){$scope.class3 = "ion-android-star"}else{};
        if ($scope.post.challenge_id == 4){$scope.class4 = "ion-android-star"}else{};
        if ($scope.post.challenge_id == 5){$scope.class5 = "ion-android-star"}else{}; 

//choose one challenge, that challenge is going to tick, other will not show star, the expand will disappear
// idea challenge id will change
        $scope.cha1 = function(){
          $scope.cid = 1;
          $scope.class1 = "ion-android-star";
          $scope.class2 = "";
          $scope.class3 = "";
          $scope.class4 = "";
          $scope.class5 = "";
          $scope.h1 = !$scope.h1;
          $scope.post.challenge_id = 1;
    };

    $scope.cha2 = function(){
      $scope.cid = 2;
      $scope.class1 = "";
          $scope.class2 = "ion-android-star";
          $scope.class3 = "";
          $scope.class4 = "";
          $scope.class5 = "";
      $scope.h1 = !$scope.h1;
          $scope.post.challenge_id = 2;
    };

        $scope.cha3 = function(){
      $scope.cid = 3;
                    $scope.class1 = "";
          $scope.class2 = "";
          $scope.class3 = "ion-android-star";
          $scope.class4 = "";
          $scope.class5 = "";
          $scope.h1 = !$scope.h1;
          $scope.post.challenge_id = 3;
    };

        $scope.cha4 = function(){
          $scope.cid = 4;
          $scope.class1 = "";
          $scope.class2 = "";
          $scope.class3 = "";
          $scope.class4 = "ion-android-star";
          $scope.class5 = "";
          $scope.h1 = !$scope.h1;
          $scope.post.challenge_id = 4;
    };

        $scope.cha5 = function(){
          $scope.cid = 5;
          $scope.class1 = "";
          $scope.class2 = "";
          $scope.class3 = "";
          $scope.class4 = "";
          $scope.class5 = "ion-android-star";
          $scope.h1 = !$scope.h1;
          $scope.post.challenge_id = 5;

    };


    //c1 - c5 is challenge detail expand controll, default is all expands close at the begining

          $scope.c1 = false;
          $scope.c2 = false;
          $scope.c3 = false;
          $scope.c4 = false;
          $scope.c5 = false;


//open one challenge detail card view will close others

        $scope.expand1 = function(){
          $scope.c1 = !$scope.c1;
          $scope.c2 = false;
          $scope.c3 = false;
          $scope.c4 = false;
          $scope.c5 = false;

        };



        $scope.expand2 = function(){
          $scope.c1 = false;
          $scope.c2 = !$scope.c2;
          $scope.c3 = false;
          $scope.c4 = false;
          $scope.c5 = false;

        };

        $scope.expand3 = function(){
          $scope.c1 = false;
          $scope.c2 = false;
          $scope.c3 = !$scope.c3;
          $scope.c4 = false;
          $scope.c5 = false;

        };

        $scope.expand4 = function(){
          $scope.c1 = false;
          $scope.c2 = false;
          $scope.c3 = false;
          $scope.c4 = !$scope.c4;
          $scope.c5 = false;

        };

        $scope.expand5 = function(){
          $scope.c1 = false;
          $scope.c2 = false;
          $scope.c3 = false;
          $scope.c4 = false;
          $scope.c5 = !$scope.c5;

        };


//delete idea function
        $scope.delete = function(){
          Posts.delete($scope.post);
          if (!$scope.filename){}else{ //if have file name, app is going use filepicker remove function
            $scope.deletefile();
          };

          if ($scope.post.imagedetail == ""){ //if image is not from file picker, delete image from database.
            $scope.post.image = "";
          }else{
            filepicker.remove( //if image from filepicker, use filepicker remove function
            $scope.post.imagedetail,
            function(){
              console.log("Removed");
              $timeout(function(){}, 2);
              $scope.post.image = "";
      });
          };
          $ionicHistory.goBack(); //after deleted, it is going to goback to previous page
        };
    })



    .controller('IdetailCtrl', function(Others, Icons, $rootScope, $stateParams, $scope, Posts, Users, $ionicScrollDelegate, Person, $ionicHistory) {

       $scope.$on('$ionicView.beforeEnter', function() {
         $rootScope.hideTabs = true;
       });


      $scope.post = Posts.idetail($stateParams.id);
      if(!$scope.post.filename){}else{
        $scope.icon = Icons.decide($scope.post.filename); //if idea does not have any file, is going to decide icon
      };

      $scope.back = function(){
      $ionicHistory.goBack();
      $rootScope.hideTabs = false; //go back tabs is going to disapear 
    };

      $scope.replyexpand = false; //not show reply at the beginning
      replyid = ""; // reply to comment id

      $scope.replyid = function(comment){
        replyid = $scope.post.comments.indexOf(comment); // know which comment should reply for
        $scope.replyexpand = true;  //show reply input box
      };

      $scope.addreply = function () {
        ideanum = $scope.post.ideaNo
        newreply = {"userid":Users.cuser(), "date":Others.today(), "text":$scope.newreply}; //new reply text from input box
        console.log(newreply);
        Posts.addreply(newreply, ideanum, replyid); //push new reply to comment
        $scope.newreply = ""; //clean input box
      }


      $scope.bottom = function() {
        $ionicScrollDelegate.scrollBottom([true]); //move to bottom ? not sure use it or not
        $scope.replyexpand = false;
      };

      $scope.sname = function (id) { //base on user id show user name
        return Users.name(id);
      };

      $scope.image = function (id) { //base on user id show image
          return Users.image(id);
        };

      $scope.addComment = function(ideano){ //base on idea number, push comment
      newcomment = {"userid": Users.cuser(), "text": $scope.newcomment, "date": Others.today(), "replys":[]};
        Posts.testing (newcomment, ideano); //Post function push comment
        $scope.newcomment = "";
        $ionicScrollDelegate.scrollBottom([true]); //scroll the view to bottom
    };

      //like function
  $scope.like = function(post) {
    var user2 = {"userid": Users.cuser()}; //know the cuurent user id
      var temp2 = 0;
      var temparray = {};  //test each idea's like array in order to see if user id is inside the like array.


    //determind wether is like or not, and pass the like item
      for (i=0; i < post.likes.length; i++) {
        if (post.likes[i].userid == user2.userid) {
          temparray = post.likes[i];
          temp2 = 1;
        }
        else {}
    };

    //temparray is the like item and remove it from likes array


    if ( temp2 == 1) {  //if temp2 = 1, that means user id is in like array
      var index = post.likes.indexOf (temparray); //detact user id is in which posisiton of like array
      console.log(index);
      if (index > -1) {
        post.likes.splice(index, 1); //delete the user id from array
      }
    }
    else {
      post.likes.push (user2); //add user id in like array
      console.log (post.likes)
    }
  };

  //is liked style function, just similar to like function first part, to determine whether the idea is liked or not

    $scope.isliked = function(post) {

      var user2 = {"userid": Users.cuser()};

      var temp = 0;
      for (i=0; i < post.likes.length; i++) {
        if (post.likes[i].userid == user2.userid) {
          temp = 1;
        }
        else {}
    };
      if(temp == 1){
        return "ion-android-favorite assertive"; //if the idea is like, the button icon is going to apply this class
      }
      else{return "ion-android-favorite-outline dark";}// if like is not, change class for icon
    };


  //favourite function, similar function as like

    $scope.favour = function(post) {
    var user2 = {"userid": Users.cuser()};

      var temp3 = 0;
      var temparray = {};


    //determind wether is like or not, and pass the like item
      for (i=0; i < post.favours.length; i++) {
        if (post.favours[i].userid == user2.userid) {
          temparray = post.favours[i];
          temp3 = 1;
        }
        else {}
    };

    //temparray is the like item and remove it from likes array


    if ( temp3 == 1) {
      var index = post.favours.indexOf (temparray);
      console.log(index);
      if (index > -1) {
        post.favours.splice(index, 1); // clean a user id from favorite on post
        Person.removefavor(post); // clean favourite idea number from personal favorite list
        console.log(post);
      }
    }
    else {

      post.favours.push (user2); //add user id in post
      console.log (post)
      Person.addfavor(post); // add post id into personal favorite list
    }
  };

  //is liked style function

    $scope.isfavoured = function(post) {
      var user2 = {"userid": Users.cuser()};
      var temp4 = 0;
      for (i=0; i < post.favours.length; i++) {
        if (post.favours[i].userid == user2.userid) {
          temp4 = 1;
        }
        else {}
    };
      if(temp4 == 1){
        return " ion-android-star";
      }
      else{return "ion-android-star-outline";}
    };
    })



//new idea controller

  .controller('NewCtrl', function(Others, Icons, $scope, Users, $ionicHistory, Posts, filepickerService, $timeout, $state, $ionicPopup, $cordovaCamera) {


 $scope.pickFile = function() {
     $ionicPopup.show({
     title: 'Please choose your option',
     scope: $scope,
     buttons: [
       { text: 'Take a photo',
         type: 'button-balanced',
         onTap: function(){takePhoto()}
       },
       {
         text: 'Choose from library',
         type: 'button-royal',
         onTap: function(){takeLib()}

       },
       {
         text: 'Upload from file',
         type: 'button-black',
         onTap: function(){pickFile()}
       },
       {
         text: "Cancel",
         type: 'button-assertive'
       }
     ]
   });
  };
          $scope.file = {};

        var n = Date.now();
    function takeLib() {
      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 400,
        targetHeight: 400,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function (imageData) {

        $scope.fileurl = "data:image/jpeg;base64," + imageData;
      $scope.filename = n +'.jpg';
      $scope.filedetail = "";
      $scope.icon = Icons.decide($scope.filename);

      }, function (err) {
        // error
      });
    };

       function takePhoto() {
      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 400,
        targetHeight: 400,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {

      $scope.fileurl = "data:image/jpeg;base64," + imageData;
      $scope.filename = n +'.jpg';
      $scope.filedetail = "";
      $scope.icon = Icons.decide($scope.filename);

      }, function (err) {
        // error
      });
    };

       function pickFile(){
     filepickerService.pick(
       {container:"modal", cropDim: [400, 400], imageDim: [400, 400], services: ['GOOGLE_DRIVE', 'IMAGE_SEARCH', 'GITHUB']},filepush,  function(FPError){
         console.log(FPError.toString());
       }
     )};

    function filepush(Blob){
      console.log(123);
      $timeout(function(){
      }, 220);
      console.log(Blob);
      $scope.fileurl = Blob.url;
      $scope.filename = Blob.filename;
      $scope.filedetail = Blob;
      $scope.icon = Icons.decide($scope.filename);

    };

        //pickimage function
 $scope.pickImage = function() {
     $ionicPopup.show({
     title: 'Please choose your option',
     scope: $scope,
     buttons: [
       { text: 'Take a photo',
         type: 'button-balanced',
         onTap: function(){takePhotoimage()}
       },
       {
         text: 'Choose from library',
         type: 'button-royal',
         onTap: function(){takeLibimage()}

       },
       {
         text: 'Upload from file',
         type: 'button-black',
         onTap: function(){pickImage()}
       },
       {
         text: "Cancel",
         type: 'button-assertive'
       }
     ]
   });
  };
          $scope.file = {};

          var n = Date.now();
    function takeLibimage() {
      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 400,
        targetHeight: 400,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function (imageData) {

        $scope.img = "data:image/jpeg;base64," + imageData;
      $scope.imagedetail = "";
      }, function (err) {
        // error
      });
    };

       function takePhotoimage() {

               var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 400,
        targetHeight: 400,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {

        $scope.img = "data:image/jpeg;base64," + imageData;
      $scope.imagedetail = "";
      }, function (err) {
        // error
      });
    };

   function pickImage(){
     filepickerService.pick(
       {container:"modal", mimetype: 'image/*', cropDim: [400, 400], imageDim: [400, 400], services: ['GOOGLE_DRIVE', 'IMAGE_SEARCH', 'GITHUB']},imagepush,  function(FPError){
         console.log(FPError.toString());
       }
     )};


    function imagepush(Blob){
      console.log(123);
      $timeout(function(){
      }, 220);
      console.log(Blob);
      $scope.img = Blob.url;
      $scope.imagedetail = Blob;


    };

    $scope.deletefile = function(){
      if ($scope.filedetail == ""){
        $scope.fileurl = "";
        $scope.filename = "";
      }else{
      filepicker.remove(
      $scope.filedetail,
      function(){
        console.log("Removed");
        $timeout(function(){}, 2);
        $scope.fileurl = "";
        $scope.filename = "";
      }
    );

      };
    };


//if cancel new idea post, all the inforamtion will clean

    $scope.back = function(){
      $ionicHistory.goBack();
      $scope.title = "";
      $scope.summary = "";
      $scope.desc = "";
      $scope.cid = "";
      $scope.cname = "Challenge"
      $scope.class1 = "";
      $scope.class2 = "";
      $scope.class3 = "";
      $scope.class4 = "";
      $scope.class5 = "";
      $scope.filename = "";
      $scope.fileurl = "";
      $scope.filedetail = "";
      $scope.img = "";
      $scope.imagedetail = "";
      $scope.img = "";
    };

    $scope.cname = "Challenge"; //in the beginning, the challenge bar is going to show challenge name is challenge
    $scope.h1 = true;


    //chanllenge expand function again.

    $scope.open = function () {
      $scope.h1 = !$scope.h1;
    }
        $scope.cha1 = function(){
      $scope.cid = 1;
          $scope.class1 = "ion-android-star";
          $scope.class2 = "";
          $scope.class3 = "";
          $scope.class4 = "";
          $scope.class5 = "";
          $scope.h1 = !$scope.h1;
          $scope.cname = "Challenge 1";
    };

    $scope.cha2 = function(){
      $scope.cid = 2;
      $scope.class1 = "";
          $scope.class2 = "ion-android-star";
          $scope.class3 = "";
          $scope.class4 = "";
          $scope.class5 = "";
      $scope.h1 = !$scope.h1;
       $scope.cname = "Challenge 2";
    };

        $scope.cha3 = function(){
          $scope.cid = 3;
          $scope.class1 = "";
          $scope.class2 = "";
          $scope.class3 = "ion-android-star";
          $scope.class4 = "";
          $scope.class5 = "";
          $scope.h1 = !$scope.h1;
          $scope.cname = "Challenge 3";
    };

        $scope.cha4 = function(){
          $scope.cid = 4;
          $scope.class1 = "";
          $scope.class2 = "";
          $scope.class3 = "";
          $scope.class4 = "ion-android-star";
          $scope.class5 = "";
          $scope.h1 = !$scope.h1;
          $scope.cname = "Challenge 4";


    };

        $scope.cha5 = function(){
          $scope.cid = 5;
          $scope.class1 = "";
          $scope.class2 = "";
          $scope.class3 = "";
          $scope.class4 = "";
          $scope.class5 = "ion-android-star";
          $scope.h1 = !$scope.h1;
          $scope.cname = "Challenge 5";
    };

    $scope.c1 = false;
    $scope.c2 = false;
    $scope.c3 = false;
    $scope.c4 = false;
    $scope.c5 = false;

  $scope.expand1 = function(){
    $scope.c1 = !$scope.c1;
    $scope.c2 = false;
    $scope.c3 = false;
    $scope.c4 = false;
    $scope.c5 = false;
  };

  $scope.expand2 = function(){
    $scope.c1 = false;
    $scope.c2 = !$scope.c2;
    $scope.c3 = false;
    $scope.c4 = false;
    $scope.c5 = false;
  };

  $scope.expand3 = function(){
    $scope.c1 = false;
    $scope.c2 = false;
    $scope.c3 = !$scope.c3;
    $scope.c4 = false;
    $scope.c5 = false;
  };

  $scope.expand4 = function(){
    $scope.c1 = false;
    $scope.c2 = false;
    $scope.c3 = false;
    $scope.c4 = !$scope.c4;
    $scope.c5 = false;
  };

  $scope.expand5 = function(){
    $scope.c1 = false;
    $scope.c2 = false;
    $scope.c3 = false;
    $scope.c4 = false;
    $scope.c5 = !$scope.c5;
  };


//new idea function
// new idea requires title, summary, challenge, description and ideaimage, if not, people cannot post idea
    $scope.newidea = function(){
      if(!$scope.title || !$scope.summary || !$scope.cid || !$scope.desc || !$scope.img) { 
   var alertPopup = $ionicPopup.alert({ //if any one of the elements is empty, there is a window going to pop up
     title: 'Please fill in all contents', //show content 
   });
   alertPopup.then(function(res) {
   });
      } else
       {
      posts = Posts.getAll(); // idea id based on how many posts posted
      newidea =  {
    "ideaNo": posts.length + 1, // idea id equal to post number plus one;
    "title":$scope.title,
    "summary":$scope.summary,
    "image":$scope.img,
    "likes": [],
    "favours": [],
    "created_date": Others.today(),
    "challenge_id":$scope.cid,
    "challenge_name":"Business",
    "author": Users.cuser(),
    "description": $scope.desc, "comments": [],
    "imagedetail":$scope.imagedetail,
    "filename":$scope.filename,
    "fileurl": $scope.fileurl,
    "filedetail": $scope.filedetail
  };

      Posts.newidea(newidea); //Posts new idea function 
      $state.go('tab.ideas') // go back to ideas tab after post new idea
      $scope.title = ""; //clean all the information in new post column
      $scope.summary = "";
      $scope.desc = "";
      $scope.cid = "";
      $scope.cname = "Challenge"
      $scope.class1 = "";
      $scope.class2 = "";
      $scope.class3 = "";
      $scope.class4 = "";
      $scope.class5 = "";
      $scope.filename = "";
      $scope.fileurl = "";
      $scope.filedetail = "";
      $scope.img = "";
      $scope.imagedetail = "";
      $scope.img = "";
    } };
  })


//team profile contrler 

  .controller('TdetailCtrl', function($stateParams, $scope, Users, $ionicHistory, Person){
       $scope.$on('$ionicView.beforeEnter', function() {
          $scope.choice = false; //not choose show team or profile information
         Users.pdetail($stateParams.id); //choose user id from Users service, put it in User's array
          $scope.cuser = Users.getdetail(); //get user detail
          $scope.team = Users.getteam(); // get user team detail
         $scope.isuser = false;  // previous function: if profiel is current user, app is going to show button to edit
         if ($stateParams.id == 2){ //but cancel after, maybe can use it as another purpose.
           $scope.isuser = true;
         }else{};
    });

          $scope.back = function(){
          $ionicHistory.goBack();
        };

     $scope.users = $stateParams.id;
  })


  //edit profile controller
      .controller('PeditCtrl', function($scope, $http, $filter, $ionicHistory, Users, filepickerService, $timeout, $ionicPopup, $cordovaCamera) {


        $scope.$on('$ionicView.beforeEnter', function() {
                  $scope.cuser = Users.getdetail();

    });

        $scope.back = function(){
          $ionicHistory.goBack();
        };

        $scope.editprofile = function(){
          Users.edit($scope.cuser); //use User service edit function to change 
          $ionicHistory.goBack();
    };


 $scope.imagechange = function() {
     $ionicPopup.show({
     title: 'Please choose your option',
     scope: $scope,
     buttons: [
       { text: 'Take a photo',
         type: 'button-balanced',
         onTap: function(){takePhotoimage()}
       },
       {
         text: 'Choose from library',
         type: 'button-royal',
         onTap: function(){takeLibimage()}

       },
       {
         text: 'Upload from file',
         type: 'button-black',
         onTap: function(){pickImage()}
       },
       {
         text: "Cancel",
         type: 'button-assertive'
       }
     ]
   });
  };
          $scope.file = {};

          var n = Date.now();
    function takeLibimage() {
        var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 400,
        targetHeight: 400,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.cuser.image = "data:image/jpeg;base64," + imageData;
      Users.edit($scope.cuser);
      }, function (err) {
        // error
      });
    };

       function takePhotoimage() {
      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 400,
        targetHeight: 400,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.cuser.image = "data:image/jpeg;base64," + imageData;
      Users.edit($scope.cuser);
      }, function (err) {
        // error
      });
    };

   function pickImage(){
     filepickerService.pick(
       {container:"modal", mimetype: 'image/*', cropDim: [400, 400], imageDim: [400, 400], services: ['GOOGLE_DRIVE', 'IMAGE_SEARCH', 'GITHUB']},imagepush,  function(FPError){
         console.log(FPError.toString());
       }
     )};
    function imagepush(Blob){
      console.log(123);
      $timeout(function(){
      }, 220);
      $scope.cuser.image = Blob.url;
      Users.edit($scope.cuser);
    };
})

    .controller('ProfileCtrl', function($scope, $http, $filter, $ionicHistory, Users, filepickerService, $timeout, $ionicPopup, $cordovaCamera) {


 $scope.imagechange = function() {
     $ionicPopup.show({
     title: 'Please choose your option',
     scope: $scope,
     buttons: [
       { text: 'Take a photo',
         type: 'button-balanced',
         onTap: function(){takePhotoimage()}
       },
       {
         text: 'Choose from library',
         type: 'button-royal',
         onTap: function(){takeLibimage()}

       },
       {
         text: 'Upload from file',
         type: 'button-black',
         onTap: function(){pickImage()}
       },
       {
         text: "Cancel",
         type: 'button-assertive'
       }
     ]
   });
  };
          $scope.file = {};

          var n = Date.now();
    function takeLibimage() {
      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 400,
        targetHeight: 400,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };
      $cordovaCamera.getPicture(options).then(function (imageData) {

        $scope.cuser.image = "data:image/jpeg;base64," + imageData;
      Users.edit($scope.cuser);
      }, function (err) {
        // error
      });
    };

    function takePhotoimage() {

      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 400,
        targetHeight: 400,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.cuser.image = "data:image/jpeg;base64," + imageData;
       Users.edit($scope.cuser);
       }, function (err) {
        // error
      });
    };

   function pickImage(){
     filepickerService.pick(
       {container:"modal", mimetype: 'image/*', cropDim: [400, 400], imageDim: [400, 400], services: ['GOOGLE_DRIVE', 'IMAGE_SEARCH', 'GITHUB']},imagepush,  function(FPError){
         console.log(FPError.toString());
       }
     )};

    function imagepush(Blob){
      console.log(123);
      $timeout(function(){
      }, 220);
      $scope.cuser.image = Blob.url;
      Users.edit($scope.cuser);
    };

    $scope.choice = false;

       $scope.$on('$ionicView.beforeEnter', function() {
         Users.pdetail(2);
          $scope.cuser = Users.getdetail();
          $scope.team = Users.getteam();
         console.log($scope.cuser.userid);
    });
      $scope.back = function(){
        $ionicHistory.goBack();
      };
})


//focus on input box function , not working

  .directive('focusMe', function($timeout) {
  return {
    link: function(scope, element, attrs) {
      $timeout(function() {
        element[0].focus();
      }, 150);
    }
  };
})

//search controller
  .controller('SearchCtrl', function($scope, Posts, $ionicHistory, Users, $rootScope, $ionicViewSwitcher) {

    $scope.posts = {};
    $scope.posts = Posts.getAll();
    $scope.users = {};
    $scope.users = Users.alluser();
    //get all the user and ideas inforamtion
    $scope.$on('$ionicView.beforeEnter', function() { //when view open, clean all the search contect
         $scope.search = {};
         $scope.search1 = {};
       });

    $scope.back = function(){
      $ionicViewSwitcher.nextDirection('enter'); //go back to previous view not with slide from left to right
      $ionicHistory.goBack();
    };//filter all the result out;

    $scope.search = {}; //start with all content cleaned
    $scope.search1 = {}; //search 1 is title search content

    $scope.title = function(){
    $scope.search1.title = $scope.search.username; // use search content for username transfer to search for title too
    };

    $scope.detail = function(idea){
      index = $scope.posts.indexOf(idea);
      Posts.post(index); //get into detail of idea
    };

})


//challenge page controller
  .controller('ChaCtrl', function($scope, Posts, $rootScope, $state) {

    $scope.$on('$ionicView.beforeEnter', function(){
      if (!$rootScope.cha)
      {}
      else {
        if ($rootScope.cha == "10" ){ //cha = 10, means search all idea
          $scope.class0 = "ion-android-star";
          $scope.class1 = "";
          $scope.class2 = "";
          $scope.class3 = "";
          $scope.class4 = "";
          $scope.class5 = "";}
        else {};
        if ($rootScope.cha == 1 ){
          $scope.class0 = "";
          $scope.class1 = "ion-android-star";
          $scope.class2 = "";
          $scope.class3 = "";
          $scope.class4 = "";
          $scope.class5 = "";}
        else {};
        if ($rootScope.cha == 2 ){
          $scope.class0 = "";
          $scope.class1 = "";
          $scope.class2 = "ion-android-star";
          $scope.class3 = "";
          $scope.class4 = "";
          $scope.class5 = "";}
        else {};
        if ($rootScope.cha == 3 ){
          $scope.class0 = "";
          $scope.class1 = "";
          $scope.class2 = "";
          $scope.class3 = "ion-android-star";
          $scope.class4 = "";
          $scope.class5 = "";}
        else {};
        if ($rootScope.cha == 4 ){
          $scope.class0 = "";
          $scope.class1 = "";
          $scope.class2 = "";
          $scope.class3 = "";
          $scope.class4 = "ion-android-star";
          $scope.class5 = "";}
        else {};
        if ($rootScope.cha == 5 ){
          $scope.class0 = "";
          $scope.class1 = "";
          $scope.class2 = "";
          $scope.class3 = "";
          $scope.class4 = "";
          $scope.class5 = "ion-android-star";}
        else {};
      };
    });

    $scope.c1 = false;
    $scope.c2 = false;
    $scope.c3 = false;
    $scope.c4 = false;
    $scope.c5 = false;

  $scope.expand1 = function(){
    $scope.c1 = !$scope.c1;
    $scope.c2 = false;
    $scope.c3 = false;
    $scope.c4 = false;
    $scope.c5 = false;
  };

  $scope.expand2 = function(){
    $scope.c1 = false;
    $scope.c2 = !$scope.c2;
    $scope.c3 = false;
    $scope.c4 = false;
    $scope.c5 = false;
  };

  $scope.expand3 = function(){
    $scope.c1 = false;
    $scope.c2 = false;
    $scope.c3 = !$scope.c3;
    $scope.c4 = false;
    $scope.c5 = false;
  };

  $scope.expand4 = function(){
    $scope.c1 = false;
    $scope.c2 = false;
    $scope.c3 = false;
    $scope.c4 = !$scope.c4;
    $scope.c5 = false;
  };

  $scope.expand5 = function(){
    $scope.c1 = false;
    $scope.c2 = false;
    $scope.c3 = false;
    $scope.c4 = false;
    $scope.c5 = !$scope.c5;
  };


    $scope.all = function(){ //search all ideas, rootscope.ca is going to be challenge id to transfer to homepage
      $scope.c1 = false;
      $scope.c2 = false;
      $scope.c3 = false;
      $scope.c4 = false;
      $scope.c5 = false;
      $rootScope.cha = "10";
      console.log($rootScope.cha);
      $state.go('tab.home'); // go to home tab after choose.
    };

    $scope.cha1 = function(){
      $rootScope.cha = 1;
    console.log($rootScope.cha);
      $state.go('tab.home');
    };

    $scope.cha2 = function(){
      $rootScope.cha = 2;
    console.log($rootScope.cha);
      $state.go('tab.home');
    };

        $scope.cha3 = function(){
      $rootScope.cha = 3;
    console.log($rootScope.cha);
          $state.go('tab.home');
    };

        $scope.cha4 = function(){
      $rootScope.cha = 4;
    console.log($rootScope.cha);
          $state.go('tab.home');
    };

        $scope.cha5 = function(){
      $rootScope.cha = 5;
    console.log($rootScope.cha);
          $state.go('tab.home');
    };
})


  //detail controller, maybe not using, previous though was there is another view especially for showing idea
  // detail in home screen

  .controller('DetailCtrl', function(Others, $scope, Posts, $ionicHistory) {

    $scope.$on('$ionicView.beforeEnter', function() {
        $scope.post = Posts.getdetail();
    });

    $scope.back = function(){
      $ionicHistory.goBack();
    };

    $scope.addComment = function(){
      newcomment = {"userid": 2, "text": $scope.newcomment, "date": Others.today()};
      Posts.postcomment(newcomment);
      $scope.newcomment = "";
    };
})




//home screen ctroller
.controller('HomeCtrl', function(Others, Icons, $ionicScrollDelegate, $timeout, $http, $scope, $filter, $ionicSlideBoxDelegate, $state, Posts, $rootScope, Person, Users) {

  $scope.posts = {};
  $scope.posts = Posts.getAll();
  //pick up all the posts
//define swiper

  var swiper = new Swiper('.swiper-container', { //swiper for home screen card view
        pagination: '.swiper-pagination',
        slidesPerView: 1.3,
        centeredSlides: true,
        paginationClickable: true,
        spaceBetween: 20
    });

    var swiper1 = new Swiper('.swiper-container1', { //swiper1 for expand view
      centeredSlides: true,
      autoHeight: true
    });

  $timeout(function(){swiper.update(); swiper.slideTo(0);}, 0); //after get inside the view, need to fresh up swiper, and move to first slide
  $timeout(function(){swiper1.update()}, 0); //refresh swiper inorder to adjust the size 

  //sort by function

//
    $scope.$on('$ionicView.enter', function() {

      if (!$rootScope.sort)
      {$scope.sort1 = "Sort By";}
      else {
        if ($rootScope.sort == "'-likes.length'"){
          $scope.sort1 = "Most Voted"};
        if ($rootScope.sort == "'-created_date'"){
          $scope.sort1 = "Newest"};
        if ($rootScope.sort == "'-author'"){
          $scope.sort1 = "Trending"};
    };

      if (!$rootScope.cha)
      {$scope.sort2 = "Challenge";}
      else {
        if ($rootScope.cha == "10" ){
          $scope.sort2 = "All";
          $scope.filter1 = "";}
        else {};
        if ($rootScope.cha == 1 ){
          $scope.sort2 = "Challenge 1";
        $scope.filter1 = $rootScope.cha;}
        else {};
        if ($rootScope.cha == 2 ){
          $scope.sort2 = "Challenge 2";
        $scope.filter1 = $rootScope.cha;}
        else {};
        if ($rootScope.cha == 3 ){
          $scope.sort2 = "Challenge 3";
        $scope.filter1 = $rootScope.cha;}
        else {};
        if ($rootScope.cha == 4 ){
          $scope.sort2 = "Challenge 4";
        $scope.filter1 = $rootScope.cha;}
        else {};
        if ($rootScope.cha == 5 ){
          $scope.sort2 = "Challenge 5";
        $scope.filter1 = $rootScope.cha;}
        else {};
      };

      //update swiper
      $timeout(function(){swiper.update(); swiper.slideTo(0);
      swiper1.update(); swiper1.slideTo(0);
      }, 0);

      //hide bar if it is in expand view when open
      if ($scope.check){
           $rootScope.hideTabs = false;
         }else{
           $rootScope.hideTabs = true;
         };

});

//name of idea function
    $scope.sname = function (id) {
    Users.name(id);
    return Users.name(id);
  };

//image of idea function
  $scope.image = function (id) {
    Users.image(id);
    return Users.image(id);
    console.log(Users.image(id));
  };


  $scope.fileicon = function(filename){

      type = filename.split('.').pop(); //identify file extention 

      if (type == "xlsx" ){icon = "img/filetypeicon/excel.png" } //base on file type choose icon
      else if(type == "pdf" ){icon = "img/filetypeicon/pdf.png" }
      else if(type == "txt" ){icon = "img/filetypeicon/txt.png" }
      else if (type == "docx" ){icon = "img/filetypeicon/word.png" }
      else if (type == "pptx" ){icon = "img/filetypeicon/ppt.png" }
      else{
        icon = "img/filetypeicon/files.png" // if not match, is going to return general icon
      };
        return icon
  };

  //expand function
  //check for expand big view, check2 for comment

  $scope.check = true;

  //check true =>search button, sort by bar and card view
  //check false =>back button, search small button, expand view

  $scope.check2 = false;

  //ng-hide="!check2" comment/reply

  $scope.check3 = false;

  //ng-show="check3" comment box


  $scope.check4 = true;


  //ng-show="!check4" reply box

  //expand() for expand
  //1. check false;
  //2. hide navigation bar

  $scope.expand = function(){ // press the card view idea, it is going to show expand, but not going to show comments
    $scope.check = !$scope.check;
    swiper1.slideTo(swiper.activeIndex); // got the expand view idea 
    $scope.check3 = false;
    $scope.check4 = true;
    $rootScope.hideTabs = true;
  };

  $scope.cexpand = function(){ // open comment in expand view
    $scope.check2 = true;
    $scope.check3 = true;
    $scope.check4 = true;
  };

  $scope.aexpand = function(){ // all expand, show comment, ideas and hide tabs
    swiper1.slideTo(swiper.activeIndex);
    $timeout(function(){ //use time out function to refresh swiper, if not, it is going to stuck
    $scope.check2 = true;
    $scope.check = !$scope.check;
    $scope.check3 = true;
    $scope.check4 = true;
    }, 220);
    $rootScope.hideTabs = true;
    $scope.cexpand();
  };

  $scope.rexpand = function(){ //resume to card view
    swiper.slideTo(swiper1.activeIndex); //generate expand view swiper slide number and change to card view
    $timeout(function(){
    $scope.check = true;
    $scope.check2 = false;
    $scope.check3 = false;
    $scope.check4 = true;
    $ionicScrollDelegate.scrollTop([true]);  //scroll to top
    $rootScope.hideTabs = false;}, 220); //show tabs
  };


      $scope.replyid = function(comment){
        var e = 0;
        if (!$rootScope.index){}else{ //identify which idea need to add reply, by clicking the reply button
          e = $rootScope.index;
        };
        var f = $scope.posts
        replyid = f[e].comments.indexOf(comment);
        console.log(replyid);
        $scope.check2 = true;
        $scope.check3 = false;
        $scope.check4 = false; // reply input box show and comment box hide
      };


  $scope.addreply = function(){
    newreply = {"userid": Users.cuser(),  "date":Others.today(), "text":$scope.newreply };
    Posts.hreply(newreply, replyid);
    $ionicScrollDelegate.scrollBottom([true]);
    $scope.newreply = "";
  };

    $scope.addComment = function(){
      newcomment = {"userid": Users.cuser(), "text": $scope.newcomment, "date": Others.today(), "replys":[]};
      console.log(newcomment);
      Posts.hcomment(newcomment); //use post.hcomment to push new commnet
      $scope.newcomment = "";
      $ionicScrollDelegate.scrollBottom([true])
    };


  $scope.comment = function(){
    var index = 0;

    if (!$rootScope.index){}
    else {
      index = $rootScope.index;
    }
    Posts.post(index);
  }

  //sort by function
    $scope.$on('$ionicView.beforeEnter', function() {

      if (!$rootScope.sort) //if nothing has been chosen, it is going to show Sorty by in sory by button
      {$scope.sort1 = "Sort By";}
      else {
        if ($rootScope.sort == "'-likes.length'"){ //sort by likes.length
          $scope.sort1 = "Most Voted"};
        if ($rootScope.sort == "'-created_date'"){ //sort by -created_date
          $scope.sort1 = "Newest"};
        if ($rootScope.sort == "'-author'"){ //sort by -author, because there is no trending algorithum
          $scope.sort1 = "Trending"};
    };


//filter function, filter challenge 1 idea

      if (!$rootScope.cha)
      {$scope.sort2 = "Challenge";}
      else {
        if ($rootScope.cha == "10" ){
          $scope.sort2 = "All";
          $scope.filter1 = "";}
        else {};
        if ($rootScope.cha == 1 ){
          $scope.sort2 = "Challenge 1";
        $scope.filter1 = $rootScope.cha;}
        else {};
        if ($rootScope.cha == 2 ){
          $scope.sort2 = "Challenge 2";
        $scope.filter1 = $rootScope.cha;}
        else {};
        if ($rootScope.cha == 3 ){
          $scope.sort2 = "Challenge 3";
        $scope.filter1 = $rootScope.cha;}
        else {};
        if ($rootScope.cha == 4 ){
          $scope.sort2 = "Challenge 4";
        $scope.filter1 = $rootScope.cha;}
        else {};
        if ($rootScope.cha == 5 ){
          $scope.sort2 = "Challenge 5";
        $scope.filter1 = $rootScope.cha;}
        else {};
      };
      $timeout(function(){swiper.update(); swiper.slideTo(0); //refresh the swipers in order for swiper size change
      swiper1.update(); swiper1.slideTo(0);
      }, 0);

});

  swiper.on('slideChangeEnd', function () { //when sipwer change 
    $rootScope.index = swiper.activeIndex;
});

    swiper1.on('slideChangeEnd', function () {
    $rootScope.index = swiper1.activeIndex;
});

  $scope.gotoslide = function(){ //testing for go to specific slide
    console.log("move");
    $ionicSlideBoxDelegate.slide(2);
  };


// like and unlike function
  $scope.like = function(post) {
    var user2 = {"userid": Users.cuser()};
      var temp2 = 0;
      var temparray = {};
    //determind wether is like or not, and pass the like item
      for (i=0; i < post.likes.length; i++) {
        if (post.likes[i].userid == user2.userid) {
          temparray = post.likes[i];
          temp2 = 1;
        }
        else {}
    };
    //temparray is the like item and remove it from likes array
    if ( temp2 == 1) {
      var index = post.likes.indexOf (temparray);
      console.log(index);
      if (index > -1) {
        post.likes.splice(index, 1);
      }
    }
    else {
      post.likes.push (user2);
      console.log (post.likes)
    }
  };

  //is liked style function

    $scope.isliked = function(post) {
      var user2 = {"userid": Users.cuser()};
      var temp = 0;
      for (i=0; i < post.likes.length; i++) {
        if (post.likes[i].userid == user2.userid) {
          temp = 1;
        }
        else {}
    };


      if(temp == 1){
        return "ion-android-favorite";
      }
      else{return "ion-android-favorite-outline";}
    };

  //favourite function
    $scope.favour = function(post) {
    var user2 = {"userid": Users.cuser()};
      var temp3 = 0;
      var temparray = {};
    //determind wether is like or not, and pass the like item
      for (i=0; i < post.favours.length; i++) {
        if (post.favours[i].userid == user2.userid) {
          temparray = post.favours[i];
          temp3 = 1;
        }
        else {}
    };
    //temparray is the like item and remove it from likes array
    if ( temp3 == 1) {
      var index = post.favours.indexOf (temparray);
      console.log(index);
      if (index > -1) {
        post.favours.splice(index, 1);
        Person.removefavor(post);
          console.log(post);
      }
    }
    else {
      post.favours.push (user2);
      console.log (post)
      Person.addfavor(post);
    }
  };
  //is liked style function
    $scope.isfavoured = function(post) {
      var user2 = {"userid": Users.cuser()};

      var temp4 = 0;
      for (i=0; i < post.favours.length; i++) {
        if (post.favours[i].userid == user2.userid) {
          temp4 = 1;
        }
        else {}
    };
      if(temp4 == 1){
        return " ion-android-star";
      }
      else{return "ion-android-star-outline";}
    };

  $scope.navigate=function(){$state.go('tab.expand')};
})


//sort by controller

.controller('SortCtrl', function($scope, $rootScope, Posts, $state) {
    $scope.sort = [
    { text: "Most Voted", value: "'-likes.length'" },
    { text: "Newest", value: "'-created_date'" },
    { text: "Trending", value: "'-author'" }
  ];
  $scope.data = {
  };

  $scope.new = function() {
    $rootScope.sort = $scope.data.sort; //pass the sort data to homepage
    var newsort = $scope.data.sort; //pass the sort value to Posts service
    Posts.sorting(newsort); // sort the posts in posts
    console.log($rootScope.sort);
    $state.go('tab.home');
}
})





//setting controller
.controller('SettingCtrl', function($rootScope, $scope, Users) {
   $scope.$on('$ionicView.beforeEnter', function() {
         Users.pdetail(2); //get detail of current user
          $scope.user = Users.getdetail();
   });
})


//help controller
  .controller('helpCtrl', function($scope , $ionicHistory){
            $scope.back = function(){
          $ionicHistory.goBack();
        };
  })


//term controller
  .controller('termCtrl', function($scope , $ionicHistory){
            $scope.back = function(){
          $ionicHistory.goBack();
        };
  })

//tutorial controller
      .controller('tutorCtrl', function($scope , $ionicHistory){
            $scope.back = function(){
          $ionicHistory.goBack();
        };
  })




//  login controlller, need to add authentication service

.controller('AuthCtrl', function($timeout, $rootScope, $scope, $state){
  $scope.user = {};
  // Auth.logIn($scope.user).error(function(error){
  //     $scope.error = error;
  //   }).then(function(){
  //     $state.go('home');
  //   });
  $scope.message = '';

  $scope.logIn = function(){
    if (!$scope.user.username || !$scope.user.password) { //if user name and password is not correct, will show inforamtion
      $scope.message = 'Please fill in all the fields'} //if not fill in all information and click log in will show error message
    else if ($scope.user.username != "test") {
      $scope.message = 'Invalid username or password'}
    else if ($scope.user.password != 1234) {
      $scope.message = 'Invalid username or password'
    }
    else {
      $rootScope.user = {"userid": 5}; //if success, user id = 6
      console.log($scope.user);
      console.log($rootScope.user);
      $state.go('tab.home')  //get into home screen.
    $timeout(function(){$scope.user = {};
      $scope.message = '';
      $scope.buttonclass = "button-energized button-outline";}, 30); //after login , clean the message and username
    };
  };

    $scope.inputType = 'password';

  // Hide & show password function
  $scope.hideShowPassword = function(){
    if ($scope.inputType == 'password')
      $scope.inputType = 'text';
    else
      $scope.inputType = 'password';
  };

  $scope.buttonclass = "button-energized button-outline"; //change button class, previous one is white background and black border

$scope.fillin = function(){
    if ($scope.user.username && $scope.user.password){ // if user name and password fill in, it button class change
      $scope.buttonclass = "button-login"
    }else{
      $scope.buttonclass = "button-energized button-outline";
    }};
})

//tab ideas controller
    .controller('IdeasCtrl', function ($http, $scope, $state, Person, Posts, Users, $rootScope, $ionicScrollDelegate) {


      $scope.$on('$ionicView.beforeEnter', function() {
         $rootScope.hideTabs = false;
       });

      $scope.class1 = ""; //when get in, it should me on me tab, class1 me button class, class 2 is team button class, class three is favorite button class
      $scope.class2 = "button-outline";
      $scope.class3 = "button-outline";
      $scope.myIdeasList = Posts.getAll();
      // current user id

      $scope.author1 = 2;

      // open edit list to navigate to edit funciton, true is hide, false is show
      $scope.myexpand = true;
      //if in me tab, is going to edit the idea, if not, going to see the detail of the ideas

      $scope.link = function(id){ // if in me tab, click idea will get into edit idea function
        if ($scope.class1 == ""){
          $state.go('tab.editidea', { id: id});
        } else {
          $state.go('tab.ideatail', { id: id}); // if in other tab, click idea will see detail
        };
      }

      //ideadetail
      $scope.detail = function(ideano){
    };

      $scope.myideas = function(){ //my idea tab
        var authors = {};
        $scope.myIdeasList = Posts.getAll();
        $scope.author1 = 2;
        $scope.class1 = "";
        $scope.class2 = "button-outline";
        $scope.class3 = "button-outline";
        isfavourite = 1;
        $ionicScrollDelegate.scrollTop();
      };

      $scope.teamideas = function(){

        var mytesing = [];

        all = Posts.getAll();
        team = Users.getteam();

        for (i = 0; i < all.length; i++){
          for (p = 0; p < team.length; p++){
            if (all[i].author == team[p].userid){
              mytesing.push(all[i]);

            }else{};
          };
        };

        $scope.myIdeasList = mytesing;
        $scope.author1 = "";
        $scope.class1 = "button-outline";
        $scope.class2 = "";
        $scope.class3 = "button-outline";


        isfavourite = 1;
        $ionicScrollDelegate.scrollTop();
      };

      isfavourite = 1;

      $scope.favourites = function(){ //favourtie idea, detact all favorite ideas
        $ionicScrollDelegate.scrollTop();
        $scope.class1 = "button-outline";
        $scope.class2 = "button-outline";
        $scope.class3 = "";
        $scope.author1 = "";
        var myfavorite = [];
        all1 = Posts.getAll();
        nowuser = Users.current();
        for (i = 0; i < all1.length; i++){
          for (p=0; p< all1[i].favours.length; p++){
            if (all1[i].favours[p].userid == nowuser.userid){
              myfavorite.push(all1[i]);
            }else{
            };
          };
        };
        $scope.myIdeasList = myfavorite;
        isfavourite = 2;
      };

//like function

  $scope.like = function(post) {
    var user2 = {"userid": Users.cuser()};
      var temp2 = 0;
      var temparray = {};
    //determind wether is like or not, and pass the like item
      for (i=0; i < post.likes.length; i++) {
        if (post.likes[i].userid == user2.userid) {
          temparray = post.likes[i];
          temp2 = 1;
        }
        else {}
    };
    //temparray is the like item and remove it from likes array

    if ( temp2 == 1) {
      var index = post.likes.indexOf (temparray);
      console.log(index);
      if (index > -1) {
        post.likes.splice(index, 1);
        // Posts.unlike(post, index);
      }
    }
    else {
      post.likes.push (user2);
      console.log (post.likes)
    }
  };

  //is liked style function
   $scope.isliked = function(post) {
      var user2 = {"userid": Users.cuser()};
      var temp = 0;
      for (i=0; i < post.likes.length; i++) {
        if (post.likes[i].userid == user2.userid) {
          temp = 1;
        }
        else {}
    };

      if(temp == 1){
        return "ion-android-favorite assertive";
      }
      else{return "ion-android-favorite-outline dark";}
    };

  //favourite function
    $scope.favour = function(post) {
    var user2 = {"userid": Users.cuser()};
      var temp3 = 0;
      var temparray = {};
    //determind wether is like or not, and pass the like item
      for (i=0; i < post.favours.length; i++) {
        if (post.favours[i].userid == user2.userid) {
          temparray = post.favours[i];
          temp3 = 1;
        }
        else {}
    };
    //temparray is the like item and remove it from likes array
    if ( temp3 == 1) {
      var index = post.favours.indexOf (temparray);
      if (index > -1) {
        Person.removefavor(post);
        post.favours.splice(index, 1);
        // console.log(isfavourite);
        if (isfavourite == 2){
          $scope.favourites();
        };
      }
    }
    else {
      post.favours.push (user2);
      console.log (post)
      Person.addfavor(post);
    }
  };
  //is liked style function
    $scope.isfavoured = function(post) {
      var user2 = {"userid": Users.cuser()};

      var temp4 = 0;
      for (i=0; i < post.favours.length; i++) {
        if (post.favours[i].userid == user2.userid) {
          temp4 = 1;
        }
        else {}
    };
      if(temp4 == 1){
        return " ion-android-star";
      }
      else{return "ion-android-star-outline";}
    };
    })


//hide tab directive
.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope, $el) {
            $rootScope.hideTabs = true;
            $scope.$on('$destroy', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
});

