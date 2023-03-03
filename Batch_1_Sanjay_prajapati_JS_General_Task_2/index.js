var id = 1;
function Employee(id, name, age, designation) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.designation = designation;
};

$('#data-Table').DataTable({
    "bPaginate": false,
    "info": false,
    data: [
        new Employee(id, "Tiger Nixon", "System Architect", "$3,120", "Edinburgh"),
        new Employee(id, "Garrett Winters", "Director", "$5,300", "Edinburgh")
    ],
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

(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            document.getElementById("save").addEventListener('click', function (event) {

                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                    $('#myModal').on('data-bs-dismiss', function (e) {
                        e.preventDefault()
                    })
                } else {
                    event.target.setAttribute("data-bs-dismiss", "modal");
                }

                form.classList.add('was-validated')
            }, false)
        })
})()