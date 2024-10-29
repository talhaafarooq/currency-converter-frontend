import React, { useState, useContext } from 'react'
import BreadCrumb from '../../components/BreadCrumb';
import { useNavigate } from 'react-router-dom';
import { alertContext } from '../../context/AlertContext';

function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [validationError,setValidationError] = useState({});
    const navigate = useNavigate();

    // Context API
    const { alertSuccess } = useContext(alertContext);



    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            const result = await response.json();
            if (result.statusCode == 201) {
                alertSuccess(result.message);
                navigate('/login');
            } else {
                if(result.statusCode == 422) {
                    setValidationError(result.data);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <React.Fragment>
            <BreadCrumb title="Register" sub_title="Register New Account" />
            {/* Registration form start */}

            <section className="section contact-info pb-5">
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 offset-lg-3 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="name" id="name" className="form-control" onChange={handleChange} required />
                                    {validationError.name?<span style={{ color: "red" }}>{validationError.name}</span>:null} 
                                </div>
                            </div>
                            <div className="col-lg-6 offset-lg-3 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" name="email" id="email" className="form-control" onChange={handleChange} required />
                                    {validationError.email?<span style={{ color: "red" }}>{validationError.email}</span>:null} 
                                </div>
                            </div>
                            <div className="col-lg-6 offset-lg-3 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="text" name="password" id="password" className="form-control" onChange={handleChange} />
                                    {validationError.password?<span style={{ color: "red" }}>{validationError.password}</span>:null} 
                                </div>
                            </div>
                            <div className="col-lg-6 offset-lg-3 col-md-6 col-sm-12">
                                <div class="form-group">
                                    <input type="submit" className="btn btn-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
            {/* Registration from end */}
        </React.Fragment>
    )
}

export default Register