const MenuItemModel = require("../model/MenuItem");
const RestaurantModel = require("../model/RestaurantModel");

const RestaurantController = {
  getRestaurantListByLocation: async (request, response) => {
    let { loc_id } = request.params;
    let result = await RestaurantModel.find(
      { location_id: loc_id },
      {
        name: 1,
        locality: 1,
        image: 1,
        city: 1,
      }
    );
    response.send({
      call: true,
      result,
    });
  },
  getSingleRestaurantDetails: async (request, response) => {
    let { rest_id } = request.params;
    let result = await RestaurantModel.findOne({ _id: rest_id });
    response.send({
      call: true,
      result,
    });
  },
  getMenuItems: async (request, response) => {
    let { r_id } = request.params;
    let result = await MenuItemModel.find({ restaurantId: r_id });
    response.send({
      call: true,
      result,
    });
  },
  filter: async (request, response) => {
    try {
      const { sort, location, cuisine } = request.body;
  
      let filterData = {};
      if (location !== undefined) filterData["location_id"] = location;
      if (cuisine.length !== 0) filterData["cuisine_id"] = { $in: cuisine };
  
      const sortOption = {};
      if (sort === "asc") {
        sortOption.min_price = 1;
      } else if (sort === "desc") {
        sortOption.min_price = -1;
      }
  
      const result = await RestaurantModel.find(filterData).sort(sortOption);
  
      response.send({
        success: true,
        result,
      });
    } catch (error) {
      console.error("Error in filter:", error);
      response.status(500).send({ success: false, error: "Internal server error" });
    }
  },
  
  filterPrice: async (req, res) => {
    try {
      const { priceRange } = req.query;
  
      let minPrice, maxPrice;
      // Calculate min and max prices based on selected price range
      if (priceRange === "0-500") {
        minPrice = 0;
        maxPrice = 500;
      } else if (priceRange === "500-1000") {
        minPrice = 501;
        maxPrice = 1000;
      } else if (priceRange === "1000-1500") {
        minPrice = 1001;
        maxPrice = 1500;
      } else if (priceRange === "1500-2000") {
        minPrice = 1501;
        maxPrice = 2000;
      } else if (priceRange === "2000+") {
        minPrice = 2001;
        maxPrice = 5000;
      }
  
      const products = await RestaurantModel.find({
        min_price: { $gte: minPrice, $lte: maxPrice },
      });
      res.send({
        success: true,
        products,
      });
    } catch (error) {
      console.error("Error in filterPrice:", error);
      res.status(500).send({ success: false, error: "Internal server error" });
    }
  },
  

  Pagination: async (req, res) => {
    try {
      const { sort, location, cuisine, page, itemsPerPage } = req.body;
  
      let filterData = {};
      if (location !== undefined) filterData["location_id"] = location;
      if (cuisine.length !== 0) filterData["cuisine_id"] = { $in: cuisine };
  
      const sortOption = {};
      if (sort === "asc") {
        sortOption.min_price = 1;
      } else if (sort === "desc") {
        sortOption.min_price = -1;
      }
  
      const totalCount = await RestaurantModel.countDocuments(filterData);
      const totalPages = Math.ceil(totalCount / itemsPerPage);
  
      const skip = (page - 1) * itemsPerPage;
      const result = await RestaurantModel.find(filterData)
        .sort(sortOption)
        .skip(skip)
        .limit(itemsPerPage);
  
      res.send({
        success: true,
        result,
        page,
        totalPages,
      });
    } catch (error) {
      console.error("Error in Pagination:", error);
      res.status(500).send({ success: false, error: "Internal server error" });
    }
  },
  
  
}
  
module.exports = RestaurantController;
