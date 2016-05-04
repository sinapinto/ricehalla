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

class Profile extends Component {
  componentDidMount() {
    this.props.loadUser(this.props.params.username);
  }

  render() {
    const { Rice, username, email, emailHash, about, createdAt } = this.props.user;
    return (
      <div className={style.root}>
        <Helmet title={`${username} | Ricehalla`} />
        <div className={style.bioWrapper}>
          <div className={style.bio}>
            {emailHash ?
              <img
                src={`http://www.gravatar.com/avatar/${emailHash}?s=100&d=identicon`}
                className={style.avatar}
              />
              : null}
            <div>
              <h1 className={style.username}>
                <Link to={`/user/${this.props.params.username}`}>
                  {username}
                </Link>
              </h1>
              <span className={style.joined}>
                {createdAt ? `Joined on ${moment(createdAt).format('dddd, MMMM Do YYYY')}` : ''}
              </span>
            </div>
          </div>
        </div>
        <div className={style.activity}>
          <h2 className={style.header}>Recent</h2>
          {Rice ? Rice.map(rice =>
            <Link key={rice.id} to={`/rice/${rice.id}`}>
              <div className={style.rWrapper}>
                <h3 className={style.rTitle}>{rice.title}</h3>
                <p className={style.rDescription}>{rice.description}</p>
                {rice.Tags ? rice.Tags.map((tag, i) =>
                  <span key={i} className={style.rTag}>
                    {tag.name}
                  </span>)
                : null}
                <div className={style.rAge}>{moment(rice.createdAt).from()}</div>
              </div>
            </Link>)
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
