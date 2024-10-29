import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../../utils/Pagination';
import { AlertContext } from '../../../context/AlertContext';
import { AuthContext } from '../../../context/AuthContext';

function Currencies() {
    const [currencies, setCurrencies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage] = useState(2);

    const { getAuthToken } = useContext(AuthContext);
    const { alertSuccess, confirmAction } = useContext(AlertContext);

    const loadCurrencies = async (page = 1) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/currencies?page=${page}&per_page=${itemsPerPage}`);
            const result = await response.json();

            if (result.statusCode === 200) {
                setCurrencies(result.data.data);
                setTotalItems(result.totalItems);
            } else {
                console.error('Error:', result.message || 'Failed to fetch currencies');
            }
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        loadCurrencies(page); // Load currencies for the new page
    };

    useEffect(() => {
        loadCurrencies(currentPage); // Load currencies on initial render
    }, [currentPage]);


    const handleDeleteCurrency = async (id) => {
        const result = await confirmAction("Are you sure you want to delete this currency?", "Yes, Delete it!");
    
        if (result.isConfirmed) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/currencies/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`
                    }
                });
    
                if (response.status === 204) {
                    alertSuccess("Currency deleted successfully.");
                    loadCurrencies(currentPage); // Reload currencies after deletion
                } else {
                    const responseData = await response.json(); 
                    console.error('Error:', responseData.message || 'Failed to delete currency');
                }
            } catch (err) {
                console.error('Error:', err);
            }
        }
    };
    


    return (
        <div className="content-wrapper">
            <div className="container-fluid mb-5">
                <section className="content-header"></section>
                <section className="content">
                    <div className="card">
                        <div className="card-header">
                            <div className="card-title ml-2"><b>All Currencies</b></div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Currency Code</th>
                                        <th scope="col">Currency Name</th>
                                        <th scope="col">Exchange Rate to USD</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currencies.length > 0 ?
                                        currencies.map((currency, index) => (
                                            <tr key={index}>
                                                <td>{index + 1 + currentPage * itemsPerPage}</td>
                                                <td>{currency.code}</td>
                                                <td>{currency.name}</td>
                                                <td>{currency.exchange_rate_to_usd}</td>
                                                <td>
                                                    <Link to={`/admin/currencies/${currency.id}/edit`} class="btn btn-outline-info btn-sm"><i class="fa fa-edit"></i></Link>
                                                    <Link to="#" class="btn btn-outline-danger btn-sm ml-1" onClick={() => handleDeleteCurrency(currency.id)}>
                                                        <i class="fas fa-trash-alt"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="text-center text-danger font-weight-bold">No Currencies Available...</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                            {/* Pagination Component */}
                            <Pagination
                                currentPage={currentPage}
                                totalItems={totalItems}
                                itemsPerPage={itemsPerPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Currencies;