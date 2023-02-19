const inputDataTable = document.querySelector("#inputDataTable");
const nodeInput = inputDataTable.rows[1].innerHTML;
var regName = /^[a-zA-Z ]*$/;
const data = document.getElementById("addNewRowHere").rows;
var curRow;

validateTable()

function addNewRow() {
  const node = document.createElement("tr");
  node.setAttribute("isAccepted", "")
  node.innerHTML = nodeInput;
  node.cells[5].children[0].setAttribute("class", "btn btn-danger d_flex margin_top2");
  document.querySelector("#addNewRowHere").appendChild(node);
}

function getIndex(curRowindex) {
  curRow = curRowindex.parentElement.parentElement.rowIndex;
}

function deleteRow() {
  document.getElementById("inputDataTable").deleteRow(curRow);
  let node = document.createElement("div")
  node.setAttribute("class", "positionFixed alert alert-dismissible fade show alert-success")
  node.setAttribute("role", "alert")
  node.innerText = "Record deleted successfully"
  document.body.append(node)
  setTimeout(function myFun() { node.remove() }, 2000)
}

function getData(data) {

  let dataArray = [];
  Array.from(data).forEach((tr, rowIndex) => {
    if (tr.getAttribute("isAccepted") == "yes") {
      let dataObj = new Object();
      dataObj.name = tr.cells[1].children[0].value;
      dataObj.subject = tr.cells[2].children[0].value;
      dataObj.mark = tr.cells[3].children[0].value;
      dataObj.isAccept = tr.getAttribute("isAccepted");

      dataArray.push(dataObj);
    }

  })

  return dataArray;
}
function getReportData() {

  let reportData = document.getElementById("reportTblBody").rows;
  console.log(data)
  let dataArray = [];

  Array.from(reportData).forEach((tr, rowIndex) => {
    let dataObj = new Object();
    dataObj.id = rowIndex;
    dataObj.name = tr.cells[1].innerText;
    dataObj.subject = tr.cells[2].innerText;
    dataObj.mark = tr.cells[3].innerText;
    dataObj.result = tr.cells[4].innerText;
    dataArray.push(dataObj);
  })

  return dataArray;
}

function generateTable(array) {

  const tableNode = document.getElementById("reportTable");
  document.getElementById("reportTblBody").innerHTML = ""

  array.map((item, index, array) => {
    const currRow = document.createElement("tr");
    tableNode.children[1].appendChild(currRow);

    const tdNodeIndex = currRow.insertCell(0);

    const tdNodeName = currRow.insertCell(1);
    tdNodeName.innerText = item.name ? item.name : "-";

    const tdNodeSub = currRow.insertCell(2);
    tdNodeSub.innerText = item.subject ? item.subject : "-";

    const tdNodeMark = currRow.insertCell(3);
    tdNodeMark.innerText = item.mark ? item.mark : "-";
    // console.log(item)

    const tdNodeRes = currRow.insertCell(4);
    if (!item.mark || item.mark == "-") {
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
}

function sortTable(element, direction) {
  sortedArray = searchTable().sort((a, b) => {
    let nameA = a[element].toUpperCase();
    let nameB = b[element].toUpperCase();
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
  generateTable(getData(data));
  let inputStr = document.getElementById("searchInput").value.toUpperCase();
  let newArray = getReportData().filter(function (el) {
    return el.name.toUpperCase().includes(inputStr) || el.subject.toUpperCase().includes(inputStr) || el.result.toUpperCase().includes(inputStr)
  });

  getReportData().map((item) => {
    reportTable.rows[item.id + 1].style.display = "none"
  })

  newArray.map((item) => {
    reportTable.rows[item.id + 1].style.display = ""
  })
  return newArray
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
    inputDataTable.rows[i].cells[1].children[0].value = randomArray[n].name
    inputDataTable.rows[i].cells[2].children[0].value = randomArray[n].subject
    inputDataTable.rows[i].cells[3].children[0].value = randomArray[n].marks
  }
}

function findOccTotalMark(arr) {
  let arr2 = [];

  arr.forEach((x) => {

    if (arr2.some((val) => { return val.name.toUpperCase() == x.name.toUpperCase() })) {

      arr2.forEach((k) => {
        if (k.name.toUpperCase() === x.name.toUpperCase()) {
          k["occurence"]++
          k["totalMark"] += parseInt(x.mark);
        }
      })
    } else {
      let a = {}
      a.name = x.name
      a["occurence"] = 1;
      a["totalMark"] = parseInt(x.mark);
      arr2.push(a);
    }
  })
  return arr2;
}

function generatePersentageTable(data) {
  const tableNode = document.createElement("table");
  tableNode.setAttribute("class", "table table-bordered table-hover reportTbl");
  tableNode.setAttribute("id", "persentageTable");
  tableNode.innerHTML = `<thead><tr class="table-dark"><th scope="col">No</th>
  <th scope="col">Name </th>
  <th scope="col">Percentage</th><th scope="col">Final Result</th></thead><tbody></tbody>`;

  data.map((element) => {

    let Persentage = (parseInt(element.totalMark) / parseInt(element.occurence));

    const curRow = document.createElement("tr");
    tableNode.children[1].appendChild(curRow);
    curRow.insertCell(0);
    let tdNodeName = curRow.insertCell(1);
    tdNodeName.innerText = element.name;
    let tdNodePersentage = curRow.insertCell(2);
    tdNodePersentage.innerText = Persentage.toFixed(2) + "%"

    const tdNodeRes = curRow.insertCell(3);
    if (!Persentage) {
      tdNodeRes.innerText = "--";
      curRow.setAttribute("class", "table-warning");
    }
    else if (Persentage < 33) {
      tdNodeRes.innerText = "Fail";
      curRow.setAttribute("class", "table-danger");
    } else {
      tdNodeRes.innerText = "Pass";
      curRow.setAttribute("class", "table-info");
    }
  })

  document.getElementById("addPerTable").innerHTML = tableNode.outerHTML;
}

function btnAcceptReject(currClass) {
  if (currClass.className == "btn btn-outline-success me-2 btnPF") {
    currClass.setAttribute("class", "btn btn-success me-2 btnPF")
    currClass.nextElementSibling.setAttribute("class", "btn btn-outline-danger btnPF")
    currClass.parentElement.parentElement.parentElement.setAttribute("isAccepted", "yes")
  }
  if (currClass.className == "btn btn-outline-danger btnPF") {
    currClass.setAttribute("class", "btn btn-danger btnPF")
    currClass.previousElementSibling.setAttribute("class", "btn btn-outline-success me-2 btnPF")
    currClass.parentElement.parentElement.parentElement.setAttribute("isAccepted", "no")
  }
}

function validateTable() {
  'use strict'

  let forms = document.querySelectorAll('.needs-validation')
  let subBtn = document.getElementById("subBtn");
  let mainErrShow = document.getElementById("mainErrShow");
  let container2 = document.getElementById("container2");

  Array.prototype.slice.call(forms).forEach(function (form) {
    subBtn.addEventListener('click', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        container2.style.display = "none"
        mainErrShow.innerHTML = "*Please enter all correct detail to show Report";
      }
      else if (getData(data).length == 0) {
        container2.style.display = "none"
        mainErrShow.innerHTML = "*Please Accept atleast one or more to show Report!";
      } else {
        container2.style.display = "block"
        mainErrShow.innerHTML = "";
        generateTable(getData(data));
        console.log(getData(data));
        generatePersentageTable(findOccTotalMark(getData(data)));
      }

      form.classList.add('was-validated')
    }, false)
  })
}
