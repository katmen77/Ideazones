angular.module('starter.services', [])

  .factory('Others', function()
    {
      var today = {}; //show today's date
      return {
        today:function(){
          today = new Date();
          dd = today.getDate();
          mm = today.getMonth()+1; //January is 0!
          yyyy = today.getFullYear();if(dd<10){dd='0'+dd}
          if(mm<10){
            mm='0'+mm
          }
          today = yyyy+'/'+mm+'/'+dd;
        return today
        }}})


    .factory('Icons', function() { //icon function
      var icon = {};
      var type = {};
      return {
        decide: function(filename){
          if(!filename){}else{
            type = filename.split('.').pop();
            if (type == "xlsx" ){icon = "excel.png" }
            else if(type == "pdf" ){icon = "pdf.png" }
            else if(type == "txt" ){icon = "txt.png" }
            else if (type == "docx" ){icon = "word.png" }
            else if (type == "pptx" ){icon = "ppt.png" }
            else{icon = "files.png"};
            return icon;
          };
        }
      };
    })




    //tried to put filepicker and camera inside the function, not working, because pop up cannot detect finished
    //so far only return the option value to the camera function.


  //
  //
  //
  // .factory('File', function() {
  //
  //
  //   var n = Date.now();
  //
  //         var photooption = {
  //       quality: 80,
  //       destinationType: Camera.DestinationType.DATA_URL,
  //       sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
  //       allowEdit: true,
  //       encodingType: Camera.EncodingType.JPEG,
  //       targetWidth: 400,
  //       targetHeight: 400,
  //       popoverOptions: CameraPopoverOptions,
  //       saveToPhotoAlbum: false
  //     };
  //
  //
  //         var  camoption = {
  //       quality: 80,
  //       destinationType: Camera.DestinationType.DATA_URL,
  //       sourceType: Camera.PictureSourceType.CAMERA,
  //       allowEdit: true,
  //       encodingType: Camera.EncodingType.JPEG,
  //       targetWidth: 400,
  //       targetHeight: 400,
  //       popoverOptions: CameraPopoverOptions,
  //       saveToPhotoAlbum: false
  //     };
  //
  //     return {
  //
  //
  //       pick:function(){
  //
  //         return photooption
  //
  //
  //
  //       },
  //
  //       take:function() {
  //          return camoption
  //
  //
  //       }
  //
  //   }})
  //
  //
  //








  //auth function


// .factory('Auth', ['$http', '$window', function($http, $window){
//    var auth = {};
// //
// auth.saveInfo = function (user){
//   $window.localStorage['userInfo'] = user;
// };
// //
// // auth.getToken = function (){
// //   return $window.localStorage['flapper-news-token'];
// // };
// //
// // auth.isLoggedIn = function(){
// //   var token = auth.getToken();
// //
// //   if(token){
// //     var payload = JSON.parse($window.atob(token.split('.')[1]));
// //
// //     return payload.exp > Date.now() / 1000;
// //   } else {
// //     return false;
// //   }
// // };
// //
// // auth.currentUser = function(){
// //   if(auth.isLoggedIn()){
// //     var token = auth.getToken();
// //     var payload = JSON.parse($window.atob(token.split('.')[1]));
// //
// //     return payload.username;
// //   }
// // };
// //
// // auth.register = function(user){
// //   return $http.post('/register', user).success(function(data){
// //     auth.saveToken(data.token);
// //   });
// // };
//
//
//
//
//
// auth.logIn = function(user){
//   return $http.post('http://localhost:3000/login', user).success(function(data){
//     auth.saveInfo(data.user);
//   });
// };
//
// auth.logOut = function(){
//   $window.localStorage.removeItem('userInfo');
// };
//
//
//   return auth;
// }])


  //post function

  .factory('Users', function($http, $filter) {


    var o = {users:[]};
    var team = [];
    var nuser = {};
    var currentuser = {};
    var currentteam = [];

    $http.get('user.json').success(function(data) { //when service start, get information from user.json file
      angular.copy(data,o.users); //get all user data
      var t = data;
      var temp = $filter('filter')(t, {userid:2});
      angular.copy(temp[0], nuser); //get userid equal to 2 user
      angular.copy(temp[0], currentuser); // get current user
      var eam = $filter('filter')(t, {teamid:nuser.teamid}); //get team from user info
      angular.copy(eam, team);
      angular.copy(eam, currentteam);
      //
      for (i=0; i<o.users.length; i++ ){
        if(o.users[i].userid == 2){index = i;} else {};
      };
    });


    //nuser is going to controll the profile information owner, need to set setting change to user detail and show detail

    o.pdetail = function(id){ //use user id to find out user information
      console.log(id);
      console.log(o.users);
      var t = o.users;
      var temp = $filter('filter')(t, {userid:id});
      nuser = {};
      team = [];
      angular.copy(temp[0], nuser); //put it in variables
      var eam = $filter('filter')(t, {teamid:nuser.teamid});
      angular.copy(eam, team);
    };

    o.alluser = function(){ //return all users
      return o.users;
    };


    o.cuser = function(){ //return current userid
      return currentuser.userid;
    };

    o.current = function(){ //return current user information
      return currentuser;
    };

    o.currentteam = function(){ //return current user team information 
      return currentteam;
    };

    o.name = function(id){ //use user id to locate the name of user
      for (i=0; i<o.users.length; i++ ){
        if(o.users[i].userid == id){name = o.users[i].username;} else {};
      };
      return name;
    };

    o.image = function(id){ //use user id to locate the picture of user
      var image = "";
      for (i=0; i<o.users.length; i++ ){
        if(o.users[i].userid == id){image = o.users[i].image;} else {};
      };
      return image;
    };

    o.getdetail = function(){ //after get use user id to change the nuser value, get user detail and return it
      return nuser;
    };

    o.getteam = function(){ //get user team detail and return it
      return team;
    };

    o.edit = function(cuser){ //edit user ndetail
      o.users[index] = cuser;
      console.log(o.users);
      console.log(index);
    }
    return o;
  })


//ideas related service
.factory('Posts', function($http, $filter, $ionicSlideBoxDelegate, $rootScope, $state) {

  var o = {
    posts:[]
  };
  $http.get('random.json').success(function (data) {
    angular.copy(data, o.posts);  //get idea from json file and copy it to current o.users array
  });

  o.delete = function(post){ //use idea information to identify post position in array and delete it
    var c = o.posts;
    for (i = 0; i < c.length; i++){
      if (c[i].ideaNo == post.ideaNo){
        c.splice(i,1);
      }else{};
    };
  };

  o.editidea = function(id){ //user ideaNo to identify the idea and change the information
    var b = o.posts;
    for (i = 0; i < b.length; i++){
      if (b[i].ideaNo == id.ideaNo){
        b[i] = id;
      }else{};
    };

  };

  o.testing = function(newcomment, postid){ //add comment base on post id
    console.log(postid);
    console.log(newcomment);
    var a = o.posts;
    console.log(a);
    for (i = 0; i < a.length; i++){
      if (a[i].ideaNo == postid){
        var index = i;
      }else{};
    };
    console.log(index);
    o.posts[index].comments.push(newcomment);
  };


  o.addreply = function(newreply, postid, replyid){ //add reply base on post id and reply id
    var a = o.posts;
    for (i = 0; i < a.length; i++){
      if (a[i].ideaNo == postid){
        var index1 = i;
      }
      else{};
    };
    console.log(index1, replyid, newreply);
    o.posts[index1].comments[replyid].replys.push(newreply);
  };

    o.idetail = function (id) {//user id to identify post no
    for(i = 0; i < o.posts.length; i++){
      if(o.posts[i].ideaNo == id){
        return o.posts[i];
      }else{};
      };
  };

  o.getAll = function(){//get all idea and update slide box
    return o.posts;
     $ionicSlideBoxDelegate.update();
  };

  //sorting funnction, use filter function to change the posts array and put it back to posts
  o.sorting = function (newsort) {
    console.log(o.posts);
    var orderBy = $filter('orderBy');
    var tempposts = o.posts;
    tempposts = orderBy (tempposts, newsort, true);
    console.log(tempposts);
    angular.copy(tempposts, o.posts);
  };

  o.newidea = function(newidea){ // push new idea in the posts
    console.log(newidea)
    o.posts.push(newidea);
  };

  var postd = {}; //expand function(not working, keep it see if anything useful)

  o.postfavor = function(postt){ //see favorite idea detail
    postd = postt;
  };

  o.post = function (index){ //see idea detail
    postd = o.posts[index];
    console.log (postd);
    $state.go('tab.detail')
  };

  o.getdetail = function(){ //see idea detail
    console.log (postd);
    return postd;
  };

  o.postcomment = function(newcomment){ //post comment base on the post index in posts array
    console.log(postd);
    console.log(o.posts);
    console.log(o.posts.indexOf(postd));
    var a = o.posts.indexOf(postd);
    console.log(a);
    o.posts[a].comments.push(newcomment);
    console.log(o.posts);
  };


  o.hcomment = function(newcomment){//post comment in home page, base on index in rootScope
    var b = 0
    if (!$rootScope.index){
    }
    else {
      b = $rootScope.index;
      console.log(b);
    };
    o.posts[b].comments.push(newcomment);
  };


    o.hreply = function(newreply, replyid){//post reply in home page
      var b = 0
    if (!$rootScope.index){
    }
    else {
      b = $rootScope.index;
      console.log(b);
    };
    console.log(b, replyid, newreply);
    o.posts[b].comments[replyid].replys.push(newreply);
  };
  return o;
})


//relate to favorite function
.factory('Person', function($http, $state, Posts, Users) {

  var o = {ideas:[]};

  $http.get('random.json').success(function(data){//get favorite ideas
    var k = [];
    s = data;
    for (t =0; t < s.length; t++) {
      var user2 = {"userid": Users.cuser()};
      var temp4 = 0;
      for (i = 0; i < s[t].favours.length; i++) {
        if (s[t].favours[i].userid == user2.userid) {
          temp4 = 1;
          k.push(s[t]);
        }
        else {
        }
      };
      angular.copy(k, o.ideas);
    };
  });

  var postd = {};

  o.getidea = function(index){ //get idea detail
    postt = o.ideas[index];
    console.log (postt);
    Posts.postfavor (postt);
    $state.go('tab.detail')
  };

  //need to figure out how ro remove the posts in favour which already exist
  o.getfavor = function(){ //get favortie ideas
    return o.ideas;
  };

  o.addfavor = function(post){ //add favorite idea
    o.ideas.push(post);
  };

  o.removefavor = function(post){ //delete favorte idea
    for (i=0; i<o.ideas.length; i++){
      if (o.ideas[i].ideaNo == post.ideaNo){
        o.ideas.splice(i, 1);
      }
      else{};
    };
  };
return o;
});

