import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { fetchList } from '../../actions/rice';
import DesktopRow from './DesktopRow';
import TextInput from '../../components/TextInput';
import style from './style.css';
const debug = require('debug')('app:home');

const propTypes = {
  fetchList: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      likes: PropTypes.number,
      file: PropTypes.number,
      url: PropTypes.string,
      created_at: PropTypes.string,
      updated_at: PropTypes.string,
    })
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
    if (this.props.list.length === 0) {
      this.props.fetchList();
    }
  }

  handleHeaderClick(e) {
    e.preventDefault();
    const key = e.target.innerText.toLowerCase();
    if (key === this.state.sortKey) {
      const reverse = ! this.state.reverseSort;
      this.setState({ reverseSort: reverse });
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
    // TODO: will implement tags soon..
    // return this.props.list.length > 0 && this.props.list
    //   .filter(dtop =>
    //     this.state.filterText
    //       .split(/\s|,/)
    //       .every(filter =>
    //         dtop.tags.some(tag =>
    //           tag.indexOf(filter) > -1
    //           // filter.substr(0,1) === '!'
    //           // ? tag.indexOf(filter.substr(1, filter.length - 1)) === -1
    //           // : tag.indexOf(filter) > -1
    //         )))
    //   .sort((a, b) =>
    //     // FIXME: this is garbage
    //     a[this.state.sortKey] - b[this.state.sortKey] * (this.state.reverseSort ? -1 : 1))
    //   .map(d =>
    //     <DesktopRow
    //       key={d.id}
    //       rank={d.rank}
    //       imageURL={d.url}
    //       author={d.author}
    //       date={d.date}
    //       tags={d.tags}
    //     />
    //   );
    return this.props.list.length > 0 && this.props.list
      .map((r, i) => <DesktopRow key={i} {...r} />);
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
