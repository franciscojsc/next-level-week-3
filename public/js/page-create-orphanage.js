const options = {
  dragging: false,
  touchZoom: false,
  doubleClickZoom: false,
  scrollWheelZoom: false,
  zoomControl: false,
};

// create map
const map = L.map('mapid', options).setView([-27.222633, -49.6455874], 15);

// create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// create icon
const icon = L.icon({
  iconUrl: '/images/map-marker.svg',
  iconSize: [58, 68],
  iconAnchor: [29, 68],
});

let marker;

// create and add marker
map.on('click', function (event) {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector('[name=lat]').value = lat;
  document.querySelector('[name=lng]').value = lng;

  // remove icon
  marker && map.removeLayer(marker);

  // add icon layer
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

// add field photos
function addPhotoField() {
  // get the container of photos #images
  const container = document.querySelector('#images');
  // get the container to duplicate .new-upload
  const fieldsContainer = document.querySelectorAll('.new-upload');
  // perform the clone of last image create
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);
  // check if the field is clear, if yes, no add to container of image
  const input = newFieldContainer.children[0];

  if (input.value == '') {
    return;
  }
  // clear the field before of add to container of image
  input.value = '';
  // add the clone to container of #images
  container.appendChild(newFieldContainer);
}

function deleteField(event) {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll('.new-upload');

  if (fieldsContainer.length < 2) {
    // clear the value of field
    span.parentNode.children[0].value = '';
    return;
  }

  // delete the field
  span.parentNode.remove();
}

// select yes or no
function toggleSelect(event) {
  // remove the class .active (the buttons)
  document.querySelectorAll('.button-select button').forEach(function (button) {
    button.classList.remove('active');
  });

  // add the class .active in that button clicked
  const button = event.currentTarget;
  button.classList.add('active');

  // update the my input hidden with the value selected
  const input = document.querySelector('[name="open_on_weekends"]');

  input.value = button.dataset.value;
}
