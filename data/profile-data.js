// Static Portfolio Configuration & Master Profile Data
// Sarthak Choudhary - Electrical & Electronics Engineering | Embedded Systems | IoT | Control Systems | AI

const PROFILE_DATA = {
  personal: {
    name: "Sarthak Choudhary",
    handle: "sarthak1778",
    headline: "Electrical & Electronics Engineering Student",
    subheadline: "Embedded Systems • IoT • Control Systems • AI",
    positioning: "Building intelligent hardware-software systems that connect sensing, control, automation, and AI.",
    bio: "Undergraduate engineer at Sir M Visvesvaraya Institute of Technology, Bengaluru (8.39 CGPA). I take engineering concepts from mathematical modeling and control simulation in MATLAB/Simulink to physical embedded prototypes and production software.",
    email: "sarthakchoudhary1778@gmail.com",
    phone: "+91 93416 64156",
    location: "Bengaluru, India",
    institution: "Sir M Visvesvaraya Institute of Technology, Bengaluru",
    cgpa: "8.39",
    degree: "B.E. in Electrical & Electronics Engineering",
    githubUrl: "https://github.com/sarthak1778",
    linkedinUrl: "https://www.linkedin.com/in/sarthak-choudhary-455098293/",
    linkedinHandle: "@sarthak-choudhary",
    livePortfolioUrl: "https://sarthak-choudhary.vercel.app/",
    avatarUrl: "https://avatars.githubusercontent.com/u/87663705?v=4",
    resumeObjective: "Electrical & Electronics Engineering undergraduate at Sir M Visvesvaraya Institute of Technology (8.39 CGPA) specializing in embedded firmware, IoT architectures, motor control simulations, and technical software. Demonstrated experience building working physical prototypes (ESP8266/Arduino), neural network adaptive motor simulations (MATLAB/Simulink), and production web applications. Active Google Gemini Campus Ambassador experienced in AI-accelerated engineering workflows."
  },

  credibilityIndicators: [
    { label: "Academic Record", value: "8.39 CGPA", detail: "Sir MVIT, Bengaluru" },
    { label: "Core Discipline", value: "EEE", detail: "Electrical & Electronics" },
    { label: "Physical Systems", value: "Embedded + IoT", detail: "Firmware & Sensing" },
    { label: "Control & Simulation", value: "MATLAB / Simulink", detail: "PMSM & Drives" },
    { label: "Intelligent Systems", value: "AI / ML", detail: "ANN & LLMs" }
  ],

  aboutAreas: [
    {
      id: "embedded",
      title: "Embedded Systems",
      icon: "cpu",
      technologies: ["Arduino Uno", "ESP32", "ESP8266", "Raspberry Pi", "Sensors", "Actuators"],
      summary: "Firmware development in C/C++, low-level peripheral interfacing (I2C, SPI, UART, PWM), timer interrupts, and actuator integration for autonomous hardware systems."
    },
    {
      id: "iot",
      title: "Internet of Things (IoT)",
      icon: "wifi",
      technologies: ["ThingSpeak API", "Wi-Fi Telemetry", "MQTT/HTTP", "Cloud Dashboards"],
      summary: "End-to-end sensor networks linking physical environmental sensing directly to cloud telemetry dashboards with automated threshold alerts and closed-loop actuation."
    },
    {
      id: "electrical",
      title: "Electrical & Control Systems",
      icon: "zap",
      technologies: ["PMSM Drives", "PWM Inverters", "Power Electronics", "PID Tuning", "ANN Control"],
      summary: "Non-linear dynamic modeling, power electronics inverter stage design, space-vector/sinusoidal PWM switching, and adaptive neural control for electric motor drives."
    },
    {
      id: "ai",
      title: "AI & Machine Learning",
      icon: "sparkles",
      technologies: ["ANN", "Machine Learning", "MFCC Audio", "LLM Integration", "Prompt Engineering"],
      summary: "Neural network adaptive algorithms, feature extraction pipelines, intelligent document querying, and generative AI tool advocacy as a Google Gemini Campus Ambassador."
    },
    {
      id: "software",
      title: "Software & Web Development",
      icon: "code",
      technologies: ["Python", "C++", "Java", "JavaScript", "SQL", "HTML5/CSS3", "Vercel"],
      summary: "High-performance software and responsive web interfaces built as supporting channels for hardware visualization, interactive dashboards, and commercial digital platforms."
    }
  ],

  technicalSkills: {
    languages: {
      category: "Languages",
      skills: [
        { name: "C++", project: "Smart Plant Monitoring", link: "#smart-plant-monitoring" },
        { name: "Python", project: "Voice Emotion Recognition", link: "#voice-emotion-recognition" },
        { name: "Java", project: "Object-Oriented Systems", link: "#skills" },
        { name: "JavaScript", project: "Prakash Jewellers Website", link: "#prakash-jewellers" },
        { name: "SQL", project: "Coursera Data Analytics", link: "#certifications" }
      ]
    },
    embedded: {
      category: "Embedded & Hardware",
      skills: [
        { name: "Arduino Uno", project: "Ultrasonic Radar & Smart Plant", link: "#ultrasonic-radar" },
        { name: "ESP8266", project: "Smart Plant Monitoring", link: "#smart-plant-monitoring" },
        { name: "ESP32", project: "IoT Prototypes", link: "#skills" },
        { name: "Raspberry Pi", project: "Embedded Linux", link: "#skills" },
        { name: "Sensors (DHT11, Soil, HC-SR04)", project: "Hardware Builds", link: "#smart-plant-monitoring" },
        { name: "Relay Modules & Actuators", project: "Temp Controlled Fan", link: "#temp-controlled-fan" },
        { name: "OLED & I2C LCD", project: "Sensor Displays", link: "#ultrasonic-radar" },
        { name: "Servo Systems (SG90)", project: "Radar Sweep Mechanism", link: "#ultrasonic-radar" }
      ]
    },
    electrical: {
      category: "Electrical & Control",
      skills: [
        { name: "Power Electronics", project: "PMSM Inverter Stages", link: "#hybrid-ann-pid-pmsm" },
        { name: "PMSM Motor Drives", project: "PMSM Speed Control", link: "#hybrid-ann-pid-pmsm" },
        { name: "PWM Generation", project: "Inverter Gating Signals", link: "#hybrid-ann-pid-pmsm" },
        { name: "Control Systems", project: "Transfer Function Modeling", link: "#hybrid-ann-pid-pmsm" },
        { name: "PID Tuning", project: "Dynamic Closed-Loop", link: "#hybrid-ann-pid-pmsm" },
        { name: "ANN-Based Control", project: "Adaptive Neural PID", link: "#hybrid-ann-pid-pmsm" }
      ]
    },
    simulation: {
      category: "Simulation & Tools",
      skills: [
        { name: "MATLAB", project: "Mathematical Modeling", link: "#hybrid-ann-pid-pmsm" },
        { name: "Simulink", project: "Drive System Architecture", link: "#hybrid-ann-pid-pmsm" },
        { name: "Arduino IDE", project: "Firmware Compilation", link: "#smart-plant-monitoring" },
        { name: "Git & GitHub", project: "Version Control & Telemetry", link: "#github" }
      ]
    },
    ai: {
      category: "AI & Machine Learning",
      skills: [
        { name: "Machine Learning", project: "Voice Emotion Recognition", link: "#voice-emotion-recognition" },
        { name: "ANN (Neural Networks)", project: "Hybrid ANN-PID PMSM", link: "#hybrid-ann-pid-pmsm" },
        { name: "Audio Processing / MFCC", project: "Voice Emotion Recognition", link: "#voice-emotion-recognition" },
        { name: "LLM Integration", project: "DocMind-AI", link: "#docmind-ai" },
        { name: "Prompt Engineering", project: "Google Gemini Ambassador", link: "#experience" }
      ]
    },
    web: {
      category: "Web & Supporting Stack",
      skills: [
        { name: "HTML5 & CSS3", project: "Prakash Jewellers", link: "#prakash-jewellers" },
        { name: "JavaScript (Vanilla)", project: "Interactive Portfolios", link: "#prakash-jewellers" },
        { name: "Vercel", project: "Edge Serverless Deployment", link: "#prakash-jewellers" }
      ]
    }
  },

  skillsGrouped: {
    programming: {
      category: "Programming & Languages",
      skills: ["C++", "Python", "Java", "JavaScript", "SQL", "HTML5", "CSS3"]
    },
    embedded: {
      category: "Embedded & IoT",
      skills: ["Arduino Uno", "ESP8266", "ESP32", "Raspberry Pi", "Sensors (DHT11, Soil, HC-SR04)", "Relay Actuators", "OLED & I2C LCD", "Servo Systems"]
    },
    electrical: {
      category: "Electrical & Control",
      skills: ["Power Electronics", "PMSM Motor Drives", "PWM Generation", "Control Systems", "PID Tuning", "ANN-Based Control"]
    },
    simulation: {
      category: "Simulation & Tools",
      skills: ["MATLAB", "Simulink", "Arduino IDE", "Git", "GitHub", "Vercel"]
    },
    ai: {
      category: "AI & Machine Learning",
      skills: ["Artificial Neural Networks (ANN)", "Machine Learning", "Audio Processing / MFCC", "LLM Integration", "Prompt Engineering"]
    }
  },

  achievementsSummary: [
    "Graduating B.E. in Electrical & Electronics Engineering with 8.39 CGPA at Sir M Visvesvaraya Institute of Technology.",
    "Selected Google Gemini Campus Ambassador leading on-campus developer workshops on AI toolchains and modern workflows.",
    "Coordinated event logistics and crowd movement for 1,200+ delegates at Aero India 2025 and college cultural conventions.",
    "Active technical team member of Team Electrimo, contributing to electric mobility and powertrain subsystem development."
  ],

  projects: [
    {
      id: "hybrid-ann-pid-pmsm",
      title: "Hybrid ANN-PID PMSM Speed Control",
      subtitle: "Adaptive Speed Regulation for Permanent Magnet Synchronous Motors",
      category: "Electrical Engineering / Control Systems / AI",
      badge: "FEATURED MAJOR PROJECT",
      status: "SIMULATION IN PROGRESS",
      scope: "Control Systems Simulation & Modeling",
      problem: "Permanent Magnet Synchronous Motors (PMSM) subjected to abrupt load torque disturbances exhibit severe overshoot, sluggish dynamic settling times, and steady-state errors when governed solely by conventional fixed-gain PID controllers.",
      solution: "Engineered and simulated a hybrid Artificial Neural Network (ANN) adaptive PID control architecture in MATLAB/Simulink. The ANN dynamically estimates non-linear system perturbations and adjusts proportional and integral gains in real time.",
      technologies: ["MATLAB", "Simulink", "PMSM", "PID Controller", "Artificial Neural Networks", "PWM Generation", "Three-Phase Inverter", "Power Electronics"],
      hardware: "Three-Phase Voltage Source Inverter (VSI) Model, Permanent Magnet Synchronous Motor (Surface Mounted), Optical Rotor Speed/Position Encoder Feedback Model",
      software: "MATLAB R2024, Simulink Simscape Electrical, Deep Learning Toolbox, Optimization Toolbox",
      architectureFlow: "Reference Speed (ω_ref) → Error Junction → Hybrid ANN-PID Controller → Space-Vector/Sinusoidal PWM Generator → 3-Phase Inverter Bridge → PMSM Dynamic Model → Speed/Position Feedback Loop",
      objectives: [
        "Develop high-fidelity mathematical d-q axis differential state-space models of the PMSM drive.",
        "Synthesize a feed-forward backpropagation neural network to predict optimal PID gains under load variations.",
        "Implement sinusoidal pulse width modulation (SPWM) for switching control of the 3-phase inverter bridge.",
        "Conduct comparative transient response benchmarks against standard Zeigler-Nichols tuned PID controllers."
      ],
      methodology: "Formulated the mathematical voltage equations in the rotor synchronous d-q reference frame. Trained a multi-layer neural network with simulated disturbance data to map instantaneous speed error (e) and error derivative (de/dt) to dynamic Kp, Ki, Kd parameter offsets.",
      implementation: "Created modular sub-systems in Simulink: 1) Field-Oriented Reference Frame Converter, 2) Hybrid ANN Gain Adjustment block, 3) Anti-windup PID controller, 4) SPWM Carrier Generator, 5) 6-switch IGBT Inverter, 6) Mechanical load perturbation injection block.",
      challenges: [
        "Mitigating integral windup during rapid motor acceleration phases.",
        "Ensuring neural network inference convergence within high-frequency switching simulation steps.",
        "Eliminating high-frequency chattering in torque ripple near synchronous velocity."
      ],
      solutions: [
        "Implemented anti-windup clamping on the integral path with dynamic saturation limits.",
        "Optimized ANN weight matrix and activated hyperbolic tangent sigmoid transfer functions for smooth gradient flow.",
        "Tuned low-pass filter constants on speed feedback channels to reject inverter switching harmonics."
      ],
      results: "Simulation In Progress & Comparative Analysis: Initial comparative tests indicate faster transient settling time and substantial reduction in overshoot during sudden mechanical load perturbations compared to conventional fixed PID regulation.",
      learnings: "Deepened practical understanding of d-q axis transformations (Park/Clarke), inverter commutation constraints, and the intersection of machine learning heuristics with classical control theory.",
      futureRoadmap: "Deploy the trained ANN controller weights onto an embedded DSP (TI C2000 or STM32F4) for hardware-in-the-loop (HIL) dynamometer motor drive validation.",
      keyResult: "Simulated adaptive neural control architecture achieving reduced settling time under sudden torque disturbances.",
      githubUrl: "https://github.com/sarthak1778",
      liveUrl: null,
      featured: true,
      caseStudyAvailable: true
    },
    {
      id: "smart-plant-monitoring",
      title: "Smart Plant Monitoring & Automated Irrigation",
      subtitle: "Autonomous Closed-Loop Soil Hydration with Cloud Telemetry",
      category: "IoT & Embedded Systems",
      badge: "PHYSICAL PROTOTYPE",
      status: "COMPLETED PROTOTYPE",
      scope: "IoT Sensing, Automation & Telemetry",
      problem: "Traditional micro-farming and indoor plant setups suffer from irregular manual watering schedules, leading to over-saturation root rot or moisture depletion during ambient heat spikes.",
      solution: "Engineered an autonomous IoT irrigation controller combining Arduino Uno, ESP8266 Wi-Fi transceiver, capacitive soil moisture probes, DHT11 temp/humidity sensors, and a relay-driven submersible water pump with live cloud dashboarding.",
      technologies: ["Arduino Uno", "ESP8266", "DHT11", "Capacitive Soil Sensor", "LDR Sensor", "5V Relay Module", "DC Submersible Pump", "ThingSpeak Cloud API", "Embedded C++"],
      hardware: "Arduino Uno R3 (ATMega328P), ESP8266-01 Wi-Fi Module, Capacitive Soil Moisture Sensor v1.2, DHT11 Ambient Sensor, 5V Optocoupler Relay, 12V Mini Submersible Pump, 16x2 LCD",
      software: "Arduino IDE, Embedded C++, ThingSpeak IoT Analytics REST API, AT Command Interface",
      architectureFlow: "Sensors (Soil Moisture + DHT11 + LDR) → Arduino ADC & GPIO → Local Decision Thresholds → Relay Pump Actuation + ESP8266 Serial Bridge → ThingSpeak Cloud REST API → Web Monitoring Dashboard",
      objectives: [
        "Automate precision water dispensing triggered exclusively when volumetric soil moisture drops below calibrated thresholds.",
        "Eliminate physical sensor corrosion through capacitive analog sensing rather than resistive conduction.",
        "Establish an un-tethered Wi-Fi telemetry bridge broadcasting environmental readings to cloud analytics every 60 seconds."
      ],
      methodology: "Calibrated analog sensor voltages against dry soil and saturated soil baselines. Designed hysteresis control logic in firmware to prevent pump oscillation around threshold boundaries.",
      implementation: "Wired an optocoupled relay channel with flyback diode protection to isolate electrical inductive spikes from the DC pump motor. Implemented serial communication between Arduino and ESP8266 with auto-reconnect fallback.",
      challenges: [
        "Inductive kickback noise from the water pump resetting the microcontroller.",
        "Wi-Fi transmission latency and packet loss on intermittent networks.",
        "Analog sensor reading fluctuations caused by power rail voltage sag."
      ],
      solutions: [
        "Isolated microcontroller and actuator power domains using an external 12V supply and optocoupled relay circuitry with a flyback diode.",
        "Added local rolling average filtering (10-sample window) to stabilize analog moisture readings.",
        "Implemented non-blocking HTTP transmission loops with local EEPROM caching if Wi-Fi disconnected."
      ],
      results: "Operational physical prototype operating autonomously with continuous telemetry streamed to ThingSpeak. Automated closed-loop watering successfully prevented soil drying with zero manual intervention.",
      learnings: "Hands-on experience in power distribution isolation, analog sensor calibration, asynchronous IoT communication, and firmware state-machine design.",
      futureRoadmap: "Transition from ESP8266 AT bridge to a unified ESP32 SoC with low-power deep sleep cycles and solar battery charging.",
      keyResult: "Automated closed-loop watering with live soil moisture telemetry streamed continuously to cloud dashboards.",
      githubUrl: "https://github.com/sarthak1778",
      liveUrl: null,
      featured: true,
      caseStudyAvailable: true
    },
    {
      id: "ultrasonic-radar",
      title: "Ultrasonic Radar Object Detection System",
      subtitle: "Panoramic 180° Spatial Mapping with Servo Sweep & Real-Time Alerting",
      category: "Embedded Systems & Sensor Integration",
      badge: "EMBEDDED HARDWARE",
      status: "COMPLETED PROTOTYPE",
      scope: "Spatial Sensing & Hardware Actuation",
      problem: "Low-cost obstacle detection in robotic navigation often relies on static line-of-sight sensors that leave critical blind spots and cannot map spatial coordinates across angular fields.",
      solution: "Developed an active ultrasonic radar scanning station that sweeps an HC-SR04 sensor across 180° using an SG90 micro-servo, calculating object distance and polar coordinates with live readout on a 16x2 I2C LCD and TSOP382 IR remote control.",
      technologies: ["Arduino Uno", "HC-SR04 Ultrasonic", "SG90 Micro Servo", "TSOP382 IR Receiver", "16x2 I2C LCD", "Embedded C++", "Timer Interrupts"],
      hardware: "Arduino Uno, HC-SR04 Ultrasonic Transceiver, SG90 180° Servo Motor, TSOP382 IR Receiver Module, 16x2 Liquid Crystal Display with PCF8574 I2C Backpack, Piezo Buzzer",
      software: "Arduino IDE, Embedded C++, Servo.h, LiquidCrystal_I2C.h, IRremote.h",
      architectureFlow: "SG90 Servo (Step Scan 0°-180°) → HC-SR04 (Trigger Pulse / Echo Time Measurement) → Arduino Distance Computation ($d = t \\times v / 2$) → Threat Distance Evaluation → I2C LCD Display & Buzzer Alert + IR Remote Mode Control",
      objectives: [
        "Synthesize a panoramic 180-degree sweep detecting obstacles within a 2cm – 200cm operational radius.",
        "Implement precision time-of-flight distance calculation compensating for ambient sound velocity.",
        "Provide real-time angular coordinate and range visual telemetry on an LCD screen with remote interactive configuration."
      ],
      methodology: "Calculated distance from high-resolution microsecond echo pulse intervals. Programmed stepwise servo incremental rotation (1° per step) synchronized with ultrasonic ping intervals to minimize mechanical vibration noise.",
      implementation: "Constructed rigid acrylic sensor bracket mounting the ultrasonic sensor atop the servo horn. Programmed multi-mode operation: Continuous Auto-Sweep, Sector Lock, and Manual IR remote aiming.",
      challenges: [
        "Mechanical sweep inertia causing sensor false echoes off adjacent reflective boundaries.",
        "Blocking pulseIn() calls restricting LCD update responsiveness and IR decoding.",
        "Servo power surges introducing ripple into the 5V ADC reference rail."
      ],
      solutions: [
        "Separated servo supply rail using dedicated decoupling capacitors (100uF + 100nF).",
        "Configured timeout bounds on ultrasonic echo monitoring to prevent firmware hanging when ping was lost.",
        "Implemented dead-zone filtering rejecting echoes beyond 180cm to optimize scan sweep frequency."
      ],
      results: "Functional radar scanning unit detecting obstacles across 180 degrees with ±1cm accuracy within 1 meter range, updating real-time coordinate coordinates on the LCD.",
      learnings: "Mastered hardware PWM timing, time-of-flight sensor physics, I2C protocol optimization, and multi-sensor synchronization on limited 8-bit microcontrollers.",
      futureRoadmap: "Interface serial stream to a desktop Processing.js or Python visualization dashboard rendering radar blips on an authentic PPI polar scope.",
      keyResult: "Active 180° spatial radar station mapping obstacles with millimeter resolution and real-time I2C telemetry.",
      githubUrl: "https://github.com/sarthak1778",
      liveUrl: null,
      featured: true,
      caseStudyAvailable: true
    },
    {
      id: "temp-controlled-fan",
      title: "Temperature Controlled Smart Fan",
      subtitle: "Closed-Loop Thermal Regulation with OLED Status Readout",
      category: "Embedded Automation & Thermal Control",
      badge: "EMBEDDED BUILD",
      status: "COMPLETED BUILD",
      scope: "Thermal Sensing & Automated Relay Switching",
      problem: "Electronic enclosures, power supplies, and living spaces waste significant electrical energy when cooling fans run continuously at full capacity regardless of internal thermal conditions.",
      solution: "Constructed an automated thermal management unit utilizing a temperature sensor, Arduino controller, optocoupled relay channel, and SSD1306 OLED display that dynamically activates fan stages based on programmed temperature trip points.",
      technologies: ["Arduino", "Temperature Sensor", "Optocoupled Relay", "SSD1306 OLED (I2C)", "DC Brushless Fan", "Embedded C++"],
      hardware: "Arduino Nano / Uno, LM35 / DHT11 Temperature Sensor, 5V Single Channel Relay Module, 128x64 0.96-inch I2C OLED Display, 12V DC Brushless Fan, LM7805 Voltage Regulator",
      software: "Arduino IDE, Embedded C++, Adafruit SSD1306 / GFX Libraries",
      architectureFlow: "Thermal Sensor → Analog/Digital Readout → Temperature Conversion → Threshold Comparison → Relay Actuation / Fan Trigger → Real-Time OLED Graphical Telemetry",
      objectives: [
        "Maintain component temperature strictly below critical thermal thresholds automatically.",
        "Provide an informative graphical interface displaying live ambient temperature and fan state.",
        "Minimize energy consumption and mechanical wear by cycling cooling actuation only when necessary."
      ],
      methodology: "Implemented hysteresis threshold bands (e.g., ON at ≥ 32°C, OFF at ≤ 28°C) in firmware to eliminate relay contact chatter and extend switching lifespan.",
      implementation: "Integrated an OLED display showing an animated temperature gauge, instantaneous °C readout, and ON/OFF status. Packaged the circuit on prototype board with isolated thermal sensing leads.",
      challenges: [
        "Relay cycling repeatedly around the exact trip threshold due to ambient temperature noise.",
        "OLED I2C display rendering overhead slowing down thermal sampling rate."
      ],
      solutions: [
        "Programmed a 4°C hysteresis band and software debouncing interval.",
        "Refactored OLED redraw routines to update only changed character glyphs rather than clearing the full display buffer every cycle."
      ],
      results: "Autonomous thermal management unit providing reliable closed-loop cooling actuation, verified through thermal heat gun testing with zero relay hunting.",
      learnings: "Understanding thermal equilibrium dynamics, relay protection circuits, hysteresis design, and lightweight I2C graphics rendering on microcontrollers.",
      futureRoadmap: "Upgrade from binary on/off relay switching to variable-speed 4-wire PWM fan control for acoustic noise reduction.",
      keyResult: "Automated hysteresis thermal cooling system with real-time OLED graphical monitoring.",
      githubUrl: "https://github.com/sarthak1778",
      liveUrl: null,
      featured: false,
      caseStudyAvailable: true
    },
    {
      id: "voice-emotion-recognition",
      title: "Voice Emotion Recognition via MFCC & ML",
      subtitle: "Acoustic Feature Extraction & Speech Emotion Classification",
      category: "Audio Processing & Machine Learning",
      badge: "AI / ML SOFTWARE",
      status: "COMPLETED PROJECT",
      scope: "Digital Signal Processing & Machine Learning",
      problem: "Human speech contains rich emotional nuances that traditional text-based NLP systems fail to detect, limiting human-computer interaction and customer sentiment analytics.",
      solution: "Developed a voice emotion classification pipeline in Python that extracts Mel-Frequency Cepstral Coefficients (MFCC), Chroma, and Spectral Contrast from human audio samples to classify emotions using trained machine learning models.",
      technologies: ["Python", "Librosa", "Scikit-Learn", "MFCC Feature Extraction", "NumPy", "Pandas", "Audio Signal Processing"],
      hardware: "High-Fidelity Audio Capture Interface, GPU Acceleration for feature batch processing",
      software: "Python 3.10, Librosa Audio Library, Scikit-Learn, Matplotlib, SoundFile",
      architectureFlow: "Raw Audio Input (.wav) → Audio Normalization & Silence Trimming → Fast Fourier Transform (FFT) & Mel Filter Bank → MFCC Feature Matrix Extraction → Trained Classifier (ML Model) → Predicted Emotion Class",
      objectives: [
        "Process raw speech waveforms to extract informative acoustic frequency-domain features.",
        "Train classification models to categorize speech into discrete emotion states (Calm, Happy, Angry, Sad).",
        "Construct a modular Python inference pipeline processing new microphone recordings in seconds."
      ],
      methodology: "Leveraged Mel-scale filter banks modeled after human auditory perception. Generated 40 MFCC coefficients per frame along with temporal mean and variance statistics.",
      implementation: "Trained and evaluated Support Vector Machine (SVM) and Multi-Layer Perceptron (MLP) classifiers on benchmark datasets (RAVDESS/TESS). Implemented confusion matrix validation and classification reporting.",
      challenges: [
        "Background acoustic noise distorting frequency envelope representations.",
        "Speaker gender and pitch variations creating high intra-class variance.",
        "Feature dimensional explosion causing model overfitting on small audio batches."
      ],
      solutions: [
        "Applied spectral pre-emphasis and voice activity detection (VAD) to trim silent non-speech portions.",
        "Standardized and scaled acoustic feature matrices using Z-score normalization.",
        "Selected optimal top 40 MFCC coefficients and applied L2 regularization."
      ],
      results: "Trained classification model capable of distinguishing positive, neutral, and distressed speech emotions with reproducible validation metrics.",
      learnings: "Hands-on experience in discrete Fourier transforms, Mel-scale auditory modeling, feature engineering for 1D signals, and machine learning model validation.",
      futureRoadmap: "Port the feature extraction and model inference to an edge device (Raspberry Pi) for real-time robotic interaction.",
      keyResult: "End-to-end speech signal processing pipeline converting raw audio waveforms into classified emotion states.",
      githubUrl: "https://github.com/sarthak1778",
      liveUrl: null,
      featured: false,
      caseStudyAvailable: true
    },
    {
      id: "prakash-jewellers",
      title: "Prakash Jewellers Commercial Platform",
      subtitle: "High-Performance Mobile-First Commercial Web Application",
      category: "Commercial Web Application",
      badge: "LIVE PRODUCTION",
      status: "PRODUCTION",
      scope: "Full-Stack Frontend & Deployment",
      problem: "A traditional family jewellery enterprise required a clean, modern digital presence to showcase precious gold and diamond collections, drive local discovery, and provide a direct consumer inquiry channel.",
      solution: "Designed and deployed a responsive, mobile-first commercial web platform with fast image delivery, intuitive collection browsing, and direct WhatsApp/telephone inquiry conversion routing.",
      technologies: ["JavaScript", "HTML5", "CSS3", "Vercel Edge Network", "AI-assisted development", "Responsive UI"],
      hardware: "Global Vercel Edge Serverless Infrastructure",
      software: "Vanilla JavaScript (Zero-overhead), Modern CSS Custom Properties, Git",
      architectureFlow: "Edge Delivery Network (Vercel CDN) → Mobile-First Responsive Layout → Dynamic Collection Filter → Direct WhatsApp Routing & Call Conversion",
      objectives: [
        "Achieve sub-second first contentful paint (FCP) on mobile cellular connections.",
        "Provide zero-maintenance commercial digital showcase with zero operational hosting fees.",
        "Enable frictionless one-tap customer consultation via WhatsApp click-to-chat integration."
      ],
      methodology: "Engineered with vanilla web technologies to eliminate bulky client framework runtimes, optimizing assets for mobile viewport rendering.",
      implementation: "Configured automated CI/CD deployment on Vercel with HTTPS SSL certificates and SEO-optimized OpenGraph tags.",
      challenges: [
        "Balancing high-resolution jewellery photography with fast mobile cellular loading times.",
        "Ensuring smooth touch-friendly gallery browsing across diverse smartphone screens."
      ],
      solutions: [
        "Compressed and formatted imagery with lazy loading attributes.",
        "Built responsive CSS touch card layouts with elastic scroll snapping."
      ],
      results: "Successfully launched to live production on Vercel with near-instant load times, active customer conversion, and zero maintenance overhead.",
      learnings: "Production deployment experience, client requirements elicitation, performance budgeting, and commercial web delivery.",
      futureRoadmap: "Integrate live bullion market rate API ticker for automatic daily precious metal price updates.",
      keyResult: "Live production commercial platform delivering high-converting mobile experiences with sub-second response times.",
      liveUrl: "https://prakashjewellers.vercel.app/",
      githubUrl: "https://github.com/sarthak1778",
      featured: true,
      caseStudyAvailable: true
    }
  ],

  engineeringApproach: [
    {
      step: "01",
      title: "Problem Definition",
      subtitle: "Requirements & Constraints",
      desc: "Deconstruct physical, electrical, and computational challenges. Formulate precise functional objectives, performance metrics, and component constraints."
    },
    {
      step: "02",
      title: "System Design",
      subtitle: "Architecture & Interfacing",
      desc: "Draft block diagrams, specify voltage rails, select microcontrollers, sensor transducers, power switches, and determine communication protocols (I2C, SPI, UART, Wi-Fi)."
    },
    {
      step: "03",
      title: "Simulation",
      subtitle: "Mathematical & Dynamic Modeling",
      desc: "Model system dynamics in MATLAB/Simulink or circuit simulators before procuring physical silicon. Verify control loops, filter cutoffs, and stability margins."
    },
    {
      step: "04",
      title: "Hardware / Software Prototype",
      subtitle: "Physical Prototyping & Firmware",
      desc: "Construct breadboard or PCB circuit prototypes. Write clean, modular embedded C/C++ or Python code with non-blocking architectures and state machines."
    },
    {
      step: "05",
      title: "Testing & Validation",
      subtitle: "Measurement & Oscilloscope Telemetry",
      desc: "Ground-truth system behavior with multimeters, logic analyzers, and sensor logs. Subject prototypes to edge cases, temperature shifts, and perturbation pulses."
    },
    {
      step: "06",
      title: "Optimization",
      subtitle: "Noise Rejection & Efficiency",
      desc: "Refactor algorithms, minimize ADC ripple via digital filtering, add hardware flyback/decoupling protection, and optimize microcontroller memory footprints."
    },
    {
      step: "07",
      title: "Deployment & Documentation",
      subtitle: "Enclosure & Open Source",
      desc: "Package prototypes into robust enclosures or deploy cloud-connected software to production servers. Publish complete documentation, schematics, and code repositories."
    }
  ],

  currentlyBuilding: {
    project: "Hybrid ANN-PID PMSM Speed Controller",
    category: "Electrical Engineering / Control Systems / AI",
    status: "IN DEVELOPMENT",
    statusDetail: "Active Simulation & Algorithmic Integration",
    lastUpdated: "September 2026",
    summary: "Simulating adaptive artificial neural network controllers to dynamically adjust PID gains under sudden mechanical load perturbations in permanent magnet synchronous motor drives.",
    currentWorkPackages: [
      { name: "ANN Controller Weight Training", status: "Active", progress: "80%" },
      { name: "SPWM Inverter Switching Gate Integration", status: "In Progress", progress: "65%" },
      { name: "PMSM Non-Linear Dynamic Modeling", status: "Validated", progress: "95%" },
      { name: "Comparative Fixed-PID Benchmark Analysis", status: "Benchmarking", progress: "70%" },
      { name: "Dynamic Torque Disturbance Injection Testing", status: "In Progress", progress: "60%" }
    ],
    note: "All metrics and simulation curves are verified through MATLAB/Simulink runs. Results are transparently documented as active engineering research."
  },

  experience: [
    {
      id: "exp-gemini",
      role: "Google Gemini Campus Ambassador",
      organization: "Google",
      period: "2024 – 2025",
      location: "Bengaluru, India",
      type: "Technical Leadership & AI Advocacy",
      badge: "LEADERSHIP",
      description: "Selected campus technical representative leading developer enablement initiatives for Google Gemini and generative AI tools.",
      highlights: [
        "Organized hands-on student workshops demonstrating modern AI workflows, prompt engineering, and developer tooling.",
        "Created digital instructional content encouraging peer adoption of AI-accelerated programming practices.",
        "Mentored student engineers on integrating LLM APIs and embeddings into technical projects."
      ],
      url: "https://www.linkedin.com/in/sarthak-choudhary-455098293/details/experience/"
    },
    {
      id: "exp-susamskriti",
      role: "Sponsorship Lead Coordinator",
      organization: "Susamskriti Cultural Club",
      period: "2024 – 2025",
      location: "Sir MVIT, Bengaluru",
      type: "Student Organization Leadership",
      badge: "OPERATIONS",
      description: "Headed corporate sponsorship outreach, brand partnerships, and commercial agreements for premier college festivals and cultural conventions.",
      highlights: [
        "Negotiated sponsorship partnerships with external brands to fund college festival operations.",
        "Coordinated event execution and student logistics across events engaging over 1,200 participants.",
        "Managed cross-functional student teams overseeing hospitality, publicity, and stage coordination."
      ],
      url: "https://www.linkedin.com/in/sarthak-choudhary-455098293/details/experience/"
    },
    {
      id: "exp-electrimo",
      role: "Technical Team Member",
      organization: "Team Electrimo",
      period: "2024 – Present",
      location: "Sir MVIT, Bengaluru",
      type: "Electric Mobility Engineering",
      badge: "ENGINEERING",
      description: "Contributed to electrical and powertrain activities within the college electric kart racing and EV development team.",
      highlights: [
        "Involved in electrical sub-system assessments, battery monitoring considerations, and motor drive discussions.",
        "Collaborated with interdisciplinary engineering students on vehicle safety interlocks and wiring harness layout.",
        "Gained direct exposure to electric powertrain components, high-current switching, and EV regulations."
      ],
      url: "https://www.linkedin.com/in/sarthak-choudhary-455098293/details/experience/"
    },
    {
      id: "exp-aero-india",
      role: "Operations Volunteer",
      organization: "Aero India 2025",
      period: "2025",
      location: "Yelahanka Air Force Station, Bengaluru",
      type: "International Aerospace Operations",
      badge: "SCALE OPERATIONS",
      description: "Selected volunteer coordinating ground operations and delegate logistics at Asia's premier aerospace exposition.",
      highlights: [
        "Assisted in crowd management, delegate routing, and logistics for over 1,200 attendees and international visitors.",
        "Maintained calm, reliable protocol adherence in a high-security, mission-critical international aviation environment.",
        "Recognized by event coordinators for dependability and swift problem resolution under pressure."
      ],
      url: "https://www.linkedin.com/in/sarthak-choudhary-455098293/details/volunteering/"
    },
    {
      id: "exp-o3-events",
      role: "Event Volunteer & Coordinator",
      organization: "O3 Events Management Company",
      period: "2024",
      location: "Bengaluru, India",
      type: "Event Management & Production",
      badge: "COORDINATION",
      description: "Supported the ground coordination and logistical execution of large-scale corporate and educational events.",
      highlights: [
        "Managed audio-visual setup checklists, vendor coordination, and stage timeline schedules.",
        "Resolved on-site operational bottlenecks swiftly to maintain seamless delegate flow."
      ],
      url: "https://www.linkedin.com/in/sarthak-choudhary-455098293/details/experience/"
    }
  ],

  achievements: [
    {
      metric: "8.39",
      label: "Academic CGPA",
      detail: "Sir M Visvesvaraya Institute of Technology (EEE)",
      icon: "academic"
    },
    {
      metric: "1,200+",
      label: "Event Participants",
      detail: "Coordinated at Aero India 2025 & College Conventions",
      icon: "users"
    },
    {
      metric: "Google Gemini",
      label: "Campus Ambassador",
      detail: "Selected Technical Advocate & Student Workshop Leader",
      icon: "sparkles"
    },
    {
      metric: "Team Electrimo",
      label: "Technical Team",
      detail: "College Electric Mobility & EV Powertrain Team",
      icon: "zap"
    }
  ],

  education: [
    {
      level: "Bachelor of Engineering (B.E.) — Electrical & Electronics Engineering",
      institution: "Sir M Visvesvaraya Institute of Technology, Bengaluru",
      score: "8.39 CGPA",
      year: "2023 – Pursuing",
      details: "Comprehensive coursework in Control Systems, Power Electronics, Microcontrollers & Embedded Systems, Signals & Systems, Electrical Machinery, Power Transmission, and Circuit Analysis. Active hands-on hardware laboratory experimentation."
    },
    {
      level: "Class 12th (Senior Secondary — CBSE)",
      institution: "Delhi Public School, Bokaro",
      score: "85%",
      year: "2021 – 2023",
      details: "Physics, Chemistry, Mathematics, and Computer Science."
    },
    {
      level: "Class 10th (Secondary — CBSE)",
      institution: "DAV Public School, Tenughat",
      score: "89.6%",
      year: "2021",
      details: "Foundational science and mathematics distinction."
    }
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
      source: "Coursera / LinkedIn",
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
      source: "Google / LinkedIn",
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
      source: "MathWorks / LinkedIn",
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
      source: "Sir MVIT / LinkedIn",
      verified: true,
      description: "Hands-on laboratory credential in embedded C/C++, Wi-Fi telemetry protocols, sensor signal conditioning, and cloud dashboard integration."
    }
  ],

  contact: {
    heading: "Let's Build Something",
    subheading: "Open to engineering opportunities, internships, technical collaborations, and interesting projects.",
    email: "sarthakchoudhary1778@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/sarthak-choudhary-455098293/",
    githubUrl: "https://github.com/sarthak1778",
    openTo: [
      "Engineering Internships",
      "Embedded Systems",
      "IoT Architectures",
      "Control Systems",
      "Electrical Engineering",
      "AI / Machine Learning",
      "Technical Collaborations"
    ]
  },

  // Mapping skill keywords to project IDs for dynamic cross-filtering
  skillProjectMap: {
    "C++": ["smart-plant-monitoring", "ultrasonic-radar"],
    "Python": ["voice-emotion-recognition"],
    "JavaScript": ["prakash-jewellers"],
    "HTML5": ["prakash-jewellers"],
    "CSS3": ["prakash-jewellers"],
    "Arduino Uno": ["smart-plant-monitoring", "ultrasonic-radar", "temp-controlled-fan"],
    "ESP8266": ["smart-plant-monitoring"],
    "ESP32": ["smart-plant-monitoring", "temp-controlled-fan"],
    "Sensors": ["smart-plant-monitoring", "ultrasonic-radar", "temp-controlled-fan"],
    "Relay Modules": ["smart-plant-monitoring", "temp-controlled-fan"],
    "MATLAB": ["hybrid-ann-pid-pmsm"],
    "Simulink": ["hybrid-ann-pid-pmsm"],
    "Control Systems": ["hybrid-ann-pid-pmsm"],
    "PMSM Drives": ["hybrid-ann-pid-pmsm"],
    "ANN": ["hybrid-ann-pid-pmsm"],
    "PID Tuning": ["hybrid-ann-pid-pmsm"],
    "PWM Generation": ["hybrid-ann-pid-pmsm"],
    "Machine Learning": ["voice-emotion-recognition"],
    "Audio Processing": ["voice-emotion-recognition"],
    "Vercel": ["prakash-jewellers"],
    "ThingSpeak": ["smart-plant-monitoring"],
    "OLED/LCD": ["ultrasonic-radar", "temp-controlled-fan"]
  }
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = PROFILE_DATA;
}
if (typeof window !== "undefined") {
  window.PROFILE_DATA = PROFILE_DATA;
}
