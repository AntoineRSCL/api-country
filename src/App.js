import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";
import DetailCountryPage from "./pages/DetailCountryPage";
import Navbar from "./components/Navbar";
import React, { useState } from 'react';
import Footer from "./components/Footer";

const App = () => {

  const [isOpen, setIsOpen] = useState(false);

  return ( 
    <Router>
      <Navbar isOpen={isOpen} toggleNavbar={() => setIsOpen(!isOpen)} />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/country" element={<CountryPage />}/>
          <Route path="/country/:countryName" element={<DetailCountryPage />}/>
        </Routes>
      </main>
      <Footer />
    </Router>
   );
}
 
export default App;