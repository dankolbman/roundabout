import React, {Component} from 'react';
import {connect} from 'react-redux';
import {tripSpeedFetchPage} from '../actions/speed';
import {bindActionCreators} from 'redux';
import {LineChart, Line, XAxis, YAxis} from 'recharts';
import moment from 'moment';

class SpeedContainer extends Component {
  componentDidMount() {
    this.props.fetchData(`${process.env.REACT_APP_API}/trips/1/speed`);
  }

  render() {
    const style = {
      width: '100%',
    };
    return (
      <div>
        <LineChart width={800} height={400} data={this.props.speed}>
          <XAxis
            domain={['auto', 'auto']}
            dataKey="time"
            type="number"
            tickFormatter={timeStr => moment(timeStr).format('MMM D')}
          />
          <Line type="monotone" dataKey="speed" stroke="#8884d8" />
          <YAxis />
        </LineChart>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: url => dispatch(tripSpeedFetchPage(url)),
  };
}

function mapStateToProps(state) {
  const data = state.speed.points.map(v => ({time: v[0], speed: v[1]}));
  console.log(data);
  return {
    speed: data,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SpeedContainer);
