# Events and Activities App

## Table of Contents API specifications, 

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)

- [Usage](#usage)
- [Documentation](#documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Links](#links)

## Overview

We are pleased to present the Events and Activities App repository, a comprehensive solution designed to facilitate the coordination and management of campus events. This project aims to enhance engagement and participation within the campus community by offering a centralized platform that streamlines the entire event lifecycle.

The Events and Activities App provides a robust suite of features, including:

  1. Event Creation and Management: Organizers can effortlessly create, edit, and manage events, ensuring that all pertinent details—such as descriptions, schedules, and locations—are easily accessible to potential attendees.

  2. Registration and Ticketing: Users can register for events and purchase tickets through an intuitive interface, with digital tickets provided for easy access and management.

  3. Notifications and Reminders: The app automatically sends notifications and reminders to users about upcoming events, ensuring that they remain informed about changes or important updates.

  4. Event Calendar: A visually appealing calendar interface allows users to view all upcoming events at a glance, with filtering options to help them find activities that match their interests.

  5. Integration with Campus Services: The app integrates seamlessly with other essential campus services, enhancing the overall user experience by providing a holistic view of campus life.

By centralizing event management and fostering communication, the Events and Activities App not only simplifies the organization of events but also encourages greater participation and community involvement. We invite you to explore this repository to learn more about its features, architecture, and implementation details. Thank you for your interest in supporting a vibrant campus community through effective event management.

## Key Features

- **Event Creation and Management**: Create and manage campus events, including detailed descriptions, schedules, and locations.
- **Event Registration and Ticketing**: Register for events, purchase tickets, and receive digital tickets.
- **Notifications and Reminders**: Receive automated notifications and reminders about upcoming events.
- **Event Calendar**: View a comprehensive calendar of all campus events.
- **Integration with Campus Services**: Integrate seamlessly with other campus systems like Classroom Management, Campus Safety, and Transportation Management.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Hosting**: Vercel


## Usage

- **Creating Events**: Event organizers can log in and use the event creation interface to set up new events.
- **Registering for Events**: Users can browse upcoming events, register, and purchase tickets.
- **Managing Events**: Event organizers can update event details, monitor registrations, and send notifications.
- **Viewing the Calendar**: Users can explore the event calendar to discover events by date, type, or location.

## Documentation

For detailed API documentation, please refer to the [API Documentation](https://ewits.gitbook.io/ewits-docs) (insert link to API documentation).

## Deployment

The application is deployed on Vercel. You can access the live site at the following link:

- [Live Site](https://demo-app-two-snowy.vercel.app/) (insert link to deployed site)

## Local Testing
npm install --save-dev jest
npm install --save-dev @testing-library/react
npm install --save-dev @testing-library/jest-dom
npm install --save-dev babel-jest @babel/preset-env @babel/preset-react
npm install --save-dev react-test-renderer
To add **code coverage reports** in Jest, you need to configure Jest to collect coverage data when running your tests.

### Steps:

1. **Update Jest configuration**: You can configure coverage options directly in your `package.json` or in a Jest configuration file (`jest.config.js`).

2. **Run tests with coverage**: Use the `--coverage` flag when running Jest to generate coverage reports.

Here’s how to set it up:

### 1. **Add coverage configuration in `package.json`**:

In your `package.json`, under the `jest` key, add the `collectCoverage` option and specify the directories/files for which you want to collect coverage:

```json
{
  "jest": {
    "collectCoverage": true,
    "coverageDirectory": "coverage",
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts"
    ],
    "coverageReporters": ["text", "lcov", "html"]
  }
}
```

Explanation:
- **`collectCoverage: true`**: Enables coverage collection.
- **`coverageDirectory: "coverage"`**: Specifies where coverage reports will be saved.
- **`collectCoverageFrom`**: Lists the files for which you want to collect coverage (e.g., all JS/JSX/TS/TSX files in the `src` folder). You can exclude files (like `d.ts` files) with the `!` notation.
- **`coverageReporters`**: Specifies the formats for the coverage report. Common options are:
  - `"text"`: Shows a summary in the terminal.
  - `"lcov"`: Generates an HTML report viewable in a browser.
  - `"html"`: Another HTML report option (good for local viewing).

### 2. **Create a `jest.config.js` file (optional)**:

If you prefer to manage configuration in a separate file, you can create a `jest.config.js` file with the following content:

```javascript
module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts'
  ],
  coverageReporters: ['text', 'lcov', 'html']
};
```

### 3. **Run Jest with coverage**:

To generate a coverage report, simply run the following command:

```bash
npm test -- --coverage
```

This will run your tests and produce coverage reports in the specified formats. You can open the generated `index.html` file (usually inside the `coverage/lcov-report` folder) to see detailed coverage in a browser.



## Links

- [Live Site](https://demo-app-two-snowy.vercel.app/)
- [Documentation](https://ewits.gitbook.io/ewits-docs)
- [GitHub Repository](https://github.com/TumeloMkwambe/eWits/)

---

This README file serves as a comprehensive guide to understanding, installing, and contributing to the Events and Activities App.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
