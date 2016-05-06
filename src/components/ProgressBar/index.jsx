import React, { Component, PropTypes } from 'react';

const propTypes = {
  percent: PropTypes.number,
  width: PropTypes.number,
  hasError: PropTypes.bool,
};

const defaultProps = {
  percent: 0,
  width: 1,
  hasError: false,
};

// css modules kinda sucks for this =/
const colors = {
  fg: 'rgb(0, 170, 220)',
  bg: '#eee',
  hasError: 'rgb(240, 60, 50)',
  success: 'rgb(40, 210, 110)',
};

function ProgressBar({ percent, width, hasError }) {
  const mid = width / 2;
  const d = `M ${mid}, ${mid} L ${100 - width / 2},${mid}`
  let fg;
  if (hasError) {
    fg = colors.hasError;
  } else if (percent === 100) {
    fg = colors.success;
  } else {
    fg = colors.fg;
  }
  return (
    <svg viewBox={`0 0 100 ${width}`} xmlns="http://www.w3.org/2000/svg">
      <path
        d={d}
        stroke={colors.bg}
        strokeWidth={width}
        strokeLinecap="round"
      />
      <path
        d={d}
        stroke={fg}
        strokeWidth={percent === 0 ? 0 : width}
        strokeLinecap="round"
        style={{
          strokeDasharray: '100',
          strokeDashoffset: 100 - percent,
          transition: 'stroke-dashoffset .5s, fill .5s',
        }}
      />
    </svg>
  );
}

ProgressBar.propTypes = propTypes;
ProgressBar.defaultProps = defaultProps;

export default ProgressBar;
