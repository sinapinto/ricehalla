import React, { Component, PropTypes } from 'react';
import MasonryComponent from 'react-masonry-component';

class Masonry extends Component {
  render() {
    const options = {
      transitionDuration: '0.2s',
      gutter: 15,
      fitWidth: true,
      hiddenStyle: { opacity: 0 },
      visibleStyle: { opacity: 1 }
    };
    return (
      <MasonryComponent
        style={{ margin: 'auto', textAlign: 'center'}}
        options={options}
        elementType="div"
      >
        {this.props.children}
      </MasonryComponent>
    );
  }
}

Masonry.propTypes = {
  children: PropTypes.node,
};

export default Masonry;
