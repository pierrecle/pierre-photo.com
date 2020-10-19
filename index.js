// Generate index.html

const Handlebars = require("handlebars");
const fs = require('fs');
const gm = require('gm');

const baseDir = fs.realpathSync(`${__dirname}/data/themes/2019`);
const baseOutDir = fs.realpathSync(`${__dirname}/data/website`);

fs.readdirSync(`${baseDir}/partials`).forEach(file => {
    Handlebars.registerPartial(file.replace('.hbs', ''), fs.readFileSync(`${baseDir}/partials/${file}`,  {encoding: 'utf8'}));
});

fs.readdirSync(`${__dirname}/node_modules/thumbsup/src/website/theme-base/helpers`).forEach(file => {
    const jsFile = file.replace('.js', '');
    if(jsFile !== "relative") {
        Handlebars.registerHelper(jsFile, require(`${__dirname}/node_modules/thumbsup/src/website/theme-base/helpers/${jsFile}`));
    }
});


const gallery = require(`${__dirname}/data/thumbsup_config`);
const template = Handlebars.compile(fs.readFileSync(`${baseDir}/index.hbs`,  {encoding: 'utf8'}));
fs.writeFileSync(`${baseOutDir}/index.html`, template({gallery}), {encoding: 'utf8'});

gm(`${baseDir}/background.jpg`)
    .resize(2000, 2000)
    .noProfile()
    .write(`${baseOutDir}/background.jpg`, function (err) {
        if (!err) console.log('done');
    });