import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './Pages/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/'>
        <Routes>
          <Route exact path='/' >
            <Route path='/' element={<Auth />} />
          </Route>
          <Route exact path='/*' render={() => <Navigate replace to='/' />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
