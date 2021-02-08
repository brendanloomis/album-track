import React from 'react';
import { Route } from 'react-router-dom';
import store from '../store';
import Nav from '../Nav/Nav';
import Landing from '../Landing/Landing';
import CollectionPage from '../CollectionPage/CollectionPage';
import './App.css';
import ArtistPage from '../ArtistPage/ArtistPage';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';

class App extends React.Component{
  renderRoutes() {
    const { artists, albums, songs } = store;
    return (
      <>
        <Route 
          exact 
          path='/'
          component={Landing}
        />
        <Route
          exact
          path='/demo'
          render={() => (
            <CollectionPage
              artists={artists}
              albums={albums}
              songs={songs}
            />
          )}
        />
        <Route
          exact
          path='/demo/:artistId'
          render={(props) => (
            <ArtistPage
              artists={artists}
              albums={albums}
              songs={songs}
              {...props}
            />
          )}
        />
        <Route
          exact
          path='/login'
          component={Login}
        />
        <Route
          exact
          path='/signup'
          component={Signup}
        />
      </>
    )
  }

  render(){
    const users = store.users;
    return (
      <div className='App'>
        <header>
          <h1>Album Track</h1>
        </header>
        <Nav />
        <main className='main'>
          {this.renderRoutes()}
        </main>
      </div>
    );
  }
}

export default App;
