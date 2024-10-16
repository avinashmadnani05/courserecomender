import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './pages/login';
import Domain from './pages/domain';
import UserInput from './pages/UserInput';
import User from './pages/user';
import HomePage from './pages/Home';
import Creators from './pages/creators';
import DomainInput from './pages/domain';
function App() {
  return (
  <>
    
    
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<Signup />} />

      <Route path="/login" element={<Login />} />
      <Route path="/UserInput" element={<UserInput />} />
      <Route path="/domain" element={<DomainInput />} />
      <Route path="/user" element={<User />} />
      <Route path="/creators" element={<Creators />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
    </BrowserRouter>
</>
  );
};

export default App;
