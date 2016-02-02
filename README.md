#Landing Page Gallery

The Landing Page Gallery is an [Angular](http://angularjs.org/) app written for [HCA](http://hcahealthcare.com)'s Florida Division to showcase all of the campaign pages and microsites that have been created by our team.

SASS and JS are compiled and minified on save using Gulp. A live version can be published to Github Pages via Gulp `npm run gh-pages`. All of the essential Gulp tasks are pointed to in npm package scripts to refrain from forcing anyone to do a global install of Gulp.

This application requires A LOT of screenshots, so we have also written a Gulp task to handle grabbing all of those as well: `npm run screenshots`. Be sure to have ImageMagick installed before trying to run this.

##Todo
###V1 Launch
- [x] fix ID sourcing (currently pulling hostID)
- [x] change template-id to templateId
- [x] clean up transitions
- [x] build out see otherCampaigns
- [x] screenshots
- [x] snippet/comment gen tool
- [x] change template details to full-height on tablet (redesigned tablet view)
- [x] vertical align (Other Campaigns) thumbnails and text
- [x] change loading splash to light blue bg and KO logo
- [x] refine ui/interaction on detail page
- [x] add option to skip introduction
- [x] bug: white space on mobile
- [ ] content gathering

###V1.1 Post-Launch
- [ ] clean image loading (lazy loading)
- [ ] pagination/endless scroll
####Tentative
- [ ] move shortCode hashing into velocity/backend
- [ ] move templateTitle pushing into velocity/backend

###V2
- [ ] grid filtering --masonry/isotope style animation
- [ ] write a new screenshot scraper that can handle YT embeds
- [ ] make quick search act like a fuzzy finder?
- [ ] mobile screenshot onmouseover in gallery
- [ ] mobile/desktop preview switch on detail view

##Requirements
* Node/npm
* ImageMagick is required for `npm run screenshots`, but not necessary to run the site/application.

##Getting Set Up

If you'd like to check out the build at any time, simply clone our repository.

```bash
git clone https://github.com/web-q/landing-page-gallery.git
cd landing-page-gallery
```
Then run a quick:
```bash
npm install
```
This will install any other dependencies via `npm` and `bower`.
Now simply:
```bash
npm start
```
