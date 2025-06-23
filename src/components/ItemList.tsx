import React from 'react';
//test
interface Item {
  
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

interface Props {
  isMobile?: boolean;
  items: Item[];
}

const ItemList: React.FC<Props> = ({ isMobile,items }) => {
  if (items.length === 0) {
    return <p>沒有符合條件的商品</p>;
  }
 if (isMobile) {
    // 卡片顯示
    return (
      <div className="itemcard-container">
        {items.map(item => (
          <div key={item.name} className="itemcard">
            <p>[商品名稱]	&nbsp;{item.name}</p>
            <p>[分類]	&nbsp;{item.category}</p>
            <p>[價格]	&nbsp;${item.price.toFixed(2)}</p>
            <span>[庫存]	&nbsp;</span>
            <span className={item.inStock ? 'in-stock' : 'off-stock'}>
              {item.inStock ? '有庫存' : '無庫存'}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="itemlist-container">
      <table className="itemlist-table">
        <thead >
          <tr>
            <th >商品名稱</th>
            <th >類別</th>
            <th >價格</th>
            <th >有庫存</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.name} >
              <td >{item.name}</td>
              <td >{item.category}</td>
              <td >${item.price.toFixed(2)}</td>
              <td >
                <span className={item.inStock ? 'in-stock' : 'off-stock'}>
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