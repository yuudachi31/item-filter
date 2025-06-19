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
  if (items.length === 0) {
    return <p className="text-gray-500">沒有符合條件的商品</p>;
  }

  return (
    <div className="overflow-x-auto itemlist-container">
      <table className="min-w-full table-auto border border-gray-300 itemlist-table">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">商品名稱</th>
            <th className="border px-4 py-2 text-left">類別</th>
            <th className="border px-4 py-2 text-right">價格</th>
            <th className="border px-4 py-2 text-center">有庫存</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.name} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.category}</td>
              <td className="border px-4 py-2 text-right">${item.price.toFixed(2)}</td>
              <td className="border px-4 py-2 text-center text-sm font-medium">
                <span className={item.inStock ? 'text-green-600' : 'text-red-600'}>
                  {item.inStock ? '是' : '否'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;