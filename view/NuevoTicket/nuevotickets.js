function init() {
  $("#ticket_form").on("submit", function (e) {
    guardaryeditar(e);
  });
}

$(document).ready(function () {
  $("#tick_descrip").summernote({
    height: 150,
    lang: "es-ES",
    callbacks: {
      onImageUpload: function (image) {
        console.log("Image detect...");
        myimagetreat(image[0]);
      },
      onPaste: function (e) {
        console.log("Text detect...");
      },
    },
    toolbar: [
      ["style", ["bold", "italic", "underline", "clear"]],
      ["font", ["strikethrough", "superscript", "subscript"]],
      ["fontsize", ["fontsize"]],
      ["color", ["color"]],
      ["para", ["ul", "ol", "paragraph"]],
      ["height", ["height"]],
    ],
  });

  $.post("../../controller/categoria.php?op=combo", function (data, status) {
    $("#cat_id").html(data);
  });
});

function guardaryeditar(e) {
  e.preventDefault();
  var formData = new FormData($("#ticket_form")[0]);
  var categoria = document.getElementById("cat_id");
  if (
    $("#tick_descrip").summernote("isEmpty") ||
    $("#tick_titulo").val() == ""
  ) {
    swal("Advertencia!", "Campos Vacios", "warning");
  } else {
    if (categoria.value == 0 || categoria.value == "") {
      swal("Advertencia!", "Seleccione una categoria", "warning");
    } else {
      var totalfiles = $("#fileElem").val().length;
      for (var i = 0; i < totalfiles; i++) {
        formData.append("files[]", $("#fileElem")[0].files[i]);
      }

      $.ajax({
        url: "../../controller/ticket.php?op=insert",
        type: "POST",
        data: formData,
        contentType: false,
        processData: false,
        success: function (data) {
          console.log(data[0].tick_id);

          $.post(
            "../../controller/email.php?op=ticket_abierto",
            { tick_id: data[0].tick_id },
            function (data) {
              $("#ticket_form")[0].reset();
              $("#tick_descrip").summernote("reset");
              swal("Correcto!", "El Ticket fue enviado", "success");
            }
          );
        },
      });
    }
  }
}

init();
