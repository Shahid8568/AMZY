'use client'
import React, { useEffect, useState } from 'react'
import Wishlist from './Wishlist';
import ProfileBreadcrumb from '@/Components/ProfileBreadcrumb';
import profileImg from '../../Assets/profileimages/male.svg'
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux'
import { userProfile, userLogOut } from '../../store/slices/authSlice.jsx'
import { toast } from 'react-hot-toast'
import { signOut } from 'firebase/auth'
import { auth } from '@/Firebase';
import Cart from './Cart';
import { useRouter } from 'next/router';
import { isCartLinkSelector, setIsCartLink } from '@/store/slices/UserProducts';
import Coupons from './Coupons';

const Index = () => {

  const dispatch = useDispatch()
  const authUser = useSelector(state => state.authSlice)

  const isCartLink = useSelector(isCartLinkSelector)

  const router = useRouter();
  useEffect(() => {
    // console.log(router, 'router')
  }, [router])

  // console.log(authUser)

  const tabs = [
    {
      id: 0,
      tab: 'My Profile',
    },
    {
      id: 1,
      tab: 'Wishlist',
    },
    {
      id: 2,
      tab: 'My Coupons',
    },
    {
      id: 3,
      tab: 'Cart',
    },
  ]

  const [activeTab, setActiveTab] = useState('My Profile');
  const [userData, setUserData] = useState({
    name: authUser.userName,
    email: authUser.userEmail,
    number: authUser.userNumb
  })

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (activeTab === 'My Profile' || 'Wishlist' || 'My Coupons'){
      dispatch(setIsCartLink({data: false}))
    }
      if (isCartLink) {
        setActiveTab('Cart')
      }
  }, [isCartLink])




  const updateProfile = (e) => {
    e.preventDefault();
    dispatch(userProfile({ name: userData.name, email: userData.email, number: userData.number }))
    toast.success('Profile Update Successfully!')
  }


  const userSignOut = () => {
    signOut(auth).then(() => {
      toast.success('Log out Successfully')
      dispatch(userLogOut(false))
    }).catch((err) => [
      console.log(err)
    ])
  }

  const accDelete = () => {
    signOut(auth).then(() => {
      toast.success('Log out Successfully')
      dispatch(userLogOut(false))
    }).catch((err) => [
      console.log(err)
    ])
  }


  return (
    <>
      <section className="userProfile commonMT">
        <div className="container">
          <div className="row tabAndContentWrapper">
            <div className="col-12 col-lg-2">
              <div className="tabsDiv">
                <div className="tabsWrapper">
                  <div className='tab-headers'>
                    {
                      tabs?.map((data) => {
                        return <div className={`tab-header ${activeTab === data.tab ? 'active' : ''}`} onClick={() => handleTabClick(data.tab)}>
                          <span>
                          </span>
                          <span>{data.tab}</span>
                        </div>
                      })
                    }
                  </div>
                </div>
              </div>

            </div>

            <div className="col-12 col-lg-10">
              <div className='contentDiv '>
                {/* Content based on active tab */}
                {activeTab === 'My Profile' && (
                  <div className='row'>
                    <ProfileBreadcrumb title={'My Profile'} />
                    <div className="row profileDataWrapper">

                      <div className="col-12">
                        <div className="profileWrapper">
                          <div>
                            <Image width={30} height={30} src={profileImg.src} alt="" />
                          </div>
                          <div className='nameWrapper'>
                            <span>Hello,  </span>
                            <span>{authUser.userName ? authUser.userName : 'Guest'}</span>
                          </div>

                        </div>
                      </div>
                      <div className="col-12">
                        <form action="" className='form-control border-0 profileUpdateForm' onSubmit={updateProfile}>
                          <div className="row align-items-end">
                            <div className="col-12 col-lg-4">
                              <div className="inputWrapper">
                                <label htmlFor="name">Name : </label>
                                <input type="text" value={userData.name} placeholder='Enter Your Name' onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
                              </div>
                            </div>
                            <div className="col-12 col-lg-4">
                              <div className="inputWrapper">
                                <label htmlFor="email"> Email: </label>
                                <input type="email" value={userData.email} placeholder='Enter Your Email' onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                              </div>
                            </div>

                            <div className="col-12 col-lg-4">
                              <button className='updateBtn'>Update</button>
                            </div>
                          </div>
                        </form>

                      </div>

                      <div className="col-12 actionbtns d-flex gap-2 align-items-center justify-content-center">
                        <button className='btn btn-warning py-2' onClick={userSignOut}>Log Out</button>
                        <button className='btn btn-danger py-2' onClick={accDelete}>Delete Account</button>
                      </div>
                    </div>


                  </div>
                )}

                {activeTab === 'Wishlist' && (
                  <div className='row wishlistDataWrapper'>
                    <Wishlist />
                  </div>
                )}
                {activeTab === 'Cart' && (
                  <div className='row cartDataWrapper'>
                    <Cart />
                  </div>
                )}
                {activeTab === 'My Coupons' && (
                  <div className='row cartDataWrapper'>
                    <Coupons/>
                  </div>
                )}


                {/* Add more conditional content for other tabs as needed */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Index
