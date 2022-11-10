var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "esri/Color", "esri/popup/content/CustomContent", "esri/PopupTemplate", "esri/rest/support/Query", "esri/support/actions/ActionButton", "esri/views/MapView", "esri/WebMap", "esri/widgets/Locate"], function (require, exports, Color_1, CustomContent_1, PopupTemplate_1, Query_1, ActionButton_1, MapView_1, WebMap_1, Locate_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Color_1 = __importDefault(Color_1);
    CustomContent_1 = __importDefault(CustomContent_1);
    PopupTemplate_1 = __importDefault(PopupTemplate_1);
    Query_1 = __importDefault(Query_1);
    ActionButton_1 = __importDefault(ActionButton_1);
    MapView_1 = __importDefault(MapView_1);
    WebMap_1 = __importDefault(WebMap_1);
    Locate_1 = __importDefault(Locate_1);
    var rubrikenForStandort = [];
    var checkPopupFeatures = true;
    // Popup Logo Bereich (gelb)
    var customContentLogo = new CustomContent_1.default({
        outFields: ["*"],
        creator: function (event) {
            var div = document.createElement("div");
            div.setAttribute("id", "popupLogoDiv");
            // Logo
            if (event.graphic.attributes.GP && event.graphic.attributes.GP === 'ja') {
                var image = document.createElement("img");
                image.src = "app/assets/GP-logo-schwarz.svg";
                // image.width = 80;
                image.height = 40;
                div.appendChild(image);
            }
            // Logo Text
            var divText = document.createElement("div");
            if (event.graphic.attributes.Logo) {
                divText.textContent = event.graphic.attributes.Logo;
            }
            else {
                divText.textContent = "DummyText";
            }
            div.appendChild(divText);
            // Link zum Unternehmen
            if (event.graphic.attributes.Unternehmensdomain) {
                var anchor = document.createElement('a');
                anchor.href = "https://" + event.graphic.attributes.Unternehmensdomain;
                anchor.innerText = 'Zum Unternehmen';
                anchor.setAttribute("id", "popupLogoDivLink");
                anchor.target = "_blank";
                div.appendChild(anchor);
            }
            return div;
        }
    });
    // Popup Inhalt Bereich (schwarz)
    var customContentAttributes = new CustomContent_1.default({
        outFields: ["*"],
        creator: function (event) {
            var div = document.createElement("div");
            div.setAttribute("id", "popupAttributesDiv");
            // Firmenname
            var divStandort = document.createElement("div");
            divStandort.setAttribute("id", "popupAttributesDivStandort");
            divStandort.textContent = event.graphic.attributes.Standort;
            div.appendChild(divStandort);
            // Adresse
            var divAddress = document.createElement("div");
            divAddress.setAttribute("id", "popupAttributesDivAdress");
            divAddress.innerHTML = event.graphic.attributes.so_strasse + "<br>" + event.graphic.attributes.so_plz + " " + event.graphic.attributes.so_ort;
            div.appendChild(divAddress);
            // Kontakt
            var divContactTel = document.createElement("div");
            divContactTel.className = "popupAttributesDivContact";
            var imagePhone = document.createElement("img");
            imagePhone.src = "app/assets/icon-telefon.svg";
            imagePhone.width = 16;
            imagePhone.height = 16;
            imagePhone.className = "popupAttributesContactChild";
            divContactTel.appendChild(imagePhone);
            var divTextTelefon = document.createElement("div");
            divTextTelefon.className = "popupAttributesContactChild";
            if (event.graphic.attributes.telefon) {
                divTextTelefon.textContent = event.graphic.attributes.telefon;
            }
            else {
                divTextTelefon.textContent = "0000";
            }
            divContactTel.onmouseover = function () {
                imagePhone.src = "app/assets/icon-telefon-grau.svg";
            };
            divContactTel.onmouseout = function () {
                imagePhone.src = "app/assets/icon-telefon.svg";
            };
            divContactTel.onclick = function () {
                window.open('tel:' + event.graphic.attributes.telefon, '_self');
            };
            divContactTel.appendChild(divTextTelefon);
            div.appendChild(divContactTel);
            var divContactMail = document.createElement("div");
            divContactMail.className = "popupAttributesDivContact";
            var imageMail = document.createElement("img");
            imageMail.src = "app/assets/icon-email.svg";
            imageMail.width = 16;
            imageMail.height = 16;
            imageMail.className = "popupAttributesContactChild";
            divContactMail.appendChild(imageMail);
            var divTextMail = document.createElement("div");
            divTextMail.className = "popupAttributesContactChild";
            if (event.graphic.attributes.mail) {
                divTextMail.textContent = event.graphic.attributes.mail;
            }
            else {
                divTextMail.textContent = "xxx@xxx.de";
            }
            divContactMail.appendChild(divTextMail);
            divContactMail.onmouseover = function () {
                imageMail.src = "app/assets/icon-email-grau.svg";
                ;
            };
            divContactMail.onmouseout = function () {
                imageMail.src = "app/assets/icon-email.svg";
                ;
            };
            divContactMail.onclick = function () {
                window.open('mailto:' + event.graphic.attributes.mail, '_self');
            };
            div.appendChild(divContactMail);
            // Rubriken
            var divRubriken = document.createElement("div");
            divRubriken.setAttribute("id", "popupAttributesDivRubriken");
            var divTextBereiche = document.createElement("div");
            divTextBereiche.textContent = "Alle Inhalte zum Thema";
            divRubriken.appendChild(divTextBereiche);
            var standorRubriken = rubrikenForStandort.find(function (element) { return element.id === event.graphic.attributes.Standort + "_" + event.graphic.attributes.Gesellschaft; });
            if (standorRubriken) {
                standorRubriken.rubriken.forEach(function (rubrik) {
                    var divRubrikButton1 = document.createElement("div");
                    divRubrikButton1.className = "popupRubrikenButton";
                    divRubrikButton1.textContent = rubrik;
                    divRubriken.appendChild(divRubrikButton1);
                });
                div.appendChild(divRubriken);
            }
            return div;
        }
    });
    // Action zum Öffnen der Standortseite
    var openStandortPageAction = {
        title: "Zum Standort",
        id: "open-standort-page",
        image: "app/assets/icon-externer-link-weiss.svg"
    };
    var popupTemplate = new PopupTemplate_1.default({
        content: [customContentLogo, customContentAttributes],
        overwriteActions: true,
        actions: [new ActionButton_1.default(openStandortPageAction)]
    });
    var regionenLayer;
    var webmap = new WebMap_1.default({
        portalItem: {
            id: "048ee401e2d3486993ae0e70a316c395" //TODO: ID auf Papenburg ID anpassen
        }
    });
    webmap.when().then(function () {
        var queryParams = [];
        var param;
        var params = decodeURI(window.location.search).substring(1).split("&");
        for (var index = 0; index < params.length; index++) {
            if (params[index].length > 0) {
                param = params[index].split('=');
                queryParams.push({
                    attribute: param[0],
                    value: param[1]
                });
            }
        }
        var defExpression = "1=1";
        queryParams.forEach(function (filterElement) {
            defExpression = defExpression + " AND (" + filterElement.attribute + "='" + filterElement.value + "')";
        });
        var standortLayers = [];
        webmap.layers.forEach(function (layer) {
            if (layer.type === "feature") {
                var featureLayer = layer;
                if (featureLayer.url.indexOf('Standort') >= 0) {
                    featureLayer.definitionExpression = defExpression;
                    featureLayer.popupTemplate = popupTemplate;
                    standortLayers.push(featureLayer);
                }
                else {
                    featureLayer.popupTemplate = undefined;
                    featureLayer.popupEnabled = false;
                    if (featureLayer.url.indexOf('Regionen') >= 0) {
                        // PopupTemplate für MouseOver
                        featureLayer.popupTemplate = new PopupTemplate_1.default({
                            content: "   {gebiet}",
                            overwriteActions: true,
                            actions: []
                        });
                        regionenLayer = featureLayer;
                    }
                }
            }
            else if (layer.type === "group") {
                layer.layers.forEach(function (subLayer) {
                    var featureLayer = subLayer;
                    if (featureLayer.url.indexOf('Standort') >= 0) {
                        featureLayer.definitionExpression = defExpression;
                        featureLayer.popupTemplate = popupTemplate;
                        standortLayers.push(featureLayer);
                    }
                    else {
                        featureLayer.popupTemplate = undefined;
                    }
                });
            }
        });
        // Rubriken für Popup abfragen und clustern
        var query = new Query_1.default();
        query.where = defExpression;
        query.outFields = ['*'];
        query.returnGeometry = false;
        standortLayers[2].queryFeatures(query).then(function (results) {
            results.features.forEach(function (standort) {
                var listStandort = rubrikenForStandort.find(function (element) { return element.id === standort.attributes.Standort + "_" + standort.attributes.Gesellschaft; });
                if (listStandort) {
                    console.log("Already in List");
                    listStandort.rubriken.push(standort.attributes.Unterbereich);
                }
                else {
                    rubrikenForStandort.push({
                        id: standort.attributes.Standort + "_" + standort.attributes.Gesellschaft,
                        rubriken: [standort.attributes.Unterbereich]
                    });
                }
            });
        }).catch(function (err) {
            console.error(err);
        });
    });
    var view = new MapView_1.default({
        container: "viewDiv",
        map: webmap
    });
    view.highlightOptions.color = new Color_1.default("#1e1e1e");
    var locate = new Locate_1.default({
        view: view
    });
    view.ui.add(locate, "top-left");
    // MouseOver für Regionen
    view.on('pointer-move', function (event) {
        if (view.popup.open && view.popup.featureCount > 0 && view.popup.features[0].sourceLayer !== regionenLayer) {
        }
        else {
            view.hitTest(event, { include: [regionenLayer] }).then(function (hitTestResult) {
                if (hitTestResult.results.length > 0) {
                    if (view.popup.featureCount > 0 && view.popup.features[0].attributes.objectid === hitTestResult.results[0].graphic.attributes.objectid) {
                        view.popup.location = hitTestResult.results[0].mapPoint;
                    }
                    else {
                        view.popup.container.normalize();
                        view.popup.open({
                            features: [hitTestResult.results[0].graphic],
                            location: hitTestResult.results[0].mapPoint
                        });
                    }
                }
                else {
                    view.popup.close();
                }
            });
        }
    });
    // Action ausblenden, wenn keine Standort-URL hinterlegt
    view.popup.watch("selectedFeature", function (graphic) {
        if (graphic) {
            console.log("selectedFeature", graphic);
            var graphicTemplate = graphic.getEffectivePopupTemplate();
            if (graphicTemplate.actions.items.length > 0) {
                graphicTemplate.actions.items[0].visible = graphic.attributes.Standortdomaine ? true : false;
            }
        }
    });
    // Mehrere Feature an einem Standort
    view.popup.watch("features", function (graphic) {
        if (graphic.length > 1) {
            if (checkPopupFeatures) {
                var newFeatures_1 = [];
                graphic.forEach(function (element) {
                    var standortGraphic = newFeatures_1.find(function (element2) { return element.attributes.Standort + "_" + element.attributes.Gesellschaft === element2.attributes.Standort + "_" + element2.attributes.Gesellschaft; });
                    if (!standortGraphic) {
                        newFeatures_1.push(element);
                    }
                });
                checkPopupFeatures = false;
                console.log(newFeatures_1);
                view.popup.features = newFeatures_1;
            }
            else {
                checkPopupFeatures = true;
            }
        }
    });
    // Standortseite öffnen
    view.popup.on("trigger-action", function (event) {
        // If the open-detail action is clicked
        if (event.action.id === "open-standort-page") {
            var url = view.popup.viewModel.selectedFeature.attributes.Standortdomaine;
            if (url) {
                window.open(url.trim(), "_blank");
            }
        }
    });
});
