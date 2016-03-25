import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { loadRice } from '../../actions/rice';
import Card from '../../components/Card';
import styles from './styles.css';

class Home extends Component {
  // <h1 className={styles.header}>rice</h1>
  render() {
    return (
      <div className={styles.root}>
        <Helmet title="ricehalla" />
        <Card>
          <RiceList data={RICEDATA} />
        </Card>
      </div>
    );
  }
}

class RiceList extends React.Component {
  constructor(props) {
    super(props);
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
    const dtops = this.props.data
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
          rank={d.rank}
          imageURL={d.url}
          author={d.author}
          date={d.date}
          tags={d.tags}
        />
      );

    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="rank"><a href="#" onClick={this.handleHeaderClick}>Rank</a></th>
            <th className="img"></th>
            <th className="author"><a href="#" onClick={this.handleHeaderClick}>Author</a></th>
            <th className="date"><a href="#" onClick={this.handleHeaderClick}>Date</a></th>
            <th className="taglist">
              <div><a href="#" onClick={this.handleFilterHeaderClick}>Tags</a></div>
              { this.state.showTagFilter
                ? <div className="input-group filter-group">
                    <label htmlFor="tagfilter" className="input-group-addon">filter by tags</label>
                    <input
                      type="text"
                      name="tagfilter"
                      className="form-control"
                      value={this.state.filterText}
                      onChange={this.filterChange}
                    />
                  </div>
                : null }
            </th>
          </tr>
        </thead>
        <tbody>
          {dtops}
        </tbody>
      </table>
    );
  }
}

class DesktopRow extends React.Component {
  render() {
    // FIXME: max-limit of visible tags, "show more" option
    return (
      <tr>
        <td className="rank">{this.props.rank}</td>
        <td className="img"><img src={this.props.imageURL} /></td>
        <td className="author">{this.props.author}</td>
        <td className="date">{this.props.date}</td>
        <TagList tags={this.props.tags} />
      </tr>
    );
  }
}

class TagList extends React.Component {

  constructor(props) {
    super(props);
    this.max_tags = 5;
    this.state = {
      showMore: false,
    };
  }

  showMoreClick() {
    const newState = ! this.state.showMore;
    this.setState({ showMore: newState });
  }

  render() {
    let taglist = this.props.tags;
    if (! this.state.showMore) {
      taglist = taglist.reduce((a, c, i) => {
        if (i < this.max_tags) {
          a.push(c);
        }
        return a;
      }, []);
    }

    return (
      <td className="taglist">
        {taglist.map(tag => <span className="tag label btn-primary sm">{tag}</span>)}
        {taglist.length < this.props.tags.length
          ? <span className="tag label btn-info sm" onClick={this.showMoreClick}>
              Show {this.props.tags.length - taglist.length} more
            </span>
          : taglist.length > this.max_tags && this.state.showMore === true
            ? <span className="tag label btn-info sm" onClick={this.showMoreClick}>
                Show less
              </span>
            : null}
      </td>
    );
  }
}

const RICEDATA = [{
  rank: '3',
  date: '1410224584',
  author: 'person A',
  url: 'images/desktops/1.png',
  tags: [
    'arch',
    'awesome',
    'vim',
    'tmux',
    'ncmpcpp',
    'vimperator',
    'zsh'
  ]
}, {
  rank: '2',
  date: '1410307384',
  author: 'person B',
  url: 'images/desktops/2.png',
  tags: [
    'debian',
    'bspwm',
    'vim',
    'anime'
  ]
}, {
  rank: '4',
  date: '1410825784',
  author: 'person D',
  url: 'images/desktops/3.png',
  tags: [
    'crux',
    'bspwm',
    'vim',
    'anime'
  ]
}, {
  rank: '1',
  date: '1412812984',
  author: 'person C',
  url: 'images/desktops/4.png',
  tags: [
    'arch',
    'bspwm',
    'emacs',
    'anime',
    'dark',
    'long',
    'list',
    'of',
    'tags',
  ]
}];

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, { loadRice })(Home);
