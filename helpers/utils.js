const fs = require('fs')
const path = require('path')

const readRecursiveDirectory = (dir, filelist = ['']) => {
    try {
        let pathDir = path.join(process.cwd(), dir);
        let files = fs.readdirSync(pathDir);
        filelist = filelist.length ? filelist : [''];
        files.forEach((file) => {
            if (fs.statSync(path.join(pathDir, file)).isDirectory()) {
                filelist = readRecursiveDirectory(path.join(dir, file), filelist);
            } else {
                filelist.push(path.join(dir, file));
            }
        });
    } catch (e) {
        throw e;
    }
    return filelist;
};

let parseProduct = p => {
    return {
        ...(p.price && { price: parseFloat(p.price.toString()) }),
        brand: p.brand,
        title: p.title,
        image: p.image,
        ...(p.reviewScore && { reviewScore: parseFloat(p.reviewScore.toString()) }),
        _id: p._id
    };
}

module.exports.parseProduct = parseProduct
module.exports.readRecursiveDirectory = readRecursiveDirectory;