import { Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import Header from './components/Header';
import Home from './pages/Home'
import Cart from './pages/Cart'
import FullPizza from './pages/FullPizza';
import NotFound from './pages/NotFound'

import './scss/app.scss';
// import pizzas from './assets/pizza.json'

// export const SearchContext = createContext('');

// console.log(SearchContext );

export default function App() {
  const [searchValue, setSearchValue] = useState("");
  // const count = useSelector((state) => state.counter.count)
  const dispatch = useDispatch()

  // console.log(dispatch);

  return (
    <div className="wrapper">
      {/* <SearchContext.Provider value={{ searchValue, setSearchValue }}> */}
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/pizza/:pizzaId" element={<FullPizza />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </div>
      {/* </SearchContext.Provider> */}
    </div>
  );
}