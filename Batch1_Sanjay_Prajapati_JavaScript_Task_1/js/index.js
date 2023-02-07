const childDivElement = document.getElementById("childDivElement").innerHTML;
// console.log(childDivElement);
let count = 1;

document.getElementById("minusBtn").disabled = true;

function addElement() {
  if (count < 10) {
    document.getElementById("divElement").innerHTML+=childDivElement;
    document.getElementById("minusBtn").disabled = false;
    count++;
    // console.log(count)
  } else {
    document.getElementById("limitShow").innerHTML = "limit over";
  }
}

function removeElement(currEle) {
  if (count <= 1) {
    document.getElementById("minusBtn").disabled = true;
  } else {
    document.getElementById("minusBtn").disabled = false;
    const findCurrent = document.getElementById(currEle);
    //   console.log(a.parentNode.parentNode.parentNode);
    findCurrent.parentNode.parentNode.remove();
    count--;
    // console.log(count)
  }
}
