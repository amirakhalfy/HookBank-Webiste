import { SmallEntrepriseForm , Navbar , SmallEntrepriseScore,ChatBot ,Footer , SmallScore} from "./components";
import { useParams } from 'react-router-dom';
import "./SmallEntreprise.css"

const SmallEntreprise = () => {
  const { user_id } = useParams();
  
  return (
    <>
      <div className="bg-primary w-full overflow-hidden">
        <Navbar/>
        <br /><br /><br /><br />
        <ChatBot user_id={user_id}/>
        <table style={{marginLeft:"180px"}}>
          <tr>
            <td>
            <SmallEntrepriseForm user_id={user_id}/>
            </td>
          </tr>
        </table>
          
          <center>
          <SmallScore user_id={user_id}/>
          </center>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <Footer/>
      </div>
    </>
  );
};

export default SmallEntreprise;