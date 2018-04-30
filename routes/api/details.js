var path = require("path");
var db = require("../../models")
var multer = require('multer');
const uuidv4 = require('uuid/v4');
const usersController = require("../../controllers/usersController");

// File Upload
// configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
      */
      cb(null, './client/build/uploads');
    },
    filename: (req, file, cb) => {
      /*
        uuidv4() will generate a random ID that we'll use for the
        new filename. We use path.extname() to get
        the extension from the original file name and add that to the new
        generated ID. These combined will create the file name used
        to save the file on the server and will be available as
        req.file.pathname in the router handler.
      */
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
});
// create the multer instance that will be used to upload/save the file
const upload = multer({ storage });
  
module.exports = function (app) {
    app.put('/save', upload.single('selectedFile'), (req, res) => {

      let filePath = req.file.path.split("client/build/")
      console.log(filePath)
      let detailsData = {
        name: req.body.name,
        description: req.body.description,
        image: filePath[1]
      }
      // console.log(req.body.token)
      // console.log(req.body)

        db.User.findOneAndUpdate(
          { token: req.body.token, "cities.location": req.body.location}, 
          { $push: {
            "cities.$.details": detailsData
            }
          }
        )
        .then(function(dbDetail) {
          console.log("dbDetail",dbDetail)
        })
        
        /*
        We now have a new req.file object here. At this point the file has been saved
        and the req.file.filename value will be the name returned by the
        filename() function defined in the diskStorage configuration. Other form fields
        are available here in req.body.
        */
        res.send();
    });
}
  
  //END File Upload