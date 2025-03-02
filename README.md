# NeuronGrow - AI-Powered Mind Mapping

Welcome to **NeuronGrow**, an innovative, interactive web application that leverages AI to generate dynamic mind maps for any topic. With a sleek interface, dark/light theme support, and features like history saving, exporting, and undo functionality, NeuronGrow helps users visualize and explore ideas effortlessly.

## Overview

NeuronGrow is a frontend web app built with HTML, CSS, and JavaScript, paired with a secure backend (Node.js/Express) for AI-powered subtopic generation. Users can input any topic, create a mind map with AI-generated subnodes, save their work, export it as a PDF or image, and undo changes. The app supports both light and dark themes for an optimal user experience.

## Features

- **AI-Powered Mind Mapping**: Generate subtopics for any node using a secure backend API (e.g., OpenAI integration).
- **Dark/Light Theme**: Toggle between light and dark themes for better visibility and user preference.
- **Save History**: Save and load mind map history locally using browser storage.
- **Export Options**: Export the mind map as a PDF or PNG image for sharing or documentation.
- **Undo Support**: Revert changes with an undo feature to maintain flexibility during mapping.
- **Interactive Interface**: Click any node to generate AI-powered subtopics, with smooth animations and connections.

## Installation

### Prerequisites

- **Node.js** (for the backend, if used): Ensure Node.js (v14 or higher) is installed.
- **Web Browser**: Any modern browser (Chrome, Firefox, Safari, etc.) for the frontend.

### Frontend Setup

1. Clone or download this repository to your local machine:
   ```bash
   git clone https://github.com/makalin/NeuronGrow.git
   cd NeuronGrow
   ```

2. Open the `index.html` file in a web browser or serve it locally using a simple HTTP server:
   - Using Python (if installed):
     ```bash
     python -m http.server 5500
     ```
     Then visit `http://localhost:5500` in your browser.
   - Alternatively, use VS Code’s Live Server extension or any other local server.

### Backend Setup (Optional, for AI Subtopics)

1. Navigate to the backend directory (create a `server` folder if not already present):
   ```bash
   cd server
   ```

2. Install Node.js dependencies:
   ```bash
   npm init -y
   npm install express cors dotenv axios express-rate-limit jsonwebtoken
   ```

3. Create a `.env` file in the `server` directory with the following:
   ```
   PORT=3000
   JWT_SECRET=your-secure-jwt-secret
   OPENAI_API_KEY=your-openai-api-key
   ```

4. Obtain an OpenAI API key from [OpenAI](https://platform.openai.com) and replace `your-openai-api-key` in the `.env` file.

5. Start the backend server:
   ```bash
   node server.js
   ```
   Ensure the server runs on `http://localhost:3000` (or update the frontend `fetch` URL in `index.html` if using a different port or domain).

## Usage

1. Open `index.html` in a web browser.
2. Enter a topic (e.g., "Technology") in the input field and press Enter to generate an initial mind map.
3. Click any node to generate AI-powered subtopics (requires the backend to be running).
4. Use the control buttons to:
   - Toggle between light and dark themes.
   - Save the current mind map history.
   - Load a previously saved mind map.
   - Export the mind map as a PDF or PNG image.
   - Undo recent changes.
5. Interact with the mind map to explore and expand ideas dynamically.

## Dependencies

### Frontend
- **html2canvas** (via CDN): For capturing the mind map as an image for export.
- **jspdf** (via CDN): For generating PDFs from the mind map.

### Backend (Optional)
- **Express**: Web framework for Node.js.
- **Cors**: Cross-Origin Resource Sharing middleware.
- **Dotenv**: Loads environment variables from `.env`.
- **Axios**: HTTP client for API requests (e.g., to OpenAI).
- **Express-Rate-Limit**: Limits request rates to prevent abuse.
- **Jsonwebtoken**: For secure JWT authentication.

## Configuration

- Ensure the backend API URL in `index.html` (`http://localhost:3000/api/subtopics`) matches your backend server’s address.
- Update the `.env` file with your JWT secret and OpenAI API key for secure backend operation.

## Contributing

We welcome contributions to NeuronGrow! Here’s how you can help:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```bash
   git commit -m "Add your commit message"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request on GitHub, describing your changes and their purpose.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Feel free to open issues or reach out for collaboration on enhancing NeuronGrow!
