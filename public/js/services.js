$(document).ready(function () {
    retrieveServices()
    retrievecategories()
});

function retrievecategories() {
    request = $.ajax({
        url: "/categories",
        type: "GET",
        contentType: "application/json",
    });

    request.done(function (response, textStatus, jqXHR) {
        let categorySelectBox = document.getElementById('category');
        for (let i = 0; i < response.length; i++) {
            let option = document.createElement("option");
            option.value = response[i]._id;
            option.innerHTML = response[i].title;
            categorySelectBox.append(option);
        }
    });

    request.fail(function (jqXHR, textStatus, errorThrown) {

        console.error(
            "The following error occurred: " +
            textStatus, errorThrown
        );

    });
}

function retrieveServices() {
    request = $.ajax({
        url: "/services",
        type: "GET",
        contentType: "application/json",
    });

    request.done(function (response, textStatus, jqXHR) {
        populate(response)
    });

    request.fail(function (jqXHR, textStatus, errorThrown) {

        console.error(
            "The following error occurred: " +
            textStatus, errorThrown
        );

        $('#services-table-body').html("<tr><td colspan='7'>" + jqXHR.responseJSON.message + "</td></tr>")


    });
}

function populate(data) {
    let container = $('#services-table-body');
    container.html("");
    for (let i = 0; i < data.length; i++) {
        let row = document.createElement('tr');
        row.setAttribute('class', 'text-center');
        let col1 = document.createElement('th');
        col1.setAttribute('span', 'row');
        let col2 = document.createElement('td');
        let col3 = document.createElement('td');
        let col4 = document.createElement('td');
        let col5 = document.createElement('td');
        let col6 = document.createElement('td');
        let col7 = document.createElement('td');
        let col8 = document.createElement('td');
        let col9 = document.createElement('td');
        let img = document.createElement('img');
        // img.src = 
        let icon2 = document.createElement('i');
        let icon3 = document.createElement('i');
        col1.innerHTML = i + 1;
        col2.innerHTML = data[i].title;
        col3.innerHTML = data[i].tag;
        col4.innerHTML = data[i].price;
        col5.innerHTML = data[i].price_for;
        // col6.append("");
        let created_at = new Date(data[i].created_at).toDateString()
        let updated_at = new Date(data[i].updated_at).toDateString()
        col7.innerHTML = created_at;
        col8.innerHTML = updated_at;
        icon2.setAttribute('class', 'delete-icon fas fa-trash');
        icon2.addEventListener('click', function () {
            deletePopup(data[i]._id, data[i].title);
        });

        icon3.setAttribute('class', 'edit-icon fas fa-edit');
        icon3.addEventListener('click', function () {
            updatePopup(data[i]._id, data[i].title, data[i].tag, data[i].icon, data[i].price, data[i].price_for);
        });
        col9.append(icon2, icon3);
        row.append(col1, col2, col3, col4, col5, col6, col7, col8, col9);
        container.append(row);
    }

}

function deletePopup(id, title) {

    $('#delete-modal').modal('show');
    $('#delete-modal-body').text('Do you want to delete service "' + title + '"');
    $('#delete').on('click', function () {
        deleteServices(id);
    })
}

function updatePopup(id, title, tag, icon, price, price_for) {
    $('#id').val(id);
    $('#title_edit').val(title);
    $('#tag_edit').val(tag);
    $('#icon_edit').val(icon);
    $('#price_edit').val(price);
    $('#price_for_edit').val(price_for);
    $('#edit-modal').modal('show');
}

function deleteServices(id) {
    request = $.ajax({
        url: "/services/" + id,
        type: "DELETE",
        contentType: "application/json",
    });

    request.done(function (response, textStatus, jqXHR) {
        retrieveServices();
    });

    request.fail(function (jqXHR, textStatus, errorThrown) {

        console.error(
            "The following error occurred: " +
            textStatus, errorThrown, jqXHR.responseJSON.message
        );

    });
}

$("#title").on('keyup', function () {
    if ($(this).val() == "") {
        $('#tag').val("");
    }
    else {
        let val = $(this).val().toLowerCase();
        val = val.replaceAll(" services", "");
        val = val.replaceAll(' ', '-');
        $('#tag').val(val);
    }
})

$("#title_edit").on('keyup', function () {
    if ($(this).val() == "") {
        $('#tag_edit').val("");
    }
    else {
        let val = $(this).val().toLowerCase();
        val = val.replaceAll(" services", "");
        val = val.replaceAll(' ', '-');
        $('#tag_edit').val(val);
    }
})

$("#add-form").on('submit', (function (event) {

    var eForm = $(this);
    if (eForm[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    } else {


        event.preventDefault();
        var request;

        if (request) {
            request.abort();
        }
        var $form = $(this);
        var $inputs = $form.find("input");
        let title = $('#title').val();
        let tag = $('#tag').val();
        let icon = $('#icon').val();
        let price = $('#price').val();
        let price_for = $('#price_for').val();
        let category = $('#category').val();
        $inputs.prop("disabled", true);

        request = $.ajax({
            url: "/services",
            type: "POST",
            data: JSON.stringify({
                title: title,
                tag: tag,
                icon: icon,
                price: price,
                price_for: price_for,
                category: category
            }),
            contentType: "application/json",
        });

        request.done(function (response, textStatus, jqXHR) {
            $inputs.prop("disabled", false);
            $form.trigger("reset");
            $('#add-modal').modal('hide');
            retrieveServices();

        });

        request.fail(function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseJSON);
            console.error(
                "The following error occurred: " +
                textStatus, errorThrown
            );
            $('#error1').text(jqXHR.responseJSON.message);
            $inputs.prop("disabled", false);

        });

    }
    eForm.addClass('was-validated');
})
);

$("#edit-form").on('submit', (function (event) {

    var eForm = $(this);
    if (eForm[0].checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
    } else {


        event.preventDefault();
        var request;

        if (request) {
            request.abort();
        }
        var $form = $(this);
        var $inputs = $form.find("input");
        let id = $('#id').val()
        let title = $('#title_edit').val();
        let tag = $('#tag_edit').val();
        let icon = $('#icon_edit').val();
        let price = $('#price_edit').val();
        let price_for = $('#price_for_edit').val();
        $inputs.prop("disabled", true);

        request = $.ajax({
            url: "/services/" + id,
            type: "PATCH",
            data: JSON.stringify({
                title: title,
                tag: tag,
                icon: icon,
                price: price,
                price_for: price_for,
                updated_at: Date()
            }),
            contentType: "application/json",
        });

        request.done(function (response, textStatus, jqXHR) {
            $inputs.prop("disabled", false);
            $form.trigger("reset");
            $('#edit-modal').modal('hide');
            retrieveServices();

        });

        request.fail(function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR.responseJSON);
            console.error(
                "The following error occurred: " +
                textStatus, errorThrown
            );
            $('#error2').text(jqXHR.responseJSON.message);
            $inputs.prop("disabled", false);

        });

    }
    eForm.addClass('was-validated');
})
);