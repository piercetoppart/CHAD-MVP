import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ProtoMVP from './pages/ProtoMVP';

function Home() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </button>
      </div>
      <p>
        <Link to="/proto">Go to Proto MVP</Link>
      </p>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proto" element={<ProtoMVP />} />
      </Routes>
    </Router>
  );
}

export default App;
