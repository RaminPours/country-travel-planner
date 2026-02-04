import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import CountriesPage from "./pages/CountriesPage";
import CountryDetailPage from "./pages/CountryDetailPage";
import PlannerPage from "./pages/PlannerPage";
import BookYourTrip from "./pages/BookYourTrip";


export default function App() {
  
return (
    <BrowserRouter>
      <Routes>
        <Route 
            element={<Layout />}>
          <Route 
            path="/" 
            element={<Navigate to="/countries" replace />} 
            />
          <Route 
            path="/countries" 
            element={<CountriesPage />} 
            />
          <Route 
            path="/countries/:code" 
            element={<CountryDetailPage />} 
            />
          <Route 
            path="/planner" 
            element={<PlannerPage />} 
            />
         <Route 
            path="/book/:code" 
            element={<BookYourTrip />} 
            />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
