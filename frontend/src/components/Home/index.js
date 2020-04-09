// == Import npm
import React from 'react';

// == Import
import './home.scss';
import Top from './top';
import Argument from './argument';
import Info from './info';
import Trust from './trust';

// == Composant
const Home = () => (
  <main className="home">
    <Top />
    <Argument />
    <Info />
    <Trust />
  </main>
);

// == Export
export default Home;
