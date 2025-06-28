import React, { useState, useEffect } from 'react';
import {
  User,
  Calendar,
  Mail,
  Phone,
  Camera,
  ChevronRight,
  FileText,
  Heart,
  Shield,
  Bell,
  Link,
  Download
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import Layout from '../components/Layout.jsx';

const InputField = ({ label, value, onChange, placeholder, type = "text" }) => {
  const { theme } = useTheme();
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2" style={{ color: theme.textSecondary }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg focus:ring-2 focus:outline-none"
        style={{
          backgroundColor: theme.inputBackground,
          border: `1px solid ${theme.border}`,
          color: 'black', // Force input text color to black
          caretColor: 'black', // Ensure cursor is visible
        }}
      />
    </div>
  );
};

const Button = ({ children, onClick, variant = "primary", className = "" }) => {
  const { theme } = useTheme();
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 ";
  const style = {
    primary: {
      backgroundColor: theme.accent,
      color: theme.buttonText,
    },
    outline: {
      backgroundColor: 'transparent',
      color: theme.accent,
      border: `1px solid ${theme.accent}`,
    },
  };

  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`} style={style[variant]}>
      {children}
    </button>
  );
};

const ProfileSection = ({ title, icon: Icon, onClick }) => {
  const { theme } = useTheme();
  return (
    <div className="w-full rounded-md px-4 py-3 mb-2 flex items-center justify-between"
      style={{ backgroundColor: "#1A1A1A", border: `1px solid ${theme.border}` }}>
      <div className="flex items-center gap-3">
        <Icon size={20} style={{ color: theme.accent }} />
        <span style={{ color: theme.text }}>{title}</span>
      </div>
      <button onClick={onClick}>
        <ChevronRight size={20} style={{ color: theme.textSecondary }} />
      </button>
    </div>
  );
};

const ProfileScreen = () => {
  const { theme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);


  const getInitialUserData = () => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        return {
          name: user.name || '',
          email: user.email || '',
          phoneNumber: user.phoneNumber || '',
          dateOfBirth: user.dateOfBirth || '',
          profilePicture: user.profilePicture || '/default-avatar.png',
          initial: user.initial || (user.name ? user.name[0].toUpperCase() : 'U'),
        };
      } catch {
        return {
          name: '',
          email: '',
          phoneNumber: '',
          dateOfBirth: '',
          profilePicture: '/default-avatar.png',
          initial: 'U',
        };
      }
    }
    return {};
  };

  const [userData, setUserData] = useState(getInitialUserData());
  const [name, setName] = useState(userData.name || '');
  const [email, setEmail] = useState(userData.email || '');
  const [phoneNumber, setPhoneNumber] = useState(userData.phoneNumber || '');
  const [dateOfBirth, setDateOfBirth] = useState(userData.dateOfBirth || '');

  useEffect(() => {
    const updated = getInitialUserData();
    setUserData(updated);
    setName(updated.name || '');
    setEmail(updated.email || '');
    setPhoneNumber(updated.phoneNumber || '');
    setDateOfBirth(updated.dateOfBirth || '');
  }, []);

  const handleSaveProfile = () => {
    if (!name || !email) return alert('Name and email are required');

    const updatedUser = {
      ...userData,
      name,
      email,
      phoneNumber,
      dateOfBirth,
      initial: name[0].toUpperCase(),
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUserData(updatedUser);
    setIsEditing(false);
    alert('Profile updated successfully');
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <Layout>
      <div className="min-h-screen px-4 py-6 flex flex-col items-center" style={{ backgroundColor: theme.background, color: theme.text }}>
        <div className="w-full max-w-6xl mx-auto">

          {/* Profile Header */}
          <div className="text-center mb-6">
            <div className="relative inline-block mb-4">
              <img
                src={userData.profilePicture || '/default-avatar.png'}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover bg-gray-300"
              />
              <input
                type="file"
                accept="image/*"
                id="profile-upload"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const updatedUser = {
                        ...userData,
                        profilePicture: reader.result,
                      };
                      setUserData(updatedUser);
                      localStorage.setItem('user', JSON.stringify(updatedUser));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: theme.accent, color: theme.buttonText }}
              >
                <Camera size={16} />
              </label>
            </div>
            <h1 className="text-2xl font-bold mb-1" style={{ color: theme.text }}>{userData.name}</h1>
            <p style={{ color: theme.textSecondary }}>{userData.email}</p>
          </div>

          {/* Profile Info */}
          <Card>
            <h2 className="text-lg font-semibold mb-4" style={{ color: theme.text }}>Profile Information</h2>
            {isEditing ? (
              <>
                <InputField label="Full Name" value={name} onChange={setName} placeholder="Enter full name" />
                <InputField label="Email" value={email} onChange={setEmail} type="email" placeholder="Enter email" />
                <InputField label="Phone Number" value={phoneNumber} onChange={setPhoneNumber} type="tel" placeholder="Phone number" />
                <InputField label="Date of Birth" value={dateOfBirth} onChange={setDateOfBirth} type="date" />
                <div className="flex space-x-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setName(userData.name);
                      setEmail(userData.email);
                      setPhoneNumber(userData.phoneNumber || '');
                      setDateOfBirth(userData.dateOfBirth || '');
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveProfile} className="flex-1">
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <>
                {[['Name', name, User], ['Email', email, Mail], ['Phone Number', phoneNumber, Phone], ['Date of Birth', formatDate(dateOfBirth), Calendar]].map(
                  ([label, val, Icon], i) =>
                    val && (
                      <div key={i} className="flex items-center mb-4">
                        <div className="w-10 flex justify-center">
                          <Icon size={20} style={{ color: theme.accent }} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm" style={{ color: theme.textSecondary }}>{label}</p>
                          <p style={{ color: theme.text }}>{val}</p>
                        </div>
                      </div>
                    )
                )}
                <Button variant="outline" onClick={() => setIsEditing(true)} className="w-full mt-4">
                  Edit Profile
                </Button>
              </>
            )}
          </Card>

          {/* Health Data Section */}
          <Card>
            <h2 className="text-lg font-semibold mb-3 px-1" style={{ color: theme.text }}>Health Data</h2>
            <div className="space-y-2">
              <ProfileSection title="Medical History" icon={FileText} onClick={() => alert('Medical History')} />
              <ProfileSection title="Period Tracker Data" icon={Calendar} onClick={() => alert('Period Tracker')} />
              <ProfileSection title="PCOS Management Data" icon={User} onClick={() => alert('PCOS')} />
              <ProfileSection title="Pregnancy Tracker Data" icon={Heart} onClick={() => alert('Pregnancy')} />
            </div>
          </Card>

          {/* Account Settings */}
          <Card>
            <h2 className="text-lg font-semibold mb-3 px-1" style={{ color: theme.text }}>Account</h2>
            <div className="space-y-2">
              <ProfileSection title="Privacy Settings" icon={Shield} onClick={() => alert('Privacy Settings')} />
              <ProfileSection title="Notifications" icon={Bell} onClick={() => alert('Notifications')} />
              <ProfileSection title="Connected Accounts" icon={Link} onClick={() => alert('Connected Accounts')} />
              <ProfileSection title="Data Export" icon={Download} onClick={() => alert('Export')} />
            </div>
          </Card>

        </div>
      </div>
    </Layout>
  );
};

export default ProfileScreen;
