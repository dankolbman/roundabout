import React from 'react';
import {
  LineChart,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import Stat from '../components/Stat';

const DistanceContainer = ({distances}) => {
  if (!distances) {
    return 'Loading...';
  }

  const d = distances.map(d => ({
    time: Math.round(Date.parse(d.time) / 1),
    value: d.value,
  }));

  const endPoint = d.length - 1;

  return (
    <div className="row">
      <div className="chart">
        <h2>Distance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart width={800} height={400} data={d}>
            <XAxis
              domain={['dataMin', 'dataMax']}
              dataKey="time"
              type="number"
              tickFormatter={str => moment(str).format('M/D')}
              padding={{left: 20, right: 40}}
            />
            <Tooltip
              formatter={val => Math.round(val)}
              labelFormatter={str => moment(str).format('hh:mma Do MMM')}
            />
            <Line
              type="monotone"
              dataKey="value"
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

      {endPoint > 1 && (
        <div className="stats">
          <Stat
            title="Total Distance"
            metric={Math.round(distances[endPoint].value)}
            unit="km"
          />
          <Stat
            title="Total Duration"
            metric={Math.round(
              moment
                .duration(
                  moment(d[endPoint].time).diff(moment(distances[0].time)),
                )
                .asDays(),
            )}
            unit="Days"
          />
        </div>
      )}
    </div>
  );
};

export default DistanceContainer;
