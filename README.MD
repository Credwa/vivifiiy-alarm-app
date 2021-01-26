<h1 align="center">
  Vivifiiy Alarm App
</h1>

Vivifiiy Alarm is an app that change the way you wake up in the mornings. By connecting your favorite music app (such as spotify, apple music, etc.) AI selects the best songs and volume to wake you up to every morning automatically.

[Figma Wifeframes](https://www.figma.com/file/wsOFu181TlWluQF4NyBzUM/Wireframes?node-id=0%3A1)
[Figma Hi-fidelity mockups](https://www.figma.com/file/BbwtLoj5Dxcu61FFGXNkhh/Prototype?node-id=0%3A1)

[Play store](https://play.google.com/store/apps/details?id=com.credwa.vivifiiyalarmapp)
[App store](#)

## Mockups

![LofiMockups](https://github.com/Credwa/vivifiiy-alarm-app/blob/master/_static/lofi-mockup.PNG)
![HiFiMockups](https://github.com/Credwa/vivifiiy-alarm-app/blob/master/_static/hifi-mockup.PNG)

## Screenshots

![screenshots](https://github.com/Credwa/vivifiiy-alarm-app/blob/master/_static/viv-screenshots.jpg)

**Table of Contents**

- [Install](#Install)
- [Build](#Build)
- [Development](#Development)
- [Testing](#Testing)
- [What's Inside](#Inside)

<a name="Install"></a>

## [Install](id:Install)

    $ git clone git@github.com:Credwa/vivifiiy-alarm-app.git
    $ cd vivifiiy-alarm-app
    $ yarn install

<a name="Development"></a>

## [Development](id:Development)

Download and install [Android Studio](https://developer.android.com/studio)
If you're on a Mac also Download and install [XCode](https://developer.apple.com/xcode/)
These are needed to run the platform specific simulators.
You can download the expo mobile app also see [expo docs](https://docs.expo.io/)

Run the command below to start development and follow instructions detailed in command line for more information

\$ yarn start

<a name="Build"></a>

## [Build](id:Build)

[Follow instructions here for building apps](https://docs.expo.io/distribution/building-standalone-apps/)

<a name="Testing"></a>

## [Testing](id:Testing)

[Jest](https://jestjs.io/) is used for our testing needs read docs to learn more.

    Run the command below to run watcher for tests

    $ yarn test

<a name="Inside"></a>

## 🧐 What's inside?

A quick look at the top-level files and directories you'll see.

    .
    ├── node_modules
    ├── src
    ├── .gitignore
    ├── .prettierrc.json
    ├── .vscode
    ├── package-lock.json
    ├── package.json
    ├── README.md
    ├── tests
    ├── tsconfig.json
    ├── assets
    ├── .expo
    ├── .expo-shared
    └── yarn.lock

1.  _`/node_modules`_: This directory contains all of the modules of code that your project depends on (npm packages) are automatically installed.

2.  _`/src`_: This directory will contain all of the code related to what you will see on the front-end of the react native app. `src` is a convention for “source code”.

3.  _`.gitignore`_: This file tells git which files it should not track / not maintain a version history for.

4.  _`.prettierrc.json`_: This is a configuration file for [Prettier](https://prettier.io/). Prettier is a tool to help keep the formatting of your code consistent.

5.  _`/.vscode`_: Vistual Studio Code is the recommended code editor for this repo. This contains vscode specific settings

6.  _`package-lock.json`_ (See `package.json` below, first). This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. _(You won’t change this file directly)._

7.  _`package.json`_: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for your project.

8.  _`README.md`_: A text file containing useful reference information about your project.

9.  _`/tests`_: All your unit tests will go in here. Please write unit tests!

10. _`tsconfig.json`_: Configuration file for typescript.

11. _`babel.config.js`_: Configuration file for babel.

12. _`/assets`_: Assets for the project. Images, Icons, Fonts go here.

13. _`/.expo`_: Generated expo files.

14. _`/.expo-shared`_: More generated expo files...

15. _`App.tsx`_: Entry point for the application. Think index.js file.

16. _`app.json`_: Expo configuration file.

17. _`yarn.lock`_: This is an automatically generated file based on the exact versions of your npm dependencies that were installed for your project. _(You won’t change this file directly)._
