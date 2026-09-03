# Clerwell — Human Approval Queue

A frontend implementation of Clerwell's Human Approval Queue, where reviewers can review AI-generated email responses, inspect AI analysis and risk information, and take appropriate actions on each email.

## Features

* Email review queue with pagination
* Maximum 5 emails displayed per page
* Search emails by sender, subject, and content
* Filter emails by status, risk, and priority
* View sender, subject, intent, AI confidence, risk, priority, status, and labels
* Review individual email details
* View AI analysis and applicable policy information
* Edit AI-generated draft responses
* Approve, reject, retry, or escalate emails based on the available actions
* Confirmation flows for important actions
* Responsive interface for desktop and mobile
* Keyboard-accessible controls

## Tech Stack

* Next.js
* TypeScript
* React
* Tailwind CSS

## Getting Started

### Clone the repository

```bash
git clone https://github.com/AkashSurendran0/Clerwell-Assignment.git
```

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Architecture

The application is structured around reusable React components rather than keeping the entire interface in a single component.

The main flow is:

```text
Email Fixture Data
       ↓
Email Queue
       ↓
Search / Filters / Pagination
       ↓
Email Details
       ↓
AI Analysis + Policy + Draft Response
       ↓
Reviewer Action
```

The email data is provided through the supplied JSON fixture files. The application uses this data to populate the review queue and individual email views.

The UI is divided into smaller reusable components for areas such as:

* Queue header
* Search and filters
* Email list
* Email list items
* Status / risk / priority indicators
* Pagination
* Email details
* AI analysis
* Draft response
* Action controls
* Confirmation dialogs

This keeps individual components focused and makes the interface easier to maintain and extend.

## State Management

Review-related changes are maintained in the application's in-memory state.

This includes changes such as:

* Draft edits
* Email status changes
* Reviewer actions

The supplied fixture data is not permanently modified.

### State Reset

The current implementation does **not persist review changes**.

Refreshing the page resets the application to the original fixture data.

This was an intentional trade-off because the assignment focuses on the frontend review experience and does not require persistent backend storage.

## Trade-offs & Assumptions

### In-memory state

A backend or persistent storage layer was not implemented. Review actions and edits are kept in application state.

This keeps the implementation focused on the core review workflow while still demonstrating the required interactions.

### Fixture-based data

The supplied JSON files are used as the application's data source.

The AI worker and email-sending functionality are represented through frontend interactions rather than real external services.

### AI actions

Actions such as retrying an AI response are simulated on the frontend because there is no actual AI service connected to the application.

### Email sending

Approve & Send represents the approval workflow in the interface. No real email is sent.

## Assumptions

* The supplied JSON files represent the initial state of the review queue.
* Reviewers interact with the application through the provided actions for each email.
* Available actions can differ depending on the email's risk and review requirements.
* The application is intended to demonstrate the human-in-the-loop review experience rather than a production email-processing backend.
* Review state is temporary and resets when the page is refreshed.

## What I Would Improve With More Time

With additional development time, I would improve the project in the following areas:

1. **Backend integration**

   * Persist email and review states in a database.
   * Store reviewer actions and draft changes permanently.

2. **Real AI integration**

   * Connect the retry action to an actual AI service.
   * Allow reviewers to provide guidance when requesting a new response.

3. **Authentication and authorization**

   * Add reviewer authentication.
   * Introduce role-based permissions for sensitive actions.

4. **Audit history**

   * Display a complete timeline of reviewer actions, edits, retries, approvals, rejections, and escalations.

5. **Testing**

   * Add more unit and integration tests covering filtering, pagination, editing, and review actions.

6. **Production-ready error handling**

   * Add proper API error states, retry handling, loading states, and network failure recovery once a backend is introduced.

## Project Structure

A simplified structure of the application:

```text
admin-email-approval/
├── app/
├── components/
├── mock-data/
│   ├── emails.json
│   └── policies.json
├── public/
├── types/
└── ...
```

The project is organized into reusable UI components and data/type definitions to keep the codebase maintainable and easy to extend.
