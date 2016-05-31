import React, { Component, PropTypes } from 'react';
import MasonryComponent from 'react-masonry-component';

class Masonry extends Component {
  render() {
    const options = {
      transitionDuration: '0.2s',
      gutter: 15,
      fitWidth: !!this.props.centered,
      hiddenStyle: { opacity: 0 },
      visibleStyle: { opacity: 1 }
    };
    const style = this.props.centered ?  { margin: 'auto', textAlign: 'center' } : {};
    return (
      <MasonryComponent
        options={options}
        style={style}
        elementType="div"
      >
        {this.props.children}
      </MasonryComponent>
    );
  }
}

Masonry.propTypes = {
  children: PropTypes.node,
  centered: PropTypes.bool,
};

Masonry.defaultProps = {
  centered: false,
};

export default Masonry;
