import React, { useEffect, useState, useMemo } from 'react';
import itemsData from './json/items.json';
import FilterPanel from './components/FilterPanel';
import ItemList from './components/ItemList';
import { useIsMobile } from './hooks/useIsMobile';
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
//最多顯示100筆資料

export default function App() {
  const [items, setItems] = useState<Item[]>([]);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    search: '',
    priceMin: '',
    priceMax: '',
    inStockOnly: false,
    sort: 'asc'
  });
  const isMobile = useIsMobile(); // 假設 breakpoint = 768
  const pageSize = isMobile ? 20 : 50;
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    setItems(itemsData);
  }, []);
  // 每當 filter 改變時，重設回第一頁
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
  // 使用 useMemo 來計算過濾後的商品列表
  const filteredItems = useMemo(() => {
    return items
      .filter(item =>
        (filters.categories.length === 0 || filters.categories.includes(item.category)) &&
        item.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        (!filters.priceMin || item.price >= Number(filters.priceMin)) &&
        (!filters.priceMax || item.price <= Number(filters.priceMax)) &&
        (!filters.inStockOnly || item.inStock)
      )
      .sort((a, b) => filters.sort === 'asc' ? a.price - b.price : b.price - a.price);
  }, [items, filters]);
  // 計算總頁數
  const totalPages = Math.ceil(filteredItems.length / pageSize);
  const pagedItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage]);
  return (
    <div className="container">
      <h2 >商品篩選系統</h2>
      <FilterPanel filters={filters} setFilters={setFilters} items={items} />
      <ItemList items={pagedItems} isMobile={isMobile}/>
      <div className='page-buttons'>
        <button
          className="page-button"
          onClick={() => setCurrentPage(p => p - 1)}
          disabled={currentPage === 1}
        >
          上一頁
        </button>
        <span>第 {currentPage} / {totalPages} 頁</span>
        <button
          className="page-button"
          onClick={() => setCurrentPage(p => p + 1)}
          disabled={currentPage === totalPages}
        >
          下一頁
        </button>
      </div>

    </div>
  );
}
