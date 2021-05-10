import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar";
import CreateUser from "./components/create_user";
import CreateList from "./components/create_list";
import EditList from "./components/edit_list";
import TodoList from "./components/list_todo";



function App() {
  return (
    <Router>

      <div className="container">
        <Navbar />

        <br />

        <Route path="/" exact component={TodoList} />
        <Route path="/users" component={CreateUser}/>
        <Route path="/create" component={CreateList} />
        <Route path="/edit/:id" component={EditList} />
        

      </div>
      
    </Router>
  );
}

export default App;
