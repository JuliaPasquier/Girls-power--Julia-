//Controller actions
module.exports.dashboard_get = (req, res) => {
    res.send("Dashboard Page");
};

module.exports.signup_get = (req, res) => {
    res.send("signup page");
};

module.exports.login_get = (req, res) => {
    res.send("login page");
};

module.exports.signup_post = (req, res) => {
    res.send("signup request sent");
};

module.exports.login_post = (req, res) => {
    res.send("login request sent");
};

module.exports.logout_get = (req, res) => {
    res.send("successfully logged out");
};

module.exports.profile_get = (req, res) => {
    res.send("profile page");
};

module.exports.create_get = (req, res) => {
    res.send("create offer page");
};

module.exports.create_post = (req, res) => {
    res.send("successfully added a new offer");
};

module.exports.update_put = (req, res) => {
    res.send("successfully updated offer");
};
