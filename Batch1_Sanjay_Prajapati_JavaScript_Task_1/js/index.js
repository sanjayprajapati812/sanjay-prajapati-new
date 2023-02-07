const childDivElement = document.getElementById("childDivElement").innerHTML;
let plusBtn = document.getElementById("plusBtn");

// console.log(childDivElement);
let count = 1;

document.getElementById("minusBtn").disabled = true;

function addElement() {
  if (count < 10) {
    document.getElementById("divElement").innerHTML += childDivElement;
    document.getElementById("minusBtn").disabled = false;
    count++;
    console.log(count)
  } else {
    document.getElementById("limitShow").innerHTML = "limit over";
    plusBtn.disabled = true;
  }
}

function removeElement(currEle) {
  document.getElementById("limitShow").innerHTML = "";
  if (count <= 1) {
    document.getElementById("minusBtn").disabled = true;
  } else {
    document.getElementById("minusBtn").disabled = false;
    plusBtn.disabled = false;
    currEle.parentNode.parentNode.remove();
    count-- ;
    console.log(count)
  }
}
