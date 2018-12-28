import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchTripMetric} from '../actions/MetricActions';
import {bindActionCreators} from 'redux';
import Stat from '../components/Stat';

class MetricContainer extends Component {
  componentDidMount() {
    const {tripId = 3} = this.props.match.params;
    this.props.fetchMetric(tripId, this.props.query);
  }

  render() {
    const {tripId = 3} = this.props.match.params;
    const {name, query} = this.props;
    if (
      this.props.metrics[tripId] !== undefined &&
      this.props.metrics[tripId][query] !== undefined
    ) {
      return (
        <Stat
          title={this.props.name}
          metric={Math.round(this.props.metrics[tripId][query].value)}
          unit={this.props.unit}
        />
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchMetric: (tripId, query) => dispatch(fetchTripMetric(tripId, query)),
  };
}

function mapStateToProps(state) {
  return {
    metrics: state.metrics,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MetricContainer));
