const inputDataTable = document.querySelector("#inputDataTable");
const nodeInput = inputDataTable.rows[1].innerHTML;
var regName = /^[a-zA-Z ]*$/;
var regNumber = /^(\d{1,2}|100)$/;
const data = document.getElementById("addNewRowHere").rows;
var curRow;
var dataNTC = [];

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
  Array.from(data).forEach((tr) => {
    if (tr.getAttribute("isAccepted") == "yes") {
      let dataObj = new Object();
      dataObj.name = tr.cells[1].children[0].value;
      dataObj.subject = tr.cells[2].children[0].value;
      dataObj.mark = tr.cells[3].children[0].value;
      dataObj.isAccept = tr.getAttribute("isAccepted");

      dataArray.push(dataObj);
    }

  })
  dataNTC = dataArray;
  return dataArray;
}

function getReportData() {

  let reportData = document.getElementById("reportTblBody").rows;
  let dataArray = [];

  Array.from(reportData).forEach((tr, rowIndex) => {
    let dataObj = new Object();
    dataObj.id = rowIndex + 1;
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

  array.forEach((item) => {
    const currRow = document.createElement("tr");
    tableNode.children[1].appendChild(currRow);

    currRow.insertCell(0);
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
  generateTable(dataNTC)
  let inputStr = document.getElementById("searchInput").value.toUpperCase();
  let newArray = getReportData().filter(function (el) {
    return el.name.toUpperCase().includes(inputStr) || el.subject.toUpperCase().includes(inputStr) || el.result.toUpperCase().includes(inputStr)
  });

  getReportData().forEach((item) => {
    if (newArray.some((val) => { return val.name.toUpperCase() == item.name.toUpperCase() })) {
      reportTable.rows[item.id].style.display = ""
    } else {
      reportTable.rows[item.id].style.display = "none"
    }
  })

  return newArray
}

function addRandomData() {

  const randomArray = [{ "name": "Teodora", "subject": "Maths", "marks": 87 },
  { "name": "Angelico", "subject": "Engineering", "marks": 56 },
  { "name": "Rooney", "subject": "Social Science", "marks": 89 },
  { "name": "Nickola", "subject": "Account", "marks": 12 },
  { "name": "Chev", "subject": "State", "marks": 45 },
  { "name": "Elane", "subject": "Gujarati", "marks": 65 },
  { "name": "Ivy", "subject": "English", "marks": 78 },
  { "name": "Cyrus", "subject": "Hindi", "marks": 54 },
  { "name": "Mariellen", "subject": "Data Science", "marks": 28 },
  { "name": "Meryl", "subject": "Data Structure", "marks": 92 },
  { "name": "Brena", "subject": "TOC", "marks": 84 },
  { "name": "Wren", "subject": "IOT", "marks": 67 },
  { "name": "Stella", "subject": "Mobile App Development", "marks": 39 },
  { "name": "Nestor", "subject": "BME", "marks": 34 },
  { "name": "Douglass", "subject": "Arts", "marks": 24 },
  { "name": "Trina", "subject": "Geoghrapy", "marks": 76 },
  { "name": "Vernor", "subject": "Physics", "marks": 46 },
  { "name": "Pierette", "subject": "Chemistry", "marks": 49 },
  { "name": "Patten", "subject": "Biology", "marks": 51 },
  { "name": "Peg", "subject": "Microprocessing", "marks": 62 },
  { "name": "Agata", "subject": "AI", "marks": 73 },
  { "name": "Sabine", "subject": "Business Development", "marks": 80 },
  { "name": "Frankie", "subject": "Compiler Design", "marks": 40 },
  { "name": "Hayward", "subject": "Information Security", "marks": 20 },
  { "name": "Sherie", "subject": "Big Data", "marks": 50 },
  ]

  const insertInputValues = inputDataTable.rows;
  //console.log(insertInputValues)

  for (let i = 1; i < insertInputValues.length; i++) {
    let n = Math.floor(Math.random() * 25);
    inputDataTable.rows[i].cells[1].children[0].value = randomArray[n].name
    inputDataTable.rows[i].cells[2].children[0].value = randomArray[n].subject
    inputDataTable.rows[i].cells[3].children[0].value = randomArray[n].marks
  }
  checkValidity()
}



function findOccTotalMark(arr) {
  let reducedArray = arr.reduce((array, element) => {
    let rtnArray;
    //console.log(array.some((e) => { return e.name === element.name }))
    if (array.some((e) => { return e.name.toUpperCase() === element.name.toUpperCase() })) {
         current = array.find((e) => { return e.name.toUpperCase() == element.name.toUpperCase() })
         current.totmrk += parseInt(element.mark)
         current.occ++
         rtnArray = [
              ...array
         ]
    } else {
         rtnArray = [
              ...array,
              { name: element.name, totmrk: parseInt(element.mark), occ: 1 }
         ]
    }
    return rtnArray
}, [])

//console.log(reducedArray);
return reducedArray;
}

function generatePersentageTable(data) {
  const tableNode = document.createElement("table");
  tableNode.setAttribute("class", "table table-bordered table-hover reportTbl");
  tableNode.setAttribute("id", "persentageTable");
  tableNode.innerHTML = `<thead><tr class="table-dark"><th scope="col">No</th>
  <th scope="col">Name </th>
  <th scope="col">Percentage</th><th scope="col">Final Result</th></thead><tbody></tbody>`;

  data.forEach(({name,totmrk,occ}) => {

    let Persentage = (parseInt(totmrk) / parseInt(occ));

    const curRow = document.createElement("tr");
    tableNode.children[1].appendChild(curRow);
    curRow.insertCell(0);
    let tdNodeName = curRow.insertCell(1);
    tdNodeName.innerText = name;
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

function showNameError(tr, i, validate) {
  if (!regName.test(tr.cells[i].children[0].value) || !(tr.cells[i].children[0].value.trim())) {
    tr.cells[i].children[0].setAttribute("class", "form-control error")
    tr.cells[i].children[1].innerHTML = "*Please enter text only value"
    return validate = false
  } else {
    tr.cells[i].children[0].setAttribute("class", "form-control")
    tr.cells[i].children[1].innerHTML = ""
  }
  return validate
}

function showNumberError(tr, validate) {
  if (!regNumber.test(parseInt(tr.cells[3].children[0].value))) {
    tr.cells[3].children[0].setAttribute("class", "form-control error")
    tr.cells[3].children[1].innerHTML = "*Please enter valid marks(0-100)"
    return validate = false;
  } else {
    tr.cells[3].children[0].setAttribute("class", "form-control")
    tr.cells[3].children[1].innerHTML = ""
  }
  return validate
}

function checkValidity() {
  let validate = true;

  Array.from(data).forEach((tr) => {

    validate = showNameError(tr, 1, validate);
    validate = showNameError(tr, 2, validate);
    validate = showNumberError(tr, validate);

    tr.cells[1].children[0].addEventListener("keyup", () => showNameError(tr, 1))
    tr.cells[2].children[0].addEventListener("keyup", () => showNameError(tr, 2))
    tr.cells[3].children[0].addEventListener("keyup", () => showNumberError(tr))

    tr.cells[1].children[0].addEventListener("keydown", (e) => { if (!showNameError(tr, 1, true)) if (e.keyCode == 9) e.preventDefault() })
    tr.cells[2].children[0].addEventListener("keydown", (e) => { if (!showNameError(tr, 2, true)) if (e.keyCode == 9) e.preventDefault() })
    tr.cells[3].children[0].addEventListener("keydown", (e) => { if (!showNumberError(tr, true)) if (e.keyCode == 9) e.preventDefault() })

  })
  return validate;
}

var subBtn = document.getElementById("subBtn");

subBtn.addEventListener('click', function () {

  let mainErrShow = document.getElementById("mainErrShow");
  let container2 = document.getElementById("container2");
  if (!checkValidity()) {
    container2.style.display = "none"
    mainErrShow.innerHTML = "*Please enter all correct detail to show Report";
  } else {

    //let perArray = getData().groupBy((element) => element.name)
    //console.log(perArray);

    container2.style.display = "block"
    mainErrShow.innerHTML = "";
    generateTable(getData(data));
    generatePersentageTable(findOccTotalMark(getData(data)));
  }
})
