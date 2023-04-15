var id = 1
var dataArray = []

var currIndex;
//var regNum = /^[0-9]*$/
var submit = true

function getData() {
    let obj = $('#calForm').serializeArray().reduce((acc, element, array) => {
        acc[element.name] = (element.name == 'num1' || element.name == 'num2') ? parseInt(element.value)
            : (element.name == 'add') ? (parseInt(acc.num1) + parseInt(acc.num2))
                : (element.name == 'sub') ? (parseInt(acc.num1) - parseInt(acc.num2))
                    : (element.name == 'mul') ? (parseInt(acc.num1) * parseInt(acc.num2))
                        : (element.name == 'div') ? (parseInt(acc.num1) / parseInt(acc.num2))
                            : element.value

        return acc
    }, { id: id, num1: 0, num2: 0, add: '-', sub: '-', mul: '-', div: '-' })
    //console.log(obj);
    //dataArray.push(obj);

    return obj
}

function validation() {
    let flag = true
    $('#calForm').find('input[type=number]').each(function () {
        if (!($(this).val())) {
            flag = false
            $(this).next().show()
        } else {
            $(this).next('div').hide()
        }
    })
    return flag;
    //console.log($('#calForm').find('input[type=number]'));
}

var dataTbl = $('#dataTable').DataTable({
    "bPaginate": false,
    "info": false,
    data: dataArray,
    columns: [
        {
            data: 'id',
            title: 'No'
        },
        {
            data: 'num1',
            title: 'Number 1'
        },
        {
            data: 'num2',
            title: 'Number 2'
        },
        {
            data: 'add',
            title: 'Addition'
        },
        {
            data: 'sub',
            title: 'Substraction'
        },
        {
            data: 'mul',
            title: 'Multiplication'
        },
        {
            data: 'div',
            title: 'Division'
        },
        {
            title: 'Action',
            defaultContent: `<button class="me-2 updateBtn"><i class="bi bi-pencil-square"></i></button>
                            <button class="deleteBtn"><i class="bi bi-trash"></i></button>`
        }
    ]
})

function resetForm() {
    $('#calForm').find('input[type=checkbox]').each(function (index) {
        this.checked = false;
    })
    $('#calForm').get(0).reset()
}

$(document).on('click', '.updateBtn', (event) => {
    submit = false
    resetForm()
    currIndex = parseInt($(event.target).parents('tr').find('td').eq(0).text())
    $('#calModal').modal('show')
    let curObj = dataArray.find(e => {
        return e.id === currIndex
    })
    console.log(curObj)
    $('#calForm').find('input').each(function (index) {
        if (Object.keys(curObj)[index + 1] == 'num1' || Object.keys(curObj)[index + 1] == 'num2') {
            $(this).val(Object.values(curObj)[index + 1])
        } else if (Object.values(curObj)[index + 1] !== '-') {
            this.checked = true
        }
    })
    // $('#calForm').get(0).reset()
})



$(document).on('click', '#openModal', () => {
    submit = true
    resetForm()
})

$(document).on('click', '#subBtn', (event) => {
    if (validation()) {
        let rowData = getData();
        //console.log(rowData);
        if (submit) {
            dataArray.push(rowData)
            dataTbl.row.add(rowData).draw()
            id++

        } else {
            let curObj = dataArray.find(e => {
                return e.id === currIndex
            })


            curObj.num1 = rowData.num1
            curObj.num2 = rowData.num2
            curObj.add = rowData.add
            curObj.mul = rowData.mul
            curObj.sub = rowData.sub
            curObj.div = rowData.div

            dataTbl.clear().rows.add(dataArray).draw()
        }
        $('#calForm').get(0).reset()
        $('#calModal').modal('hide')
    }
})

$(document).on('click', '.deleteBtn', () => {

    let deleteIdx = dataArray.findIndex(e => {
        return e.id === parseInt($(event.target).parents('tr').find('td').eq(0).text())
    })

    dataArray.splice(deleteIdx,1)

    dataTbl.clear().rows.add(dataArray).draw()
})

