# Resources & Information Scarcity Platform

## NWED513 Group Assignment 2026

A modern, responsive web application designed to connect university students with essential resources, food support, and educational opportunities. This platform addresses resource scarcity issues by leveraging ICT solutions to provide transparent, efficient, and accessible support systems.

---

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Live Demo](#live-demo)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [System Architecture](#system-architecture)
- [API Integration](#api-integration)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Testing](#testing)
- [Contributing](#contributing)
- [Group Members](#group-members)
- [License](#license)

---

## 🎯 Project Overview

### Problem Statement

University life presents significant challenges, particularly for self-funded students who must balance academic responsibilities with financial pressures. Access to affordable food parcels and basic necessities is often limited, leaving students vulnerable to hunger, stress, and reduced academic performance. Women face additional challenges in securing essential menstrual products that support their wellbeing and dignity.

### Solution

This platform demonstrates how Information and Communication Technology can bridge critical resource gaps by:

- Automating resource distribution and tracking
- Ensuring transparent, fair allocation of limited resources
- Providing real-time access to available support services
- Creating scalable solutions that can serve growing student populations
- Reducing stigma through anonymous, accessible digital interfaces

---

## ✨ Features

### Core Features

- **User Authentication**: Secure login and registration system with localStorage persistence
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- **Hero Slider**: Auto-rotating carousel showcasing key services
- **Service Cards**: Expandable cards with detailed information about each service
- **API Integration**: Real-time data fetching from JSONPlaceholder REST API
- **Contact Form**: User inquiry submission with validation
- **Error Handling**: Graceful error handling with user-friendly messages

### Accessibility Features

- Keyboard navigation support
- ARIA labels and roles
- Focus management
- Reduced motion support
- Screen reader compatibility

---

## 🌐 Live Demo

Visit the live demo at: [https://yourusername.github.io/NWED513-Resources-Platform/](#)

---

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (for API calls and fonts)
- Text editor (VS Code recommended)
- Git (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/NWED513-Resources-Platform.git
   cd NWED513-Resources-Platform
   ```

2. **Open the project**
   ```bash
   # Using VS Code
   code .
   
   # Or simply open index.html in your browser
   ```

3. **No build process required**
   - This is a vanilla HTML/CSS/JavaScript project
   - Simply open `index.html` in your browser to run

### Local Development

```bash
# Using Python's built-in server
python -m http.server 8000

# Using Node.js (if installed)
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

---

## 📖 Usage

### User Registration & Login

1. Open the application in your browser
2. Click "Create one" to register a new account
3. Enter your full name, email, and password (minimum 6 characters)
4. After registration, you'll be automatically logged in
5. Use the logout button to end your session

### Navigating the Platform

- **Home**: Main landing page with hero slider and welcome banner
- **Services**: View detailed information about Care In Action, Menstrual Health, and University Funding
- **Resources API**: View real-time data fetched from the REST API
- **Contact**: Submit inquiries through the contact form
- **Terms**: Read the platform's terms and conditions

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     USER (Student)                          │
│                            │                                │
│                            ▼                                │
│                    Browser Interface                        │
│                            │                                │
│                            ▼                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │            FRONTEND CLIENT                          │   │
│  │    HTML5 / CSS3 / JavaScript (ES6+)                 │   │
│  │                                                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │   Auth      │  │  Navigation │  │     UI       │  │   │
│  │  │   Module    │  │   Module    │  │   Module    │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  │                                                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │   API       │  │   Slider    │  │    Debug    │  │   │
│  │  │   Service   │  │   Module    │  │   Module    │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                                │
│                            ▼ fetch()                        │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              REST API (External)                    │   │
│  │      JSONPlaceholder (jsonplaceholder.typicode.com) │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                                │
│                            ▼ JSON Response                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              DOM Manipulation                       │   │
│  │         Dynamic UI Updates & Rendering              │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                                │
│                            ▼                                │
│              Updated User Interface                         │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow Process

1. **User Action**: Student interacts with the web interface (clicks, form submission)
2. **JavaScript fetch()**: Async request sent to external REST API endpoint
3. **API Processing**: Server processes request and returns JSON response
4. **Error Handling**: Application handles success/failure states gracefully
5. **DOM Manipulation**: JavaScript updates the UI with received data
6. **Updated Interface**: Student sees current resource availability and information

---

## 🔌 API Integration

### JSONPlaceholder API

This application uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as a free, fake online REST API for testing and demonstration purposes.

#### Endpoints Used

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/posts` | GET | Fetch resource listings (limited to 8 items) |
| `/posts/:id` | GET | Fetch a single resource by ID |

#### Example API Call

```javascript
// Fetch resources from the API
async function fetchResources() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=8');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}
```

---

## 🛠️ Technologies Used

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | - | Semantic markup and structure |
| CSS3 | - | Styling with Flexbox and Grid |
| JavaScript | ES6+ | Interactive functionality |
| Google Fonts | - | Space Grotesk & Inter fonts |

### Development Tools

| Tool | Purpose |
|------|---------|
| Git | Version control |
| GitHub | Repository hosting |
| VS Code | Code editor |
| Chrome DevTools | Debugging |

### Design Principles

- **Glassmorphism**: Modern frosted glass effect
- **Gradient Backgrounds**: Vibrant color transitions
- **CSS Custom Properties**: Design tokens for consistency
- **Mobile-First**: Responsive design approach
- **Accessibility**: WCAG 2.1 compliance

---

## 📁 Project Structure

```
NWED513-Resources-Platform/
│
├── index.html              # Main application file
├── Care in action.html     # Care In Action sub-page
├── README.md               # This file
├── .gitignore              # Git ignore file
│
├── docs/                   # Documentation folder
│   ├── report.docx         # Assignment report
│   ├── report.pdf          # PDF version of report
│   └── demo-video.mp4      # Video demonstration
│
└── .github/                # GitHub specific files
    └── workflows/          # CI/CD workflows (optional)
```

---

## 🧪 Testing

### Manual Testing Checklist

#### Functionality Tests

| Test Case | Expected Result | Status |
|-----------|-----------------|--------|
| User Registration | New account created successfully | ✅ |
| User Login | Access granted with valid credentials | ✅ |
| User Logout | Session cleared, return to login | ✅ |
| Navigation | All pages load correctly | ✅ |
| API Data Fetch | Resources displayed from API | ✅ |
| Contact Form | Form submits with validation | ✅ |
| Responsive Design | Layout adjusts to screen size | ✅ |

#### Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ |
| Firefox | Latest | ✅ |
| Safari | Latest | ✅ |
| Edge | Latest | ✅ |

#### Responsive Breakpoints

| Device | Width | Status |
|--------|-------|--------|
| Mobile | < 480px | ✅ |
| Tablet | 481px - 768px | ✅ |
| Desktop | > 768px | ✅ |

### Performance Testing

Run Lighthouse audits in Chrome DevTools:

1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Click "Analyze page load"
4. Review scores for Performance, Accessibility, Best Practices, and SEO

---

## 🤝 Contributing

This is a group assignment project. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Git Workflow

```bash
# Clone the repository
git clone https://github.com/yourusername/NWED513-Resources-Platform.git

# Create a new branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "Description of changes"

# Push changes
git push origin feature/your-feature

# Create pull request on GitHub
```

---

## 👥 Group Members

| Name                   | Student Number | Role                   |
|------ -----------------|----------------|------------------------|
| Agnes Ntuli            | 202606773      | Frontend Developer     |
| Phiwokuhle Mngomezulu  | 202628853      | UI/UX Designer         |
| Nobuhle Mile           | 202603099      | API Integration        |
| Nombuso Mdluli         | 202631822      | Testing & QA           |
| Zwivhuya Manyatsha     | 202608150      | Backend Developer      |
| Nhlahla Ndweni         | 202607140      | Researcher             |
| Toka Monareng          | 202628459      | Tester                 |
| Nontobeko Ntuli        | 202613305      | Documentation                  |
| Phiwokuhle Nkosi       | 202610929      | Github account creation|
| Ntando Ntombela        | 202600500      | Website planner        |


*Note: Add all 8-10 group members as required by the assignment.*

---

## 📄 License

This project is created for educational purposes as part of the NWED513 module at [Your Institution].

---

## 📞 Contact & Support

- **Email**: help@communityhub.org
- **Phone**: 068 261 3833
- **Address**: 123 Community Street, City, State 12345

---

## 🙏 Acknowledgments

- **JSONPlaceholder** - Free fake API for testing
- **Google Fonts** - Space Grotesk and Inter typefaces
- **NWED513 Module** - Web Development course
- **Group Members** - Collaborative effort

---

## 📅 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-30 | Initial release for NWED513 assignment |

---

*Last Updated: March 2026*