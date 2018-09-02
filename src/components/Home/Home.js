import React, { Component } from 'react';
import style from './Home.scss';

import {
  Redirect
} from 'react-router-dom';

class Home extends Component {
  state = {
    user: null,
    viewList: false
  };

  updateUser(evt) {
    if (evt.keyCode != 13)
      return false;

    this.setState({
      user: evt.target.value,
      viewList: true
    });
  }

  render() {
    const { user, viewList } = this.state;

    if ( viewList === true ) {
      return <Redirect to={`/${user}`} />
    }

    return (
      <div className="search-user">
        <h2 className="search-user__title">Gists List</h2>
        <input className="search-user__field" type="text" onKeyUp={ evt => this.updateUser(evt) } />
        <span className="search-user__note">Press enter to continue</span>
      </div>
    );
  }
};

export default Home;
