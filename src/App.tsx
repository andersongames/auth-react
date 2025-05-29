import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        {/* Other routes */}
      </Routes>
    </Router>
  )
}

export default App;
