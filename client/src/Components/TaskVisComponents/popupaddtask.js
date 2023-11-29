import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  //getLatLng,
} from 'react-places-autocomplete';
import { GoogleData } from '../Login/LoginAPI';
// GoogleData.profileObj.email

const TaskForm = ({ onClose }) => {
  const [taskName, setTaskName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [category, setCategory] = useState('');

  const [dueDate, setDueDate] = useState('');

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };

    const formattedDate = new Date(dateTimeString).toLocaleDateString('en-US', options);
    return formattedDate;
  };


  const [categoryID, setCategoryID] = useState([]);
  useEffect(() => {
      const fetchCategory = async() => {
          try {
                const request = "http://localhost:5200/categories/".concat(GoogleData.profileObj.email);
                const response = await fetch(request);
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const jsonData = await response.json();
                setCategoryID(jsonData);
            } catch (error) {
                console.error("Error fetching data: ", error.message);
            }
        };
        fetchCategory();
  }, []);
  // console.log(categoryID);

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      //const latLng = await getLatLng(results[0]);
      setLocation(address);
      // You can also store the coordinates if needed: setCoordinates(latLng);
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with the following data:', {
      taskName,
      dueDate,
      location,
      description,
      startTime,
      category,
    });

    const taskFormData = {
        name: taskName,
        due: Date.parse(dueDate),
        location: location,
        description: description,
        start: Date.parse(startTime),
        categoryid: category,
        userid: GoogleData.profileObj.email,
    };

    const fetchTask = async() => {
        try {
            const request = "http://localhost:5200/tasks/";
            const data = JSON.stringify(taskFormData);
            const response = await fetch(request, {
                method: "post",
                // mode: "cors",
                headers: {'Content-Type': 'application/json'},
                body: data,
            });
            // console.log(data);
            console.log("fetch");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Error fetching data: ", error.message);
        }
    };
    fetchTask();

    // Close the form after submitting
    onClose();
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Task Name<span style={{ color: 'red' }}>*</span>:
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Due Date<span style={{ color: 'red' }}>*</span>:
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Location:
          <PlacesAutocomplete
            value={location}
            onChange={(value) => setLocation(value)}
            onSelect={handleSelect}
            googleCallbackName="initGooglePlaces"
            googlePlacesAutocomplete={{
              apiKey: 'AIzaSyBLZu5W8WZiQFTzOQGpOVR0FaxaEPE1zv0', // Replace with your actual API key
            }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'Enter your address...',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                    };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          style,
                        })}
                      >
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </label>
      </div>

      <div>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>


      <div>
        <label>
        Start Time<span style={{ color: 'red' }}></span>:
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
      </div>


      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default TaskForm;

