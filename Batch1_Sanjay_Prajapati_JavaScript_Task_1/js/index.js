const childDivElement = document.getElementById("childDivElement").innerHTML;

// console.log(childDivElement);
let count = 1;

enaDisBtn();

function enaDisBtn() {
  let plusBtn = document.getElementById("plusBtn");
  let minusBtn = document.getElementById("minusBtn");
  if (count <= 1) {
    minusBtn.disabled = true;
  } else {
    minusBtn.disabled = false;
  }
  if (count >= 10) {
    plusBtn.disabled = true;
    document.getElementById("limitShow").innerHTML = "limit over";
  } else {
    plusBtn.disabled = false;
    document.getElementById("limitShow").innerHTML = "";
  }
}

function addElement() {
  const node = document.createElement("div");
  node.setAttribute("class","fadeinout");
  node.innerHTML = childDivElement;
  document.getElementById("divElement").appendChild(node);
  document.getElementById("minusBtn").disabled = false;
  count++;
  // console.log(count)
  enaDisBtn();
}

function removeElement(currEle) {
  currEle.parentNode.parentNode.parentNode.remove();
  count--;
  // console.log(count)
  enaDisBtn();
}

function reset() {
  if (document.getElementById("childDivElement")) {
    document.getElementById("divElement").innerHTML = "";
    document.getElementById("childDivElement").innerHTML = childDivElement;
  } else {
    document.getElementById("divElement").innerHTML =
      "<div>" + childDivElement + "</div>";
  }
  count = 1;
  enaDisBtn();
}
