const multer = require('multer')

module.exports = {
    uploadService(file){
        multer({storage: multer.memoryStorage(), limits: {fileSize: 1000 * 1000 * 12}})
    } 
}