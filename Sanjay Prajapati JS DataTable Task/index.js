var id = 2
var submit = true

var updateRowId;
var addSubId;
var selectedRow;
var updateSubRowId;

//initializeing of datatable

var tbl = $('#candidateTable').DataTable({
    data: dataArray,
    rowId: 'id',
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
            data: 'email',
            title: 'Email'
        },
        {
            data: 'dob',
            title: 'DOB'
        },
        {
            data: 'degree.degreeName',
            title: 'Degree Type'
        },
        {
            data: 'dtype.degreeTypeName',
            title: 'Degree'
        },
        {
            data: 'country.countryName',
            title: 'Country'
        },
        {
            data: 'state.stateName',
            title: 'State'
        },
        {
            data: 'city.cityName',
            title: 'City'
        },
        {
            defaultContent: '<button class="addSubBtn">Add Subject</button>'
        },
        {
            title: 'Action',
            defaultContent: '<button class="editBtn me-2">Edit</button><button class="deleteBtn">delete</button>',
            orderable: false
        }
    ]
})

// =========== save and update datatable using array manupulating =============

function validateSaveAndUpdate() {
    var forms = document.querySelector('#candidateForm')

    forms.addEventListener('submit', function (event) {
        event.preventDefault()
        event.stopPropagation()
        if (forms.checkValidity()) {
            // console.log($('#candidateForm').serializeArray());
            // console.log(findArrayData($('#candidateForm').serializeArray()))
            let rowData = getData($('#candidateForm').serializeArray())
            if (submit) {
                tbl.row.add(rowData).draw()
                dataArray.push(rowData)
                id++
            } else {
                dataArray.map((el) => {
                    if (el.id === updateRowId) {
                        el.name = rowData.name
                        el.email = rowData.email
                        el.dob = rowData.dob
                        el.degree = rowData.degree
                        el.dtype = rowData.dtype
                        el.country = rowData.country
                        el.state = rowData.state
                        el.city = rowData.city
                    }
                })
                tbl.clear().rows.add(dataArray).draw()
            }

            $('#exampleModal').modal('hide')
            //console.log(getData());
        }

        forms.classList.add('was-validated')
    }, false)
}
validateSaveAndUpdate()


degree.forEach(e => {
    $('#candidateForm').find('select[name=degree]').append(`<option value=${e.id}>${e.name}</option>`)
})

$('#candidateForm').find('select[name=degree]').change(function (e) {
    changeDegreeType($(e.target).val())
})

function changeDegreeType(val) {
    $('#candidateForm').find('select[name=dtype]').empty()
    //console.log($(e.target).val());
    let dtype = degree.find(el => { return el.id === parseInt(val) }).dtype
    dtype.forEach(val => {
        $('#candidateForm').find('select[name=dtype]').append(`<option value=${val.id}>${val.name}</option>`)
    })
}


function getData(array) {
    let countryId = array.find(el => el.name === 'country').value
    let stateId = array.find(el => el.name === 'state').value
    let cityId = array.find(el => el.name === 'city').value
    let degreeId = array.find(el => el.name === 'degree').value
    let degreeTypeId = array.find(el => el.name === 'dtype').value

    let countryEl = country.find(el => el.id === parseInt(countryId))
    let stateEl = countryEl.state.find(el => el.id === parseInt(stateId))
    let cityEl = stateEl.city.find(el => el.id === parseInt(cityId))
    let degreeEl = degree.find(el => el.id === parseInt(degreeId))
    let degreeTypeEl = degreeEl.dtype.find(el => el.id === parseInt(degreeTypeId))

    return {
        name: array.find(el => { return el.name === 'name' }).value,
        email: array.find(el => { return el.name === 'email' }).value,
        dob: array.find(el => { return el.name === 'dob' }).value,
        degree: {
            degreeId: degreeEl.id,
            degreeName: degreeEl.name
        },
        dtype: {
            degreeTypeId: degreeTypeEl.id,
            degreeTypeName: degreeTypeEl.name
        },
        country: {
            countryId: countryEl.id,
            countryName: countryEl.text
        },
        state: {
            stateId: stateEl.id,
            stateName: stateEl.text
        },
        city: {
            cityId: cityEl.id,
            cityName: cityEl.text,
        },
        id: id,
        subject: []
    }
}

$(document).on('click', '#openModalBtn', function (event) {
    submit = true
    $('#subBtn').text('Save')
    $('#exampleModal').modal('show')
    $('#candidateForm').get(0).reset()
    $('#candidateForm').find('select[name=dtype]').html(`<option selected disabled value="">Choose...</option>`)
    $('#candidateForm').find('select[name=state]').html(`<option selected disabled value="">Choose...</option>`)
    $('#candidateForm').find('select[name=city]').html(`<option selected disabled value="">Choose...</option>`)
    $('#candidateForm').removeClass('was-validated')
})

$(document).on('click', '.editBtn', function (event) {
    submit = false
    $('#candidateForm').removeClass('was-validated')
    updateRowId = parseInt($(event.target).closest('tr').attr('id'))
    let rowObj = dataArray.find((el, index, array) => {
        if (el.id === parseInt($(event.target).closest('tr').attr('id'))) {
            return true
        }
    })
    changeDegreeType(rowObj.degree.degreeId)
    changeState(rowObj.country.countryId)
    changeCity(rowObj.country.countryId, rowObj.state.stateId)

    $('#subBtn').text('Update')
    $('#exampleModal').modal('show')
    $('#candidateForm').find('input[name=name]').val(rowObj.name)
    $('#candidateForm').find('input[name=email]').val(rowObj.email)
    $('#candidateForm').find('input[name=dob]').val(rowObj.dob)
    $('#candidateForm').find('select[name=degree]').val(rowObj.degree.degreeId).trigger('change')
    $('#candidateForm').find('select[name=dtype]').val(rowObj.dtype.degreeTypeId).trigger('change')
    $('#candidateForm').find('select[name=country]').val(rowObj.country.countryId).trigger('change')
    $('#candidateForm').find('select[name=state]').val(rowObj.state.stateId).trigger('change')
    $('#candidateForm').find('select[name=city]').val(rowObj.city.cityId).trigger('change')
})

$(document).on('click', '.deleteBtn', function (event) {
    //console.log(parseInt($(event.target).closest('tr').attr('id')));
    dataArray.filter((el, index, array) => {
        if (el.id === parseInt($(event.target).closest('tr').attr('id'))) {
            array.splice(index, 1)
        }
    })
    tbl.clear().rows.add(dataArray).draw()
})



//  ==================== country state and city dropdown using SELECT2===============================



$('#country').select2({
    data: country,
    width: '100%',
    dropdownParent: $('#exampleModal .modal-body')
});

$('#state').select2({
    data: [],
    dropdownParent: $('#exampleModal .modal-body'),
    width: '100%'
})

$('#city').select2({
    data: [],
    dropdownParent: $('#exampleModal .modal-body'),
    width: '100%'
})

$('#country').on('change', function (e) {
    changeState(e.target.value)
    changeCity(e.target.value, $('#state').val());
})


$('#state').on('change', function (e) {
    changeCity($('#country').val(), e.target.value);
})

function changeState(val) {
    $('#state').empty();
    let state = country.find(el => el.id === parseInt(val)).state
    $('#state').select2({
        data: state,
        width: '100%',
        dropdownParent: $('#exampleModal .modal-body'),
    });
}

function changeCity(val1, val2) {
    $('#city').empty();
    let city = country.find((el) => { return el.id === parseInt(val1) }).state.find((el) => el.id === parseInt(val2)).city
    $('#city').select2({
        data: city,
        width: '100%',
        dropdownParent: $('#exampleModal .modal-body'),
    });
}


//      =================    here added child table for each row of main table =======================================


$(document).on('click', '.addSubBtn', function (event) {
    $('#subModal').modal('show')
    $('#subForm').removeClass('was-validated')
    $('#subForm').get(0).reset()
    submit = true
    addSubId = $(event.target).closest('tr').attr('id')
    selectedRow = $(event.target).closest('tr')
    setSubjectFormVlaue()
})

function getSubjectFormData() {
    return $('#subForm').serializeArray().reduce((acc, e) => {
        e.name == 'name' ? acc[e.name] = $('#subName').select2('data')[0].text :
            acc[e.name] = e.value
        return acc
    }, { subjectId: $('#subForm').find('select[name=name]').val() })
}


function validateAndSubmitSubject() {
    var forms = document.querySelector('#subForm')

    forms.addEventListener('submit', function (event) {
        event.preventDefault()
        event.stopPropagation()
        if (forms.checkValidity()) {
            let rowData = getSubjectFormData()
            if (submit) {
                dataArray.map(el => {
                    if (el.id === parseInt(addSubId)) {
                        let count = 1
                        el.subject = [...el.subject, ...[rowData]]
                        el.subject.forEach(sub_el => {
                            sub_el.id = count
                            count++
                        })
                    }
                })
                generateSubjectTable(selectedRow, 'add')
            } else {
                dataArray.map(el => {
                    if (el.id === parseInt($(selectedRow).attr('id'))) {
                        el.subject.map((sub_el) => {
                            if (sub_el.id === parseInt(updateSubRowId)) {
                                sub_el.name = rowData.name
                                sub_el.code = rowData.code
                                sub_el.mark = rowData.mark
                                sub_el.subjectId = rowData.subjectId
                            }
                        })
                    }
                })
                generateSubjectTable(selectedRow, 'delete')
            }

            $('#subModal').modal('hide')
        }

        forms.classList.add('was-validated')
    }, false)
}


validateAndSubmitSubject()

function format(data) {
    let string = ''
    data.subject.forEach(rowData => {
        string += `<tr id=${rowData.id} subjectId=${rowData.subjectId}>
                    <td>${rowData.name}</td>
                    <td>${rowData.code}</td>
                    <td>${rowData.mark}</td>
                    <td>
                        <button><i class="bi bi-pencil-square editSub"></i></button>
                        <button><i class="bi bi-trash deleteSub"></i></button>
                    </td>
                </tr>`
    })

    return (
        `<table class='subTable'>
            <thead>
                <tr>
                    <th>Subject Name</th>
                    <th>Subject Code</th>
                    <th>Marks</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
            ${string}
            </tbody>
        </table>`
    );
}

$('#candidateTable tbody').on('click', 'td.dt-control', function (event) {
    selectedRow = $(event.target).closest('tr')
    generateSubjectTable($(event.target).closest('tr'), 'collapse')
});


function generateSubjectTable(tr, action) {
    let row = tbl.row(tr);
    //console.log(row.data());
    if (action == 'collapse') {
        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        } else {
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    }
    else {
        row.child(format(row.data())).show();
        tr.addClass('shown');
    }
}

// Edit and delete subject table data of each row

$(document).on('click', '.deleteSub', function (event) {
    //console.log(parseInt($(event.target).closest('table').closest('tr').prev().attr('id')));
    dataArray.map(el => {
        if (el.id === parseInt($(event.target).closest('table').closest('tr').prev().attr('id'))) {
            el.subject.map((sub_el, index) => {
                if (sub_el.id === parseInt($(event.target).closest('tr').attr('id'))) {
                    el.subject.splice(index, 1)
                }
            })
        }
    })
    generateSubjectTable($(event.target).closest('table').closest('tr').prev(), 'delete')
})

$(document).on('click', '.editSub', function (event) {
    submit = false;
    selectedRow = $(event.target).closest('table').closest('tr').prev()
    updateSubRowId = $(event.target).closest('tr').attr('id')
    $('#subForm').removeClass('was-validated')
    $('#subForm').get(0).reset()
    $('#subModal').modal('show')
    setSubjectFormVlaue()
    changeSubjectSubCode(selectedRow, $(event.target).closest('tr'))
})


// ================ here set subject name and code in form based on DEGREE and DEGREETYPE in parnt row using select 2 =====================

function setSubjectCode(subject) {
    let code = subject.find(el => parseInt(el.id) === parseInt($('#subName').val())).code
    $('#subForm').find('select[name=code]').html(`<option>${code}</option>`)
}

function setSubjectFormVlaue() {
    $('#subForm').find('select[name=name]').empty()
    let data = tbl.row(selectedRow).data()
    let subject = degree.find(el => el.id === parseInt(data.degree.degreeId)).dtype
        .find(val => val.id === parseInt(data.dtype.degreeTypeId)).subject
    $('#subName').select2({
        data: subject,
        width: '100%',
        dropdownParent: $('#subModal .modal-body'),
    })
    setSubjectCode(subject)
}
function changeSubjectSubCode(row, subRow) {
    let data = tbl.row(row).data()
    let rowData = data.subject.find(el => el.id === parseInt($(subRow).attr('id')))
    //console.log(rowData);
    $('#subForm').find('select[name=name]').val(rowData.subjectId).trigger('change')
    $('#subForm').find('input[name=mark]').val(rowData.mark)
}

$('#subForm').find('select[name=name]').change(function (e) {
    setSubjectCode($('#subName').select2('data'))
})
