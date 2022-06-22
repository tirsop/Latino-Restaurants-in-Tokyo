mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [139.7038, 35.6620],
  zoom: 11
});

map.addControl(new mapboxgl.NavigationControl());

restaurants.forEach((restaurant) => {
  const el = document.createElement('div');
  el.innerHTML = "🇪🇸"
  el.style.fontSize = "20px"
  new mapboxgl.Marker(el)
    .setLngLat(restaurant.geometry.coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 23 })
        .setHTML(`
        <div class="map-popup">
          <img src=${restaurant.image} class="img-fluid rounded-2 rest-img-popup" alt="Restaurant's front door" />
          <h5 class="mt-2 mb-0 text-center">${restaurant.name}</h3>
          <p class="m-0 text-center text-muted">${restaurant.location}</p>
        </div>
      `)
    )
    .addTo(map);
});
