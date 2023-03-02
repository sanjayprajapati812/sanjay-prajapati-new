$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://api.publicapis.org/entries",
        dataType: "json",
        success: function (data) {
            $('#totalRes').html(`total number of rows :- ${data.count}`)
            $('#spinner').hide()
            let theader = "<th>No</th>"
            let index = 1

            Object.keys(data.entries[0]).forEach((key) => {
                key != 'HTTPS' ? (theader += '<th>' + key + '</th>') : null
            })

            $('table').find('tr:first-child').html(theader)

            for (let element of data.entries) {
                let string = ''

                $('table').find('tbody').append(`<tr>
                <td>${index}</td>
                ${Object.keys(element).forEach((key) => {
                    key != 'HTTPS' ? (string += `<td> ${key=="Link" ? "<a href =" + element[key] + ">" + element[key] || "-" + "</a>" : '' + element[key] || '-' + ''}  </td>`) : null
                })}
                ${string}
                </tr>`)
                index++
            }
        }
    });
});
