sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("uppersap.com.wizard.controller.Main", {

        onInit: function () {
            this._oNavContainer = this.byId("wizardNavContainer");
            this._oWizardContentPage = this.byId("wizardContentPage");
            this._wizard = this.byId("CreateProductWizard"); 

            this._wizard.addStyleClass("sapUiResponsivePadding--header");
            this._wizard.addStyleClass("sapUiResponsivePadding--content");

            this._iniciarModelo();
        },

        _iniciarModelo: function () {
            this.model = new JSONModel();
            this.model.setData({
                productNameState: 'Error',
                productWeightState: 'Error',
                productType: "Mobile",
                availabilityType: "In Store",
                navApiEnabled: false,
                productVAT: false,
                measurement: "",
                productManufacturer: "n/a",
                productDescription: "n/a",
                size: "n/a",
                productPrice: "n/a",
                manufacturingDate: "n/a",
                discountGroup: "n/a"
            });
            this.getView().setModel(this.model);
        },

        onWizardNavigationChange: function (oEvent) {
            const oCurrentStep = oEvent.getParameter("step");
            const aSteps = this._wizard.getSteps();
            const iCurrentIndex = aSteps.indexOf(oCurrentStep);

            console.log("Volviendo al step:", iCurrentIndex + 1);

            this._handleBackToStep(iCurrentIndex);
        },

        _handleBackToStep: function (iStepIndex) {
            const aSteps = this._wizard.getSteps();
            const oCurrentStep = aSteps[iStepIndex];

            console.log("Invalidando pasos después del step:", iStepIndex + 1);

            this._wizard.discardProgress(oCurrentStep);

            for (let i = iStepIndex + 1; i < aSteps.length; i++) {
                this._wizard.invalidateStep(aSteps[i]);
            }

            this._resetFutureStepsData(iStepIndex);
        },

        _resetFutureStepsData: function (iStepIndex) {
            switch (iStepIndex) {
                case 0: // vuelve al paso 1
                    this.model.setProperty("/productName", "");
                    this.model.setProperty("/productWeight", "");
                case 1: // vuelve al paso 2
                    this.model.setProperty("/manufacturingDate", "n/a");
                    this.model.setProperty("/size", "n/a");
                case 2: // vuelve al paso 3
                    this.model.setProperty("/productPrice", "n/a");
                    this.model.setProperty("/discountGroup", "n/a");
                    this.model.setProperty("/productVAT", false);
                    break;
            }

            this.model.setProperty("/navApiEnabled", false);
        },

        // PASO 1
        setProductTypeFromSegmented: function (evt) {
            let productType = evt.getParameters().item.getText();
            this.model.setProperty("/productType", productType);
            this._wizard.validateStep(this.byId("ProductTypeStep"));
        },

        // PASO 2
        additionalInfoValidation: function () {
            this.limpiarVariables(); 

            let name = this.byId("ProductName").getValue();
            let weight = parseInt(this.byId("ProductWeight").getValue());
            
            if (isNaN(weight)) {
                this.model.setProperty("/productWeightState", "Error");
            } else {
                this.model.setProperty("/productWeightState", "None");
            }

            if (name.length < 6) {
                this.model.setProperty("/productNameState", "Error");
            } else {
                this.model.setProperty("/productNameState", "None");
            }

            if (name.length < 6 || isNaN(weight)) {
                this._wizard.invalidateStep(this.byId("ProductInfoStep"));
            } else {
                this._wizard.validateStep(this.byId("ProductInfoStep"));
            }
        },

        // PASO 3
        optionalStepActivation: function () {
            MessageToast.show('Paso opcional. Sin validaciones estrictas.');
            this.limpiarVariables();
        },

        // PASO 4
        pricingActivate: function () {
            this.model.setProperty("/navApiEnabled", true);
        },

        limpiarVariables: function () {
            this.model.setProperty("/navApiEnabled", false);
        },

        // NAVEGACIÓN A REVIEW
        wizardCompletedHandler: function () {
            let oReviewPage = this.byId("wizardReviewPage");
            this._oNavContainer.to(oReviewPage);
        },

        handleWizardCancel: function () {
            MessageBox.warning("¿Estás seguro de cancelar? Se perderán los datos.", {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                onClose: function (oAction) {
                    if (oAction === MessageBox.Action.YES) {
                        this._wizard.discardProgress(this._wizard.getSteps()[0]);
                        this._handleNavigationToStep(0);
                    }
                }.bind(this)
            });
        },

        handleWizardSubmit: function () {
            MessageBox.success("¡Reporte enviado con éxito! (Simulación)");
        },

        _handleNavigationToStep: function (iStepNumber) {
            let fnAfterNavigate = function () {
                this._wizard.goToStep(this._wizard.getSteps()[iStepNumber]);
                this._oNavContainer.detachAfterNavigate(fnAfterNavigate);
            }.bind(this);

            this._oNavContainer.attachAfterNavigate(fnAfterNavigate);
            
            this._oNavContainer.backToPage(this._oWizardContentPage.getId());
        },

        editStepOne: function () {
            this._handleNavigationToStep(0);
        },

        editStepTwo: function () {
            this._handleNavigationToStep(1);
        },
    });
});