import React from 'react';
import { Switch } from 'react-router-dom';
import { Redirect, Route ,useHistory} from "react-router-dom";

import './App.css';
import { CheckoutPage } from './layouts/BookCheckout/CheckoutPage';
import { Homepage } from './layouts/Homepage/Homepage';
import { Footer } from './layouts/NavbarFooter/Footer';
import { Navbar } from './layouts/NavbarFooter/Navbar';
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage';
import { OktaConfig } from './lib/OktaConfig';
import {OktaAuth,toRelativeUrl} from '@okta/okta-auth-js';
import { Security,LoginCallback } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';

const oktaAuth = new OktaAuth(OktaConfig);


export const App = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push('/login');
  }

  const restoreOriginalUri = async (_oktaAuth:any,originalUri:any) =>{
    history.replace(toRelativeUrl(originalUri ||
      '/',window.location.origin
      
      ));
  };

  

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
      <Navbar />
      <div className='flex-grow-1'>
        <Switch>
          <Route path='/home'>
            <Homepage />
          </Route>
          <Route path='/' exact>
            <Redirect to='/home' />
          </Route>
          <Route path='/search'>
            <SearchBooksPage />
          </Route>
          <Route path='/checkout/:bookId'>
            <CheckoutPage/>
          </Route>
          
          <Route path='/login' render={() => <LoginWidget config={OktaConfig}/>}/>

          <Route path='/login/callback' component={LoginCallback} />
          
      
        </Switch>
      </div>
      <Footer />
      </Security>
    </div>
  );
}


