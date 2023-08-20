const UserModel = require("../model/UserModel");

const userController ={
    userHome : (request,Response) =>{
        Response.send({
           status:true,
           message:"welcome to Home" 
        });
    },
    getUserlist : async (request, response) => {
        let { gender } =request.params;
       let result = await UserModel.find(
        { gender: { $regex: gender, $options: "i" } },
        {first_name:1,last_name:1,email:1, _id:0}
        ); 
        response.send({
         status:true,
         list : result,
    });
    },
    saveUserData :async (request, response) => {
       //client (postman) to server 
      // request.params
       let user = request.body;

      let saveData = {
        first_name: user.f_name,
        address: user.address,
        email  : user.email,
        mobile : user.mobile,
       password:user.password,
    };
    let result = await UserModel.findOne({ mobile: user.mobile });
    if (result) {
      response.send({
        call: false,
        message: "Given Mobile Number Exist",
      });
    } else {
      let newUser = new UserModel(saveData);
      await newUser.save(); /// insert data in
      response.send({
        call: true,
      });
    }
  },
UserLogin : async (request,response )=>{
    let { username, password } = request.body;
   let isUservalid = await UserModel.findOne(
    {
        mobile: username,
        password :password,
    },
      { password: 0 }
        );
      if (isUservalid) {
        response.send({
            call: true,
            user: isUservalid,
        });
       }else{
         response.send({
          call:false,
        });
       }
},

};

module.exports = userController;