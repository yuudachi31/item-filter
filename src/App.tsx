import React, { useEffect, useState, useMemo } from 'react';
import itemsData from './json/items.json';
import FilterPanel from './components/FilterPanel';
import ItemList from './components/ItemList';

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

  useEffect(() => {
    setItems(itemsData);
  }, []);

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">商品篩選系統</h1>
      <FilterPanel filters={filters} setFilters={setFilters} items={items} />
      <ItemList items={filteredItems} />
    </div>
  );
}
