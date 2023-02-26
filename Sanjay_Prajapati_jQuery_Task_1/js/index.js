var array = []
var index;
var regName = /^[a-zA-Z ]*$/;
var regNumber = /^(\d{1,2}|100)$/;

function getData() {
    array = []
    $("#addNewRowHere > tr").each(function () {
        if ($(this).attr('isaccepted') == 'yes') {
            let obj = new Object();
            obj.name = $(this).find('td').eq(0).children("input:first-child").val();
            obj.subject = $(this).find('td').eq(1).children("input:first-child").val();
            obj.mark = $(this).find('td').eq(2).children("input:first-child").val();
            obj.mark < 33 ? obj.result = "Fail" : obj.result = "Pass";
            array.push(obj);
        }
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
    validateTable()
})

$("#subBtn").on('click', function () {
    if (!validateTable()) {
        $("#mainErrShow").html("please enter all detail correct")
    } else {
        $("#mainErrShow").html("");
        $("#container2").show()
        $("#reportTblBody").html("");
        getData().forEach((item, index) => {
            let a = $(`<tr><td></td><td>${item.name}</td><td>${item.subject}</td><td>${item.mark}</td><td>${item.result}</td></tr>`).get(0);
            item.mark < 33 ? $(a).attr("class", "table-danger") : $(a).attr("class", "table-success");
            $("#reportTblBody").append(a);
        })
    }
})

function showNameError(tr, i, validate) {
    if (!regName.test(tr.find('td').eq(i).children("input:first-child").val()) || !(tr.find('td').eq(i).children("input:first-child").val().trim())) {
        tr.find('td').eq(i).children("input:first-child").attr("class", "form-control error")
        tr.find('td').eq(i).children("div.invalid").html("*Please enter text only value")
        return validate = false
    } else {
        tr.find('td').eq(i).children("input:first-child").attr("class", "form-control")
        tr.find('td').eq(i).children("div.invalid").html("")
    }
    return validate
}

function showNumberError(tr, validate) {
    if (!regNumber.test(parseInt(tr.find('td').eq(2).children("input:first-child").val()))) {
        tr.find('td').eq(2).children("input:first-child").attr("class", "form-control error")
        tr.find('td').eq(2).children("div.invalid").html("*Please enter valid marks(0-100)")
        return validate = false;
    } else {
        tr.find('td').eq(2).children("input:first-child").attr("class", "form-control")
        tr.find('td').eq(2).children("div.invalid").html("")
    }
    return validate
}

function validateTable() {
    let validate = true;
    $("#addNewRowHere > tr").each(function () {
        validate = showNameError($(this), 0, validate);
        $(this).find('td').eq(0).children("input:first-child").keyup(() => showNameError($(this), 0))
        validate = showNameError($(this), 1, validate);
        $(this).find('td').eq(1).children("input:first-child").keyup(() => showNameError($(this), 1))
        validate = showNumberError($(this), validate);
        $(this).find('td').eq(2).children("input:first-child").keyup(() => showNumberError($(this), 2))
    })
    return validate;
}

$('.timer').startTimer({
    onComplete: function () {
        $('#timerModal').modal({
            backdrop: 'static',
            keyboard: false
        })
        $('#timerModal').modal('show');

        $("#timerModal").on("click", "#okBtn", function () {
            $('.timer').empty()
            $('.timer').startTimer()
        })
    }
});

$(document).on('click','.btnPF', function () {
    if ($(this).attr('class') == "btn btn-outline-success me-2 btnPF") {
        $(this).attr('class', 'btn btn-success me-2 btnPF')
        $(this).next().attr('class', 'btn btn-outline-danger btnPF')
        $(this).closest('tr').attr('isAccepted', 'yes')
    }
    if ($(this).attr('class') == "btn btn-outline-danger btnPF") {
        $(this).attr('class', 'btn btn-danger btnPF')
        $(this).prev().attr('class', 'btn btn-outline-success me-2 btnPF')
        $(this).closest('tr').attr('isAccepted', 'no')
    }

})