import "../font/icofont.css";
import "../css/index.css";


function packFont() {
  const oEl = document.createElement("div");

  const oSpan = document.createElement("span");
  oSpan.className = "icofont icofont-gift-box lg-icon";

  oEl.appendChild(oSpan);

  return oEl;
}

document.body.appendChild(packFont());
