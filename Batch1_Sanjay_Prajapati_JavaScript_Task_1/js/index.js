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
  document.getElementById("divElement").innerHTML += childDivElement;
  document.getElementById("minusBtn").disabled = false;
  count++;
  console.log(count)
  enaDisBtn();
}

function removeElement(currEle) {
  currEle.parentNode.parentNode.remove();
  count--;
  console.log(count)
  enaDisBtn()
}
