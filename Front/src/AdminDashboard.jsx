import React from 'react';
import { Navbar } from './components'; // Assuming Navbar is correctly imported

const AdminDashboard = () => {


  return (
    <div className="bg-primary w-full overflow-hidden">
      <Navbar />
      <br /><br /><br />
      <center>

      
      <div style={{ height: '900px' }}>
      <iframe title="exemple1" style={{scale:1}} width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=d5170acf-0bb9-4840-a73d-54b83fd38a2d&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730" frameborder="0" allowFullScreen="true"></iframe>
      </div>
      </center>
    </div>
  );
};

export default AdminDashboard;
