import React, { useEffect, useState } from 'react';
import AllProducts from './allProducts/AllProducts';
import { FaSearch } from 'react-icons/fa';
import Link from 'next/link';

const SearchBar = ({ handleClose }) => {

    const allProductsData = AllProducts;
    const [query, setQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [navigated, setNavigated] = useState(false)

    const handleSearch = (e) => {
        const searchQuery = e.target.value.toLowerCase();
        setQuery(searchQuery);

        if (searchQuery === '') {
            setFilteredProducts([]);
        } else {
            const filtered = allProductsData.filter((product) =>
                product.title.toLowerCase().includes(searchQuery)
            );
            setFilteredProducts(filtered);
        }
    };

    useEffect(() => {
        if (navigated) {

            setTimeout(() => {
                setNavigated(false)
            }, 2000);
        }

    }, [navigated])


    const handleNavigated = () => {
        setNavigated(true)
        setQuery('')
        handleClose()
    }


    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search"
                className="searchInput"
            />
            <span><FaSearch /></span>
            {
                query?.length > 0 && !navigated &&
                <div className="suggestions">
                    {filteredProducts.length > 0 ? (
                        <ul>
                            {filteredProducts.map((product) => (
                                <Link href={`/product-detail/${product?.id}`}>
                                    <li key={product.id} className='text-dark' onClick={handleNavigated}>
                                        <img src={product.img.src} alt={product.title} width={30} />
                                        {product.title}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    ) : <div className='d-flex align-items-center justify-content-center h-100 fw-bold h5'>No Data</div>
                    }
                </div>
            }
        </div>
    );
};

export default SearchBar;
