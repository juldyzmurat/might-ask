import PinnedSubheaderList from '../TaskVisComponents/listscroller';
import TaskComponent from '../TaskVisComponents/taskcomponent';
//import GoogleLogin from "../Login/GoogleLogin"
//import Auth from '../Login/auth';

const FirstTab = () => {

    

    return (
      <div className="FirstTab">
        {/* First tab content will go here */}
        <div style={{height: '500px'}}>
          <TaskComponent />
          <PinnedSubheaderList />
          
        </div>

      </div>
    );
  };
  export default FirstTab;
  