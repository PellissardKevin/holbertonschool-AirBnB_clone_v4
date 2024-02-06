$(document).ready(() => {
	const amenityIds = {};
	$('input[type="checkbox"]').on('change', function () {
	  const amenityId = $(this).data('id');
	  const amenityName = $(this).data('name');

	  if ($(this).is(':checked')) {
		amenityIds[amenityId] = amenityName;
	  } else {
		delete amenityIds[amenityId];
	  }

	  let amenityList = Object.values(amenityIds).join(', ');
	  const longueurMax = 35;
	  if (amenityList.length > longueurMax) {
		amenityList = `${amenityList.substring(0, longueurMax)}...`;
	  }
	  $('.amenities > h4').text(amenityList);
	});
  });

  $(document).ready(() => {
	$.ajax({
		url: 'http://0.0.0.0:5000/api/v1/status/',
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

  $(document).ready(() => {
	$.ajax({
		url: 'http://0.0.0.0:5001/api/v1/places_search/',
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

  $(document).ready(function() {
  fetch('http://127.0.0.1:5001/api/v1/places_search/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
  .then(response => response.json())
  .then(data => {
    for (let i = 0; i < data.length; i++) {
      let place = data[i];
      let article = $(
        `<article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
          </div>
          <div class="description">
            ${place.description}
          </div>
        </article>`
      );
      $('section.places').append(article);
    }
  });
});




$(document).ready(() => {
    const amenityIds = {};

    // Gestion des cases à cocher et mise à jour de la liste des équipements
    $('input[type="checkbox"]').on('change', function () {
        const amenityId = $(this).data('id');
        const amenityName = $(this).data('name');

        if ($(this).is(':checked')) {
            amenityIds[amenityId] = amenityName;
        } else {
            delete amenityIds[amenityId];
        }

        let amenityList = Object.values(amenityIds).join(', ');
        const longueurMax = 35;
        if (amenityList.length > longueurMax) {
            amenityList = `${amenityList.substring(0, longueurMax)}...`;
        }
        $('.amenities > h4').text(amenityList);
    });

    // Vérification de la disponibilité de l'API
    $.ajax({
        url: 'http://0.0.0.0:5000/api/v1/status/',
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

    // Recherche de lieux lors du clic sur le bouton
    $('button').click(() => {
        fetch('http://127.0.0.1:5001/api/v1/places_search/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amenities: Object.keys(amenityIds)
            })
        })
        .then(response => response.json())
        .then(data => {
            $('section.places').empty();
            for (let i = 0; i < data.length; i++) {
                let place = data[i];
                let article = $(
                    `<article>
                      <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">$${place.price_by_night}</div>
                      </div>
                      <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest != 1 ? 's' : ''}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms != 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms != 1 ? 's' : ''}</div>
                      </div>
                      <div class="description">
                        ${place.description}
                      </div>
                    </article>`
                );
                $('section.places').append(article);
            }
        });
    });
});
