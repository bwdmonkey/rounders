import React, { Component } from 'react';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      response: {
        // [...]
        body: {
          newUsersLastWeek: 1,
          newArticlesLastWeek: 1,
          newClapsLastWeek: 666,
          avgClapsPerUser: 34,
          avgClapsPerArticle: 4.2,
          avgArticlesPerUser: 0.2,
          noArticles: {
            all: 16.5,
            finance: 1.1,
            economics: 2.2,
            life: 3.3,
            tech: 4.4,
            funding: 5.5,
          },
        },
      },
    };
  }

  toCapitalCase = str => str.charAt(0).toUpperCase() + str.slice(1)

  mapTagToIconClass = tag => ({
    all: 'fa fa-cubes thin-icon',
    finance: 'fa fa-credit-card thin-icon',
    economics: 'fa fa-handshake-o thin-icon',
    life: 'fa fa-heart-o',
    tech: 'fa fa-laptop',
    funding: 'icon-line-chart',
  }[tag])

  generateCards = (noArticlesObj) => {
    const components = [];
    Object.keys(noArticlesObj).forEach((key) => {
      components.push(this.generateCard(key, noArticlesObj[key]));
    });
    const cards = [];
    for (let i = 0; i < components.length; i += 3) {
      const row = [];
      for (let j = 0; j < 3; j += 1) {
        if (components[i + j]) row.push(components[i + j]);
      }
      cards.push(<div className="row d-flex">{row}</div>);
      cards.push(<br />);
    }
    return cards;
  }

  generateCard = (tag, num) => (
    <div className="col-md-4" key="tag">
      <div className="card income text-center">
        <div className="icon"><i className={this.mapTagToIconClass(tag)} /></div>
        <div className="number">{num}</div>
        <strong className="text-primary">{this.toCapitalCase(tag)}</strong>
      </div>
    </div>
  )


  render() {
    const { response } = this.state;
    const { body } = response;

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
                    <div className="count-number">{body.newUsersLastWeek}</div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="wrapper count-title d-flex">
                  <div className="icon"><i className="icon-padnote" /></div>
                  <div className="name">
                    <strong className="text-uppercase">New Articles</strong>
                    <span>Last 7 days</span>
                    <div className="count-number">{body.newArticlesLastWeek}</div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="wrapper count-title d-flex">
                  <div className="icon"><i className="icon-check" /></div>
                  <div className="name">
                    <strong className="text-uppercase">New Claps</strong>
                    <span>Last 7 days</span>
                    <div className="count-number">{body.newClapsLastWeek}</div>
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
                    <div className="count-number">{body.avgClapsPerUser}</div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="wrapper count-title d-flex">
                  <div className="icon"><i className="icon-list" /></div>
                  <div className="name">
                    <strong className="text-uppercase">Avg Claps / Article</strong>
                    <span>Last 1 Month</span>
                    <div className="count-number">{body.avgClapsPerArticle}</div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="wrapper count-title d-flex">
                  <div className="icon"><i className="icon-list-1" /></div>
                  <div className="name">
                    <strong className="text-uppercase">Avg Articles / User</strong>
                    <span>Last 1 Month</span>
                    <div className="count-number">{body.avgArticlesPerUser}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Statistics Section */}
        <h1>Total Number of Articles</h1>
        <section className="statistics">
          <div className="container-fluid">
            {this.generateCards(body.noArticles)}
          </div>
        </section>
      </div>
    );
  }
}

export default Admin;
