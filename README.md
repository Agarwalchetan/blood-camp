# Blood Camp Management System

## Project Overview
The **Blood Camp Management System** is a web application designed to facilitate blood donation and management. It allows users to register as donors, request blood, and find nearby blood banks. Admins can oversee operations, manage requests, and update blood stock data.

## Directory Structure
```
agarwalchetan-blood-camp/
├── README.md               # Project documentation
├── eslint.config.js        # ESLint configuration file
├── index.html              # Main HTML file
├── package.json            # Project dependencies and scripts
├── postcss.config.js       # PostCSS configuration file
├── tailwind.config.js      # Tailwind CSS configuration file
├── tsconfig.app.json       # TypeScript configuration for the app
├── tsconfig.json           # Root TypeScript configuration
├── tsconfig.node.json      # TypeScript configuration for Node
├── vite.config.ts          # Vite configuration file
└── src/                    # Source code directory
    ├── App.tsx             # Root React component
    ├── index.css           # Global styles
    ├── main.tsx            # Application entry point
    ├── vite-env.d.ts       # Vite environment declarations
    ├── components/         # Reusable UI components
    │   ├── AuthModal.tsx   # Authentication modal component
    │   ├── Footer.tsx      # Footer component
    │   ├── Navbar.tsx      # Navigation bar component
    │   └── QuoteDisplay.tsx # Component for displaying quotes
    ├── lib/                # Library files
    │   ├── supabase.ts     # Supabase client configuration
    │   └── .env            # Environment variables (not included in repo)
    └── pages/              # Application pages
        ├── AdminDashboard.tsx  # Admin dashboard page
        ├── BloodBanks.tsx       # Blood bank information page
        ├── BloodRequest.tsx     # Blood request submission page
        ├── DonorRegistration.tsx # Donor registration page
        ├── Home.tsx             # Home page
        └── UserPortal.tsx       # User dashboard page
```

## Project Workflow
### 1. User Registration & Authentication
- Users can sign up/log in using email authentication via **Supabase**.
- Admin users have separate access to manage blood bank operations.

### 2. Blood Donation Registration
- Donors can register and provide their details, including blood type and location.
- The system stores donor data for easy retrieval in emergencies.

### 3. Blood Request Process
- Users in need of blood can request it by filling out a form specifying blood type and urgency.
- Requests are matched with available donors or nearby blood banks.

### 4. Blood Bank Management
- Admins can update blood stock details in real-time.
- The system displays available blood types and their quantities.

### 5. Notification System
- Automated notifications (email/SMS) are sent for donation requests and approvals.
- Donors receive reminders for upcoming donation camps.

### 6. Search & Map Integration
- Users can search for nearby blood banks and donation camps using location-based services.
- Google Maps API integration helps visualize available donation centers.

### 7. Admin Dashboard
- Provides an overview of blood requests, donations, and stock levels.
- Allows admins to approve or reject donation requests.

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Steps to Run Locally
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
4. Open the application in your browser at `http://localhost:3000`

## Technologies Used
- **React** (Frontend framework)
- **TypeScript** (Strongly typed JavaScript)
- **Vite** (Fast build tool)
- **Tailwind CSS** (Utility-first CSS framework)
- **Supabase** (Backend-as-a-service for authentication and database)
- **Google Maps API** (For location services)
- **Node.js** (Backend services and API integration)

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Make your changes and commit:
   ```sh
   git commit -m "Your commit message"
   ```
4. Push to your branch:
   ```sh
   git push origin feature-branch
   ```
5. Open a pull request.

## License
This project is open-source and available under the [MIT License](LICENSE).

## Contact
For any questions or suggestions, feel free to reach out:
- **GitHub:** [Agarwalchetan](https://github.com/Agarwalchetan)
- **Email:** [your-email@example.com]

