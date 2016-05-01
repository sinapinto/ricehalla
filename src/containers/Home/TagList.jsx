import React, { Component, PropTypes } from 'react';
import style from './style.css';

const propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  max: PropTypes.number,
};

const defaultProps = {
  max: 5,
};

class TagList extends Component {
  constructor() {
    super();
    this.showMoreClick = this.showMoreClick.bind(this);
    this.state = {
      showingMore: false,
    };
  }

  showMoreClick() {
    this.setState(prev =>
      ({ showingMore: !prev.showingMore })
    );
  }

  render() {
    const { showingMore } = this.state;
    const { max, tags } = this.props;
    let taglist = tags;
    let more = null;
    if (!tags) return null;

    if (!showingMore) {
      taglist = taglist.slice(0, max);
    }

    if (taglist.length < tags.length) {
      more = (
        <span onClick={this.showMoreClick}>
          {tags.length - taglist.length} more
        </span>
      );
    } else if (taglist.length > max && showingMore) {
      more = (
        <span onClick={this.showMoreClick}>
          Show less
        </span>
      );
    }

    return (
      <td className={style.taglist}>
        {taglist.map((tag, i) => <span className={style.tag} key={i}>{tag.name}</span>)}
        {more}
      </td>
    );
  }
}

TagList.propTypes = propTypes;
TagList.defaultProps = defaultProps;

export default TagList;
