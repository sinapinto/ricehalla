import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import moment from 'moment';
import { loadUser } from '../../actions/user';
import style from './style.css';

const propTypes = {
  user: PropTypes.shape({
    Rice: PropTypes.arrayOf(
      PropTypes.shape({
        Tags: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
          }).isRequired
        ),
        title: PropTypes.string,
        description: PropTypes.string,
        createdAt: PropTypes.string,
        id: PropTypes.number,
      })
    ),
    username: PropTypes.string,
    email: PropTypes.string,
    emailHash: PropTypes.string,
    about: PropTypes.string,
    createdAt: PropTypes.string,
    error: PropTypes.object,
  }),
  params: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  loadUser: PropTypes.func.isRequired,
};

const defaultProps = {
}

class Profile extends Component {
  componentDidMount() {
    this.props.loadUser(this.props.params.username);
  }

  render() {
    const { Rice, username, email, emailHash, about, createdAt } = this.props.user;
    return (
      <div className={style.root}>
        <Helmet title={`${username} | Ricehalla`} />
        <div className={style.bio}>
          {emailHash ?
            <img
              src={`http://www.gravatar.com/avatar/${emailHash}?s=100&d=identicon`}
              className={style.avatar}
            />
            : null}
          <h1 className={style.username}>
            <Link to={`/user/${this.props.params.username}`}>
              {username}
            </Link>
          </h1>
          <p className={style.created}>
            Joined on {createdAt ? moment(createdAt).format('dddd, MMMM Do YYYY') : ''}
          </p>
        </div>
        <div className={style.log}>
          {Rice ? Rice.map(rice =>
            <div key={rice.id}>
              <Link to={`/rice/${rice.id}`}>{rice.title}</Link>
              <div>{rice.description}</div>
              {rice.Tags ? rice.Tags.map((tag, i) =>
                <span key={i} className={style.tag}>
                  {tag.name}
                </span>)
              : null}
              <div>{moment(rice.createdAt).from()}</div>
            </div>)
          : null}
        </div>
      </div>
    );
  }
}

Profile.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { loadUser })(Profile);
