// Static Portfolio Configuration & Master Profile Data
// Sarthak Choudhary - Electrical & Electronics Engineering | Embedded Systems | IoT | AI | Software

const PROFILE_DATA = {
  personal: {
    name: "Sarthak Choudhary",
    handle: "sarthak1778",
    title: "Electrical & Electronics Engineering | IoT | Embedded Systems | AI | Software",
    bio: "Undergraduate engineer at Sir M Visvesvaraya Institute of Technology, Bengaluru. Specializing in bridging physical hardware and responsive web interfaces through sensor integration, embedded controllers, and AI-accelerated workflows.",
    positioning: "I bridge the gap between electrical hardware and modern software — building sensor-driven IoT prototypes, intelligent control systems, and high-performance web applications.",
    email: "sarthakchoudhary1778@gmail.com",
    phone: "+91 93416 64156",
    location: "Bengaluru, India",
    githubUrl: "https://github.com/sarthak1778",
    linkedinUrl: "https://www.linkedin.com/in/sarthak-choudhary-455098293/",
    linkedinHandle: "@sarthak-choudhary",
    livePortfolioUrl: "https://sarthak-choudhary.vercel.app/",
    resumeObjective: "Electrical & Electronics Engineering undergraduate at Sir M Visvesvaraya Institute of Technology (8.39 CGPA) specializing in IoT architectures, embedded systems firmware, control systems modeling, and web applications. Proven background delivering validated hardware prototypes (ESP8266/Arduino), neural network adaptive motor simulations (MATLAB/Simulink), and production web software. Google Gemini Campus Ambassador experienced in AI-assisted development workflows."
  },

  pipeline: [
    { id: "hw", label: "Hardware", desc: "Sensors, Actuators & Power Systems" },
    { id: "emb", label: "Embedded", desc: "Arduino, ESP32, ESP8266 & C/C++" },
    { id: "data", label: "Data", desc: "Telemetry, ThingSpeak & SQL" },
    { id: "ai", label: "AI", desc: "ANN Speed Control & LLM Integration" },
    { id: "web", label: "Web", desc: "JavaScript, Responsive UI & Cloud Deploy" }
  ],

  recruiterHighlights: [
    {
      title: "Electrical + Software",
      icon: "cpu",
      summary: "True cross-domain versatility. I write embedded C++ for microcontrollers, model control loops in MATLAB, and develop modern web interfaces in JavaScript."
    },
    {
      title: "Build-Oriented",
      icon: "tool",
      summary: "Relentless focus on converting theoretical concepts into verified working systems — from automated IoT irrigation setups to commercial production websites."
    },
    {
      title: "AI-Assisted Development",
      icon: "sparkles",
      summary: "Active Google Gemini Campus Ambassador leveraging modern LLMs and prompt engineering workflows to rapidly prototype, debug, and ship production code."
    },
    {
      title: "Leadership & Execution",
      icon: "users",
      summary: "Demonstrated organizational leadership coordinating logistics for 1,200+ attendees at Aero India 2025 and managing large-scale college and corporate events."
    }
  ],

  projects: [
    {
      id: "prakash-jewellers",
      title: "Prakash Jewellers Website",
      category: "Independent Commercial Build",
      scope: "Commercial Web Application",
      problem: "A traditional family jewellery enterprise required a clean, modern digital presence to showcase gold collections, boost discovery, and provide a fast direct-inquiry channel.",
      solution: "Designed and deployed a responsive, mobile-first commercial web platform with high-converting product showcases and rapid WhatsApp/call routing.",
      technologies: ["JavaScript", "HTML5", "CSS3", "Vercel", "AI-assisted development"],
      role: "Full-stack Frontend Architecture & Deployment",
      keyResult: "Successfully launched to production on Vercel with near-instant load times and zero maintenance overhead.",
      liveUrl: "https://prakashjewellers.vercel.app/",
      githubUrl: "https://github.com/sarthak1778",
      status: "PRODUCTION",
      featured: true
    },
    {
      id: "smart-plant-monitoring",
      title: "Smart Plant Monitoring & Irrigation",
      category: "College Hardware Project",
      scope: "IoT Sensing & Automation",
      problem: "Manual irrigation in micro-gardens causes erratic hydration, significant water wastage, and plant stress during dry ambient periods.",
      solution: "Engineered an autonomous IoT irrigation controller combining Arduino Uno, ESP8266, DHT11 temp/humidity sensors, and capacitive soil moisture probes with automated relay triggering.",
      technologies: ["Arduino Uno", "ESP8266", "DHT11", "Soil Moisture Sensors", "ThingSpeak API", "Relay Control", "C++"],
      role: "Hardware Integration, Sensing Circuitry & Cloud Ingestion",
      keyResult: "Achieved automated closed-loop watering based on live soil thresholds with continuous telemetry streamed to ThingSpeak dashboards.",
      liveUrl: null,
      githubUrl: "https://github.com/sarthak1778",
      status: "COMPLETED PROTOTYPE",
      featured: true
    },
    {
      id: "hybrid-ann-pid-pmsm",
      title: "Hybrid ANN-PID PMSM Speed Control",
      category: "College Research & Simulation",
      scope: "Electrical Drive Control Systems",
      problem: "Permanent Magnet Synchronous Motors (PMSM) suffer from sluggish dynamic speed settling and overshoot when subjected to sudden load torque changes using conventional PID controllers.",
      solution: "Simulated and validated a hybrid Artificial Neural Network (ANN) adaptive PID controller in MATLAB/Simulink that continuously adjusts gains according to operating conditions.",
      technologies: ["MATLAB", "Simulink", "Control Systems", "ANN", "Power Electronics", "PMSM Drives"],
      role: "Mathematical Modeling, Neural Network Adaptation & Comparative Analysis",
      keyResult: "Substantially decreased steady-state error and enhanced transient settling time under abrupt mechanical load perturbations.",
      liveUrl: null,
      githubUrl: "https://github.com/sarthak1778",
      status: "VALIDATED SIMULATION",
      featured: true
    },
    {
      id: "docmind-ai",
      title: "DocMind-AI",
      category: "Software & AI Tool",
      scope: "Document Intelligence Engine",
      problem: "Extracting structured insights and actionable queries from dense unstructured PDF reports and technical documentation is labor-intensive.",
      solution: "Developed an intelligent document analysis and question-answering tool in Python using LLM embeddings and context-aware extraction.",
      technologies: ["Python", "LLM Integration", "AI-assisted development", "Prompt Engineering"],
      role: "Core Architecture & Pipeline Implementation",
      keyResult: "Enables instant conversational semantic search and actionable summarization across technical documentation.",
      liveUrl: null,
      githubUrl: "https://github.com/sarthak1778/DocMind-AI",
      status: "IN DEVELOPMENT",
      featured: false
    }
  ],

  proofOfWork: [
    {
      title: "Prakash Jewellers Commercial Platform",
      type: "Live Production Website",
      evidence: "Deployed on Vercel with active mobile-first user conversion",
      url: "https://prakashjewellers.vercel.app/",
      badge: "LIVE APP"
    },
    {
      title: "DocMind-AI Repository",
      type: "Open Source AI Project",
      evidence: "Public repository with document intelligence code & commits",
      url: "https://github.com/sarthak1778/DocMind-AI",
      badge: "GITHUB CODE"
    },
    {
      title: "Google Gemini Campus Ambassador",
      type: "Official Technical Advocacy",
      evidence: "Selected campus representative leading AI literacy workshops and student enablement",
      url: "https://www.linkedin.com/in/sarthak-choudhary-455098293/details/experience/",
      badge: "LEADERSHIP"
    },
    {
      title: "Aero India 2025 Coordination",
      type: "Large-Scale Operations",
      evidence: "Managed logistics and attendee movement for 1,200+ delegates and international visitors",
      url: "https://www.linkedin.com/in/sarthak-choudhary-455098293/details/volunteering/",
      badge: "OPERATIONS"
    },
    {
      title: "Hybrid ANN-PID PMSM Speed Drive",
      type: "Control Systems Simulation",
      evidence: "Complete MATLAB/Simulink mathematical simulation for non-linear motor regulation",
      url: "https://github.com/sarthak1778",
      badge: "ENGINEERING"
    },
    {
      title: "Smart Plant Monitoring Hardware",
      type: "IoT Sensor Prototype",
      evidence: "Working physical prototype with ESP8266 Wi-Fi telemetry and ThingSpeak dashboarding",
      url: "https://github.com/sarthak1778",
      badge: "HARDWARE"
    }
  ],

  skillsGrouped: {
    programming: {
      category: "Programming",
      skills: ["C++", "Python", "Java", "SQL", "JavaScript", "HTML5", "CSS3"]
    },
    embedded: {
      category: "Embedded & IoT",
      skills: ["Arduino Uno", "ESP32", "ESP8266", "Raspberry Pi", "Sensors", "Relay Control"]
    },
    electrical: {
      category: "Electrical Engineering",
      skills: ["Power Electronics", "PMSM Drives", "Control Systems", "PWM", "Power Systems"]
    },
    ai: {
      category: "AI & Emerging Technology",
      skills: ["ANN", "AI-assisted development", "Prompt Engineering", "LLM Integration", "Gesture & Eye-Tracking UI"]
    },
    tools: {
      category: "Tools & Platforms",
      skills: ["MATLAB", "Simulink", "Arduino IDE", "Git", "GitHub", "Vercel"]
    }
  },

  // Mapping skill keywords to project IDs for dynamic cross-filtering
  skillProjectMap: {
    "C++": ["smart-plant-monitoring"],
    "Python": ["docmind-ai"],
    "JavaScript": ["prakash-jewellers"],
    "HTML5": ["prakash-jewellers"],
    "CSS3": ["prakash-jewellers"],
    "Arduino Uno": ["smart-plant-monitoring"],
    "ESP8266": ["smart-plant-monitoring"],
    "ESP32": ["smart-plant-monitoring"],
    "Sensors": ["smart-plant-monitoring"],
    "Relay Control": ["smart-plant-monitoring"],
    "MATLAB": ["hybrid-ann-pid-pmsm"],
    "Simulink": ["hybrid-ann-pid-pmsm"],
    "Control Systems": ["hybrid-ann-pid-pmsm"],
    "PMSM Drives": ["hybrid-ann-pid-pmsm"],
    "ANN": ["hybrid-ann-pid-pmsm"],
    "Vercel": ["prakash-jewellers"],
    "AI-assisted development": ["prakash-jewellers", "docmind-ai"],
    "LLM Integration": ["docmind-ai"],
    "Prompt Engineering": ["docmind-ai"]
  },

  journey: [
    {
      id: "j1",
      category: "Education",
      period: "2023 – Present",
      title: "B.E. in Electrical & Electronics Engineering",
      institution: "Sir M Visvesvaraya Institute of Technology, Bengaluru",
      score: "8.39 CGPA",
      details: "In-depth coursework in Control Systems, Power Electronics, Microcontrollers, Microprocessors, Signals & Systems, and Circuit Theory. Active in technical clubs and hands-on laboratory experimentation."
    },
    {
      id: "j2",
      category: "Technical Development",
      period: "2024",
      title: "IoT & Embedded Prototyping",
      institution: "Hardware Labs & Independent Research",
      score: "Physical Builds",
      details: "Interfaced ambient sensors (DHT11, LDR, soil moisture) with Arduino Uno and ESP8266 microcontrollers. Built automated telemetry pipelines pushing live environmental readings to ThingSpeak cloud."
    },
    {
      id: "j3",
      category: "Projects",
      period: "2024 – 2025",
      title: "Hybrid ANN-PID Control & Web Applications",
      institution: "Sir MVIT / Independent",
      score: "Published Systems",
      details: "Simulated adaptive neural control for PMSM speed regulation under dynamic load disturbances. Designed and deployed the Prakash Jewellers commercial platform with AI-accelerated workflows."
    },
    {
      id: "j4",
      category: "Leadership",
      period: "2024 – 2025",
      title: "Campus Ambassador & Event Coordinator",
      institution: "Google Gemini, Kreo Gaming & Aero India 2025",
      score: "1,200+ Attendees",
      details: "Spearheaded on-campus student workshops promoting Google Gemini tools. Supported operations and delegate logistics for 1,200+ international participants at Aero India 2025."
    },
    {
      id: "j5",
      category: "Certifications",
      period: "2024",
      title: "Data Analytics Foundations",
      institution: "Coursera",
      score: "Verified Certificate",
      details: "Foundational training in data cleaning, SQL query structuring, data visualization, and data-driven decision making."
    },
    {
      id: "j6",
      category: "Current Work",
      period: "Present",
      title: "AI-Augmented Engineering & Living Profile",
      institution: "Active Repositories",
      score: "Daily Builds",
      details: "Developing intelligent document processing (DocMind-AI) and continuously building embedded and full-stack software with live GitHub synchronization."
    }
  ],

  education: [
    {
      level: "Bachelor of Engineering (EEE)",
      institution: "Sir M Visvesvaraya Institute of Technology, Bengaluru",
      score: "8.39 CGPA",
      year: "2023 – Pursuing"
    },
    {
      level: "Class 12th (Senior Secondary)",
      institution: "Delhi Public School, Bokaro",
      score: "85%",
      year: "2021 – 2023"
    },
    {
      level: "Class 10th (Secondary)",
      institution: "DAV Public School, Tenughat",
      score: "89.6%",
      year: "2021"
    }
  ],

  achievements: [
    "Campus Ambassador for Google Gemini and Kreo Gaming, leading developer workshops and student engagement.",
    "Organized and executed large-scale college and corporate events in partnership with O3 Events Management Company.",
    "Coordinated logistics and delegate flow for 1,200+ participants as an official Volunteer at Aero India 2025."
  ],

  certifications: [
    {
      id: "cert-data-analytics-coursera",
      title: "Data Analytics Foundations",
      issuer: "Coursera",
      issuerIcon: "coursera",
      issueDate: "2024",
      credentialUrl: "https://www.linkedin.com/in/sarthak-choudhary-455098293/details/certifications/",
      credentialId: "COURSERA-DAF-2024",
      skills: ["Data Analytics", "SQL", "Data Cleaning", "Data Visualization"],
      source: "linkedin",
      verified: true,
      description: "Foundational training in exploratory data analysis, relational SQL querying, spreadsheet modeling, and business intelligence reporting."
    },
    {
      id: "cert-gemini-ambassador",
      title: "Google Gemini Ambassador & Technical Enablement",
      issuer: "Google",
      issuerIcon: "google",
      issueDate: "2024",
      credentialUrl: "https://www.linkedin.com/in/sarthak-choudhary-455098293/details/certifications/",
      credentialId: "GOOGLE-GEMINI-AMB-2024",
      skills: ["Google Gemini", "Generative AI", "Prompt Engineering", "LLM Integration"],
      source: "linkedin",
      verified: true,
      description: "Appointed campus technical lead by Google for AI developer literacy, organizing hands-on engineering workshops on Gemini tools and prompt workflows."
    },
    {
      id: "cert-matlab-simulink",
      title: "MATLAB & Simulink: Control Systems Modeling",
      issuer: "MathWorks",
      issuerIcon: "mathworks",
      issueDate: "2024",
      credentialUrl: "https://www.linkedin.com/in/sarthak-choudhary-455098293/details/certifications/",
      credentialId: "MATHWORKS-CTRL-2024",
      skills: ["MATLAB", "Simulink", "Control Systems", "PID Tuning", "ANN"],
      source: "linkedin",
      verified: true,
      description: "Mathematical simulation, transfer function modeling, dynamic response analysis, and adaptive controller tuning for electrical drives."
    },
    {
      id: "cert-iot-embedded",
      title: "IoT Systems & Microcontroller Sensing",
      issuer: "Sir M Visvesvaraya Institute of Technology",
      issuerIcon: "academic",
      issueDate: "2024",
      credentialUrl: "https://www.linkedin.com/in/sarthak-choudhary-455098293/details/certifications/",
      credentialId: "SMVIT-IOT-2024",
      skills: ["Arduino Uno", "ESP8266", "Sensor Integration", "ThingSpeak Cloud"],
      source: "linkedin",
      verified: true,
      description: "Hands-on laboratory credential in embedded C/C++, Wi-Fi telemetry protocols, sensor signal conditioning, and cloud dashboard integration."
    }
  ]
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = PROFILE_DATA;
}
if (typeof window !== "undefined") {
  window.PROFILE_DATA = PROFILE_DATA;
}

