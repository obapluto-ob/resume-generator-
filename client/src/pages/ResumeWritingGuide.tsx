import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import

const sections = [
	{
		title: '1. Choose the Right Resume Format',
		content:
			'Select a format that highlights your strengths: Chronological, Functional, or Combination. Chronological is best for steady work history, functional for skills-focused, and combination for both.',
	},
	{
		title: '2. Write a Strong Summary',
		content:
			'Start with a brief summary that showcases your experience, skills, and what makes you unique. Tailor it to the job you’re applying for.',
	},
	{
		title: '3. Highlight Achievements, Not Just Duties',
		content:
			"Use bullet points to show measurable achievements (e.g., 'Increased sales by 30% in 2024'), not just job responsibilities.",
	},
	{
		title: '4. Use Keywords from the Job Description',
		content:
			'Scan the job posting and include relevant keywords to pass Applicant Tracking Systems (ATS).',
	},
	{
		title: '5. Keep It Concise and Error-Free',
		content:
			'Limit your resume to 1-2 pages. Proofread for spelling and grammar errors. Use a clean, professional layout.',
	},
	{
		title: '6. Tailor Your Resume for Each Job',
		content:
			'Customize your resume for every application. Highlight the most relevant skills and experiences that match the job description. This increases your chances of passing ATS and impressing recruiters.',
	},
	{
		title: '7. Use Action Verbs',
		content:
			"Start each bullet point with a strong action verb (e.g., 'Led', 'Developed', 'Achieved', 'Improved') to clearly show your contributions and impact.",
	},
	{
		title: '8. Quantify Your Achievements',
		content:
			"Whenever possible, use numbers to demonstrate your results (e.g., 'Managed a team of 5', 'Reduced costs by 15%', 'Served 200+ customers daily').",
	},
	{
		title: '9. Keep Design Simple and Consistent',
		content:
			'Use a clean, professional layout with consistent fonts, spacing, and headings. Avoid graphics, photos, or colors that distract from your content.',
	},
	{
		title: '10. Proofread and Get Feedback',
		content:
			'Carefully proofread your resume for errors. Ask a friend, mentor, or use a professional review service to get feedback before sending it out.',
	},
	{
		title: '11. Addressing Employment Gaps',
		content:
			"Be honest about gaps in your employment history. Briefly explain them in your cover letter or resume summary, focusing on skills or experiences gained during the gap (e.g., freelancing, volunteering, education).",
	},
	{
		title: '12. Resume Tips for Career Changers',
		content:
			"Highlight transferable skills and relevant achievements from your previous roles. Use a summary or skills section to connect your past experience to your new career direction.",
	},
	{
		title: '13. Student & Entry-Level Resume Advice',
		content:
			"Emphasize education, internships, volunteer work, and relevant coursework. Include projects, leadership roles, and extracurricular activities that demonstrate your skills and initiative.",
	},
	{
		title: '14. Remote Work & Digital Skills',
		content:
			"Showcase your ability to work remotely: mention remote roles, digital collaboration tools (e.g., Slack, Zoom), and self-motivation. Highlight adaptability and communication skills.",
	},
	{
		title: '15. International & Multilingual Resumes',
		content:
			"If applying abroad, research resume standards for the target country. Mention language proficiency and international experience. Consider translating your resume if needed.",
	},
	{
		title: '16. Including Certifications & Online Courses',
		content:
			"List relevant certifications, licenses, and completed online courses (e.g., Coursera, LinkedIn Learning) in a dedicated section to show your commitment to continuous learning.",
	},
	{
		title: '17. Using a Portfolio or Personal Website',
		content:
			"Add a link to your portfolio or personal website if you have one. This is especially valuable for creative, tech, or freelance roles. Make sure your online presence is professional.",
	},
	{
		title: '18. Resumes for Executive Roles',
		content:
			"For executive positions, focus on leadership achievements, strategic impact, and quantifiable business results. Include a strong executive summary and highlight board memberships, major projects, and industry recognition.",
	},
	{
		title: '19. Freelance & Gig Worker Resumes',
		content:
			"Showcase a portfolio of projects, client testimonials, and a summary of skills. Emphasize adaptability, self-motivation, and results delivered for various clients. List relevant platforms (e.g., Upwork, Fiverr) if applicable.",
	},
	{
		title: '20. Technical & IT Resumes',
		content:
			"Highlight technical skills, certifications, and relevant projects. Use a 'Technical Skills' section and include links to GitHub or code samples. Quantify your impact with metrics (e.g., system uptime, code efficiency).",
	},
	{
		title: '21. Creative Industry Resumes',
		content:
			"Include a link to your online portfolio or Behance/Dribbble profile. Use a clean but visually appealing layout. Highlight awards, exhibitions, or published work, and describe your creative process.",
	},
	{
		title: '22. Resumes for Government or Academic Jobs',
		content:
			"Follow the specific format required (e.g., CV for academia). Include publications, grants, teaching experience, and professional affiliations. For government, ensure compliance with relevant standards and emphasize public service motivation.",
	},
];

const quiz = [
	{
		question: 'Which resume format is best for a steady work history?',
		options: ['Functional', 'Chronological', 'Combination'],
		answer: 'Chronological',
		explanation:
			'Chronological resumes highlight a steady work history and career progression.',
	},
	{
		question: 'What should you focus on in your bullet points?',
		options: ['Job duties', 'Achievements', 'Personal hobbies'],
		answer: 'Achievements',
		explanation:
			'Achievements show your impact and value, not just your responsibilities.',
	},
	{
		question: 'What is the ideal length for most professional resumes?',
		options: ['1-2 pages', '3-4 pages', 'As long as needed'],
		answer: '1-2 pages',
		explanation: 'Most recruiters prefer concise resumes of 1-2 pages.',
	},
	{
		question: 'Which of the following should you avoid on a resume?',
		options: ['Unprofessional email address', 'Relevant skills', 'Quantified results'],
		answer: 'Unprofessional email address',
		explanation: 'Always use a professional email address on your resume.',
	},
	{
		question: 'Why is it important to use keywords from the job description?',
		options: [
			'To pass Applicant Tracking Systems (ATS)',
			'To make your resume longer',
			'To impress your friends',
		],
		answer: 'To pass Applicant Tracking Systems (ATS)',
		explanation:
			'ATS scans for keywords to filter resumes before a human sees them.',
	},
	{
		question: 'Which section is optional on a resume?',
		options: ['Summary', 'Work Experience', 'Education'],
		answer: 'Summary',
		explanation:
			'A summary is helpful but not required; work experience and education are essential.',
	},
	{
		question: 'What is the best way to show your impact in a previous job?',
		options: [
			'Describe your daily tasks',
			'List your hobbies',
			"Use numbers and results (e.g., 'Increased sales by 20%')",
		],
		answer: "Use numbers and results (e.g., 'Increased sales by 20%')",
		explanation:
			'Quantifying achievements demonstrates your value clearly.',
	},
	{
		question: 'What font style is most appropriate for a professional resume?',
		options: ['Comic Sans', 'Times New Roman or Arial', 'Cursive'],
		answer: 'Times New Roman or Arial',
		explanation:
			'Use clean, readable fonts like Times New Roman, Arial, or Calibri.',
	},
];

const ResumeWritingGuide: React.FC = () => {
	const navigate = useNavigate(); // Add this line
	const [openSection, setOpenSection] = useState<number | null>(null);
	const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
	const [quizAnswers, setQuizAnswers] = useState<(string | null)[]>(
		Array(quiz.length).fill(null)
	);
	const [showResults, setShowResults] = useState(false);
	const [completedSections, setCompletedSections] = useState<boolean[]>(
		Array(sections.length).fill(false)
	);

	// Progress calculation

	const handleCopy = (idx: number, text: string) => {
		navigator.clipboard.writeText(text);
		setCopiedIdx(idx);
		setTimeout(() => setCopiedIdx(null), 1200);
	};

	const handleQuizSelect = (qIdx: number, option: string) => {
		const updated = [...quizAnswers];
		updated[qIdx] = option;
		setQuizAnswers(updated);
	};

	const handleQuizSubmit = () => setShowResults(true);

	const handleOpenSection = (idx: number) => {
		setOpenSection(openSection === idx ? null : idx);
		setCompletedSections((prev) => {
			const updated = [...prev];
			updated[idx] = true;
			return updated;
		});
	};

	return (
		<div
			style={{
				padding: '40px 20px',
				maxWidth: 700,
				margin: '0 auto',
			}}
		>
			{/* Back Button */}
			<button
				onClick={() => navigate(-1)}
				style={{
					marginBottom: 24,
					background: '#e0e7ef',
					color: '#2563eb',
					border: 'none',
					borderRadius: 8,
					padding: '8px 20px',
					fontWeight: 700,
					fontSize: '1rem',
					cursor: 'pointer',
					transition: 'background 0.18s',
				}}
			>
				← Back
			</button>

			<h1
				style={{
					fontWeight: 900,
					fontSize: '2.2rem',
					marginBottom: 10,
					color: '#1e293b',
					letterSpacing: '-1px',
				}}
			>
				Resume Writing Guide
			</h1>
			<p
				style={{
					fontSize: '1.1rem',
					color: '#334155',
					marginBottom: 28,
				}}
			>
				Learn how to write a professional resume with our comprehensive,
				step-by-step guide.
			</p>

			{/* --- Professional Quiz Section --- */}
			<div
				style={{
					background: '#fff',
					border: '2px solid #2563eb',
					borderRadius: 14,
					boxShadow: '0 4px 24px rgba(37,99,235,0.10)',
					padding: 32,
					marginBottom: 40,
					marginTop: 10,
				}}
			>
				<h2
					style={{
						fontSize: '1.35rem',
						fontWeight: 900,
						marginBottom: 18,
						color: '#2563eb',
						letterSpacing: '-1px',
					}}
				>
					Quick Self-Check Quiz
				</h2>
				<hr
					style={{
						border: 'none',
						borderTop: '1.5px solid #e0e7ef',
						margin: '0 0 24px 0',
					}}
				/>
				{quiz.map((q, qIdx) => (
					<div key={q.question} style={{ marginBottom: 28 }}>
						<div
							style={{
								display: 'flex',
								alignItems: 'center',
								marginBottom: 8,
							}}
						>
							<span
								style={{
									background: '#2563eb',
									color: '#fff',
									borderRadius: '50%',
									width: 28,
									height: 28,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									fontWeight: 700,
									fontSize: '1.1rem',
									marginRight: 12,
								}}
							>
								{qIdx + 1}
							</span>
							<span
								style={{
									fontWeight: 700,
									fontSize: '1.08rem',
									color: '#1e293b',
								}}
							>
								{q.question}
							</span>
						</div>
						<div>
							{q.options.map((option) => (
								<label
									key={option}
									style={{
										display: 'block',
										marginBottom: 8,
										padding: '7px 14px',
										borderRadius: 8,
										border:
											quizAnswers[qIdx] === option
												? showResults
													? option === q.answer
														? '2px solid #22c55e'
														: '2px solid #ef4444'
													: '2px solid #2563eb'
												: '1.5px solid #e0e7ef',
										background:
											quizAnswers[qIdx] === option
												? showResults
													? option === q.answer
														? '#dcfce7'
														: '#fee2e2'
													: '#e0e7ff'
												: '#f8fafc',
										color: '#1e293b',
										fontWeight: 500,
										cursor: showResults ? 'default' : 'pointer',
										transition: 'all 0.18s',
									}}
								>
									<input
										type="radio"
										name={`quiz-${qIdx}`}
										value={option}
										checked={quizAnswers[qIdx] === option}
										disabled={showResults}
										onChange={() => handleQuizSelect(qIdx, option)}
										style={{
											marginRight: 10,
											accentColor: '#2563eb',
										}}
									/>
									{option}
									{showResults && option === q.answer && (
										<span
											style={{
												color: '#22c55e',
												fontWeight: 700,
												marginLeft: 8,
											}}
										>
											✔️
										</span>
									)}
									{showResults &&
										quizAnswers[qIdx] === option &&
										option !== q.answer && (
											<span
												style={{
													color: '#ef4444',
													fontWeight: 700,
													marginLeft: 8,
												}}
											>
												❌
											</span>
										)}
								</label>
							))}
						</div>
						{showResults && (
							<div
								style={{
									color: '#64748b',
									fontSize: '0.98rem',
									marginTop: 6,
								}}
							>
								{q.explanation}
							</div>
						)}
					</div>
				))}
				<button
					onClick={() => {
						if (showResults) {
							setShowResults(false);
							setQuizAnswers(Array(quiz.length).fill(null));
						} else {
							handleQuizSubmit();
						}
					}}
					style={{
						background:
							'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
						color: '#fff',
						border: 'none',
						borderRadius: 8,
						padding: '12px 0',
						fontWeight: 700,
						fontSize: '1.08rem',
						cursor: 'pointer',
						width: '100%',
						marginTop: 10,
						transition: 'background 0.18s',
						opacity: quizAnswers.some((ans) => ans === null) ? 0.6 : 1,
						pointerEvents: quizAnswers.some((ans) => ans === null)
							? 'none'
							: 'auto',
					}}
				>
					{showResults ? 'Retry Quiz' : 'Submit Answers'}
				</button>
				{/* Score Summary */}
				{showResults && (
					<div
						style={{
							marginTop: 24,
							padding: 16,
							borderRadius: 8,
							background: '#f8fafc',
							boxShadow: '0 1px 8px rgba(30,41,59,0.07)',
							textAlign: 'center',
						}}
					>
						<span
							style={{
								fontWeight: 800,
								fontSize: '1.15rem',
								color: '#2563eb',
							}}
						>
							Score:{' '}
							{
								quizAnswers.filter(
									(ans, i) => ans === quiz[i].answer
								).length
							}{' '}
							/ {quiz.length}
						</span>
						<div style={{ color: '#64748b', marginTop: 6 }}>
							{
								quizAnswers.filter(
									(ans, i) => ans === quiz[i].answer
								).length === quiz.length
									? 'Excellent! You know your resume basics.'
									: 'Review the correct answers above and try again!'
							}
						</div>
					</div>
				)}
			</div>
			{/* --- End Quiz Section --- */}

			{/* Progress Bar */}
			<div style={{ marginBottom: 16 }}>
				<div
					style={{
						height: 6,
						background: '#e0e7ef',
						borderRadius: 6,
						overflow: 'hidden',
					}}
				>
					<div
						style={{
							width: `${
								(quizAnswers.filter((ans) => ans !== null).length /
									quiz.length) *
								100
							}%`,
							height: '100%',
							background:
								'linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)',
							transition: 'width 0.3s',
						}}
					/>
				</div>
				<div
					style={{
						fontSize: '0.98rem',
						color: '#64748b',
						marginTop: 2,
					}}
				>
					{quizAnswers.filter((ans) => ans !== null).length} of {quiz.length}{' '}
					answered
				</div>
			</div>

			{/* Table of Contents */}
			<div style={{ marginBottom: 32 }}>
				<h2
					style={{
						fontSize: '1.2rem',
						fontWeight: 800,
						marginBottom: 10,
						color: '#1e293b',
					}}
				>
					Table of Contents
				</h2>
				<ol style={{ paddingLeft: 18 }}>
					{sections.map((section, idx) => (
						<li
							key={section.title}
							style={{
								marginBottom: 6,
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<a
								href={`#section${idx}`}
								style={{
									color: openSection === idx ? '#1d4ed8' : '#2563eb',
									textDecoration: 'none',
									fontWeight: openSection === idx ? 800 : 600,
									marginRight: 8,
								}}
								onClick={(e) => {
									e.preventDefault();
									handleOpenSection(idx);
									document
										.getElementById(`section${idx}`)
										?.scrollIntoView({ behavior: 'smooth' });
								}}
							>
								{section.title}
							</a>
							{completedSections[idx] && (
								<span
									style={{
										color: '#22c55e',
										fontSize: '1.2rem',
										marginLeft: 4,
									}}
								>
									✔️
								</span>
							)}
						</li>
					))}
				</ol>
			</div>

			{/* Sections */}
			{sections.map((section, idx) => (
				<div
					key={section.title}
					id={`section${idx}`}
					style={{
						marginBottom: 24,
						background: completedSections[idx]
							? '#e0f2fe'
							: '#f8fafc',
						borderRadius: 12,
						boxShadow: '0 1px 8px rgba(30,41,59,0.07)',
						padding: 22,
						border:
							openSection === idx
								? '2px solid #2563eb'
								: '1.5px solid #e0e7ef',
						transition:
							'border 0.18s, background 0.18s',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							cursor: 'pointer',
							fontWeight: 700,
							fontSize: '1.08rem',
							color: '#2563eb',
						}}
						onClick={() => setOpenSection(openSection === idx ? null : idx)}
					>
						<span
							style={{
								marginRight: 10,
								fontSize: '1.2rem',
								transition: 'transform 0.18s',
								transform:
									openSection === idx
										? 'rotate(90deg)'
										: 'rotate(0deg)',
							}}
						>
							▶
						</span>
						<span
							style={{
								marginRight: 10,
								background: '#e0e7ef',
								borderRadius: '50%',
								width: 28,
								height: 28,
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontWeight: 700,
								color: '#2563eb',
							}}
						>
							{idx + 1}
						</span>
						{section.title}
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleCopy(idx, section.content);
							}}
							style={{
								marginLeft: 'auto',
								background:
									copiedIdx === idx ? '#dbeafe' : '#e0e7ef',
								color: '#2563eb',
								border: 'none',
								borderRadius: 8,
								padding: '4px 12px',
								fontWeight: 600,
								fontSize: '0.95rem',
								cursor: 'pointer',
								transition: 'background 0.18s',
							}}
							title="Copy tip"
							onMouseEnter={(e) =>
								(e.currentTarget.style.background = '#dbeafe')
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.background =
									copiedIdx === idx
										? '#dbeafe'
										: '#e0e7ef')
							}
						>
							{copiedIdx === idx ? 'Copied!' : 'Copy'}
						</button>
					</div>
					{openSection === idx && (
						<div
							style={{
								marginTop: 12,
								color: '#334155',
								fontWeight: 500,
								fontSize: '1.05rem',
								maxHeight: openSection === idx ? 500 : 0,
								opacity: openSection === idx ? 1 : 0,
								overflow: 'hidden',
								transition:
									'max-height 0.4s cubic-bezier(.4,0,.2,1), opacity 0.3s',
							}}
						>
							{section.content}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default ResumeWritingGuide;