import { SmallEntrepriseForm , Navbar , SmallEntrepriseScore,ChatBot ,Footer} from "./components";
import { useParams } from 'react-router-dom';


const SmallEntreprise = () => {
  const { user_id } = useParams();
  
  return (
      <div className="bg-primary w-full overflow-hidden">
        <Navbar/>
        <ChatBot user_id={user_id}/>
          <SmallEntrepriseForm user_id={user_id} />
          <SmallEntrepriseScore user_id={user_id}/>
          
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <Footer/>
      </div>
  );
};

export default SmallEntreprise;