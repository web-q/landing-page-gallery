#Landing Page Wizard

The Landing Page Wizard is an application written for [HCA](http://hcahealthcare.com)'s Florida Division to showcase all of the campaign pages and microsites that they/we make. It is essentially a gallery with some filtering capability. It is built in [AngularJS](http://angularjs.org/), using [angular-seed](https://github.com/angular/angular-seed) as a quick start. This is my first time using/learning AngularJS, and as such any suggestions/criticism/refactoring are welcome.

##Todo
* Move shortCode hashing into velocity
* Move templateTitle pushing into velocity
* Fix ID sourcing (currently pulling hostID)
* Change template-id to templateId
* Clean up transitions
* Build out see otherCampaigns
* BACKLOG screenshots and snippets
* snippet/comment gen tool
* pagination/endless scroll


##Build

###Requirements
* Node/npm

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

This will start a server that you can now view at: `http://localhost:3000/`.
