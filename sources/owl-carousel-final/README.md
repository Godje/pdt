# ready-to-go-frontend-kit #
## Kit to download and start your new project ##

  This kit was created to save your time, because it includes css and js libraries. So you don't have to go to internet and download all of them separately, you already have them:
  
* __CSS:__
  * [Animate.css](https://daneden.github.io/animate.css/) - Library of ready animations created by Daniel Eden
  * [Toast CSS Grid](http://daneden.github.io/Toast/) - Easy-to-tweak css grid, that I use everytime I need a grid layout.
  * [Colloro.sass](https://gist.github.com/ComePot/bb607218367f9575ee06#file-colloro-sass) - The color library I created myself, so you won't look for nice UI colors. That also saved me a lot of time.
  * [Normalize.css](https://necolas.github.io/normalize.css/) - Maybe one of the most useful things ever created for any web project. Normalize.css makes browsers render all elements more consistently and in line with modern standards. It precisely targets only the styles that need normalizing.
* __JS:__
  * [jQuery](https://jquery.com/) - The most popular JavaScript library.

###What stuff used here:####

* __SASS__ - as a powerfull CSS processor
* __JADE__ - powerfull HTML templating language
* __Nice managed__ - This kit is really easy to understand. All the files imported into Styles.sass that will compile every library and every line into one file.(Depends how you will manage your compiler. I used Prepros.io, since I am on Windows)


###Tree view:###

```
  Kit/
  | css/
  | | imp/
  | | | _animate.css //Animate css
  | | | _colloro.sass //Color library
  | | | _grid.scss //Responsive CSS grid
  | | | _normalize.css //Normalize.css
  | | parts/
  | | | global.sass //Just a starting file with default settings that I use
  | | styles.css //Compiled file
  | | styles.css.map
  | | styles.sass //The original SASS that imports other files from parts/ and imp/ directory. Made for simple SASS file managing.
  | js/
  | | main.js //Just an empty JS file that is linked in HTML file.
  | index.html //Compiled index.jade
  | index.jade //Jade file. The same index.html file but just a Jade language.
```

###Enjoy###
