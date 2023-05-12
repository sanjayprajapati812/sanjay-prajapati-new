var dataArray = [
    {
        email: "sanjay.p@shaligraminfotech.com",
        id: 1,
        name: "sanjay prajapati",
        reason: "sana",
        shift: { id: 1, text: 'Half Day' },
        shiftShedule: { id: 1, text: 'Second Half' },
        tDate: "2023-05-09"
    }
]
var id = 1
var submit = true
var updateId;
$('#openModalBtn').click(function () {
    submit = true;
    $('#shiftModal').modal('show')
    $('#candidateForm').trigger('reset')
    $('#candidateForm').removeClass('was-validated')
})


var tbl = $('#employeeTable').DataTable({
    data: dataArray,
    rowId: 'id',
    columns: [
        {
            data: 'name',
            title: 'Name'
        },
        {
            data: 'email',
            title: 'Email'
        },
        {
            data: 'reason',
            title: 'Reason'
        },
        {
            data: 'tDate',
            title: 'Ticket Date'
        },
        {
            data: 'shift.text',
            title: 'Shift'
        },
        {
            data: 'shiftShedule.text',
            title: 'Shift Shedule'
        },
        {
            title: 'Action',
            defaultContent: `<button class="editBtn">Edit</button><button class="deleteBtn">Delete</button>`
        }
    ]
})


var shift = [
    {
        id: 0,
        text: 'Full Day'
    },
    {
        id: 1,
        text: 'Half Day'
    }
]
var shiftShedule = [
    {
        id: 0,
        text: 'First Half'
    },
    {
        id: 1,
        text: 'Second Half'
    }
]

$('#shift').select2({
    data: shift,
    dropdownParent: $('#shiftModal .modal-body'),
    width: '100%',
})

function reDrawTable() {
    tbl.clear().rows.add(dataArray).draw()
}


function submitEmployeeForm() {
    $('#candidateForm').submit(function (event) {
        event.preventDefault();
        event.stopPropagation();
        if ((event.target).checkValidity()) {
            let rowData = getData()
            if (submit) {
                tbl.row.add(rowData).draw()
                dataArray.push(rowData)
                id++
            } else {
                rowData.id = updateId
                dataArray[dataArray.findIndex(el => el.id == updateId)] = rowData
                reDrawTable()
            }
            $('#shiftModal').modal('hide')
        }
        $(this).addClass('was-validated')
    })
}

submitEmployeeForm()

$('#shift').change(function () {
    if ($(this).val() == 1) {
        $('.d_none').html(`<label for="" class="form-label">Shift Shedule</label>
                                <select name="shiftShedule" class="form-select" id="shiftShedule" required>
                                    <option selected disabled value="">Choose...</option>
                                </select>
                                <div class="invalid-feedback">
                                    Please select a Shift Shedule.
                                </div>`)
        $('#shiftShedule').select2({
            data: shiftShedule,
            dropdownParent: $('#shiftModal .modal-body'),
            width: '100%',
        })
    } else {
        $('.d_none').html('')
    }
})

$(document).on('click', '.editBtn', function (event) {
    $('#shiftModal').modal('show')
    submit = false
    let rowData = tbl.row($(event.target).closest('tr')).data()
    updateId = rowData.id
    console.log(rowData.id);

    for (let key in rowData) {
        $('#candidateForm').find(`input[name=${key}]`).val(rowData[key])
    }
    $('#candidateForm').find('select[name=shift]').val(rowData.shift.id).trigger('change')
    $('#candidateForm').find('select[name=shiftShedule]').val(rowData.shiftShedule.id).trigger('change')
    $('#candidateForm').removeClass('was-validated')
})

function FindIndex(array, name) {
    return array.findIndex(el => el.name == name)
}

function getData() {
    let obj = $('#candidateForm').serializeArray().reduce((acc, el) => {
        el.name == 'shift' ? acc[el.name] = shift[el.value]
            : el.name == 'shiftShedule' ? acc[el.name] = shiftShedule[el.value]
                : acc[el.name] = el.value
        return acc
    }, { id: id, shiftShedule: { id: '-1', text: '-' } })

    console.log(obj);
    console.log($('#candidateForm').serializeArray())
    return obj
}
