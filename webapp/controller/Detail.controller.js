sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"
], function (Controller, History) {
    "use strict";

    return Controller.extend("uppersap.com.listreport.controller.Detail", {
        
        onInit: function () {
            // 1. Obtener el Router
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            
            // 2. Escuchar cuando alguien navega a la ruta "Detalle"
            oRouter.getRoute("Detalle").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            // 3. Obtener el ID que viene en la URL (ej: 14)
            var sObjectId = oEvent.getParameter("arguments").objectId;

            // 4. Buscar ese producto en el modelo "datos" que cargamos en el Main
            // Como mapeamos el array, necesitamos encontrar el índice o filtrar.
            // TRUCO: Como tu modelo es un JSON simple ahora, vamos a recorrerlo.
            
            var oModel = this.getOwnerComponent().getModel("datos");
            var aProducts = oModel.getProperty("/ProductCollection");
            var sPath = null;

            // Buscamos en qué posición del array está el producto con ese ID
            for (var i = 0; i < aProducts.length; i++) {
                if (aProducts[i].ProductId == sObjectId) {
                    sPath = "/ProductCollection/" + i; // Ej: "/ProductCollection/5"
                    break;
                }
            }

            // 5. "Atar" (Bind) la vista a ese producto específico
            if (sPath) {
                this.getView().bindElement({
                    path: sPath,
                    model: "datos"
                });
            }
        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteMain", {}, true);
            }
        }
    });
});