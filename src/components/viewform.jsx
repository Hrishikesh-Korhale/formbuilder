import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

const ViewForm = () => {
  const { id } = useParams(); // Extract form ID from URL
  const [form, setForm] = useState(null);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch form details by ID
    const fetchForm = async () => {
      try {
        const data = await apiService.getFormById(id);
        setForm(data);

        // Initialize formData with empty values based on form inputs
        const initialData = data.inputs.reduce((acc, input) => {
          acc[input.name] = ""; // Set initial value for each input to empty string
          return acc;
        }, {});
        setFormData(initialData);
      } catch (err) {
        setError("Failed to load form details. Please try again.");
      }
    };

    fetchForm();
  }, [id]);

  const validateInput = (name, value, type) => {
    switch (type) {
      case "email":
        return value &&
          /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
          ? ""
          : "Please enter a valid email.";
      case "number":
        return value && !isNaN(value) ? "" : "Please enter a valid number.";
      case "text":
        return value && value.trim() !== "" ? "" : "This field is required.";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const error = validateInput(name, value, type);

    // Update formData and formErrors
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (e) => {
    alert("Form submitted successfully!");
    navigate("/");
  };

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Error</h1>
        <p>{error}</p>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!form) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>{form.title}</h1>
      <form onSubmit={handleSubmit}>
        {form.inputs.map((input, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontWeight: "bold",
              }}
            >
              {input.title}
            </label>
            <input
              type={input.type}
              name={input.name}
              // value={formData[input.name] || ""}
              placeholder={input.placeholder}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
              onChange={handleChange} 
            />
            {formErrors[input.name] && (
              <p style={{ color: "red", fontSize: "12px" }}>
                {formErrors[input.name]}
              </p>
            )}
          </div>
        ))}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>
      </form>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ViewForm;
