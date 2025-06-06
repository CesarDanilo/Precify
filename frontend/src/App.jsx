import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import SubscriptionPage from './pages/subscriptionsPage'; // Supondo que salvou com este nome

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/assinatura" element={<SubscriptionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
