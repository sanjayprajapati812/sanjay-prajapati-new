function validate() {
    //'use strict'
    var forms = document.querySelector('.needs-validation')

    // Array.prototype.slice.call(forms)
    //     .forEach(function (form) {
    forms.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
        submitData(forms);
        forms.classList.add('was-validated');
    }, false)
    // })
}

validate()


// var id = 1
// var dataArray
// $(document).on('click', '#subBtn', (event) => {
//     let obj = $('#calForm').serializeArray().reduce((acc, element, array) => {
//         acc[element.name] = (element.name == 'num1' || element.name == 'num2') ? parseInt(element.value)
//             : (element.name == 'add') ? (parseInt(acc.num1) + parseInt(acc.num2))
//                 : (element.name == 'sub') ? (parseInt(acc.num1) - parseInt(acc.num2))
//                     : (element.name == 'mul') ? (parseInt(acc.num1) * parseInt(acc.num2))
//                         : (element.name == 'div') ? (parseInt(acc.num1) / parseInt(acc.num2))
//                             : element.value
//         return acc
//     }, { id: id })
//     id++
//     console.log(obj);
//     dataArray.push(obj);
// })


$(document).on('click', '#addNew', function () {
    actionBtn = 'create'
    $('#exampleModal').modal('show')
    $('#modalForm').get(0).reset()
    $('#modalForm').removeClass('was-validated')
    $('#exampleModal input').eq(2).removeAttr('checked')
})


var dataArray = [];
var id = 1;
var rowIndex;
var dataIndex;
var actionBtn;

function getData() {
    let data = $('#modalForm').serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    data.id = id
    console.log(data);
    return data
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
            data: 'name',
            title: 'Name'
        },
        {
            data: 'email',
            title: 'Email'
        },
        {
            data: 'dept',
            title: 'Department'
        },
        {
            title: 'Action',
            defaultContent: `<button class="me-2 updateBtn"><i class="bi bi-pencil-square"></i></button>
                            <button class="deleteBtn"><i class="bi bi-trash"></i></button>`

        }
    ]
});


$(document).on('click', '.deleteBtn', function () {
    let index = $(this).closest('tr').find('td:eq(0)').text()
    console.log(index);
    dataArray.findIndex(el => el.id === index)
    dataArray.splice(parseInt(dataArray.findIndex(el => el.id === index)), 1)
    dataTbl.clear().rows.add(dataArray).draw()
})


$(document).on('click', '.updateBtn', function () {
    actionBtn = 'update'
    $('#exampleModal').modal('show')
    var temp = dataTbl.row($(this).parents('tr')).data()

    $($('#exampleModal input').eq(0)).val(temp.name)
    $($('#exampleModal input').eq(1)).val(temp.email)
    $($('#exampleModal input').eq(2)).attr('checked', '')
    $($('#exampleModal select').eq(0)).val(temp.dept)

    dataIndex = $(this).parents('tr').find('td').eq(0).text()
    rowIndex = $(this).parents('tr').index()
    //console.log(rowIndex);
    //console.log(dataIndex);
})


function submitData(form) {
    if (form.checkValidity()) {
        let rowData = getData();
        if (actionBtn == 'create') {
            console.log(rowData);
            //console.log('create');
            dataArray.push(rowData)
            dataTbl.row.add(rowData).draw()
            id++
            flag = false;
        }
        if (actionBtn == 'update') {
            //console.log('update');
            let curRow = dataArray.find(element => element.id == dataIndex)
            curRow.name = rowData.name
            curRow.email = rowData.email
            curRow.dept = rowData.dept
            //console.log($('#dataTable>tbody>tr'));

            //dataTbl.row(rowIndex).invalidate().draw();
            dataTbl.clear().rows.add(dataArray).draw()
        }

        $('#exampleModal').modal('hide')
        return;
    }
}