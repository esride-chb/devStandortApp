var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};define(["require","exports","esri/Color","esri/rest/support/Query","esri/views/MapView","esri/WebMap","esri/widgets/Locate","./popup","esri/widgets/Legend","esri/widgets/Expand"],function(e,t,n,u,r,o,i,a,p,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n=__importDefault(n),u=__importDefault(u),r=__importDefault(r),o=__importDefault(o),i=__importDefault(i),p=__importDefault(p),l=__importDefault(l);var s,c=!0,f=[],d=new o.default({portalItem:{id:"806fdc764d974febab2a843eca912dab"}}),h=(d.when().then(function(){for(var e,t=[],n=decodeURI(window.location.search).substring(1).split("&"),r=0;r<n.length;r++)0<n[r].length&&(e=n[r].split("="),t.push({attribute:e[0],value:e[1]}));var o="1=1",i=(t.forEach(function(e){o=o+" AND ("+e.attribute+"='"+e.value+"')"}),d.layers.forEach(function(e){var t;"feature"===e.type?0<=(t=e).url.indexOf("Standort")?(t.definitionExpression=o,t.popupTemplate=a.popupTemplateStandort,console.log(t),f.push(t)):(t.popupTemplate=void 0,t.popupEnabled=!1,0<=t.url.indexOf("Regionen")&&(t.popupTemplate=a.popupTemplateRegionen,s=t)):"group"===e.type&&e.layers.forEach(function(e){0<=e.url.indexOf("Standort")?(e.definitionExpression=o,e.popupTemplate=a.popupTemplateStandort,f.push(e)):e.popupTemplate=void 0})}),console.log(s),console.log(f),new u.default),i=(i.where=o,i.outFields=["*"],i.returnGeometry=!1,0<f.length&&null!=f[0]&&(f[0].queryFeatures(i).then(function(e){e.features.forEach(function(t){var e;null!=t.attributes.Unterbereich&&((e=a.rubrikenForStandort.find(function(e){return e.id===t.attributes.Standort+"_"+t.attributes.Gesellschaft}))?(console.log("Already in List"),e.rubriken.indexOf(t.attributes.Unterbereich)<0&&e.rubriken.push(t.attributes.Unterbereich)):a.rubrikenForStandort.push({id:t.attributes.Standort+"_"+t.attributes.Gesellschaft,rubriken:[t.attributes.Unterbereich]}))})}).catch(function(e){console.error("Error query Rubriken",e)}),f[0].queryExtent(i).then(function(e){null!=e&&null!=e.extent&&(h.extent=e.extent)}).catch(function(e){console.error("Error QueryExtent",e)})),f.map(function(e){return{layer:e}})),i=new p.default({view:h,layerInfos:i}),i=new l.default({view:h,content:i,expandIconClass:"esri-icon-legend"});h.ui.add(i,"top-left")}),new r.default({container:"viewDiv",map:d})),t=(h.highlightOptions.color=new n.default("#1e1e1e"),new i.default({view:h}));h.ui.add(t,"top-left"),h.on("pointer-move",function(e){h.popup.open&&0<h.popup.featureCount&&h.popup.features[0].layer!==s||h.hitTest(e,{include:[s]}).then(function(e){0<e.results.length?"graphic"===e.results[0].type&&(0<h.popup.featureCount&&h.popup.features[0].attributes.objectid===e.results[0].graphic.attributes.objectid?h.popup.location=e.results[0].mapPoint:(h.popup.container.normalize(),h.popup.open({features:[e.results[0].graphic],location:e.results[0].mapPoint}))):h.popup.close()})}),h.popup.watch("selectedFeature",function(e){var t;e&&0<(t=e.getEffectivePopupTemplate()).actions.items.length&&(t.actions.items[0].visible=!!e.attributes.Standortdomaine)}),h.popup.on("trigger-action",function(e){e.action.id===a.actionID&&(e=h.popup.viewModel.selectedFeature.attributes.Standortdomaine)&&window.open(e.trim(),"_blank")}),h.popup.watch("features",function(e){var n;1<e.length&&(c?(n=[],e.forEach(function(t){n.find(function(e){return t.attributes.Standort+"_"+t.attributes.Gesellschaft==e.attributes.Standort+"_"+e.attributes.Gesellschaft})||n.push(t)}),c=!1,n.length<e.length&&(console.log(n),console.log(e)),h.popup.features=n):c=!0)})});