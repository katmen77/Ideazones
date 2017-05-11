angular.module('ionic.ion.headerShrink', [])

.directive('headerShrink', function($document) {


   var fadeAmt;



  return {
    restrict: 'A',
    link: function($scope, $element) {


      var y = 0;
      var prevY = 0;
      var scrollDelay = 0.4;

      // var yb = 0;
      // var prevYb = 0;




      var fadeAmt;


      // var fadeAmtb;

      var header = $document[0].body.querySelector('#shrint1');
      var headerHeight = header.offsetHeight;

      // var footer = $document[0].body.querySelector('#shrint2');
      // var footerHeight = footer.offsetHeight;



      function onScroll(e) {
        var scrollTop = e.detail.scrollTop;

        if(scrollTop >= 0) {
          y = Math.min(headerHeight / scrollDelay, Math.max(0, y + scrollTop - prevY));
          // yb = Math.min(footerHeight / scrollDelay, Math.max(0, yb + scrollTop - prevYb)) - 6;
          //
          // console.log("footerheight: " + footerHeight / scrollDelay);
          // console.log("headerheight: " + Math.max(0, yb + scrollTop - prevYb));
          // console.log("yb: " + yb);
          // // console.log(yb + scrollTop - prevYb);



        } else {
          y = 0;
          // yb = 0;
        }
        // console.log(scrollTop);
        //
        ionic.requestAnimationFrame(function() {
          fadeAmt = 1 - (y / headerHeight);
          // fadeAmtb = 1 - (yb / footerHeight);

          header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -y + 'px, 0)';
          for(var i = 0, j = header.children.length; i < j; i++) {
            header.children[i].style.opacity = fadeAmt;

          }


          // console.log('-yb = ' + -yb);



          // footer.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -yb + 'px, 0)';
          // for(var i = 0, j = footer.children.length; i < j; i++) {
            // footer.children[i].style.opacity = fadeAmtb;

          // }
        });

        prevY = scrollTop;
        // prevYb = scrollTop;
         // console.log('prevYb = ' + prevYb);
      }

      $element.bind('scroll', onScroll);
    }
  }






  // var fadeAmt;
  //
  // var shrink = function(header, content, amt, max) {
  //   amt = Math.min(max, amt);
  //   fadeAmt = 1 - amt / max;
  //   ionic.requestAnimationFrame(function() {
  //     header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, -' + amt + 'px, 0)';
  //     for(var i = 0, j = header.children.length; i < j; i++) {
  //       header.children[i].style.opacity = fadeAmt;
  //     }
  //   });
  // };
  //
  // return {
  //   restrict: 'A',
  //   link: function($scope, $element, $attr) {
  //     var starty = $scope.$eval($attr.headerShrink) || 0;
  //     var shrinkAmt;
  //
  //     var amt;
  //
  //     var y = 0;
  //     var prevY = 0;
  //     var scrollDelay = 0.4;
  //
  //     var fadeAmt;
  //
  //     var header = $document[0].body.querySelector('#shrink');
  //     var headerHeight = header.offsetHeight;
  //
  //     function onScroll(e) {
  //       var scrollTop = e.detail.scrollTop;
  //
  //       if(scrollTop >= 0) {
  //         y = Math.min(headerHeight / scrollDelay, Math.max(0, y + scrollTop - prevY));
  //       } else {
  //         y = 0;
  //       }
  //       console.log(scrollTop);
  //
  //       ionic.requestAnimationFrame(function() {
  //         fadeAmt = 1 - (y / headerHeight);
  //         header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -y + 'px, 0)';
  //         for(var i = 0, j = header.children.length; i < j; i++) {
  //           header.children[i].style.opacity = fadeAmt;
  //         }
  //       });
  //
  //       prevY = scrollTop;
  //     }
  //
  //     $element.bind('scroll', onScroll);
  //   }
  // }
})



.directive('headerShrink1', function($document) {
  var fadeAmt;



  return {
    restrict: 'A',
    link: function($scope, $element) {


      var y = 0;
      var prevY = 0;
      var scrollDelay = 0.4;

      // var yb = 0;
      // var prevYb = 0;




      var fadeAmt;


      // var fadeAmtb;

      var header = $document[0].body.querySelector('#shrint1');
      var headerHeight = header.offsetHeight;

      // var footer = $document[0].body.querySelector('#shrint2');
      // var footerHeight = footer.offsetHeight;



      function onScroll(e) {
        var scrollTop = e.detail.scrollTop;

        if(scrollTop >= 0) {
          y = Math.min(headerHeight / scrollDelay, Math.max(0, y + scrollTop - prevY));
          // yb = Math.min(footerHeight / scrollDelay, Math.max(0, yb + scrollTop - prevYb)) - 6;
          //
          // console.log("footerheight: " + footerHeight / scrollDelay);
          // console.log("headerheight: " + Math.max(0, yb + scrollTop - prevYb));
          // console.log("yb: " + yb);
          // // console.log(yb + scrollTop - prevYb);



        } else {
          y = 0;
          // yb = 0;
        }
        // console.log(scrollTop);
        //
        ionic.requestAnimationFrame(function() {
          fadeAmt = 1 - (y / headerHeight);
          // fadeAmtb = 1 - (yb / footerHeight);

          header.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -y + 'px, 0)';
          for(var i = 0, j = header.children.length; i < j; i++) {
            header.children[i].style.opacity = fadeAmt;

          }


          // console.log('-yb = ' + -yb);



          // footer.style[ionic.CSS.TRANSFORM] = 'translate3d(0, ' + -yb + 'px, 0)';
          // for(var i = 0, j = footer.children.length; i < j; i++) {
            // footer.children[i].style.opacity = fadeAmtb;

          // }
        });

        prevY = scrollTop;
        // prevYb = scrollTop;
         // console.log('prevYb = ' + prevYb);
      }

      $element.bind('scroll', onScroll);
    }
  }
})

