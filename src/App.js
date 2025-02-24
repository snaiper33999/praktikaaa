// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductList from './components/ProductList'; // Список товаров
import ContactForm from './components/ContactForm'; // Контактная форма
import Cart from './components/Cart'; // Корзина
import './App.css'; // Подключаем стили

const App = () => {
  return (
    <Router>
      <div className="app">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Главная</Link>
              </li>
              <li>
                <Link to="/contact">Контактная форма</Link>
              </li>
              <li>
                <Link to="/cart">Корзина</Link> {/* Добавляем ссылку на корзину */}
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/cart" element={<Cart />} /> {/* Маршрут для корзины */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;