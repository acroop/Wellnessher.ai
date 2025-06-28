import React, { useState } from 'react';
import {
  Calendar,
  Info,
  Shield,
  Heart,
  Book,
  FileText,
  Video,
  Users,
  Activity,
  ChevronRight,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Card from '../components/Card';
import Button from '../components/Button';
import Layout from '../components/Layout.jsx';

const initialRiskFactors = [
  { factor: 'Family History', present: true, weight: 2 },
  { factor: 'Age over 50', present: false, weight: 2 },
  { factor: 'Early Menstruation', present: true, weight: 1 },
  { factor: 'Late Menopause', present: false, weight: 1 },
  { factor: 'Previous Chest Radiation', present: false, weight: 2 },
  { factor: 'Dense Breast Tissue', present: true, weight: 1 },
];

const BreastCancerAwareness = () => {
  const { theme } = useTheme();
  const [reminders, setReminders] = useState([
    {
      id: '1',
      frequency: 'monthly',
      nextDate: '2025-07-15',
      completed: [true, false, true, true, false, true],
    },
  ]);
  const [riskFactors, setRiskFactors] = useState(initialRiskFactors);
  const [editing, setEditing] = useState(false);

  const nextDate = new Date(reminders[0]?.nextDate || '');
  const today = new Date();
  const daysUntilNextCheck = Math.max(
    0,
    Math.ceil((nextDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  );

  // Real-world risk logic: family history, age over 50, previous chest radiation = high risk; 2+ moderate = moderate, else low
  function calculateRiskLevel(factors) {
    const highRisk = factors.find(f => f.factor === 'Family History' && f.present) ||
      factors.find(f => f.factor === 'Age over 50' && f.present) ||
      factors.find(f => f.factor === 'Previous Chest Radiation' && f.present);
    if (highRisk) return 'High';
    const moderateCount = factors.filter(f => f.present).length;
    if (moderateCount >= 2) return 'Moderate';
    if (moderateCount === 1) return 'Low';
    return 'Low';
  }

  const riskLevel = calculateRiskLevel(riskFactors);
  const riskColor = {
    High: 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/30',
    Moderate: 'text-yellow-700 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/30',
    Low: 'text-green-700 bg-green-100 dark:text-green-300 dark:bg-green-900/30',
  }[riskLevel];

  const completeCheck = () => {
    const updated = { ...reminders[0] };
    updated.completed = [...updated.completed, true];

    const next = new Date(updated.nextDate);
    next.setMonth(next.getMonth() + 1);
    updated.nextDate = next.toISOString().split('T')[0];

    setReminders([updated]);
  };

  const handleToggleFactor = idx => {
    if (!editing) return;
    // Use a new array to force state update
    setRiskFactors(factors => {
      const updated = [...factors];
      updated[idx] = { ...updated[idx], present: !updated[idx].present };
      return updated;
    });
  };

  const handleEditOrSave = () => {
    setEditing(editing => !editing);
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-6 flex flex-col items-center" style={{ backgroundColor: theme.background, color: theme.text }}>
        <div className="w-full max-w-6xl mx-auto"> {/* Broader layout for consistency */}
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2" style={{ color: theme.text }}>
              Breast Cancer Awareness
            </h1>
            <p style={{ color: theme.textSecondary }}>Early detection saves lives</p>
          </div>

          {/* Self-Exam Reminder */}
          <Card title="Self-Examination Reminder" icon={<Calendar size={24} className="text-pink-500" />}>
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 rounded-full border-4 border-pink-500 flex items-center justify-center bg-pink-100 dark:bg-pink-900/20">
                <div
                  className={`w-20 h-20 rounded-full flex flex-col items-center justify-center text-white font-bold ${
                    daysUntilNextCheck <= 3 ? 'bg-pink-500' : 'bg-gray-400'
                  }`}
                >
                  <span className="text-2xl">{daysUntilNextCheck}</span>
                  <span className="text-xs">days</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme.text }}>
                  {daysUntilNextCheck === 0
                    ? 'Self-check is due today!'
                    : 'Days until next self-check'}
                </h3>
                <p className="mb-3" style={{ color: theme.textSecondary }}>
                  Next check: {nextDate.toDateString()}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-sm" style={{ color: theme.textSecondary }}>Your streak:</span>
                  <div className="flex gap-1">
                    {reminders[0]?.completed.map((done, idx) => (
                      <div
                        key={idx}
                        className={`w-4 h-4 rounded-full ${
                          done ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Button title="Mark as Completed" onPress={completeCheck} />
          </Card>

          {/* How-To Section */}
          <Card title="How to Perform a Self-Exam" icon={<Info size={24} className="text-pink-500" />}>
            <p className="mb-6" style={{ color: theme.textSecondary }}>
              Follow these steps to perform a breast self-examination:
            </p>
            {[
              ['Visual Inspection', 'Look in the mirror for size, shape, or color changes.'],
              ['Raise Your Arms', 'Raise arms and inspect again for dimples or nipple changes.'],
              ['Lying Down Exam', 'Lie down and use circular motions to feel each breast.'],
              ['Check for Discharge', 'Gently squeeze nipples to check for discharge.'],
            ].map(([title, desc], idx) => (
              <div key={idx} className="flex items-start gap-4 mb-6">
                <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-sm">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: theme.text }}>{title}</h4>
                  <p style={{ color: theme.textSecondary }}>{desc}</p>
                </div>
              </div>
            ))}
            <a href="https://www.youtube.com/watch?v=u-LzRJQJn3Q" target="_blank" rel="noopener noreferrer" className="block mt-4">
              <Button title="Watch Video Tutorial" type="secondary" />
            </a>
          </Card>

          {/* Risk Assessment */}
          <Card title="Risk Assessment" icon={<Shield size={24} className="text-pink-500" />}>
            <div className="flex items-center gap-4 mb-4">
              <span style={{ color: theme.textSecondary }}>Your Risk Level:</span>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${riskColor}`}>
                {riskLevel}
              </span>
            </div>
            <p className="text-sm italic mb-6" style={{ color: theme.textSecondary }}>
              Based on your inputs. Consult your doctor for professional assessment.
            </p>
            <div className="space-y-3">
              {riskFactors.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${editing ? 'hover:bg-pink-50 dark:hover:bg-pink-900/10 cursor-pointer' : ''}`}
                  style={{ border: `1px solid ${theme.border}` }}
                  onClick={() => { if (editing) handleToggleFactor(idx); }}
                >
                  <span>{item.factor}</span>
                  {editing ? (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${item.present ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {item.present ? 'Yes' : 'No'}
                    </span>
                  ) : item.present ? (
                    <CheckCircle size={20} className="text-red-500" />
                  ) : (
                    <XCircle size={20} className="text-green-500" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                type="button"
                className="px-4 py-2 rounded bg-pink-500 text-white font-semibold hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
                onClick={handleEditOrSave}
              >
                {editing ? 'Save Risk Factors' : 'Update Risk Factors'}
              </button>
            </div>
          </Card>

          {/* AI Tumor Detection Card */}
          <Card title="AI Breast Ultrasound Tumor Checker" icon={<Shield size={24} className="text-blue-500" />}>
            <div className="mb-4">
              <p style={{ color: theme.textSecondary }}>
                Unsure about your ultrasound image? Use our AI-powered tool to check if your breast ultrasound image shows signs of a tumor. This tool uses advanced deep learning to assist in early detection. <span className="font-semibold" style={{ color: theme.primary }}>For informational purposes only.</span>
              </p>
            </div>
            <div className="flex justify-start">
              <a
                href="https://huggingface.co/spaces/SoumiliSaha/BreastCancerAI"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button title="Check Ultrasound Image Here" type="secondary" />
              </a>
            </div>
          </Card>

          {/* Screening Recommendations */}
          <Card title="Screening Recommendations" icon={<Heart size={24} className="text-pink-500" />}>
            <div className="space-y-4">
              {[
                ['Clinical Breast Exam', 'Every 1–3 years for women in their 20s/30s, annually after 40.', Calendar],
                ['Mammogram', 'Annually for women 45+, optional from 40.', Activity],
                ['Ultrasonography', 'Recommended for women under 40 or with dense breast tissue; often used alongside mammograms for clearer imaging.', Shield],
              ].map(([title, desc, IconComponent], idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-lg"
                  style={{ backgroundColor: theme.inputBackground }}
                >
                  <IconComponent className="text-pink-500 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold mb-1" style={{ color: theme.text }}>{title}</h4>
                    <p style={{ color: theme.textSecondary }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </Layout>
  );
};

export default BreastCancerAwareness;
