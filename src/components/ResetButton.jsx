
export default function ResetButton({clickReset}){

  return (
    <div id="reset-button-wrapper">
      <button type="button" id="reset" onClick={clickReset} className="bolder reset">Reset</button>
    </div>
  );

}