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
  iconUrl: './public/images/map-marker.svg',
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

// create marker
L.marker([-27.222633, -49.6455874], { icon: icon }).addTo(map);

/* image gallery */

function selectImage(event) {
  const button = event.currentTarget;

  // remove all class .active
  const buttons = document.querySelectorAll('.images button');
  buttons.forEach(removeActiveClass);

  function removeActiveClass(button) {
    button.classList.remove('active');
  }

  // select image click
  const image = button.children[0];
  const imageContainer = document.querySelector('.orphanage-details > img');

  // update container image
  imageContainer.src = image.src;

  // add class .active
  button.classList.add('.active');
}
