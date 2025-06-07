import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import SubscriptionPage from './pages/subscriptionsPage';
import LoginPage from './pages/loginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/assinatura" element={<SubscriptionPage />} />
        <Route path="/acessar" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
