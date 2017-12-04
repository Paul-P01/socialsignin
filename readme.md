# Social Signup Technical

A page designed to match the technical assessment requirements of building an RSS Feed Reader using HTML and CSS. 

## Overview

There is a live example of the page running here (http://socialsignin.powerloop.co.uk/rsa.html)

This running example is based on the BBC list of feeds and will add BBC Technology and BBC Sc-Tech if no other feeds are found in local storage.

## Outstanding

The page is 'somewhat' functional. It is possible to add and remove feeds and the page does to a certain level refresh. However the logic in the JS is not yet perfect in this and does add repeated feeds! Due to this same issue feeds are not instantly removed when they are removed from the feed list. Refreshing the page does resolve this.

There is an issue with the height of the boxes as the Masonry.js does not deal well with dynamic heights on the 'Grid-Items' it turns out. I am sure with some work and tweaking this could be resolved.

The Filter feature is not active yet.

## Lirarys Used

### Masonry.js (https://masonry.desandro.com/)

I have made use of the masonry.js library to create the Masonry style layout. I used this as it gived nice effects when feeds are added and also when the page is resized etc.. I felt that this was in keeping with the feel of the design. 

I did also consider using bootstrap to deliver the layout.

### date.js (http://www.datejs.com/)

DateJs is a handy library I have used to assist in the date format for speed!