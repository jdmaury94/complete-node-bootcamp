console.log('Hello from the client side!')


export const displayMap = (locations)=>{
    mapboxgl.accessToken = 'pk.eyJ1IjoiamRtYXVyeSIsImEiOiJjazVpZHZkN2EwZGw0M2ttdGsyY3cweGx2In0.zccWUR2rZzKLA_X687oKkQ';

    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/jdmaury/ck5ies5090xgv1iql6xzavqq9',
        scrollZoom:false
        //center: [-118.113491,34.111745],
        //zoom: 4
    });

    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach(loc => {
        //Create marker
        const el = document.createElement('div');
        el.className = 'marker';

        //Add marker
        new mapboxgl.Marker({
            element:el,
            anchor:'bottom'
        })
        .setLngLat(loc.coordinates)
        .addTo(map);

        //Add popup
        new mapboxgl.Popup({
            offset:30
        })
        .setLngLat(loc.coordinates)
        .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
        .addTo(map);

        //Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds,{
        padding:{
            top:200,
            bottom:150,
            left:100,
            right:100
        }
    });
}

