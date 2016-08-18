# Intro
![](img/intro.jpg)

## What
Armory is a project aiming to integrate modern, real-time 3D engine into Blender, based on Cycles nodes.

3D game development is such a broad topic, it deserves to explore and discover new ways of creating. Of course chasing a feature list of the giants is a dead-end. If you are going to reinvent the wheel, don't make it rounder, change how it works instead, even at a risk of failing terribly!

Blender is a master piece of open-source with extremely active development. You can file a bug report and get it fixed in less than a day. The realtime / interactive content in general is a huge part that Blender could excel at but is lacking currently - many companies find a great use of realtime engines now. I want a viable open-source alternative on this front, that is all this project is about. There is no need to dominate the world as long as people using it enjoy it.

## Why

### New workflow

I loved the idea of common ground for a complete game authoring - from content creation to interactive game world building. Blender integration is the sole point of this thing, offering a unique workflow. There is a huge ecosystem around Blender, you can use existing add-ons to generate architecture and then turn it into interactive simulation straight from Blender, potentially with support for virtual reality. Edit / sculpt / paint the models without hassle. Adjust rigged mesh animation on the fly. Use terrain / trees / foliage generators for landscapes, animation creation helpers, texture bakers, LoD generators, geometry modifiers... You might easily write custom object generators using existing Blender API or any tools that might suit your project to speed you up. The possibilities are endless.
This is something that well established engines are seriously experimenting with too (ie. actively spending resources on it) - either by building integrated tools or by specialized plugins to create meshes in-engine. With that said, while Blender still is an essential tool for working with 3D game engines, in the future it may be getting more competition from game engines themself, at least for small-scale modelling.

### Unmatched portability

The engine needs to be able to run on desktops, consoles, mobile and web with no compromises. It needs to run on a platform announced tomorrow. The common approach is to tie the renderer to OpenGL/ES/WebGL. For games, this is disastrous choice today. There are lots of different graphics APIs now, in order to maximize portability and performance on each platform we need to take advantage of this. What if one of the major platforms decide to axe OpenGL in favor of Vulkan/Metal/D3D12 in the future? Refactoring these things in an existing code-bases not prepared for this is a huge and painful task.
The core of the engine has been developed will all this in mind, making it possible to add new targets/graphics APIs without rewriting existing code. There is already support for OpenGL/ES/WebGL, D3D9/11/12, Metal and Vulkan. The output to JavaScript is very straightforward making WebGL first-class citizen, preventing bloated file sizes and slow performance that regular engines compiled from C++ face.

### State of art renderer

One of the goals was clean, flexible and powerful render system. 3D graphics features are not an afterthought. You want to spend as little effort to achieve 'wow, you did that?' effect instead of 'it looks like poop!'. While there is still a horde of features to implement, the process is most of the time very straightforward.
A standard metalness PBR workflow is used, which makes it possible to easily exchange content with other game engines or import content from your favorite PBR enabled tools. There is nothing new to learn for game artists, which are already accustomed to this.
On top of that, you can render each scene with Cycles Render path-tracer too, since the materials are compatible with subset of regular cycles nodes.

### Open

The language, core, engine and tooling used are all open-source. It is easy to fork any part of it in case you need to. You may have noticed a huge usage of FBX today, a proprietary file format. A special care is placed to not fall short here and focus on open pipelines.

## How

### Technologic & Bold

The engine is built on Kha - the most exciting technology I ever discovered. It handles all the low-level hard work flawlessly, forming a rock solid base. There is a 'generational' graphics/audio API pattern, ensuring we always use the most relevant technology. It is completely self contained - there is no any sort of dependency hell. It goes even further by integrating a build system with project generators, powerful shader compiler, asset optimizer, IDE with full debugging support, ...

![](img/intro_ide.jpg)

Python is used to write Blender add-ons and it excels at doing so. For actual game logic, Haxe is used - a language at a level of C# or Java. This is the key to superior portability over purely native C++ engines or purely JS engines, while still maintaining good performance. We can still utilize C++ code for native targets, and JS for the web respectively. For visual programming a system of logic nodes is available.

### Independent

Engine tooling is purely add-on based - there is no special build of Blender required. This is all possible thanks to the very powerful scripting system. It is not dependant on the development cycle of Blender which makes engine development itself independent and flexible.

### Together

When you sum it up, the engine code itself is just a small part in a full view. Blender already offers a stunning editor with loads of features that can be leveraged and loads more in development. The low levels parts belonging to Kha are improving at very fast pace every day. The Haxe language itself is refining and adding new targets that can be used to conquer new platforms. When one part grows, the rest can grow with it. The goal is to live in harmony with these tools.
