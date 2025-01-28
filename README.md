# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/79ca29f3-d84a-46fa-aed2-d28575499bd5

## Features

- **Kanban Board**: Organize tasks across different stages (Backlog, Todo, In Progress, Done)
- **Task Management**: 
  - Create tasks with title and description
  - Set task priorities (Low, Medium, High)
  - Move tasks between columns
  - Edit task details
- **User Management**:
  - Add multiple users
  - Switch between user dashboards
  - User-specific task views
- **Responsive Design**:
  - Works on mobile and desktop
  - Adaptive layout for different screen sizes
- **Dark Mode**: Toggle between light and dark themes

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/79ca29f3-d84a-46fa-aed2-d28575499bd5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Query (@tanstack/react-query)
- React Router DOM
- Lucide React (for icons)

## Project Structure

```
src/
├── components/
│   ├── KanbanBoard.tsx    # Main Kanban board component
│   ├── TaskCard.tsx       # Individual task card component
│   ├── UserManagement.tsx # User management interface
│   └── mode-toggle.tsx    # Dark mode toggle
├── contexts/
│   └── UserContext.tsx    # User state management
└── pages/
    └── Index.tsx          # Main application page
```

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/79ca29f3-d84a-46fa-aed2-d28575499bd5) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)