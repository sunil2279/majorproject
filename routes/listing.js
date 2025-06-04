const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const multer  = require('multer');
const{storage} = require("../cloudConfig.js");
const upload = multer({ storage });

const { isLoggedIn, isOwner,validateListing } = require("../middleware.js");
const  listingController  = require("../controllers/listings.js");
const { override } = require("joi");


router.route("/")
.get(wrapAsync(listingController.index))   //index
.post(
    isLoggedIn,
    validateListing ,
    upload.single('listing[image][url]'),
    wrapAsync(listingController.createListing)
);                                                          //create route

//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get(wrapAsync(listingController.showListing))  //show route
.put(
    isLoggedIn,
    isOwner,validateListing ,
    upload.single('listing[image][url]'),
    
    wrapAsync(listingController.updateListing)
)//update
.delete(
    isLoggedIn,isOwner,
    wrapAsync(listingController.destroyListing)
); //delete

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,
    wrapAsync(listingController.renderEditForm));


module.exports = router;