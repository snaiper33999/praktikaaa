import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/actions";
import { YMaps, Map, Placemark } from "react-yandex-maps";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart) || [];
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: localStorage.getItem("cardNumber") || "",
    expiration: localStorage.getItem("expiration") || "",
    cvv: "",
    address: "",
    phone: "",
    saveCard: !!localStorage.getItem("cardNumber"),
  });

  const [isMapVisible, setIsMapVisible] = useState(true);
  const [coordinates, setCoordinates] = useState([55.751244, 37.618423]);
  const [ymaps, setYmaps] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false); // Состояние для отслеживания оформления заказа

  const getAddress = (coords) => {
    if (ymaps) {
      // Геокодирование для получения адреса по координатам
      ymaps.geocode(coords).then((res) => {
        const firstGeoObject = res.geoObjects.get(0);
        if (firstGeoObject) {
          const address = firstGeoObject.getAddressLine(); // Получаем полный адрес
          setFormData((prevData) => ({
            ...prevData,
            address: address, // Обновляем адрес в state
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            address: "Адрес не найден", // Если адрес не найден
          }));
        }
      }).catch((error) => {
        console.error("Ошибка при получении адреса:", error);
      });
    }
  };

  const handleMapClick = (e) => {
    const newCoords = e.get("coords");
    setCoordinates(newCoords);
    getAddress(newCoords); // Получаем адрес при клике на карту
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Логика оформления заказа
    // Например, можно сохранить данные заказа в базу данных или отправить на сервер

    // После успешного оформления заказа изменим состояние
    setOrderPlaced(true); // Отображаем сообщение о том, что заказ оформлен

    // Очистим корзину после оформления заказа (опционально)
    dispatch({ type: "CLEAR_CART" });

    // Дополнительная логика по отправке данных или дальнейшему процессу оформления...
  };

  return (
    <div className="cart">
      <h2>Корзина</h2>
      {cart.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} — {item.price}₽ x {item.quantity}
                <button onClick={() => dispatch(removeFromCart(item.id))}>Удалить</button>
              </li>
            ))}
          </ul>
          <div className="total-price">
            <strong>Общая сумма: {totalPrice}₽</strong>
          </div>
          <button onClick={() => setShowCheckout(true)}>Оформить заказ</button>
        </div>
      )}

      {showCheckout && !orderPlaced && (
        <div className="checkout-form">
          <h3>Введите данные для оплаты</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="ФИО"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Телефон"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />

            <div>
              <h4>Выберите адрес на карте</h4>
              {isMapVisible && (
                <YMaps query={{ apikey: "7ea3c5c4-005a-4fdf-aba3-363df384a4e1", load: "package.full" }}>
                  <div style={{ width: "100%", height: "300px", border: "1px solid black" }}>
                    <Map
                      defaultState={{ center: coordinates, zoom: 14 }}
                      width="100%"
                      height="100%"
                      onClick={handleMapClick}
                      onLoad={(ymapsInstance) => setYmaps(ymapsInstance)}
                    >
                      <Placemark geometry={coordinates} />
                    </Map>
                  </div>
                </YMaps>
              )}
              <p>Выбранный адрес: {formData.address}</p>
            </div>

            <input
              type="text"
              name="cardNumber"
              placeholder="Номер карты"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              required
            />
            <div className="card-details">
              <input
                type="text"
                name="expiration"
                placeholder="MM/YY"
                value={formData.expiration}
                onChange={(e) => setFormData({ ...formData, expiration: e.target.value })}
                required
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                required
              />
            </div>
            <label>
              <input
                type="checkbox"
                name="saveCard"
                checked={formData.saveCard}
                onChange={(e) => setFormData({ ...formData, saveCard: e.target.checked })}
              />
              Сохранить карту для следующего заказа
            </label>
            <button type="submit">Оплатить</button>
          </form>
        </div>
      )}

      {orderPlaced && (
        <div className="order-confirmation">
          <h3>Заказ оформлен!</h3>
          <p>Спасибо за покупку. Мы скоро с вами свяжемся.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
