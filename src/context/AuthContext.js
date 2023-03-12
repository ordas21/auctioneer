import { createContext, useEffect, useState } from 'react';
import { authApp, firestoreApp } from '../config/firebase';

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalMsg, setGlobalMsg] = useState('');

  // const register = (email, password) => {
  //   return authApp.createUserWithEmailAndPassword(email, password);

  // };



  const register = async (name, email, password, streetaddress, city, state, zipcode, phone 
    ) => {
    try {
      const res = await authApp.createUserWithEmailAndPassword(email, password);
      const user = res.user;
      // add user to firestore
      const db = firestoreApp.collection("users").doc(user.uid);
      await db.set({
        uid: user.uid,
        name: name,
        authProvider: "local",
        email: email,
        streetaddress: streetaddress,
        city: city,
        state: state,
        zip: zipcode,
        role: "user",
        phone: phone,
      });
      // redirect to dashboard
      // window.location.href = "/dashboard";
    } catch (err) {
    // display error message and close the modal  
    console.error(err);
    alert(err.message);
    }
  };

  const login = (email, password) => {
    return authApp.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return authApp.signOut();
  };

  const bidAuction = (auctionId, price) => {
    if (!currentUser) {
      return setGlobalMsg('Please login first');
    }

    let newPrice = Math.floor((price / 100) * 110);

    const liveAuction = firestoreApp.collection('auctions');
    const bidsCollection = firestoreApp.collection('bids');

    bidsCollection.doc().set({
      auctionId,
      bidder: currentUser.email,
      price: newPrice,
      timestamp: new Date(),
    });

    return liveAuction.doc(auctionId).update({
      curPrice: newPrice,
      curWinner: currentUser.email,
    });
  };

  const endAuction = (auctionId) => {
    const db = firestoreApp.collection('auctions');

    return db.doc(auctionId).delete();
  };

  useEffect(() => {
    const subscribe = authApp.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return subscribe;
  }, []);

  useEffect(() => {
    const interval = setTimeout(() => setGlobalMsg(''), 5000);
    return () => clearTimeout(interval);
  }, [globalMsg]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        bidAuction,
        endAuction,
        globalMsg,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
