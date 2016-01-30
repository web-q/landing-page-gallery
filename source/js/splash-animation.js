landingPageGallery.directive('splashAnimate', ['$rootScope', function($rootScope) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      elem.on('load', function() {
        $rootScope.$apply(function() {
          $rootScope.splashFinished = false;
          $rootScope.showLoadText = true;
        });
        function animationComplete() {
          $rootScope.$apply(function() {
            $rootScope.splashFinished = true;
            console.log('Intro Played Through');
          });
          if (!$rootScope.dataFetched) {
            tl.restart();
          }
        }
        var svgdoc = this.contentDocument;
        var cir = svgdoc.getElementsByClassName("cir"),
          icon = svgdoc.getElementsByClassName("icon-wrap"),
          title = svgdoc.getElementsByClassName("title"),
          sub = svgdoc.getElementsByClassName("sub"),
          tAnim = 0.8,
          tIconOffset = "-=" + (tAnim * 7 / 10),
          tAltOffset = "-=" + (tAnim * 1 / 2),
          tl = new TimelineMax({
            repeat: 0,
            yoyo: false,
            repeatDelay: tAnim,
            onComplete: animationComplete
          });
        tl.to(cir[0], tAnim, {
          rotation: "360",
          transformOrigin: "50% 50%",
          strokeDashoffset: "200",
          ease: Power1.easeOut
        });
        tl.fromTo(icon[0], 2 / 5 * tAnim, {
          opacity: "0",
          y: "5",
          transformOrigin: "50% 50%"
        }, {
          opacity: "1",
          y: "0",
          transformOrigin: "50% 50%",
          ease: Power1.easeOut
        }, tIconOffset);
        tl.to(title[0], 2 / 5 * tAnim, {
          opacity: "1",
          ease: Power1.easeIn
        }, tIconOffset);
        tl.to(sub[0], 2 / 5 * tAnim, {
          opacity: "1",
          ease: Power1.easeIn
        });
        tl.appendMultiple(TweenMax.allTo([title[0], sub[0]], 1 / 2 * tAnim, {
          opacity: "0",
          transformOrigin: "50% 50%",
          ease: Linear.EaseNone
        }), 3 / 2 * tAnim);
        tl.appendMultiple(TweenMax.allTo([cir[0], icon[0]], 3 / 2 * tAnim, {
          opacity: "0",
          y: "10",
          transformOrigin: "50% 50%",
          ease: Power1.easeIn
        }), tAltOffset);
        tl.to(cir[1], tAnim, {
          rotation: "360",
          transformOrigin: "50% 50%",
          strokeDashoffset: "200",
          ease: Power1.easeOut
        });
        tl.fromTo(icon[1], 2 / 5 * tAnim, {
          opacity: "0",
          y: "5",
          transformOrigin: "50% 50%"
        }, {
          opacity: "1",
          y: "0",
          transformOrigin: "50% 50%",
          ease: Power1.easeOut
        }, tIconOffset);
        tl.to(title[1], 2 / 5 * tAnim, {
          opacity: "1",
          ease: Power1.easeIn
        }, tIconOffset);
        tl.to(sub[1], 2 / 5 * tAnim, {
          opacity: "1",
          ease: Power1.easeIn
        });
        tl.appendMultiple(TweenMax.allTo([title[1], sub[1]], 1 / 2 * tAnim, {
          opacity: "0",
          transformOrigin: "50% 50%",
          ease: Linear.EaseNone
        }), 3 / 2 * tAnim);
        tl.appendMultiple(TweenMax.allTo([cir[1], icon[1]], 3 / 2 * tAnim, {
          opacity: "0",
          y: "10",
          transformOrigin: "50% 50%",
          ease: Power1.easeIn
        }), tAltOffset);
        tl.to(cir[2], tAnim, {
          rotation: "360",
          transformOrigin: "50% 50%",
          strokeDashoffset: "200",
          ease: Power1.easeOut
        });
        tl.fromTo(icon[2], 2 / 5 * tAnim, {
          opacity: "0",
          y: "5",
          transformOrigin: "50% 50%"
        }, {
          opacity: "1",
          y: "0",
          transformOrigin: "50% 50%",
          ease: Power1.easeOut
        }, tIconOffset);
        tl.to(title[2], 2 / 5 * tAnim, {
          opacity: "1",
          ease: Power1.easeIn
        }, tIconOffset);
        tl.to(sub[2], 2 / 5 * tAnim, {
          opacity: "1",
          ease: Power1.easeIn
        });
        tl.appendMultiple(TweenMax.allTo([title[2], sub[2]], 1 / 2 * tAnim, {
          opacity: "0",
          transformOrigin: "50% 50%",
          ease: Linear.EaseNone
        }), 3 / 2 * tAnim);
        tl.appendMultiple(TweenMax.allTo([cir[2], icon[2]], 3 / 2 * tAnim, {
          opacity: "0",
          y: "10",
          transformOrigin: "50% 50%",
          ease: Power1.easeIn
        }), tAltOffset);
        $rootScope.$watch('skipIntro', function() {
          if ($rootScope.skipIntro) {
            tl.stop();
            console.log('Stopping Animation');
          }
        });
      });
    }
  };
}]);
