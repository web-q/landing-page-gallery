window.onload = function() {
  var svgdoc = document.getElementById("svgSplash").contentDocument;
  var cir = svgdoc.getElementsByClassName("cir"),
      icon = svgdoc.getElementsByClassName("icon-wrap"),
      tAnim = 0.8,
      tIconOffset = "-=" + (tAnim*7/10),
      tl = new TimelineMax({repeat:-1, yoyo:false, repeatDelay:tAnim});

  tl.to(cir[0], tAnim, {
    rotation: "360",
    transformOrigin:"50% 50%",
    strokeDashoffset: "200",
    ease: Power1.easeOut});
  tl.fromTo(icon[0], 2/5*tAnim, {
    opacity: "0",
    y: "5",
    transformOrigin:"50% 50%"}, {
    opacity: "1",
    y: "0",
    transformOrigin:"50% 50%",
    ease: Power1.easeOut}, tIconOffset);
  tl.appendMultiple(TweenMax.allTo([cir[0], icon[0]], 3/2*tAnim, {
    opacity: "0",
    y: "10",
    transformOrigin:"50% 50%",
    ease: Power1.easeIn}));
  tl.to(cir[1], tAnim, {
    rotation: "360",
    transformOrigin:"50% 50%",
    strokeDashoffset: "200",
    ease: Power1.easeOut});
  tl.fromTo(icon[1], 2/5*tAnim, {
    opacity: "0",
    y: "5",
    transformOrigin:"50% 50%"}, {
    opacity: "1",
    y: "0",
    transformOrigin:"50% 50%",
    ease: Power1.easeOut}, tIconOffset);
  tl.appendMultiple(TweenMax.allTo([cir[1], icon[1]], 3/2*tAnim, {
    opacity: "0",
    y: "10",
    transformOrigin:"50% 50%",
    ease: Power1.easeIn}));
  tl.to(cir[2], tAnim, {
    rotation: "360",
    transformOrigin:"50% 50%",
    strokeDashoffset: "200",
    ease: Power1.easeOut});
  tl.fromTo(icon[2], 2/5*tAnim, {
    opacity: "0",
    y: "5",
    transformOrigin:"50% 50%"}, {
    opacity: "1",
    y: "0",
    transformOrigin:"50% 50%",
    ease: Power1.easeOut}, tIconOffset);
  tl.appendMultiple(TweenMax.allTo([cir[2], icon[2]], 3/2*tAnim, {
    opacity: "0",
    y: "10",
    transformOrigin:"50% 50%",
    ease: Power1.easeIn}));
};
