const express = require('express')
const router = express.Router()
const auth = require("../middleware/auth");
const { getUsers, registerUser, loginUser, logoutUser, sayHello } = require('../controller/register');

router.get('/user', getUsers, async (req, res) => {
    
})

router.delete("/user/logout", auth, logoutUser, async (req, res) => {
    
})

router.post("/user", registerUser, async (req, res) => {
          
})

router.post("/user/authenticate", loginUser, async (req, res) => {
    
})

router.get("/token/validate", auth, sayHello, (req, res) => {
    
})

module.exports = router