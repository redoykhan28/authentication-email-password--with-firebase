import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import app from '../../Firebase/firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Registration = () => {
    //state for error
    const [error, setError] = useState('');

    //state for success
    const [success, setSuccess] = useState('')

    //handler for submit registration form
    const submitHandler = (e) => {
        e.preventDefault();
        let form = e.target;
        let name = form.name.value
        let email = form.email.value
        let password = form.password.value

        // console.log(name, email, password);

        //handle regular expression for password
        if (!/(?=.*[0-9])/.test(password)) {

            setError('Please use atleast a digit..');
            return;
        }

        if (!/(?=.*[!@#$%^&*])/.test(password)) {

            setError('Please use atleast a special character(@,#,$,%,^,&,*,)')
            return;
        }

        if (password.length < 8) {

            setError('Please use password length atleast 8')
            return;
        }

        setError('')

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                setSuccess('Registration successful...');
                form.reset();
                mailVarification();
            })
            .catch(err => {

                console.log(err)
                setError('This username is already Exist! try another one')
            })
    }

    //email varification
    const mailVarification = () => {

        sendEmailVerification(auth.currentUser)
            .then(() => {

                alert('An email varification link send to your email. Please varify!')
            })
            .catch(error => {

                console.error(error)
            })
    }

    return (
        <div>
            <form onSubmit={submitHandler} className='mt-5 w-50 mx-auto'>
                <h3 className='text-warning my-3'>Registration Here,</h3>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Name</label>
                    <input type="text" name='name' className="form-control" id="formGroupExampleInput" placeholder="FullName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Email</label>
                    <input type="email" name='email' className="form-control" id="formGroupExampleInput2" placeholder="Email" required />
                </div>

                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput3" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="formGroupExampleInput3" placeholder="Password" required />
                    <p><small className='mt-3 text-danger'>{error}</small></p>
                    <p><small className='mt-3 text-success'>{success}</small></p>
                </div>

                <input className="btn btn-warning text-white fw-bold mb-3" type="submit" value="Sign In" />
                <p><small>Already have an account? <Link to={'/login'}>login</Link></small></p>
            </form>



        </div>
    );
};

export default Registration;