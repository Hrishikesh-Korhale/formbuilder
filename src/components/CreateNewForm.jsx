import React, { useState } from "react";

const CreateNewForm = () => {
  const [formTitle, setFormTitle] = useState("Job Application");
  const [fields, setFields] = useState([]);
  const [newField, setNewField] = useState({ type: "text", title: "", placeholder: "" });

  const handleAddField = () => {
    if (newField.title && newField.placeholder) {
      setFields([...fields, newField]);
      setNewField({ type: "text", title: "", placeholder: "" });
    }
  };

  const handleDeleteField = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>Create New Form</h1>

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

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>

         {/* Form Preview */}
         <div
          style={{
            flex: "1",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>Form Preview</h3>
          <form>
            {fields.map((field, index) => (
              <div key={index} style={{ marginBottom: "15px" }}>
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
              </div>
            ))}
          </form>
        </div>

        
        {/* Field Editor */}
        <div
          style={{
            flex: "1",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "5px",
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

       
      </div>

      {/* Field Type Buttons */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {["TEXT", "NUMBER", "EMAIL", "PASSWORD", "DATE"].map((type) => (
          <button
            key={type}
            onClick={() => setNewField({ ...newField, type: type.toLowerCase() })}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px 15px",
              margin: "5px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Submit and Create Buttons */}
      <div style={{ textAlign: "center" }}>
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Submit
        </button>
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Form
        </button>
      </div>
    </div>
  );
};

export default CreateNewForm;
