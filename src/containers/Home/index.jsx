import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Masonry from 'react-masonry-component';
import moment from 'moment';
import Thumbnail from './Thumbnail';
import TextInput from '../../components/TextInput';
import Icon from '../../components/Icon';
import { fetchList, likePost, unlikePost } from '../../actions/post';
import { getAllPosts } from '../../reducers';
import style from './style.css';

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
    if (!this.props.didFetchList) {
      this.props.fetchList();
    }
  }

  filterChange(e) {
    this.setState({ filterText: e.target.value || '' });
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
          return moment(b.createdAt) - moment(a.createdAt);
        }
      })
      .map(rice => 
        <Thumbnail
          key={rice.id}
          id={rice.id}
          image={rice.scrot}
          likers={rice.likers}
          username={rice.User.username}
          currentUser={this.props.username}
          emailHash={rice.User.emailHash}
          likePost={this.props.likePost}
          unlikePost={this.props.unlikePost}
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

Home.propTypes = {
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
  didFetchList: PropTypes.bool.isRequired,
  fetchList: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    posts: getAllPosts(state),
    didFetchList: state.post.didFetchList,
    isFetchingLike: state.post.isFetchingLike,
  };
}

export default connect(mapStateToProps, {
  fetchList,
  likePost,
  unlikePost,
})(Home);
