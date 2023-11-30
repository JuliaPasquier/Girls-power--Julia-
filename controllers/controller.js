//Controller actions
module.exports.dashboard_get = (req, res) => {
    res.render("index");
};

module.exports.signup_get = (req, res) => {
    res.render("register");
};

module.exports.login_get = (req, res) => {
    res.render("login");
};

module.exports.signup_post = (req, res) => {
    res.send("signup request sent");
};

module.exports.login_post = (req, res) => {
    res.send("login request sent");
};

module.exports.logout_get = (req, res) => {
    res.render("login");
};

module.exports.profile_get = (req, res) => {
    res.render("profile");
};

module.exports.create_get = (req, res) => {
    res.send("create-offer");
};

module.exports.create_post = (req, res) => {
    res.send("successfully added a new offer");
};

module.exports.edit_get = (req, res) => {
    res.render("update-offer");
};

module.exports.update_put = (req, res) => {
    res.send("successfully updated offer");
};
