import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import moment from 'moment';
import { fetchList } from '../../actions/rice';
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
  fetchList: PropTypes.func.isRequired,
  location: PropTypes.shape({
    query: PropTypes.object,
  }).isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      Tags: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired
      ),
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      likes: PropTypes.number.isRequired,
      scrot: PropTypes.string.isRequired,
      createdAt: PropTypes.string,
    }).isRequired,
  ),
  errors: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
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
    this.props.fetchList();
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
          {(this.props.list.length && this.props.list[0].id !== null) ? this.props.list.filter(rice =>
            this.state.filterText.split(/\s|,/).every(filter => {
              if (filter === '' || !rice.Tags) {
                return true;
              }
              return rice.Tags.some(tag => tag.name.indexOf(filter) > -1);
            }))
            .sort((a, b) => {
              if (this.state.activeTab === POPULAR) {
                return b.likes - a.likes;
              } else if (this.state.activeTab === NEW) {
                return moment(b) - moment(a);
              }
            })
            .map(rice => 
              <Thumbnail
                key={rice.id}
                riceId={rice.id}
                scrot={rice.scrot}
              />)
              : null}
        </Masonry>
      </div>
    );
  }
}

Home.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    list: state.rice.list,
    errors: state.rice.errors,
    isFetching: state.rice.isFetching,
  };
}

export default connect(mapStateToProps, { fetchList })(Home);
