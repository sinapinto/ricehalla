import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import moment from 'moment';
import { fetchList, likeRice, unlikeRice } from '../../actions/rice';
import Thumbnail from './Thumbnail';
import TextInput from '../../components/TextInput';
import Icon from '../../components/Icon';
import style from './style.css';
import Masonry from 'react-masonry-component';
const debug = require('debug')('app:home');

const propTypes = {
  userId: PropTypes.number,
  username: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.shape({
    query: PropTypes.object,
  }).isRequired,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      User: PropTypes.shape({
        username: PropTypes.string.isRequired,
        emailHash: PropTypes.string.isRequired,
      }),
      Tags: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired
      ),
      id: PropTypes.number.isRequired,
      scrot: PropTypes.string.isRequired,
      likers: PropTypes.arrayOf(PropTypes.string).isRequired,
      createdAt: PropTypes.string,
    })
  ),
  hasFetchedList: PropTypes.bool.isRequired,
  fetchList: PropTypes.func.isRequired,
};

const NEW = 0;
const POPULAR = 1;

class Home extends Component {
  constructor(props) {
    super(props);
    this.filterChange = this.filterChange.bind(this);
    this.sortNew = this.sortNew.bind(this);
    this.sortPopular = this.sortPopular.bind(this);
    let filterText = '';
    if (this.props.location && this.props.location.query.tag) {
      filterText = this.props.location.query.tag;
    }
    this.state = {
      filterText,
      activeTab: NEW,
      isSearchActive: false,
    };
  }

  componentDidMount() {
    if (!this.props.hasFetchedList) {
      this.props.fetchList();
    }
  }

  filterChange(e) {
    this.setState({ filterText: e.target.value });
  }

  sortNew() {
    this.setState({ activeTab: NEW });
  }

  sortPopular() {
    this.setState({ activeTab: POPULAR });
  }

  renderThumbnails() {
    return this.props.posts.filter(rice =>
      this.state.filterText.split(/\s|,/).every(filter => {
        if (filter === '' || !rice.Tags) {
          return true;
        }
        return rice.Tags.some(tag => tag.name.indexOf(filter) > -1);
      }))
      .sort((a, b) => {
        if (this.state.activeTab === POPULAR) {
          if (!a.likers || !b.likers) {
            return 0;
          }
          return b.likers.length - a.likers.length;
        } else if (this.state.activeTab === NEW) {
          return moment(b) - moment(a);
        }
      })
      .map(rice => 
        <Thumbnail
          key={rice.id}
          id={rice.id}
          image={rice.scrot}
          likers={rice.likers}
          username={this.props.username}
          emailHash={rice.User.emailHash}
          likeRice={this.props.likeRice}
          unlikeRice={this.props.unlikeRice}
          isFetchingLike={this.props.isFetchingLike}
        />);
  }

  render() {
    const { activeTab, isSearchActive } = this.state;
    return (
      <div className={style.root}>
        <Helmet title="Ricehalla" />
        <div className={style.navWrapper}>
          <div style={{ display: 'flex' }}>
            <div className={activeTab === NEW ? style.tabActive : style.tab} onClick={this.sortNew}>
              New
            </div>
            <div className={activeTab === POPULAR ? style.tabActive : style.tab} onClick={this.sortPopular}>
              Popular
            </div>
          </div>
          <div className={style.search}>
            <Icon
              name="search"
              size={24}
              className={isSearchActive ? style.iconActive : style.iconInactive}
              onClick={() => findDOMNode(this.refs.searchInput).focus()}
            />
            <input
              ref="searchInput"
              className={style.searchInput}
              value={this.state.filterText}
              onChange={this.filterChange}
              onFocus={() => this.setState({ isSearchActive: true })}
              onBlur={() => this.setState({ isSearchActive: false })}
            />
          </div>
        </div>
        <Masonry
          style={{ margin: 'auto', textAlign: 'center'}}
          options={{ transitionDuration: '0.2s', gutter: 10 }}
          elementType="div"
        >
          {this.renderThumbnails()}
        </Masonry>
      </div>
    );
  }
}

Home.propTypes = propTypes;

function mapStateToProps(state) {
  const posts = Object.keys(state.rice.posts).map(key => state.rice.posts[key]);
  return {
    posts,
    hasFetchedList: state.rice.hasFetchedList,
    isFetchingLike: state.rice.isFetchingLike,
  };
}

export default connect(mapStateToProps, {
  fetchList,
  likeRice,
  unlikeRice,
})(Home);
