import React, { Component } from 'react';
import { connect } from 'react-redux';
import { tripPointsFetchPage } from '../actions/get_points';
import { bindActionCreators } from 'redux';

class PointMap extends Component {

  componentDidMount() {
    this.props.fetchData('http://localhost:5000/api/points');
  }

	renderList() {
		return this.props.points.map( point=> {
			return (
				<li
					key={point.time}
					className="list-group-item">
					{point.time} {point.lat} {point.lon}
				</li>
			)
		})
	}

	render() {
		return (
			<ul className="list-group col-sm-4">
				{this.renderList()}
			</ul>
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
    points: state.points.items,
    isLoading: state.points.loading,
    error: state.points.error,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PointMap)
