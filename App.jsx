
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './header';
import Home from './home';
import LoginPage from './Login_page';
import Contact from './Contact';
import About from './About';
import MainRoutes from './routes/MainRoutes';

function App() {
  return (

    <Router>
      
      <Header />
      <MainRoutes />
 
    </Router>
    
  );
}

export default App;
