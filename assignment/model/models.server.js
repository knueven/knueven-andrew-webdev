module.exports = function() {
    var model = {
        userModel : require("./user/user.model.server")(),
        websiteModel : require("./website/website.model.server")(),
        pageModel : require("./page/page.model.server")(),
        widgetModel : require("./widget/widget.model.server")()
        // mongojs : mongojs
    };

    return model;
};