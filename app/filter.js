define(["require","exports","./main"],function(e,t,u){"use strict";var o,a;function s(){var t=!0,e=document.querySelectorAll(".hauptBox"),c="Hauptsäule in (",e=(e&&0<e.length&&(e.forEach(function(e){e.checked?c=c+"'"+e.getAttribute("value")+"',":t=!1}),c+="'')"),document.querySelectorAll(".unterBox")),r="Unterbereich in (",n=(e&&0<e.length&&(e.forEach(function(e){e.checked?r=r+"'"+e.getAttribute("value")+"',":t=!1}),r+="'')"),"(Rubrik is NULL OR Rubrik NOT IN ("),e=document.querySelectorAll(".rubrikBox");e&&0<e.length&&e.forEach(function(e){e.checked||(n=n+"'"+e.getAttribute("value")+"',",t=!1)}),n+="''))",(0,u.setFilter)(c+" AND "+r+" AND "+n),(0,u.updateFilterIcon)(!t)}function r(e,c){var t,r,n,i=!0;e?(n=document.querySelectorAll(".hauptBox"))&&0<n.length?(n.forEach(function(e){e.getAttribute("value")===c?e.setAttribute("checked","true"):(e.setAttribute("checked","false"),i=!1)}),(t=document.querySelectorAll(".unterBox")).forEach(function(e){e.getAttribute("class")==="unterBox "+c?e.setAttribute("checked","true"):e.setAttribute("checked","false")}),(0,u.updateFilterIcon)(!i)):o=c:(t=document.querySelectorAll(".unterBox"))&&0<t.length?(r="",t.forEach(function(e){var t;e.getAttribute("value")===c?(e.setAttribute("checked","true"),t=e.getAttribute("class"),r=t.substring(t.indexOf(" ")+1)):(e.setAttribute("checked","false"),i=!1)}),(n=document.querySelectorAll(".hauptBox"))&&0<n.length&&n.forEach(function(e){e.getAttribute("value")===r?e.setAttribute("checked","true"):e.setAttribute("checked","false")}),(0,u.updateFilterIcon)(!i)):a=c}Object.defineProperty(t,"__esModule",{value:!0}),t.updateCheckBoxesForFilter=t.createFilterPanel=void 0,t.createFilterPanel=function(e,d){null===e&&((e=[]).push({id:"Bau + Projekte",unterbereiche:["Verkehrswegebau","Hochbau","Ingenieurbau","Erdbau"]}),e.push({id:"Technologie + Produkte",unterbereiche:["Betonwerke","Asphaltmischwerke","Galabeton","Maschinentechnik"]}),e.push({id:"Rohstoffe + Logistik",unterbereiche:["Logistik","Rohstoffe"]}),e.push({id:"Recycling + Verwertung",unterbereiche:["Deponien","Recycling + Verwertung"]})),null===d&&(d=[{id:"Rohstoffe",rubriken:["Naturstein","Baustoffrecycling"]}]);var t=document.getElementById("filterNode"),c=document.createElement("calcite-accordion");t.appendChild(c),e.forEach(function(a){var e=document.createElement("calcite-checkbox"),t=(e.id="hauptBox"+a.id,e.setAttribute("checked","true"),e.setAttribute("value",a.id),e.setAttribute("class","hauptBox"),e.setAttribute("id","hauptBox "+a.id),e.addEventListener("calciteCheckboxChange",function(e){for(var t=document.getElementsByClassName("unterBox "+a.id),c=0;c<t.length;c++){var r=t.item(c);e.target.checked?r.setAttribute("checked","true"):r.setAttribute("checked","false")}s()}),document.createElement("calcite-accordion-item")),e=(t.style.setProperty("--calcite-accordion-item-spacing-unit","0.25rem"),t.setAttribute("heading",a.id),e.setAttribute("slot","actions-start"),t.appendChild(e),c.appendChild(t),document.createElement("calcite-notice")),l=(e.style.setProperty("--calcite-notice-spacing-token-small","0rem"),e.setAttribute("open","true"),t.appendChild(e),document.createElement("div"));l.setAttribute("slot","message"),e.appendChild(l),a.unterbereiche.forEach(function(i){var e,t,c,r,n,u=document.createElement("calcite-label"),o=(u.setAttribute("layout","inline"),document.createElement("calcite-checkbox"));o.id="unterBox"+i,o.setAttribute("checked","true"),o.setAttribute("value",i),o.setAttribute("class","unterBox "+a.id),"Rohstoffe"===(u.innerText=i)?(e=d.find(function(e){return e.id===i}))&&(console.log("Rohstoffe"),t=document.createElement("calcite-accordion"),(c=document.createElement("calcite-accordion-item")).style.setProperty("--calcite-accordion-item-spacing-unit","0.25rem"),c.setAttribute("heading",i),o.setAttribute("slot","actions-start"),c.appendChild(o),t.appendChild(c),(r=document.createElement("calcite-notice")).style.setProperty("--calcite-notice-spacing-token-small","0rem"),r.setAttribute("open","true"),c.appendChild(r),(n=document.createElement("div")).setAttribute("slot","message"),r.appendChild(n),l.appendChild(t),o.addEventListener("calciteCheckboxChange",function(e){e.target.checked&&(t=document.getElementById("hauptBox "+a.id))&&!t.checked&&t.setAttribute("checked","true");for(var t,c=document.getElementsByClassName("rubrikBox "+i),r=0;r<c.length;r++){var n=c.item(r);e.target.checked?n.setAttribute("checked","true"):n.setAttribute("checked","false")}s()}),e.rubriken.forEach(function(e){var t=document.createElement("calcite-label"),c=(t.setAttribute("layout","inline"),document.createElement("calcite-checkbox"));c.id="rubrikBox_"+e,c.setAttribute("checked","true"),c.setAttribute("value",e),c.setAttribute("class","rubrikBox "+i),t.innerHTML=c.outerHTML+e,n.appendChild(t),document.getElementById("rubrikBox_"+e).addEventListener("calciteCheckboxChange",function(e){var t;e.target.checked&&(t=document.getElementById("unterBox"+i))&&!t.checked&&t.setAttribute("checked","true"),console.log(e),s()})})):(u.innerHTML=o.outerHTML+i,l.appendChild(u),document.getElementById("unterBox"+i).addEventListener("calciteCheckboxChange",function(e){e.target.checked&&(e=document.getElementById("hauptBox "+a.id))&&!e.checked&&e.setAttribute("checked","true"),s()}))})}),o&&r(!0,o),a&&r(!1,a)},t.updateCheckBoxesForFilter=r});