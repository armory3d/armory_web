# Want to Contribute?

1. Fork [this](https://github.com/armory3d/armory_web) repository.

2. Commit new code to the forked repository.

3. Open a pull-request for the forked repository to propose changes:<br />
`armory_web repository [main branch]` ⬅️ `Forked repository [main branch]`

# Prerequisites

1. **Node**<br />
The [ArmSDK](https://github.com/armory3d/armsdk) ships with [Node](https://nodejs.org/en/) and can be found in:
`armsdk\nodejs`.

2. **Python**<br />
[Blender](https://blender.org) ships with [Python](https://python.org/) and can be found in:
`Blender\2.93\python\bin`.

3. **A Localhost that provides 403 & 404 redirecting**<br />
This [provided](https://github.com/rpaladin/armory_web_python_localhost) localhost service works well with the [armory_web](https://github.com/armory3d/armory_web) source setup. [Apache](https://apachelounge.com/download), [Node](https://nodejs.org/en/), and some other localhost software can accomplish the source setup, but you'll need to setup it up yourself.

# Development Process

* The [Armory3D](https://armory3d.org) website is hosted with `Github Pages`. The HTML files that reside in the `armory_web` directory are the webpages that are hosted. **DO NOT** edit these HTML files. Instead, modify the HTML files in `armory_web/templates` directory instead, then inject the new changes to their main counterparts.

* Each webpage in the `armory_web` directory is comprised of 3 separate webpage sections: `Header Content`, `Main Content`, `Footer Content`.

*  The `armory_web/templates` directory contains a HTML file for **each** template section, including the `Header` & `Footer` global webpages. **Use** these HTML files for implementing new changes, **NOT** the HTML files that reside in the `armory_web` directory.

* **Update** any new changes from the HTML files in the `armory_web/templates` directory to the `armory_web` directory by running the `make.js` script with **Node**.

## Example: How to update Header Content

To make changes for the `Header` section:

* Make changes to the `armory_web/templates/header.html` HTML file.
* Then run `make.js` with Node to update the new changes globally to all HTML files that reside in the `armory_web` directory.

## Example: How to update Main Content

To make changes for the `Community` section:

* Make changes to `armory_web/templates/community.html`
* Then run `make.js` with Node to update the new changes to the `community.html` HTML file that resides in the `armory_web` directory.

## Example: How to update Footer Content

To make changes for the `Footer` section:

* Make changes to the `armory_web/templates/footer.html` HTML file.
* Then run `make.js` with Node to update the new changes globally to all HTML files that reside in the `armory_web` directory.
