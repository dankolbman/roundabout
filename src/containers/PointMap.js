import React, {Component} from 'react';
import {connect} from 'react-redux';
import {tripPointsFetchPage} from '../actions/get_points';
import {fetchTripLineString} from '../actions/LineStringActions';
import {bindActionCreators} from 'redux';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

class PointMap extends Component {
  componentWillReceiveProps(nextProps) {
    const tripId = this.props.match.params.tripId;
    if (nextProps.match.params.tripId != tripId) {
      this.props.fetchData(nextProps.match.params.tripId, this.map);
    }
  }

  componentDidMount() {
    const tripId = this.props.match.params.tripId;
    this.renderMap();
    if (!(tripId in this.props.lineStrings)) {
      this.props.fetchData(tripId, this.map);
    }
  }

  renderMap() {
    const tripId = this.props.match.params.tripId;

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/light-v9',
    });

    // Load event
    this.map.on('load', () => {
      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.scrollZoom.disable();

      this.map.addSource('route', {
        type: 'geojson',
        data: this.props.lineStrings[tripId].geoJSON,
      });

      this.map.addLayer(
        {
          id: 'route',
          type: 'line',
          source: 'route',
          paint: {'line-color': '#de3c4b', 'line-width': 2},
        },
        'country-label-lg',
      );
    });

    // Zoom in on selected points when data changes
    this.map.on('sourcedata', ev => {
      if (ev.isSourceLoaded) {
        const tripId = this.props.match.params.tripId;
        var bounds = this.props.lineStrings[tripId].geoJSON.coordinates.reduce(
          function(bounds, coord) {
            return bounds.extend(coord);
          },
          new mapboxgl.LngLatBounds(
            this.props.lineStrings[tripId].geoJSON.coordinates[0],
            this.props.lineStrings[tripId].geoJSON.coordinates[0],
          ),
        );

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
)(PointMap);
