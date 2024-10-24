[website_armory3d]: https://armory3d.org
[website_ezgif]: https://ezgif.com
[website_get_youtube_thumbnail]: https://www.get-youtube-thumbnail.com
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
[file_localhost]: https://github.com/armory3d/armory_web/blob/main/localhost.bat
[file_makejs]: https://github.com/armory3d/armory_web/blob/main/make.js
[file_notes]: https://github.com/armory3d/armory_web/blob/main/templates/notes.html
[file_releases]: https://github.com/armory3d/armory_web/blob/main/templates/changelogs/releases
[directory_templates]: https://github.com/armory3d/armory_web/tree/main/templates
[directory_armory_archive]: https://github.com/armoury3d
[directory_armory_web]: https://github.com/armory3d/armory_web
[directory_armory_web_templates]: https://github.com/armory3d/armory_web/templates
[directory_armsdk]: https://github.com/armory3d/armsdk
[directory_jshint]: https://jshint.com
[directory_jslint]: https://jslint.com
[directory_releases]: https://github.com/armory3d/armory_web/templates/changelogs/releases
[directory_tuberipper]: https://tuberipper.com
[directory_w3c_html]: https://validator.w3.org
[directory_w3c_css]: https://jigsaw.w3.org/css-validator
[directory_nodejs]: https://github.com/armory3d/nodejs_bin
# Introduction
* Simply run [localhost.bat][file_localhost] to start the local server to preview and auto-compile changes. **NOTE:** For computers that do no use Windows, the BAT script will need to be modified. OS compatible executables will also need to be downloaded separately for Node.js. You can download them [here][website_nodejs].
* Open a browser and enter `localhost:80` as the URL address.
  * **NOTE:** If port `80` is already being used by some other service, you change the port number in [make.js][file_makejs].
* Active webpages will still need to be refreshed with `F5`.
  * `NOTE:` In some cases, the page cache might also need to be cleared. You can do that using `Ctrl+F5` instead to refresh with cleared page cache.
# FAQ
## Error - Error: listen EADDRINUSE :::80
* [make.js][file_makejs] is known to cause this error when the port is already in use with another service. Feel free to change the port value in [make.js][file_makejs] to a different value.
## Error - 302
* [make.js][file_makejs] is known to send a 302 error if you attempt to access a webpage without inserting its `.html` extension and there is no redirect stated in the localhost.
## Getting a 404 error
* [make.js][file_makejs] is known to send a 404 if a URL is invalid, for instance if a webpage or file is missing.
## Compiling release notes is slow
* Compiling of release notes can sometimes be slow due to the large amount of files that needed to be compiled. If you do not need to compile release notes, you can set the `COMPILE_NOTES` variable in [make.js][file_makejs] to `false` to disable compiling of release notes.
  * **NOTE:** Do not forget to re-enable this variable when modifying the release notes source.
## Modifying make.js does not seem to update anything
* Changes to the [make.js][file_makejs] script itself require any active instances of [make.js][file_makejs] terminals to be closed and restarted in order for changes to be updated.
# Webpage Development
## Introduction
* The webpages that reside in the root [/armory_web/][directory_armory_web] directory are the webpages meant to be hosted, not the components.
  * **WARNING:** Do not edit the non-component / host-only webpages. Instead, modify the component counterparts that reside in the [/armory_web/templates/][directory_armory_web_templates] directory. On save, the components are dynamically compiled into their host-able counterparts via [make.js][file_makejs] and [Node.js][website_nodejs].
## Webpage components
* Basically the component structure (except for release notes) is: [header.html][file_header] + [main.html][file_community] (community component in this example) + [footer.html][file_footer] content. Each webpage in the root [/armory_web/][directory_armory_web] directory; except [header.html][file_header], [footer.html][file_footer] & [notes.html][file_notes] is comprised of three components sections: [header][file_header] + `%main_content%` + [footer][file_footer]. `%main_content%` can be any unique component, such as [community.html][file_community] or [download.html][file_download].
## Component examples
### Modifying header content
* Make changes to your [header.html][file_header] webpage.
* Save the changes.
* Run [make.js][file_makejs] if you do not already have an instance of it running.
* Refresh your browser if the old webpage is active to view the new changes.
### Modifying %main_content% content
* Make changes to your `%main_content%` webpage.
  * `%main_content%` can be any unique component, such as [community.html][file_community] or [download.html][file_download].
* Save the changes.
* Run [make.js][file_makejs] if you do not already have an instance of it running.
* Refresh your browser if the old webpage is active to view the new changes.
### Modifying footer content
* Make changes to your [footer.html][file_footer] webpage.
* Save the changes.
* Run [make.js][file_makejs] if you do not already have an instance of it running.
* Refresh your browser if the old webpage is active to view the new changes.
## Release notes structure
* Release notes are comprised of six components:
  * [header.html][file_header] (header component)
  * [notes.html][file_notes] (notes component)
  * [content.html][file_content] (content section component)
  * [data.json][file_data] (template data)
  * [%monthly_content%][file_releases] (changelog component)
  * [index.html][file_index] (latest downloadable release)
  * [footer.html][file_footer] (footer component)
## Modifying homepage (release date)
* Modify the [index.html][file_index] page.
  * **TIP:** The download button should be one of the first things you see in preview mode.
## Modifying header or footer content
* Same setup as described above for the other components.
## Modifying release notes (tabs and content sections)
* You can do this in [notes.html][file_notes].
  * **NOTE:** Do not forgot to modify the `initDate` variable to correctly set the date for the landing page of the release notes.
## Modifying content section component
* With [content.html][file_content].
  * **WARNING:** You should only modify [content.html][file_content] if you need to change the template look for all release note pages, globally.
## Modifying other content sections
* With [data.json][file_data] (template data).
* With one of the webpages in [/releases/][directory_releases] (changelog component).
# Asset Guidelines
## Best quality
  * Original formats for static assets should be `JPEG` or `PNG`.
  * Original formats for animated assets should be `GIF` or `MP4`.
  * Original resolution for both images and videos should be of `1920x1080` (or higher) screen resolution in original form for best quality before compression and resizing. `NOTE:` If assets are already at the required standard of `960x480`, no resizing will be needed. Compression may still need to be done however.
## Optimal loading times
 * Images in their final form should be of `JPEG` format.
 * Videos in their final form should be of `MP4` format.
    * `NOTE:` Videos should also be muted (no audio).
 * Final images or videos should be of resolution `960x480` for correct aspects and optimal loading times/
# Asset Resources
* [Ezgif][website_ezgif] (Multi-format image & video converter).
* [GetYouTubeThumbnail][website_get_youtube_thumbnail] (gets URL links for Youtube video thumbnails).
* [TubeRipper][website_tuberipper] (Youtube ripper).
* [Armory3D archive][directory_armory_archive] (original, missing, or unlisted/private asset content).
* [PageSpeed][website_pagespeed] (good website analyzer: speed, tips, etc.).
* [W3C - HTML][directory_w3c_html] (HTML validator).
* [W3C - CSS][directory_w3c_css] (CSS validator).
* [JSHint][directory_jshint] (JavaScript validator).
* [JSLint][directory_jslint] (JavaScript validator).