import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import { MovieDetails } from './pages/MovieDetails';
import { Favorites } from './pages/Favorites';
import './App.module.css'



function App() {
    return (
        <Router>
            <Navbar />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/filme/:id" element={<MovieDetails />} />
                    <Route path="/favorites" element={<Favorites />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
