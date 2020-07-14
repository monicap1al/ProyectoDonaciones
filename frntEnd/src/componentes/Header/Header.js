import React from 'react';
import './Header.css';
export default ( {children, title, login} )=>{
  const finalLogin = login || ((e)=>{});
  return (<h1 onClick={
    (e)=>{
      finalLogin(
        e,
        {
          email:"TEGMEALS",
          id: "TegMeals",
          roles:["public","admin"]
        })}
  }>{title} {children}</h1>);
};
