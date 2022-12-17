import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import PokemonSelector from './pages/PokemonSelector';
import InitialPage from './pages/InitialPage';
import Battle from './pages/Battle';
import Winner from './pages/Winner';
import Loser from './pages/Loser';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
      <Route index element={<InitialPage />} />
      <Route path='/' element={<InitialPage />} />
      <Route path="battle" element={<Battle />} />
      <Route path="winner" element={<Winner />} />
      <Route path='select-pokemon' element={<PokemonSelector />} />
      <Route path='loser' element={<Loser/>} />
      <Route path="*" element={<h1>NO PAGE!!!!</h1>} />
  </Routes>
</BrowserRouter>
);

