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
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    type: 'POST',
    data: JSON.stringify({}),
    headers: { 'Content-Type': 'application/json' },
    dataType: 'json',
    success: function (response) {
      for (let i = 0; i < response.length; i++) {
        $('.places').append('<article></article>');
        $('article:last').append('<div></div>');
        $('article:last div').addClass('title_box');
        $('.title_box:last').append('<h2>' + response[i].name + '</h2>');
        $('.title_box:last').append('<div></div>');
        $('.title_box:last div').addClass('price_by_night');
        $('.price_by_night:last').append('$' + response[i].price_by_night);
        $('article:last').append('<div></div>');
        $('article:last div:last').addClass('information');
        $('.information:last').append('<div></div>');
        $('.information:last div').addClass('max_guest');
        $('.max_guest:last').append(response[i].max_guest + ' Guest');
        $('.information:last').append('<div></div>');
        $('.information:last div:last').addClass('number_rooms');
        $('.number_rooms:last').append(response[i].number_rooms + ' Bedroom');
        $('.information:last').append('<div></div>');
        $('.information:last div:last').addClass('number_bathrooms');
        $('.number_bathrooms:last').append(response[i].number_bathrooms + ' Bathroom');
        $('article:last').append('<div></div>');
        $('article:last div:last').addClass('description');
        $('.description:last').append(response[i].description);
      }
    }
  });

  $.get("http://127.0.0.1:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
});
