import React from 'react';
import './App.css';

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
          <h2>git-commit-history</h2>
        </header>
        <h1>Commits:</h1>
        <ul>
          {
            items.map((item) => (
              <a href={`${item.html_url}`} target='_blank' rel='noreferrer'>
                <li className='card'>
                  <img id='pfp' src={`${item.committer.avatar_url}`} alt='Committer profile' />
                  username: { item.commit.author.name }
                  commit message: { item.commit.message }
                </li>
              </a>
            ))
          }
        </ul>
      </div>
    );
  };
};

export default App;
