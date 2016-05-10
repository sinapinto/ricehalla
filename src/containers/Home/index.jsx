import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { fetchList, fetchPopular } from '../../actions/rice';
import Thumbnail from './Thumbnail';
import TextInput from '../../components/TextInput';
import Icon from '../../components/Icon';
import style from './style.css';
import Masonry from 'react-masonry-component';
const debug = require('debug')('app:home');

const propTypes = {
  fetchList: PropTypes.func.isRequired,
  fetchPopular: PropTypes.func.isRequired,
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
      createdAt: PropTypes.string.isRequired,
    }).isRequired,
  ),
  errors: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.filterChange = this.filterChange.bind(this);
    this.fetchNew = this.fetchNew.bind(this);
    this.fetchPopular = this.fetchPopular.bind(this);
    let filterText = '';
    if (this.props.location && this.props.location.query.tag) {
      filterText = this.props.location.query.tag;
    }
    this.state = {
      filterText,
      activeTab: 1,
      isSearchActive: false,
    };
  }

  componentDidMount() {
    this.props.fetchList();
  }

  filterChange(e) {
    this.setState({ filterText: e.target.value });
  }

  fetchNew() {
    this.setState({ activeTab: 1 });
    this.props.fetchList();
  }

  fetchPopular() {
    this.setState({ activeTab: 2 });
    this.props.fetchPopular();
  }

  render() {
    const { activeTab, isSearchActive } = this.state;
    return (
      <div className={style.root}>
        <Helmet title="Ricehalla" />
        <div className={style.navWrapper}>
          <div style={{ display: 'flex' }}>
            <div className={activeTab === 1 ? style.tabActive : style.tab} onClick={this.fetchNew}>
              New
            </div>
            <div className={activeTab === 2 ? style.tabActive : style.tab} onClick={this.fetchPopular}>
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
          options={{ transitionDuration: '0.4s', gutter: 10 }}
          elementType="div"
        >
          {(this.props.list.length && this.props.list[0].id !== null) ? this.props.list.filter(rice =>
            this.state.filterText.split(/\s|,/).every(filter => {
              if (filter === '') {
                return true;
              }
              if (!rice.Tags) {
                return true;
              }
              return rice.Tags.some(tag => tag.name.indexOf(filter) > -1);
            }))
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

export default connect(mapStateToProps, { fetchList, fetchPopular })(Home);
