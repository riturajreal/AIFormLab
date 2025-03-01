graph TD
    %% Main Structure
    A[Project Root] --> B[app]
    A --> C[components]
    A --> D[public]
    A --> E[styles]
    A --> F[lib]
    A --> G[types]

    %% App Directory
    B --> B1[layout.tsx]
    B --> B2[page.tsx]
    B --> B3[api/]

    %% Components Structure with Relations
    C --> C1[ui/]
    C --> C2[shared/]
    C --> C3[layouts/]
    
    %% Component Relationships
    C3 -.->|uses| C1
    C2 -.->|uses| C1
    B1 -.->|imports| C3
    B2 -.->|imports| C2

    %% Library and Utils
    F --> F1[utils.ts]
    F --> F2[db.ts]
    F --> F3[constants.ts]

    %% Library Usage
    C1 -.->|uses| F1
    C2 -.->|uses| F2
    B3 -.->|uses| F2

    %% Types Integration
    G --> G1[index.d.ts]
    G -.->|types for| C
    G -.->|types for| F

    %% Styling
    E --> E1[globals.css]
    E --> E2[components.css]
    C1 -.->|styled by| E2
    B1 -.->|uses| E1

    %% Static Assets
    D --> D1[images/]
    D --> D2[fonts/]
    C -.->|uses| D1

    %% Styling
    style A fill:#f9f,stroke:#333,stroke-width:2px
    style B fill:#f3f3f3
    style C fill:#e1e1e1
    style F fill:#d4d4d4
    
    %% Relationship Colors
    classDef relationship stroke-dasharray: 5 