function submitPatientForm() {
    var form = document.querySelector('#patientForm')
    form.classList.remove('valid')
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        e.stopPropagation()
        if (form.checkValidity()) {
            let rowData = getData();

            if (submit) {
                dataArray.push(rowData);
                let row = patientTbl.row.add(rowData).draw().node()
                id++;
            }
            else {
                currElement.name = rowData.name
                currElement.age = rowData.age
                currElement.contact = rowData.contact
                currElement.address = rowData.address
                patientTbl.clear().rows.add(dataArray).draw(false)
                generateChildTableForAllrow()
            }
            $('#patientModal').modal('hide');
        }
        form.classList.add('was-validated')

    }, false)
}
submitPatientForm()


var selected = null
var tr = null

var deseageArray

function submitDeseageForm() {

    var form = document.querySelector('#deseageForm')
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        e.stopPropagation()
        if (form.checkValidity()) {
            let currElementData = dataArray.find((el) => {
                return el.id === parseInt($(tr).attr('id'))
            })
            currElementData.child.push(getDataDeseage())
            generateChildTableForAllrow()
            selected.child.show();

            $('#deseaseModal').modal('hide')
        }
        form.classList.add('was-validated')
    }, false)
}
submitDeseageForm()

function generateChildTableForAllrow() {
    dataArray.forEach(element => {
        $('#patientTable > tbody > tr').each((index, row) => {
            if (parseInt($(row).attr('id')) === element.id) {
                let tblRow = patientTbl.row(row)
                let string = '<tr><th>Desease Name</th><th>Medicine Name</th><th>Price</th><th>Quentity</th></tr>'
                element.child.forEach((elChild) => {
                    string += `<tr><td>${elChild.name}</td><td>${elChild.medicine}</td><td>${elChild.price}</td><td>${elChild.qty}</td></tr>`
                })
                tblRow.child(`<table>${string}</table>`)
            }
        })
    })
}

function updateIndex(){
    $('#patientTable > tbody > tr').each((index, row) => {
        $(row).find('td:first-child').text(index+1)
    })
}


var dataArray = []
var submit = true
var id = 1


var countries = ['India', 'Japan', 'USA', 'Seria', 'Afganistan', 'China']
var states = ['Gujrat', 'Rajasthan', 'tokyo', 'turki', 'gandhar', 'shangai']
var cities = ['Ahmedabad', 'Mehsana', 'Tokyo city', 'Hong Kong', 'mumbai', 'dubai']

var countrySelect = $('#patientForm').find('select[name=country]')
var stateSelect = $('#patientForm').find('select[name=state]')
var citySelect = $('#patientForm').find('select[name=city]')


//console.log(countrySelect);

for (let counrty of countries) {
    $(countrySelect).append(`<option value=${counrty}>${counrty}</option>`)
}

for (let state of states) {
    $(stateSelect).append(`<option value=${state}>${state}</option>`)
}

for (let city of cities) {
    $(citySelect).append(`<option value=${city}>${city}</option>`)
}

function getAge(date) {
    let bDate = new Date(date).getFullYear();
    let today = new Date().getFullYear()

    return (today - bDate)
}


function getData() {
    let data = $('#patientForm').serializeArray().reduce((acc, element, array) => {
        element.name == 'dob' ? acc.age = getAge(element.value)
            : (element.name == 'country' || element.name == 'state' || element.name == 'city') ? (!acc.address) ? acc.address = element.value
                : acc.address += (', ' + element.value)
                : acc[element.name] = element.value
        return acc
    }, { id: id, child: [] })
    return data
}

function getDataDeseage() {
    let data = $('#deseageForm').serializeArray().reduce((acc, element, array) => {
        acc[element.name] = element.value
        return acc
    }, {})
    return data
}


var currElement;

$(document).on('click', '.editBtn', function (event) {
    submit = false
    $('#patientModal').modal('show')

    currElement = dataArray.find((el) => {
        return el.id === parseInt($(event.target).closest('tr').attr('id'))
    })

    $('#patientForm').find('input').each((i) => {
        $(this).val(Object.values(currElement)[i])
    })
})

$(document).on('click', '.deleteBtn', function (event) {

    let index = dataArray.findIndex((el) => {
        return el.id === parseInt($(event.target).closest('tr').attr('id'))
    })
    dataArray.splice(index, 1)
    patientTbl.clear().rows.add(dataArray).draw()

    generateChildTableForAllrow()
})

$('#openModal').click(function () {
    $('#patientForm').get(0).reset();
    submit = true
})


var patientTbl = $('#patientTable').DataTable({
    data: dataArray,
    rowId:'id',
    columns: [
        {
            className: 'dt-control',
            orderable: false,
            data: null,
            defaultContent: '',
        },
        {
            data: 'name',
            title: 'Name'
        },
        {
            data: 'age',
            title: 'Age'
        },
        {
            data: 'contact',
            title: 'Contact Number'
        },
        {
            data: 'address',
            title: 'Address'
        },
        {
            defaultContent: '<button class="addDesease">Add Desease</button>'
        },
        {
            title: 'Action',
            defaultContent: '<button class="editBtn me-2">Edit</button><button class="deleteBtn">delete</button>',
            orderable: false
        }
    ]
})

$(document).on('click', '.addDesease', function (event) {
    tr = $(event.target).closest('tr')
    selected = patientTbl.row(tr);
    $('#deseaseModal').modal('show')
})

$('#patientTable tbody').on('click', 'td.dt-control', function (event) {
    var tr = $(event.target).closest('tr');
    var row = patientTbl.row(tr);

    if (row.child.isShown()) {
        row.child.hide();
        tr.removeClass('shown');
    } else {
        row.child.show();
        tr.addClass('shown');
    }
});