# AngularJS-techscan
Simple AngularJS with two screens

# Features
* SASS support including sourceMaps
* Minimal CSS styling of the view
* Gulp watch, build and local server tasks
* Responsive navigation
* queryService $http wrapper to handle calls
* clear folder structure
* less than 10 request in build version
* minified CSS and JS build files
* google analytics snippet

## 1. Setup
node version: 6.10.2

```bash
npm install
```
- install all npm and bower dependencies

**Note:** If `npm install` fails during dependency installation it will be likely caused by `gulp-imagemin`. In that case remove `gulp-imagemin` dependency from `package.json`, run `npm install` again and then install `gulp-imagemin` separately with following command: `npm install gulp-imagemin --save-dev`

## 2. Watch files
```bash
npm start
```
or
```bash
gulp
```

- all SCSS/HTML will be watched for changes and injected into browser thanks to BrowserSync

## 3. Build production version
```bash
npm run build
```
or
```bash
gulp build
```
- this will process following tasks:
* clean _build folder
* compile SASS files, minify and uncss compiled css
* copy and optimize images
* minify and copy all HTML files into $templateCache
* build index.html
* minify and copy all JS files
* copy fonts
* show build folder size

## 4. Start webserver without watch task
```bash
npm run server
```
or
```bash
gulp server
```

## 5. Start webserver from build folder
```bash
npm run serverbuild
```
or
```bash
gulp server-build
```

pending:
1: UT
2: E2E