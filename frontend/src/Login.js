import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Validation from './LoginValidation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues(
           prev => ({
                ...prev,
                
                [e.target.name]: e.target.value
              })
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setErrors(Validation(values));
        if(errors.email === '' && errors.password === '') {
            axios.post('http://localhost:8081/login', values)
            .then( res => 
                {if(res.data === "Success") {
                    navigate('/home');
                }
                else {
                    alert('Invalid email or password');
                }
            })
            .catch( err => console.log(err));
        }
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='text-center'><strong>Log in</strong></h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input onChange={handleInput} className='form-control-rounded-0' type="email" id="email" name="email" placeholder="Enter Email" />
                        <span>{errors.email && <span className='text-danger'>{errors.email} </span>}</span>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input onChange={handleInput} className='form-control-rounded-0' type="password" id="password" name="password" placeholder="Enter Password" />
                        <span>{errors.password && <span className='text-danger'>{errors.password} </span>}</span>
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0"><strong>Log in</strong></button>
                <p>You are agree about terms and policies</p>
                <Link to="/signup" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;