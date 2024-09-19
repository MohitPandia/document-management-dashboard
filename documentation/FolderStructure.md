# Folder structure

**This is your source code tree:**

```
documentation
src
    |-- app
        |-- api
            |-- documentUpload
                |-- DocumentUploadRoute
            |-- documentDelete
                |-- DocumentDeleteRoute
        |-- fonts
        |-- pages
            |-- Dashboard.tsx
        |-- pages.tsx
        |-- layout.tsx
    |-- components

...
```

**This is your component structure:**

```
...
components
|-- YourComponent
   |-- DocumentUpload.tsx
   |-- DocumentLPreview.tsx
   |-- DocumentList.tsx
...
```

**These are the folders and their functions:**

`./documentation`

Contains documentation files for installation, usage, folder structure, and technologies used in the project.

`./src`

The primary source directory for application code and components.

`./src/app`

The `app` folder contains all the pages and components that are used for routing and layout management in the application.

- `./src/app/api`: Contains API routes and handlers which take care of upload and delete.
- `./src/app/fonts`: Stores custom fonts used throughout the application.
- `./src/app/pages`: Holds page components for different routes, such as `Dashboard.tsx`, which represents the main dashboard page.
- `./src/app/pages.tsx`: Entry point for routing and page composition.
- `./src/app/layout.tsx`: Defines the layout and structure of the application pages.

`./src/components`

Contains presentational components that are used to build the UI elements of the application. Each component is generally focused on a specific piece of UI.

- `./src/components/DocumentUpload.tsx`: Component for handling document uploads.
- `./src/components/DocumentList.tsx`: Component for displaying a list of documents.
- `./src/components/DocumentPreview.tsx`: Component for previewing documents.

---

This structure ensures a modular and maintainable codebase, with clear separation between different concerns and functionalities.