sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel"
], function (Controller, MessageToast, MessageBox, Fragment, JSONModel) {

    "use strict";

    return Controller.extend("uppersap.com.crud.controller.Main", {

        onInit: function () {
            console.log("Hola, estás en el Main");
            this._sMode = "";
        },

        onCreate: function () {
            console.log('entrando a creando...')
            
            this._sMode = "Create";

            let oNewProductData = {
                ProductID: Math.floor(Math.random() * 1000),
                ProductName: "",
                Category: "",
                SupplierName: "",
                UnitPrice: 0.00,
                UnitsInStock: 0,
                Discontinued: false,
                CurrencyCode: "USD"
            };

            let oNewEntryModel = new JSONModel(oNewProductData);
            this.getView().setModel(oNewEntryModel, "newEntry");

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

        onEdit: function(oEvent) {
            
            this._sMode = "Edit";

            let oItem = oEvent.getSource();
            let oContext = oItem.getBindingContext("products");
            
            this._sPath = oContext.getPath(); 

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
            console.log('entrando a save general...')

            let oNewEntryModel = this.getView().getModel("newEntry");
            let oModifiedData = oNewEntryModel.getData();
            let oModelMain = this.getView().getModel("products");

            if (!oModifiedData.ProductName) {
                MessageToast.show("Por favor, escribe un nombre de producto");
                return;
            }

            if (this._sMode === "Create") {
                let oData = oModelMain.getData();
                oData.push(oModifiedData);
                oModelMain.refresh();
                MessageToast.show("Producto creado exitosamente");

            } else if (this._sMode === "Edit") {
                oModelMain.setProperty(this._sPath, oModifiedData);
                MessageToast.show("Producto actualizado");
            }

            this.onCancelCreate();
        },

        onCancelCreate: function () {
            this.pDialog.then(function (oDialog) {
                oDialog.close();
            });
        },

        onPress: function (oEvent) {
            let oItem = oEvent.getParameter("listItem");
            let oBindingContext = oItem.getBindingContext("products");
            
            let sProductId = oBindingContext.getProperty("ProductID");

            let oRouter = sap.ui.core.UIComponent.getRouterFor(this);

            console.log(sProductId)
            oRouter.navTo("RouteDetail", {
                productId: sProductId
            });
        },

        onDelete: function(oEvent) {
            let oItem = oEvent.getSource(); 
            let oContext = oItem.getBindingContext("products");
            
            let sPath = oContext.getPath();
            let iIndex = parseInt(sPath.split("/").pop());

            let oModel = this.getView().getModel("products");
            let oData = oModel.getData();
            
            oData.splice(iIndex, 1); 
            oModel.refresh(); 
            
            MessageToast.show("Producto eliminado");
        }

    });
});