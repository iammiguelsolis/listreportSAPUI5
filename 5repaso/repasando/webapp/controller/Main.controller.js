sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
    "use strict";

    return Controller.extend("uppersap.com.repasando.controller.Main", {
        onInit() {

            var oDatos = {
                productos: [
                        {
                            "ProductID": "HT-1000",
                            "Name": "Notebook Basic 15",
                            "Description": "Notebook básico con excelente relación calidad-precio. Pantalla de 15 pulgadas, 8GB RAM.",
                            "Category": "Laptops",
                            "SupplierName": "Titanium Tech",
                            "Price": "956.00",
                            "CurrencyCode": "PEN",
                            "Status": "A",
                            "StatusText": "Disponible",
                            "WeightMeasure": 4.2,
                            "WeightUnit": "KG",
                            "Width": 30,
                            "Depth": 18,
                            "Height": 3,
                            "DimUnit": "CM",
                            "DateOfSale": "/Date(1704067200000)/",
                            "Rating": 4
                        },
                        {
                            "ProductID": "HT-1001",
                            "Name": "Notebook Basic 17",
                            "Description": "Versión ampliada con pantalla de 17 pulgadas y mayor batería. Ideal para estudiantes.",
                            "Category": "Laptops",
                            "SupplierName": "Titanium Tech",
                            "Price": "1249.00",
                            "CurrencyCode": "PEN",
                            "Status": "A",
                            "StatusText": "Disponible",
                            "WeightMeasure": 4.5,
                            "WeightUnit": "KG",
                            "Width": 32,
                            "Depth": 19,
                            "Height": 3,
                            "DimUnit": "CM",
                            "DateOfSale": "/Date(1704585600000)/",
                            "Rating": 3
                        },
                        {
                            "ProductID": "HT-1002",
                            "Name": "Ergo Mousepad",
                            "Description": "Almohadilla ergonómica con soporte de gel para muñeca.",
                            "Category": "Accesorios",
                            "SupplierName": "Office Confort",
                            "Price": "45.00",
                            "CurrencyCode": "PEN",
                            "Status": "B",
                            "StatusText": "Poco Stock",
                            "WeightMeasure": 0.2,
                            "WeightUnit": "KG",
                            "Width": 25,
                            "Depth": 22,
                            "Height": 1,
                            "DimUnit": "CM",
                            "DateOfSale": "/Date(1705190400000)/",
                            "Rating": 5
                        },
                        {
                            "ProductID": "HT-1003",
                            "Name": "Gaming Monitor 27",
                            "Description": "Monitor curvo 144Hz, ideal para desarrollo y gaming. Panel IPS.",
                            "Category": "Monitores",
                            "SupplierName": "Visual Master",
                            "Price": "1100.00",
                            "CurrencyCode": "PEN",
                            "Status": "A",
                            "StatusText": "Disponible",
                            "WeightMeasure": 5.8,
                            "WeightUnit": "KG",
                            "Width": 60,
                            "Depth": 15,
                            "Height": 45,
                            "DimUnit": "CM",
                            "DateOfSale": "/Date(1705795200000)/",
                            "Rating": 5
                        },
                        {
                            "ProductID": "HT-1007",
                            "Name": "Server Rack 4U",
                            "Description": "Case para servidor montaje en rack, ventilación optimizada.",
                            "Category": "Servidores",
                            "SupplierName": "Technocom",
                            "Price": "3500.00",
                            "CurrencyCode": "PEN",
                            "Status": "C",
                            "StatusText": "Agotado",
                            "WeightMeasure": 12.0,
                            "WeightUnit": "KG",
                            "Width": 50,
                            "Depth": 50,
                            "Height": 20,
                            "DimUnit": "CM",
                            "DateOfSale": "/Date(1706400000000)/",
                            "Rating": 2
                        },
                        {
                            "ProductID": "HT-1010",
                            "Name": "Teclado Mecánico RGB",
                            "Description": "Switches azules, retroiluminación configurable. Diseño compacto 60%.",
                            "Category": "Accesorios",
                            "SupplierName": "Titanium Tech",
                            "Price": "280.00",
                            "CurrencyCode": "PEN",
                            "Status": "A",
                            "StatusText": "Disponible",
                            "WeightMeasure": 0.9,
                            "WeightUnit": "KG",
                            "Width": 30,
                            "Depth": 10,
                            "Height": 4,
                            "DimUnit": "CM",
                            "DateOfSale": "/Date(1706918400000)/",
                            "Rating": 4
                        },
                        {
                            "ProductID": "HT-1020",
                            "Name": "Impresora Láser Pro",
                            "Description": "Impresión de alta velocidad, conexión WiFi y Ethernet. Toner incluido.",
                            "Category": "Impresoras",
                            "SupplierName": "Print Solutions",
                            "Price": "890.00",
                            "CurrencyCode": "PEN",
                            "Status": "B",
                            "StatusText": "Poco Stock",
                            "WeightMeasure": 6.5,
                            "WeightUnit": "KG",
                            "Width": 40,
                            "Depth": 35,
                            "Height": 25,
                            "DimUnit": "CM",
                            "DateOfSale": "/Date(1707523200000)/",
                            "Rating": 3
                        },
                        {
                            "ProductID": "HT-1021",
                            "Name": "Smartphone Dev X",
                            "Description": "Teléfono de prueba para desarrolladores móviles. Android stock.",
                            "Category": "Móviles",
                            "SupplierName": "Smart Devs",
                            "Price": "1500.00",
                            "CurrencyCode": "PEN",
                            "Status": "A",
                            "StatusText": "Disponible",
                            "WeightMeasure": 0.18,
                            "WeightUnit": "KG",
                            "Width": 7,
                            "Depth": 15,
                            "Height": 0.8,
                            "DimUnit": "CM",
                            "DateOfSale": "/Date(1708128000000)/",
                            "Rating": 5
                        },
                        {
                            "ProductID": "HT-1022",
                            "Name": "Webcam HD Pro",
                            "Description": "1080p 60fps, ideal para reuniones y streaming. Cancelación de ruido.",
                            "Category": "Accesorios",
                            "SupplierName": "Visual Master",
                            "Price": "320.00",
                            "CurrencyCode": "PEN",
                            "Status": "A",
                            "StatusText": "Disponible",
                            "WeightMeasure": 0.3,
                            "WeightUnit": "KG",
                            "Width": 10,
                            "Depth": 5,
                            "Height": 5,
                            "DimUnit": "CM",
                            "DateOfSale": "/Date(1708732800000)/",
                            "Rating": 4
                        },
                        {
                            "ProductID": "HT-1023",
                            "Name": "Switch Gestionable 24p",
                            "Description": "Switch de red Layer 2/3, 24 puertos Gigabit + 4 SFP.",
                            "Category": "Redes",
                            "SupplierName": "NetCore",
                            "Price": "2100.00",
                            "CurrencyCode": "PEN",
                            "Status": "C",
                            "StatusText": "Agotado",
                            "WeightMeasure": 3.0,
                            "WeightUnit": "KG",
                            "Width": 44,
                            "Depth": 25,
                            "Height": 4,
                            "DimUnit": "CM",
                            "DateOfSale": "/Date(1709337600000)/",
                            "Rating": 5
                        }
                    ]
            };
            var oModelo = new JSONModel(oDatos);
            this.getView().setModel(oModelo);

            MessageToast.show('Hellow World!')
        },

        alPresionar: function () {
            let oBoton = this.getView().byId('miBotonSupremo')
            console.log(oBoton)
            MessageToast.show(oBoton.getText())

            oBoton.setText('Me has pulsado')

            oBoton.setType('Accept')
        },

        onEscribiendo: function(oEvent) {
            let oInput = oEvent.getSource()

            if ( 'Miguel' === oInput.getValue() ) {
                oInput.setEnabled(false)
                MessageToast.show('Desactivado')
            }
        },

        onValidar: function(oEvent) {
            let oBoton = oEvent.getSource()

            if ( 'Alonso' === this.getView().byId('inputUsuario').getValue()) {
                oBoton.setType('Accept')
                MessageToast.show('Bienvenido')
            } else {
                oBoton.setType('Reject')
                MessageToast.show('Denegado')
            }
        },

        onVerificarModelo: function() {
            let oModelo = this.getView().getModel();

            let sNombre = oModelo.getProperty("/usuario/nombre");

            if (sNombre === "Alonso") {
                MessageToast.show("¡Eres tú!");
            } else {
                MessageToast.show("Nombre incorrecto: " + sNombre);
            }
        },

        onPress: function (oEvent) {
            var oItem = oEvent.getSource();
            
            var oBindingContext = oItem.getBindingContext();
            
            var sProductId = oBindingContext.getProperty("ProductID");

            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetail", {
                productId: sProductId
            });
        }

    });
});