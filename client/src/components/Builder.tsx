import { useState, useCallback, useEffect, type Key } from "react";
import { useSearchParams } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import SectionForm from "./SectionForm";

const Builder = () => {
  const [] = useSearchParams();
  const [previewScale, setPreviewScale] = useState(0.8);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [activeSection, setActiveSection] = useState<string>("personal");

  const [resumeData, setResumeData] = useState<any>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      address: "",
      summary: "",
      linkedin: "",
      website: "",
      github: "",
      portfolio: "",
    },
    sections: [],
    referees: [],
  });

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("resumeData");
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error loading saved data:", error);
      }
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem("resumeData", JSON.stringify(resumeData));
  }, [resumeData]);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    if (!resumeData.personalInfo.name.trim()) newErrors.name = "Name is required";
    if (!resumeData.personalInfo.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(resumeData.personalInfo.email)) newErrors.email = "Please enter a valid email address";
    if (!resumeData.personalInfo.phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Personal Info Handler
  const handlePersonalInfoUpdate = useCallback(
    (field: string, value: string) => {
      setResumeData((prev: any) => ({
        ...prev,
        personalInfo: { ...prev.personalInfo, [field]: value }
      }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  // Section Handlers
  const handleUpdateSection = useCallback(
    (sectionIndex: number, itemIndex: number, field: string, value: string) => {
      setResumeData((prev: any) => ({
        ...prev,
        sections: prev.sections.map((section: any, sIdx: number) =>
          sIdx === sectionIndex
            ? {
                ...section,
                items: section.items.map((item: any, iIdx: number) =>
                  iIdx === itemIndex ? { ...item, [field]: value } : item
                ),
              }
            : section
        ),
      }));
    },
    []
  );

  const handleAddItem = useCallback((sectionIndex: number) => {
    setResumeData((prev: any) => ({
      ...prev,
      sections: prev.sections.map((section: any, sIdx: number) =>
        sIdx === sectionIndex
          ? {
              ...section,
              items: [
                ...section.items,
                {
                  id: Date.now().toString(),
                  title: "",
                  subtitle: "",
                  date: "",
                  description: "",
                  location: "",
                  skills: [],
                  achievements: [],
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  degree: "",
                  fieldOfStudy: "",
                  school: "",
                  content: "",
                },
              ],
            }
          : section
      ),
    }));
  }, []);

  const handleDeleteItem = useCallback(
    (sectionIndex: number, itemIndex: number) => {
      if (window.confirm("Are you sure you want to delete this item?")) {
        setResumeData((prev: any) => ({
          ...prev,
          sections: prev.sections.map((section: any, sIdx: number) =>
            sIdx === sectionIndex
              ? {
                  ...section,
                  items: section.items.filter((_: any, iIdx: number) => iIdx !== itemIndex),
                }
              : section
          ),
        }));
      }
    },
    []
  );

  const handleReorderItems = useCallback(
    (sectionIndex: number, itemIndex: number, direction: "up" | "down") => {
      setResumeData((prev: any) => ({
        ...prev,
        sections: prev.sections.map((section: any, sIdx: number) => {
          if (sIdx === sectionIndex) {
            const items = [...section.items];
            const newIndex = direction === "up" ? itemIndex - 1 : itemIndex + 1;
            if (newIndex >= 0 && newIndex < items.length) {
              [items[itemIndex], items[newIndex]] = [items[newIndex], items[itemIndex]];
            }
            return { ...section, items };
          }
          return section;
        }),
      }));
    },
    []
  );

  // Referee Handlers
  const handleAddReferee = useCallback(() => {
    setResumeData((prev: any) => ({
      ...prev,
      referees: [
        ...prev.referees,
        {
          id: Date.now().toString(),
          name: "",
          title: "",
          company: "",
          email: "",
          phone: "",
          relationship: "",
        },
      ],
    }));
  }, []);

  const handleUpdateReferee = useCallback(
    (refereeIndex: number, field: string, value: string) => {
      setResumeData((prev: any) => ({
        ...prev,
        referees: prev.referees.map((referee: any, rIdx: number) =>
          rIdx === refereeIndex ? { ...referee, [field]: value } : referee
        ),
      }));
    },
    []
  );

  const handleDeleteReferee = useCallback(
    (refereeIndex: number) => {
      if (window.confirm("Are you sure you want to delete this referee?")) {
        setResumeData((prev: any) => ({
          ...prev,
          referees: prev.referees.filter((_: any, rIdx: number) => rIdx !== refereeIndex),
        }));
      }
    },
    []
  );

  // Clear All Handler
  const handleClearAll = useCallback(() => {
    if (window.confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      localStorage.removeItem("resumeData");
      window.location.reload();
    }
  }, []);

  // PDF Download Handler (screenshots the preview area)
  const handleDownloadPDF = useCallback(async () => {
    if (!validateForm()) {
      alert("Please fix the errors in the form before downloading.");
      return;
    }
    const element = document.getElementById("resume-preview");
    if (!element) return;
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${resumeData.personalInfo.name.replace(/\s+/g, "_")}_Resume.pdf`);
    } catch (error) {
      alert("Failed to generate PDF. Please try again.");
      console.error("PDF generation error:", error);
    }
  }, [resumeData, validateForm]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
      fontFamily: "Arial, sans-serif",
      width: "100vw",
      margin: 0,
      padding: 0,
      overflowX: "hidden"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "380px 1fr",
        gap: "30px",
        padding: "20px",
      }}>
        {/* Left Panel - Form */}
        <div style={{
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          height: "fit-content",
          position: "sticky",
          top: "100px",
        }}>
          {/* Section Tabs */}
          <div style={{
            display: "flex",
            gap: "8px",
            marginBottom: "30px",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "20px",
            flexWrap: "wrap",
          }}>
            {["personal", "experience", "education", "skills", "projects", "referees"].map(
              (section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  style={{
                    padding: "6px 10px",
                    backgroundColor: activeSection === section ? "#3b82f6" : "#f3f4f6",
                    color: activeSection === section ? "white" : "#374151",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                    textTransform: "capitalize",
                    transition: "all 0.2s",
                  }}
                >
                  {section}
                </button>
              )
            )}
          </div>
          {/* Personal Info Section */}
          {activeSection === "personal" && (
            <div>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  marginBottom: "20px",
                }}
              >
                Personal Information
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "5px",
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.name}
                    onChange={(e) => handlePersonalInfoUpdate("name", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: `1px solid ${errors.name ? "#ef4444" : "#d1d5db"}`,
                      borderRadius: "5px",
                      fontSize: "0.9rem",
                    }}
                  />
                  {errors.name && (
                    <span style={{ color: "#ef4444", fontSize: "0.8rem" }}>
                      {errors.name}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "5px",
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    value={resumeData.personalInfo.email}
                    onChange={(e) => handlePersonalInfoUpdate("email", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: `1px solid ${errors.email ? "#ef4444" : "#d1d5db"}`,
                      borderRadius: "5px",
                      fontSize: "0.9rem",
                    }}
                  />
                  {errors.email && (
                    <span style={{ color: "#ef4444", fontSize: "0.8rem" }}>
                      {errors.email}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "5px",
                    }}
                  >
                    Phone *
                  </label>
                  <input
                    type="tel"
                    value={resumeData.personalInfo.phone}
                    onChange={(e) => handlePersonalInfoUpdate("phone", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: `1px solid ${errors.phone ? "#ef4444" : "#d1d5db"}`,
                      borderRadius: "5px",
                      fontSize: "0.9rem",
                    }}
                  />
                  {errors.phone && (
                    <span style={{ color: "#ef4444", fontSize: "0.8rem" }}>
                      {errors.phone}
                    </span>
                  )}
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "5px",
                    }}
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    value={resumeData.personalInfo.address}
                    onChange={(e) => handlePersonalInfoUpdate("address", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "5px",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "5px",
                    }}
                  >
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) => handlePersonalInfoUpdate("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/yourname"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "5px",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "5px",
                    }}
                  >
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    value={resumeData.personalInfo.github}
                    onChange={(e) => handlePersonalInfoUpdate("github", e.target.value)}
                    placeholder="https://github.com/username"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "5px",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "5px",
                    }}
                  >
                    Website/Portfolio
                  </label>
                  <input
                    type="url"
                    value={resumeData.personalInfo.website}
                    onChange={(e) => handlePersonalInfoUpdate("website", e.target.value)}
                    placeholder="https://yourwebsite.com"
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "5px",
                      fontSize: "0.9rem",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "0.9rem",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "5px",
                    }}
                  >
                    Professional Summary
                  </label>
                  <textarea
                    value={resumeData.personalInfo.summary}
                    onChange={(e) => handlePersonalInfoUpdate("summary", e.target.value)}
                    rows={4}
                    placeholder="Write a brief summary of your professional background..."
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "5px",
                      fontSize: "0.9rem",
                      resize: "vertical",
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {/* Referees Section */}
          {activeSection === "referees" && (
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    margin: "0",
                  }}
                >
                  References
                </h3>
                <button
                  onClick={handleAddReferee}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "#10b981",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                    fontWeight: "500",
                  }}
                >
                  + Add Reference
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  maxHeight: "600px",
                  overflowY: "auto",
                }}
              >
                {resumeData.referees.map((referee: { id: Key | null | undefined; name: string | number | readonly string[] | undefined; title: string | number | readonly string[] | undefined; company: string | number | readonly string[] | undefined; email: string | number | readonly string[] | undefined; phone: string | number | readonly string[] | undefined; relationship: string | number | readonly string[] | undefined; }, refereeIndex: number) => (
                  <div
                    key={referee.id}
                    style={{
                      padding: "15px",
                      backgroundColor: "#f9fafb",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "15px",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: "500",
                          margin: "0",
                        }}
                      >
                        Reference {refereeIndex + 1}
                      </h4>
                      <button
                        onClick={() => handleDeleteReferee(refereeIndex)}
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                      }}
                    >
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.8rem",
                            fontWeight: "500",
                            color: "#374151",
                            marginBottom: "3px",
                          }}
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={referee.name}
                          onChange={(e) => handleUpdateReferee(refereeIndex, "name", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "6px 10px",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.8rem",
                            fontWeight: "500",
                            color: "#374151",
                            marginBottom: "3px",
                          }}
                        >
                          Job Title
                        </label>
                        <input
                          type="text"
                          value={referee.title}
                          onChange={(e) => handleUpdateReferee(refereeIndex, "title", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "6px 10px",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.8rem",
                            fontWeight: "500",
                            color: "#374151",
                            marginBottom: "3px",
                          }}
                        >
                          Company
                        </label>
                        <input
                          type="text"
                          value={referee.company}
                          onChange={(e) => handleUpdateReferee(refereeIndex, "company", e.target.value)}
                          style={{
                            width: "100%",
                            padding: "6px 10px",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                          }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ flex: 1 }}>
                          <label
                            style={{
                              display: "block",
                              fontSize: "0.8rem",
                              fontWeight: "500",
                              color: "#374151",
                              marginBottom: "3px",
                            }}
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            value={referee.email}
                            onChange={(e) => handleUpdateReferee(refereeIndex, "email", e.target.value)}
                            style={{
                              width: "100%",
                              padding: "6px 10px",
                              border: "1px solid #d1d5db",
                              borderRadius: "4px",
                              fontSize: "0.8rem",
                            }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label
                            style={{
                              display: "block",
                              fontSize: "0.8rem",
                              fontWeight: "500",
                              color: "#374151",
                              marginBottom: "3px",
                            }}
                          >
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={referee.phone}
                            onChange={(e) => handleUpdateReferee(refereeIndex, "phone", e.target.value)}
                            style={{
                              width: "100%",
                              padding: "6px 10px",
                              border: "1px solid #d1d5db",
                              borderRadius: "4px",
                              fontSize: "0.8rem",
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          style={{
                            display: "block",
                            fontSize: "0.8rem",
                            fontWeight: "500",
                            color: "#374151",
                            marginBottom: "3px",
                          }}
                        >
                          Relationship
                        </label>
                        <input
                          type="text"
                          value={referee.relationship}
                          onChange={(e) => handleUpdateReferee(refereeIndex, "relationship", e.target.value)}
                          placeholder="e.g., Direct Supervisor, Colleague, Client"
                          style={{
                            width: "100%",
                            padding: "6px 10px",
                            border: "1px solid #d1d5db",
                            borderRadius: "4px",
                            fontSize: "0.8rem",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* SectionForm for experience, education, skills, projects */}
          {["experience", "education", "skills", "projects"].includes(activeSection) && (
            resumeData.sections.map((section: any, sectionIndex: number) =>
              section.type === activeSection ? (
                <SectionForm
                  key={section.id}
                  section={section}
                  sectionIndex={sectionIndex}
                  onUpdate={handleUpdateSection}
                  onAddItem={handleAddItem}
                  onDeleteItem={handleDeleteItem}
                  onReorderItems={handleReorderItems}
                />
              ) : null
            )
          )}
          <button
            onClick={handleClearAll}
            style={{
              marginTop: "16px",
              padding: "8px 16px",
              backgroundColor: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Clear All
          </button>
        </div>
        {/* Right Panel - Preview */}
        <div style={{
          borderRadius: "10px",
          backgroundColor: "white",
          overflow: "hidden",
        }}>
          <button
            onClick={handleDownloadPDF}
            style={{
              marginBottom: "16px",
              padding: "10px 20px",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              cursor: "pointer"
            }}
          >
            Download PDF
          </button>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ marginRight: "8px" }}>Zoom:</label>
            <input
              type="range"
              min="0.5"
              max="1.2"
              step="0.1"
              value={previewScale}
              onChange={e => setPreviewScale(parseFloat(e.target.value))}
              style={{ width: "120px" }}
            />
            <span style={{ marginLeft: "8px" }}>{Math.round(previewScale * 100)}%</span>
          </div>
          <div style={{
            padding: "20px",
            backgroundColor: "#f5f5f5",
            minHeight: "800px",
            overflow: "auto",
          }} id="resume-preview">
            <div style={{
              transform: `scale(${previewScale})`,
              transformOrigin: "top left",
              width: `${100 / previewScale}%`,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#888",
              fontSize: "1.2rem"
            }}>
              No template preview available.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
