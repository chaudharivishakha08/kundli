const express = require('express');
const { createUser, loginUser, logoutUser, checkAuth } = require('../controllers/user');
const { authorization } = require('../middleware/auth');
const userRouter = express.Router();

userRouter.post('/register',createUser);
userRouter.post('/login',loginUser);
userRouter.get('/logout', authorization, logoutUser);
userRouter.get('/check-auth', authorization, checkAuth);

module.exports = userRouter;
