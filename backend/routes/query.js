const express = require('express');
const { createQuery, getQuery, getAllQueries, getUserQueries, changeStatus } = require('../controllers/query');
const { authorization } = require('../middleware/auth');
const queryRouter = express.Router();

queryRouter.post('/query', authorization, createQuery);
queryRouter.get('/query/:id', authorization, getQuery);
queryRouter.get('/queries', authorization, getAllQueries);
queryRouter.get('/user-queries', authorization, getUserQueries);
queryRouter.patch('/change-status', authorization, changeStatus);



 


module.exports = queryRouter;
