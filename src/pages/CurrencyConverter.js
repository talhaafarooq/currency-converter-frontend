import React, { useEffect, useState } from 'react';

const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [data, setData] = useState({
        from_currency_id: '',
        to_currency_id: '',
        amount: '',
    });
    const [convertedAmount, setConvertedAmount] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    // Fetch available currencies
    const fetchCurrencies = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/currencies`);
            const result = await response.json();
            // console.log("data",result.data);
            

            if (result.statusCode === 200) {
                setCurrencies(result.data);
            } else {
                setError(result.message || 'Invalid data format from server');
            }
        } catch (err) {
            setError('Failed to fetch currencies');
        }
    };

    useEffect(() => {
        fetchCurrencies();
    }, []);

    // Handle currency conversion
    const handleConvert = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setValidationErrors({});
        setConvertedAmount(null);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/convert`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.statusCode === 200) {
                setConvertedAmount(result.data.converted_amount);
            } else {
                if (result.errors) {
                    setValidationErrors(result.errors);
                } else {
                    setError(result.message || 'Conversion failed');
                }
            }
        } catch (err) {
            setError('Conversion failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-5">
            <div className="card" style={{ boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' }}>
                <div className="card-header bg-info text-center">
                    <h3 className='card-title'>Currency Converter</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleConvert}>
                        <div className="form-group">
                            <label htmlFor="from_currency_id">From Currency:</label>
                            <select
                                id="from_currency_id"
                                name="from_currency_id"
                                value={data.from_currency_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value="">Select From Currency</option>
                                {currencies.map((currency) => (
                                    <option key={currency.id} value={currency.id}>
                                        {currency.name} ({currency.code})
                                    </option>
                                ))}
                            </select>
                            {validationErrors.from_currency_id && (
                                <p className="text-danger">{validationErrors.from_currency_id[0]}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="to_currency_id">To Currency:</label>
                            <select
                                id="to_currency_id"
                                name="to_currency_id"
                                value={data.to_currency_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value="">Select To Currency</option>
                                {currencies.map((currency) => (
                                    <option key={currency.id} value={currency.id}>
                                        {currency.name} ({currency.code})
                                    </option>
                                ))}
                            </select>
                            {validationErrors.to_currency_id && (
                                <p className="text-danger">{validationErrors.to_currency_id[0]}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="amount">Amount:</label>
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                value={data.amount}
                                onChange={handleInputChange}
                                placeholder="Amount"
                                className="form-control"
                                required
                            />
                            {validationErrors.amount && (
                                <p className="text-danger">{validationErrors.amount[0]}</p>
                            )}
                        </div>

                        <button type="submit" className="btn btn-info w-100" disabled={loading}>
                            {loading ? 'Converting...' : 'Convert'}
                        </button>
                    </form>

                    {loading && <p className="text-center my-3">Loading...</p>}
                    {error && <p className="text-center text-danger my-3">{error}</p>}
                    {convertedAmount !== null && (
                        <div className="alert alert-success mt-3 text-center font-weight-bold">
                            Converted Amount: {convertedAmount}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CurrencyConverter;
