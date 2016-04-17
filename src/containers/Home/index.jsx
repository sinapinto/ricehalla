import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { loadRice } from '../../actions/rice';
import TagList from './TagList';
import TextInput from '../../components/TextInput';
import Card from '../../components/Card';
import style from './style.css';
import riceData from './data.js';

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
      filterText: ''
    };
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

  render() {
    const dtops = riceData
      .filter(dtop =>
        this.state.filterText
          .split(/\s|,/)
          .every(filter =>
            dtop.tags.some(tag =>
              tag.indexOf(filter) > -1
              // filter.substr(0,1) === '!'
              // ? tag.indexOf(filter.substr(1, filter.length - 1)) === -1
              // : tag.indexOf(filter) > -1
            )))
      .sort((a, b) =>
        // FIXME: this is garbage
        a[this.state.sortKey] - b[this.state.sortKey] * (this.state.reverseSort ? -1 : 1))
      .map(d =>
        <DesktopRow
          key={d.id}
          rank={d.rank}
          imageURL={d.url}
          author={d.author}
          date={d.date}
          tags={d.tags}
        />
      );

    return (
      <div className={style.root}>
        <Helmet title="ricehalla" />
        <Card>
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th className={style.rowRank}>
                  <a href="#" onClick={this.handleHeaderClick}>Rank</a>
                </th>
                <th className={style.rowImage}></th>
                <th className={style.rowAuthor}>
                  <a href="#" onClick={this.handleHeaderClick}>Author</a>
                </th>
                <th className={style.rowDate}>
                  <a href="#" onClick={this.handleHeaderClick}>Date</a>
                </th>
                <th className={style.rowTag}>
                  <div><a href="#" onClick={this.handleFilterHeaderClick}>Tags</a></div>
                  { this.state.showTagFilter &&
                    <TextInput
                      className={style.tagSearch}
                      value={this.state.filterText}
                      onChange={this.filterChange}
                    /> }
                </th>
              </tr>
            </thead>
            <tbody>
              {dtops}
            </tbody>
          </table>
        </Card>
      </div>
    );
  }
}

function DesktopRow({ rank, imageURL, author, date, tags }) {
  return (
    <tr>
      <td>{rank}</td>
      <td>{imageURL}</td>
      <td>{author}</td>
      <td>{date}</td>
      <TagList tags={tags} max={5} />
    </tr>
  );
}

DesktopRow.propTypes = {
  rank: PropTypes.string,
  imageURL: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
  tags: PropTypes.array,
};

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { loadRice })(Home);
