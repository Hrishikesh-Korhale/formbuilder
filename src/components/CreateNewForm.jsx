import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import apiService from "../services/apiService";

const CreateNewForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Extract form ID from URL
  const [formTitle, setFormTitle] = useState("New Form");
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({ type: "text", title: "", placeholder: "" });

  useEffect(() => {
    // Fetch form data if editing
    if (id) {
      (async () => {
        try {
          const formData = await apiService.getFormById(id); // Fetch form details
          setFormTitle(formData.title);
          setFields(formData.inputs);
        } catch (error) {
          console.error("Error fetching form:", error);
          alert("Failed to load form details. Please try again.");
        }
      })();
    }
  }, [id]);

  const handleAddField = () => {
    if (newField.title && newField.placeholder) {
      setFields([...fields, newField]);
      setNewField({ type: "text", title: "", placeholder: "" });
    }
  };

  const handleDeleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmitForm = async () => {
    if (!formTitle || fields.length === 0) {
      alert("Form title and at least one field are required!");
      return;
    }

    const formData = {
      title: formTitle,
      inputs: fields,
    };

    try {
      if (id) {
        // Update existing form
        await apiService.updateFormById(id, formData);
        alert("Form updated successfully!");
      } else {
        // Create new form
        await apiService.createForm(formData);
        alert("Form created successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Failed to save the form. Please try again.");
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // If dropped outside the list
    if (!destination) return;

    // Reorder the fields array
    const reorderedFields = Array.from(fields);
    const [removed] = reorderedFields.splice(source.index, 1);
    reorderedFields.splice(destination.index, 0, removed);

    setFields(reorderedFields);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>{id ? "Edit Form" : "Create New Form"}</h1>

      {/* Form Title */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <h2 style={{ margin: "0" }}>
          {formTitle}
          <button
            onClick={() => {
              const newTitle = prompt("Enter new form title", formTitle);
              if (newTitle) setFormTitle(newTitle);
            }}
            style={{
              marginLeft: "10px",
              border: "none",
              backgroundColor: "transparent",
              color: "blue",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ✏️
          </button>
        </h2>
      </div>

      {/* Form Preview with Drag-and-Drop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="fields">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
                marginBottom: "20px",
              }}
            >
              <h3 style={{ marginBottom: "15px" }}>Form Preview</h3>
              {fields.map((field, index) => (
                <Draggable key={index} draggableId={String(index)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        padding: "15px",
                        marginBottom: "10px",
                        border: "1px solid #ddd",
                        borderRadius: "5px",
                        backgroundColor: "white",
                        ...provided.draggableProps.style,
                      }}
                    >
                      <label style={{ display: "block", marginBottom: "5px" }}>
                        {field.title}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                        }}
                        disabled
                      />
                      <button
                        onClick={() => handleDeleteField(index)}
                        style={{
                          marginTop: "5px",
                          backgroundColor: "#dc3545",
                          color: "white",
                          padding: "5px 10px",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Delete Field
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Field Editor */}
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ marginBottom: "15px" }}>Field Editor</h3>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={newField.title}
            onChange={(e) => setNewField({ ...newField, title: e.target.value })}
            style={{
              width: "100%",
              padding: "8px",
              margin: "10px 0",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
        </div>
        <div>
          <label>Placeholder</label>
          <input
            type="text"
            value={newField.placeholder}
            onChange={(e) => setNewField({ ...newField, placeholder: e.target.value })}
            style={{
              width: "100%",
              padding: "8px",
              margin: "10px 0",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
        </div>
        <button
          onClick={handleAddField}
          style={{
            width: "100%",
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Field
        </button>
      </div>

      {/* Submit Button */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={handleSubmitForm}
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {id ? "Update Form" : "Create Form"}
        </button>
      </div>
    </div>
  );
};

export default CreateNewForm;
