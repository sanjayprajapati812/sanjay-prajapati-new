var array = []
var id = 1
var index;

$(document).ready(function () {
    $("#addNewRowHere > tr").each(function () {
        let obj = new Object()
        obj.id = id
        obj.name = $(this).find('td').eq(0).children("input:first-child").val();
        obj.subject = $(this).find('td').eq(1).children("input:first-child").val();
        obj.mark = $(this).find('td').eq(2).children("input:first-child").val();
        array.push(obj)
        id++
    });

    $("#addNewBtn").click(function () {
        let node = document.createElement("tr")
        node.innerHTML = $("#addNewRowHere").find('tr').eq(0).prop('outerHTML');
        node.cells[5].children[0].setAttribute("class", "btn btn-danger removeBtn d_flex margin_top2");
        $("#addNewRowHere").append(node);
    });

    $("#removeRow").click(function () {
        $("#addNewRowHere").find("tr").eq(index).remove();
    })
});

$(document).on('click', '.removeBtn', function () {
    index = $(this).closest("tr").index()
})

