import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertContext } from '../../../context/AlertContext';
import { AuthContext } from '../../../context/AuthContext';

function EditCurrency() {
    const { id } = useParams(); // Get currency ID from URL
    const [currency, setCurrency] = useState({
        code: '',
        name: '',
        exchange_rate_to_usd: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [validationError, setValidationError] = useState({});
    const { alertSuccess, alertFailure } = useContext(AlertContext);
    const { getAuthToken } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the currency details to populate the form
        const fetchCurrency = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/currencies/${id}`, {
                    method:'GET',
                    headers: {
                        'Authorization': `Bearer ${getAuthToken()}`
                    }
                });

                const data = await response.json();
                if (response.ok) {
                  console.log(data.data);
                  
                    setCurrency(data.data);
                } else {
                    alertFailure("Failed to fetch currency details.");
                }
            } catch (error) {
                console.error("Error fetching currency:", error);
                alertFailure("An error occurred while fetching currency details.");
            }
        };

        fetchCurrency();
    }, [id, getAuthToken, alertFailure]);

    const handleChange = (e) => {
        setCurrency({ ...currency, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const errors = {};
        if (!currency.code) errors.code = "The Currency code is required.";
        if (!currency.name) errors.name = "The Currency name is required.";
        if (!currency.exchange_rate_to_usd) errors.exchange_rate_to_usd = "The Exchange rate is required.";
        else if (isNaN(currency.exchange_rate_to_usd)) errors.exchange_rate_to_usd = "The Exchange rate must be a number.";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError({}); // Clear previous errors
        const errors = validateForm();

        if (Object.keys(errors).length > 0) {
            setValidationError(errors);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/currencies/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: JSON.stringify(currency)
            });

            if (response.ok) {
                alertSuccess("Currency updated successfully!");
                navigate('/admin/currencies'); // Redirect after successful update
            } else {
                const result = await response.json();
                alertFailure(result.message || "Failed to update currency.");
                setValidationError(result.data || {});
            }
        } catch (error) {
            console.error("Error updating currency:", error);
            alertFailure("An error occurred while updating currency.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="content-wrapper">
            <section className="content-header"></section>
            <section className="content">
                <div className="container-fluid">
                    <form onSubmit={handleSubmit}>
                        <div className='card'>
                            <div className='card-header'>
                                <h3 className='card-title font-weight-bold'>Edit Currency</h3>
                            </div>
                            <div className='card-body'>
                                <div className="form-group">
                                    <label>Currency Code</label>
                                    <input
                                        type="text"
                                        name="code"
                                        value={currency.code}
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />
                                    {validationError.code && <span style={{ color: "red" }}>{validationError.code}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={currency.name}
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />
                                    {validationError.name && <span style={{ color: "red" }}>{validationError.name}</span>}
                                </div>
                                <div className="form-group">
                                    <label>Exchange Rate to USD</label>
                                    <input
                                        type="number"
                                        name="exchange_rate_to_usd"
                                        value={currency.exchange_rate_to_usd}
                                        className="form-control"
                                        onChange={handleChange}
                                        required
                                    />
                                    {validationError.exchange_rate_to_usd && <span style={{ color: "red" }}>{validationError.exchange_rate_to_usd}</span>}
                                </div>
                            </div>
                            <div className='card-footer'>
                                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                                    {isLoading ? (
                                        <div className="spinner-border spinner-border-sm" role="status">
                                            <span className="sr-only">Loading...</span>
                                        </div>
                                    ) : 'Update Currency'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default EditCurrency;
