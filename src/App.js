import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import dateFormat from './utils/dateFormat';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      DataIsLoaded: false
    };
  }

  componentDidMount() {
    fetch('https://api.github.com/repos/bmilner88/git-commit-history/commits')
      .then(res => res.json())
      .then(json => {
        this.setState({
          items: json,
          DataIsLoaded: true
        });
      })
  }

  render() {
    const { DataIsLoaded, items } = this.state;
    if(!DataIsLoaded) return <div>
      <h1>Fetching Commit Data...</h1>
    </div>;

    return (
      <div className="App">
        <header className="App-header">
          <h1>git-commit-history</h1>
        </header>
        <h2 className='mt-3'>Commits:</h2>
        <div className='container align-center'>
          {
            items.map((item) => (
              <div className='card m-3' key={item.sha}>
                <div className='card-body'>
                  <h5 className='card-title'>{item.commit.author.name}</h5>
                  <h6 className='card-subtitle mb-2 text-muted'>{dateFormat(item.commit.committer.date)}</h6>
                  <p className='card-text'>{item.commit.message}</p>
                  <a href={`${item.html_url}`} target='_blank' rel='noreferrer' className='card-link'>Commit Link</a>
                  <a href={`${item.committer.html_url}`} target='_blank' rel='noreferrer' className='card-link'>Committer's Profile</a>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  };
};

export default App;