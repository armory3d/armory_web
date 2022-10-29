# Development - Intro
* The [Armory3D](https://armory3d.org) website is hosted on [Github Pages](https://pages.github.com).
* [`make.js`](https://github.com/armory3d/armory_web/blob/main/make.js) is a [Node.js](https://nodejs.org/) script that:
  * Compiles webpages in [`/templates/`](https://github.com/armory3d/armory_web/tree/main/templates) and its sub-directories, both on init and when new changes are detected.
    * **Warning:** For Linux users, new changes are _not_ automatically detected for files in sub-folders. This is a Node.js limitation, officially stated [here](https://nodejs.org/docs/latest/api/fs.html#fs_caveats).
  * Compiling of release notes can sometimes be slow due to the large amount of changelog files needed to be compiled. If you don't need to compile release notes, change the `COMPILE_NOTES` variable in `make.js` to `false` to disable compiling of release notes. Don't forget to re-enable this variable when you're modifying existing release notes or creating new ones, otherwise changes won't be compiled.
  * Changes to the `make.js` script itself require any active instances of `make.js` terminals to be closed and restarted in order for changes to be updated.
  * Serves webpages via HTTP on port `80` (feel free to change it to a different port).
  * Sends 302 redirect if you attempt to access a webpage without inserting its `.html` extension.
  * Sends 404 if error or missing content occurs.
  * Standard for image & video formats:
    * Original formats for images should be `JPEG` or `PNG`.
    * Original formats for video should be `GIF` or `MP4`.
    * Conversion format should be `WebP` format for optimal web experiences.
    * Standard resolution for both images & videos should be of 1920x1080 screen resolution in original form for best quality before compression.
    * Convert images & videos to WebP format conversion using [ezgif](https://ezgif.com), a nifty online tool.
      * Using this tool, there should only be 4 steps - this may change in the future depending on the service.
        * **Step 1:** Choose the correct conversion process e.g. PNG -> WebP or GIF -> WebP.
          * **Warning:** Make sure you really choose the correct conversion type! Otherwise it won't work.
        * **Step 2:** Upload or state URL path to image or video.
        * **Step 3:** Resize your image or video using provided `Resize` service tools that should appear after format conversion.
        * **Step 4:** Choose resize size (`960x540` is current standard) and appropriate resize type to maintain a pleasing view.
      * Other usused/useful tools:
        * [TubeRipper](https://tuberipper.com).
        * [CloudConvert](https://cloudconvert.com/).
    * For retrieving or storing past files, see the Armory website archives [here](https://github.com/armoury3d).
    * Please use a dedicated JavaScript validator such as [JSHint](https://jshint.com) or [JSLint](https://jslint.com) to validate your JavaScript code to reduce potential errors.
# Development - Setup
* The Armory SDK ([armsdk](https://github.com/armory3d/armsdk)) ships with Node.js: no need to download it seperately.<br />
  * The Node.js executables can be found in your `armsdk/nodejs` directory.<br />
    * Use the right executable depending on your operating system (e.g. Windows, Linux, Apple).
* To run `make.js` with Node.js via the commandline:

**Windows** (proven code)
```bash
@echo off
SET PATH=node;"D:\Blender\armsdk\nodejs"
SET MAKE_DIR="D:\Websites\armory_web"
SET MAKE_SCRIPT="D:\Websites\armory_web\make.js"
cd %MAKE_DIR%
node %MAKE_SCRIPT%
```

**Linux & Mac** (untested code)
```bash
@set +v
EXPORT PATH="$node:D:\Blender\armsdk\nodejs"
EXPORT MAKE_DIR="D:\Websites\armory_web"
EXPORT MAKE_SCRIPT="D:\Websites\armory_web\make.js"
cd $MAKE_DIR
node $MAKE_SCRIPT
```
# Development - Process
## Compile - Main : Intro
* HTML files that reside in the parent, [`/armory_web/`](https://github.com/armory3d/armory_web) root directory are webpages meant to be hosted on Github Pages.
  * _**DO NOT**_ edit these HTML files.
    * Instead, modify their component counterparts that reside in the `/armory_web/templates` directory.
      * These webpage components are later on dynamically injected into their main counterparts using `make.js` and `Node.js`.
## Compile - Main : Header + %Main Content% + Footer
* Each webpage in the parent, `/armory_web/` root directory; except `header.html`, `footer.html` & `notes.html` is comprised of 3 separate webpage sections:
  * `header.html`, `%MAIN_CONTENT%`, `footer.html`.
    * `%MAIN_CONTENT%` can be any component, such as `community.html` or `download.html`.
### Compile - Examples:
**How to update Header content**
* Make changes to `/armory_web/templates/header.html`.
* Save.
* Run `make.js` if you haven't already.
* Refresh your Armory website page if you have it open.
**How to update Header content**
* Make changes to `/armory_web/templates/header.html`.
* Save.
* Run `make.js` if you haven't already.
* Refresh your Armory website page if you have it open.
**How to update Footer content**
* Make changes to `/armory_web/templates/header.html`.
* Save.
* Run `make.js` if you haven't already.
* Refresh your Armory website page if you have it open.
## Compile - Notes - Intro
* `notes.html` (release notes) is comprised of six components:
  * `/templates/header.html`
  * `/templates/notes.html`
  * `/templates/changelogs/content.html`
  * `/templates/changelogs/data.json`
  * `/templates/changelogs/releases/%MONTH_&_YEAR_CONTENT.html%`
  * `/templates/footer.html`
  * `README.md` (homepage download button)
### Compile - Examples:
**How to update Header or Footer content**
* Same setup, as described above.
**How to update Month/Year selection content**
* With: `/templates/notes.html`.
**How to update Monthly content**
* `/templates/changelogs/data.json` & `/templates/changelogs/releases/%MONTH_&_YEAR_CONTENT%.html`
  * Replace `%MONTH_&_YEAR_CONTENT` from the string above with the date of the webpage for that particular month + year.<br />
  e.g. `2022.01` or `2021.02`.