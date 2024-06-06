// Depositcredit.jsx
import React, { useState } from 'react';
import './Depositcredit.css';
import axios from 'axios';
const Depositcredit = () => {
  const [input, setInput]=useState("")
  const [risk, setRisk]=useState("")


  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
const handleclick =async()=>{
  const Response = await axios.post("http://127.0.0.1:5000/recommend"
  ,{"rejection_cause":input})
  console.log("response is ",Response)
  //Response.data.rejection_cause
}
const Risklvl=async()=>
{ const email=localStorage.getItem("email")
  const Response = await axios.post("http://127.0.0.1:5000/predict", 
  {
    "rejection_cause":email 
});
setRisk(Response.data.Risk_Level)
  console.log("response is ",Response)
}

  return (
    <div className="credit-form">
      <h3 style={{ textAlign: 'center', color: '#573E06' }}>Enter your credit amount here</h3>
      
      {/* Moved the vocal button inside the form group */}
      <div className="form-group">
        <button className="vocal-button">🎤 Vocal</button>
        <label htmlFor="credit">Credit Amount:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button onClick=  {handleclick} className="icon-button">✉️</button>
          <input  onChange={handleInputChange} type="text" id="credit" name="credit" placeholder="Your amount" style={{ border: '2px solid #E6BE8A', borderRadius: '5px', padding: '10px', width: '100%' }} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="credit-purpose">Credit Purpose:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="icon-button">✉️</button>
          <input type="text" id="credit-purpose" name="credit-purpose" placeholder="Your credit purpose" style={{ border: '2px solid #E6BE8A', borderRadius: '5px', padding: '10px', width: '100%' }} />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="domain">Domain of Work:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="icon-button">✉️</button>
          <input type="text" id="domain" name="domain" placeholder="Your domain" style={{ border: '2px solid #E6BE8A', borderRadius: '5px', padding: '10px', width: '100%' }} />
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={Risklvl} className="loan-button">Send Loan</button>
      </div>
      {risk&&<span>Risque : {risk}</span>}
    </div>
  );
};

export default Depositcredit;
