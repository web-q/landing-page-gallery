#Landing Page Wizard

The Landing Page Wizard is an application written for [HCA](http://hcahealthcare.com)'s Florida Division to showcase all of the campaign pages and microsites that we make. It is essentially a gallery with some filtering capability. It is built in [AngularJS](http://angularjs.org/), using [angular-seed](https://github.com/angular/angular-seed) as a quick start.

SASS and JS are compiled and minified on save using Gulp. A live version can be published to Github Pages via Gulp `npm run gh-pages`. All of the essential Gulp tasks are pointed to in package scripts to refrain from forcing anyone to do a global install of Gulp.

This application requires A LOT of screenshots, so we have also written a Gulp task to handle grabbing all of those as well: `npm run screenshots`. Be sure to have ImageMagick installed before running this.

##Todo
- [ ] move shortCode hashing into velocity/backend
- [ ] move templateTitle pushing into velocity/backend
- [x] fix ID sourcing (currently pulling hostID)
- [x] change template-id to templateId
- [x] clean up transitions
- [ ] build out see otherCampaigns
- [x] screenshots
- [x] snippet/comment gen tool
- [ ] pagination/endless scroll
- [ ] clean image loading (lazy loading?)

###Requirements
* Node/npm
* ImageMagick is required for `npm run screenshots`, but not necessary to run the site/application.

###Getting Set Up

If you'd like to check out the build at any time, simply fork/clone our repository.

```bash
git clone https://github.com/{USERNAME}/landing-page-wizard.git
cd landing-page-wizard
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
