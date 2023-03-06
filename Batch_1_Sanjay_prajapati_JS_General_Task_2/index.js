var id = 1;
var regName = /^[a-zA-Z ]*$/;
var regNumber = /^(\d{1,2}|100)$/;

function Employee(id, name, age, designation) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.designation = designation;
};

var dataTbl = $('#data-Table').DataTable({
    "bPaginate": false,
    "info": false,
    columns: [
        {
            data: 'id',
            title: "No"
        },
        {
            data: 'name',
            title: "Name"
        },
        {
            data: 'age',
            title: "Age"
        },
        {
            data: 'designation',
            title: "Designation"
        },
    ],
});
function validate() {
    let flag = true;
    if (!regName.test($('#myForm').find('input').eq(0).val()) || !($('#myForm').find('input').eq(0).val().trim())) {
        $('#nameErr').html("*Please enter text only value")
        flag = false;
    } else {
        $('#nameErr').html("")
    }
    if (!regNumber.test($('#myForm').find('input').eq(1).val()) || !($('#myForm').find('input').eq(1).val().trim())) {
        $('#ageErr').html("*Please enter number between 20 to 100")
        flag = false;
    } else {
        $('#ageErr').html("")
    }
    if (!regName.test($('#myForm').find('input').eq(2).val()) || !($('#myForm').find('input').eq(2).val().trim())) {
        $('#degErr').html("*Please enter text only value")
        flag = false;
    } else {
        $('#degErr').html("")
    }

    return flag
}

var id = 1

$('#subBtn').on('click', function () {
    if (validate()) {

        $('#exampleModal').modal('hide')

        dataTbl.row.add(new Employee(id, $('#myForm').find('input').eq(0).val(), $('#myForm').find('input').eq(1).val(), $('#myForm').find('input').eq(2).val())).draw(false);

        $('#myForm').get(0).reset()
        id++;
    } else {
        //$('#exampleModal').modal('hide')
    }
})