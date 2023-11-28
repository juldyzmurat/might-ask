import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

const TaskForm = () => {
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [category, setCategory] = useState('');

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);
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
            type="date"
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
          Start Time:
          <input
            type="time"
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

