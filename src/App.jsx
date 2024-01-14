import { useState, useEffect, useRef } from 'react';
import DisplayAll from './components/DisplayAll.jsx';
import CookieClick from './components/CookieClick.jsx';
import ResetButton from './components/ResetButton.jsx';
import Instructions from './components/Instructions.jsx';
import DataOperations from './classes/DataOperations.js';

import './App.css';


export default function App() {

  // The constructor in the class handles checking local data storage and 
  // loading it if present.
  let dataOps = new DataOperations();

  let manufactureDataAll = dataOps.getAllInventoryData();
  
  // All state variables and main inventory object state.
  const [cookiesEarned, setCookiesEarned] = useState(dataOps.getCookiesEarned());
  const [manufactureData, addManufactureType] = useState(dataOps.getAllInventoryData());
  const [cookieIncValue, recordCookieClick] = useState(dataOps.getCookieIncVal()); // change var name
  const [cookiesPerSec, setCps] = useState(1);
  const [isCookieRegisteredAsClicked, animateCookie] = useState(false);

  
  
  // The value of CookiesEarned is updated on the page every second.
  useEffect(() => {
    const cookieIncreaseInterval = setInterval(() => {
      setCookiesEarned((currentCookies) => currentCookies + cookieIncValue);
    }, 1000);
    
    // clean up
    return () => {
      clearInterval(cookieIncreaseInterval);
    };
  }, [cookiesPerSec]);


  // The inventory and cookie counting data is sent to the dataops class in
  // this block, so that it can be sent to local storage.  
  useEffect(() => {
    dataOps.pushCookiesEarned(cookiesEarned);
    dataOps.pushCookieIncValue(cookieIncValue);
    dataOps.pushManufData(manufactureData);
    dataOps.setLocallyStoredObject();
    handleHighlightedImages();
  }, [cookiesEarned]);


  useEffect(() => {
    dataOps.pushCookieIncValue(cookieIncValue);
  }, [cookieIncValue]);
  

  // Cookie clicking animation code starts here.
  // Animation: cookie image flipped between large and smaller, then back to
  // large again: in component CookieClick.
  const timer = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => (console.log('Click time set up')), 100);
    return () => clearTimeout(timer);
  }, []);
  

  const flipCookieQuickly = (e) => {
    animateCookie(true);
    timer.current = setTimeout(() => animateCookie(false), 80);
  }


  useEffect(() => {
    // clean up
      return () => clearTimeout(timer.current);
  }, []);
  // Cookie clicking animation code ends here.



  // Needed for buttons in 'DisplayAll' component.
  // Contains values of how many inventory items have been purchased.
  const allManufactureTypeCounts = manufactureDataAll.map(({number}) => number);


  // Updates the count of manufacture type (i.e. number of ovens, factories etc)
  // increases by one via button click if there is enough earnt cookies. 
  function logManufactureType(index){
    const enoughCookies = isThereEnoughCookiesForThePurchase(index);

    // if so, update the count for the manufactured type and subtract from cookiesEarned
    if(enoughCookies){
      const prevValue = manufactureData[index].number;
      const newState = manufactureData.map(obj => {
          if(obj.id == index) {
            return {...obj, number: (prevValue + 1)};
          } else return obj;
        }
      );
      addManufactureType(newState);
      recordCookieClick(()=>{return (cookieIncValue + manufactureData[index].bonus)});
      setCookiesEarned(()=>{return (cookiesEarned - manufactureData[index].price)});
    }
  }


  function isThereEnoughCookiesForThePurchase(index){
    if(cookiesEarned >= manufactureData[index].price) return true;
    return false;
  }


  function handleHighlightedImages(){
    // Update with true or false, depending on if there are enough cookies to
    // purchase, then return the object to update manufactureData and therefore
    // its state.

   
      //  const newState = manufactureData.map(obj => {
      //    if(obj.price <= cookiesEarned) {
      //      return {...obj, selectable: true};
      //    } else {
      //      return {...obj, selectable: false};
      //   }
      // });
      // console.log(newState);
      //  addManufactureType(newState);  // this should be correct (rest as anonymous)
  }


  function clickReset(){
    setCookiesEarned(1);
    setCps(1);
    recordCookieClick(1);
    addManufactureType(manufactureDataAll);
    animateCookie(false);
    localStorage.clear();
  }


  function setCookieClick(){
    setCookiesEarned(prevCount => prevCount + cookieIncValue);
    setCps(prevCount => calcNewCookiesPerSecVal());
    flipCookieQuickly(); // trigger the cookie click animation
  }


  function calcNewCookiesPerSecVal(){
    const newCookiePerClickVal = cookieIncValue + cookiesEarned;
    return newCookiePerClickVal;
  }


  function formatWithCommas(value){
    const numberFormatter = Intl.NumberFormat('en-US');
    return numberFormatter.format(value);
  }


  return (
    <>
      <div>
        <section>
          <div className="grid-container">
            <div className="box center-txt">
            <p>Cookies earnt</p>
            <div id="num-cookies">{formatWithCommas(cookiesEarned)}</div>
          </div>
          
          <div className="box center-txt">
            <p>Cookies per click</p>
            <div id="cookies-per-sec">{formatWithCommas(cookieIncValue)}</div>
          </div>
        </div>
      </section>
        
        <CookieClick 
          setCookieClick={setCookieClick} 
          isCookieRegisteredAsClicked={isCookieRegisteredAsClicked} 
          />

        <div id="products">
          <DisplayAll 
            manufactureData={manufactureData} 
            logManufactureType={logManufactureType} 
            allManufactureTypeCounts={allManufactureTypeCounts}
          />
        </div>
        <div className="clear"></div>
        <ResetButton clickReset={clickReset}/>
      </div>
      <Instructions />
    </>
  )
}