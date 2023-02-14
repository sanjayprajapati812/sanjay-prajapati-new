const inputDataTable = document.querySelector("#inputDataTable");
const nodeInput = inputDataTable.rows[1].innerHTML;
var regName = /^[a-zA-Z ]*$/;
const data = inputDataTable.rows;


var validate = false;

function addNewRow() {
  const node = document.createElement("tr");
  node.innerHTML = nodeInput;
  node.cells[5].childNodes[0].setAttribute("class", "btn btn-danger d_flex margin_top2");
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
  errClass.length == 0 ? validate = true : validate = false;
  return validate;
}

function Submit() {
  const mainErrShow = document.getElementById("mainErrShow");
  const container2 = document.getElementById("container2");
  if (validateTable()) {
    container2.style.display = "block"
    mainErrShow.innerHTML = "";
    generateTable(getData(data));
  } else {
    container2.style.display = "none"
    mainErrShow.innerHTML = "*please enter all correct detail to show result";
  }
}

function getData(data) {

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
function getReportData(data) {

  let dataArray = [];

  for (let i = 1; i < data.length; i++) {

    let dataObj = new Object();
    dataObj.name = data[i].cells[1].innerText;
    dataObj.subject = data[i].cells[2].innerText;
    dataObj.mark = data[i].cells[3].innerText;

    dataArray.push(dataObj);

  }
  return dataArray;
}

function generateTable(array) {
  const tableNode = document.createElement("table");
  tableNode.setAttribute("class", "table table-bordered table-hover");
  tableNode.setAttribute("id", "genratedTable");
  tableNode.innerHTML = `<thead><tr class="table-dark"><th scope="col">No</th>
  <th style="min-width: 142px;" scope="col">Name <button onclick="sortTable('name','asc')" class="rounded-circle border-0"><i class="bi bi-sort-alpha-down"></i></button>
  <button onclick="sortTable('name','desc')" class="rounded-circle border-0"><i class="bi bi-sort-alpha-down-alt"></i></button></th>
  <th style="min-width: 150px;" scope="col">Subject <button onclick="sortTable('subject','asc')" class="rounded-circle border-0"><i class="bi bi-sort-alpha-down"></i></button>
  <button onclick="sortTable('subject','desc')" class="rounded-circle border-0"><i class="bi bi-sort-alpha-down-alt"></i></button></th>
  <th scope="col">Marks</th><th scope="col">Result</th></tr></thead><tbody></tbody>`;

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


const reportDataTable = document.querySelector("#genratedTable");
const reportData = reportDataTable.rows;


function sortTable(element, direction) {
  sortedArray = getReportData(reportData).sort((a, b) => {
    const nameA = a[element].toUpperCase();
    const nameB = b[element].toUpperCase();

    if (direction == "desc") {
      return ((nameA > nameB) ? -1 : ((nameA < nameB) ? 1 : 0))
    }
    else if (direction == "asc") {
      return ((nameA < nameB) ? -1 : ((nameA > nameB) ? 1 : 0))
    }
  });
  generateTable(sortedArray);
}

function searchTable() {

  let inputStr = document.getElementById("searchInput").value.toUpperCase();
  let newArray = getReportData(reportData).filter(function (el) {
    //console.log(el.name)
    return el.name.toUpperCase().includes(inputStr) || el.subject.toUpperCase().includes(inputStr)
  });
  generateTable(newArray);
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