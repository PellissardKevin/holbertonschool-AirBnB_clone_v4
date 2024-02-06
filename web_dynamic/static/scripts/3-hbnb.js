$(document).ready(function () {
  const amenityIds = {};

  function updateAmenityList() {
    let amenityList = Object.values(amenityIds).join(", ");
    const maxLength = 35;
    if (amenityList.length > maxLength) {
      amenityList = amenityList.substring(0, maxLength) + "...";
    }
    $(".amenities > h4").text(amenityList);
  }

  $('input[type="checkbox"]').change(function () {
    const amenityId = $(this).data("id");
    const amenityName = $(this).data("name");

    if ($(this).is(":checked")) {
      amenityIds[amenityId] = amenityName;
    } else {
      delete amenityIds[amenityId];
    }

    updateAmenityList();
  });

  $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
});
