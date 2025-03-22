import express from 'express'
import {signup,login,logout,updateProfile, checkAuth} from '../controllers/auth.controllers.js'// putting .js is necessay as i used import method instead of require and ''type is module'' in package.json file 
import {isLoggedIn} from '../middlewares/isLoggedIn.js'

const router= express.Router();

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.put('/update-profile',isLoggedIn, updateProfile)
router.get('/check',isLoggedIn, checkAuth)

export default router