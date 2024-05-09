import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './components';
import { Footer } from './components';
import { Navbar } from './components';

const Login = () => {
  const navigate = useNavigate(); // Declare navigate outside JSX
  const [userData, setUserData] = useState(null);

  const handleLoginSuccess = (data) => {
    setUserData(data);
    if(data.users[0].access === 'admin'){
      navigate('/Admin');
    }else{
      if (data.users[0].role === 'Small') {
        navigate('/SmallEntreprise');
      }
      if (data.users[0].role === 'Individual') {
        navigate('/Individual');
      }
    }
    
  };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <LoginForm onLoginSuccess={handleLoginSuccess} />
      <Footer />
    </div>
  );
};

export default Login;
