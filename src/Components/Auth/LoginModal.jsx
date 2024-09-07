import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { auth } from '../../Firebase.js'
import { GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import toast from 'react-hot-toast';
import { userSignIn } from '../../store/slices/authSlice.jsx';
import { useDispatch } from 'react-redux';
import { getAuthErrorMessage } from '../utils/index.jsx';
import GoogleBtn from './GoogleBtn.jsx';

const LoginModal = ({ show, onHide, setModalSignUp }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
                dispatch(userSignIn({ user }))
            }).catch((error) => {
                console.log(error)
                toast.error(error.message)
            })
    }

    // sign in google
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                toast.success('Login Successfully !')
                onHide()
                console.log('user', user)
                dispatch(userSignIn({ user }))
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                var errorCode = error.code
                var errorMessage = getAuthErrorMessage(errorCode);
                toast.error(errorMessage)
            });
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
                                        <Button type='submit' className='mt-2 mb-4 fw-bold btn-danger text-center' >Log In</Button>

                                        <GoogleBtn signInWithGoogle={signInWithGoogle} />

                                        <span className='mt-3 text-danger'
                                            onClick={forgotPasswordHandler}
                                            style={{ cursor: 'pointer' }}>Forgot Password ?
                                        </span>

                                        <span className='text-center mt-3 mb-2 fw-bold'>Does't have account ? <span className='signUpBtn text-danger' onClick={() => {
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
