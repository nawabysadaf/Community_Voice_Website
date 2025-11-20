# Code Comments

This document explains the commenting strategy used throughout the **Community Voice Website** project. Code comments are provided to make the codebase easy to understand, maintain, and extend.

## File Structure Overview

A brief description of the main files and their purpose:

| File/Folder         | Purpose                                      |
|---------------------|----------------------------------------------|
| `app.js` | Main application setup and server configuration   |
| `config/app.js`            | Environment variables configuration                |
| `config/database.js`         | Database connection setup          |
| `controllers/reports.js`           | Report routes and handlers                    |
| `middlewares/logger.js`           | Request logging middleware              |
| `models/reports.js`        | Report model definition           |
| `pages/`  |  Website pages: home, edit, delete, track, and report   |
| `pages/css`      |  CSS stylesheets for form and general page styling     |
| `pages/images`   |  Image assets for the website    |
| `pages/includes`   |  Reusable layout components: navigation, footer, and header    |
| `package.json` and `package-lock.json`   |  Dependency and configuration management files    |

## Commenting Conventions

We use the following commenting styles throughout the project:

- **Inline Comments**: Brief explanations next to specific lines of code.
- **Block Comments**: Multi-line comments above complex code sections.
- **File Names**: Each file is named to clearly indicate its purpose.

## Key Functions and Classes

### 1: Main Application Setup
**Example:** The Express app initialization and server start.
```javascript
    // Initialize Express app and start server
    const app = express();
    app.listen(PORT, () => {
       console.log(`starting server on port ${PORT}`)
    });
```

### 2: Environment Variables 
**Example:** Accessing and exporting environment variables.
```javascript
    // Export environment variables for use in the app
    export const PORT = process.env.PORT;
    export const MONGODB_URI = process.env.MONGODB_URI;
```

### 3: Database Connection
**Example:** Connecting to MongoDB and handling connection events.
```javascript
    // Connect to MongoDB and log connection status
    mongoose
    .connect(MONGODB_URI,{
        serverSelectionTimeoutMS: 10000 // 10 seconds
     })
     .then(() => console.log("Database connected ✔️"))
     .catch((error) => console.error(error));
```

### 4: Report Model
**Example:** The Mongoose schema for report data.
```javascript
    // Mongoose schema for user reports
    const report = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    ...
});
```

### 5: Request Logging Middleware
**Example:** The logger middleware function.
```javascript
    // Middleware for logging request details
    export const logger = (request, response, next) => {
    console.log(
      new Date().toUTCString(), 
      'Request from', 
      request.ip, 
      request.method,
      request.originalUrl
    )
    next()
  }
```

### 6: Report Routes and Handlers
**Example:** Route for creating a new report.
```javascript
    // Route handler for submitting a new report
    router.post('/track', async (request, response) => {
    // Validate and save report
});
```

### 7: Website Pages
**Example:** EJS template for home page.
```
    <!-- EJS page template structure -->
    <%- include('includes/head', { title: 'Page Title' }) %>
    <%- include('includes/navigation') %>
    <!-- Page-specific content -->
    <%- include('includes/footer') %>
```

### 8: CSS Stylesheets
**Example:** Main CSS rule for forms.
```
    /* Style for report form */
    .report-form {
        background-color: #F9F8F8;
        width: 100%;
        ...
    }
```

### 9: Reusable Layout Components
**Example:** Navigation bar include file.
```
    <!-- Navigation bar include -->
    <nav>
        <a href="/">Home</a>
        <a href="/report">Report</a>
    </nav>
```

### 10: Dependency Files
**Example:** Declaring dependencies.
```json
     // package.json dependencies section
    "dependencies": {
        ...
    }

```

---

**Note:** For a complete description of **CommunityVoice** and its features, return to the [Main README](README.md).
