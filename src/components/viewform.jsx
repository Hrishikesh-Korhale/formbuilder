import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiService from "../services/apiService";

const ViewForm = () => {
  const { id } = useParams(); // Extract form ID from URL
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch form details by ID
    const fetchForm = async () => {
      try {
        const data = await apiService.getFormById(id);
        setForm(data);
      } catch (err) {
        setError("Failed to load form details. Please try again.");
      }
    };

    fetchForm();
  }, [id]);

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
      <form>
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
              placeholder={input.placeholder}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
              disabled
            />
          </div>
        ))}
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
