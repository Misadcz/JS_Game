import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Validation from './SignupValidation';
import { useState } from 'react';
import axios from 'axios';

function Signup() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setErrors(Validation(values));
        if(errors.name === '' && errors.email === '' && errors.password === '') {
            axios.post('http://localhost:8081/signup', values)
            .then( res => navigate('/') )
            .catch( err => console.log(err));
        }
        
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='text-center'><strong>Sign up</strong></h2>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input onChange={handleInput} className='form-control-rounded-0' type="text" id="name" name="name" placeholder="Enter Name" />
                        <span>{errors.name && <span className='text-danger'>{errors.name} </span>}</span>
                    </div>
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
                    <button type="submit" className="btn btn-success w-100 rounded-0"><strong>Sign up</strong></button>
                    <p>You are agree about terms and policies</p>
                    <Link to="/login" className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log in</Link>
                </form>
            </div>
        </div>
    )
}

export default Signup;