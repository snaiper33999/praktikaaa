import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/actions';

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);


  return (
    <div>
      <h2>Список элементов</h2>
      {items.length > 0 ? (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default ItemList;