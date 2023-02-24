var array = []
var index;

function getData() {
    array = []
    $("#addNewRowHere > tr").each(function () {
        let obj = new Object();
        obj.name = $(this).find('td').eq(0).children("input:first-child").val();
        obj.subject = $(this).find('td').eq(1).children("input:first-child").val();
        obj.mark = $(this).find('td').eq(2).children("input:first-child").val();
        obj.mark < 33 ? obj.result = "Fail" : obj.result = "Pass";
        array.push(obj)
    });
    return array
}

$("#addNewBtn").click(function () {
    let node = $("#addNewRowHere").find('tr').eq(0).prop('outerHTML').replace("d-none", "btn btn-danger removeBtn d_flex margin_top2");
    $("#addNewRowHere").append(node);
});

$("#removeRow").click(function () {
    array.splice(index, 1);
    $("#addNewRowHere").find("tr").eq(index).remove();
})

$(document).on('click', '.removeBtn', function () {
    index = $(this).closest("tr").index();
})

$("#addRandom").on('click', function () {
    const randomArray = [
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
    $("#addNewRowHere > tr").each(function () {
        let n = Math.floor(Math.random() * 11);
        $(this).find('td').eq(0).children("input:first-child").val(randomArray[n].name);
        $(this).find('td').eq(1).children("input:first-child").val(randomArray[n].subject);
        $(this).find('td').eq(2).children("input:first-child").val(randomArray[n].marks);
    });
})

$("#subBtn").on('click', function () {
    $("#reportTblBody").html("")
    getData().forEach((item, index) => {
        let a = $(`<tr><td>${index + 1}</td><td>${item.name}</td><td>${item.subject}</td><td>${item.mark}</td><td>${item.result}</td></tr>`).get(0);
        item.mark < 33 ? $(a).attr("class", "table-danger") : $(a).attr("class", "table-success");
        $("#reportTblBody").append(a);
    })
})










$(document).ready(function () {
    $('#myform').validate({ // initialize the plugin
        rules: {
            field1: {
                required: true,
                email: true
            },
            field2: {
                required: true,
                minlength: 5
            }
        }
    });

});