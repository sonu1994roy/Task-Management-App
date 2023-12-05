// Create Token and saving in cookie
const jwt = require("jsonwebtoken");
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  // options for cookie
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true, // Set to true for HTTPS
    sameSite: 'none',
  };
  
  
  res.status(statusCode).cookie("token", token, options, (error) => {
    if (error) {
      console.error("Error setting token in the cookie:", error);
    }
  }).json({
    success: true,
    user,
    token,
  });
  


};


module.exports = {
  sendToken,
};


