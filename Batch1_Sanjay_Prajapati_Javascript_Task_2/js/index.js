const inputDataTable = document.querySelector("#inputDataTable");
const nodeInput = inputDataTable.rows[1].innerHTML;
var count = 0;
var regName = /^[a-zA-Z ]*$/;

var validate = false;

function addNewRow() {
  const node = document.createElement("tr");
  node.innerHTML = nodeInput;
  node.cells[5].childNodes[0].setAttribute("class", "btn btn-danger d-block");
  node.cells[5].childNodes[0].setAttribute("id", "removeBtn");
  //   console.log(nodeInput);
  document.getElementsByClassName("btn btn-danger").class =
    "btn btn-danger d-block";
  document.querySelector("#addNewRowHere").appendChild(node);
}

function removeRow(curRow) {
  curRow.parentNode.parentNode.remove();
  let n = curRow.parentNode.parentNode.rowIndex;
  // addIndex(n);
}

function addIndex(n) {
  inputDataTable.rows[n].cells[0].innerHTML = n;
}


const errDiv = document.createElement("div")
errDiv.setAttribute("class","text-danger")

function showNameError(curInput) {
  curInput.parentNode.appendChild(errDiv);
  if (!regName.test(curInput.value)) {
    curInput.setAttribute("class", "form-control error");
    errDiv.innerText = "*Please enter valid input";
  } else {
    curInput.setAttribute("class", "form-control");
    errDiv.innerText = "";
  }
}

function showNumberError(curInput) {
  curInput.parentNode.appendChild(errDiv);
  if (Number(curInput.value) < 0 || curInput.value > 100) {
    curInput.setAttribute("class", "form-control error");
    errDiv.innerText = "*Please enter valid input";
  } else {
    curInput.setAttribute("class", "form-control");
    errDiv.innerText = "";
  }
}

function validateTable() {
  let errClass = document.getElementsByClassName("error");
  //console.log(errClass)
  if (errClass.length == 0) {
    validate = true;
  } else {
    validate = false;
  }
  return validate;
}

function Submit() {
  const mainErrShow = document.getElementById("mainErrShow");
  const container2 = document.getElementById("container2");
  if (validateTable()) {
    container2.style.display = "block"
    mainErrShow.innerHTML = "";
    generateTable();
  } else {
    container2.style.display = "none"
    mainErrShow.innerHTML = "*please enter all correct detail to show result";
  }
}

const data = inputDataTable.rows;

function getData() {
  let dataArray = [];

  for (let i = 1; i < data.length; i++) {

    let dataObj = new Object();
    dataObj.name = data[i].cells[1].childNodes[0].value;
    dataObj.subject = data[i].cells[2].childNodes[0].value;
    dataObj.mark = data[i].cells[3].childNodes[0].value;

    dataArray.push(dataObj);

  }
  return dataArray;
}

function generateTable() {
  const tableNode = document.createElement("table");
  tableNode.setAttribute("class", "table table-bordered table-hover");
  tableNode.setAttribute("id", "genratedTable");
  tableNode.innerHTML = `<thead><tr class="table-dark"><th scope="col">No</th><th scope="col">Name <button onclick="sortTable(1)" class="rounded-circle"><i class="bi bi-arrow-down-up"></i></button></th><th scope="col">Subject <button onclick="sortTable(2)" class="rounded-circle"><i class="bi bi-arrow-down-up"></i></button></th><th scope="col">Marks</th><th scope="col">Result</th></tr></thead><tbody></tbody>`;

  getData().map((item, index, array) => {
    const currRow = document.createElement("tr");
    tableNode.childNodes[1].appendChild(currRow);

    const tdNodeIndex = document.createElement("td");
    tdNodeIndex.innerText = index + 1;
    currRow.appendChild(tdNodeIndex);

    const tdNodeName = document.createElement("td");
    tdNodeName.innerText = item.name ? item.name : "-";
    currRow.appendChild(tdNodeName);

    const tdNodeSub = document.createElement("td");
    tdNodeSub.innerText = item.subject ? item.subject : "-";
    currRow.appendChild(tdNodeSub);

    const tdNodeMark = document.createElement("td");
    tdNodeMark.innerText = item.mark ? item.mark : "-";
    currRow.appendChild(tdNodeMark);
    // console.log(item)

    const tdNodeRes = document.createElement("td");
    if (!item.mark) {
      tdNodeRes.innerText = "--";
      currRow.setAttribute("class", "table-danger");
    }
    else if (item.mark < 33) {
      tdNodeRes.innerText = "Fail";
      currRow.setAttribute("class", "table-warning");
    } else {
      tdNodeRes.innerText = "Pass";
      currRow.setAttribute("class", "table-info");
    }
    currRow.appendChild(tdNodeRes);
  })

  document.getElementById("addTable").innerHTML = tableNode.outerHTML;
}

function searchTable() {
  // Declare variables
  let input, filter, table, tr, td2, td1, i, txtValue1, txtValue2;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("genratedTable");
  tr = table.rows;

  for (i = 1; i < tr.length; i++) {
    td1 = tr[i].cells[1];
    td2 = tr[i].cells[2];
    if (td1 || td2) {
      txtValue1 = td1.textContent || td1.innerText;
      txtValue2 = td2.textContent || td2.innerText;
      if (txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("genratedTable");
  switching = true;
  dir = "asc";

  while (switching) {
    switching = false;
    rows = table.rows;

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;

      x = rows[i].cells[n];
      rows[i].cells[0].innerText = i;
      rows[i + 1].cells[0].innerText = i + 1;
      y = rows[i + 1].cells[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
