const express = require('express');
const router = express.Router();
const path = require('path');
const AuthController = require('../controllers/AuthController');
const ListingController = require('../controllers/ListingController');
const HomeController = require('../controllers/HomeController');
const verifyToken = require('../middlewares/verifyToken');
const checkLogin = require('../middlewares/checkLogin');
const passport = require('passport');

// Home //
router.get('/', checkLogin, HomeController.getHomePage);

// Sell //
router.get('/sell', verifyToken, checkLogin, ListingController.getSellPage);
router.post('/addcar', [verifyToken, ListingController.addcarlisting])

// Auth //
router.get('/auth', checkLogin, AuthController.getAuthPage);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/logout', checkLogin, AuthController.logout);

module.exports = router;
