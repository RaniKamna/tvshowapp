import './App.css';
import { Routes, Route } from "react-router-dom";
import { Homepage } from './screens/Homepage';
import { Loginpage } from './screens/Loginpage';
import { Searchpage } from './screens/Searchpage';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route exact path='/login' element={<Loginpage />} />
        <Route exact path='/search' element={<Searchpage />} />
      </Routes>
    </div>
  );
}

export default App;
