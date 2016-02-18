#Landing Page Gallery

The Landing Page Gallery is an [Angular](http://angularjs.org/) app written for [HCA](http://hcahealthcare.com)'s Florida Division to showcase all of the campaign pages and microsites that have been created by our team.

SASS and JS are compiled and minified on save using Gulp. A live version can be published to Github Pages via Gulp `npm run gh-pages`. All of the essential Gulp tasks are pointed to in npm package scripts to refrain from forcing anyone to do a global install of Gulp.

This application requires A LOT of screenshots, so we have also written a Gulp task to handle grabbing all of those as well: `npm run screenshots`. Be sure to have ImageMagick installed before trying to run this.

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
