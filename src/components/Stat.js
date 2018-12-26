import React, {Component} from 'react';

const Stat = ({title, metric, unit}) => {
  return (
    <div className="stat">
      <h4>{title}</h4>
      <span>
        {metric}
        {unit}
      </span>
    </div>
  );
};

export default Stat;
