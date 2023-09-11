import './App.css';
import { Routes, Route } from "react-router-dom";
import { Homepage } from './screens/Homepage';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
