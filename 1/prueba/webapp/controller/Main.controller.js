sap.ui.define(
    [
    "sap/m/MessageToast",
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
    ],
	function(MessageToast, Controller, JSONModel) {
	"use strict";


    function contador(oController,  isSuma) {
        let oModel = oController.getView().getModel('contadorModel')
        let isValorActual = oModel.getProperty('/contador')

        isSuma ? isValorActual++ : isValorActual--

        oModel.setProperty('/contador', isValorActual)

        MessageToast.show('Contador: ' + isValorActual)
    }

	return Controller.extend("com.uppersap.prueba.prueba.controller.Main", {

		
        onInit: function () {
            this._loadCharacters();
        },

        _loadCharacters: async function () {
            let oModel = this.getOwnerComponent().getModel("contadorModel") || this.getView().getModel("contadorModel");

            try {
                const response = await fetch("https://dragonball-api.com/api/characters");
                const data = await response.json();

                const aCharacters = data.items.map(item => ({
                    ...item,
                    expanded: false
                }));

                console.log(aCharacters)

                oModel.setProperty("/characters", aCharacters);
                MessageToast.show("Carga exitosa");
            } catch (error) {
                MessageToast.show("Error cargando personajes");
                console.error(error);
            }
        },

        onSumar: function() {
            contador(this, true)
        },

        onRestar: function() {
            contador(this, false)
        },

        onToggleDescription: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext("contadorModel");
            var sPath = oContext.getPath();

            var oModel = oContext.getModel();
            var bExpanded = oModel.getProperty(sPath + "/expanded");

            oModel.setProperty(sPath + "/expanded", !bExpanded);
        },

        
        onPress: function (evt) {
			MessageToast.show(evt.getSource().getId() + " Pressed");
		},

        onGoToIG: function () {
            window.open("https://www.instagram.com/uppersap.peru/", "_blank");
        },

        onSave: function() {
            MessageToast.show("Guardando...");
        },

        onCancel: function() {
            MessageToast.show('Cancel')
        },

        onEditTitle: function () {
            const componenteTitle = this.byId("pageTitle");
            const sCurrentText = componenteTitle.getText();

            if (sCurrentText === "Title") {
                componenteTitle.setText("Hola mundo");
            } else {
                componenteTitle.setText("Title");
            }
        }
	});

});
