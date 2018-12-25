import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchTripDistance} from '../actions/DistanceActions';
import {bindActionCreators} from 'redux';
import {
  LineChart,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';

class DistanceContainer extends Component {
  componentDidMount() {
    const {tripId = 3} = this.props.match.params;
    this.props.fetchData(tripId);
  }

  render() {
    const style = {
      width: '100%',
    };
    const tripId = this.props.match.params.tripId;
    if (
      this.props.distance[tripId] !== undefined &&
      this.props.distance[tripId].points !== undefined
    ) {
      const endPoint = this.props.distance[tripId].points.length - 1;
      return (
        <div className="row">
          <div className="chart">
            <h2>Distance</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                width={800}
                height={400}
                data={this.props.distance[tripId].points}>
                <XAxis
                  domain={['dataMin', 'dataMax']}
                  dataKey="time"
                  type="number"
                  tickFormatter={str => moment(str * 1000).format('M/D')}
                  padding={{left: 20, right: 40}}
                />
                <Tooltip
                  formatter={val => Math.round(val)}
                  labelFormatter={str =>
                    moment(str * 1000).format('hh:mma Do MMM')
                  }
                />
                <Line
                  type="monotone"
                  dataKey="distance"
                  stroke="#c42847"
                  strokeWidth={3}
                  dot={false}
                />
                <YAxis
                  label={{
                    value: 'Distance (km)',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="stats">
            <div className="stat">
              <h4>Total Distance</h4>
              {Math.round(
                this.props.distance[tripId].points[endPoint].distance,
              )}
              km
            </div>
            <div className="stat">
              <h4>Total Duration</h4>
              {Math.round(
                moment
                  .duration(
                    moment(
                      this.props.distance[tripId].points[endPoint].time * 1000,
                    ).diff(
                      moment(this.props.distance[tripId].points[0].time * 1000),
                    ),
                  )
                  .asDays(),
              )}{' '}
              Days
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading</div>;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: tripId => dispatch(fetchTripDistance(tripId)),
  };
}

function mapStateToProps(state) {
  return {
    distance: state.distance,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(DistanceContainer));
