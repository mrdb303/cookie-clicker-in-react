export default function CookieClick({setCookieClick, isCookieRegisteredAsClicked}){

  return (
    <div id="cookie-wrapper">
      <div id="cookie-box">
        <input type="image" 
          src={isCookieRegisteredAsClicked?'/cookie_smaller.png':'/cookie.png'} 
          onClick={setCookieClick} id="cookie-button" />
      </div>
    </div>
  );
}
