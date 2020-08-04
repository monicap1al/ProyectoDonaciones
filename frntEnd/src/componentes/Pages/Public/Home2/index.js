import React from 'react';
import Page from '../../Page';

export default ({auth})=>{
  return (
    <Page pageTitle="Recolecta HN" auth={auth}>
        <body>
          <h2>#QuédateEnCasa #HoyPorTiMañanaPorMi</h2>
          <h2>Bienvenido</h2>
        </body>
    </Page>
  )
}