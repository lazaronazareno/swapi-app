import React from 'react';
import { Link } from 'react-router-dom';
import './home.scss'

const List = [
  {url: '/people', name:'character'},
  {url: '/films', name:'films'},
  {url: '/starships', name:'starships'},
  {url: '/vehicles', name:'vehicles'},
  {url: '/species', name:'species'},
  {url: '/planets', name:'planets'},
]

const Home = () => {
  return (
    <>
      <h1 className='mainTitle'>Star Wars Encyclopedia</h1>
      <div className='homeContainer'>
        {List.map((list, index) => (
          <div key={index}>
            <Link to={list.url}>
              <img src={`https://starwars-visualguide.com/assets/img/categories/${list.name}.jpg`} alt={`Star Wars ${list.name}`}/>
              <span>{list.name}</span>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;