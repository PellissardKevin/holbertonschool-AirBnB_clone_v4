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

  $.ajax({
      url: 'http://127.0.0.1:5001/api/v1/status/',
      success(response) {
          if (response.status === 'OK') {
              $('#api_status').addClass('available');
          } else {
              $('#api_status').removeClass('available');
          }
      },
      error(error) {
          console.error('Error fetching API status', error);
      },
  });
});
