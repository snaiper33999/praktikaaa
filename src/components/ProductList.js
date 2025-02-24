import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";

const productsData = [
  { id: 1, name: "Товар A", price: 300, image: "https://img.freepik.com/free-psd/weathered-bare-tree-branch-against-transparent-background_84443-30463.jpg?t=st=1737831085~exp=1737834685~hmac=28101a9e73efe8e7096e996fda7f5977318649925f7f9354bdd33cf40c1341dd&w=826" },
  { id: 2, name: "Товар B", price: 200, image: "https://svgx.ru/svg/2962084.svg" },
  { id: 3, name: "Товар C", price: 100, image: "https://svgx.ru/svg/2885709.svg" },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const [sortType, setSortType] = useState("");
  const [products, setProducts] = useState(productsData);
  const [excludeFilter, setExcludeFilter] = useState([]);

  const handleSort = (type) => {
    let sortedProducts = [...products];

    if (type === "price-asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (type === "price-desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (type === "name-asc") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "name-desc") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }

    setSortType(type);
    setProducts(sortedProducts);
  };

  const toggleExcludeFilter = (productName) => {
    setExcludeFilter((prev) =>
      prev.includes(productName)
        ? prev.filter((name) => name !== productName)
        : [...prev, productName]
    );
  };

  return (
    <div className="product-container">
      {/* Панель сортировки */}
      <div className="sort-bar">
        <label>Сортировать: </label>
        <select value={sortType} onChange={(e) => handleSort(e.target.value)}>
          <option value="">Выберите...</option>
          <option value="price-asc">Цена (по возрастанию)</option>
          <option value="price-desc">Цена (по убыванию)</option>
          <option value="name-asc">Название (A-Z)</option>
          <option value="name-desc">Название (Z-A)</option>
        </select>
      </div>

      {/* Фильтр исключения */}
      <div className="exclude-filter">
        <label>Исключить товары:</label>
        {productsData.map((product) => (
          <label key={product.id}>
            <input
              type="checkbox"
              checked={excludeFilter.includes(product.name)}
              onChange={() => toggleExcludeFilter(product.name)}
            />
            {product.name}
          </label>
        ))}
      </div>

      {/* Список товаров */}
      <div className="products">
        {products
          .filter((product) => !excludeFilter.includes(product.name)) 
          .map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>Цена: {product.price}₽</p>
              <button onClick={() => dispatch(addToCart(product))}>Добавить в корзину</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
