import { useState } from 'react';
import CookieButton from "./ManufactureTypeButton.jsx";


export default function DisplayAll({manufactureData, logManufactureType, helpMode}){

  const data = manufactureData;

  function formatWithCommas(value){
    const numberFormatter = Intl.NumberFormat('en-US');
    return numberFormatter.format(value);
  }

  
  // Dynamically creates the manufacture type data.
  return (
    <>
      {data.map((manuData) =>{
        return <div key={manuData.id} className="cell">
          <div className="prod-box center-txt">Purchased: {manuData.number}</div>
          <div className="prod-box"><img src={(helpMode && manuData.selectable)? manuData.imaget : manuData.image} /></div>
          <div className="prod-box center-txt">
            <div className='cost'>
              Cost: {formatWithCommas(manuData.price)} : Bonus: {formatWithCommas(manuData.bonus)}</div></div>
            <CookieButton key={manuData.id} 
              logManufactureType={logManufactureType} 
              idNum={manuData.id} 
              buttonLabel={manuData.buttonLabel}/>
          </div>
        })
      }
    </>
  );
}
