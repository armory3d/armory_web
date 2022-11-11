[website_armory3d]: https://armory3d.org
[website_github_pages]: https://pages.github.com
[website_pagespeed]: https://pagespeed.web.dev
[website_nodejs]: https://nodejs.org
[website_nodejs_docs]: https://nodejs.org/docs/latest/api/fs.html#fs_caveats
[website_tuberipper]: https://tuberipper.com
[file_community]: https://github.com/armory3d/armory_web/blob/main/templates/community.html
[file_content]: https://github.com/armory3d/armory_web/templates/changelogs/content.html
[file_data]: https://github.com/armory3d/armory_web/templates/changelogs/data.json
[file_download]: https://github.com/armory3d/armory_web/blob/main/templates/download.html
[file_footer]: https://github.com/armory3d/armory_web/blob/main/templates/footer.html
[file_header]: https://github.com/armory3d/armory_web/blob/main/templates/header.html
[file_index]: https://github.com/armory3d/armory_web/blob/main/templates/index.html
[file_makejs]: https://github.com/armory3d/armory_web/blob/main/make.js
[file_notes]: https://github.com/armory3d/armory_web/blob/main/templates/notes.html
[file_releases]: https://github.com/armory3d/armory_web/blob/main/templates/changelogs/releases
[directory_templates]: https://github.com/armory3d/armory_web/tree/main/templates
[directory_armory_archive]: https://github.com/armoury3d
[directory_armory_web]: https://github.com/armory3d/armory_web
[directory_armory_web_templates]: https://github.com/armory3d/armory_web/templates
[directory_armsdk]: https://github.com/armory3d/armsdk
[directory_cloudconvert]: https://cloudconvert.com
[directory_jshint]: https://jshint.com
[directory_jslint]: https://jslint.com
[directory_releases]: https://github.com/armory3d/armory_web/templates/changelogs/releases
[directory_tuberipper]: https://tuberipper.com
[directory_w3c_html]: https://validator.w3.org
[directory_w3c_css]: https://jigsaw.w3.org/css-validator
[directory_nodejs]: https://github.com/armory3d/nodejs_bin
# Development - introduction
## Hosting service
* The [Armory3D][website_armory3d] website is hosted on [Github Pages][website_github_pages].
* For local testing and previewing, a tailored [Node.js][website_nodejs] localhost [script][file_makejs] is provided.
## Development - setup
* [make.js][file_makejs] is a [Node.js][website_nodejs] script that:
  * Is a dedicated localhost, complete with custom handling for the website webpage links that have no extension type specified.
  * Compiles webpages in [/templates/][directory_templates] and its sub-directories, both on startup and when new changes are detected.
    * _**WARNING:**_ For Linux users, new changes are _not_ automatically detected for files in sub-folders. This is a [known][website_nodejs_docs] Node.js limitation.
* _**TIP:**_ [armsdk][directory_armsdk] ships with [Node.js][website_nodejs], so no need to download it separately.
    * The [Node.js][website_nodejs] executables can be found in your `armsdk/nodejs` directory.<br />
      * Your directory should look like [this][directory_nodejs].
        * Use the right executable depending on your operating system (e.g. Windows, Linux, Apple).
* To run [make.js][file_makejs] with [Node.js][website_nodejs] via the command-line, use these terminal commands:
### Windows (tested code)
```bash
@echo off
set PATH=node;"C:\Blender\armsdk\nodejs"
set MAKE_DIR="C:\Websites\armory_web"
set MAKE_SCRIPT="C:\Websites\armory_web\make.js"
cd %MAKE_DIR%
node %MAKE_SCRIPT%
```
### Linux & Mac (untested code)
```bash
@set +v
export PATH="$node:C:\Blender\armsdk\nodejs"
export MAKE_DIR="C:\Websites\armory_web"
export MAKE_SCRIPT="C:\Websites\armory_web\make.js"
cd $MAKE_DIR
node $MAKE_SCRIPT
```
* _**TIP:**_ It's recommended that you paste the above code into a runnable OS command-line script for quick and easy accessibility.
# Development - FAQ
## How to preview the webpages in a browser
* [make.js][file_makejs] by default serves webpages on port `80`.
  * _**TIP:**_ Feel free to modify the port variable to a different value.
## How to optimize compiling
* The compiling of release notes can sometimes be slow due to the large amount of changelog files needed to be compiled. If you don't need to compile release notes, change the `COMPILE_NOTES` variable in [make.js][file_makejs] to `false` to disable compiling of release notes.
  * _**NOTE:**_ Don't forget to re-enable this variable when you're modifying existing release notes or creating new ones, otherwise changes won't be detected or compiled.
## Compiling breaks after modifying make.js
* Changes to the [make.js][file_makejs] script itself require any active instances of [make.js][file_makejs] terminals to be closed and restarted in order for changes to be updated.
## make.js outputs "Error: listen EADDRINUSE :::80" error
* This is caused when the port is already in use. Either by another [make.js][file_makejs] terminal or by a different service, possibly being used in the background.
## Getting a 302 error
* [make.js][file_makejs] is known to send a 302 error if you attempt to access a webpage without inserting its `.html` extension and there is no redirect stated in the localhost.
## Getting a 404 error
* [make.js][file_makejs] is known to send a 404 if a URL is invalid, for instance if a webpage or file is missing.
# Development - asset creation
## Maintaining good quality
  * Original formats for static assets should be `JPEG` or `PNG`.
  * Original formats for animated assets should be `GIF` or `MP4`.
  * Standard resolution for both images & videos should be of `1920x1080` screen resolution in original form for best quality before compression.
## Maintaining optimal loading times
  * Final format should be `WebP` format for optimal web experiences.
  * Final format should be `WebP` or `WebM` format for optimal web experiences.
# Development - resources
* [PageSpeed][website_pagespeed] (good website analyzer: speed, tips, etc.)
* [Armory3D archive][directory_armory_archive] (original, missing, or unlisted asset content)
* [CloudConvert][directory_cloudconvert] (epic image/video format converter + editor).
* [TubeRipper][website_tuberipper] (Youtube ripper).
* [W3C - HTML][directory_w3c_html] (HTML validator)
* [W3C - CSS][directory_w3c_css] (CSS validator)
* [JSHint][directory_jshint] (JavaScript validator)
* [JSLint][directory_jslint] (JavaScript validator)
# Development - process
## Compiling - introduction
* The webpages that reside in the root [/armory_web/][directory_armory_web] directory are the webpages meant to be hosted, not the components.
  * _**WARNING:**_ Do not edit the non-component / host-only webpages.
    * Instead, modify the component counterparts that reside in the [/armory_web/templates/][directory_armory_web_templates] directory.
      * On save, the components are dynamically compiled into their host-able counterparts via [make.js][file_makejs] and [Node.js][website_nodejs].
## Compiling - components
* Basically the component structure (except for release notes) is: [header.html][file_header] + [main.html][file_community] (community component in this example) + [footer.html][file_footer] content.
* Each webpage in the root [/armory_web/][directory_armory_web] directory; except [header.html][file_header], [footer.html][file_footer] & [notes.html][file_notes] is comprised of three components sections:
  * [header][file_header] + `%main_content%` + [footer][file_footer].
    * `%main_content%` can be any unique component, such as [community.html][file_community] or [download.html][file_download].
## Compiling - examples
### How to modify header content
* Make changes to your [header.html][file_header] webpage.
* Save the changes.
* Run [make.js][file_makejs] if you don't already have an instance of it running.
* Refresh your browser if the old webpage is active to view the new changes.
### How to modify %main_content% content
* Make changes to your `%main_content%` webpage.
  * `%main_content%` can be any unique component, such as [community.html][file_community] or [download.html][file_download].
* Save the changes.
* Run [make.js][file_makejs] if you don't already have an instance of it running.
* Refresh your browser if the old webpage is active to view the new changes.
### How to modify footer content
* Make changes to your [footer.html][file_footer] webpage.
* Save the changes.
* Run [make.js][file_makejs] if you don't already have an instance of it running.
* Refresh your browser if the old webpage is active to view the new changes.
## Release notes - structure
* Release notes are comprised of six components:
  * [header.html][file_header] (header component)
  * [notes.html][file_notes] (notes component)
  * [content.html][file_content] (content section component)
  * [data.json][file_data] (template data)
  * [%monthly_content%][file_releases] (changelog component)
  * [index.html][file_index] (latest downloadable release)
  * [footer.html][file_footer] (footer component)
## Compiling - release notes
### How to modify homepage release date
* Modify the [index.html][file_index] page.
  * _**TIP:**_ The download button should be one of the first things you see in preview mode.
### How to modify header or footer content
* Same setup as described above for the other components.
### How to create new tabs and content sections
* With [notes.html][file_notes].
  * _**NOTE:**_ Don't forgot to modify the `INIT_DATE` variable to correctly set the date for the landing page of the release notes.
### How to modify content section template
* With [content.html][file_content].
  * _**WARNING:**_ You should only modify [content.html][file_content] if you need to change the template look for all release note pages, globally.
### How to create new content sections
* With [data.json][file_data] (template data).
* With one of the webpages in [/releases/][directory_releases] (changelog component).