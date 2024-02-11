import React, { useState, useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import { GoogleData } from "../Login/LoginAPI";
import styled from "styled-components";


const FormContainer = styled.div`
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const TaskForm = ({ onClose, editoradd, taskId }) => {
  console.log("Server Response:", taskId);
  const [taskName, setTaskName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [estDur, setEstDur] = useState("");
  const [actDur, setActDur] = useState("");
  const [curStatus, setStatus] = useState("");

  const [, setCategoryID] = useState([]);
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
      setLocation(address);
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
      category,
    });

    const taskFormData = {
      name: taskName,
      due: Date.parse(dueDate),
      estDur: estDur * 60,
      location: location,
      description: description,
      categoryid: category,
      status: curStatus || "to do",
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

    // Create an object to store the non-null fields
    const taskFormData = {};

    // Add non-null fields to the taskFormData object
    if (taskName) {
      taskFormData.name = taskName;
    }

    if (dueDate) {
      taskFormData.due = Date.parse(dueDate);
    }

    if (estDur) {
      taskFormData.estDur = estDur * 60;
    }

    if (actDur) {
      taskFormData.actDur = actDur * 60;
    }

    if (location) {
      taskFormData.location = location;
    }

    if (description) {
      taskFormData.description = description;
    }

    if (category) {
      taskFormData.categoryid = category;
    }

    if (curStatus) {
      taskFormData.status = curStatus;
    }

    if (GoogleData.profileObj.email) {
      taskFormData.userid = GoogleData.profileObj.email;
    }

    console.log("Task ID:", taskId);
    console.log("Task Form Data:", taskFormData);

    try {
      const request = "http://localhost:5200/tasks/"
        .concat(GoogleData.profileObj.email)
        .concat("/")
        .concat(`${taskId}`);

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

  let formContent;

  if (editoradd === "Edit") {
    formContent = (
      <>
        <div>
          <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="datetime-local"
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Estimated Duration (in minutes)"
            value={estDur}
            onChange={(e) => setEstDur(e.target.value)}
            min="0"
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Actual Duration (in minutes, if done)"
            value={actDur}
            onChange={(e) => setActDur(e.target.value)}
            min="0"
          />
        </div>

        <div>
          <PlacesAutocomplete
            value={location}
            onChange={(value) => setLocation(value)}
            onSelect={handleSelect}
            googleCallbackName="initGooglePlaces"
            googlePlacesAutocomplete={{
              apiKey: "AIzaSyCtkKfUMT6mTU5QYrNb2qaIIpwAEW04qIg", // Replace with your actual API key
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
        </div>

        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>


        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled hidden>
              Category
            </option>
            <option value="Work">Work</option>
            <option value="School">School</option>
            <option value="Personal">Personal</option>
            <option value="Extracurricular">Extracurricular</option>
            <option value="Leisure">Leisure</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <select
            value={curStatus}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" disabled hidden>
              Status
            </option>
            <option value="to do">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <button type="submit">Update</button>
        </div> 
      </>
    );
  } else {
    formContent = (
      <>
        <div>
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="datetime-local"
            placeholder="Due Date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="number"
            placeholder="Estimated Duration (in minutes)"
            value={estDur}
            onChange={(e) => setEstDur(e.target.value)}
            min="0"
            required 
          />
        </div>

        <div>
          <PlacesAutocomplete
            value={location}
            onChange={(value) => setLocation(value)}
            onSelect={handleSelect}
            googleCallbackName="initGooglePlaces"
            googlePlacesAutocomplete={{
              apiKey: "AIzaSyCjtzk3FOsDTVE0_qm1im1xPvXOICqa1Z4", // Replace with your actual API key
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
        </div>

        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled hidden>
              Category
            </option>
            <option value="Work">Work</option>
            <option value="School">School</option>
            <option value="Personal">Personal</option>
            <option value="Extracurricular">Extracurricular</option>
            <option value="Leisure">Leisure</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <select
            value={curStatus}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" disabled hidden>
              Status
            </option>
            <option value="to do">To Do</option>
            <option value="in progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <button type="submit">Add task</button>
        </div>

      </>
    );
  }

  return (
    <form onSubmit={editoradd === "Edit" ? handleSubmitEdit : handleSubmitAdd}>
      <FormContainer>
        {formContent}
      </FormContainer>
    </form>
  );
};

export default TaskForm;



