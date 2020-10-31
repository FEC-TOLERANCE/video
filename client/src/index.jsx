import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
const axios = require('axios');

class Header extends React.Component {
  constructor(props) {
    super(props);

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
    this.getItemId = this.getItemId.bind(this);
  }

  getItemId() {
    let splitComponentUrl = window.location.href.split('/');
    let urlWithoutEndpoint = splitComponentUrl[0] + '//' + splitComponentUrl[2].slice(0, 12) + '04';
    let endpoint = '/funding/' + splitComponentUrl[3];
    axios.get(urlWithoutEndpoint + endpoint)
      .then((fundingData) => {
        this.setState({
          'fundingGoal': fundingData.data.backing.fundingGoal,
          'amountFunded': fundingData.data.backing.amountFunded,
          'backers': fundingData.data.backing.backers,
          // 'description': fundingData.data.backing.description,
          'backers': fundingData.data.backing.backers,
          'daysRemaining': fundingData.data.backing.daysRemaining,
        });
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  componentDidMount() {
    this.getItemId();
  }

  render() {
    return (
      <div className="video">
        video goes here
      </div>
    )
  }
}

ReactDOM.render(<Header />, document.getElementById('header'));




