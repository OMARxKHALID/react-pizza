import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../../features/menu/categorySlice';
import Pagination from '../page/Pagination';

function Menu() {
  const menu = useLoaderData();
  const itemsPerPage = 7;
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  const dispatch = useDispatch();

  const handleCategoryChange = (e) => {
    const clickedCategory = e.target.value;
    dispatch(setCategory(clickedCategory || null));
  };

  const allCategories = [...new Set(menu.map((item) => item.category))];
  const filteredMenu = selectedCategory ? menu.filter((pizza) => pizza.category === selectedCategory) : menu;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleMenu = filteredMenu.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredMenu.length / itemsPerPage);

  return (
    <div className="container mx-auto my-3 p-4 ">
      <div className="flex items-center mb-4">
        <label className="text-lg font-bold mr-auto">Select Category:</label>
        <select
          className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
          onChange={handleCategoryChange}
          value={selectedCategory || ''}
        >
          <option value="">All</option>
          {allCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <ul className="divide-y divide-gray-300 px-2">
        {visibleMenu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza._id} />
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}

export async function loader() {
  return await getMenu();
}

export default Menu;
