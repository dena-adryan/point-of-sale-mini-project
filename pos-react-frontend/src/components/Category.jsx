/* eslint-disable react/prop-types */

const Category = ({ categoryId, categoryName, onClick, selectedCategory }) => {
    return (
        <div
            className={` ${selectedCategory === categoryId ? 'bg-orange-400' : 'bg-stone-100'} hover:bg-stone-200  p-2 border rounded-lg mx-1`}
        >
            <button onClick={() => onClick(categoryId)}>
                <h3
                    className={` ${selectedCategory === categoryId ? 'text-white' : 'text-orange-400'} font-bold `}
                >
                    {categoryName}
                </h3>
            </button>
        </div>
    );
};

export default Category;
