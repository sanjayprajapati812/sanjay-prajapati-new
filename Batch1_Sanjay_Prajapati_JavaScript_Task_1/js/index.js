const childDivElement = document.getElementById("childDivElement").innerHTML;

// console.log(childDivElement);
let count = 1;

enaDisBtn();

function enaDisBtn() {
  if (count <= 1) {
    document.getElementById("minusBtn").disabled = true;
  }
  if (count >= 10) {
    document.getElementById("plusBtn").disabled = true;
    document.getElementById("limitShow").innerHTML = "";
  }
}

function addElement() {
  document.getElementById("divElement").innerHTML += childDivElement;
  document.getElementById("minusBtn").disabled = false;
  count++;
  // console.log(count)
  enaDisBtn();
}

function removeElement(currEle) {
  document.getElementById("minusBtn").disabled = true;
  document.getElementById("minusBtn").disabled = false;
  currEle.parentNode.parentNode.remove();
  count--;
  // console.log(count)
  enaDisBtn()
}
