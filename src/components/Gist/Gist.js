import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { TOKEN } from '../../config/config';
import style from './Gist.scss';
import iconBack from '../../assets/arrow_back.png';

class Gist extends Component {
  state = {
    gist: null
  }

  /**
   * Update iframe in the DOM with content
   * from the Gist
   *
   * @param {Object} data Gist
   * @memberof Gist
   */
  updateIframe( data ) {
    const { id } = data;

    const iframe = this.nodeIframe;
    let doc = iframe.document;

    if (iframe.contentDocument) {
      doc = iframe.contentDocument;
    } else if (iframe.contentWindow) {
      doc = iframe.contentWindow.document;
    }

    const gistLink =  `https://gist.github.com/${id}.js`;
    const gistScript = `<script type="text/javascript" src="${gistLink}"></script>`;
    const elementId = `gst-${id}`;
    const onloadScript = `onload="parent.document.getElementById('${elementId}').style.height=document.body.scrollHeight + 'px'"`;
    const iframeHtml = `<html><head><base target="_parent"></head><body ${onloadScript}>${gistScript}</body></html>`;

    doc.open();
    doc.writeln(iframeHtml);
    doc.close();
  }

  /**
   * Get data of a Gist ID.
   *
   * @memberof Gist
   */
  getData() {
    const { gist_id } = this.props.match.params || this.props;

    fetch(`https://api.github.com/gists/${gist_id}?access_token=${TOKEN}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Oops! This Gist can not be found.');
        }
      })
      .then(data => {
        this.setState({ gist: data, user: data.owner.login })
        this.updateIframe(data);
      })
      .catch(error => this.setState({ error }));
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { gist, user, error } = this.state;

    if ( error ) {
      return(
        <div className="error">
          <p className="error__message">{error.message}</p>
          <Link className="error__btn gist__back btn" to="/">
            <img className="gist__icon" src={iconBack} /> Back
          </Link>
        </div>
      );
    }

    if( !gist )
      return (
        <div className="gist">
          <Loader />
        </div>
      );

    return (
      <div className="gist">

        <div className="gist__head">
          <Link className="list__back btn" to={`/${user.toLowerCase()}`}>
            <img className="list__icon" src={iconBack} /> Back
          </Link>
          <a className="btn" href={gist.html_url} target="_blank">View on GitHub</a>
        </div>

        <iframe
          className="gist__iframe"
          id={`gst-${gist.id}`}
          ref={(nd) => { this.nodeIframe = nd; }}
          frameBorder={0} />
      </div>
    );
  }
};

export default Gist;
