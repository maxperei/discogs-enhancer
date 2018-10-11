# Discogs Enhancer

[![Chrome Web Store](https://img.shields.io/badge/users-2.3k-brightgreen.svg)](https://chrome.google.com/webstore/detail/discogs-enhancer/fljfmblajgejeicncojogelbkhbobejn)
[![Chrome Web Store](https://img.shields.io/badge/rating-4.9%2F5-brightgreen.svg)](https://chrome.google.com/webstore/detail/discogs-enhancer/fljfmblajgejeicncojogelbkhbobejn)
[![Chrome Web Store](https://img.shields.io/badge/rating%20count-52%20total-orange.svg)](https://chrome.google.com/webstore/detail/discogs-enhancer/fljfmblajgejeicncojogelbkhbobejn)
 ![License GPL 3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)

#### Project Overview

100% vanilla JS Chrome extension for Discogs.com.

<https://www.discogs-enhancer.com>

#### Chrome Webstore Link
<https://chrome.google.com/webstore/detail/discogs-enhancer/fljfmblajgejeicncojogelbkhbobejn>

## A Web Extension for Chrome

Discogs Enhancer adds extra features to both Discogs.com and Chrome. You can block sellers, use a dark theme, see price comparisons, get feedback notifications, convert foreign currencies, search Discogs and other online record shops with any highlighted text, improve tracklist readability, customize lots of Marketplace aspects, and more! Every feature is optional so you can choose the features you want to use.

### Features

* Block Sellers
* Favorite Sellers
* Compare Suggested Prices
* Contextual Menu Searching
* Quick Currency Converter
* Dark Theme
* Release Scanner
* Everlasting Collection
* Everlasting Marketplace
* Feedback Notifications
* Large BAOI Fields
* Tag Sellers Based on Reputation
* Filter Marketplace Items By Media Condition
* Filter Marketplace Items by Country
* Hide Min, Median, Max Columns
* Marketplace Highlights
* Marketplace Release Ratings
* Notes Counter
* Random Item From Collection
* Remove From Wantlist Shortcuts
* See Release Durations
* Sort Dialogs and Filters Alphabetically
* Text Formatting Shortcuts
* Improve Tracklist Readability

## Overview
![Discogs Enhancer flow overview](https://github.com/salcido/Discogs-Enhancer/blob/master/img/de-flow-overview.jpg "Discogs Enhancer flow overview")

***

#### Installation

* `git clone https://github.com/salcido/discogs-enhancer.git` (this repository)
* change into the new directory
* `npm install`

#### Running / Development

* Watch for changes:
  * `npm run watch`

#### Building
* Export the extension to `dist` directory:
  * `npm run build`
  * Go to `chrome://extensions` in a new Chrome tab
  * Click "Developer Mode" in the upper-right corner
  * Click "Load Unpacked" and choose the exported `dist` folder and you're done!

***

# Adding a feature

In order to add a simple, togglable feature to the extension, you'll need to update the files listed below. This guide assumes you've added a new `<feature>.js` file to `js/extension/features/` and that it does not require additional CSS files, configuration pages, or submenus. Features that require their own configuration pages or submenus are more complex and are out of scope for this guide. I plan on adding a more in-depth guide in the future.

## background.js

- Add a new property to the `prefs` object of `background.js`. It should be a `boolean` and have a unique name that easily identifies the feature. Make sure to add the property in the corrrect alphabetical position.

- Add a conditional check for the new `prefs` property under the `User Preferences` comment block. This should check the preference and create a DOM element that contains the necessary script files for the new feature.

#### Example:

```javascript
  if ( result.prefs.releaseRatings ) {

    let releaseRatings = document.createElement('script');

    releaseRatings.type = 'text/javascript';
    releaseRatings.src = chrome.extension.getURL('js/extension/features/release-ratings.js');
    releaseRatings.className = 'de-init';

    elems.push(releaseRatings);
  }
```

## popup.html

- Update `popup.html` with the new preference menu option. Make sure to update the markup with a unique `id`, help-bubble text, and meta keywords.

#### Example:

```html
    <!-- title of the new feature -->
    <div class="toggle-group">
      <p class="label">title of the new feature</p>
      <div class="meta hide">key words that represent the feature go here. These are used when using the search bar.</div>

      <div class="onoffswitch">
        <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="toggleNewFeatureName" checked>
        <label class="onoffswitch-label" for="toggleNewFeatureName">
          <span class="onoffswitch-inner"></span>
          <span class="onoffswitch-switch"></span>
        </label>
      </div>

      <div class="help">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-help-circle" color="#384047"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12" y2="17"></line></svg>
        <div class="help-bubble">
          <div class="help-text">
            A short description of the new feature goes here.
          </div>
          <div class="arrow-right stroke"></div><div class="arrow-right"></div>
        </div>
      </div> <!-- /.help -->
    </div>
  ```

## manifest.json and webpack.config.js

- Update `manifest.json` and `webpack.config.js` with the paths to the new feature files.

#### Example:

`manifest.json`

```JSON
  "js/extension/features/release-ratings.js",
```

`webpack.config.js`

```javascript
  [features + 'release-ratings']: `${features}release-ratings.js`,
```

## utils.js

- Update the `applySave` method in `utils.js` with the same property name used in `background.js`. Be sure to reference the `id` set in the `popup.html` markup.

#### Example:

```javscript
  releaseRatings: document.getElementById('toggleReleaseRatings').checked,
```

## popup.js

Make the following changes to `popup.js`:
- Update the `load` eventListener  with the new property.
- Add a new `change` eventListener under the `Event listeners for toggles` comment block.
- Update the `chrome.storage.sync.get` callback with the new property.

## learn.html

Add the feature description to `learn.html`. Make sure to insert the new markup block in the correct alphabetical order.

#### Example:

```HTML
    <div class="feature-block">
      <!-- Feature Name -->
      <h2 id="featureName">Feature Name</h2>

      <p>Supporting text describing how the feature works.</p>
      <!-- supporting image(s) if needed -->
      <img src="../img/learn/feature-image.png" class="max-width" />
    </div>
```

## Build The Extension

Since changes have been made to `webpack`, the extension will need to be rebuilt by running `npm run build`. Once the build is finished, load the extension in Chrome by going to `chrome://extensions`. Make sure `Developer Mode` is checked, then click 'Load unpacked' and choose the newly exported `dist` folder. You should now be able to enable the feature from the popup menu.

***

## Author

* **Matthew Salcido** - [salcido](https://github.com/salcido)

## License

This project is licensed under the GPL License - see the [LICENSE](LICENSE) file for details
