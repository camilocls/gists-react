import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { TOKEN } from '../../config/config';
import style from './GistList.scss';
import iconBack from '../../assets/arrow_back.png';

class GistList extends Component {
  state = {
    error: null,
    user: null,
    gists: null,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user != prevProps.user) {
      this.getData();
    }
  }

  /**
   * Get the Gists from an user.
   *
   * @memberof GistList
   */
  getData() {
    const { user } = this.props.match.params || this.props;

    fetch(`https://api.github.com/users/${user}/gists?access_token=${TOKEN}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Oops! This user can not be found.');
        }
      })
      .then(data => {
        this.setState({ user, gists: data })
      })
      .catch(error => this.setState({ error }));
  }

  render() {
    const { user, gists, error } = this.state;

    if ( error ) {
      return(
        <div className="error">
          <p className="error__message">{error.message}</p>
          <Link className="error__btn list__back btn" to="/">
            <img className="list__icon" src={iconBack} /> Back
          </Link>
        </div>
      );
    }

    if( !gists )
      return(
        <div className="list">
          <p className="loader">Loading</p>
        </div>
      );

    return (
      <div className="list">
        <div className="list__head">
          <Link className="list__back btn" to="/">
            <img className="list__icon" src={iconBack} /> Back
          </Link>
          <h3 className="list__user">{user}</h3>
        </div>
        <ul className="list__items">
          {gists.map(gist =>
            <li className="list__item" key={gist.id}>
              <Link className="list__link btn" to={`/${user}/${gist.id}`}>{gist.id}</Link>
              <p className="list__desc">{gist.description}</p>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default GistList;
