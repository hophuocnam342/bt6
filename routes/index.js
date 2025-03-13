var express = require('express');
var router = express.Router();
var categoriesRouter = require('./categories');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/categories', categoriesRouter);

module.exports = router;
