# Blood Camp Management System

## Project Overview
The **Blood Camp Management System** is a web-based application designed to facilitate blood donation by connecting donors, blood banks, and hospitals. The system allows users to register as donors, request blood, and view available blood stocks in nearby blood banks. Admins can manage donation camps and monitor blood stock levels.

## Directory Structure
```
agarwalchetan-blood-camp/
├── README.md               # Project documentation
├── eslint.config.js        # ESLint configuration for code linting
├── index.html              # Main HTML file
├── package.json            # Project metadata and dependencies
├── postcss.config.js       # PostCSS configuration for styling
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.app.json       # TypeScript configuration for the app
├── tsconfig.json           # Root TypeScript configuration
├── tsconfig.node.json      # TypeScript configuration for Node.js
├── vite.config.ts          # Vite configuration file
└── src/                    # Source code directory
    ├── App.tsx             # Main React component
    ├── index.css           # Global styles
    ├── main.tsx            # Entry point of the app
    ├── vite-env.d.ts       # TypeScript environment declarations
    ├── components/         # Reusable UI components
    │   ├── Footer.tsx      # Footer component
    │   └── Navbar.tsx      # Navigation bar component
    └── pages/              # Application pages
        ├── AdminDashboard.tsx   # Admin dashboard page
        ├── BloodBanks.tsx        # Blood bank listing page
        ├── BloodRequest.tsx      # Blood request form page
        ├── DonorRegistration.tsx # Donor registration page
        └── Home.tsx              # Home page
```

## Features
- **Donor Registration:** Users can register as blood donors.
- **Blood Request:** Patients or hospitals can request specific blood groups.
- **Blood Bank Listings:** View details of available blood banks and their stock levels.
- **Admin Dashboard:** Manage blood donation camps and monitor blood stock.
- **Responsive Design:** Optimized for mobile and desktop users.

## Tech Stack
- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS, PostCSS
- **Build Tool:** Vite
- **Linting:** ESLint

## Setup Instructions
### Prerequisites
Ensure you have the following installed:
- Node.js (>=14.x)
- npm or yarn

### Installation Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Agarwalchetan/blood-camp.git
   cd blood-camp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Open the application in your browser at `http://localhost:5173`

## Contributing
Contributions are welcome! Please submit issues and pull requests via [GitHub](https://github.com/Agarwalchetan/blood-camp).

## License
This project is licensed under the MIT License.

