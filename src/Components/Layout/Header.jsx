'use client'
import React, { useState } from 'react';
import Image from 'next/image'
import navLogo from '../../Assets/images/amzyLogo.png'
import Link from 'next/link'
import { FaShoppingCart, FaSearch, } from "react-icons/fa";
// import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { IoReorderThree } from "react-icons/io5";
import LoginModal from '../Auth/LoginModal';
import SignUp from '../Auth/SignUpModal';
import { auth } from '../../Firebase'
import { useDispatch, useSelector } from 'react-redux';
import { userLogOut, userSelector } from '../../store/slices/authSlice.jsx';
import { signOut } from 'firebase/auth'
import toast from 'react-hot-toast';
import { cartCountSelector, setIsCartLink } from '@/store/slices/UserProducts';
import { useRouter } from 'next/router';
import SearchBar from '../SearchBar';
import { Dropdown, Space } from 'antd/lib';
import { FaAngleDown } from "react-icons/fa";

const Header = () => {

  const router = useRouter()

  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalSignUp, setModalSignUp] = useState(false);
  const dispatch = useDispatch()

  const authUser = useSelector(userSelector)
  const user = authUser.isLogIn
  const cartCount = useSelector(cartCountSelector)

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
    handleClose()
  }


  const items = [
    {
      label: (
        <Link href={'/profile'}>
          Profile
        </Link>
      ),
      key: '0',
    },
    {
      label: (
        <span onClick={userSignOut}>
          Logout
        </span>
      ),
      key: '1',
    },
  ];

  return (
    <>
      <header>
        <div className="container navbarWrapper">
          <div className="leftDiv">
            <div className="navLogo">
              <Link href={'/'}>
              <Image src={navLogo} height={0} width={0} alt='navLogo' />
              </Link>
            </div>
          </div>
          <div className="centerDiv">
            <nav className="navbar">
              <ul>
                <li>
                  <Link href="/" className={`${router.pathname === '/' ? 'active' : ''}`}>Home
                  </Link>
                </li>
                <li>
                  <Link href="/men" className={`${router.pathname === '/men' ? 'active' : ''}`}>Men</Link>
                </li>
                <li>
                  <Link href="/women" className={`${router.pathname === '/women' ? 'active' : ''}`}>Women</Link>
                </li>
                <li onClick={handleCartNavigate} >
                  <Link href="/profile" className={`${router.pathname === '' ? 'active' : ''} cartIconWrapper`}>
                    Cart <FaShoppingCart size={22} />
                    {
                      cartCount > 0 &&
                      <span className='cartBadge'>{cartCount}</span>
                    }
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="rightDiv">
            <div className="searchBar">
              <SearchBar handleClose={handleClose} />
            </div>
            <div className="profileTab">

              {
                user ?
                  <Dropdown
                    menu={{
                      items,
                    }}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        {
                          authUser.userName ? <span className='text-light'>{authUser.userName?.length > 12 ? authUser?.userName.slice(0, 12) + '..' : authUser?.userName}</span> : <span className='text-light'>{authUser.userEmail.slice(0, 12)}..</span>
                        }
                        <FaAngleDown />
                      </Space>
                    </a>
                  </Dropdown>
                  : <div>
                    <span className='btn btn-danger text-light' onClick={() => setModalShow(true)}>Login</span>
                    <span className='btn btn-danger text-light ms-2' onClick={() => setModalSignUp(true)}>Sign Up</span>
                  </div>
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
                    <li onClick={handleClose}>
                      <Link href="/" className={`${router.pathname === '/' ? 'active' : ''}`}>Home
                      </Link>
                    </li>
                    <li onClick={handleClose}>
                      <Link href="/men" className={`${router.pathname === '/men' ? 'active' : ''}`}>Men</Link>
                    </li>
                    <li onClick={handleClose}>
                      <Link href="/women" className={`${router.pathname === '/women' ? 'active' : ''}`}>Women</Link>
                    </li>
                    <li onClick={handleCartNavigate} >
                      <Link href="/profile" className={`${router.pathname === '' ? 'active' : ''} cartIconWrapper`}>
                        Cart <FaShoppingCart size={22} />
                        {
                          cartCount > 0 &&
                          <span className='cartBadge'>{cartCount}</span>
                        }
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="rightDiv">
                <div className="searchBar">
                  <SearchBar handleClose={handleClose} />
                </div>
                <div className="profileTab">
                  {
                    user ?
                      <Dropdown
                        menu={{
                          items,
                        }}
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            {
                              authUser.userName ? <span className='text-light'>{authUser.userName?.length > 12 ? authUser?.userName.slice(0, 12) + '..' : authUser?.userName}</span> : <span className='text-light'>{authUser.userEmail.slice(0, 12)}..</span>
                            }
                            <FaAngleDown />
                          </Space>
                        </a>
                      </Dropdown>
                      : <div>
                        <span className='btn btn-danger text-light' onClick={() => setModalShow(true)}>Login</span>
                        <span className='btn btn-danger text-light ms-2' onClick={() => setModalSignUp(true)}>Sign Up</span>
                      </div>
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
