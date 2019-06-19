import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        new_users_last_week: 0,
        new_articles_last_week: 0,
        new_claps_last_week: 0,
        avg_claps_per_user: 0,
        avg_claps_per_article: 0,
        avg_articles_per_user: 0,
        banks: ['cibc', 'bmo', 'td']
      },
      nameCheck: true,
      codeCheck: true
    };
  }

  componentDidMount() {
    // GET /analytics response format
    // {
    //   new_users_last_week: 1,
    //   new_articles_last_week: 1,
    //   new_claps_last_week: 1,
    //   avg_claps_per_user: 1,
    //   avg_claps_per_article: 1,
    //   avg_articles_per_user: 1,
    // }
    fetch('/analytics')
      .then(res => res.json())
      .then(data => this.setState(prev => ({
        data: {
          ...data.result,         // Set new analytics data
          banks: prev.data.banks  // Maintain old bank data
        }
      })))
      .catch(_ => {});

    // GET /institutions response format
    // ['cibc', 'bmo', 'td']
    fetch('/institutions')
      .then(res => res.json())
      .then(data => this.setState(prev => ({
        data: {
          ...prev.data,           // Maintain old analytics data
          banks: data.result      // Set new bank data
        }
      })))
      .catch(_ => {});
  }

  generateBankCards = (banks) => {
    const bankCards = [];
    banks.forEach((bank, i) => {
      let cardContent = [];
      if (bank.bank_code !== undefined) {
        cardContent.push(
          <h6 className="text-primary"
              key={"bankcode" + i}>{bank.bank_code}</h6>
        )
      }
      if (bank.name !== undefined) {
        cardContent.push(
          <h3 className="text-primary"
              key={"bank"+i}>{bank.name.toUpperCase()}</h3>
          )
      }

      bankCards.push(
        <div className="col-md-4" key={bank + i}>
          <div className="card income text-center">
            {cardContent}
          </div>
        </div>
      )
    });
    const section = [];
    for (let i = 0; i < bankCards.length; i += 3) {
      const row = [];
      for (let j = 0; j < 3; j += 1) {
        if (bankCards[i + j]) row.push(bankCards[i + j]);
      }
      section.push(<Row key={"bankrow" + i}>{row}</Row>);
    }
    return section;
  }

  handleBankOptions = (event) => {
    if (event.target.id === "codeCheck") {
      this.setState(
        { codeCheck: event.target.checked },
        () => this.updateBanks()
      )
    }
    if (event.target.id === "nameCheck") {
      this.setState(
        { nameCheck: event.target.checked },
        () => this.updateBanks()
      )
    }
  }

  updateBanks = () => {
    const { nameCheck, codeCheck } = this.state;

    let query = '';
    if (nameCheck && codeCheck) {
      query = '?include=bank_code&include=name';
    } else if (nameCheck) {
      query = '?include=name'
    } else if (codeCheck) {
      query = '?include=bank_code'
    }

    fetch('/institutions'+query)
      .then(res => res.json())
      .then(data => this.setState(prev => ({
        data: {
          ...prev.data,           // Maintain old analytics data
          banks: data.result      // Set new bank data
        }
      })))
      .catch(_ => {});
  }

  render() {
    const { data } = this.state;

    return (
      <div className="admin">
        <h1>
          Admin Analytics
        </h1>

        {/* Counts Section */}
        <section className="dashboard-counts section-padding">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="wrapper count-title d-flex">
                  <div className="icon"><i className="icon-user" /></div>
                  <div className="name">
                    <strong className="text-uppercase">New User</strong>
                    <span>Last 7 days</span>
                    <div className="count-number">{data.new_users_last_week}</div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="wrapper count-title d-flex">
                  <div className="icon"><i className="icon-padnote" /></div>
                  <div className="name">
                    <strong className="text-uppercase">New Articles</strong>
                    <span>Last 7 days</span>
                    <div className="count-number">{data.new_articles_last_week}</div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="wrapper count-title d-flex">
                  <div className="icon"><i className="icon-check" /></div>
                  <div className="name">
                    <strong className="text-uppercase">New Claps</strong>
                    <span>Last 7 days</span>
                    <div className="count-number">{data.new_claps_last_week}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="wrapper count-title d-flex">
                  <div className="icon"><i className="icon-bill" /></div>
                  <div className="name">
                    <strong className="text-uppercase">Avg Claps / User</strong>
                    <span>Last 1 Month</span>
                    <div className="count-number">{data.avg_claps_per_user}</div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="wrapper count-title d-flex">
                  <div className="icon"><i className="icon-list" /></div>
                  <div className="name">
                    <strong className="text-uppercase">Avg Claps / Article</strong>
                    <span>Last 1 Month</span>
                    <div className="count-number">{data.avg_claps_per_article}</div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="wrapper count-title d-flex">
                  <div className="icon"><i className="icon-list-1" /></div>
                  <div className="name">
                    <strong className="text-uppercase">Avg Articles / User</strong>
                    <span>Last 1 Month</span>
                    <div className="count-number">{data.avg_articles_per_user}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Registered Bank Names */}
        <section>
          <h1>Registered Banks</h1>
          <div className="bankCheckBox">
            <input id="nameCheck" type="checkbox" onChange={this.handleBankOptions.bind(this)} defaultChecked/> Institute Name<br/>
            <input id="codeCheck" type="checkbox" onChange={this.handleBankOptions.bind(this)} defaultChecked/> Bank Code<br/>
            <small>Note: Selecting nothing will also return both fields.</small>
          </div>
          <br/>
          {this.generateBankCards(data.banks)}
        </section>
      </div>
    );
  }
}

export default Admin;