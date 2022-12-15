var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define(["require","exports","esri/Color","esri/rest/support/Query","esri/views/MapView","esri/WebMap","esri/widgets/Locate","./popup"],function(e,t,o,u,r,n,i,p){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),o=__importDefault(o),u=__importDefault(u),r=__importDefault(r),n=__importDefault(n),i=__importDefault(i);var a,s=!0,l=[],c=new n.default({portalItem:{id:"048ee401e2d3486993ae0e70a316c395"}}),f=(c.when().then(function(){for(var e,t=[],o=decodeURI(window.location.search).substring(1).split("&"),r=0;r<o.length;r++)0<o[r].length&&(e=o[r].split("="),t.push({attribute:e[0],value:e[1]}));var n="1=1",i=(t.forEach(function(e){n=n+" AND ("+e.attribute+"='"+e.value+"')"}),c.layers.forEach(function(e){var t;"feature"===e.type?0<=(t=e).url.indexOf("Standort")?(t.definitionExpression=n,t.popupTemplate=p.popupTemplateStandort,console.log(t),l.push(t)):(t.popupTemplate=void 0,t.popupEnabled=!1,0<=t.url.indexOf("Regionen")&&(t.popupTemplate=p.popupTemplateRegionen,a=t)):"group"===e.type&&e.layers.forEach(function(e){0<=e.url.indexOf("Standort")?(e.definitionExpression=n,e.popupTemplate=p.popupTemplateStandort,l.push(e)):e.popupTemplate=void 0})}),new u.default);i.where=n,i.outFields=["*"],i.returnGeometry=!1,0<l.length&&null!=l[0]&&l[0].queryFeatures(i).then(function(e){e.features.forEach(function(t){var e;null!=t.attributes.Unterbereich&&((e=p.rubrikenForStandort.find(function(e){return e.id===t.attributes.Standort+"_"+t.attributes.Gesellschaft}))?(console.log("Already in List"),e.rubriken.indexOf(t.attributes.Unterbereich)<0&&e.rubriken.push(t.attributes.Unterbereich)):p.rubrikenForStandort.push({id:t.attributes.Standort+"_"+t.attributes.Gesellschaft,rubriken:[t.attributes.Unterbereich]}))})}).catch(function(e){console.error(e)})}),new r.default({container:"viewDiv",map:c})),t=(f.highlightOptions.color=new o.default("#1e1e1e"),new i.default({view:f}));f.ui.add(t,"top-left"),f.on("pointer-move",function(e){f.popup.open&&0<f.popup.featureCount&&f.popup.features[0].layer!==a||f.hitTest(e,{include:[a]}).then(function(e){0<e.results.length?"graphic"===e.results[0].type&&(0<f.popup.featureCount&&f.popup.features[0].attributes.objectid===e.results[0].graphic.attributes.objectid?f.popup.location=e.results[0].mapPoint:(f.popup.container.normalize(),f.popup.open({features:[e.results[0].graphic],location:e.results[0].mapPoint}))):f.popup.close()})}),f.popup.watch("selectedFeature",function(e){var t;e&&0<(t=e.getEffectivePopupTemplate()).actions.items.length&&(t.actions.items[0].visible=!!e.attributes.Standortdomaine)}),f.popup.on("trigger-action",function(e){e.action.id===p.actionID&&(e=f.popup.viewModel.selectedFeature.attributes.Standortdomaine)&&window.open(e.trim(),"_blank")}),f.popup.watch("features",function(e){var o;1<e.length&&(s?(o=[],e.forEach(function(t){o.find(function(e){return t.attributes.Standort+"_"+t.attributes.Gesellschaft==e.attributes.Standort+"_"+e.attributes.Gesellschaft})||o.push(t)}),s=!1,o.length<e.length&&(console.log(o),console.log(e)),f.popup.features=o):s=!0)})});