import React from "react";
import type { RefereeItem } from "../types/ResumeTypes";

interface RefereeFormProps {
  referees: RefereeItem[];
  onAdd: () => void;
  onUpdate: (index: number, field: string, value: string) => void;
  onDelete: (index: number) => void;
}

const RefereeForm: React.FC<RefereeFormProps> = ({ referees, onAdd, onUpdate, onDelete }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
      <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1f2937", margin: 0 }}>References</h3>
      <button
        onClick={onAdd}
        style={{
          padding: "6px 12px",
          backgroundColor: "#10b981",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "0.8rem",
          fontWeight: 500,
        }}
      >
        + Add Reference
      </button>
    </div>
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxHeight: 600, overflowY: "auto" }}>
      {referees.map((referee, i) => (
        <div key={referee.id} style={{ padding: 15, backgroundColor: "#f9fafb", borderRadius: 8, border: "1px solid #e5e7eb" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 500, color: "#374151" }}>Reference {i + 1}</span>
            <button
              onClick={() => onDelete(i)}
              style={{
                padding: "4px 8px",
                backgroundColor: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "0.7rem",
              }}
            >
              Delete
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "#374151", marginBottom: 3 }}>
              Full Name
              <input
                type="text"
                value={referee.name}
                onChange={e => onUpdate(i, "name", e.target.value)}
                style={{ width: "100%", padding: "6px 10px", border: "1px solid #d1d5db", borderRadius: 4, fontSize: "0.8rem" }}
              />
            </label>
            <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "#374151", marginBottom: 3 }}>
              Job Title
              <input
                type="text"
                value={referee.title}
                onChange={e => onUpdate(i, "title", e.target.value)}
                style={{ width: "100%", padding: "6px 10px", border: "1px solid #d1d5db", borderRadius: 4, fontSize: "0.8rem" }}
              />
            </label>
            <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "#374151", marginBottom: 3 }}>
              Company
              <input
                type="text"
                value={referee.company}
                onChange={e => onUpdate(i, "company", e.target.value)}
                style={{ width: "100%", padding: "6px 10px", border: "1px solid #d1d5db", borderRadius: 4, fontSize: "0.8rem" }}
              />
            </label>
            <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "#374151", marginBottom: 3 }}>
              Relationship
              <input
                type="text"
                value={referee.relationship}
                onChange={e => onUpdate(i, "relationship", e.target.value)}
                placeholder="e.g., Supervisor, Colleague"
                style={{ width: "100%", padding: "6px 10px", border: "1px solid #d1d5db", borderRadius: 4, fontSize: "0.8rem" }}
              />
            </label>
            <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "#374151", marginBottom: 3 }}>
              Email
              <input
                type="email"
                value={referee.email}
                onChange={e => onUpdate(i, "email", e.target.value)}
                style={{ width: "100%", padding: "6px 10px", border: "1px solid #d1d5db", borderRadius: 4, fontSize: "0.8rem" }}
              />
            </label>
            <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "#374151", marginBottom: 3 }}>
              Phone
              <input
                type="tel"
                value={referee.phone}
                onChange={e => onUpdate(i, "phone", e.target.value)}
                style={{ width: "100%", padding: "6px 10px", border: "1px solid #d1d5db", borderRadius: 4, fontSize: "0.8rem" }}
              />
            </label>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RefereeForm;