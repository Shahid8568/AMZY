import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { auth } from '../../Firebase.js'
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';
import authSlice, { userSignIn } from '../../store/slices/authSlice.jsx';
import { useDispatch } from 'react-redux';

const LoginModal = ({ show, onHide, setModalSignUp }) => {

    const [email, setEmail] = useState('wrteamshahid03@gmail.com')
    const [password, setPassword] = useState('123456')

    const [number, setNumber] = useState('')

    const dispatch = useDispatch()

    const forgotPasswordHandler = (e) => {
        // alert('clicked')
        e.preventDefault();
        if (email) {
            sendPasswordResetEmail(auth, email).then((data) => {
                toast.success('Reset password email sent!')
            }).catch(error => {
                toast.error(error)
            })
        }
        else {
            toast.error('Please enter email first')
        }
    }

    const signIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                toast.success('Login Successfully !')
                onHide()
                console.log(userCredential, 'userCredential')
                console.log('user', user)
                dispatch(userSignIn({ user }))
            }).catch((error) => {
                console.log(error)
                toast.error(error.message)
            })
    }

    return (
        <div>
            <Modal
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Login Modal
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={signIn}>
                        <div className='sign-in-container d-flex justify-content-between align-items-center flex-column'>
                            <div className="row loginModalWrapper">
                                <div className="col-12">
                                    <div className="inputWrapper">
                                        <label htmlFor="Email">Email</label>
                                        <input type="email" placeholder='Enter your  email' className='' value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="inputWrapper">
                                        <label htmlFor="Password">Password</label>
                                        <input type="password" placeholder='Enter your password' className='' value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="inputWrapper btnWrapper">
                                        <Button type='submit' className='mt-2 btn-danger text-center' >Log In</Button>

                                        <span className='mt-3 text-danger'
                                            onClick={forgotPasswordHandler}
                                            style={{ cursor: 'pointer' }}>Forgot Password ?
                                        </span>

                                        <span className='text-center mt-3 mb-2'>Does't have account ? <span className='signUpBtn text-danger' onClick={() => {
                                            onHide()
                                            setModalSignUp(true)
                                        }}>SignUp</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LoginModal;
