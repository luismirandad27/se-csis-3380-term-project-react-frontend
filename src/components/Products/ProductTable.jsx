import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProductList , updateProduct} from '../../services/ProductService';
import Pagination from '../../layouts/Pagination';

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();
    const [editing, setEditing] = useState(null); // Track if editing mode is on

    useEffect(() => {
        const fetchProducts = async () => {
             const page = searchParams.get('page') || 1; 
            const filters = { ...Object.fromEntries(searchParams), page };

            try {
                const response = await getProductList(filters);
                setProducts(response.products);
                setTotalPages(response.totalPages);
                setCurrentPage(response.page);
            } catch (error) {
                console.error('Error while fetching products', error);
            }
        };
        fetchProducts();
        window.scrollTo(0, 0); 
    }, [searchParams]);

    const handleSearchChange = (event) => {
        const { name, value } = event.target;
        const newSearchParams = new URLSearchParams(searchParams);

        newSearchParams.set('page', '1');
        newSearchParams.set(name, value);

      if(value === ''){
        newSearchParams.delete(name);
      }
       
        setSearchParams(newSearchParams);
    };


    const handleEdit = (prodId) => {
        setEditing(prodId);
    };


    const handleSave = async (prodId, index) => {
        //console.log(index)
        const product = products.find(p => p._id === prodId);
        try {
            await updateProduct(product, index);
            setEditing(null); // Exit editing mode
            //console.log('Product updated successfully');
            
            window.alert('Product updated successfully');
        } catch (error) {
            console.error('Error updating product', error);
        }
    };


    const handleChange = (event, prodId, subtypeIndex) => {
        const {name, value} = event.target;
        const updatedProducts = [];
        const updatedSubtypes = [];

        products.forEach(product => {
            if (product._id===prodId){
                product.product_subtypes.forEach((subtype, index) => {
                    if (index === subtypeIndex) {
                        updatedSubtypes.push({...subtype, [name]: value});
                    } else {
                        updatedSubtypes.push(subtype);
                    }
                });
                updatedProducts.push({...product, product_subtypes: updatedSubtypes});
            }
            else{
                updatedProducts.push(product);
            }
        })
        setProducts(updatedProducts);
    };

    return (
        <>
        <div className="container pt-40 px-40 pb-20 md:mx-auto min-h-screen">
            <div className='pb-[10px]'>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search by ID" 
                        name='id'
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg pb-[15px]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 text-center">    
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">ID</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Weight</th>
                            <th scope="col" className="px-6 py-3">Stock</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) =>
                            product.product_subtypes.map((subtype, index) => (
                                <tr key={`${product.prod_id}-${index}`} className="bg-white border-b  hover:bg-amber-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"> {product.name} </th>
                                    <td className="px-6 py-4">{product.prod_id}</td>
                                    <td className="px-6 py-4">{product.product_category.name}</td>
                                    <td className="px-6 py-4">{subtype.weight.name}</td>
                                    <td className="px-6 py-4">
                                        {editing === product._id ? (
                                            <input
                                                type="number"
                                                value={subtype.stock}
                                                className="appearance-none bg-transparent border-none text-green-500 mr-3 py-1 px-2 leading-tight focus:outline-none text-center  font-medium text-sm rounded-lg h-[35px] w-[100px]"
                                                onChange={(e) => handleChange(e, product._id, index)}
                                                name="stock"
                                            />
                                        ) : (
                                            subtype.stock
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editing === product._id ? (
                                            <input
                                                type="text"
                                                value={subtype.price}
                                              
                                                className="appearance-none bg-transparent border-none text-green-500 mr-3 py-1 px-2 leading-tight focus:outline-none text-center  font-medium text-sm rounded-lg h-[35px] w-[100px]"
                                                onChange={(e) => handleChange(e, product._id, index)}
                                                name="price"
                                            />
                                        ) : (
                                            subtype.price
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editing === product._id ? (
                                            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500" onClick={() => handleSave(product._id, index)}>Save</button>
                                        ) : (
                                            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500" onClick={() => handleEdit(product._id)}>Edit</button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center pt-10">
            <Pagination totalPages={totalPages} currentPage={currentPage} />
            </div>
        </div>
        </>
    );
};

export default ProductTable;