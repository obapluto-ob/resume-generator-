# Resume Generator

This project is a web application that allows users to create, edit, and manage their resumes easily. It features a user-friendly interface with various templates and a live preview of the resume as it is being edited.

## Features

- User authentication (login and registration)
- Dashboard for managing resumes
- Resume building interface with customizable sections
- Live preview of the resume
- Multiple resume templates (Classic, Modern, Professional)
- Pricing information for premium features

## Project Structure

```
resume-generator
├── client                # Frontend application
│   ├── public            # Public assets
│   ├── src               # Source code for the client
│   ├── package.json      # Client dependencies and scripts
│   └── vite.config.js    # Vite configuration
├── server                # Backend application
│   ├── controllers       # Controller functions for handling requests
│   ├── models            # Data models for User and Resume
│   ├── routes            # API routes
│   ├── app.js            # Main server entry point
│   ├── config.js         # Server configuration
│   └── package.json      # Server dependencies and scripts
├── .gitignore            # Files to ignore in version control
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory and install dependencies:
   ```
   cd client
   npm install
   ```

3. Navigate to the server directory and install dependencies:
   ```
   cd ../server
   npm install
   ```

### Running the Application

1. Start the server:
   ```
   cd server
   npm start
   ```

2. Start the client:
   ```
   cd ../client
   npm run dev
   ```

### Usage

- Access the application in your browser at `http://localhost:3000` (or the port specified in your server configuration).
- Create an account or log in to start building your resume.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.