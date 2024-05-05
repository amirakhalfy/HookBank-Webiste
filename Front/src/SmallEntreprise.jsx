import { SmallEntrepriseForm , Navbar , SmallEntrepriseScore } from "./components";
import { useParams } from 'react-router-dom';


const SmallEntreprise = () => {
  const { user_id } = useParams();
  
  return (
      <div className="bg-primary w-full overflow-hidden">
        <p>{user_id}</p>
          <Navbar />
          <SmallEntrepriseForm user_id={user_id} />
          <SmallEntrepriseScore user_id={user_id}/>
          <p>Welcome into Small Etreprise</p>
      </div>
  );
};

export default SmallEntreprise;