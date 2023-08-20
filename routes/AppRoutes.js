const AppRouter = require ("express").Router();
const userController =require("../controller/userController");
const LocationController =require('../controller/LocationController');
const RestaurantController = require("../controller/RestaurantController");
const MealTypeController = require("../controller/MealTypeController");
const PaymentController = require("../controller/PaymentController");


AppRouter.get('/', userController.userHome);
AppRouter.get("/get-user-list/:gender",userController.getUserlist);
AppRouter.get('/get-location-list', LocationController. getLocationList)
AppRouter.get(
    "/get-restaurant-list-by-loc-id/:loc_id",
    RestaurantController.getRestaurantListByLocation
);
AppRouter.get( "/get-mealtype-list", MealTypeController.getMealTypeList);
AppRouter.get(
    "/get-restaurant-details/:rest_id",
    RestaurantController.getSingleRestaurantDetails
  );
  AppRouter.get("/get-menu-item-list/:r_id", RestaurantController.getMenuItems)
  AppRouter.post("/filter", RestaurantController.filter);
  AppRouter.post("/filterPrice", RestaurantController.filterPrice);
AppRouter.get("/Pagination", RestaurantController.Pagination);

//save data=
AppRouter.post("/save-user-data",userController.saveUserData);
AppRouter.post("/login",userController.UserLogin);

 AppRouter.post("/create-order", PaymentController.createOrder);
 AppRouter.post("/verify-payment", PaymentController.verifyPayment);

module.exports =AppRouter;