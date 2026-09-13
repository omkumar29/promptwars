/**
 * Lumina AI Sensei — Complete App Logic
 * Features: 5-Tab SPA, Ask AI (Gemini), Voice Input, Practice Quiz,
 *           Question History, Study Timer, Streaks, Achievements, Sakura Canvas
 */
(function () {
  'use strict';

  // =========================================================================
  // BUILT-IN QUIZ QUESTION BANK
  // =========================================================================
  const QUIZ_BANK = {
    General: [
      { q:'What is the largest planet in our solar system?', opts:['Jupiter','Saturn','Neptune','Mars'], c:0, exp:'Jupiter is the largest planet, with a mass more than twice that of all other planets combined.', diff:'easy' },
      { q:'How many continents are on Earth?', opts:['5','6','7','8'], c:2, exp:'Earth has 7 continents: Africa, Antarctica, Asia, Australia, Europe, North America, and South America.', diff:'easy' },
      { q:'What is the chemical symbol for gold?', opts:['Gd','Go','Au','Ag'], c:2, exp:'Gold\'s symbol Au comes from the Latin word "Aurum".', diff:'easy' },
      { q:'Which is the longest river in the world?', opts:['Amazon','Nile','Yangtze','Mississippi'], c:1, exp:'The Nile River in Africa is approximately 6,650 km long.', diff:'easy' },
      { q:'What is the speed of light (approx)?', opts:['300,000 km/s','150,000 km/s','500,000 km/s','30,000 km/s'], c:0, exp:'Light travels at approximately 299,792 km/s in a vacuum.', diff:'medium' },
      { q:'True or False: Sound travels faster than light.', opts:['True','False'], c:1, exp:'Light travels at ~300,000 km/s while sound travels at only ~343 m/s in air.', diff:'easy', type:'tf' },
      { q:'What is the atomic number of Hydrogen?', opts:['1','2','0','8'], c:0, exp:'Hydrogen is the first element with atomic number 1 — it has one proton.', diff:'easy' },
      { q:'Which gas makes up the majority of Earth\'s atmosphere?', opts:['Oxygen','Carbon Dioxide','Nitrogen','Argon'], c:2, exp:'Nitrogen makes up about 78% of Earth\'s atmosphere, followed by oxygen at 21%.', diff:'easy' },
    ],
    Math: [
      { q:'What is 15 × 15?', opts:['225','215','200','235'], c:0, exp:'15 × 15 = 225. You can also calculate it as (10+5)² = 100+100+25 = 225.', diff:'easy' },
      { q:'What is the value of π (pi) to 2 decimal places?', opts:['3.12','3.14','3.16','3.18'], c:1, exp:'Pi (π) ≈ 3.14159... It is the ratio of a circle\'s circumference to its diameter.', diff:'easy' },
      { q:'What is the square root of 144?', opts:['11','12','13','14'], c:1, exp:'√144 = 12, because 12 × 12 = 144.', diff:'easy' },
      { q:'What is 25% of 200?', opts:['40','45','50','55'], c:2, exp:'25% of 200 = 200 × 0.25 = 50.', diff:'easy' },
      { q:'Solve: 3x + 6 = 21. What is x?', opts:['3','4','5','6'], c:2, exp:'3x = 21 - 6 = 15, so x = 15 ÷ 3 = 5.', diff:'medium' },
      { q:'What is the area of a circle with radius 7? (Use π ≈ 22/7)', opts:['154','144','164','174'], c:0, exp:'Area = πr² = (22/7) × 7² = 22 × 7 = 154 square units.', diff:'medium' },
      { q:'True or False: A prime number can be divided by 1 and itself only.', opts:['True','False'], c:0, exp:'By definition, a prime number has exactly two factors: 1 and itself.', diff:'easy', type:'tf' },
      { q:'What is the Pythagorean theorem?', opts:['a² + b² = c²','a + b = c','a² - b² = c²','2a + 2b = c'], c:0, exp:'a² + b² = c² where c is the hypotenuse of a right triangle.', diff:'easy' },
      { q:'What is log₁₀(1000)?', opts:['2','3','4','10'], c:1, exp:'log₁₀(1000) = 3 because 10³ = 1000.', diff:'medium' },
      { q:'How many degrees are in a triangle?', opts:['90','180','270','360'], c:1, exp:'The angles of any triangle always add up to exactly 180 degrees.', diff:'easy' },
    ],
    Science: [
      { q:'What is the powerhouse of the cell?', opts:['Nucleus','Ribosome','Mitochondria','Golgi apparatus'], c:2, exp:'Mitochondria produce ATP (energy) through cellular respiration — they are the cell\'s powerhouse.', diff:'easy' },
      { q:'Newton\'s second law: Force equals...', opts:['mass × velocity','mass × acceleration','weight × time','mass ÷ acceleration'], c:1, exp:'F = ma — Force equals mass multiplied by acceleration (Newton\'s 2nd law).', diff:'easy' },
      { q:'What is the boiling point of water at standard pressure?', opts:['90°C','95°C','100°C','110°C'], c:2, exp:'Water boils at 100°C (212°F) at standard atmospheric pressure (1 atm).', diff:'easy' },
      { q:'True or False: Electrons have a positive charge.', opts:['True','False'], c:1, exp:'Electrons carry a negative charge. Protons carry a positive charge. Neutrons are neutral.', diff:'easy', type:'tf' },
      { q:'Which planet is closest to the Sun?', opts:['Venus','Earth','Mars','Mercury'], c:3, exp:'Mercury is the closest planet to the Sun, orbiting at about 58 million km away.', diff:'easy' },
      { q:'What type of energy does a moving object have?', opts:['Potential energy','Kinetic energy','Thermal energy','Chemical energy'], c:1, exp:'Kinetic energy is the energy of motion: KE = ½mv².', diff:'easy' },
    ],
    Biology: [
      { q:'What process do plants use to make food?', opts:['Respiration','Transpiration','Photosynthesis','Digestion'], c:2, exp:'Photosynthesis: 6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂. Plants convert sunlight, water, and CO₂ into glucose.', diff:'easy' },
      { q:'What is the basic unit of life?', opts:['Atom','Molecule','Organ','Cell'], c:3, exp:'The cell is the smallest structural and functional unit of all living organisms.', diff:'easy' },
      { q:'Where does photosynthesis occur in a plant cell?', opts:['Mitochondria','Nucleus','Chloroplast','Vacuole'], c:2, exp:'Chloroplasts contain chlorophyll and are the site of photosynthesis in plant cells.', diff:'easy' },
      { q:'What does DNA stand for?', opts:['Deoxyribonucleic Acid','Diribonucleic Acid','Deoxyribonitric Acid','Dynamic Nucleic Acid'], c:0, exp:'DNA = Deoxyribonucleic Acid — the molecule that carries genetic instructions.', diff:'easy' },
      { q:'True or False: Humans have 46 chromosomes.', opts:['True','False'], c:0, exp:'Humans have 46 chromosomes arranged in 23 pairs in most body cells.', diff:'medium', type:'tf' },
      { q:'Which organ pumps blood through the body?', opts:['Liver','Lungs','Heart','Kidney'], c:2, exp:'The heart is a muscular organ that pumps blood throughout the circulatory system.', diff:'easy' },
      { q:'What is the function of red blood cells?', opts:['Fight infection','Carry oxygen','Clot blood','Produce hormones'], c:1, exp:'Red blood cells (erythrocytes) contain hemoglobin and carry oxygen from lungs to body tissues.', diff:'easy' },
      { q:'What gas do plants release during photosynthesis?', opts:['Carbon Dioxide','Nitrogen','Oxygen','Hydrogen'], c:2, exp:'Plants release oxygen as a byproduct of photosynthesis, which is essential for most life on Earth.', diff:'easy' },
    ],
    Physics: [
      { q:'What is the SI unit of force?', opts:['Watt','Joule','Newton','Pascal'], c:2, exp:'The Newton (N) is the SI unit of force. 1 N = 1 kg⋅m/s².', diff:'easy' },
      { q:'True or False: Light is a form of electromagnetic radiation.', opts:['True','False'], c:0, exp:'Visible light is part of the electromagnetic spectrum, which also includes radio waves, X-rays, and gamma rays.', diff:'easy', type:'tf' },
      { q:'What is Ohm\'s Law?', opts:['V = IR','P = IV','F = ma','E = mc²'], c:0, exp:'Ohm\'s Law: Voltage (V) = Current (I) × Resistance (R).', diff:'medium' },
      { q:'Which law states that energy cannot be created or destroyed?', opts:['Newton\'s 1st Law','Ohm\'s Law','Law of Conservation of Energy','Boyle\'s Law'], c:2, exp:'The Law of Conservation of Energy states energy can only be transformed from one form to another.', diff:'easy' },
      { q:'What is the acceleration due to gravity on Earth (approx)?', opts:['5 m/s²','9.8 m/s²','12 m/s²','15 m/s²'], c:1, exp:'The acceleration due to gravity on Earth\'s surface is approximately 9.8 m/s² (often rounded to 10 m/s²).', diff:'easy' },
      { q:'What does E=mc² represent?', opts:['Force equation','Energy-mass equivalence','Wave equation','Ohm\'s Law'], c:1, exp:'Einstein\'s famous equation: Energy = mass × speed of light². A tiny mass converts to enormous energy.', diff:'medium' },
    ],
    Chemistry: [
      { q:'What is the chemical formula for water?', opts:['CO₂','H₂O','O₂','NaCl'], c:1, exp:'Water (H₂O) consists of 2 hydrogen atoms and 1 oxygen atom bonded together.', diff:'easy' },
      { q:'What is the pH of a neutral solution?', opts:['0','7','14','1'], c:1, exp:'pH 7 is neutral. Below 7 is acidic, above 7 is basic/alkaline.', diff:'easy' },
      { q:'True or False: NaCl is the chemical name for table salt.', opts:['True','False'], c:0, exp:'NaCl (Sodium Chloride) is common table salt. It forms when sodium and chlorine atoms bond ionically.', diff:'easy', type:'tf' },
      { q:'What is the atomic symbol for Iron?', opts:['Ir','Io','Fe','In'], c:2, exp:'Iron\'s symbol Fe comes from the Latin word "Ferrum".', diff:'easy' },
      { q:'Which type of bond involves sharing electrons?', opts:['Ionic bond','Covalent bond','Metallic bond','Hydrogen bond'], c:1, exp:'A covalent bond forms when two atoms share one or more pairs of electrons.', diff:'medium' },
      { q:'What is the most abundant element in the universe?', opts:['Oxygen','Carbon','Helium','Hydrogen'], c:3, exp:'Hydrogen makes up about 75% of all normal matter by mass in the universe.', diff:'easy' },
    ],
    History: [
      { q:'In which year did World War II end?', opts:['1943','1944','1945','1946'], c:2, exp:'World War II ended in 1945: Germany surrendered in May and Japan in September.', diff:'easy' },
      { q:'Who was the first person to walk on the Moon?', opts:['Buzz Aldrin','Yuri Gagarin','Neil Armstrong','John Glenn'], c:2, exp:'Neil Armstrong became the first human to walk on the Moon on July 20, 1969 (Apollo 11).', diff:'easy' },
      { q:'True or False: The Great Wall of China was built in a single dynasty.', opts:['True','False'], c:1, exp:'The Great Wall was built over many centuries by different Chinese dynasties, mainly from 7th century BC to the 17th century AD.', diff:'medium', type:'tf' },
      { q:'Who wrote the "Declaration of Independence"?', opts:['George Washington','Abraham Lincoln','Thomas Jefferson','Benjamin Franklin'], c:2, exp:'Thomas Jefferson was the primary author of the Declaration of Independence (1776).', diff:'easy' },
      { q:'Which civilization built the Pyramids of Giza?', opts:['Romans','Greeks','Mesopotamians','Ancient Egyptians'], c:3, exp:'The Ancient Egyptians built the Pyramids of Giza around 2560 BC as royal tombs.', diff:'easy' },
    ],
    Geography: [
      { q:'What is the capital of Japan?', opts:['Osaka','Kyoto','Tokyo','Hiroshima'], c:2, exp:'Tokyo is the capital and largest city of Japan, with a population of over 13 million.', diff:'easy' },
      { q:'Which is the largest ocean on Earth?', opts:['Atlantic','Indian','Arctic','Pacific'], c:3, exp:'The Pacific Ocean is the largest, covering about 165 million km² — more than all land combined.', diff:'easy' },
      { q:'True or False: Australia is both a country and a continent.', opts:['True','False'], c:0, exp:'Australia is unique as both a country and a continent (sometimes called Oceania).', diff:'easy', type:'tf' },
      { q:'Which mountain is the highest in the world?', opts:['K2','Kangchenjunga','Mount Everest','Lhotse'], c:2, exp:'Mount Everest in the Himalayas is the highest at 8,848.86 metres above sea level.', diff:'easy' },
      { q:'What is the Amazon River famous for?', opts:['Longest river','Widest river','River with most water flow','All of above'], c:2, exp:'The Amazon River has the greatest flow of any river, containing about 20% of Earth\'s fresh river water.', diff:'medium' },
    ],
    Technology: [
      { q:'What does "HTML" stand for?', opts:['Hyper Text Markup Language','High Text Machine Language','Hyper Transfer Markup Logic','None'], c:0, exp:'HTML = HyperText Markup Language — the standard language for creating web pages.', diff:'easy' },
      { q:'What does "CPU" stand for?', opts:['Central Processing Unit','Computer Processing Utility','Central Program Unit','Core Processing Unit'], c:0, exp:'CPU = Central Processing Unit — the brain of a computer that executes instructions.', diff:'easy' },
      { q:'True or False: Python is a compiled language.', opts:['True','False'], c:1, exp:'Python is an interpreted language — code is executed line by line by an interpreter, not compiled to machine code first.', diff:'medium', type:'tf' },
      { q:'What is the binary representation of the number 5?', opts:['100','010','101','111'], c:2, exp:'5 in binary is 101 (1×4 + 0×2 + 1×1 = 5).', diff:'medium' },
      { q:'What does "WWW" stand for?', opts:['World Wide Web','World Web Wide','Wide World Web','Web World Wide'], c:0, exp:'WWW = World Wide Web — the system of interlinked pages accessible via the Internet.', diff:'easy' },
      { q:'Which company created the Android operating system?', opts:['Apple','Microsoft','Google','Samsung'], c:2, exp:'Google developed Android, which is now the world\'s most widely used mobile OS.', diff:'easy' },
    ],
    English: [
      { q:'What is a noun?', opts:['An action word','A describing word','A person, place, or thing','A connecting word'], c:2, exp:'A noun names a person, place, thing, or idea (e.g., "book", "London", "happiness").', diff:'easy' },
      { q:'What is an antonym?', opts:['A word with similar meaning','A word with opposite meaning','A type of verb','A grammar rule'], c:1, exp:'An antonym is a word that has the opposite meaning (e.g., hot ↔ cold, happy ↔ sad).', diff:'easy' },
      { q:'True or False: "Quick" is an adverb in "Run quickly".', opts:['True','False'], c:1, exp:'"Quickly" is the adverb (modifying "run"). "Quick" is the adjective form.', diff:'medium', type:'tf' },
      { q:'Which of these is a simile?', opts:['"The sun is hot","She ran like the wind","Time is money","The stars were diamonds"], c:1, exp:'A simile makes a comparison using "like" or "as". "She ran like the wind" is a simile.', diff:'medium' },
    ],
  };

  // =========================================================================
  // FALLBACK ANSWERS (demo mode without API key)
  // =========================================================================
  const FALLBACK_ANSWERS = {
    photosynthesis: {
      simple: 'Photosynthesis is the process plants use to make their own food using sunlight, water, and carbon dioxide from the air.',
      howItWorks: ['Sunlight is absorbed by the green pigment called chlorophyll in plant leaves.','The plant takes in carbon dioxide (CO₂) from the air through tiny holes called stomata.','Water (H₂O) is absorbed by the plant\'s roots and travels up to the leaves.','Using the sun\'s energy, the plant combines CO₂ and water to create glucose (sugar) for food.','Oxygen is released as a byproduct — which is the air we breathe!'],
      example: 'Think of a plant like a tiny solar-powered kitchen. Sunlight is the electricity, water and CO₂ are the ingredients, and glucose is the food it cooks. The oxygen it releases is like the steam coming out!',
      remember: 'Sunlight + Water + CO₂ → Glucose + Oxygen. Happens in chloroplasts. Chlorophyll makes plants green and captures sunlight.',
      subject: 'Biology',
      diagram: { title: 'Photosynthesis Process', steps: [{ icon:'☀️', label:'Sunlight' },{ icon:'🍃', label:'Absorbed by Leaves' },{ icon:'💧', label:'Water from Roots' },{ icon:'🌬️', label:'CO₂ from Air' },{ icon:'⚗️', label:'Chloroplast Reaction' },{ icon:'🍬', label:'Glucose (Food)' },{ icon:'💨', label:'Oxygen Released' }] }
    },
    gravity: {
      simple: 'Gravity is a natural force that pulls objects toward each other. On Earth, it pulls everything down toward the ground.',
      howItWorks: ['Every object with mass creates a gravitational pull around it.','The bigger the mass, the stronger the gravitational pull.','Earth is very massive, so it pulls everything on its surface downward.','The Moon orbits Earth because Earth\'s gravity pulls it into a curved path.','The strength of gravity decreases as you move farther away from an object.'],
      example: 'When you drop a ball, gravity pulls it down. When you jump, gravity brings you back to Earth. The Moon stays in orbit because Earth\'s gravity constantly pulls it — like a ball on a string spinning in circles!',
      remember: 'Gravity pulls masses together. F = Gm₁m₂/r². On Earth, g ≈ 9.8 m/s². Gravity = why things fall down!',
      subject: 'Physics',
      diagram: { title: 'Gravity in Action', steps: [{ icon:'🌍', label:'Earth (large mass)' },{ icon:'⬇️', label:'Gravitational Pull' },{ icon:'🍎', label:'Apple Falls Down' },{ icon:'🌕', label:'Moon Orbits' },{ icon:'📐', label:'F = Gm₁m₂/r²' }] }
    },
    newton: {
      simple: 'Newton\'s laws explain how objects move. The third law says: for every action, there is an equal and opposite reaction.',
      howItWorks: ['1st Law (Inertia): An object stays still or keeps moving unless a force acts on it.','2nd Law (F=ma): The more force you apply, the more an object accelerates.','3rd Law (Action-Reaction): Every force has an equal and opposite force back.','When you push a wall, the wall pushes back on you with equal force!','Rocket engines work by pushing gas down — the gas pushes the rocket up.'],
      example: 'When you sit in a chair: you push down on the chair (action), the chair pushes up on you (reaction) — that\'s why you don\'t fall through it! When a gun fires a bullet forward, the gun recoils backward.',
      remember: 'Newton\'s 3rd Law: Every action = equal & opposite reaction. No force exists alone — forces always come in pairs!',
      subject: 'Physics',
      diagram: { title: 'Newton\'s 3 Laws', steps: [{ icon:'⚽', label:'1st: Inertia' },{ icon:'➡️', label:'Object in motion stays' },{ icon:'💪', label:'2nd: F = ma' },{ icon:'↔️', label:'3rd: Action = Reaction' },{ icon:'🚀', label:'Rocket Example' }] }
    },
    waterCycle: {
      simple: 'The water cycle is how water moves around Earth — from oceans to clouds to rain to rivers and back to the ocean again.',
      howItWorks: ['Evaporation: Heat from the sun turns water in oceans, lakes into water vapor (gas).','Condensation: Water vapor rises, cools down, and turns into tiny water droplets forming clouds.','Precipitation: Water droplets in clouds combine and fall as rain, snow, or hail.','Collection: Water collects in oceans, rivers, lakes, and soaks into the ground.','The cycle repeats continuously — the same water has been cycling for billions of years!'],
      example: 'Imagine your bathroom mirror fogging up after a hot shower. Hot shower water evaporates, rises, cools on the mirror, and condenses into droplets. That\'s a mini water cycle!',
      remember: 'Evaporation → Condensation → Precipitation → Collection → (Repeat). Same water has been on Earth for billions of years!',
      subject: 'Science',
      diagram: { title: 'The Water Cycle', steps: [{ icon:'☀️', label:'Sun heats water' },{ icon:'💨', label:'Evaporation' },{ icon:'☁️', label:'Clouds form (Condensation)' },{ icon:'🌧️', label:'Rain/Snow (Precipitation)' },{ icon:'🏔️', label:'Runoff to rivers' },{ icon:'🌊', label:'Back to ocean' }] }
    },
    heart: {
      simple: 'The heart is a muscular pump that sends blood around your body. It beats about 70 times per minute to deliver oxygen and nutrients to all your cells.',
      howItWorks: ['Blood carrying CO₂ from the body enters the right side of the heart.','The right ventricle pumps blood to the lungs to pick up oxygen.','Oxygen-rich blood returns to the left side of the heart.','The left ventricle (the strongest chamber) pumps blood to the entire body.','Blood vessels (arteries and veins) carry blood to and from all organs.'],
      example: 'Think of the heart as a two-sided pump: the right side sends blood to the "oxygen filling station" (lungs), and the left side delivers that oxygen-filled blood to every part of your body — like a delivery truck!',
      remember: 'Heart has 4 chambers: 2 atria (receive) + 2 ventricles (pump). Right side → lungs. Left side → body. Beats ~70x/min at rest.',
      subject: 'Biology',
      diagram: { title: 'How the Heart Works', steps: [{ icon:'🩸', label:'Deoxygenated blood in' },{ icon:'➡️', label:'Right side pumps' },{ icon:'🫁', label:'Lungs add oxygen' },{ icon:'⬅️', label:'Oxygenated blood back' },{ icon:'💪', label:'Left side pumps' },{ icon:'🌍', label:'Delivered to body' }] }
    },
  };

  // =========================================================================
  // MASCOT MESSAGES
  // =========================================================================
  const MASCOT_GREETING_MSGS = [
    'Ready to learn? Let\'s go! ✨', 'You\'re amazing! Let\'s study together! 🌸',
    'Every question makes you smarter! 💪', 'I\'m here to help you understand anything! 🧠',
    'Learning is a superpower — let\'s use it! 🚀',
  ];
  const MASCOT_CORRECT_MSGS = [
    'Correct! You\'re a genius! 🌟', 'Excellent work! Keep it up! 🎉',
    'That\'s right! You\'re crushing it! 🔥', 'Perfect! Your brain is powerful! ⚡',
    'Woohoo! Correct answer! 🎊',
  ];
  const MASCOT_WRONG_MSGS = [
    'Don\'t worry! Mistakes help us learn! 💙', 'Almost! Read the explanation below! 📖',
    'It\'s okay! Now you know the answer! 😊', 'Keep going! You\'ll get the next one! 💪',
    'Learning from errors is the real skill! 🌱',
  ];
  const QUIZ_ENCOURAGE_MSGS = [
    'You\'ve got this! Good luck! 🌟', 'Stay focused — you can do it! 💪',
    'Believe in yourself! 🌸', 'One question at a time! Let\'s go! 🚀',
    'Your hard work will pay off! ⚡',
  ];

  // =========================================================================
  // ACHIEVEMENTS DEFINITION
  // =========================================================================
  const ACHIEVEMENTS = [
    { id:'first_q',    emoji:'🌱', name:'First Step',    desc:'Ask your first question',       check: s => s.questions.length >= 1 },
    { id:'ten_qs',     emoji:'📚', name:'Bookworm',      desc:'Ask 10 questions',              check: s => s.questions.length >= 10 },
    { id:'first_quiz', emoji:'🎯', name:'Quiz Starter',  desc:'Complete first quiz',           check: s => s.quizHistory.length >= 1 },
    { id:'perfect',    emoji:'💯', name:'Perfect Score', desc:'Get 100% on a quiz',            check: s => s.quizHistory.some(q => q.score === q.total && q.total > 0) },
    { id:'saved_5',    emoji:'🔖', name:'Collector',     desc:'Save 5 questions',              check: s => s.questions.filter(q => q.saved).length >= 5 },
    { id:'streak3',    emoji:'🔥', name:'On Fire',       desc:'Get a 3-day streak',            check: s => s.streak.current >= 3 },
    { id:'streak7',    emoji:'⚡', name:'Scholar',       desc:'Get a 7-day streak',            check: s => s.streak.current >= 7 },
    { id:'study2h',    emoji:'⏱️', name:'Dedicated',     desc:'Study 2 hours in one day',      check: s => (s.sessions || []).some(ses => ses.minutes >= 120) },
    { id:'ten_quizzes',emoji:'🏆', name:'Quiz Master',   desc:'Complete 10 quizzes',           check: s => s.quizHistory.length >= 10 },
    { id:'voice_q',    emoji:'🎙️', name:'Voice Learner', desc:'Ask a question by voice',       check: s => s.voiceUsed >= 1 },
  ];

  // Subject emoji map
  const SUBJECT_EMOJIS = {
    General:'📚', Math:'📐', Science:'🔬', Biology:'🧬',
    Physics:'⚡', Chemistry:'⚗️', History:'🏛️', Geography:'🌍',
    Technology:'💻', English:'📝',
  };

  // =========================================================================
  // APP STATE
  // =========================================================================
  let STATE = {
    questions:    [],   // [{id, question, subject, answer, diagram, savedAt, saved, askedAt}]
    quizHistory:  [],   // [{id, date, score, total, topic, difficulty}]
    sessions:     [],   // [{date:'YYYY-MM-DD', minutes:N}]
    streak:       { current: 0, best: 0, lastDate: null },
    settings:     { userName:'Scholar', avatar:'👩‍🎓', theme:'dark', apiKey:'', model:'gemini-1.5-flash' },
    currentView:  'homeView',
    voiceUsed:    0,
    // Quiz session
    quiz: { questions:[], idx:0, score:0, diff:'easy', qty:5, topic:'all', active:false },
    // Timer
    timer: { running:false, startTime:null, elapsed:0 },
    selectedSubject: 'General',
    lastAnswer: null,
    histTab: 'all',
    chartPeriod: 'week',
    confirmCallback: null,
  };

  // =========================================================================
  // LOCALSTORAGE HELPERS
  // =========================================================================
  const LS_KEY = 'luminaSenseiData';

  function saveState() {
    try {
      const data = {
        questions: STATE.questions,
        quizHistory: STATE.quizHistory,
        sessions: STATE.sessions,
        streak: STATE.streak,
        settings: STATE.settings,
        voiceUsed: STATE.voiceUsed,
      };
      localStorage.setItem(LS_KEY, JSON.stringify(data));
    } catch(e) { console.warn('Save failed:', e); }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      STATE.questions   = data.questions   || [];
      STATE.quizHistory = data.quizHistory || [];
      STATE.sessions    = data.sessions    || [];
      STATE.streak      = data.streak      || { current:0, best:0, lastDate:null };
      STATE.settings    = Object.assign({ userName:'Scholar', avatar:'👩‍🎓', theme:'dark', apiKey:'', model:'gemini-1.5-flash' }, data.settings || {});
      STATE.voiceUsed   = data.voiceUsed   || 0;
    } catch(e) { console.warn('Load failed:', e); }
  }

  // =========================================================================
  // UTILITIES
  // =========================================================================
  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

  function fmtTime(secs) {
    const m = Math.floor(secs / 60), s = secs % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  function fmtHoursMinutes(minutes) {
    const h = Math.floor(minutes / 60), m = minutes % 60;
    if (h === 0) return `${m}m`;
    if (m === 0) return `${h}h`;
    return `${h}h ${m}m`;
  }

  function fmtDate(iso) {
    const d = new Date(iso);
    const now = new Date();
    const diff = Math.floor((now - d) / 86400000);
    if (diff === 0) return `Today, ${d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`;
    if (diff === 1) return `Yesterday, ${d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`;
    return d.toLocaleDateString([], {month:'short', day:'numeric'});
  }

  function todayStr() { return new Date().toISOString().slice(0,10); }

  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function esc(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // =========================================================================
  // TOAST
  // =========================================================================
  function showToast(msg, type='info', duration=3000) {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const ICONS = { success:'✅', error:'❌', info:'💡', warning:'⚠️' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `<span class="toast-emoji">${ICONS[type]||'💡'}</span><span>${esc(msg)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // =========================================================================
  // CONFIRM MODAL
  // =========================================================================
  function showConfirm(title, msg, onOk) {
    document.getElementById('confirmModalTitle').textContent = title;
    document.getElementById('confirmModalMsg').textContent   = msg;
    document.getElementById('confirmModalBackdrop').classList.remove('hidden');
    STATE.confirmCallback = onOk;
  }

  // =========================================================================
  // SAKURA CANVAS ANIMATION
  // =========================================================================
  function initSakuraCanvas() {
    const canvas = document.getElementById('sakuraCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let petals = [];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function createPetal() {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * -200,
        size: Math.random() * 8 + 4,
        speed: Math.random() * 1.2 + 0.5,
        drift: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.04,
        opacity: Math.random() * 0.5 + 0.3,
        color: Math.random() < 0.7 ? '#ff9dc0' : '#ffb8d3',
      };
    }

    for (let i = 0; i < 55; i++) {
      const p = createPetal();
      p.y = Math.random() * canvas.height;
      petals.push(p);
    }

    function drawPetal(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.size, p.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p, i) => {
        p.y        += p.speed;
        p.x        += p.drift;
        p.rotation += p.rotSpeed;
        if (p.y > canvas.height + 20) petals[i] = createPetal();
        drawPetal(p);
      });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // =========================================================================
  // NAVIGATION / ROUTING
  // =========================================================================
  const VIEW_LABELS = { homeView:'Home', askView:'Ask AI', quizView:'Quiz', historyView:'History', profileView:'Profile' };

  function navigate(viewId, opts = {}) {
    if (STATE.currentView === viewId && !opts.force) return;

    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.bnav-item').forEach(b => b.classList.remove('active'));

    const view = document.getElementById(viewId);
    if (view) view.classList.add('active');

    const navBtn = document.querySelector(`.bnav-item[data-view="${viewId}"]`);
    if (navBtn) navBtn.classList.add('active');

    STATE.currentView = viewId;
    const lbl = document.getElementById('currentViewLabel');
    if (lbl) lbl.textContent = VIEW_LABELS[viewId] || '';

    // Per-view refresh
    if (viewId === 'homeView')    refreshHome();
    if (viewId === 'historyView') refreshHistory();
    if (viewId === 'profileView') refreshProfile();
    if (viewId === 'quizView')    refreshQuizSetup();
    if (viewId === 'askView' && opts.subject) setSubject(opts.subject);
  }

  // =========================================================================
  // STREAK MANAGEMENT
  // =========================================================================
  function updateStreak() {
    const today = todayStr();
    if (STATE.streak.lastDate === today) return;
    const yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
    const yStr = yesterday.toISOString().slice(0,10);
    if (STATE.streak.lastDate === yStr) {
      STATE.streak.current += 1;
    } else if (STATE.streak.lastDate !== today) {
      STATE.streak.current = 1;
    }
    STATE.streak.lastDate = today;
    if (STATE.streak.current > STATE.streak.best) STATE.streak.best = STATE.streak.current;
    saveState();
    updateHeaderStreak();
  }

  function updateHeaderStreak() {
    const el = document.getElementById('headerStreakNum');
    if (el) el.textContent = STATE.streak.current;
  }

  // =========================================================================
  // STUDY TIMER
  // =========================================================================
  let timerInterval = null;

  function startTimer() {
    if (STATE.timer.running) return;
    STATE.timer.running   = true;
    STATE.timer.startTime = Date.now() - STATE.timer.elapsed * 1000;
    document.getElementById('stw-toggle-btn') && (document.getElementById('stwToggleBtn').textContent = '⏸️');
    timerInterval = setInterval(tickTimer, 1000);
    updateStreak();
  }

  function pauseTimer() {
    if (!STATE.timer.running) return;
    STATE.timer.running = false;
    STATE.timer.elapsed = Math.floor((Date.now() - STATE.timer.startTime) / 1000);
    clearInterval(timerInterval);
    const btn = document.getElementById('stwToggleBtn');
    if (btn) btn.textContent = '▶️';
    logSession();
  }

  function tickTimer() {
    if (!STATE.timer.running) return;
    const elapsed = Math.floor((Date.now() - STATE.timer.startTime) / 1000);
    STATE.timer.elapsed = elapsed;
    const disp = document.getElementById('stwTimeDisplay');
    if (disp) disp.textContent = fmtTime(elapsed);
    // Update home stat every 30 seconds
    if (elapsed % 30 === 0) {
      const sc = document.getElementById('scTodayHours');
      if (sc) sc.textContent = fmtHoursMinutes(Math.floor(elapsed / 60));
    }
  }

  function logSession() {
    const minutes = Math.floor(STATE.timer.elapsed / 60);
    if (minutes < 1) return;
    const today = todayStr();
    const existing = STATE.sessions.find(s => s.date === today);
    if (existing) existing.minutes += minutes;
    else STATE.sessions.push({ date: today, minutes });
    saveState();
  }

  // =========================================================================
  // HOME DASHBOARD
  // =========================================================================
  function refreshHome() {
    // Greeting
    const nameEl = document.getElementById('greetingName');
    if (nameEl) nameEl.textContent = STATE.settings.userName || 'Scholar';

    // Mascot emoji
    const mascotEl = document.getElementById('homeMascotEmoji');
    if (mascotEl) mascotEl.textContent = STATE.settings.avatar || '👩‍🎓';

    // Mascot message
    const msgEl = document.getElementById('homeMascotMsg');
    if (msgEl) msgEl.textContent = rand(MASCOT_GREETING_MSGS);

    // Streak line
    const streakLine = document.getElementById('greetingStreakLine');
    if (streakLine) {
      if (STATE.streak.current >= 1) {
        streakLine.textContent = `🔥 ${STATE.streak.current}-day streak! Keep it going!`;
      } else {
        streakLine.textContent = 'Start your first study session today! 📖';
      }
    }

    // Stat chips
    const todayMinutes = getTodayMinutes();
    setTextById('scTodayHours', fmtHoursMinutes(todayMinutes));
    setTextById('scQuestionsAsked', STATE.questions.length);
    setTextById('scBestScore', getBestScoreText());
    setTextById('scStreakDays', STATE.streak.current);

    // Chart
    renderActivityChart();

    // Recent questions
    renderRecentQuestions();

    // Topics
    renderTopicsCloud();

    // Saved questions preview
    renderSavedQsHome();
  }

  function getTodayMinutes() {
    const today = todayStr();
    const base = (STATE.sessions.find(s => s.date === today) || { minutes: 0 }).minutes;
    const live = STATE.timer.running ? Math.floor(STATE.timer.elapsed / 60) : 0;
    return base + live;
  }

  function getBestScoreText() {
    if (!STATE.quizHistory.length) return '—';
    const best = Math.max(...STATE.quizHistory.map(q => q.total > 0 ? Math.round(q.score/q.total*100) : 0));
    return `${best}%`;
  }

  function setTextById(id, val) {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function renderActivityChart() {
    const area = document.getElementById('activityBarChart');
    if (!area) return;
    const period = STATE.chartPeriod;
    const days = period === 'week' ? 7 : 30;
    const labels = [];
    const minutesData = [];

    for (let i = days - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dStr = d.toISOString().slice(0,10);
      const ses = STATE.sessions.find(s => s.date === dStr);
      let min = ses ? ses.minutes : 0;
      if (i === 0 && STATE.timer.running) min += Math.floor(STATE.timer.elapsed / 60);
      minutesData.push(min);
      if (period === 'week') {
        labels.push(['Su','Mo','Tu','We','Th','Fr','Sa'][d.getDay()]);
      } else {
        labels.push(i % 5 === 0 ? d.getDate() : '');
      }
    }

    const maxMin = Math.max(...minutesData, 1);
    area.innerHTML = minutesData.map((min, i) => {
      const pct = Math.max(3, Math.round((min / maxMin) * 100));
      const h = Math.max(3, Math.round(pct * 0.85));
      return `<div class="bar-day">
        <div class="bar-fill" style="height:${h}px" title="${fmtHoursMinutes(min)}"></div>
        <div class="bar-day-lbl">${labels[i]}</div>
      </div>`;
    }).join('');

    const totalMin = minutesData.reduce((a,b) => a+b, 0);
    setTextById('weeklyHoursTotal', fmtHoursMinutes(totalMin));

    // Weekly questions
    const oneWeekAgo = new Date(); oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const wkQs = STATE.questions.filter(q => new Date(q.askedAt) >= oneWeekAgo).length;
    setTextById('weeklyQsTotal', wkQs);
  }

  function renderRecentQuestions() {
    const list  = document.getElementById('recentQsList');
    const empty = document.getElementById('recentQsEmpty');
    if (!list || !empty) return;
    const recent = [...STATE.questions].sort((a,b) => new Date(b.askedAt)-new Date(a.askedAt)).slice(0,5);
    if (!recent.length) { list.innerHTML=''; list.classList.add('hidden'); empty.classList.remove('hidden'); return; }
    list.classList.remove('hidden');
    empty.classList.add('hidden');
    list.innerHTML = recent.map(q => `
      <div class="recent-q-item" data-id="${q.id}">
        <div class="rq-emoji">${SUBJECT_EMOJIS[q.subject]||'📚'}</div>
        <div class="rq-content">
          <div class="rq-text">${esc(q.question)}</div>
          <div class="rq-meta">${q.subject} · ${fmtDate(q.askedAt)}</div>
        </div>
        <button class="rq-reopen-btn" data-id="${q.id}">Reopen</button>
      </div>`).join('');
    list.querySelectorAll('.rq-reopen-btn').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); reopenQuestion(btn.dataset.id); });
    });
  }

  function renderTopicsCloud() {
    const wrap = document.getElementById('topicsCloudWrap');
    if (!wrap) return;
    const counts = {};
    STATE.questions.forEach(q => { counts[q.subject] = (counts[q.subject] || 0) + 1; });
    const topics = Object.entries(counts).sort((a,b) => b[1]-a[1]);
    if (!topics.length) {
      wrap.innerHTML = `<div class="empty-state-box"><div class="empty-emoji-lg">📖</div><p class="empty-text">Your studied topics will appear here.</p></div>`;
      return;
    }
    wrap.innerHTML = topics.map(([subj, cnt]) =>
      `<span class="topic-pill">${SUBJECT_EMOJIS[subj]||'📚'} ${esc(subj)}<span class="topic-count">×${cnt}</span></span>`
    ).join('');
  }

  function renderSavedQsHome() {
    const list  = document.getElementById('savedQsHomeList');
    const empty = document.getElementById('savedQsEmpty');
    if (!list || !empty) return;
    const saved = STATE.questions.filter(q => q.saved).slice(0,3);
    if (!saved.length) { list.innerHTML=''; list.classList.add('hidden'); empty.classList.remove('hidden'); return; }
    list.classList.remove('hidden');
    empty.classList.add('hidden');
    list.innerHTML = saved.map(q => `
      <div class="recent-q-item" data-id="${q.id}">
        <div class="rq-emoji">🔖</div>
        <div class="rq-content">
          <div class="rq-text">${esc(q.question)}</div>
          <div class="rq-meta">${q.subject} · ${fmtDate(q.askedAt)}</div>
        </div>
        <button class="rq-reopen-btn" data-id="${q.id}">View</button>
      </div>`).join('');
    list.querySelectorAll('.rq-reopen-btn').forEach(btn => {
      btn.addEventListener('click', e => { e.stopPropagation(); reopenQuestion(btn.dataset.id); });
    });
  }

  function reopenQuestion(id) {
    const q = STATE.questions.find(x => x.id === id);
    if (!q) return;
    navigate('askView');
    setTimeout(() => displayAnswer(q.question, q.subject, q.answer, q.diagram), 100);
  }

  // =========================================================================
  // SUBJECT CHIPS
  // =========================================================================
  function setSubject(subj) {
    STATE.selectedSubject = subj;
    document.querySelectorAll('.subj-chip').forEach(c => {
      c.classList.toggle('active', c.dataset.subject === subj);
    });
  }

  // =========================================================================
  // ASK AI — MAIN LOGIC
  // =========================================================================
  async function handleAskQuestion() {
    const ta = document.getElementById('questionTextarea');
    if (!ta) return;
    const question = ta.value.trim();
    if (!question) { showToast('Please type a question first!', 'warning'); return; }
    if (question.length > 300) { showToast('Question too long! Keep it under 300 characters.', 'warning'); return; }

    // Update mascot
    setAskMascot('🤔', 'Hmm, let me think about this...');

    // Show loading, hide answer
    document.getElementById('aiLoadingWrap')?.classList.remove('hidden');
    document.getElementById('answerCard')?.classList.add('hidden');

    const subject = STATE.selectedSubject || 'General';
    let answer, diagram;

    try {
      if (STATE.settings.apiKey) {
        const result = await callGemini(buildAnswerPrompt(question, subject));
        const parsed  = parseAIResponse(result);
        answer  = parsed.answer;
        diagram = parsed.diagram;
      } else {
        await sleep(1200); // Simulate thinking
        const fallback = getFallbackAnswer(question, subject);
        answer  = fallback.answer;
        diagram = fallback.diagram;
      }
    } catch(err) {
      console.error('AI Error:', err);
      const fallback = getFallbackAnswer(question, subject);
      answer  = fallback.answer;
      diagram = fallback.diagram;
    }

    document.getElementById('aiLoadingWrap')?.classList.add('hidden');

    // Save to history
    const qRecord = {
      id: uid(), question, subject,
      answer, diagram,
      askedAt: new Date().toISOString(),
      saved: false,
    };
    STATE.questions.unshift(qRecord);
    STATE.lastAnswer = qRecord;
    saveState();

    // Display
    displayAnswer(question, subject, answer, diagram);
    ta.value = '';
    updateCharCount(0);

    // Mascot reaction
    setAskMascot('🌟', 'Here\'s what I found! Hope it helps! ✨');
    updateStreak();
    checkAchievements();
  }

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  function buildAnswerPrompt(question, subject) {
    return `You are a friendly anime-style AI tutor for students. Answer this question in simple, beginner-friendly language.
Question: "${question}"
Subject: ${subject}

Respond ONLY with valid JSON (no markdown, no code blocks):
{
  "simple": "2-4 sentence plain answer",
  "howItWorks": ["step 1", "step 2", "step 3", "step 4"],
  "example": "real-world easy example",
  "remember": "key takeaway in one sentence",
  "subject": "${subject}",
  "diagram": {
    "title": "short diagram title",
    "steps": [{"icon":"emoji","label":"short label"},{"icon":"emoji","label":"short label"}]
  }
}
Use max 5-7 diagram steps. Use relevant emojis. Keep language simple for a student.`;
  }

  function getFallbackAnswer(question, subject) {
    const qLower = question.toLowerCase();
    let data = null;

    if (qLower.includes('photosynthesis')) data = FALLBACK_ANSWERS.photosynthesis;
    else if (qLower.includes('gravity'))   data = FALLBACK_ANSWERS.gravity;
    else if (qLower.includes('newton'))    data = FALLBACK_ANSWERS.newton;
    else if (qLower.includes('water cycle') || qLower.includes('water cycle')) data = FALLBACK_ANSWERS.waterCycle;
    else if (qLower.includes('heart'))     data = FALLBACK_ANSWERS.heart;

    if (data) {
      return {
        answer: { simple: data.simple, howItWorks: data.howItWorks, example: data.example, remember: data.remember },
        diagram: data.diagram,
      };
    }

    // Generic fallback
    return {
      answer: {
        simple: `This is a great question about "${question}". To get a detailed AI answer, please add your Gemini API key in Profile → Settings. I'll then give you a full structured explanation!`,
        howItWorks: [
          'Add your free Gemini API key in Profile → Settings.',
          'Then ask any question and get a detailed, structured answer.',
          'The AI will explain concepts in simple language with examples.',
          'You\'ll also get a visual diagram to understand better!',
        ],
        example: 'Think of it like this: once you connect the AI key, every question you ask will get a personalized, clear, step-by-step explanation tailored just for you.',
        remember: '🔑 Add your free Gemini API key in Profile to unlock full AI answers!',
      },
      diagram: {
        title: `How to Learn: ${question.slice(0,30)}`,
        steps: [
          { icon:'❓', label:'Question Asked' },
          { icon:'🔑', label:'Add API Key' },
          { icon:'🤖', label:'AI Thinks' },
          { icon:'💡', label:'Simple Answer' },
          { icon:'📊', label:'Diagram' },
          { icon:'🎮', label:'Practice Quiz' },
        ],
      },
    };
  }

  function parseAIResponse(text) {
    try {
      // Strip markdown code fences if present
      const cleaned = text.replace(/```json\n?/gi,'').replace(/```\n?/g,'').trim();
      const data = JSON.parse(cleaned);
      return {
        answer: {
          simple:     data.simple     || '',
          howItWorks: Array.isArray(data.howItWorks) ? data.howItWorks : [],
          example:    data.example    || '',
          remember:   data.remember   || '',
        },
        diagram: data.diagram || { title:'', steps:[] },
      };
    } catch(e) {
      return {
        answer: { simple: text.slice(0, 200), howItWorks:[], example:'', remember:'' },
        diagram: { title:'', steps:[] },
      };
    }
  }

  function displayAnswer(question, subject, answer, diagram) {
    const card = document.getElementById('answerCard');
    if (!card) return;
    card.classList.remove('hidden');

    setTextById('answerQDisplay', question);

    const badge = document.getElementById('answerSubjBadge');
    if (badge) badge.textContent = `${SUBJECT_EMOJIS[subject]||'📚'} ${subject}`;

    const timeBadge = document.getElementById('answerTimeBadge');
    if (timeBadge) timeBadge.textContent = 'Just now';

    setTextById('ansSimple', answer.simple || '');

    const howEl = document.getElementById('ansHowItWorks');
    if (howEl) howEl.innerHTML = (answer.howItWorks || []).map(s => `<li>${esc(s)}</li>`).join('');

    setTextById('ansExample',  answer.example  || '');
    setTextById('ansRemember', answer.remember || '');

    // Render diagram
    if (diagram && diagram.steps && diagram.steps.length) {
      renderFlowDiagram(diagram, 'diagramRenderArea');
      document.getElementById('diagramSectionWrap')?.classList.remove('hidden');
    } else {
      document.getElementById('diagramSectionWrap')?.classList.add('hidden');
    }

    // Reaction
    const rxn = document.getElementById('answerMascotReaction');
    if (rxn) rxn.style.display = 'flex';

    // Scroll to answer
    setTimeout(() => card.scrollIntoView({ behavior:'smooth', block:'start' }), 100);
  }

  // =========================================================================
  // SVG DIAGRAM RENDERER
  // =========================================================================
  function renderFlowDiagram(diagram, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const steps = diagram.steps || [];
    if (!steps.length) { container.innerHTML = ''; return; }

    const W = 520, nodeW = 90, nodeH = 54, arrowH = 28;
    const totalH = steps.length * (nodeH + arrowH) - arrowH + 20;
    const cx = W / 2;

    const colors = ['#ff6eb4','#b06ef7','#5ecbff','#56e09e','#ffd166','#ff9f43','#00e5cc'];

    let svgContent = `<svg viewBox="0 0 ${W} ${totalH}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-height:380px">
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="2" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>`;

    steps.forEach((step, i) => {
      const y = 10 + i * (nodeH + arrowH);
      const color = colors[i % colors.length];
      const lightColor = color + '33';

      // Arrow (not on last step)
      if (i < steps.length - 1) {
        const arrowY = y + nodeH;
        svgContent += `
          <line x1="${cx}" y1="${arrowY}" x2="${cx}" y2="${arrowY + arrowH - 6}" stroke="${colors[(i+1)%colors.length]}" stroke-width="2" stroke-dasharray="4,2" opacity="0.7"/>
          <polygon points="${cx-5},${arrowY+arrowH-8} ${cx+5},${arrowY+arrowH-8} ${cx},${arrowY+arrowH}" fill="${colors[(i+1)%colors.length]}" opacity="0.85"/>`;
      }

      // Node box
      svgContent += `
        <rect x="${cx - nodeW/2}" y="${y}" width="${nodeW}" height="${nodeH}" rx="12" fill="${lightColor}" stroke="${color}" stroke-width="1.5" filter="url(#glow)"/>
        <text x="${cx}" y="${y + 18}" text-anchor="middle" font-size="16" font-family="sans-serif">${step.icon || '•'}</text>
        <text x="${cx}" y="${y + 37}" text-anchor="middle" font-size="10" font-family="sans-serif" fill="${color}" font-weight="700">${esc(step.label || '')}</text>`;
    });

    // Title
    svgContent += `
      <text x="${cx}" y="${totalH - 4}" text-anchor="middle" font-size="9" fill="#888" font-family="sans-serif">${esc(diagram.title || '')}</text>`;

    svgContent += '</svg>';
    container.innerHTML = svgContent;
  }

  function setAskMascot(emoji, msg) {
    const eEl = document.getElementById('askMascotEmoji');
    const bEl = document.getElementById('askBubbleText');
    if (eEl) { eEl.textContent = emoji; eEl.style.animation = 'none'; setTimeout(() => eEl.style.animation = '', 50); }
    if (bEl) bEl.textContent = msg;
  }

  // =========================================================================
  // SAVE / LISTEN / PRACTICE BUTTONS
  // =========================================================================
  function saveCurrentQuestion() {
    const last = STATE.lastAnswer;
    if (!last) { showToast('Ask a question first!', 'warning'); return; }
    const existing = STATE.questions.find(q => q.id === last.id);
    if (existing) {
      existing.saved = !existing.saved;
      saveState();
      const btn = document.getElementById('saveQuestionBtn');
      if (btn) btn.textContent = existing.saved ? '🔖 Saved!' : '🔖 Save';
      showToast(existing.saved ? 'Question saved! 🔖' : 'Question unsaved', existing.saved ? 'success' : 'info');
    }
  }

  let ttsActive = false;
  function listenAnswer() {
    if (!window.speechSynthesis) { showToast('Text-to-speech not supported in this browser.', 'error'); return; }
    if (ttsActive) { window.speechSynthesis.cancel(); ttsActive = false; document.getElementById('listenBtn').textContent = '🔊 Listen'; return; }
    const last = STATE.lastAnswer;
    if (!last || !last.answer) return;
    const text = `${last.answer.simple || ''} ${(last.answer.howItWorks || []).join('. ')} ${last.answer.example || ''} Remember: ${last.answer.remember || ''}`;
    const utt = new SpeechSynthesisUtterance(text);
    utt.rate = 0.95; utt.pitch = 1.05;
    utt.onend = () => { ttsActive = false; const b = document.getElementById('listenBtn'); if (b) b.textContent = '🔊 Listen'; };
    window.speechSynthesis.speak(utt);
    ttsActive = true;
    const btn = document.getElementById('listenBtn');
    if (btn) btn.textContent = '⏹️ Stop';
  }

  // =========================================================================
  // VOICE INPUT
  // =========================================================================
  let recognition = null;

  function startVoiceInput() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      showToast('Voice input not supported in this browser. Try Chrome or Edge!', 'error');
      return;
    }
    recognition = new SpeechRecognition();
    recognition.continuous    = false;
    recognition.interimResults = true;
    recognition.lang          = 'en-US';

    const overlay   = document.getElementById('voiceOverlay');
    const preview   = document.getElementById('voiceTranscriptPreview');
    const statusTxt = document.getElementById('voiceStatusText');
    const micBtn    = document.getElementById('voiceMicBtn');

    overlay?.classList.remove('hidden');
    micBtn?.classList.add('listening');

    recognition.onstart = () => {
      if (statusTxt) statusTxt.textContent = '🎤 Listening...';
      if (preview)   preview.textContent   = 'Speak your question clearly...';
    };

    recognition.onresult = e => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      if (preview) preview.textContent = transcript;
    };

    recognition.onend = () => {
      overlay?.classList.add('hidden');
      micBtn?.classList.remove('listening');
      const transcript = preview?.textContent || '';
      if (transcript && transcript !== 'Speak your question clearly...') {
        const ta = document.getElementById('questionTextarea');
        if (ta) { ta.value = transcript; updateCharCount(transcript.length); }
        STATE.voiceUsed = (STATE.voiceUsed || 0) + 1;
        saveState();
        checkAchievements();
      }
    };

    recognition.onerror = e => {
      overlay?.classList.add('hidden');
      micBtn?.classList.remove('listening');
      if (e.error === 'not-allowed') {
        showToast('Microphone permission denied. Please allow microphone access.', 'error');
      } else {
        showToast('Voice recognition error: ' + e.error, 'error');
      }
    };

    recognition.start();
  }

  function stopVoiceInput() {
    if (recognition) { recognition.stop(); recognition = null; }
    document.getElementById('voiceOverlay')?.classList.add('hidden');
    document.getElementById('voiceMicBtn')?.classList.remove('listening');
  }

  // =========================================================================
  // GEMINI API
  // =========================================================================
  async function callGemini(prompt) {
    const key   = STATE.settings.apiKey;
    const model = STATE.settings.model || 'gemini-1.5-flash';
    const url   = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
    const body  = { contents: [{ parts: [{ text: prompt }] }] };
    const resp  = await fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
    if (!resp.ok) throw new Error(`Gemini API error: ${resp.status}`);
    const data = await resp.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }

  // =========================================================================
  // QUIZ GENERATION & MANAGEMENT
  // =========================================================================
  function refreshQuizSetup() {
    // Populate topic select
    const sel = document.getElementById('quizTopicSelect');
    if (sel) {
      const subjects = [...new Set(STATE.questions.map(q => q.subject))];
      const bankTopics = Object.keys(QUIZ_BANK);
      const allTopics = [...new Set([...bankTopics, ...subjects])].filter(t => t !== 'all');
      sel.innerHTML = `<option value="all">All Topics 📚</option>` +
        allTopics.map(t => `<option value="${t}">${SUBJECT_EMOJIS[t]||'📚'} ${t}</option>`).join('');
    }

    // Render quiz history
    renderQuizHistory();

    // Show/hide panels
    document.getElementById('quizSetupPanel')?.classList.remove('hidden');
    document.getElementById('activeQuizArea')?.classList.add('hidden');
    document.getElementById('quizScoreScreen')?.classList.add('hidden');
  }

  function renderQuizHistory() {
    const list = document.getElementById('quizScoreHistoryList');
    if (!list) return;
    const history = [...STATE.quizHistory].reverse().slice(0,8);
    if (!history.length) {
      list.innerHTML = `<div class="empty-state-box"><div class="empty-emoji-lg">🎯</div><p class="empty-text">Complete a quiz to see your scores here!</p></div>`;
      return;
    }
    list.innerHTML = history.map(h => {
      const pct = h.total > 0 ? Math.round(h.score / h.total * 100) : 0;
      const cls = pct >= 80 ? 'pct-great' : pct >= 50 ? 'pct-ok' : 'pct-low';
      return `<div class="quiz-score-hist-item">
        <span class="qsh-topic">${SUBJECT_EMOJIS[h.topic]||'📚'} ${h.topic}</span>
        <span class="qsh-score">${h.score}/${h.total}</span>
        <span class="qsh-pct ${cls}">${pct}%</span>
        <span class="qsh-date">${fmtDate(h.date)}</span>
      </div>`;
    }).join('');
  }

  async function startQuiz() {
    const topic = document.getElementById('quizTopicSelect')?.value || 'all';
    const diff  = document.querySelector('#diffChips .conf-chip.active')?.dataset.diff || 'easy';
    const qty   = parseInt(document.querySelector('#qtyChips .conf-chip.active')?.dataset.qty || '5');

    STATE.quiz = { questions:[], idx:0, score:0, diff, qty, topic, active:true };

    const btn = document.getElementById('startQuizBtn');
    if (btn) { btn.textContent = 'Generating...'; btn.disabled = true; }

    let questions = [];

    try {
      if (STATE.settings.apiKey && STATE.questions.length > 0) {
        questions = await generateAIQuizQuestions(topic, diff, qty);
      }
    } catch(e) { console.warn('AI quiz gen failed, using bank:', e); }

    if (!questions.length) questions = getQuizBankQuestions(topic, diff, qty);
    if (!questions.length) { showToast('No questions available for this topic!', 'warning'); return; }

    STATE.quiz.questions = questions;

    if (btn) { btn.textContent = '🚀 Start Quiz!'; btn.disabled = false; }

    // Switch to active quiz UI
    document.getElementById('quizSetupPanel')?.classList.add('hidden');
    document.getElementById('activeQuizArea')?.classList.remove('hidden');
    document.getElementById('quizScoreScreen')?.classList.add('hidden');

    renderQuizQuestion(0);
    updateQuizMascot(rand(QUIZ_ENCOURAGE_MSGS), '🤓');
  }

  function getQuizBankQuestions(topic, diff, qty) {
    let pool = [];
    if (topic === 'all') {
      Object.values(QUIZ_BANK).forEach(qs => pool.push(...qs));
    } else if (QUIZ_BANK[topic]) {
      pool = [...QUIZ_BANK[topic]];
      // Also add General questions
      pool.push(...(QUIZ_BANK.General || []));
    } else {
      Object.values(QUIZ_BANK).forEach(qs => pool.push(...qs));
    }

    // Filter by difficulty
    let filtered = pool.filter(q => q.diff === diff);
    if (filtered.length < qty) filtered = pool; // fallback to all diffs

    // Shuffle & pick
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, qty).map(q => ({
      question: q.q,
      type: q.type === 'tf' ? 'truefalse' : 'mcq',
      options: q.opts,
      correct: q.c,
      explanation: q.exp,
      topic: topic === 'all' ? 'General' : topic,
      difficulty: q.diff,
    }));
  }

  async function generateAIQuizQuestions(topic, diff, qty) {
    const pastQs = STATE.questions.filter(q => topic === 'all' || q.subject === topic).slice(0,5).map(q => q.question).join('; ');
    const prompt = `You are creating a practice quiz for a student.
Topic: ${topic}
Student's past questions: ${pastQs || 'general knowledge'}
Generate ${qty} ${diff} difficulty practice questions. Return ONLY valid JSON:
{
  "questions": [
    {
      "question": "...",
      "type": "mcq",
      "options": ["A", "B", "C", "D"],
      "correct": 0,
      "explanation": "Brief explanation why the answer is correct.",
      "topic": "${topic}"
    }
  ]
}
For true/false questions use type "truefalse" and options ["True","False"]. Mix question types.`;

    const text = await callGemini(prompt);
    const cleaned = text.replace(/```json\n?/gi,'').replace(/```\n?/g,'').trim();
    const data = JSON.parse(cleaned);
    return (data.questions || []).map(q => ({
      question: q.question,
      type: q.type || 'mcq',
      options: q.options,
      correct: q.correct,
      explanation: q.explanation,
      topic: q.topic || topic,
      difficulty: diff,
    }));
  }

  function renderQuizQuestion(idx) {
    const q = STATE.quiz.questions[idx];
    if (!q) return;

    const total = STATE.quiz.questions.length;
    const pct   = Math.round((idx / total) * 100);

    // Progress
    const fill  = document.getElementById('quizProgFill');
    const label = document.getElementById('quizProgLabel');
    if (fill)  fill.style.width  = `${pct}%`;
    if (label) label.textContent = `${idx + 1} / ${total}`;

    // Question info
    setTextById('quizQNumBadge', `Q${idx + 1}`);
    setTextById('quizTypeTag',   q.type === 'truefalse' ? 'True / False' : 'Multiple Choice');
    setTextById('quizTopicTag',  q.topic || 'General');
    setTextById('quizQText',     q.question);

    // Options
    const optsList = document.getElementById('quizOptionsList');
    if (optsList) {
      const letters = ['A','B','C','D','E'];
      optsList.innerHTML = q.options.map((opt, i) => `
        <button class="quiz-option-btn" data-idx="${i}" aria-label="Option ${letters[i]}: ${opt}">
          <span class="opt-letter">${letters[i]}</span>
          <span>${esc(opt)}</span>
        </button>`).join('');
      optsList.querySelectorAll('.quiz-option-btn').forEach(btn => {
        btn.addEventListener('click', () => handleQuizAnswer(parseInt(btn.dataset.idx)));
      });
    }

    // Hide explanation
    const expBox = document.getElementById('quizExplanationBox');
    if (expBox) expBox.classList.add('hidden');
  }

  function handleQuizAnswer(selectedIdx) {
    const q    = STATE.quiz.questions[STATE.quiz.idx];
    const opts = document.querySelectorAll('.quiz-option-btn');
    const correct = q.correct;
    const isRight = selectedIdx === correct;

    // Disable all options
    opts.forEach(b => b.disabled = true);

    // Color correct / wrong
    opts.forEach((b, i) => {
      if (i === correct) b.classList.add('selected-correct');
      else if (i === selectedIdx && !isRight) b.classList.add('selected-wrong');
    });

    if (isRight) {
      STATE.quiz.score++;
      updateQuizMascot(rand(MASCOT_CORRECT_MSGS), '🎉');
    } else {
      updateQuizMascot(rand(MASCOT_WRONG_MSGS), '😢');
    }

    // Show explanation
    const expBox = document.getElementById('quizExplanationBox');
    if (expBox) {
      expBox.classList.remove('hidden');
      setTextById('quizExpResultIcon',  isRight ? '✅' : '❌');
      setTextById('quizExpResultText',  isRight ? 'Correct! Great job! 🌟' : 'Not quite! Here\'s why:');
      setTextById('quizExpBody',        q.explanation || '');

      const nextBtn = document.getElementById('quizNextBtn');
      const nextLbl = document.getElementById('quizNextBtnLabel');
      const isLast  = STATE.quiz.idx === STATE.quiz.questions.length - 1;
      if (nextLbl) nextLbl.textContent = isLast ? 'See Results' : 'Next Question';
      nextBtn?.classList.remove('hidden');
    }
  }

  function advanceQuiz() {
    const isLast = STATE.quiz.idx === STATE.quiz.questions.length - 1;
    if (isLast) {
      showQuizScore();
    } else {
      STATE.quiz.idx++;
      renderQuizQuestion(STATE.quiz.idx);
      updateQuizMascot(rand(QUIZ_ENCOURAGE_MSGS), '🤓');
    }
  }

  function updateQuizMascot(msg, emoji) {
    const em = document.getElementById('qmbEmoji');
    const bb = document.getElementById('qmbBubble');
    if (em) { em.textContent = emoji; em.style.animation = 'none'; setTimeout(() => em.style.animation = '', 50); }
    if (bb) bb.textContent = msg;
  }

  function showQuizScore() {
    const score = STATE.quiz.score;
    const total = STATE.quiz.questions.length;
    const pct   = total > 0 ? Math.round(score / total * 100) : 0;

    document.getElementById('activeQuizArea')?.classList.add('hidden');
    document.getElementById('quizScoreScreen')?.classList.remove('hidden');

    // Score ring animation
    const circumference = 188.5;
    const offset = circumference - (pct / 100) * circumference;
    setTimeout(() => {
      const ring = document.getElementById('scoreRingProgress');
      if (ring) {
        const color = pct >= 80 ? '#56e09e' : pct >= 50 ? '#ffd166' : '#ff6b6b';
        ring.style.stroke = color;
        ring.style.strokeDashoffset = offset;
      }
    }, 100);

    setTextById('scoreFractionText', `${score} / ${total}`);
    setTextById('ringPctLabel', `${pct}%`);

    let mascot = '🎉', title = 'Quiz Complete!', msg = '';
    if (pct === 100) { mascot='🏆'; title='Perfect Score! Amazing!'; msg='You got everything right! You\'re a true scholar! 🌟'; }
    else if (pct >= 80) { mascot='🎊'; title='Excellent Work!'; msg='Great job! You really know this topic! 💪'; }
    else if (pct >= 60) { mascot='😊'; title='Good Effort!'; msg='You\'re getting there! Review and try again! 📖'; }
    else if (pct >= 40) { mascot='💙'; title='Keep Practicing!'; msg='Don\'t give up! Review the explanations and retry! 🌱'; }
    else { mascot='😤'; title='Let\'s Try Again!'; msg='Every mistake is a learning opportunity! You\'ve got this! ⚡'; }

    setTextById('scoreMascotBig',   mascot);
    setTextById('scoreScreenH2',    title);
    setTextById('scoreMessageText', msg);

    // Confetti for good scores
    if (pct >= 80 && typeof confetti === 'function') {
      confetti({ particleCount:100, spread:70, origin:{y:0.6}, colors:['#ff6eb4','#b06ef7','#5ecbff','#56e09e','#ffd166'] });
    }

    // Save to history
    const record = {
      id: uid(),
      date: new Date().toISOString(),
      score, total,
      topic: STATE.quiz.topic,
      difficulty: STATE.quiz.diff,
    };
    STATE.quizHistory.push(record);
    saveState();
    checkAchievements();
    updateStreak();
  }

  // =========================================================================
  // HISTORY VIEW
  // =========================================================================
  function refreshHistory() {
    const tab  = STATE.histTab;
    const search = (document.getElementById('histSearchInput')?.value || '').toLowerCase();
    const subject = document.getElementById('histSubjectFilter')?.value || 'all';
    const date    = document.getElementById('histDateFilter')?.value    || 'all';
    const sort    = document.getElementById('histSortFilter')?.value    || 'newest';

    let qs = tab === 'saved' ? STATE.questions.filter(q => q.saved) : STATE.questions;

    // Search filter
    if (search) qs = qs.filter(q => q.question.toLowerCase().includes(search));
    // Subject filter
    if (subject !== 'all') qs = qs.filter(q => q.subject === subject);
    // Date filter
    if (date !== 'all') {
      const now = new Date();
      qs = qs.filter(q => {
        const d = new Date(q.askedAt);
        if (date === 'today')  return d.toDateString() === now.toDateString();
        if (date === 'week')   { const w = new Date(now); w.setDate(w.getDate()-7); return d >= w; }
        if (date === 'month')  { const m = new Date(now); m.setDate(m.getDate()-30); return d >= m; }
        return true;
      });
    }
    // Sort
    qs = qs.sort((a,b) => sort === 'newest' ? new Date(b.askedAt)-new Date(a.askedAt) : new Date(a.askedAt)-new Date(b.askedAt));

    // Count
    const countEl = document.getElementById('histResultsCount');
    if (countEl) countEl.textContent = `${qs.length} question${qs.length!==1?'s':''}`;

    const list  = document.getElementById('historyItemsList');
    const empty = document.getElementById('historyEmptyState');
    if (!list) return;

    if (!qs.length) {
      list.innerHTML = '';
      empty?.classList.remove('hidden');
      return;
    }
    empty?.classList.add('hidden');

    list.innerHTML = qs.map(q => {
      const saveIcon = q.saved ? '🔖' : '';
      const subjBadge = `${SUBJECT_EMOJIS[q.subject]||'📚'} ${q.subject}`;
      return `<div class="hist-item" data-id="${q.id}">
        <div class="hist-item-top">
          <div class="hist-item-emoji">${SUBJECT_EMOJIS[q.subject]||'📚'}</div>
          <div class="hist-item-q">${esc(q.question)}</div>
          <div class="hist-item-saved-icon">${saveIcon}</div>
        </div>
        <div class="hist-item-meta">
          <span class="hist-subj-badge">${subjBadge}</span>
          <span class="hist-date-text">${fmtDate(q.askedAt)}</span>
          <span class="hist-status-badge status-done">✓ Answered</span>
        </div>
        <div class="hist-item-actions">
          <button class="hist-act-btn btn-view"    data-id="${q.id}">👁️ View Answer</button>
          <button class="hist-act-btn btn-practice" data-id="${q.id}">🎮 Practice</button>
          <button class="hist-act-btn btn-save"    data-id="${q.id}">${q.saved ? '🔖 Unsave' : '🔖 Save'}</button>
          <button class="hist-act-btn btn-delete"  data-id="${q.id}">🗑️ Delete</button>
        </div>
      </div>`;
    }).join('');

    list.querySelectorAll('.btn-view').forEach(b => b.addEventListener('click', () => reopenQuestion(b.dataset.id)));
    list.querySelectorAll('.btn-practice').forEach(b => b.addEventListener('click', () => practiceFromHistory(b.dataset.id)));
    list.querySelectorAll('.btn-save').forEach(b => b.addEventListener('click', () => toggleSaveQuestion(b.dataset.id)));
    list.querySelectorAll('.btn-delete').forEach(b => b.addEventListener('click', () => deleteQuestion(b.dataset.id)));
  }

  function toggleSaveQuestion(id) {
    const q = STATE.questions.find(x => x.id === id);
    if (!q) return;
    q.saved = !q.saved;
    saveState();
    refreshHistory();
    checkAchievements();
    showToast(q.saved ? 'Question saved! 🔖' : 'Question unsaved', q.saved ? 'success' : 'info');
  }

  function deleteQuestion(id) {
    showConfirm('Delete Question?', 'This will remove the question from your history permanently.', () => {
      STATE.questions = STATE.questions.filter(q => q.id !== id);
      saveState();
      refreshHistory();
      showToast('Question deleted.', 'info');
    });
  }

  function practiceFromHistory(id) {
    const q = STATE.questions.find(x => x.id === id);
    if (!q) return;
    navigate('quizView');
    setTimeout(() => {
      const sel = document.getElementById('quizTopicSelect');
      if (sel) sel.value = q.subject;
    }, 100);
    showToast(`Generating quiz on: ${q.subject}`, 'info');
  }

  // =========================================================================
  // PROFILE VIEW
  // =========================================================================
  function refreshProfile() {
    const s = STATE.settings;
    const inp = document.getElementById('profileNameInput');
    if (inp) inp.value = s.userName;
    const bigAv = document.getElementById('profileBigAvatar');
    if (bigAv) bigAv.textContent = s.avatar || '👩‍🎓';
    const bnavAv = document.getElementById('bnavProfileEmoji');
    if (bnavAv) bnavAv.textContent = s.avatar || '👩‍🎓';

    // Avatar picker
    document.querySelectorAll('.av-btn').forEach(b => {
      b.classList.toggle('selected', b.dataset.av === s.avatar);
    });

    // Theme buttons
    document.getElementById('darkModeBtn')?.classList.toggle('active', s.theme === 'dark');
    document.getElementById('lightModeBtn')?.classList.toggle('active', s.theme === 'light');

    // API key status
    const apiStatus = document.getElementById('apiKeyStatusMsg');
    if (apiStatus) {
      if (s.apiKey) {
        apiStatus.textContent = '✅ API key saved — Live AI mode active!';
        apiStatus.style.color = 'var(--green)';
      } else {
        apiStatus.textContent = '⚠️ No API key — using demo mode';
        apiStatus.style.color = 'var(--yellow)';
      }
    }

    // Model select
    const modelSel = document.getElementById('aiModelSelect');
    if (modelSel) modelSel.value = s.model;

    // Stats
    const totalMins = STATE.sessions.reduce((a,b) => a+b.minutes, 0) + Math.floor(STATE.timer.elapsed/60);
    setTextById('pscQuestions', STATE.questions.length);
    setTextById('pscStreak',    STATE.streak.current);
    setTextById('pscQuizzes',   STATE.quizHistory.length);
    setTextById('pscHours',     fmtHoursMinutes(totalMins));

    // Weekly/Monthly hours
    const now = new Date();
    const weekAgo  = new Date(now); weekAgo.setDate(weekAgo.getDate()-7);
    const monthAgo = new Date(now); monthAgo.setDate(monthAgo.getDate()-30);
    const wkMins  = STATE.sessions.filter(s => new Date(s.date) >= weekAgo).reduce((a,b)=>a+b.minutes,0);
    const moMins  = STATE.sessions.filter(s => new Date(s.date) >= monthAgo).reduce((a,b)=>a+b.minutes,0);
    setTextById('dsWeekHours',  fmtHoursMinutes(wkMins));
    setTextById('dsMonthHours', fmtHoursMinutes(moMins));

    // Quiz stats
    if (STATE.quizHistory.length) {
      const avg  = Math.round(STATE.quizHistory.reduce((a,h) => a + (h.total>0?h.score/h.total*100:0), 0) / STATE.quizHistory.length);
      const best = Math.max(...STATE.quizHistory.map(h => h.total>0?Math.round(h.score/h.total*100):0));
      setTextById('dsAvgScore',  `${avg}%`);
      setTextById('dsBestScore', `${best}%`);
    } else {
      setTextById('dsAvgScore', '—'); setTextById('dsBestScore', '—');
    }

    // Achievements
    renderAchievements();
  }

  function renderAchievements() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;
    grid.innerHTML = ACHIEVEMENTS.map(a => {
      const unlocked = a.check(STATE);
      return `<div class="achievement-item ${unlocked ? 'unlocked' : 'locked'}" title="${a.desc}">
        <div class="ach-emoji">${a.emoji}</div>
        <div class="ach-name">${a.name}</div>
      </div>`;
    }).join('');
  }

  function checkAchievements() {
    ACHIEVEMENTS.forEach(a => {
      const wasUnlocked = (STATE.unlocked || {})[a.id];
      if (!wasUnlocked && a.check(STATE)) {
        if (!STATE.unlocked) STATE.unlocked = {};
        STATE.unlocked[a.id] = true;
        showToast(`🏆 Achievement unlocked: ${a.name}!`, 'success', 4000);
      }
    });
  }

  function applyTheme(theme) {
    STATE.settings.theme = theme;
    document.body.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.getElementById('themeToggleIcon');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    document.getElementById('darkModeBtn')?.classList.toggle('active',  theme === 'dark');
    document.getElementById('lightModeBtn')?.classList.toggle('active', theme === 'light');
    saveState();
  }

  // =========================================================================
  // EVENT LISTENERS
  // =========================================================================
  function bindEvents() {
    // Bottom nav
    document.querySelectorAll('.bnav-item').forEach(btn => {
      btn.addEventListener('click', () => navigate(btn.dataset.view));
    });

    // Home quick buttons
    document.getElementById('greetAskBtn')?.addEventListener('click',  () => navigate('askView'));
    document.getElementById('greetQuizBtn')?.addEventListener('click', () => navigate('quizView'));
    document.getElementById('homeAskAiBtn')?.addEventListener('click', () => navigate('askView'));
    document.getElementById('homeStartQuizBtn')?.addEventListener('click', () => navigate('quizView'));
    document.getElementById('quickAskBtn')?.addEventListener('click',     () => navigate('askView'));
    document.getElementById('quickVoiceBtn')?.addEventListener('click',   () => { navigate('askView'); setTimeout(startVoiceInput, 200); });
    document.getElementById('quickQuizBtn')?.addEventListener('click',    () => navigate('quizView'));
    document.getElementById('quickHistoryBtn')?.addEventListener('click', () => navigate('historyView'));
    document.getElementById('seeAllHistLink')?.addEventListener('click',  () => navigate('historyView'));
    document.getElementById('seeAllSavedLink')?.addEventListener('click', () => { STATE.histTab='saved'; navigate('historyView'); });
    document.getElementById('emptyAskBtn')?.addEventListener('click',    () => navigate('askView'));
    document.getElementById('histAskBtn')?.addEventListener('click',     () => navigate('askView'));

    // Header
    document.getElementById('themeToggleBtn')?.addEventListener('click', () => {
      applyTheme(STATE.settings.theme === 'dark' ? 'light' : 'dark');
    });

    // Chart period
    document.getElementById('periodWeekBtn')?.addEventListener('click',  () => { STATE.chartPeriod='week';  document.getElementById('periodWeekBtn').classList.add('active'); document.getElementById('periodMonthBtn').classList.remove('active'); renderActivityChart(); });
    document.getElementById('periodMonthBtn')?.addEventListener('click', () => { STATE.chartPeriod='month'; document.getElementById('periodMonthBtn').classList.add('active'); document.getElementById('periodWeekBtn').classList.remove('active'); renderActivityChart(); });

    // Subject chips (Ask AI)
    document.querySelectorAll('.subj-chip').forEach(chip => {
      chip.addEventListener('click', () => setSubject(chip.dataset.subject));
    });

    // Sample question chips
    document.querySelectorAll('.sample-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const ta = document.getElementById('questionTextarea');
        if (ta) { ta.value = chip.dataset.q; updateCharCount(chip.dataset.q.length); ta.focus(); }
      });
    });

    // Question textarea char count
    const ta = document.getElementById('questionTextarea');
    ta?.addEventListener('input', () => updateCharCount(ta.value.length));

    // Ask AI button
    document.getElementById('askAiBtn')?.addEventListener('click', handleAskQuestion);
    ta?.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) handleAskQuestion(); });

    // Voice mic button
    document.getElementById('voiceMicBtn')?.addEventListener('click', startVoiceInput);
    document.getElementById('voiceStopBtn')?.addEventListener('click', stopVoiceInput);

    // Answer action buttons
    document.getElementById('saveQuestionBtn')?.addEventListener('click',  saveCurrentQuestion);
    document.getElementById('listenBtn')?.addEventListener('click',         listenAnswer);
    document.getElementById('practiceTopicBtn')?.addEventListener('click', () => {
      const subj = STATE.lastAnswer?.subject || 'General';
      navigate('quizView');
      setTimeout(() => { const sel = document.getElementById('quizTopicSelect'); if (sel) sel.value = subj; }, 100);
    });

    // Quiz
    document.getElementById('startQuizBtn')?.addEventListener('click', startQuiz);
    document.getElementById('quizNextBtn')?.addEventListener('click', advanceQuiz);
    document.getElementById('retryQuizBtn')?.addEventListener('click', () => {
      document.getElementById('quizScoreScreen')?.classList.add('hidden');
      document.getElementById('quizSetupPanel')?.classList.remove('hidden');
    });
    document.getElementById('newQuizBtn')?.addEventListener('click', () => {
      document.getElementById('quizScoreScreen')?.classList.add('hidden');
      document.getElementById('quizSetupPanel')?.classList.remove('hidden');
    });

    // Difficulty chips
    document.querySelectorAll('#diffChips .conf-chip').forEach(c => {
      c.addEventListener('click', () => { document.querySelectorAll('#diffChips .conf-chip').forEach(x => x.classList.remove('active')); c.classList.add('active'); });
    });
    // Qty chips
    document.querySelectorAll('#qtyChips .conf-chip').forEach(c => {
      c.addEventListener('click', () => { document.querySelectorAll('#qtyChips .conf-chip').forEach(x => x.classList.remove('active')); c.classList.add('active'); });
    });

    // History tabs
    document.getElementById('histTabAll')?.addEventListener('click',   () => { STATE.histTab='all';   document.getElementById('histTabAll').classList.add('active');   document.getElementById('histTabSaved').classList.remove('active');  refreshHistory(); });
    document.getElementById('histTabSaved')?.addEventListener('click', () => { STATE.histTab='saved'; document.getElementById('histTabSaved').classList.add('active'); document.getElementById('histTabAll').classList.remove('active');    refreshHistory(); });

    // History filters
    ['histSearchInput','histSubjectFilter','histDateFilter','histSortFilter'].forEach(id => {
      document.getElementById(id)?.addEventListener('input',  refreshHistory);
      document.getElementById(id)?.addEventListener('change', refreshHistory);
    });

    // Profile
    document.getElementById('saveProfileBtn')?.addEventListener('click', () => {
      const name = document.getElementById('profileNameInput')?.value.trim() || 'Scholar';
      STATE.settings.userName = name;
      saveState();
      setTextById('greetingName', name);
      showToast('Profile saved! 🌸', 'success');
    });

    document.querySelectorAll('.av-btn').forEach(b => {
      b.addEventListener('click', () => {
        STATE.settings.avatar = b.dataset.av;
        saveState();
        document.getElementById('profileBigAvatar').textContent = b.dataset.av;
        document.getElementById('homeMascotEmoji').textContent  = b.dataset.av;
        document.getElementById('bnavProfileEmoji').textContent = b.dataset.av;
        document.querySelectorAll('.av-btn').forEach(x => x.classList.remove('selected'));
        b.classList.add('selected');
        showToast('Avatar updated! 😊', 'success');
      });
    });

    document.getElementById('darkModeBtn')?.addEventListener('click',  () => applyTheme('dark'));
    document.getElementById('lightModeBtn')?.addEventListener('click', () => applyTheme('light'));

    document.getElementById('saveApiKeyBtn')?.addEventListener('click', () => {
      const key = document.getElementById('apiKeySettingInput')?.value.trim() || '';
      STATE.settings.apiKey = key;
      saveState();
      refreshProfile();
      showToast(key ? 'API key saved! 🔑 Live AI mode active!' : 'API key cleared.', key ? 'success' : 'info');
    });

    document.getElementById('aiModelSelect')?.addEventListener('change', e => {
      STATE.settings.model = e.target.value;
      saveState();
      showToast(`Model set to: ${e.target.value} ✅`, 'info');
    });

    document.getElementById('clearAllDataBtn')?.addEventListener('click', () => {
      showConfirm('Clear All Data?', 'This will permanently delete all your questions, quiz history, and progress.', () => {
        STATE.questions   = [];
        STATE.quizHistory = [];
        STATE.sessions    = [];
        STATE.streak      = { current:0, best:0, lastDate:null };
        STATE.voiceUsed   = 0;
        saveState();
        refreshHome();
        refreshProfile();
        showToast('All data cleared! Starting fresh! 🌱', 'info');
      });
    });

    // Confirm modal
    document.getElementById('confCancelBtn')?.addEventListener('click', () => {
      document.getElementById('confirmModalBackdrop')?.classList.add('hidden');
      STATE.confirmCallback = null;
    });
    document.getElementById('confOkBtn')?.addEventListener('click', () => {
      document.getElementById('confirmModalBackdrop')?.classList.add('hidden');
      if (STATE.confirmCallback) { STATE.confirmCallback(); STATE.confirmCallback = null; }
    });

    // Study timer toggle
    document.getElementById('stwToggleBtn')?.addEventListener('click', () => {
      if (STATE.timer.running) pauseTimer(); else startTimer();
    });

    // Lucide icons init
    if (window.lucide) window.lucide.createIcons();
  }

  function updateCharCount(len) {
    const el = document.getElementById('charCounter');
    if (el) {
      el.textContent = `${len} / 300`;
      el.style.color = len > 280 ? 'var(--red)' : len > 240 ? 'var(--yellow)' : 'var(--text-muted)';
    }
  }

  // =========================================================================
  // GREETING TIME-OF-DAY
  // =========================================================================
  function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  // =========================================================================
  // INIT
  // =========================================================================
  function init() {
    loadState();
    applyTheme(STATE.settings.theme || 'dark');

    // Greeting
    const badgeEl = document.querySelector('.greeting-badge-pill');
    if (badgeEl) badgeEl.textContent = `🌸 ${getGreeting()}!`;

    // Header streak
    updateHeaderStreak();

    // Avatar sync
    const bnavAv = document.getElementById('bnavProfileEmoji');
    if (bnavAv) bnavAv.textContent = STATE.settings.avatar || '👩‍🎓';

    // API key status in profile
    const apiInp = document.getElementById('apiKeySettingInput');
    if (apiInp && STATE.settings.apiKey) apiInp.value = STATE.settings.apiKey;

    // Start session timer
    startTimer();

    // Sakura canvas
    initSakuraCanvas();

    // Events
    bindEvents();

    // Lucide icons
    if (window.lucide) window.lucide.createIcons();

    // Initial home refresh
    refreshHome();

    // Check streak
    updateStreak();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
