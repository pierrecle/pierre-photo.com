// Generate index.html, gm and handlebars installed by thumbsup

const Handlebars = require("handlebars");
const fs = require('fs');
const gm = require('gm');
const glob = require('glob');

const baseDir = fs.realpathSync(`${__dirname}/data/themes/2019`);
const baseOutDir = fs.realpathSync(`${__dirname}/data/website`);

const baseHelpers = glob.sync(`${__dirname}/node_modules/thumbsup/src/website/theme-base/helpers/**/*.js`);
baseHelpers.forEach(file => {
    const fileName = file.substring(file.lastIndexOf("/") + 1).replace('.js', '');
    if (fileName !== "relative") {
        Handlebars.registerHelper(fileName, require(file));
    }
});

const themePartials = glob.sync(`${baseDir}/partials/**/*.hbs`);
themePartials.forEach(file => {
    const fileName = file.substring(file.lastIndexOf("/") + 1).replace('.hbs', '');
    Handlebars.registerPartial(fileName, fs.readFileSync(file, { encoding: 'utf8' }));
});

const themeHelpers = glob.sync(`${baseDir}/helpers/**/*.js`);
themeHelpers.forEach(file => {
    const fileName = file.substring(file.lastIndexOf("/") + 1).replace('.js', '');
    Handlebars.registerHelper(fileName, require(file));
});


const gallery = require(`${__dirname}/data/thumbsup_config`);
const template = Handlebars.compile(fs.readFileSync(`${baseDir}/index.hbs`, { encoding: 'utf8' }));
fs.writeFileSync(`${baseOutDir}/index.html`, template({ gallery }), { encoding: 'utf8' });

gm(`${baseDir}/background.jpg`)
    .resize(2000, 2000)
    .noProfile()
    .write(`${baseOutDir}/background.jpg`, function (err) {
        if (!err) console.log('done');
    });