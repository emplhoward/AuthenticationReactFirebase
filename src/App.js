import logo from './logo.svg';
import './App.css';
import Signup from './Signup'
import { Container } from 'react-bootstrap'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import Login from './Login'
import Dashboard from './Dashboard'

function App() {
  return (
    <>
        <div className="App">
            <h1>
              Authentication System <br></br> React and Firebase
            </h1>

            <img src={logo} className="App-logo" alt="logo" />

            <Container>
              <BrowserRouter>
                <Routes>
                  <Route exact path="/" element={<HomePage />}/>
                  <Route path="/Signup" element={<Signup />}/>
                  <Route path="/Login" element={<Login />}/>
                  <Route path="/Dashboard" element={<Dashboard />}/>
                </Routes>
              </BrowserRouter>          
            </Container>           
        </div>        
    </>

  );
}

export default App;
