import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import Private from './components/Private';
import NewTicket from './pages/NewTicket';
import Tickets from './pages/Tickets';
import Ticket from './pages/Ticket';

function App() {

      let [mode, setMode] = useState(false);


      const changeMode = () => {
          setMode(!mode);
      }

     

  return (
    <div>
    <Router>
    <div className="App flex flex-col" data-theme={!mode ? "light" : "dark"}>
      <div>
      <Header changeMode={changeMode}/>
      </div>
      <div>
      <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>}/>

      <Route path="/new-ticket" element={<Private />}>
          <Route path="/new-ticket" element={<NewTicket />}/>
      </Route>

      <Route path="/tickets" element={<Private />}>
          <Route path="/tickets" element={<Tickets />}/>
      </Route>

      <Route path="/ticket/:id" element={<Private />}>
          <Route path="/ticket/:id" element={<Ticket />}/>
      </Route>

      


      </Routes>
      </div>


    </div>
    </Router>
    <ToastContainer />
    </div>
  );
    
}

export default App;
