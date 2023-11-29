var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('vehicle', { title: 'Search Results  vehicle' });
});
var express = require('express');
const vehicle_controlers= require('../controllers/vehicle');
var router = express.Router();
// A little function to check if we have an authorized user and continue on
//or
// redirect to login.
const secured = (req, res, next) => {
if (req.user){
return next();
}
res.redirect("/login");
}
/* GET vehicle */
router.get('/', vehicle_controlers.vehicle_view_all_Page );
/* GET detail vehicle page */
router.get('/detail', vehicle_controlers.vehicle_view_one_Page);
/* GET create vehicle page */
router.get('/create', secured, vehicle_controlers.vehicle_create_Page);
/* GET create update page */
router.get('/update', secured, vehicle_controlers.vehicle_update_Page);
/* GET delete vehicle page */
router.get('/delete', secured, vehicle_controlers.vehicle_delete_Page);

module.exports = router;