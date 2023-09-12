import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Generate from './component/Generate';
import Search from './component/Search';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/search" Component={Search} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
