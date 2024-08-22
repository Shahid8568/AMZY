'use client'
import React, { useState } from 'react';
import Image from 'next/image'
import navLogo from '../../Assets/images/amzyLogo.png'
import Link from 'next/link'
import { FaCartPlus, FaSearch, } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoReorderThree } from "react-icons/io5";
import LoginModal from '../Auth/LoginModal';
import SignUp from '../Auth/SignUpModal';
import { auth } from '../../Firebase'
import { useDispatch, useSelector } from 'react-redux';
import { userLogOut } from '../../store/slices/authSlice.jsx';
import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast';
import { setIsCartLink } from '@/store/slices/UserProducts';

const Header = () => {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalSignUp, setModalSignUp] = useState(false);
  const dispatch = useDispatch()

  const authUser = useSelector(state => state.authSlice)
  const user = useSelector(state => state.authSlice.isLogIn)
  // console.log('userLog', user)
  // console.log('authUser', authUser)

  const isVerified = authUser.isVerified;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const userSignOut = () => {
    signOut(auth).then(() => {
      toast.success('Log out Successfully')
      dispatch(userLogOut(false))
    }).catch((err) => [
      console.log(err)
    ])
  }

  const handleCartNavigate = () => {
    dispatch(setIsCartLink({ data: true }))
  }

  return (
    <>
      <header>
        <div className="container navbarWrapper">
          <div className="leftDiv">
            <div className="navLogo">
              <Image src={navLogo} height={0} width={0} alt='navLogo' />
            </div>
          </div>
          <div className="centerDiv">
            <nav className="navbar">
              <ul>
                <span><Link href="/" >Home</Link></span>
                <span><Link href="/men" >Men</Link></span>
                <span><Link href="/women" >Women</Link></span>
                <span onClick={handleCartNavigate}><Link href="/profile" >
                  <FaCartPlus /> Cart
                </Link></span>
              </ul>
            </nav>
          </div>
          <div className="rightDiv">
            <div className="searchBar">
              <input type="text" placeholder='Search' />
              <span><FaSearch /></span>
            </div>
            <div className="profileTab">
              {
                user ?
                  <Dropdown>
                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                      {
                        authUser.userName ? <span className='text-light'>{authUser.userName}</span> : <span className='text-light'>{authUser.userEmail}</span>
                      }
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Link href={'/profile'}>
                        <Dropdown.Item href='/profile'>Profile</Dropdown.Item>
                      </Link>
                      <Dropdown.Item onClick={userSignOut}>LogOut</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  : <span className='btn btn-danger text-light' onClick={() => setModalShow(true)}>Login/Sign Up</span>
              }
            </div>
          </div>
          <span onClick={handleShow} id='hamburg'><IoReorderThree size={46} /></span>
        </div>
        <Offcanvas show={show} onHide={handleClose} placement='end'
          scroll={true}
          backdrop={true}>
          <Offcanvas.Header closeButton className='btn-close-white'>
            <Offcanvas.Title></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="navbarWrapper">
              <div className="centerDiv">
                <nav className="navbar">
                  <ul>
                    <span><Link href="/" >Home</Link></span>
                    <span><Link href="Men" >Men</Link></span>
                    <span><Link href="Women" >Women</Link></span>
                    <span><Link href="Cart" > Cart <FaCartPlus />
                    </Link></span>
                  </ul>
                </nav>
              </div>
              <div className="rightDiv">
                <div className="searchBar">
                  <input type="text" placeholder='Search' />
                  <span><FaSearch /></span>
                </div>
                <div className="profileTab">
                  {
                    user ?
                      <Dropdown>
                        <Dropdown.Toggle variant="danger" id="dropdown-basic">
                          {
                            authUser.userName ? <span className='text-light'>{authUser.userName}</span> : <span className='text-light'>{authUser.userEmail}</span>
                          }
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Link href={'/profile'}>
                            <Dropdown.Item href='/profile'>Profile</Dropdown.Item>
                          </Link>
                          <Dropdown.Item onClick={userSignOut}>LogOut</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      : <span className='btn btn-danger text-light' onClick={() => setModalShow(true)}>Login/Sign Up</span>
                  }
                </div>
              </div>
            </div>

          </Offcanvas.Body>
        </Offcanvas>
      </header >


      <LoginModal
        show={modalShow}
        setModalSignUp={setModalSignUp}
        onHide={() => setModalShow(false)}

      />
      <SignUp show={modalSignUp} onHide={() => setModalSignUp(false)} />

    </>

  )
}

export default Header
