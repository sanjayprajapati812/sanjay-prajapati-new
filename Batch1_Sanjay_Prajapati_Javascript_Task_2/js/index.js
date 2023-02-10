const inputDataTable = document.querySelector("#inputDataTable");
const nodeInput = inputDataTable.rows[1].innerHTML;
var count = 0;

var validate = false;


function addNewRow() {
    const node = document.createElement("tr");
    node.innerHTML = nodeInput;
    node.cells[5].childNodes[0].setAttribute("class", "btn btn-danger d-block")
    node.cells[5].childNodes[0].setAttribute("id", "removeBtn")
    console.log(nodeInput);
    document.getElementsByClassName("btn btn-danger").class = "btn btn-danger d-block";
    document.querySelector("#addNewRowHere").appendChild(node);
    // console.log(findCurRowNum());
    let n = node.rowIndex;
    // addIndex(n);
}

function removeRow(curRow) {
    curRow.parentNode.parentNode.remove()
    let n = curRow.parentNode.parentNode.rowIndex;
    // addIndex(n);
}

function addIndex(n) {
    inputDataTable.rows[n].cells[0].innerHTML = n;
}

function showNameError(curInput) {
    var regName = /^[a-zA-Z ]*$/;
    if (!regName.test(curInput.value)||!curInput.value) {
        curInput.setAttribute("class", "form-control error")
    } else {
        curInput.setAttribute("class", "form-control")
    }
}

function showNumberError(curInput) {
    if (Number(curInput.value) < 0 || curInput.value > 100) {
        curInput.setAttribute("class", "form-control error")
    } else {
        curInput.setAttribute("class", "form-control")
    }
}

function validateTable() {
    getDataName()
    getDataSubject()
    getDataMarks()

    return validate;
}

function Submit() {

    generateTable();
}

const data = inputDataTable.rows

function getDataName() {
    let nameArray = [];

    for (let i = 1; i < data.length; i++) {
        nameArray.push(data[i].cells[1].childNodes[0].value);

        if (!data[i].cells[1].childNodes[0].value) {
            showNameError(data[i].cells[1].childNodes[0])
        }
    }
    return nameArray
}
function getDataSubject() {
    let subArray = [];

    for (let i = 1; i < data.length; i++) {
        subArray.push(data[i].cells[2].childNodes[0].value);

        if (!data[i].cells[1].childNodes[0].value) {
            showNameError(data[i].cells[2].childNodes[0])
        }

    }
    return subArray
}
function getDataMarks() {
    let markArray = [];

    for (let i = 1; i < data.length; i++) {
        markArray.push(data[i].cells[3].childNodes[0].value);

        if (!data[i].cells[1].childNodes[0].value) {
            showNumberError(data[i].cells[3].childNodes[0])
        }

    }
    return markArray
}



function generateTable() {
    const tableNode = document.createElement("table");
    tableNode.setAttribute("class", "table table-bordered");
    tableNode.innerHTML = `<thead><tr><th scope="col">No</th><th scope="col">Name</th><th scope="col">Subject</th><th scope="col">Marks</th><th scope="col">Result</th></tr></thead><tbody></tbody>`

    for (let i = 1; i < data.length; i++) {
        const trNode = document.createElement("tr");
        tableNode.childNodes[1].appendChild(trNode);
    }

    getDataName().map((item, index) => {
        const currRow = tableNode.childNodes[1].childNodes[index];
        const tdNode = document.createElement("td");
        tdNode.innerText = index + 1;
        currRow.appendChild(tdNode);
    })


    getDataName().map((item, index, array) => {
        const currRow = tableNode.childNodes[1].childNodes[index];
        const tdNode = document.createElement("td");
        tdNode.innerText = item;
        currRow.appendChild(tdNode);
        // console.log(item)
    })

    getDataSubject().map((item, index, array) => {
        const currRow = tableNode.childNodes[1].childNodes[index];
        const tdNode = document.createElement("td");
        tdNode.innerText = item;
        currRow.appendChild(tdNode);
        // console.log(item)
    })

    getDataMarks().map((item, index, array) => {
        const currRow = tableNode.childNodes[1].childNodes[index];
        const tdNode = document.createElement("td");
        tdNode.innerText = item;
        currRow.appendChild(tdNode);
        // console.log(item)
    })
    getDataMarks().map((item, index, array) => {
        const currRow = tableNode.childNodes[1].childNodes[index];
        const tdNode = document.createElement("td");
        if (item < 33) {
            tdNode.innerText = "Fail";
            currRow.setAttribute("class", "table-danger")
        } else {
            tdNode.innerText = "Pass"
            currRow.setAttribute("class", "table-success")
        }
        currRow.appendChild(tdNode);
        // console.log(item)
    })

    document.getElementById("addTable").innerHTML = tableNode.outerHTML;
}


