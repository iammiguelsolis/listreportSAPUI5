sap.ui.define(["sap/ui/core/mvc/Controller"], (BaseController) => {
    "use strict";

    return BaseController.extend("uppersap.com.crud.controller.App", {
        onInit() {
            console.log('Hello World, you are in App.view')
        },
    });
});
