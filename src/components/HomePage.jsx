import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiService from "../services/apiService";

const HomePage = () => {
  const [forms, setForms] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    apiService
      .getForms()
      .then((data) => {
        setForms(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this form?")) {
      return; // Exit if the user cancels the deletion
    }

    try {
      setDeletingId(id); // Disable the delete button for this ID
      await apiService.deleteFormById(id); // Call API to delete the form
      setForms(forms.filter((form) => form._id !== id)); // Update state
      alert("Form deleted successfully form Database");
    } catch (error) {
      setError(`Error deleting form: ${error.message}`);
    } finally {
      setDeletingId(null); // Re-enable the delete button
    }
  };

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

      {loading ? (
        <div style={{ fontSize: "1.5rem", color: "#28a745" }}>
          Loading forms...
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // 2 columns
            gap: "30px",
            justifyContent: "center",
            alignItems: "flex-start",
            margin: "20px",
          }}
        >
          {forms.length === 0 ? (
            <p
              style={{
                color: "#999",
                fontStyle: "italic",
                fontSize: "1.2rem",
              }}
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
                  backgroundColor: "#fff",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
                    to={`/form/view/${form._id}`}
                    style={{
                      color: "#fff",
                      backgroundColor: "#28a745",
                      padding: "8px 16px",
                      borderRadius: "5px",
                      textDecoration: "none",
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
                    }}
                  >
                    EDIT
                  </Link>
                  <button
                    onClick={() => handleDelete(form._id)}
                    disabled={deletingId === form._id} // Disable button while deleting
                    style={{
                      color: "#fff",
                      backgroundColor:
                        deletingId === form._id ? "#ccc" : "#dc3545",
                      padding: "8px 16px",
                      borderRadius: "5px",
                      border: "none",
                      cursor:
                        deletingId === form._id ? "not-allowed" : "pointer",
                    }}
                  >
                    {deletingId === form._id ? "DELETING..." : "DELETE"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
