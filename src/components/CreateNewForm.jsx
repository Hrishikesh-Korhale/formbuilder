import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDrag, useDrop } from "react-dnd";
import apiService from "../services/apiService";

const CreateNewForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formTitle, setFormTitle] = useState("New Form");
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({ type: "text", title: "", placeholder: "" });

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const formData = await apiService.getFormById(id);
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
        await apiService.updateFormById(id, formData);
        alert("Form updated successfully!");
      } else {
        await apiService.createForm(formData);
        alert("Form created successfully!");
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving form:", error);
      alert("Failed to save the form. Please try again.");
    }
  };

  const moveField = (draggedIndex, hoveredIndex) => {
    const reorderedFields = [...fields];
    const [draggedField] = reorderedFields.splice(draggedIndex, 1);
    reorderedFields.splice(hoveredIndex, 0, draggedField);
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

      {/* Form Preview with React DnD */}
      <div
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
          <Field
            key={index}
            index={index}
            field={field}
            moveField={moveField}
            handleDeleteField={handleDeleteField}
          />
        ))}
      </div>

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

const Field = ({ index, field, moveField, handleDeleteField }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "field",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "field",
    hover: (item) => {
      if (item.index !== index) {
        moveField(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        padding: "15px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "5px",
        backgroundColor: isDragging ? "#e3e3e3" : "white",
        opacity: isDragging ? 0.5 : 1,
        transition: "all 0.2s ease",
        cursor: "move",
      }}
    >
      <label style={{ display: "block", marginBottom: "5px" }}>{field.title}</label>
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
  );
};

export default CreateNewForm;
