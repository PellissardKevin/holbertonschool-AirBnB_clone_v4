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
    type: "POST",
    url: "http://0.0.0.0:5001/api/v1/places_search",
    contentType: "application/json",
    data: JSON.stringify({}),
    success: function (data) {
      data.forEach(function (place) {
        const article = $("<article>").addClass("place");
        const name = $("<h2>").text(place.name);
        const price = $("<div>")
          .addClass("price_by_night")
          .text("$" + place.price_by_night);
        const description = $("<div>")
          .addClass("description")
          .text(place.description);
        const guest = $("<div>")
          .addClass("max_guest")
          .text(place.max_guest + " Guest(s)");
        const rooms = $("<div>")
          .addClass("number_rooms")
          .text(place.number_rooms + " Room(s)");
        const bathrooms = $("<div>")
          .addClass("number_bathrooms")
          .text(place.number_bathrooms + " Bathroom(s)");
        const amenities = $("<div>").addClass("amenities");

        place.amenities.forEach(function (amenity) {
          const amenityDiv = $("<div>").addClass("amenity").text(amenity);
          amenities.append(amenityDiv);
        });

        article.append(
          name,
          price,
          description,
          guest,
          rooms,
          bathrooms,
          amenities
        );
        $(".places").append(article);
      });
    },
  });

  $.get("http://0.0.0.0:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $("#api_status").addClass("available");
    } else {
      $("#api_status").removeClass("available");
    }
  });
});
