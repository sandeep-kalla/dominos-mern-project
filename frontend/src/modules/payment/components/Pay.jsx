// Pay.jsx
import React, { useState } from 'react'
import { OAuth } from '../../../shared/services/oauth'
import { UserInfo } from '../../users/pages/UserInfo';

export const Pay = ({ total, address }) => {
  const [user, setUser] = useState(null);

  const orderNow = async () => {
    // Gmail Login
    const usercred = await OAuth();
    setUser(usercred.user);
  };

  return (
    <>
      {!user && <button onClick={orderNow} className='btn btn-primary'>Order Now</button>}
      {user && <UserInfo total={total} email={user.email} name={user.displayName} image={user.photoURL} address={address} />}
    </>
  );
};
