module.exports = function (app) {
    // load index page
    app.get("/", function (req, res) {
        res.render("index");
    });

    app.get("/about", function (req, res) {
        res.render("about");
    });

    app.get("/work", function (req, res) {
        res.render("work");
    });    

    app.get("/contact", function (req, res) {
        res.render("contact");
    });    
};