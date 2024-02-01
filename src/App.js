import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CountryPage from "./pages/CountryPage";

const App = () => {
  return ( 
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/country" element={<CountryPage />}/>
        </Routes>
      </main>
    </Router>
   );
}
 
export default App;