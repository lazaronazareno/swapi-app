import './App.scss';
import PeopleList from './components/peopleList';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PeopleDetails from './components/peopleDetails';
import Home from './components/home';
import List from './components/list';
import Details from './components/details';
import NotFound from './components/notFound';

const filmsList = ['/films', 'title']
const starshipsList = ['/starships', 'name']
const vehiclesList = ['/vehicles', 'name']
const speciesList = ['/species', 'name']
const planetsList = ['/planets', 'name']

function App() {
  return (
    <div className="App">
      <h1 className='mainTitle'>Star Wars Encyclopedia</h1>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/people' element={<PeopleList />}/>
        <Route path='/people/:id' element={<PeopleDetails/>}/>

        <Route path='/films' element={<List listUrl={filmsList[0]} listTitle={filmsList[1]} />}/>
        <Route path='/films/:id' element={<Details detailsUrl={filmsList[0]}/>}/>

        <Route path='/starships' element={<List listUrl={starshipsList[0]} listTitle={starshipsList[1]} />}/>
        <Route path='/starships/:id' element={<Details detailsUrl={starshipsList[0]}/>}/>

        <Route path='/vehicles' element={<List listUrl={vehiclesList[0]} listTitle={vehiclesList[1]} />}/>
        <Route path='/vehicles/:id' element={<Details detailsUrl={vehiclesList[0]}/>}/>

        <Route path='/species' element={<List listUrl={speciesList[0]} listTitle={speciesList[1]} />}/>
        <Route path='/species/:id' element={<Details detailsUrl={speciesList[0]}/>}/>

        <Route path='/planets' element={<List listUrl={planetsList[0]} listTitle={planetsList[1]} />}/>
        <Route path='/planets/:id' element={<Details detailsUrl={planetsList[0]}/>}/>

        <Route element={<NotFound />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
