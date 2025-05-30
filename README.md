
<div align="center">
 <h1>Online Judge Frontend</h1>

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

**A modern, responsive frontend for competitive programming platform**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-CPCoders-blue?style=for-the-badge)](https://cpcoders.duckdns.org)
[![GitHub Stars](https://img.shields.io/github/stars/Avadhutgiri/online-judge-frontend?style=for-the-badge)](https://github.com/Avadhutgiri/online-judge-frontend/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/Avadhutgiri/online-judge-frontend?style=for-the-badge)](https://github.com/Avadhutgiri/online-judge-frontend/network)

</div>

---

## 🌐 Live Platform

**🚀 [Experience CPCoders Platform](https://cpcoders.duckdns.org)**

Try the full-featured online judge system with real-time submissions, contests, and leaderboards.

## 🏗️ Complete Ecosystem

This repository contains the **user-facing frontend** of a comprehensive online judge platform. The complete system consists of:

| Component | Repository | Technology | Purpose |
|-----------|------------|------------|---------|
| **🎯 User Frontend** | [online-judge-frontend](https://github.com/Avadhutgiri/online-judge-frontend) | React + Vite | Problem solving, contests, submissions |
| **👑 Admin Panel** | [online-judge-admin](https://github.com/Avadhutgiri/online-judge-admin) | React + Admin UI | Platform management, analytics |
| **⚡ Backend API** | [my-online-judge](https://github.com/Avadhutgiri/my-online-judge) | Node.js + Express | Core logic, database, execution |

## ✨ Features

<div align="center">

| 🎯 **Problem Solving** | 🏆 **Contests** | 📊 **Analytics** |
|:---:|:---:|:---:|
| Clean code editor with syntax highlighting | Live contest participation | Real-time submission tracking |
| Multi-language support (C++, Python, Java, etc.) | Dynamic leaderboards | Performance metrics |
| Instant feedback and results | Contest announcements | Progress visualization |

</div>

### 🔥 Core Features
- **💻 Advanced Code Editor**: Monaco Editor with IntelliSense, syntax highlighting, and multiple themes
- **🚀 Real-time Submissions**: Instant feedback with detailed test case results
- **🏆 Contest Management**: Participate in live coding competitions with real-time rankings
- **📱 Responsive Design**: Seamless experience across desktop, tablet, and mobile devices
- **🔐 Secure Authentication**: JWT-based login system with profile management
- **📊 Performance Tracking**: Detailed submission history and progress analytics
- **🌙 Theme Support**: Light/dark mode with customizable interface
- **🔄 Live Updates**: WebSocket integration for real-time notifications

## 🛠️ Tech Stack

<div align="center">

### Frontend Technologies
![React](https://img.shields.io/badge/React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_4.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

### Development Tools
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)

### Backend Integration
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

## 📋 Prerequisites

![Node.js](https://img.shields.io/badge/Node.js-16.0+-339933?style=flat-square&logo=nodedotjs)
![npm](https://img.shields.io/badge/npm-8.0+-CB3837?style=flat-square&logo=npm)
![Git](https://img.shields.io/badge/Git-Latest-F05032?style=flat-square&logo=git)

```bash
# Check your versions
node --version  # Should be 16.0 or higher
npm --version   # Should be 8.0 or higher
git --version   # Any recent version
```

## ⚡ Quick Start

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Avadhutgiri/online-judge-frontend.git
cd online-judge-frontend
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Environment Configuration

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_BACKEND_URL=http://localhost:3000

# Application Settings
VITE_APP_NAME=CPCoders
VITE_APP_VERSION=1.0.0

# WebSocket Configuration
VITE_WEBSOCKET_URL=ws://localhost:3000

# Development Settings
VITE_DEV_MODE=true
VITE_DEBUG=true
```

### 4️⃣ Start Development Server

```bash
npm run dev
# or
yarn dev
```

🎉 **Application available at**: `http://localhost:5173`

## 🏗️ Full Stack Setup

To run the complete platform locally:

### Backend Setup
```bash
# Clone and setup backend
git clone https://github.com/Avadhutgiri/my-online-judge.git
cd my-online-judge
cp .env.example .env
# Configure your .env file
docker-compose up -d --build
```

### Admin Panel Setup
```bash
# Clone and setup admin panel
git clone https://github.com/Avadhutgiri/online-judge-admin.git
cd online-judge-admin
npm install
npm run dev
```

### Frontend Setup (This Repository)
```bash
# Setup user frontend
git clone https://github.com/Avadhutgiri/online-judge-frontend.git
cd online-judge-frontend
npm install
npm run dev
```

**Access Points:**
- 🎯 **User Frontend**: http://localhost:5173
- 👑 **Admin Panel**: http://localhost:5174 (or configured port)
- ⚡ **Backend API**: http://localhost:3000

## 📁 Project Architecture

```
online-judge-frontend/
├── 📁 public/                 # Static assets and favicon
├── 📁 src/
│   ├── 📁 components/        # Reusable UI components
│   │   ├── 📁 common/       # Shared components (Header, Footer, etc.)
│   │   ├── 📁 editor/       # Code editor components
│   │   ├── 📁 problem/      # Problem-related components
│   │   └── 📁 contest/      # Contest-specific components
│   ├── 📁 pages/            # Route-based page components
│   │   ├── 📁 auth/         # Login, Register, Profile
│   │   ├── 📁 problems/     # Problem list, problem detail
│   │   ├── 📁 contests/     # Contest pages
│   │   └── 📁 dashboard/    # User dashboard
│   ├── 📁 hooks/            # Custom React hooks
│   ├── 📁 services/         # API integration services
│   ├── 📁 utils/            # Utility functions and helpers
│   ├── 📁 contexts/         # React context providers
│   ├── 📁 styles/           # Global styles and themes
│   ├── 📁 constants/        # Application constants
│   └── 📄 App.jsx           # Root application component
├── 📄 package.json
├── 📄 vite.config.js
├── 📄 .env.example
└── 📄 README.md
```

## 🔧 Available Scripts

| Command | Description | Usage |
|---------|-------------|-------|
| `npm run dev` | Start development server | Development |
| `npm run build` | Build for production | Deployment |
| `npm run preview` | Preview production build | Testing |
| `npm run lint` | Run ESLint | Code quality |
| `npm run lint:fix` | Fix ESLint issues | Code formatting |

## 🌟 Key Components

### 💻 Code Editor Interface
- **Monaco Editor** integration with IntelliSense
- **Multi-language support**: C++, Python, Java, JavaScript, C
- **Customizable themes**: Light, dark, and high-contrast modes
- **Auto-completion** and **error detection**
- **Code formatting** and **syntax highlighting**

### 📊 Problem Management
- **Advanced filtering**: Difficulty, tags, categories
- **Search functionality** with fuzzy matching
- **Problem statistics** and **success rates**
- **Editorial support** and **discussion forums**

### 🏆 Contest Features
- **Live contest participation** with real-time updates
- **Dynamic leaderboards** with automatic ranking
- **Contest announcements** and **clarifications**
- **Submission tracking** during contests
- **Post-contest analysis** and **editorial access**

### 📈 Analytics Dashboard
- **Submission history** with detailed results
- **Performance metrics** and **progress tracking**
- **Language-wise statistics**
- **Problem-solving streaks** and **achievements**

## 🔌 Backend Integration

### API Endpoints

<details>
<summary><strong>🔐 Authentication APIs</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/register` | User registration |
| `POST` | `/api/auth/login` | User login |
| `GET` | `/api/auth/profile` | Get user profile |
| `PUT` | `/api/auth/profile` | Update profile |
| `POST` | `/api/auth/logout` | User logout |

</details>

<details>
<summary><strong>📝 Problem Management APIs</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/problems` | List all problems |
| `GET` | `/api/problems/:id` | Get problem details |
| `GET` | `/api/problems/:id/submissions` | Get problem submissions |
| `GET` | `/api/problems/categories` | Get problem categories |

</details>

<details>
<summary><strong>⚡ Submission APIs</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/submissions` | Submit solution |
| `GET` | `/api/submissions` | Get user submissions |
| `GET` | `/api/submissions/:id` | Get submission details |
| `GET` | `/api/submissions/:id/result` | Get submission result |

</details>

<details>
<summary><strong>🏆 Contest APIs</strong></summary>

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/contests` | List contests |
| `GET` | `/api/contests/:id` | Get contest details |
| `GET` | `/api/leaderboard/:contestId` | Get contest leaderboard |
| `POST` | `/api/contests/:id/register` | Register for contest |

</details>

## 👑 Admin Panel Integration

The platform includes a separate admin interface for comprehensive management:

### Admin Features
- **📊 Platform Analytics**: User statistics, submission trends, system performance
- **👥 User Management**: User accounts, permissions, moderation tools
- **📝 Problem Administration**: Create, edit, and manage coding problems
- **🏆 Contest Management**: Set up contests, manage participants, monitor progress
- **⚙️ System Configuration**: Platform settings, feature toggles, maintenance mode
- **📈 Performance Monitoring**: Real-time system metrics and health checks

### Admin Access
```bash
# Setup admin panel
git clone https://github.com/Avadhutgiri/online-judge-admin.git
cd online-judge-admin
npm install
npm run dev
```

**Admin Panel Repository**: [online-judge-admin](https://github.com/Avadhutgiri/online-judge-admin)

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Docker Deployment
```dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Environment-Specific Configurations

<details>
<summary><strong>🔧 Production Environment</strong></summary>

```env
# Production API Configuration
VITE_API_BASE_URL=https://cpcoders.duckdns.org/api
VITE_BACKEND_URL=https://cpcoders.duckdns.org
VITE_WEBSOCKET_URL=wss://cpcoders.duckdns.org

# Production Settings
VITE_APP_NAME=CPCoders
VITE_NODE_ENV=production
VITE_DEV_MODE=false
```

</details>

<details>
<summary><strong>🧪 Development Environment</strong></summary>

```env
# Development API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_BACKEND_URL=http://localhost:3000
VITE_WEBSOCKET_URL=ws://localhost:3000

# Development Settings
VITE_APP_NAME=CPCoders Dev
VITE_NODE_ENV=development
VITE_DEV_MODE=true
VITE_DEBUG=true
```

</details>

## 🎨 Customization

### Theme Configuration
```css
/* src/styles/themes/default.css */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
  --warning-color: #ffc107;
  --info-color: #17a2b8;
  --dark-color: #343a40;
  --light-color: #f8f9fa;
}
```

### Language Support
```javascript
// src/constants/languages.js
export const SUPPORTED_LANGUAGES = {
  'cpp': { name: 'C++', extension: 'cpp', aceMode: 'c_cpp' },
  'python': { name: 'Python', extension: 'py', aceMode: 'python' },
  'java': { name: 'Java', extension: 'java', aceMode: 'java' },
  'javascript': { name: 'JavaScript', extension: 'js', aceMode: 'javascript' },
  'c': { name: 'C', extension: 'c', aceMode: 'c_cpp' }
};
```

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### 🐛 Bug Reports
1. Check existing [issues](https://github.com/Avadhutgiri/online-judge-frontend/issues)
2. Create detailed bug report with reproduction steps
3. Include browser information and screenshots

### ✨ Feature Requests
1. Discuss new features in [discussions](https://github.com/Avadhutgiri/online-judge-frontend/discussions)
2. Create feature request with detailed description
3. Consider implementation complexity and user benefit

### 💻 Code Contributions

```bash
# 1. Fork the repository
git fork https://github.com/Avadhutgiri/online-judge-frontend.git

# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Make your changes
# Follow coding standards and add tests

# 4. Commit changes
git commit -m "feat: add amazing feature"

# 5. Push and create PR
git push origin feature/amazing-feature
```

### 📋 Development Guidelines
- **Code Style**: Follow ESLint configuration and Prettier formatting
- **Components**: Use functional components with hooks
- **Testing**: Add unit tests for new features
- **Documentation**: Update README and code comments
- **Commits**: Use conventional commit messages

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Avadhut Giri

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 👨‍💻 Author & Maintainer

<div align="center">

**Avadhut Giri**

[![GitHub](https://img.shields.io/badge/GitHub-Avadhutgiri-181717?style=for-the-badge&logo=github)](https://github.com/Avadhutgiri)
[![Live Platform](https://img.shields.io/badge/Live_Platform-CPCoders-blue?style=for-the-badge&logo=web)](https://cpcoders.duckdns.org)


</div>

## 🙏 Acknowledgments

- **React Team** for the incredible framework and ecosystem
- **Vite Team** for the lightning-fast build tool
- **Monaco Editor** for the powerful code editing experience
- **Competitive Programming Community** for inspiration and feedback
- **Open Source Contributors** who make projects like this possible

## 📞 Support & Community

<div align="center">

### Need Help? We're Here for You!

| Platform | Purpose | Link |
|----------|---------|------|
| 🐛 **Bug Reports** | Frontend Issues | [Report Issue](https://github.com/Avadhutgiri/online-judge-frontend/issues) |
| ⚡ **Backend Issues** | API Problems | [Backend Issues](https://github.com/Avadhutgiri/my-online-judge/issues) |
| 👑 **Admin Issues** | Admin Panel | [Admin Issues](https://github.com/Avadhutgiri/online-judge-admin/issues) |
| 🌐 **Live Platform** | Try Before You Deploy | [CPCoders Platform](https://cpcoders.duckdns.org) |


---

<div align="center">

### ⭐ **Star this repository if you find it helpful!**

### 🌐 **Experience the platform**: [cpcoders.duckdns.org](https://cpcoders.duckdns.org)

**Made with ❤️ for the competitive programming community**

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=Avadhutgiri.online-judge-frontend)
[![GitHub Stars](https://img.shields.io/github/stars/Avadhutgiri/online-judge-frontend?style=social)](https://github.com/Avadhutgiri/online-judge-frontend/stargazers)

</div>
