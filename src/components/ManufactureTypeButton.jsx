import { useState } from 'react';

export default function CookieButton( { idNum, logManufactureType, buttonLabel}){

  return (
    <div className="prod-box">
    <button className='buy' onClick={() => logManufactureType(idNum)}>{buttonLabel}</button>
    </div>
  );
}
