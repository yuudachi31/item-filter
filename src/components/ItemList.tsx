import React from 'react';
//test
interface Item {
  
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

interface Props {
  items: Item[];
}

const ItemList: React.FC<Props> = ({ items }) => {
  if (items.length === 0) return <p className="text-gray-500">沒有符合條件的商品</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map(item => (
        <div key={item.name} className="border p-4 rounded shadow-sm">
          <h2 className="text-lg font-bold">{item.name}</h2>
          <p>分類：{item.category}</p>
          <p>價格：${item.price.toFixed(2)}</p>
          <p className={item.inStock ? 'text-green-600' : 'text-red-600'}>
            {item.inStock ? '有庫存' : '無庫存'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ItemList;