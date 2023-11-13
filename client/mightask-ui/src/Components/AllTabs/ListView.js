import PinnedSubheaderList from '../TaskVisComponents/listscroller';
import TaskComponent from '../TaskVisComponents/taskcomponent';
//import GoogleLogin from "../Login/GoogleLogin"
//import Auth from '../Login/auth';
import React, { useState, useEffect } from 'react';

const FirstTab = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Function to fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5200/tasks');
        
        // Check if the response is successful (status code 200)
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        // Parse the response body as JSON
        const jsonData = await response.json();

        // Update the state with the fetched data
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []);

    

    return (
      <div className="FirstTab">
        {/* First tab content will go here */}
        <div style={{height: '500px'}}>
          <PinnedSubheaderList data={data} />
        </div>

      </div>
    );
  };
  export default FirstTab;