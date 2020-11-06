import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLink } from '@fortawesome/free-solid-svg-icons';
const axios = require('axios');

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.getItemId = this.getItemId.bind(this);
    this.changeProgress = this.changeProgress.bind(this);
    this.getItemId();

    this.state = {
      itemId: 1,
      fundingGoal: 100,
      amountFunded: 100,
      newFundersPercent: 0.5,
      backers: 100,
      description: 'description',
      daysRemaining: 10,
      endDate: '1/1/2020',
      title: 'title',
      headline: 'paragraph'
    };
  }

  getItemId() {
    let splitComponentUrl = window.location.href.split('/');
    let urlWithoutEndpoint = splitComponentUrl[0] + '//' + splitComponentUrl[2].slice(0, 12) + '04';
    let endpoint = '/funding/' + splitComponentUrl[3];
    axios.get(urlWithoutEndpoint + endpoint)
      .then((fundingData) => {
        console.log('fundingData', fundingData);
        this.setState({
          'fundingGoal': fundingData.data.backing.fundingGoal,
          'amountFunded': fundingData.data.backing.amountFunded,
          'backers': fundingData.data.backing.backers,
          'description': fundingData.data.backing.description,
          'title': fundingData.data.backing.title,
          'backers': fundingData.data.backing.backers,
          'daysRemaining': fundingData.data.backing.daysRemaining,
        });
        this.changeProgress();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  changeProgress() {
    let element = document.getElementById("progressBar");
    console.log('element', element);
    let percent = this.state.fundingGoal / this.state.amountFunded;
    console.log('percent', percent);
    if (percent < 1) {
      console.log('element.style.width', element.style.width);
      element.style.width = percent * 100 + "%";
      console.log('element.style.width', element.style.width);
    } else {
      element.style.width = 100 + '%';
    }
  }

  componentDidMount() {
    this.changeProgress();
  }

  render() {
    return (
      <div className="header">
        <div className="heading">
          <h2 className="title">{this.state.title}</h2>
          <p className="description">{this.state.description}</p>
        </div>
        <div className="fundingStatus">
          <div id="progress" className="fundingProgress green">
            <div id="progressBar"></div>
          </div>
          <div className="topSpacing"></div>
          <div className="fundingInfo">
            <div className="pledged">
              <div className="num nowrap"></div>
              <div className="totalPledged">
                <span className="pledged data green bold">
                  ${this.state.amountFunded}
                  <a href="#" className="fas fa-dollar-sign"></a>
                </span>
              </div>
              <span className="pledged label">
                pledged of ${this.state.fundingGoal} goal
              </span>
            </div>
            <div className="backers">
              <div className="backers value dark-grey bold">
                <span>{this.state.backers}</span>
              </div>
              <span className="backers label grey">backers</span>
            </div>
            <div className="remaining time">
              <div>
                <div className="days remaining">
                  <div>
                    <span className="block data value dark-grey 500">{this.state.daysRemaining}</span>
                  </div>
                  <span className="daysRemaining label block navy-600">days to go</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom buttons">
            <a className="back-project button large green" href="" type="button">Back this project</a>
            <div className="reminder and social-media">
              <span className="block basics">
                <span>
                  <button className="remind medium hover icon fill">
                    <a href='#' className="fa fa-bookmark">  </a>
                    Remind me
                  </button>
                </span>
              </span>
              <span className="social">
                <span className="small icons">
                  <span className="flex items-center">
                    <span className="facebook inline-block mx4">
                      <a href="#" className="fa fa-facebook"></a>
                    </span>
                    <span className="twitter inline-block mr4">
                      <a href="#" className="fa fa-twitter"></a>
                    </span>
                    <span className="mail inline-block mr4">
                      <a href="#" className="fa fa-envelope"></a>
                    </span>
                    <span className="link inline-block mr4">
                      {/* <FontAwesomeIcon className="faLink" icon="fa-link"/> */}
                      {/* <a href="#" className="fas fa-link"></a> */}
                    </span>
                  </span>
                </span>
              </span>
              <div>
                <p className="mb3 mb0-lg type-12">
                  <span className="deadline underline">All or nothing.</span>
                  <span className="deadline"> This project will only be funded if it reaches its goal by Halloween.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('header'));




