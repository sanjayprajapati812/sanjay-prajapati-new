var array = []
var index;
var regName = /^[a-zA-Z ]*$/;
var regNumber = /^(\d{1,2}|100)$/;
var node = $("#addNewRowHere").find('tr').eq(0).prop('outerHTML').replace("d-none", "btn btn-danger removeBtn d_flex margin_top2");

//get data from input feild and save to ARRAY OF OBJECTS...
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

//add and remove row...
$("#addNewBtn").click(function () {
    $("#addNewRowHere").append(node);
});

$("#removeRow").click(function () {
    array.splice(index, 1);
    $("#addNewRowHere").find("tr").eq(index).remove();
})

$(document).on('click', '.removeBtn', function () {
    index = $(this).closest("tr").index();
})

//add random data...
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

// Validation.....
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

//Timer....
$('.timer').attr("data-minutes-left", 10)

$('.timer').startTimer({
    onComplete: function () {
        $('#timerModal').modal({
            backdrop: 'static',
            keyboard: false
        })
        $('#timerModal').modal('show');
        $('body').addClass('background')
        $('.container').addClass("animation")

        $("#timerModal").on("click", "#okBtn", function () {
            $('.timer').empty()
            $('.timer').startTimer()
            $('body').removeClass('background')
            $('.container').removeClass("animation")
        })
    }
});

//Accept and reject button....
$(document).on('click', '.btnPF', function () {
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

//sorting....
function comparer(index) {
    return function (a, b) {
        let valA = getCellValue(a, index), valB = getCellValue(b, index)
        return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
    }
}
function getCellValue(row, index) { return $(row).children('td').eq(index).text() }

$('.rounded-circle').click(function () {
    let table = $(this).parents('table').eq(0)
    let rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).parents('th').index()))
    $(this).find("i").attr('class', 'bi bi-sort-alpha-down-alt')
    this.asc = !this.asc
    if (!this.asc) { rows = rows.reverse(); $(this).find("i").attr('class', 'bi bi-sort-alpha-down') }
    for (var i = 0; i < rows.length; i++) { table.append(rows[i]) }
})

//searching...
$("#searchInput").on("keyup", function () {
    let inputStr = $(this).val().toUpperCase();
    $("#reportTblBody>tr").each(function () {
        let td1Str = $(this).find("td").eq(1).text().toUpperCase();
        let td2Str = $(this).find("td").eq(2).text().toUpperCase();
        let td3Str = $(this).find("td").eq(4).text().toUpperCase();
        if (td1Str.includes(inputStr) || td2Str.includes(inputStr) || td3Str.includes(inputStr)) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });
});

//Persentage Table....
function findOccTotalMark(arr) {
    let persentageArray = [];
    arr.forEach((x) => {
        if (persentageArray.some((val) => { return val.name.toUpperCase() == x.name.toUpperCase() })) {
            persentageArray.forEach((k) => {
                if (k.name.toUpperCase() === x.name.toUpperCase()) {
                    k["occurence"]++
                    k["totalMark"] += parseInt(x.mark);
                }
            })
        } else {
            let a = {};
            a.name = x.name;
            a["occurence"] = 1;
            a["totalMark"] = parseInt(x.mark);
            persentageArray.push(a);
        }
    })
    return persentageArray;
}

//generate Report Table and Percentage Table both.....
$("#subBtn").on('click', function () {
    if (!validateTable()) {
        $("#mainErrShow").html("please enter all detail correct")
    } else {
        $("#container2").show();
        $("#mainErrShow").html("");
        $("#reportTblBody").html("");
        $("#percentageTblBody").html("");
        getData().forEach((item) => {
            let a = $(`<tr><td></td><td>${item.name}</td><td>${item.subject}</td><td>${item.mark}</td><td>${item.result}</td></tr>`).get(0);
            item.mark < 33 ? $(a).attr("class", "table-danger") : $(a).attr("class", "table-success");
            $("#reportTblBody").append(a);
        })
        findOccTotalMark(getData()).forEach((item) => {
            let persentage = (parseInt(item.totalMark) / parseInt(item.occurence)).toFixed(2)
            let a = $(`<tr><td></td><td>${item.name}</td><td>${persentage}%</td><td>${persentage < 33 ? "Fail" : "Pass"}</td></tr>`).get(0);
            persentage < 33 ? $(a).attr("class", "table-danger") : $(a).attr("class", "table-success");
            $("#percentageTblBody").append(a);
        })
    }
})