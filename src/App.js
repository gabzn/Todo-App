import './App.css';
import NavBar from './Navbar';
import Todo from './Todo';
//import StudentList from './StudentList';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() 
{
  return (
    <Router>
      <div className="App">
        <div className="Centerlize">
          <NavBar />

          <Switch>
          
            <Route exact path='/'>
              <Todo />
            </Route>
            
            {/* <Route exact path='/Student'>
              <StudentList />
            </Route> */}
            
          </Switch>

        </div>
      </div>
    </Router>
  );
}

export default App;