export const stats = [
  { label: "Detection Accuracy", value: "98.7%" },
  { label: "Diseases Supported", value: "120+" },
  { label: "Farmers Helped", value: "45K+" },
  { label: "Scans Performed", value: "1.2M" },
];

export const recentScans = [
  { id: "SCN-1042", crop: "Tomato", disease: "Early Blight", severity: "Moderate", confidence: 96.4, date: "2026-05-12" },
  { id: "SCN-1041", crop: "Wheat", disease: "Healthy", severity: "None", confidence: 99.1, date: "2026-05-12" },
  { id: "SCN-1040", crop: "Maize", disease: "Northern Leaf Blight", severity: "Severe", confidence: 92.8, date: "2026-05-11" },
  { id: "SCN-1039", crop: "Potato", disease: "Late Blight", severity: "Mild", confidence: 88.2, date: "2026-05-11" },
  { id: "SCN-1038", crop: "Rice", disease: "Bacterial Leaf Blight", severity: "Moderate", confidence: 94.0, date: "2026-05-10" },
  { id: "SCN-1037", crop: "Apple", disease: "Apple Scab", severity: "Mild", confidence: 90.5, date: "2026-05-10" },
  { id: "SCN-1036", crop: "Grape", disease: "Healthy", severity: "None", confidence: 97.3, date: "2026-05-09" },
];

export const diseaseTrends = [
  { month: "Jan", scans: 320, diseased: 110 },
  { month: "Feb", scans: 410, diseased: 150 },
  { month: "Mar", scans: 520, diseased: 190 },
  { month: "Apr", scans: 610, diseased: 220 },
  { month: "May", scans: 780, diseased: 260 },
  { month: "Jun", scans: 920, diseased: 310 },
];

export const diseaseDistribution = [
  { name: "Healthy", value: 58 },
  { name: "Fungal", value: 22 },
  { name: "Bacterial", value: 12 },
  { name: "Viral", value: 8 },
];

export const accuracyHistory = [
  { week: "W1", accuracy: 94.2 },
  { week: "W2", accuracy: 95.1 },
  { week: "W3", accuracy: 96.0 },
  { week: "W4", accuracy: 97.4 },
  { week: "W5", accuracy: 98.1 },
  { week: "W6", accuracy: 98.7 },
];

export const features = [
  { icon: "Brain", title: "AI Detection", desc: "Deep learning models trained on millions of plant images." },
  { icon: "Zap", title: "Instant Results", desc: "Get diagnoses in under 2 seconds with 98%+ accuracy." },
  { icon: "Leaf", title: "Treatment Suggestions", desc: "Personalized organic and chemical treatment plans." },
  { icon: "BarChart3", title: "Disease Analytics", desc: "Track outbreaks and trends across your fields." },
  { icon: "Languages", title: "Multi-language", desc: "Available in 15+ languages for farmers worldwide." },
  { icon: "ShieldCheck", title: "Privacy First", desc: "Your data and images stay encrypted and private." },
];

export const testimonials = [
  { name: "Ravi Patel", role: "Tomato Farmer, Gujarat", quote: "AgroVision saved 30% of my yield last season. The instant diagnosis is incredible." },
  { name: "Maria Lopez", role: "Vineyard Owner, Spain", quote: "I caught downy mildew weeks before it would have spread. A must-have tool." },
  { name: "Kwame Asante", role: "Cocoa Co-op, Ghana", quote: "Our co-op uses AgroVision daily. It's transformed how we manage crop health." },
];

export const faqs = [
  { q: "How accurate is the AI detection?", a: "Our model achieves 98.7% accuracy across 120+ diseases, validated on 2M+ field images." },
  { q: "Which crops are supported?", a: "We support 40+ crops including cereals, fruits, vegetables, and cash crops." },
  { q: "Can I use it offline?", a: "Yes — our mobile app provides offline detection for the most common 50 diseases." },
  { q: "Is my data secure?", a: "Absolutely. All images are encrypted in transit and at rest. We never share your farm data." },
];

export const diseaseInfo = {
  name: "Tomato Early Blight",
  scientific: "Alternaria solani",
  severity: "Moderate",
  symptoms: [
    "Concentric rings on lower leaves",
    "Yellow halos around dark spots",
    "Premature defoliation in severe cases",
    "Dark sunken lesions on stems",
  ],
  causes: [
    "Warm humid conditions (24-29°C)",
    "Prolonged leaf wetness",
    "Nutrient-deficient soil",
    "Overhead irrigation",
  ],
  prevention: [
    "Rotate crops every 2-3 years",
    "Use drip irrigation instead of overhead",
    "Mulch to prevent soil splash",
    "Stake plants for airflow",
  ],
  treatments: [
    { name: "Chlorothalonil", type: "Fungicide", dosage: "2g/L every 7-10 days" },
    { name: "Copper Hydroxide", type: "Organic", dosage: "3g/L every 14 days" },
    { name: "Mancozeb", type: "Fungicide", dosage: "2.5g/L weekly" },
  ],
  affectedCrops: ["Tomato", "Potato", "Eggplant", "Pepper"],
  seasonalRisk: "High in late summer & early autumn",
};
