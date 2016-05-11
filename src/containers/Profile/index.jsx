import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import moment from 'moment';
import marked from 'marked';
import { loadUser } from '../../actions/user';
import style from './style.css';

const propTypes = {
  userId: PropTypes.number,
  username: PropTypes.string,
  users: PropTypes.object,
    // username: PropTypes.string,
    // email: PropTypes.string,
    // emailHash: PropTypes.string,
    // about: PropTypes.string,
    // createdAt: PropTypes.string,
    // Rice: PropTypes.arrayOf(
    //   PropTypes.shape({
    //     Tags: PropTypes.arrayOf(
    //       PropTypes.shape({
    //         name: PropTypes.string,
    //       }).isRequired
    //     ),
    //     title: PropTypes.string,
    //     description: PropTypes.string,
    //     createdAt: PropTypes.string,
    //     id: PropTypes.number,
    //   })
    // ),
  error: PropTypes.object,
  isFetching: PropTypes.bool,
  params: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }).isRequired,
  loadUser: PropTypes.func.isRequired,
};

class Profile extends Component {
  componentDidMount() {
    const { users, params, loadUser } = this.props;
    if (!users[params.username]) {
      loadUser(params.username);
    }
  }

  createMarkdown(text) {
    if (text) {
      return {__html: marked(text, { sanitize: true })};
    }
    return {__html: ''};
  }

  render() {
    const { username } = this.props.params;
    let Rice, email, emailHash, about, createdAt;

    if (typeof this.props.users[username] !== 'undefined') {
      Rice = this.props.users[username].Rice;
      email = this.props.users[username].email;
      emailHash = this.props.users[username].emailHash;
      about = this.props.users[username].about;
      createdAt = this.props.users[username].createdAt;
    }
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
                <Link to={`/user/${username}`}>
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
        {Rice ? <h2 className={style.header}>Recent</h2> : null}
          {Rice ? Rice.map(rice =>
            <Link key={rice.id} to={`/rice/${rice.id}`}>
              <div className={style.rWrapper}>
                <h3 className={style.rTitle}>{rice.title}</h3>
                <div dangerouslySetInnerHTML={this.createMarkdown(rice.description)} />
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
    isFetching: state.user.isFetching,
    error: state.user.error,
    users: state.user.users,
  };
}

export default connect(mapStateToProps, { loadUser })(Profile);
