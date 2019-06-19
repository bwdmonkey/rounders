import React, { Component } from 'react';

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        newUsersLastWeek: 0,
        newArticlesLastWeek: 0,
        newClapsLastWeek: 0,
        avgClapsPerUser: 0,
        avgClapsPerArticle: 0,
        avgArticlesPerUser: 0,
      },
    };
  }

  componentDidMount() {
    // GET /analytics response format
    // {
    //   newUsersLastWeek: 1,
    //   newArticlesLastWeek: 1,
    //   newClapsLastWeek: 1,
    //   avgClapsPerUser: 1,
    //   avgClapsPerArticle: 1,
    //   avgArticlesPerUser: 1,
    // }
    fetch('/analytics')
      .then(res => res.json())
      .then(data => this.setState({ data: data }))
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
                    <div className="count-number">{data.newUsersLastWeek}</div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="wrapper count-title d-flex">
                  <div className="icon"><i className="icon-padnote" /></div>
                  <div className="name">
                    <strong className="text-uppercase">New Articles</strong>
                    <span>Last 7 days</span>
                    <div className="count-number">{data.newArticlesLastWeek}</div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="wrapper count-title d-flex">
                  <div className="icon"><i className="icon-check" /></div>
                  <div className="name">
                    <strong className="text-uppercase">New Claps</strong>
                    <span>Last 7 days</span>
                    <div className="count-number">{data.newClapsLastWeek}</div>
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
                    <div className="count-number">{data.avgClapsPerUser}</div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="wrapper count-title d-flex">
                  <div className="icon"><i className="icon-list" /></div>
                  <div className="name">
                    <strong className="text-uppercase">Avg Claps / Article</strong>
                    <span>Last 1 Month</span>
                    <div className="count-number">{data.avgClapsPerArticle}</div>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="wrapper count-title d-flex">
                  <div className="icon"><i className="icon-list-1" /></div>
                  <div className="name">
                    <strong className="text-uppercase">Avg Articles / User</strong>
                    <span>Last 1 Month</span>
                    <div className="count-number">{data.avgArticlesPerUser}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Admin;
