import React, {useEffect, useRef} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {withRouter} from 'react-router';
import {TRIP} from '../queries';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const PointMap = props => {
  const mapContainer = useRef(null);

  const {loading, error, data} = useQuery(TRIP, {
    variables: {tripId: props.match.params.tripId},
  });

  const geoJSON = data && data.trip.geoJSON;

  useEffect(() => {
    geoJSON && renderMap();
  });

  const renderMap = () => {
    const {tripId = 3} = props.match.params;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v9',
    });

    const {
      geometry: {coordinates},
    } = geoJSON;

    // Load event
    map.on('load', () => {
      map.addControl(new mapboxgl.NavigationControl());
      map.scrollZoom.disable();

      map.addSource('route', {
        type: 'geojson',
        data: geoJSON,
      });

      if (coordinates.length > 0) {
        // Begin/end markers
        var startFlag = document.createElement('div');
        startFlag.className = 'marker';
        startFlag.style.backgroundImage =
          'url(https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/master/black/png/32/flag-o.png)';
        startFlag.style.backgroundSize = 'contain';
        startFlag.style.width = '24px';
        startFlag.style.height = '24px';
        startFlag.style.position = 'relative';
        startFlag.style.top = '-8px';
        startFlag.style.left = '8px';
        new mapboxgl.Marker(startFlag).setLngLat(coordinates[0]).addTo(map);

        var endFlag = document.createElement('div');
        endFlag.className = 'marker';
        endFlag.style.backgroundImage =
          'url(https://raw.githubusercontent.com/encharm/Font-Awesome-SVG-PNG/master/black/png/32/flag-checkered.png)';
        endFlag.style.backgroundSize = 'contain';
        endFlag.style.width = '24px';
        endFlag.style.height = '24px';
        endFlag.style.position = 'relative';
        endFlag.style.top = '-24px';
        endFlag.style.left = '10px';
        new mapboxgl.Marker(endFlag)
          .setLngLat(
            geoJSON.geometry.coordinates[
              geoJSON.geometry.coordinates.length - 1
            ],
          )
          .addTo(map);
      }

      map.addLayer(
        {
          id: 'route',
          type: 'line',
          source: 'route',
          paint: {'line-color': '#c42847', 'line-width': 2},
        },
        'country-label-lg',
      );
    });

    // Zoom in on selected points when data changes
    map.on('sourcedata', ev => {
      const {tripId = 3} = props.match.params;
      if (
        ev.isSourceLoaded &&
        ev.sourceId === 'route' &&
        ev.sourceDataType !== 'metadata' &&
        map.getSource('route') &&
        map.isSourceLoaded('route')
      ) {
        var bounds = coordinates.reduce(function(bounds, coord) {
          return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        map.fitBounds(bounds, {
          padding: 100,
        });
      }
    });
  };

  const style = {
    width: '100%',
  };
  return <div className="Map" style={style} ref={mapContainer} />;
};

export default withRouter(PointMap);
