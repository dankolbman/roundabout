import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tripPointsFetchPage } from '../actions/get_points';
import { bindActionCreators } from 'redux';
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

class PointMap extends Component {

  componentDidMount() {
    this.props.fetchData(`${process.env.REACT_APP_API}/trips/1/linestring`);

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v10'
    });

    this.map.on('load', () => {
      this.map.addSource('route', {
        type: 'geojson',
        data: this.props.lineString
      });

      if (this.props.lineString.coordinates) {
        var bounds = this.props.lineString.coordinates.reduce(function(bounds, coord) {
          return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(
          this.props.lineString.coordinates[0],
          this.props.lineString.coordinates[0]));

        this.map.fitBounds(bounds, {
          padding: 100
        });
      }

      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route'
      }, 'country-label-lg');

      this.map.addControl(new mapboxgl.NavigationControl());
      this.map.scrollZoom.disable();
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%'
    };
    return (
      <div style={style} ref={el => this.mapContainer = el} />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: (url) => dispatch(tripPointsFetchPage(url))
  };
}

function mapStateToProps(state) {
  return {
    lineString: state.points.geoJSON,
    isLoading: state.points.loading,
    error: state.points.error,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PointMap)
