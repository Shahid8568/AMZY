import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { auth } from '../../Firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import authSlice, { userSignIn } from '../../store/slices/authSlice.jsx';

const SignUp = ({ show, onHide }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const signUp = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                toast.success('Login Successfully !')
                onHide()
                console.log(userCredential, 'userCredential')
                console.log('user', user)
                dispatch(userSignIn({ user }))
            }).catch((error) => {
                console.log(error)
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
                        Create Account
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={signUp}>
                        <div className='sign-in-container d-flex justify-content-center align-items-center flex-column'>
                            <h5>Sign-Up Now</h5>
                            <div className="row loginModalWrapper">
                                <div className="col-12">
                                    <div className="inputWrapper">
                                        <label htmlFor="Email">Email</label>
                                        <input type="email" placeholder='Enter your email' className='' value={email} onChange={(e) => setEmail(e.target.value)} />
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
                                    <Button type='submit' className='mt-2 mb-2 btn-danger' >Sign Up</Button>
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

export default SignUp;
