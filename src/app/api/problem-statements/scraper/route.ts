import { NextResponse } from "next/server";
import { getCachedData, setCachedData } from "@/lib/redis";

export async function GET() {
    const cacheKey = "problem_statements_global";
    const cached = await getCachedData(cacheKey);

    if (cached) {
        console.log("Serving problem statements from Redis cache");
        return NextResponse.json(cached);
    }

    // Curated high-quality problem statements from Smart India Hackathon 2025 and Global Sources
    const problemStatements = [
        {
            id: "sih_1",
            organization: "Ministry of Development of North Eastern Region",
            title: "Smart Community Health Monitoring and Early Warning System",
            description: "A system for monitoring water-borne diseases in rural Northeast India using early warning sensors and data analytics.",
            category: "Software",
            difficulty: "Advanced",
            tags: ["MedTech", "HealthTech", "SIH 2025"],
            theme: "BioTech / HealthTech"
        },
        {
            id: "sih_2",
            organization: "Ministry of Development of North Eastern Region",
            title: "Smart Tourist Safety Monitoring & Incident Response System",
            description: "Using AI, Geo-Fencing, and Blockchain-based Digital ID to ensure tourist safety and rapid response in mountainous regions.",
            category: "Software",
            difficulty: "Intermediate",
            tags: ["AI", "Blockchain", "Travel", "SIH 2025"],
            theme: "Travel & Tourism"
        },
        {
            id: "sih_4",
            organization: "Ministry of Fisheries, Animal Husbandry & Dairying",
            title: "Image-based Breed Recognition for Cattle and Buffaloes",
            description: "Development of a software solution to classify and recognize Indian cattle breeds from images for livestock management.",
            category: "Software",
            difficulty: "Intermediate",
            tags: ["Computer Vision", "Agriculture", "AI", "SIH 2025"],
            theme: "Agriculture & FoodTech"
        },
        {
            id: "sih_8",
            organization: "Government of Punjab",
            title: "Disaster Preparedness and Response Education System",
            description: "An educational platform for schools and colleges to train students on disaster response through simulations.",
            category: "Software",
            difficulty: "Easy",
            tags: ["Education", "Disaster Management", "SIH 2025"],
            theme: "Disaster Management"
        },
        {
            id: "sih_14",
            organization: "Government of Punjab",
            title: "Waste Segregation Monitoring System for Urban Bodies",
            description: "Hardware-Software integrated system to monitor and audit waste segregation at the source in urban areas.",
            category: "Hardware",
            difficulty: "Advanced",
            tags: ["IoT", "Clean Tech", "Hardware", "SIH 2025"],
            theme: "Clean & Green Technology"
        },
        {
            id: "sih_22",
            organization: "Ministry of Railways",
            title: "AI-Powered Precise Train Traffic Control",
            description: "Maximizing Section Throughput using AI to optimize train traffic and reduce delays on busy corridors.",
            category: "Software",
            difficulty: "Advanced",
            tags: ["AI", "Transportation", "Logistics", "SIH 2025"],
            theme: "Transportation & Logistics"
        },
        {
            id: "sih_27",
            organization: "Ministry of Ayush",
            title: "Blockchain-based Botanical Traceability of Ayurvedic Herbs",
            description: "Geo-tagging and blockchain ledger for tracking the supply chain of Ayurvedic herbs from farmers to formulation.",
            category: "Software",
            difficulty: "Intermediate",
            tags: ["Blockchain", "Supply Chain", "Ayurveda", "SIH 2025"],
            theme: "Blockchain & Cybersecurity"
        },
        {
            id: "sih_33",
            organization: "Ministry of Corporate Affairs",
            title: "AI-Based Smart Allocation Engine for PM Internship Scheme",
            description: "Automated engine to match and allocate interns to companies based on skillsets and interests using ML.",
            category: "Software",
            difficulty: "Intermediate",
            tags: ["ML", "Automation", "HR Tech", "SIH 2025"],
            theme: "Smart Automation"
        },
        {
            id: "sih_39",
            organization: "Ministry of Earth Sciences (MoES)",
            title: "Integrated Platform for Crowdsourced Ocean Hazard Reporting",
            description: "Real-time ocean hazard reporting platform with social media analytics for disaster mitigation.",
            category: "Software",
            difficulty: "Advanced",
            tags: ["Disaster Management", "Social Media Analytics", "SIH 2025"],
            theme: "Disaster Management"
        },
        {
            id: "sih_47",
            organization: "Government of Odisha",
            title: "Disaster Response Drone for Remote Areas",
            description: "Designing a high-endurance drone capable of delivering emergency supplies to remote disaster zones.",
            category: "Hardware",
            difficulty: "Advanced",
            tags: ["Robotics", "Drones", "Hardware", "SIH 2025"],
            theme: "Robotics and Drones"
        },
        {
            id: "sih_52",
            organization: "Government of Odisha",
            title: "AR-Based Cultural Heritage Preservation Platform",
            description: "Using Augmented Reality to showcase and preserve the cultural heritage of Odisha for remote tourism.",
            category: "Software",
            difficulty: "Intermediate",
            tags: ["AR/VR", "Heritage", "Tourism", "SIH 2025"],
            theme: "Heritage & Culture"
        },
        {
            id: "sih_73",
            organization: "Ministry of Youth Affairs and Sports",
            title: "AI-Powered Platform for Democratizing Sports Talent Assessment",
            description: "Using mobile cameras and AI to assess athletic talent in rural areas without professional equipment.",
            category: "Software",
            difficulty: "Intermediate",
            tags: ["SportsTech", "AI", "Mobile", "SIH 2025"],
            theme: "Fitness & Sports"
        },
        {
            id: "sih_83",
            organization: "Government of Kerala",
            title: "Earthquake Stabilised Dialysis System",
            description: "Hardware solution for dialysis machines to ensure patient safety and operation during seismic events.",
            category: "Hardware",
            difficulty: "Advanced",
            tags: ["MedTech", "Hardware", "Safety", "SIH 2025"],
            theme: "Disaster Management"
        },
        {
            id: "sih_94",
            organization: "MathWorks India Pvt. Ltd.",
            title: "AI-powered Monitoring of Crop Health and Soil Condition",
            description: "Using multispectral imaging and sensor data to predict pest risks and crop health in real-time.",
            category: "Software",
            difficulty: "Intermediate",
            tags: ["Agriculture", "Imaging", "MATLAB", "SIH 2025"],
            theme: "Agriculture & FoodTech"
        },
        {
            id: "ps_1",
            organization: "Global Challenge",
            title: "AI-Powered Mental Health Companion",
            description: "Develop a conversational assistant using NLP, emotion detection, and behavior pattern analysis.",
            category: "Software",
            difficulty: "Advanced",
            tags: ["NLP", "Mental Health", "AI"],
            theme: "HealthTech"
        }
    ];

    // Shuffle results for variety (Fisher-Yates)
    for (let i = problemStatements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [problemStatements[i], problemStatements[j]] = [problemStatements[j], problemStatements[i]];
    }

    // Cache for 5 minutes (300 seconds)
    await setCachedData(cacheKey, problemStatements, 300);

    return NextResponse.json(problemStatements);
}
