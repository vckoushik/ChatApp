import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import {Routes,Route,Navigate} from 'react-router-dom';
import Home from './pages/Home';
import { useContext } from 'react';
import Cookies from 'universal-cookie';
import { AuthContext } from './context/AuthContext';
function App() {
  
  const { currentUser } = useContext(AuthContext);


  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className="App">
     <Routes>
     <Route path="/" >
          <Route
            index
            element={
              <ProtectedRoute>
                <Home user={currentUser} />
              </ProtectedRoute>
            }
          />
        <Route  path="login" element={<Login/>}></Route>
        <Route  path="signup" element={<Register/>}></Route>
        <Route  path="*" element={<NotFound />}></Route>
        </Route>
     </Routes>
    </div>
  );
}

export default App;
