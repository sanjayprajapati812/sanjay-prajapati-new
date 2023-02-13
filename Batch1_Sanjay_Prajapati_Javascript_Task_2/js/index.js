const inputDataTable = document.querySelector("#inputDataTable");
const nodeInput = inputDataTable.rows[1].innerHTML;
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
}

const errDiv = document.createElement("div")
errDiv.setAttribute("class", "text-danger")

function showNameError(curInput) {
  curInput.parentNode.appendChild(errDiv);
  if (!regName.test(curInput.value)) {
    curInput.setAttribute("class", "form-control error");
    errDiv.innerText = "Please enter valid input";
  } else {
    curInput.setAttribute("class", "form-control");
    errDiv.innerText = "";
  }
}

function showNumberError(curInput) {
  curInput.parentNode.appendChild(errDiv);
  if (Number(curInput.value) < 0 || curInput.value > 100) {
    curInput.setAttribute("class", "form-control error");
    errDiv.innerText = "Please enter valid input";
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
    generateTable(getData());
  } else {
    container2.style.display = "none"
    mainErrShow.innerHTML = "*please enter all correct detail to show result";
  }
}


function getData() {
  const data = inputDataTable.rows;
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

function generateTable(array) {
  const tableNode = document.createElement("table");
  tableNode.setAttribute("class", "table table-bordered table-hover");
  tableNode.setAttribute("id", "genratedTable");
  tableNode.innerHTML = `<thead><tr class="table-dark"><th scope="col">No</th><th scope="col">Name <button onclick="sortTable2()" class="rounded-circle"><i class="bi bi-arrow-down-up"></i></button></th><th scope="col">Subject <button onclick="sortTable(2)" class="rounded-circle"><i class="bi bi-arrow-down-up"></i></button></th><th scope="col">Marks</th><th scope="col">Result</th></tr></thead><tbody></tbody>`;

  array.map((item, index, array) => {
    const currRow = document.createElement("tr");
    tableNode.childNodes[1].appendChild(currRow);

    const tdNodeIndex = currRow.insertCell(0);
    tdNodeIndex.innerText = index + 1;

    const tdNodeName = currRow.insertCell(1);
    tdNodeName.innerText = item.name ? item.name : "-";

    const tdNodeSub = currRow.insertCell(2);
    tdNodeSub.innerText = item.subject ? item.subject : "-";

    const tdNodeMark = currRow.insertCell(3);
    tdNodeMark.innerText = item.mark ? item.mark : "-";
    // console.log(item)

    const tdNodeRes = currRow.insertCell(4);
    if (!item.mark) {
      tdNodeRes.innerText = "--";
      currRow.setAttribute("class", "table-warning");
    }
    else if (item.mark < 33) {
      tdNodeRes.innerText = "Fail";
      currRow.setAttribute("class", "table-danger");
    } else {
      tdNodeRes.innerText = "Pass";
      currRow.setAttribute("class", "table-info");
    }
    //currRow.appendChild(tdNodeRes);
  })

  document.getElementById("addTable").innerHTML = tableNode.outerHTML;
}

function searchTable() {

  let inputStr = document.getElementById("searchInput").value.toUpperCase();
  let genTable = document.getElementById("genratedTable");
  let tableRows = genTable.rows;

  for (let i = 1; i < tableRows.length; i++) {
    let tableCell1 = tableRows[i].cells[1];
    let tableCell2 = tableRows[i].cells[2];

    if (tableCell1 || tableCell2) {
      let txtValue1 = tableCell1.textContent || tableCell1.innerText;
      let txtValue2 = tableCell2.textContent || tableCell2.innerText;
      if (txtValue1.toUpperCase().indexOf(inputStr) > -1 || txtValue2.toUpperCase().indexOf(inputStr) > -1) {
        tableRows[i].style.display = "";
      } else {
        tableRows[i].style.display = "none";
      }
    }
  }
}

function sortTable2(element) {
  let sortedArray;
  let direction = "asc"
  if (element == "name"&& direction=="asc") {
    sortedArray = getData().sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
    direction="des"
  }
  else if(element == "name"&& direction=="des"){
    sortedArray = getData().sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    direction="asc"
  }else if(element=="subject" &&direction=="asc"){
    sortedArray = getData().sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
    direction="asc"
  }else{
    sortedArray = getData().sort((a, b) => {
      const nameA = a.name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
    direction="asc"
  }


  generateTable(sortedArray);
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

function addRandomData() {

  const randomArray = [{ "name": "Teodora", "subject": "Maths", "marks": 87 },
  { "name": "Angelico", "subject": "Engineering", "marks": 38 },
  { "name": "Rooney", "subject": "Social Science", "marks": 12 },
  { "name": "Nickola", "subject": "Account", "marks": 66 },
  { "name": "Chev", "subject": "State", "marks": 43 },
  { "name": "Elane", "subject": "Gujarati", "marks": 15 },
  { "name": "Ivy", "subject": "English", "marks": 67 },
  { "name": "Cyrus", "subject": "Hindi", "marks": 74 },
  { "name": "Mariellen", "subject": "Data Science", "marks": 14 },
  { "name": "Meryl", "subject": "Data Structure", "marks": 96 },
  { "name": "Brena", "subject": "TOC", "marks": 1 },
  { "name": "Wren", "subject": "IOT", "marks": 44 },
  { "name": "Stella", "subject": "Mobile App Development", "marks": 17 },
  { "name": "Nestor", "subject": "BME", "marks": 62 },
  { "name": "Douglass", "subject": "Arts", "marks": 66 },
  { "name": "Trina", "subject": "Geoghrapy", "marks": 27 },
  { "name": "Vernor", "subject": "Physics", "marks": 24 },
  { "name": "Pierette", "subject": "Chemistry", "marks": 69 },
  { "name": "Patten", "subject": "Biology", "marks": 54 },
  { "name": "Peg", "subject": "Microprocessing", "marks": 58 },
  { "name": "Agata", "subject": "AI", "marks": 32 },
  { "name": "Sabine", "subject": "Business Development", "marks": 84 },
  { "name": "Frankie", "subject": "Compiler Design", "marks": 23 },
  { "name": "Hayward", "subject": "Information Security", "marks": 38 },
  { "name": "Sherie", "subject": "Big Data", "marks": 76 },
  ]

  const insertInputValues = inputDataTable.rows;
  //console.log(insertInputValues)

  for (let i = 1; i < insertInputValues.length; i++) {
    let n = Math.floor(Math.random() * 25);
    inputDataTable.rows[i].cells[1].childNodes[0].value = randomArray[n].name
    inputDataTable.rows[i].cells[2].childNodes[0].value = randomArray[n].subject
    inputDataTable.rows[i].cells[3].childNodes[0].value = randomArray[n].marks
  }
}
