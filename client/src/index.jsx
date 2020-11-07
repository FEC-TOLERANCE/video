import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
const axios = require('axios');

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.getItemId = this.getItemId.bind(this);
    this.getItemId();

    this.state = {
      identifier: 0,
      location: "NY",
      itemType: "tolerance",
      snippets: {
        url: '',
        thumbnail: ''
      }
    };
  }

  getItemId() {
    let splitComponentUrl = window.location.href.split('/');
    let urlWithoutEndpoint = splitComponentUrl[0] + '//' + splitComponentUrl[2].slice(0, 12) + '05';
    let endpoint = '/video/' + splitComponentUrl[3];
    axios.get(urlWithoutEndpoint + endpoint)
      .then((videoData) => {
        console.log('videoData', videoData);
        this.setState({
          itemType: videoData.data.itemType,
          snippets: {
            url: 'http://www.youtube.com/embed/' + videoData.data.snippet.url,
            thumbnail: videoData.data.snippet.thumbnail
          }
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="video">
        <iframe className="video" width="500" height="300" src={this.state.snippets.url}></iframe>
        <div className="video information">
          <span>
            <a href="#" className="fa fa-compass"></a>
            <span className="label type">{this.state.itemType}</span>
          </span>
          <span className="location">
            <a href="#" className="fa fa-map-marker"></a>
            <span className="label location">{this.state.location}</span>
          </span>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Video />, document.getElementById('video'));




