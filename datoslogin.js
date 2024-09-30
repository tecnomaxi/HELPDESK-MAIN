function init() {}

$(document).ready(function () {});

$(document).on("click", "#btnsoporte", function () {
  if ($("#rol_id").val() == 1) {
    $("#lbltitulo").html("Usuario Soporte");
    $("#btnsoporte").html("Usuario Cliente");
    $("#rol_id").val(2);
  } else {
    $("#lbltitulo").html("Usuario Cliente");
    $("#btnsoporte").html("Usuario Soporte");
    $("#rol_id").val(1);
  }
});

init();
