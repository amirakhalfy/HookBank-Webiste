import { Navbar , IndividualScore } from "./components";
import { useParams } from 'react-router-dom';


const Individual = () => {
  const { user_id } = useParams();
  
  return (
      <div className="bg-primary w-full overflow-hidden">
          <Navbar />
          <br /><br /><br />
          <IndividualScore user_id={user_id}/>
          <p>Welcome into Individual Dashboard</p>
      </div>
  );
};

export default Individual;