import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiHeart, FiClipboard } from 'react-icons/fi';
import { IoMedicalOutline, IoRibbonOutline } from 'react-icons/io5';
import { useTheme } from '../context/ThemeContext';
import Layout from '../components/Layout.jsx';

const HomeScreen = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  const upcomingPeriod = "June 28, 2025";
  const nextAppointment = {
    doctor: "Dr. Sarah Johnson",
    date: "June 30, 2025",
    time: "10:00 AM",
  };

  const features = [
    {
      title: 'Period Tracker',
      icon: <FiCalendar size={20} />,
      route: '/period-tracker',
      description: 'Track your cycle, monitor symptoms, and get accurate predictions.',
    },
    {
      title: 'PCOS Management',
      icon: <IoMedicalOutline size={20} />,
      route: '/pcos-management',
      description: 'Tools to help manage PCOS symptoms and track your treatment.',
    },
    {
      title: 'Pregnancy Tracker',
      icon: <FiHeart size={20} />,
      route: '/pregnancy-tracker',
      description: 'Follow your pregnancy journey week by week with helpful insights.',
    },
    {
      title: 'Breast Cancer Awareness',
      icon: <IoRibbonOutline size={20} />,
      route: '/breast-cancer-awareness',
      description: 'Learn about breast cancer, self-examination, and screening recommendations.',
    },
    {
    title: 'Cervical Cancer Awareness',
    icon: <IoRibbonOutline size={20} />,
    route: '/cervical-cancer-awareness',
    description: 'Understand symptoms, prevention, and early detection of cervical cancer.',
    },
    {
      title: 'Medical Records',
      icon: <FiClipboard size={20} />,
      route: '/medical-history',
      description: 'Securely store and organize your medical history and documents.',
    },
    {
      title: 'Consult a Doctor',
      icon: <IoMedicalOutline size={20} />,
      route: '/consult-doctor',
      description: 'Connect with healthcare providers specializing in women’s health.',
    },
    {
      title: 'MediDocs',
      icon: <FiClipboard size={20} />,
      route: '/medidocs',
      description: 'Upload, view, and manage your medical documents securely.',
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen px-4 py-6 flex flex-col items-center" style={{ backgroundColor: theme.background, color: theme.text }}>
        <div className="w-full max-w-6xl mx-auto"> {/* Standardized wrapper */}
          {/* Sign In Button */}
          <div className="flex justify-end mb-6">
            {!user && (
              <button
                className="px-4 py-2 rounded-md font-semibold"
                style={{ backgroundColor: theme.primary, color: theme.text, border: 'none' }}
                onClick={() => navigate('/auth')}
              >
                Sign In
              </button>
            )}
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mb-6 mt-2">
            <div>
              <h1 className="text-2xl font-bold">Hello, {user ? user.name?.split(' ')[0] : 'Guest'}</h1>
              <p className="text-sm" style={{ color: theme.textSecondary }}>
                How are you feeling today?
              </p>
            </div>
            <div
              onClick={() => navigate('/profile')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
              style={{ backgroundColor: theme.primary }}
              title="Go to Profile"
            >
              {user ? (user.initial || user.name?.[0]) : 'G'}
            </div>
          </div>
          {/* Reminders stacked vertically */}
          <div className="flex flex-col gap-4 mb-6">
            {/* Upcoming Period Card */}
            <div className="p-4 rounded-lg shadow-md flex flex-col gap-2 min-h-[110px]" style={{ backgroundColor: theme.primary + '20', minHeight: 110 }}>
              <h2 className="text-sm font-semibold mb-1" style={{ color: theme.primary }}>
                Upcoming Period
              </h2>
              <p className="text-xs mb-1" style={{ color: theme.textSecondary }}>
                Expected on <strong style={{ color: theme.text }}>{upcomingPeriod}</strong>
              </p>
              <div className="flex justify-start mt-1">
                <button
                  className="px-3 py-1 rounded-md text-sm font-medium"
                  style={{ color: theme.primary, borderColor: theme.primary, backgroundColor: theme.background, borderWidth: 1, borderStyle: 'solid' }}
                  onClick={() => navigate('/period-tracker')}
                >
                  Track Period
                </button>
              </div>
            </div>

            {/* Upcoming Appointment Card */}
            <div className="p-4 rounded-lg shadow-md flex flex-col gap-2 min-h-[110px]" style={{ backgroundColor: theme.secondary + '20', minHeight: 110 }}>
              <h2 className="text-sm font-semibold mb-1" style={{ color: theme.secondary }}>
                Upcoming Appointment
              </h2>
              <p className="text-xs mb-1" style={{ color: theme.text }}>{`${nextAppointment.date} at ${nextAppointment.time}`}</p>
              <p className="text-xs mb-2" style={{ color: theme.textSecondary }}>{`With ${nextAppointment.doctor}`}</p>
              <div className="flex justify-start mt-1">
                <button
                  className="px-3 py-1 rounded-md text-sm font-medium"
                  style={{ color: theme.secondary, borderColor: theme.secondary, backgroundColor: theme.background, borderWidth: 1, borderStyle: 'solid' }}
                  onClick={() => navigate('/consult-doctor')}
                >
                  View Details
                </button>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <h2 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"> {/* Added md:grid-cols-3 for broader grid */}
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={() => navigate(feature.route)}
                className="p-4 rounded-lg shadow-md cursor-pointer transition hover:shadow-lg"
                style={{ backgroundColor: theme.card }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="p-2 rounded-full"
                    style={{ backgroundColor: theme.surface, color: theme.primary }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-sm font-semibold" style={{ color: theme.text }}>
                    {feature.title}
                  </h3>
                </div>
                <p className="text-xs" style={{ color: theme.textSecondary }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomeScreen;
