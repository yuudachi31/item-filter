import React from 'react';

interface Props {
  category: string;
  selected: boolean;
  onClick: (category: string) => void;
}

const CategoryButton: React.FC<Props> = ({ category, selected, onClick }) => {
  return (
    <button
      onClick={() => onClick(category)}
      className={`${selected ? 'selected' : ''}`}
    >
      {category}
    </button>
  );
};

export default CategoryButton;