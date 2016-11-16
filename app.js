var imageDiff = require('image-diff');
var fs = require('fs');
var q = require('q');
var colors = require('colors');


// Create a return object for the compare function
var ReturnObject = function(image, results) {
    this.image = image;
    this.results = results;
}


// Get all images
var images = walk(__dirname + '/new');


// loop through found images and compare new and old directories
for (var i = 0; i <= images.length; i++) {
    if (isValid(images[i])) {
        compare(images[i]).then(function(results) {
            var color;

            if (results.results.percentage === 0) {
                color = 'green';
            } else if (results.results.percentage < .25) {
                color = 'yellow';
            } else {
                color = 'red';
            }

            console.log(results.image.bold + ' - ' + ((results.results.percentage * 100).toFixed(2) + '%')[color]);
        })
    }
}

function isValid(file) {
    return (file !== undefined &&
        fs.existsSync(__dirname + '/new' + file) &&
        fs.existsSync(__dirname + '/old' + file))
}


function compare(image) {
    var deferred = q.defer();

    imageDiff.getFullResult({
        actualImage: __dirname + '/new' + image,
        expectedImage: __dirname + '/old' + image
    }, function(err, result) {
        if (err) deferred.reject();

        var _return = new ReturnObject(image, result);

        deferred.resolve(_return);
    });

    return deferred.promise;
}


// Walk the file tree and find all .png files
function walk(dir) {
    var results = [],
        list = fs.readdirSync(dir);

    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.lastIndexOf(".png") > 0) {
                var parts = file.split(__dirname + '/new');
                results.push(parts[1]);
            }
        }
    })
    return results;
}