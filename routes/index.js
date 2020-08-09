const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename);

// const files = require('.', false, /\.js$/)
const modules = {}
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        modules[file.split('.').slice(0, -1).join('.')] = require(path.join(__dirname, file));
    });

// console.log(modules)
module.exports = modules