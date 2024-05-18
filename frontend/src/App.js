import logo from './logo.svg';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Home from './Home';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
