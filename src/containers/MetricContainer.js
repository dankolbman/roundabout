import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {fetchTripMetric} from '../actions/MetricActions';
import {bindActionCreators} from 'redux';
import Stat from '../components/Stat';

const MetricContainer = ({name, unit, metric}) => {
  return <Stat title={name} metric={Math.round(metric)} unit={unit} />;
};

export default MetricContainer;
