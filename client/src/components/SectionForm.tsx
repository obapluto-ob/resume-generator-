import React from "react";
import type { ResumeSection } from "../types/ResumeTypes";

export interface SectionFormProps {
  section: ResumeSection;
  sectionIndex: number;
  onUpdate: (sectionIndex: number, itemIndex: number, field: string, value: string) => void;
  onAddItem: (sectionIndex: number) => void;
  onDeleteItem: (sectionIndex: number, itemIndex: number) => void;
  onReorderItems: (sectionIndex: number, itemIndex: number, direction: "up" | "down") => void;
}

const SectionForm: React.FC<SectionFormProps> = ({
  section,
  sectionIndex,
  onUpdate,
  onAddItem,
  onDeleteItem,
  onReorderItems,
}) => (
  <div>
    <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 12 }}>{section.title}</h3>
    {section.items.map((item, itemIndex) => (
      <div
        key={item.id}
        style={{
          marginBottom: 18,
          padding: "12px 10px",
          background: "#f9fafb",
          borderRadius: 8,
          border: "1px solid #e5e7eb",
        }}
      >
        <input
          type="text"
          value={item.title}
          onChange={e => onUpdate(sectionIndex, itemIndex, "title", e.target.value)}
          placeholder="Title"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "8px",
            border: "1px solid #d1d5db",
            borderRadius: "5px",
            fontSize: "0.95rem",
          }}
        />
        <input
          type="text"
          value={item.subtitle || ""}
          onChange={e => onUpdate(sectionIndex, itemIndex, "subtitle", e.target.value)}
          placeholder="Subtitle"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "8px",
            border: "1px solid #d1d5db",
            borderRadius: "5px",
            fontSize: "0.95rem",
          }}
        />
        <input
          type="text"
          value={item.date || ""}
          onChange={e => onUpdate(sectionIndex, itemIndex, "date", e.target.value)}
          placeholder="Date"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "8px",
            border: "1px solid #d1d5db",
            borderRadius: "5px",
            fontSize: "0.95rem",
          }}
        />
        <textarea
          value={item.description || ""}
          onChange={e => onUpdate(sectionIndex, itemIndex, "description", e.target.value)}
          placeholder="Description"
          rows={3}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "8px",
            border: "1px solid #d1d5db",
            borderRadius: "5px",
            fontSize: "0.95rem",
            resize: "vertical",
          }}
        />
        <div style={{ display: "flex", gap: "8px", marginTop: 8 }}>
          <button
            type="button"
            onClick={() => onDeleteItem(sectionIndex, itemIndex)}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "6px 12px",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            Delete
          </button>
          <button
            type="button"
            onClick={() => onReorderItems(sectionIndex, itemIndex, "up")}
            style={{
              background: "#f3f4f6",
              color: "#374151",
              border: "none",
              borderRadius: "4px",
              padding: "6px 12px",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
            disabled={itemIndex === 0}
          >
            Up
          </button>
          <button
            type="button"
            onClick={() => onReorderItems(sectionIndex, itemIndex, "down")}
            style={{
              background: "#f3f4f6",
              color: "#374151",
              border: "none",
              borderRadius: "4px",
              padding: "6px 12px",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
            disabled={itemIndex === section.items.length - 1}
          >
            Down
          </button>
        </div>
      </div>
    ))}
    <button
      type="button"
      onClick={() => onAddItem(sectionIndex)}
      style={{
        background: "#3b82f6",
        color: "white",
        border: "none",
        borderRadius: "5px",
        padding: "8px 16px",
        cursor: "pointer",
        fontSize: "0.95rem",
        fontWeight: 500,
        marginTop: 8,
      }}
    >
      + Add {section.title} Item
    </button>
  </div>
);

export default SectionForm;