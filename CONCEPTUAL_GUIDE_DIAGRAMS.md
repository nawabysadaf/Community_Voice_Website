## Conceptual and Architecture Overview

This document provides a visual overview of **CommunityVoice**, including how users interact with the system and how the main components are structured.

## Conceptual Diagram

Below is a diagram illustrating how users submit, view, edit, and delete reports within **CommunityVoice**.

```mermaid
graph TD

  A[User submits report]
  B[Report saved to database]
  C[User views report]
  D[User can edit report]
  E[User can delete report]

  A --> B
  B --> C
  C --> D
  C --> E
```

## Architecture Diagram

This diagram shows the main technical components and data flow in the **CommunityVoice** system.

```mermaid
graph TD

  User["User (Browser)"]
  UI["HTML/CSS/JS (Frontend)"]
  Node["Node.js Server (Backend)"]
  Mongoose[Mongoose]
  MongoDB["(MongoDB Database)"]

  User --> UI
  UI --> Node
  Node --> Mongoose
  Mongoose --> MongoDB
  UI <-- Node
  UI --> Node
```

---

**Note:** For a complete description of **CommunityVoice** and its features, return to the [Main README](README.md).
