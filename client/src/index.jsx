import React from 'react';
import ReactDOM from 'react-dom';
// import css from '../dist/styles.css';
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
      <div className="video">
        
      </div>
    );
  }
}

ReactDOM.render(<Header />, document.getElementById('header'));




