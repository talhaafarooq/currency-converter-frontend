import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AlertContext } from '../../context/AlertContext';
import { LocalStorageContext } from '../../context/LocalStorageContext';

function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [validationError, setValidationError] = useState({});
    const navigate = useNavigate();

    // Context API
    const { alertSuccess } = useContext(AlertContext);
    const { setAuthToken } = useContext(LocalStorageContext);



    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const result = await response.json();
            if (result.statusCode == 200) {
                setAuthToken('authToken', result.data.token);
                alertSuccess(result.message);
                setIsLoading(false);
                navigate('/admin/dashboard');
            } else if (result.statusCode == 404) {
                setValidationError({ password: result.message });
                setIsLoading(false);
            }
            else {
                if (result.statusCode == 422) {
                    setValidationError(result.data);
                    setIsLoading(false);
                }
            }
        } catch (err) {
            console.log(err);
            setIsLoading(false);
        }
    }
    return (
        <React.Fragment>
            {/* Registration form start */}

            <form onSubmit={handleSubmit} className='mt-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3 col-md-6 col-sm-12">
                            <div className='card'>
                                <div className="card-header bg-info">
                                    <h3 className='card-title'>Login</h3>
                                </div>
                                <div className="card-body">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" name="email" id="email" className="form-control" onChange={handleChange} required />
                                        {validationError.email ? <span style={{ color: "red" }}>{validationError.email}</span> : null}
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="text" name="password" id="password" className="form-control" onChange={handleChange} />
                                        {validationError.password ? <span style={{ color: "red" }}>{validationError.password}</span> : null}
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" disabled={isLoading}>
                                        {isLoading ? (
                                            <div className="spinner-border spinner-border-sm" role="status">
                                                <span className="sr-only">Loading...</span>
                                            </div>
                                        ) : 'Login'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/* Registration from end */}
        </React.Fragment >
    )
}

export default Login;