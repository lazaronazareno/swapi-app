import './App.scss';
import PeopleList from './components/peopleList';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PeopleDetails from './components/peopleDetails';
import Home from './components/home';
import List from './components/list';
import Details from './components/details';
import NotFound from './components/notFound';
import Footer from './components/footer';
import Header from './components/header';

const filmsList = ['/films', 'title', ['people', 'species', 'starships', 'vehicles', 'planets']]
const starshipsList = ['/starships', 'name', ['films', 'pilots']]
const vehiclesList = ['/vehicles', 'name', ['films', 'pilots']]
const speciesList = ['/species', 'name', ['films', 'species']]
const planetsList = ['/planets', 'name', ['films', 'residents']]

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='people'>
          <Route path=':id' element={<PeopleDetails/>}/>
          <Route index element={<PeopleList />} />
        </Route>
        <Route path='films' >
          <Route path=':id' element={<Details detailsUrl={filmsList[0]} axiosList={filmsList[2]}/>}/>
          <Route index element={<List listUrl={filmsList[0]} listTitle={filmsList[1]} />} />
        </Route>
        <Route path='starships' >
          <Route path=':id' element={<Details detailsUrl={starshipsList[0]}/>}/>
          <Route index element={<List listUrl={starshipsList[0]} listTitle={starshipsList[1]} />} />
        </Route>
        <Route path='vehicles' >
          <Route path=':id' element={<Details detailsUrl={vehiclesList[0]}/>}/>
          <Route index element={<List listUrl={vehiclesList[0]} listTitle={vehiclesList[1]} />} />
        </Route>
        <Route path='species' >
          <Route path=':id' element={<Details detailsUrl={speciesList[0]}/>}/>
          <Route index element={<List listUrl={speciesList[0]} listTitle={speciesList[1]} />} />
        </Route>
        <Route path='planets' >
          <Route path=':id' element={<Details detailsUrl={planetsList[0]}/>}/>
          <Route index element={<List listUrl={planetsList[0]} listTitle={planetsList[1]} />} />
        </Route>
        <Route path='*' element={<NotFound />}/>
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
