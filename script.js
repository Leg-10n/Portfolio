// File System Structure
const fileSystem = {
    '/home/kevin/portfolio': {
        'about.txt': 'about',
        'skills.txt': 'skills',
        'experience.txt': 'experience',
        'projects.txt': 'projects',
        'education.txt': 'education',
        'contact.txt': 'contact'
    }
};

let currentDirectory = '~';

// Resume Data
const resumeData = {
    about: {
        name: "Kevin Monga",
        title: "Backend / Full-Stack Software Engineer",
        location: "Bangkok, Thailand",
        email: "kevin.monga17@gmail.com",
        phone: "+66-633799013",
        summary: "Backend-focused Computer Science undergraduate with proven experience building and deploying production-grade, real-time systems. Specialized in designing scalable REST APIs, asynchronous pipelines, and containerized services supporting 100+ concurrent users."
    },
    skills: {
        languages: ["Python", "Java", "JavaScript", "TypeScript", "Scala", "Rust", "C"],
        backend: ["FastAPI", "Spring Boot", "Django", "Node.js", "Express.js"],
        frontend: ["React", "Vue.js", "Angular"],
        apis: ["RESTful APIs", "WebSockets", "JWT Authentication", "OAuth"],
        databases: ["PostgreSQL", "MySQL"],
        devops: ["Docker", "Git", "GitHub Actions", "CI/CD", "Pytest", "SonarQube"],
        data: ["Pandas", "NumPy", "scikit-learn"],
        cv: ["OpenCV", "YOLO"],
        spoken: ["English (Fluent)", "Thai (Fluent)", "Hindi (Fluent)"]
    },
    experience: [
        {
            title: "Software Engineer Intern",
            company: "The Gang Technology Co., Ltd.",
            location: "Bangkok, Thailand",
            period: "Aug 2025 – Dec 2025",
            highlights: [
                "Owned end-to-end development of two production Smart Office systems",
                "Built real-time vehicle detection backend using Python, OpenCV, and YOLO",
                "Delivered parking availability updates to 100+ daily active users",
                "Developed computer-vision-based occupancy detection",
                "Reduced false-positive detections by 30%+",
                "Containerized backend services using Docker",
                "Secured APIs with JWT authentication"
            ]
        }
    ],
    projects: [
        {
            name: "Movie Recommendation System",
            tech: ["Python", "Django", "scikit-learn", "React"],
            description: "Built an end-to-end personalized recommendation platform with collaborative filtering and content-based algorithms."
        },
        {
            name: "Cryptocurrency Portfolio Tracking Platform",
            tech: ["FastAPI", "React", "PostgreSQL"],
            description: "Developed a full-stack platform for tracking cryptocurrency investments in real time with historical analytics."
        },
        {
            name: "Real-Time Video Streaming Platform",
            tech: ["FastAPI", "React", "AWS S3", "WebSockets"],
            description: "Built a distributed backend supporting video uploads, asynchronous processing, and real-time notifications."
        },
        {
            name: "Game Analytics & Logging Platform",
            tech: ["Spring Boot", "Vue.js"],
            description: "Designed backend services to ingest high-frequency game events with real-time analytics dashboards."
        }
    ],
    education: [
        {
            degree: "B.Sc. Computer Science",
            institution: "Mahidol University International College",
            period: "Apr 2022 – Apr 2026"
        },
        {
            degree: "Full-Stack Web Development Bootcamp",
            institution: "AISE Bootcamp"
        }
    ],
    contact: {
        email: "kevin.monga17@gmail.com",
        phone: "+66-633799013",
        github: "github.com/kevinmonga",
        linkedin: "linkedin.com/in/kevinmonga",
        location: "Bangkok, Thailand"
    }
};

// Terminal State
let commandHistory = [];
let historyIndex = -1;

// Mode Toggle Elements
const modeToggle = document.getElementById('modeToggle');
const portfolioView = document.getElementById('portfolioView');
const terminalView = document.getElementById('terminalView');
const terminalInput = document.getElementById('terminalInput');
const terminalContainer = document.getElementById('terminalContainer');
const portfolioLabel = document.getElementById('portfolioLabel');
const terminalLabel = document.getElementById('terminalLabel');

// Terminal Commands
const commands = {
    help: () => {
        return `<span class="terminal-success">Available Commands:</span>

<span class="section-divider">═══ RESUME COMMANDS ═══</span>
  about           Display professional summary and contact info
  skills          List all technical skills
  experience      Show work experience
  projects        List all projects
  education       Display education background
  contact         Show contact information
  
<span class="section-divider">═══ FILE SYSTEM COMMANDS ═══</span>
  ls              List directory contents
  pwd             Print working directory
  cd [dir]        Change directory
  cat [file]      Display file contents
  tree            Display directory tree
  
<span class="section-divider">═══ SYSTEM COMMANDS ═══</span>
  clear           Clear terminal screen
  help            Show this help message
  whoami          Display current user
  date            Show current date and time
  echo [text]     Print text to terminal
  history         Show command history
  banner          Display ASCII banner
  uname           Show system information
  
<span class="command-hint">Tip: Use arrow keys to navigate command history</span>`;
    },

    about: () => {
        const { name, title, location, summary } = resumeData.about;
        return `<span class="terminal-success">╔═══════════════════════════════════════╗</span>
<span class="terminal-success">║        PROFESSIONAL SUMMARY           ║</span>
<span class="terminal-success">╚═══════════════════════════════════════╝</span>

<span style="color: var(--terminal-amber)">Name:</span>     ${name}
<span style="color: var(--terminal-amber)">Title:</span>    ${title}
<span style="color: var(--terminal-amber)">Location:</span> ${location}

<span style="color: var(--terminal-amber)">Summary:</span>
${summary}`;
    },

    skills: () => {
        let output = `<span class="terminal-success">╔═══════════════════════════════════════╗</span>
<span class="terminal-success">║          TECHNICAL SKILLS             ║</span>
<span class="terminal-success">╚═══════════════════════════════════════╝</span>
`;
        
        for (const [category, skills] of Object.entries(resumeData.skills)) {
            const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
            output += `
<span style="color: var(--terminal-amber)">${categoryName}:</span>
  ${skills.join(', ')}
`;
        }
        
        return output;
    },

    experience: () => {
        let output = `<span class="terminal-success">╔═══════════════════════════════════════╗</span>
<span class="terminal-success">║         WORK EXPERIENCE               ║</span>
<span class="terminal-success">╚═══════════════════════════════════════╝</span>
`;
        
        resumeData.experience.forEach((exp, index) => {
            output += `
<span style="color: var(--terminal-amber)">${exp.title}</span>
<span style="color: #fff">${exp.company}</span> | ${exp.location}
<span style="color: #888">${exp.period}</span>

Key Highlights:
`;
            exp.highlights.forEach(highlight => {
                output += `  ▹ ${highlight}\n`;
            });
        });
        
        return output;
    },

    projects: () => {
        let output = `<span class="terminal-success">╔═══════════════════════════════════════╗</span>
<span class="terminal-success">║             PROJECTS                  ║</span>
<span class="terminal-success">╚═══════════════════════════════════════╝</span>
`;
        
        resumeData.projects.forEach((project, index) => {
            output += `
<span style="color: var(--terminal-amber)">${index + 1}. ${project.name}</span>
   ${project.description}
   <span style="color: #888">Tech:</span> ${project.tech.join(', ')}
`;
        });
        
        return output;
    },

    education: () => {
        let output = `<span class="terminal-success">╔═══════════════════════════════════════╗</span>
<span class="terminal-success">║            EDUCATION                  ║</span>
<span class="terminal-success">╚═══════════════════════════════════════╝</span>
`;
        
        resumeData.education.forEach(edu => {
            output += `
<span style="color: var(--terminal-amber)">${edu.degree}</span>
<span style="color: #fff">${edu.institution}</span>
${edu.period ? `<span style="color: #888">${edu.period}</span>` : ''}
`;
        });
        
        return output;
    },

    contact: () => {
        const { email, phone, github, linkedin, location } = resumeData.contact;
        return `<span class="terminal-success">╔═══════════════════════════════════════╗</span>
<span class="terminal-success">║          CONTACT INFORMATION          ║</span>
<span class="terminal-success">╚═══════════════════════════════════════╝</span>

<span style="color: var(--terminal-amber)">Email:</span>    ${email}
<span style="color: var(--terminal-amber)">Phone:</span>    ${phone}
<span style="color: var(--terminal-amber)">GitHub:</span>   ${github}
<span style="color: var(--terminal-amber)">LinkedIn:</span> ${linkedin}
<span style="color: var(--terminal-amber)">Location:</span> ${location}`;
    },

    whoami: () => {
        return `kevin`;
    },

    date: () => {
        return new Date().toString();
    },

    clear: () => {
        document.getElementById('terminalOutput').innerHTML = '';
        return null;
    },

    history: () => {
        if (commandHistory.length === 0) {
            return 'No command history.';
        }
        return commandHistory.map((cmd, i) => `  ${i + 1}  ${cmd}`).join('\n');
    },

    banner: () => {
        return `<div class="ascii-art" style="color: var(--terminal-green)">
   ▄█   ▄█▄     ▄████████  ▄█    █▄    ▄█  ███▄▄▄▄    
  ███ ▄███▀    ███     ███ ███    ███ ███  ███▀▀▀██▄  
  ███▐██▀      ███     █▀  ███    ███ ███▌ ███   ███  
 ▄█████▀      ▄███▄▄▄      ███    ███ ███▌ ███   ███  
▀▀█████▄     ▀▀███▀▀▀      ███    ███ ███▌ ███   ███  
  ███▐██▄      ███     █▄  ███    ███ ███  ███   ███  
  ███ ▀███▄    ███     ███ ███    ███ ███  ███   ███  
  ███   ▀█▀    ██████████  ▀██████▀  █▀    ▀█   █▀    
  ▀                                                   
</div>
<span style="color: var(--terminal-amber)">Backend Engineer | System Architect</span>
<span style="color: #888">Type 'help' for available commands</span>`;
    },

    echo: (args) => {
        return args.join(' ');
    },

    ls: (args) => {
        if (currentDirectory === '~') {
            return `<span style="color: var(--terminal-green)">portfolio/</span>`;
        } else if (currentDirectory === '~/portfolio') {
            const files = fileSystem['/home/kevin/portfolio'];
            const fileList = Object.keys(files).map(file => {
                return `<span style="color: var(--terminal-green)">${file}</span>`;
            }).join('  ');
            return fileList;
        }
        
        return `<span class="terminal-error">ls: cannot access directory</span>`;
    },

    pwd: () => {
        return currentDirectory;
    },

    cd: (args) => {
        if (args.length === 0 || args[0] === '~') {
            currentDirectory = '~';
            updatePrompt();
            return null;
        }

        const target = args[0];
        
        if (target === 'portfolio' && currentDirectory === '~') {
            currentDirectory = '~/portfolio';
            updatePrompt();
            return null;
        }
        
        if (target === '..' && currentDirectory === '~/portfolio') {
            currentDirectory = '~';
            updatePrompt();
            return null;
        }
        
        if (target === '..') {
            return `<span class="terminal-error">cd: ${target}: Already at home directory</span>`;
        }

        return `<span class="terminal-error">cd: ${target}: No such file or directory</span>`;
    },

    cat: (args) => {
        if (args.length === 0) {
            return `<span class="terminal-error">cat: missing file operand</span>`;
        }

        const filename = args[0];
        
        if (currentDirectory === '~') {
            return `<span class="terminal-error">cat: ${filename}: No such file or directory</span>`;
        }
        
        const files = fileSystem['/home/kevin/portfolio'];

        if (!files || !files[filename]) {
            return `<span class="terminal-error">cat: ${filename}: No such file or directory</span>`;
        }

        const commandName = files[filename];
        return commands[commandName]();
    },

    tree: () => {
        return `<span style="color: #888">~</span>
└── <span style="color: var(--terminal-green)">portfolio/</span>
    ├── <span style="color: var(--terminal-green)">about.txt</span>
    ├── <span style="color: var(--terminal-green)">skills.txt</span>
    ├── <span style="color: var(--terminal-green)">experience.txt</span>
    ├── <span style="color: var(--terminal-green)">projects.txt</span>
    ├── <span style="color: var(--terminal-green)">education.txt</span>
    └── <span style="color: var(--terminal-green)">contact.txt</span>

<span style="color: #666">1 directory, 6 files</span>`;
    },

    uname: () => {
        return `Linux portfolio 5.15.0-kevin x86_64`;
    }
};

function updatePrompt() {
    const prompts = document.querySelectorAll('.terminal-input-prompt');
    const displayDir = currentDirectory;
    prompts.forEach(prompt => {
        prompt.textContent = `kevin@portfolio:${displayDir}$`;
    });
    
    // Update titlebar
    const titlebar = document.getElementById('terminalTitle');
    if (titlebar) {
        titlebar.textContent = `kevin@portfolio: ${displayDir}`;
    }
}

// Process Command
function processCommand(input) {
    const parts = input.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (commands[cmd]) {
        return commands[cmd](args);
    } else if (cmd === '') {
        return null;
    } else {
        return `<span class="terminal-error">bash: ${cmd}: command not found</span>`;
    }
}

// Add Output to Terminal
function addOutput(command, output) {
    const terminalOutput = document.getElementById('terminalOutput');
    
    // Add command line with current directory in prompt
    const commandLine = document.createElement('div');
    commandLine.className = 'terminal-line';
    const promptText = `kevin@portfolio:${currentDirectory}$`;
    commandLine.innerHTML = `<span style="color: var(--terminal-green); text-shadow: 0 0 5px rgba(0, 255, 65, 0.5); margin-right: 8px;">${promptText}</span> <span class="terminal-command">${command}</span>`;
    terminalOutput.appendChild(commandLine);

    // Add output if exists
    if (output !== null) {
        const outputLine = document.createElement('div');
        outputLine.className = 'terminal-line';
        const responseDiv = document.createElement('div');
        responseDiv.className = 'terminal-response';
        responseDiv.innerHTML = output;
        outputLine.appendChild(responseDiv);
        terminalOutput.appendChild(outputLine);
    }

    // Add spacing
    const spacer = document.createElement('div');
    spacer.className = 'terminal-line';
    terminalOutput.appendChild(spacer);

    // Scroll to bottom
    const terminalContainer = document.getElementById('terminalContainer');
    terminalContainer.scrollTop = terminalContainer.scrollHeight;
}

// --- EVENT LISTENERS ---

// 1. Mobile Keyboard Fix: Force scroll to bottom when input is tapped
terminalInput.addEventListener('focus', () => {
    setTimeout(() => {
        terminalInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        terminalContainer.scrollTop = terminalContainer.scrollHeight;
    }, 300);
});

// 2. Mode Toggle Logic
modeToggle.addEventListener('click', () => {
    modeToggle.classList.toggle('active');
    
    if (modeToggle.classList.contains('active')) {
        // OPEN TERMINAL
        portfolioView.classList.add('hidden');
        terminalView.classList.add('active');
        portfolioLabel.classList.remove('active');
        terminalLabel.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock body scroll
        
        // Boot Sequence Logic
        const output = document.getElementById('terminalOutput');
        if (output.children.length === 0) {
             const banner = commands.banner();
             output.innerHTML = `<div class="terminal-line"><span class="terminal-response">${banner}</span></div><div class="terminal-line"></div>`;
        }

        // Focus input immediately
        setTimeout(() => {
            terminalInput.focus();
            terminalContainer.scrollTop = terminalContainer.scrollHeight;
            updatePrompt();
        }, 100);
        
    } else {
        // OPEN PORTFOLIO
        portfolioView.classList.remove('hidden');
        terminalView.classList.remove('active');
        portfolioLabel.classList.add('active');
        terminalLabel.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore body scroll
    }
});

// 3. Handle Enter Key
terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value;
        if (input.trim()) {
            commandHistory.push(input);
            historyIndex = commandHistory.length;
            const output = processCommand(input); 
            addOutput(input, output);
        }
        terminalInput.value = '';
        
        // Keep focus on mobile
        terminalInput.focus();
        // Force scroll to bottom
        setTimeout(() => {
            terminalContainer.scrollTop = terminalContainer.scrollHeight;
        }, 10);
    } 
    // Handle Arrow Keys for history
    else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyIndex > 0) {
            historyIndex--;
            terminalInput.value = commandHistory[historyIndex];
        }
    } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
            historyIndex++;
            terminalInput.value = commandHistory[historyIndex];
        } else {
            historyIndex = commandHistory.length;
            terminalInput.value = '';
        }
    } else if (e.key === 'Tab') {
        e.preventDefault();
        const input = terminalInput.value.toLowerCase();
        const matches = Object.keys(commands).filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            terminalInput.value = matches[0];
        }
    }
});

// Scroll indicator
window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('scrollIndicator').style.width = scrolled + '%';
});

// Custom cursor glow
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});