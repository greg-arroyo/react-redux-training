import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { HomePage } from './containers/HomePage';
import { UserPage } from "./containers/UserPage";
import { NotFound } from "./containers/NotFound";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route exact path="/user/:userId" element={<UserPage/>}/>
          <Route path="*" element={<NotFound/>}>404 Not Found</Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
