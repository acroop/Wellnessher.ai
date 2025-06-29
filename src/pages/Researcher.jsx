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

const Researcher = () => {
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
                            Cancer Diagnosis
                        </h1>
                        <p style={{ color: theme.textSecondary }}>Early detection by pathogenetic prediction</p>
                    </div>

                    {/* Self-Exam Reminder */}




                    {/* AI Tumor Detection Card */}
                    <Card title="Early detection by pathogenetic prediction" icon={<Shield size={24} className="text-blue-500" />}>
                        <div className="mb-4">
                            <p style={{ color: theme.textSecondary }}>
                                Concerned about a potential infection? Use our AI-powered tool to analyze your genetic data for signs of harmful pathogens. This tool leverages cutting-edge deep learning to assist in early disease detection. <span className="font-semibold" style={{ color: theme.primary }}>For informational purposes only.</span>
                            </p>

                        </div>
                        <div className="flex justify-start">
                            <a
                                href="https://5389824fdafe440d44.gradio.live/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block"
                            >
                                <Button title="Check early detection by pathogenetic prediction" type="secondary" />
                            </a>
                        </div>
                    </Card>



                </div>
            </div>
        </Layout>
    );
};

export default Researcher;
