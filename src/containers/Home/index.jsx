import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { fetchList } from '../../actions/rice';
import RiceCard from './RiceCard';
import TextInput from '../../components/TextInput';
import style from './style.css';
const debug = require('debug')('app:home');

const propTypes = {
  fetchList: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      User: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
      Tags: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          count: PropTypes.number.isRequired,
        }).isRequired
      ),
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      files: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  errors: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

class Home extends Component {
  constructor() {
    super();
    this.handleHeaderClick = this.handleHeaderClick.bind(this);
    this.handleFilterHeaderClick = this.handleFilterHeaderClick.bind(this);
    this.filterChange = this.filterChange.bind(this);
    this.state = {
      sortKey: 'rank',
      reverseSort: false,
      showTagFilter: true,
      filterText: '',
    };
  }

  componentDidMount() {
    this.props.fetchList();
  }

  handleHeaderClick(e) {
    e.preventDefault();
    const key = e.target.innerText.toLowerCase();
    if (key === this.state.sortKey) {
      this.setState({ reverseSort: !this.state.reverseSort });
    }
    this.setState({ sortKey: key });
  }

  handleFilterHeaderClick(e) {
    e.preventDefault();
    const newState = ! this.state.showTagFilter;
    this.setState({ showTagFilter: newState });
  }

  filterChange(e) {
    this.setState({ filterText: e.target.value });
  }

  renderRice() {
    return this.props.list.length && this.props.list
      .filter(rice =>
        this.state.filterText.split(/\s|,/).every(filter =>
          rice.Tags.some(tag =>
            tag.name.indexOf(filter) > -1
            // filter.substr(0,1) === '!'
            // ? tag.indexOf(filter.substr(1, filter.length - 1)) === -1
            // : tag.indexOf(filter) > -1
            )))
      .sort((a, b) =>
        // FIXME: this is garbage
        a[this.state.sortKey] - b[this.state.sortKey] * (this.state.reverseSort ? -1 : 1))
      .map(rice =>
        <RiceCard
          key={rice.id}
          likes={rice.likes}
          riceId={rice.id}
          title={rice.title}
          author={rice.User.username}
          files={rice.files}
          createdAt={rice.createdAt}
          description={rice.description}
          tags={rice.Tags}
        />
      );
  }

  render() {
    return (
      <div className={style.root}>
        <Helmet title="Ricehalla" />
        <table className={style.table}>
          <thead>
            <tr>
              <th className={style.rowRank}><a href="#" onClick={this.handleHeaderClick}>Rank</a></th>
              <th className={style.rowImage}></th>
              <th className={style.rowAuthor}><a href="#" onClick={this.handleHeaderClick}>Author</a></th>
              <th className={style.rowDate}><a href="#" onClick={this.handleHeaderClick}>Date</a></th>
              <th className={style.rowTag}>
                <div><a href="#" onClick={this.handleFilterHeaderClick}>Tags</a></div>
                {this.state.showTagFilter &&
                  <TextInput
                    className={style.tagSearch}
                    value={this.state.filterText}
                    onChange={this.filterChange}
                  />}
              </th>
            </tr>
          </thead>
          <tbody>
            {this.renderRice()}
          </tbody>
        </table>
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
