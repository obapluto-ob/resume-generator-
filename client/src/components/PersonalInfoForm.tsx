import React from "react";
import type { PersonalInfo } from "../types/ResumeTypes";

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  errors: { [key: string]: string };
  onUpdate: (field: string, value: string) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ personalInfo, errors, onUpdate }) => (
  <div>
    <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 500, color: "#374151", marginBottom: 5 }}>
      Full Name
      <input
        type="text"
        value={personalInfo.name}
        onChange={e => onUpdate("name", e.target.value)}
        style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: "0.9rem" }}
      />
      {errors.name && <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.name}</span>}
    </label>
    <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 500, color: "#374151", marginBottom: 5 }}>
      Email
      <input
        type="email"
        value={personalInfo.email}
        onChange={e => onUpdate("email", e.target.value)}
        style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: "0.9rem" }}
      />
      {errors.email && <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.email}</span>}
    </label>
    <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 500, color: "#374151", marginBottom: 5 }}>
      Phone
      <input
        type="tel"
        value={personalInfo.phone}
        onChange={e => onUpdate("phone", e.target.value)}
        style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: "0.9rem" }}
      />
      {errors.phone && <span style={{ color: "red", fontSize: "0.8rem" }}>{errors.phone}</span>}
    </label>
    <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 500, color: "#374151", marginBottom: 5 }}>
      LinkedIn
      <input
        type="url"
        value={personalInfo.linkedin || ""}
        onChange={e => onUpdate("linkedin", e.target.value)}
        placeholder="https://linkedin.com/in/username"
        style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: "0.9rem" }}
      />
    </label>
    <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 500, color: "#374151", marginBottom: 5 }}>
      GitHub
      <input
        type="url"
        value={personalInfo.github || ""}
        onChange={e => onUpdate("github", e.target.value)}
        placeholder="https://github.com/username"
        style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: "0.9rem" }}
      />
    </label>
    <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 500, color: "#374151", marginBottom: 5 }}>
      Website/Portfolio
      <input
        type="url"
        value={personalInfo.website || ""}
        onChange={e => onUpdate("website", e.target.value)}
        placeholder="https://yourwebsite.com"
        style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: "0.9rem" }}
      />
    </label>
    <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 500, color: "#374151", marginBottom: 5 }}>
      Professional Summary
      <textarea
        value={personalInfo.summary || ""}
        onChange={e => onUpdate("summary", e.target.value)}
        rows={4}
        placeholder="Write a brief summary of your professional background..."
        style={{ width: "100%", padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 5, fontSize: "0.9rem", resize: "vertical" }}
      />
    </label>
  </div>
);

export default PersonalInfoForm;