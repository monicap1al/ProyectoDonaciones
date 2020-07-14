import React from 'react';
import Page from '../../Page';

export default ({auth})=>{
  return (
    <Page pageTitle="TEGMEALS" auth={auth}>
      <p>Bienvenidos a TegMeals</p>
      <p>#QuedateEnCasa</p>
    </Page>
  )
}
