import React from 'react';
import { Link } from 'react-router-dom';

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
    <div className='homeContainer'>
      {List.map((list, index) => (
        <div>
          <Link to={list.url} key={index}>
            <img src={`https://starwars-visualguide.com/assets/img/categories/${list.name}.jpg`} alt={`Star Wars ${list.name}`}/>
            <span>{list.name}</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;