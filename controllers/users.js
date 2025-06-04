const User = require("../models/user");

module.exports.signupform = (req ,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async (req ,res) => {
    try {
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const ragisterdUser =  await User.register(newUser , password);
        console.log(ragisterdUser);
        req.login(ragisterdUser,(err) => {
            if(err) {
                return next(err);
            }
            req.flash("success","welcome to wanderlust");
            res.redirect("/listings");
        });
    } catch (e) {
        req.flash("error" ,e.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req ,res ) => {
    res.render("users/login.ejs");
};

module.exports.login =  async(req ,res) => {
    req.flash("success" ,"Welcome back to Wanderlust! You are logged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err){
            return next(err);
        }
        req.flash("success" , "you are logged out!");
        res.redirect("/listings");
    });
};