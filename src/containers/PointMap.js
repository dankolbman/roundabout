import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {fetchTripLineString} from '../actions/LineStringActions';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

class PointMap extends Component {
  componentWillReceiveProps(nextProps) {
    const tripId = this.props.match.params.tripId;
    if (nextProps.match.params.tripId !== tripId) {
      this.props.fetchData(nextProps.match.params.tripId, this.map);
    }
  }

  componentDidMount() {
    this.renderMap();
    const {tripId = 3} = this.props.match.params;
    if (!(tripId in this.props.lineStrings)) {
      this.props.fetchData(tripId, this.map);
    }
  }

  renderMap() {
    const {tripId = 3} = this.props.match.params;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
    });

    // Load event
    this.map.on('load', () => {
      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.scrollZoom.disable();

      const {
        geoJSON = {type: 'LineString', coordinates: []},
      } = this.props.lineStrings[tripId];

      this.map.addSource('route', {
        type: 'geojson',
        data: geoJSON,
      });

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

      new mapboxgl.Marker(startFlag)
        .setLngLat(geoJSON['coordinates'][0])
        .addTo(this.map);

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
        .setLngLat(geoJSON['coordinates'][geoJSON['coordinates'].length - 1])
        .addTo(this.map);

      this.map.addLayer(
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
    this.map.on('sourcedata', ev => {
      const {tripId = 3} = this.props.match.params;
      if (
        ev.isSourceLoaded &&
        ev.sourceId === 'route' &&
        ev.sourceDataType !== 'metadata' &&
        this.map.getSource('route') &&
        this.map.isSourceLoaded('route') &&
        this.props.lineStrings[tripId].geoJSON !== undefined
      ) {
        const {
          geoJSON = {type: 'LineString', coordinates: [[0.0, 0.0]]},
        } = this.props.lineStrings[tripId];

        var bounds = geoJSON.coordinates.reduce(function(bounds, coord) {
          return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(
          geoJSON.coordinates[0],
          geoJSON.coordinates[0],
        ));

        this.map.fitBounds(bounds, {
          padding: 100,
        });
      }
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      width: '100%',
    };
    return (
      <div className="Map" style={style} ref={el => (this.mapContainer = el)} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: (tripId, map) => dispatch(fetchTripLineString(tripId, map)),
  };
}

function mapStateToProps(state) {
  return {
    lineStrings: state.lineStrings,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(PointMap));
