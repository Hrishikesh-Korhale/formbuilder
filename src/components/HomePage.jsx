import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiService from "../services/apiService";

const HomePage = () => {
  const sampleForms = [
    { _id: "1", title: "Job Application" },
    { _id: "2", title: "Feedback Form" },
    { _id: "3", title: "Event Registration" },
    { _id: "4", title: "Survey Form" },
    { _id: "5", title: "Contact Us Form" },
  ];

  const [forms, setForms] = useState(sampleForms);
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate();

  useEffect(() => {
    apiService
      .getForms()
      .then((data) => setForms(data))
      .catch((err) => setError(err.message)); // Handle errors
  }, []);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to Form.com</h1>
      <p style={{ color: "#666", fontSize: "1.2rem" }}>
        This is a simple form builder.
      </p>
      <button
        onClick={() => navigate("/form/create")}
        style={{
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        CREATE NEW FORM
      </button>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "20px",
            width: "300px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Forms</h2>
          {forms.length === 0 ? (
            <p
              style={{ color: "#999", fontStyle: "italic", fontSize: "1.2rem" }}
            >
              No forms available. Create a new one!
            </p>
          ) : (
            forms.map((form) => (
              <div
                key={form._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "20px",
                  marginBottom: "15px",
                  width: "90%",
                  maxWidth: "500px",
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  margin: "auto",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 10px 0",
                    color: "#333",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                >
                  {form.title}
                </h3>
                <div
                  style={{ display: "flex", gap: "15px", marginTop: "10px" }}
                >
                  <Link
                    to={`/form/${form._id}`}
                    style={{
                      color: "#fff",
                      backgroundColor: "#28a745",
                      padding: "8px 16px",
                      borderRadius: "5px",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    VIEW
                  </Link>
                  <Link
                    to={`/form/edit/${form._id}`}
                    style={{
                      color: "#fff",
                      backgroundColor: "#007bff",
                      padding: "8px 16px",
                      borderRadius: "5px",
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    EDIT
                  </Link>
                  <button
                    onClick={() => {
                      // Implement delete functionality
                    }}
                    style={{
                      color: "#fff",
                      backgroundColor: "#dc3545",
                      padding: "8px 16px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
