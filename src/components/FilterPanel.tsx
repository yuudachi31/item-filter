import React from 'react';
import { useMemo } from 'react';
import CategoryButton from './CategoryButton';
interface Item {
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

interface Filters {
  categories: string[];
  search: string;
  priceMin: string;
  priceMax: string;
  inStockOnly: boolean;
  sort: 'asc' | 'desc';
}

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;//ts要宣告setFilters是state 的函式
  items: Item[];
}
//REACT.FC 是 React 的「Function Component」型別 接收的 props 物件型別
const FilterPanel: React.FC<Props> = ({ filters, setFilters, items }) => {
  const categories = useMemo(() => {
    return Array.from(new Set(items.map(item => item.category)));
  }, [items]);


  const toggleCategory = (category: string) => {
    setFilters(prev => {
      const isSelected = prev.categories.includes(category);
      return {
        ...prev,
        categories: isSelected
          ? prev.categories.filter(c => c !== category)
          : [...prev.categories, category]
      };
    });
  };
  return (
    <div className="mb-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <input
        type="text"
        className="border p-2 rounded"
        placeholder="搜尋名稱"
        value={filters.search}
        onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
      />
      <div className="flex flex-wrap gap-2 category-buttons">
        <span style={{marginRight:5 }}>選擇分類: </span>
        {categories.map(cat => {
          // const selected = filters.categories.includes(cat);
          return (
            <CategoryButton
              key={cat}
              category={cat}
              selected={filters.categories.includes(cat)}
              onClick={toggleCategory}
            />
          );
        })}
      </div>

      <div className="flex gap-2">
        <input
          type="number"
          placeholder="最小價格"
          value={filters.priceMin}
          onChange={e => setFilters(f => ({ ...f, priceMin: e.target.value }))}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="最大價格"
          value={filters.priceMax}
          onChange={e => setFilters(f => ({ ...f, priceMax: e.target.value }))}
          className="border p-2 rounded w-full"
        />
      </div>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={filters.inStockOnly}
          onChange={e => setFilters(f => ({ ...f, inStockOnly: e.target.checked }))}
        />
        只顯示有庫存
      </label>
      <select
        className="border p-2 rounded"
        value={filters.sort}
        onChange={e => setFilters(f => ({ ...f, sort: e.target.value as 'asc' | 'desc' }))}
      >
        <option value="asc">價格由低到高</option>
        <option value="desc">價格由高到低</option>
      </select>
    </div>
  );
};

export default FilterPanel;