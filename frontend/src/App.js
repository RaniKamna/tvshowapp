import './App.css';
import { Routes, Route } from "react-router-dom";
import { Homepage } from './screens/Homepage';
import { Loginpage } from './screens/Loginpage';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
        <Route exact path='/login' element={<Loginpage />} />
      </Routes>
    </div>
  );
}

export default App;
