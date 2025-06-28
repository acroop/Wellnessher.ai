import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

const slides = [
	{
		id: '1',
		title: 'Welcome to MedicoApp',
		description:
			"Your complete women's health companion, designed to support your wellness journey.",
	},
	{
		id: '2',
		title: 'Track Your Cycle',
		description:
			'Monitor your menstrual cycle, predict periods, and understand your fertility windows.',
	},
	{
		id: '3',
		title: 'PCOS Management',
		description:
			'Tools to track and manage PCOS symptoms, with personalized recommendations.',
	},
	{
		id: '4',
		title: 'Pregnancy Tracking',
		description:
			'Follow your pregnancy journey with week-by-week insights and important milestones.',
	},
	{
		id: '5',
		title: 'Your Health, Your Data',
		description:
			'Securely store and manage your medical history, documents, and connect with healthcare providers.',
	},
];

const OnboardingScreen = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		document.body.style.backgroundColor = '#101010';
	}, []);

	const completeOnboarding = () => {
		localStorage.setItem('onboarding_complete', 'true');
		navigate('/auth?signup=true', { replace: true });
	};

	const handleNext = () => {
		if (currentSlide < slides.length - 1) {
			setCurrentSlide(currentSlide + 1);
		} else {
			completeOnboarding();
		}
	};

	const handleSkip = () => {
		completeOnboarding();
	};

	const slide = slides[currentSlide];

	return (
		<Layout>
			<div className='min-h-screen px-4 py-6 flex flex-col items-center bg-[#101010] text-white'>
				<div className='w-full max-w-6xl mx-auto'>
					<div className='bg-[#282828d9] backdrop-blur-md p-6 md:p-10 rounded-3xl relative'>
						{!currentSlide === slides.length - 1 && (
							<button
								className='absolute top-4 right-4 text-pink-500 font-medium'
								onClick={handleSkip}
							>
								Skip
							</button>
						)}

						<div className='flex flex-col items-center'>
							<div className='w-40 h-40 rounded-full flex items-center justify-center bg-pink-600/30 my-8'>
								<span className='text-5xl font-bold text-pink-500'>
									{slide.id}
								</span>
							</div>

							<h1 className='text-3xl font-bold text-center mb-4'>
								{slide.title}
							</h1>
							<p className='text-center text-gray-300 mb-8 max-w-sm'>
								{slide.description}
							</p>

							<button
								className='bg-pink-600 text-white rounded-full py-2 px-8 font-medium text-lg hover:bg-pink-700 transition'
								onClick={handleNext}
							>
								{currentSlide === slides.length - 1
									? 'Get Started'
									: 'Next'}
							</button>

							<div className='flex justify-center mt-6 space-x-2'>
								{slides.map((_, index) => (
									<div
										key={index}
										className={`h-2 rounded-full transition-all ${
											index === currentSlide
												? 'w-6 bg-pink-600'
												: 'w-2 bg-gray-500'
										}`}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default OnboardingScreen;
