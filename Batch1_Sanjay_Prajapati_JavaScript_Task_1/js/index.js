const childDivElement = document.getElementById("childDivElement").innerHTML;
// console.log(childDivElement);
let count = 1;

function addElement() {
  if (count < 10) {
    const elCreated = document.createElement(`div`);
    document.getElementById("divElement").appendChild(elCreated);
    elCreated.setAttribute("id", count);
    document.getElementById(count).innerHTML = childDivElement;
    count++;
  } else {
    document.getElementById("limitShow").innerHTML = "limit over";
  }
}

function removeElement(currEle) {
  if (count <= 1) {
    document.getElementById("minusBtn").disabled = true;
    count = count - 1;
  } else {
    document.getElementById("minusBtn").disabled = false;
    const findCurr = document.getElementById(currEle);
    //   console.log(a.parentNode.parentNode.parentNode);
    findCurr.parentNode.parentNode.parentNode.remove();
    count--;
  }
}
