import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { fetchList, fetchPopular } from '../../actions/rice';
import RiceCard from './RiceCard';
import TextInput from '../../components/TextInput';
import style from './style.css';
import Masonry from 'react-masonry-component';
const debug = require('debug')('app:home');

const propTypes = {
  fetchList: PropTypes.func.isRequired,
  fetchPopular: PropTypes.func.isRequired,
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
    this.filterChange = this.filterChange.bind(this);
    this.fetchNew = this.fetchNew.bind(this);
    this.fetchPopular = this.fetchPopular.bind(this);
    this.state = {
      filterText: '',
    };
  }

  componentDidMount() {
    this.props.fetchList();
  }

  filterChange(e) {
    this.setState({ filterText: e.target.value });
  }

  fetchNew() {
    this.props.fetchList();
  }

  fetchPopular() {
    this.props.fetchPopular();
  }

  render() {
    return (
      <div className={style.root}>
        <Helmet title="Ricehalla" />
        <div className={style.spaceBetween}>
          <div className={style.sortLinks}>
            <a href="javascript:;" onClick={this.fetchNew}>New</a>
            <a href="javascript:;" onClick={this.fetchPopular}>Popular</a>
            {`${this.props.list.length} images`}
          </div>
          <TextInput
            className={style.tagSearch}
            height={35}
            value={this.state.filterText}
            onChange={this.filterChange}
            placeholder="Search tags.."
          />
        </div>
        <Masonry
          style={{ margin: 'auto', textAlign: 'center'}}
          options={{ transitionDuration: '0.4s', gutter: 10 }}
          elementType="div"
        >
          {this.props.list.length && this.props.list.filter(rice =>
            this.state.filterText.split(/\s|,/).every(filter =>
              filter === '' ? true :  rice.Tags.some(tag => tag.name.indexOf(filter) > -1)))
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
              />)}
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
