import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className='container'>
          {
            items.map((item) => (
              <div className='card' /* style='width: 18rem' */>
                <div className='card-body'>
                  <h5 className='card-title'>{item.commit.author.name}</h5>
                  <h6 class='card-subtitle mb-2 text-muted'>{item.commit.committer.date}</h6>
                  <p class='card-text'>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href={`${item.html_url}`} target='_blank' rel='noreferrer' class='card-link'>Commit Link</a>
                  <a href={`${item.committer.html_url}`} target='_blank' rel='noreferrer' class='card-link'>Committer's Profile</a>
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


/* href={`${item.html_url}`} target='_blank' rel='noreferrer' */

/* <li>
                  Username: {item.commit.author.name}
                </li>
                <li>
                  Commit Message: {item.commit.message}
                </li> */