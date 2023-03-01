$('#createTable').click(function () {
    let inputRow = $('#inputRow').val();
    let inputCol = $('#inputCol').val();
    $('#tbl').html('')
    for (let i = 1; i <= inputRow; i++) {
        let row = $('#tbl').append('<tr></tr>').children("tr:last-child").get(0);
        for (let j = 1; j <= inputCol; j++) {
            $(row).append(`<td>cell ${i + "," + j}</td>`)
        }
    }
})
