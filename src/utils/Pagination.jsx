import React from 'react';
import '../css/pagination.css';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageClick = (page) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination">
            {totalPages > 1 && (
                <ul className="pagination-list">
                    {pageNumbers.map((page) => (
                        <li key={page} className={`pagination-item ${currentPage === page ? 'active' : ''}`}>
                            <button onClick={() => handlePageClick(page)} className="btn btn-link">
                                {page}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Pagination;
