const express = require("express");
const router= express.Router();
const Authentication =require('../Authentication/auth');
const GalleryController = require('../Controllers/gallery');

router.post("/add",Authentication.adminFacultyAuth,GalleryController.addImage);
router.get("/get",GalleryController.getAllGallery);
router.delete("/delete/:id",Authentication.adminFacultyAuth,GalleryController.deleteImageById);




module.exports = router;
