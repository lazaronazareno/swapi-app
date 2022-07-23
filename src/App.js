import './App.css';
import PeopleList from './components/peopleList';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PeopleDetails from './components/peopleDetails';

function App() {
  return (
    <div className="App">
      <h1>Swapi app</h1>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<PeopleList />}/>
        <Route path='/:name' element={<PeopleDetails/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
