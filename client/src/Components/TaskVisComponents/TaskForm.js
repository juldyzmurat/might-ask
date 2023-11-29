import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  //getLatLng,
} from "react-places-autocomplete";
import { GoogleData } from "../Login/LoginAPI";
import DropdownMenu from "../DropDownMenu/DDMenu";

const TaskForm = ({ onClose, editoradd, taskId }) => {
  console.log("Server Response:", taskId);
  const [taskName, setTaskName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = new Date(dateTimeString).toLocaleDateString(
      "en-US",
      options,
    );
    return formattedDate;
  };

  const [categoryIDs, setCategoryID] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const request = "http://localhost:5200/categories/".concat(
          GoogleData.profileObj.email,
        );
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
  // console.log(categoryIDs);

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      // const latLng = await getLatLng(results[0]);
      setLocation(address);
      // You can also store the coordinates if needed: setCoordinates(latLng);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    console.log("Form submitted with the following data:", {
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

    const fetchTask = async () => {
      try {
        const request = "http://localhost:5200/tasks/";
        const data = JSON.stringify(taskFormData);
        const response = await fetch(request, {
          method: "post",
          // mode: "cors",
          headers: { "Content-Type": "application/json" },
          body: data,
        });
        // console.log(data);
        console.log("fetch");
        if (!response.ok) {
          throw new Error("Failed to post data");
        }
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };
    fetchTask();

    // Close the form after submitting
    onClose();
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    const taskFormData = {
      name: taskName,
      due: Date.parse(dueDate),
      location: location,
      description: description,
      start: Date.parse(startTime),
      categoryid: category,
      userid: GoogleData.profileObj.email,
    };

    console.log("Task ID:", taskId);
    console.log("Task Form Data:", taskFormData);

    try {
      const request = "http://localhost:5200/tasks/"
        .concat(GoogleData.profileObj.email)
        .concat("/")
        .concat(`${taskId}`);
      console.log(request);

      const data = JSON.stringify(taskFormData);

      const response = await fetch(request, {
        method: "put",
        headers: { "Content-Type": "application/json" },
        body: data,
      });

      console.log("Server Response Status:", response.status);

      console.log("Server Response:", response);

      if (!response.ok) {
        console.log("Failed to update data");
      } else {
        console.log("Data updated successfully");
      }
    } catch (error) {
      console.error("Error updating data: ", error.message);
    }

    onClose();
  };


  const handleCategoryClick = () => {
    // Toggle dropdown visibility
    setDropdownVisible(!isDropdownVisible);
  };

  const handleCategorySelect = (selectedCategoryName) => {
    setDropdownVisible(false);
    const selectedCategory = categoryIDs.find(category => category.name === selectedCategoryName);
    if (selectedCategory) {
      setCategory(selectedCategory._id);
      setSelectedCategoryName(selectedCategoryName);
      setDropdownVisible(false);
    };
  };

  let formContent;

  if (editoradd === "Edit") {
    formContent = (
      <>
        <div>
          <label>
            Task Name<span style={{ color: "red" }}>*</span>:
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
            Due Date:
            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
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
                apiKey: "AIzaSyBLZu5W8WZiQFTzOQGpOVR0FaxaEPE1zv0",
              }}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Enter your address...",
                      className: "location-search-input",
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
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
            Start Time<span style={{ color: "red" }}></span>:
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            End Time<span style={{ color: "red" }}></span>:
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
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
      </>
    );
  } else {
    formContent = (
      <>
        <div>
          <label>
            Task Name<span style={{ color: "red" }}>*</span>:
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
            Due Date<span style={{ color: "red" }}>*</span>:
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
                apiKey: "AIzaSyBLZu5W8WZiQFTzOQGpOVR0FaxaEPE1zv0", // Replace with your actual API key
              }}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Enter your address...",
                      className: "location-search-input",
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const style = {
                        backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
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
            Start Time<span style={{ color: "red" }}></span>:
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
            value={selectedCategoryName}
            onClick={handleCategoryClick}
            readOnly // Make the input read-only to prevent typing for now
          />
          {/* Render the dropdown only if isDropdownVisible is true */}
          {isDropdownVisible && (
            <DropdownMenu
            items={categoryIDs.map((categoryIDs) => categoryIDs.name)}
            onItemClick={handleCategorySelect}
          />
        )}
          </label>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={editoradd === "Edit" ? handleSubmitEdit : handleSubmitAdd}>
      {formContent}
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default TaskForm;
