$(document).ready(function () {
    retrievecategories()
});

function retrievecategories() {
    request = $.ajax({
        url: "/categories",
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

        $('#categories-table-body').html("<tr><td colspan='7'>" + jqXHR.responseJSON.message + "</td></tr>")


    });
}

function populate(data) {
    let container = $('#categories-table-body');
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
        let icon1 = document.createElement('i');
        let icon2 = document.createElement('i');
        let icon3 = document.createElement('i');
        col1.innerHTML = i + 1;
        col2.innerHTML = data[i].title;
        col3.innerHTML = data[i].tag;
        icon1.setAttribute('class', data[i].icon + ' text-accent');
        col4.append(icon1);
        let created_at = new Date(data[i].created_at).toDateString()
        let updated_at = new Date(data[i].updated_at).toDateString()
        col5.innerHTML = created_at;
        col6.innerHTML = updated_at;
        icon2.setAttribute('class', 'delete-icon fas fa-trash');
        icon2.addEventListener('click', function () {
            deletePopup(data[i]._id, data[i].title);
        });

        icon3.setAttribute('class', 'edit-icon fas fa-edit');
        icon3.addEventListener('click', function () {
            updatePopup(data[i]._id, data[i].title, data[i].tag, data[i].icon);
        });
        col7.append(icon2, icon3);
        row.append(col1, col2, col3, col4, col5, col6, col7);
        container.append(row);
    }

}

function deletePopup(id, title) {

    $('#delete-modal').modal('show');
    $('#delete-modal-body').text('Do you want to delete category "' + title + '"');
    $('#delete').on('click', function () {
        deleteCategory(id);
    })
}

function updatePopup(id, title, tag, icon) {
    $('#id').val(id);
    $('#title_edit').val(title);
    $('#tag_edit').val(tag);
    $('#icon_edit').val(icon);
    $('#edit-modal').modal('show');
}

function deleteCategory(id) {
    request = $.ajax({
        url: "/categories/" + id,
        type: "DELETE",
        contentType: "application/json",
    });

    request.done(function (response, textStatus, jqXHR) {
        retrievecategories();
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
        $('#tag').val(val + "-services");
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
        $('#tag_edit').val(val + "-services");
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
        $inputs.prop("disabled", true);

        request = $.ajax({
            url: "/categories",
            type: "POST",
            data: JSON.stringify({
                title: title,
                tag: tag,
                icon: icon,
            }),
            contentType: "application/json",
        });

        request.done(function (response, textStatus, jqXHR) {
            $inputs.prop("disabled", false);
            $form.trigger("reset");
            $('#add-modal').modal('hide');
            retrievecategories();

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
        $inputs.prop("disabled", true);

        request = $.ajax({
            url: "/categories/" + id,
            type: "PATCH",
            data: JSON.stringify({
                title: title,
                tag: tag,
                icon: icon,
                updated_at: Date()
            }),
            contentType: "application/json",
        });

        request.done(function (response, textStatus, jqXHR) {
            $inputs.prop("disabled", false);
            $form.trigger("reset");
            $('#edit-modal').modal('hide');
            retrievecategories();

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