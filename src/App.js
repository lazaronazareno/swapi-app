import './App.css';
import PeopleList from './components/peopleList';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PeopleDetails from './components/peopleDetails';
import FilmList from './components/filmList';
import Home from './components/home';
import FilmDetails from './components/filmDetails';
import List from './components/list';

const starshipsList = [
  '/starships', 'starships', 'index + 1', 'list.name'
]

function App() {
  return (
    <div className="App">
      <h1>Swapi app</h1>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/characters' element={<PeopleList />}/>
        <Route path='/characters/:id' element={<PeopleDetails/>}/>
        <Route path='/films' element={<FilmList />}/>
        <Route path='/films/:id' element={<FilmDetails />}/>
        <Route path='/starships' element={<List listUrl={starshipsList[0]} listName={starshipsList[1]} listIndex={starshipsList[2]} listTitle={starshipsList[3]} />}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
