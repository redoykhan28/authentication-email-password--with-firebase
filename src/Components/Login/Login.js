import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../../Firebase/firebase.init';


const auth = getAuth(app)

const Login = () => {

    //state for login error
    const [error, setError] = useState('');

    //state for mail
    const [email, setMail] = useState('')

    //state of mail for forget password

    //login handler
    const handleLogin = (e) => {
        e.preventDefault();
        let form = e.target;
        let email = form.email.value
        let password = form.password.value

        // console.log(email, password)

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {

                const user = result.user;
                console.log(user)
                form.reset();
                alert('Login Successful')
                setError('')
            })

            .catch(error => {

                console.error(error)
                setError(error.message)
            })

    }

    //handle email
    const emailHandler = (e) => {

        let mail = e.target.value
        console.log(mail);
        setMail(mail)
    }

    const handlerForgetPassword = () => {

        sendPasswordResetEmail(auth, email)
            .then(() => {

                alert('Your password set link send to your mail');
            })
    }

    return (
        <div>
            <form className='w-50 mx-auto' onSubmit={handleLogin}>
                <h3 className='text-success my-3'>Login Here,</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onBlur={emailHandler} type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="exampleInputPassword1" />
                </div>
                <p><small className='text-danger'>{error}</small></p>

                <button type="submit" className="btn btn-success text-white fw-bold mb-3">Submit</button>

                <p><small>Need an account? Create your account from <Link to={'/registration'}>Registration</Link></small></p>
                <p><small onClick={handlerForgetPassword}>Forget Password..<Link>Click here..</Link></small></p>
            </form>
        </div>
    );
};

export default Login;