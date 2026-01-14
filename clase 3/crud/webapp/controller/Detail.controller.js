sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/ui/core/Fragment",       
    "sap/ui/model/json/JSONModel" 
], function (Controller, History, MessageToast, Fragment, JSONModel) {
    "use strict";

    return Controller.extend("uppersap.com.crud.controller.Detail", {

        onInit: function () {
            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            
            oRouter.getRoute("RouteDetail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            let sProductId = oEvent.getParameter("arguments").productId;
            
            let oModel = this.getView().getModel("products");
            let aProducts = oModel.getProperty("/");
            
            this._sPath = null; 

            for (let i = 0; i < aProducts.length; i++) {
                if (aProducts[i].ProductID.toString() === sProductId) {
                    this._sPath = "/" + i; 
                    break;
                }
            }

            if (this._sPath) {
                this.getView().bindElement({
                    path: this._sPath,
                    model: "products"
                });
            } else {
                MessageToast.show("Producto no encontrado");
            }
        },

        onNavBack: function () {
            let oHistory = History.getInstance();
            let sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                let oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteMain", {}, true);
            }
        },

        onDelete: function() {
            let oContext = this.getView().getBindingContext("products");
            
            console.log(oContext)

            let oModel = this.getView().getModel("products");
            let oData = oModel.getData();

            let sPath = oContext.getPath();
            let iIndex = parseInt(sPath.split("/").pop());

            oData.splice(iIndex, 1);

            oModel.refresh();

            MessageToast.show("Producto eliminado");

            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            oRouter.navTo("RouteMain", {}, true);
        },

        onEdit: function() {
            let oModel = this.getView().getModel("products");
            let oCurrentProduct = oModel.getProperty(this._sPath);
            let oClone = JSON.parse(JSON.stringify(oCurrentProduct));

            let oModelEdit = new JSONModel(oClone);
            this.getView().setModel(oModelEdit, "newEntry");

            if (!this.pDialog) {
                this.pDialog = Fragment.load({
                    id: this.getView().getId(),
                    name: "uppersap.com.crud.view.CreateDialog",
                    controller: this
                }).then(function (oDialog) {
                    this.getView().addDependent(oDialog);
                    return oDialog;
                }.bind(this));
            }
            this.pDialog.then(function (oDialog) {
                oDialog.open();
            });
        },
        onSaveCreate: function () {
            let oModelEdit = this.getView().getModel("newEntry");
            let oModifiedData = oModelEdit.getData();

            let oModelMain = this.getView().getModel("products");
            
            oModelMain.setProperty(this._sPath, oModifiedData);

            this.pDialog.then(function(oDialog) {
                oDialog.close();
            });
            
            MessageToast.show("Producto actualizado correctamente");
        },

        onCancelCreate: function () {
            this.pDialog.then(function(oDialog) {
                oDialog.close();
            });
        },

    });
});