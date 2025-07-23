import React from 'react';
import { useNavigate } from 'react-router-dom';

const interviewTips = [
	{
		title: '1. Research the Company',
		content:
			'Understand their mission, values, products, and recent news. Tailor your answers to show you’re a great fit.',
	},
	{
		title: '2. Practice Common Questions',
		content:
			'Prepare answers for questions like "Tell me about yourself", "Why do you want this job?", and "What are your strengths and weaknesses?".',
	},
	{
		title: '3. Use the STAR Method',
		content: 'Structure your answers for behavioral questions: Situation, Task, Action, Result.',
	},
	{
		title: '4. Prepare Questions to Ask',
		content:
			'Show your interest by asking thoughtful questions about the team, company culture, or growth opportunities.',
	},
	{
		title: '5. Dress Professionally',
		content: 'Choose attire that matches the company’s culture and the role you’re applying for.',
	},
	{
		title: '6. Be On Time',
		content:
			'Arrive 10-15 minutes early for in-person interviews or test your tech setup for virtual interviews.',
	},
	{
		title: '7. Follow Up',
		content:
			'Send a thank-you email after the interview, reiterating your interest and summarizing why you’re a great fit.',
	},
];

const InterviewPreparation: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div
			style={{
				minHeight: '100vh',
				padding: '40px 20px',
				maxWidth: 700,
				margin: '0 auto',
				fontFamily: 'Segoe UI, Arial, sans-serif',
				color: '#1e293b',
				background: 'linear-gradient(120deg, #f8fafc 60%, #e0e7ff 100%)',
			}}
		>
			{/* Back Button */}
			<button
				onClick={() => navigate(-1)}
				style={{
					marginBottom: 32,
					background: 'none',
					color: '#2563eb',
					border: 'none',
					borderRadius: 8,
					padding: '6px 0 6px 0',
					fontWeight: 700,
					fontSize: '1.08rem',
					cursor: 'pointer',
					display: 'flex',
					alignItems: 'center',
					gap: 6,
				}}
			>
				<span style={{ fontSize: '1.2rem' }}>←</span> Back
			</button>

			<h1
				style={{
					fontWeight: 900,
					fontSize: '2.3rem',
					marginBottom: 10,
					color: '#1e293b',
					letterSpacing: '-1px',
				}}
			>
				Interview Preparation Guide
			</h1>
			<p
				style={{
					fontSize: '1.1rem',
					color: '#334155',
					marginBottom: 28,
				}}
			>
				Get ready to ace your next interview with these essential tips.
			</p>

			<div>
				{interviewTips.map((tip, idx) => (
					<div
						key={tip.title}
						style={{
							background: '#fff',
							borderRadius: 16,
							boxShadow: '0 2px 12px rgba(30,41,59,0.07)',
							padding: 22,
							marginBottom: 22,
							borderLeft: '5px solid #2563eb',
							display: 'flex',
							alignItems: 'flex-start',
							gap: 16,
							transition: 'box-shadow 0.18s, transform 0.18s',
							cursor: 'pointer',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.boxShadow =
								'0 6px 24px rgba(37,99,235,0.13)';
							e.currentTarget.style.transform = 'translateY(-2px) scale(1.01)';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.boxShadow =
								'0 2px 12px rgba(30,41,59,0.07)';
							e.currentTarget.style.transform = 'none';
						}}
					>
						<span
							style={{
								minWidth: 36,
								height: 36,
								background: '#2563eb',
								color: '#fff',
								borderRadius: '50%',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								fontWeight: 800,
								fontSize: '1.1rem',
								marginTop: 2,
							}}
						>
							{idx + 1}
						</span>
						<div>
							<div
								style={{
									fontWeight: 700,
									color: '#2563eb',
									marginBottom: 6,
									fontSize: '1.08rem',
								}}
							>
								{tip.title.replace(/^\d+\.\s/, '')}
							</div>
							<div
								style={{
									fontSize: '1.05rem',
									color: '#334155',
								}}
							>
								{tip.content}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default InterviewPreparation;