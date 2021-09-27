import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { useState } from 'react'

let api = 'https://crudcrud.com/api/caa6c65c8147403096fc29a778f87ca2/tracker'

function App() {
  const [mode, setMode] = useState("light") // for mode
  const toggleMode = () => {
    if(mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = '#042743';
    } else {
      setMode("light");
      document.body.style.backgroundColor = 'white';
    }
  }
  return (
    <div className="App">
      <Navbar mode={mode} toggleMode={toggleMode}/>
      <Home mode={mode}/>
    </div>
  );
}

export default App;
export {api};