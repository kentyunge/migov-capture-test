# migov-capture-test

#### Install Dependencies
```sh
$ brew install imagemagick
$ npm install capture -g
$ npm install
```

#### Configure Urls
Urls that you want to compare are found in the urls.json file.  Update it accordingly base on expected tests.


#### Run
```sh
$ ./diff.sh
```

#### Known Issues
* Currently, there is no way to set a delay so you may see screenshots that are not fully loaded causing problems with the comapre.
