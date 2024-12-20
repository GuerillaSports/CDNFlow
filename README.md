# Guerilla Sports CDNFlow

### Webflow Custom Code Delivery System

*Designed and developed by [Caleb Theil](https://github.com/ctheil)*

The Guerilla Sports CDNFlow system allows developers to build custom functionality into the [GS Webflow CMS System](https://github.com/GuerillaSports/Webflow-CMS), while maintaining a proper Developer Experience, versioning, and management.

This repo provides a solution so managing custom scripts across various pages via the Webflow designer, and instead allows developer to develop tools and deliver them via a 'jsDeliver CDN' directly into the website automatically, without having to touch webflow.

This project provides a structured way to deliver custom JavaScript code to a Webflow site via a CDN. The system is designed to handle global and page-specific functions, with support for multiple DOM events like DOMContentLoaded, load, and others.

>[!Important]
> Exercise caution when editing the webflow site and try to preserve all class names
> These features rely heavily on selecting elements based on their class names!

## Project Structure

The project is organized to separate global functions from page-specific ones, while handling event listener setup in a centralized way for better maintainability and scalability.

### Directory Structure

```
src/
├── global/                        # Centralized event handler and utility functions 
│   ├── functions.ts               # global functions to be executed on every page
│   ├── utils.ts                   # global functions to be executed on every page
│   ├── colors/                    # Global function components
├── pages/                         # Page-specific directories
│   ├── articles/
│   │   └── init.ts                # Functions for /articles page
│   ├── home/
│   │   └── init.ts                # Init functions for / page
│   │   └── aggregate-content.ts   # Aggregate Content Functions for / page
├── main.ts                        # Main entry point that sets up the event listeners
├── dist/                          # Output for built files (for CDN delivery)
│   ├── bundle.js                  # What the CDN Delivers
```

## How It Works

### Global Event Handler

The `global/indexs.ts` file sets up listeners for common DOM events like `DOMContentLoaded` and `load`, and executes the relevant page-specific functions based on the URL.

- **`DOMContentLoaded`**: Fired when the DOM is fully loaded, but before external resources like images are done.
- **`load`**: Fired when the entire page and all its resources have loaded.

The global event handler dynamically loads and executes the page-specific functions tied to these events.

### Page-Specific Function Definitions

Each page has its own `init.ts` file inside the `pages/<page-name>/` directory. In these files, functions are grouped by the event they should respond to. For example:

- **`DOMContentLoaded`** functions: These functions are executed when the DOM is fully loaded.
- **`load`** functions: These are executed when the entire page has loaded.

### Main Entry Point

The `main.ts` file handles the detection of the current page based on the URL and delegates the correct page-specific functions to the global event handler. It also ensures that global functions are executed across all pages.

## Example Usage

### 1. **Global Event Handling**

The `global/index.ts` file sets up the event listeners:

```typescript
export const setupGlobalEvents = (pageFunctions: Record<string, any>) => {
  // Set up DOMContentLoaded event
  window.addEventListener('DOMContentLoaded', () => {
    executeFunctionsByEventType({...pageFunctions, ...globalFunctions}, 'DOMContentLoaded');
  });

  // Set up window load event
  window.addEventListener('load', () => {
    executeFunctionsByEventType(...pageFunctions, ...globalFunctions, 'load');
  });
};
```

This ensures that each event type is handled in a centralized way, and then delegates the actual execution to the functions defined for each page.

### 2. **Page-Specific `init.ts` Files**

Each page defines its functions in a structured way, like so:

#### `src/pages/articles/init.ts`

```typescript
const pageFunctions = {
  DOMContentLoaded: {
    initHeader: function() {
      console.log('Initializing header for articles page');
    },
    initContent: function() {
      console.log('Initializing content for articles page');
    }
  },
  load: {
    onPageLoad: function() {
      console.log('Page fully loaded for articles page');
    }
  }
};

export default pageFunctions;
```

### 3. **Main Entry Point (`main.ts`)**

The `main.ts` file determines the current page by checking the URL and assigns the correct functions to the event handler:

```typescript
import { pageFunctions as articlePageFunctions } from './pages/articles/init';
import { pageFunctions as contactPageFunctions } from './pages/contact/init';
import { setupGlobalEvents } from './global';

// Determine current page
const path = window.location.pathname.split('/')[1];

// Load the correct page-specific functions
let currentPageFunctions = {};
switch (path) {
  case "articles": 
    currentPageFunctions = articlePageFunctions;
    break
  case "": 
    currentPageFunctions = homePageFunctions;
  default: 
    console.log(`no local functions for page ${path}`)
}

// Pass the functions to the global handler
setupGlobalEvents(currentPageFunctions);
```

## How to Build and Deploy

This project is designed to be bundled for CDN delivery. After development, you can build the project and upload the files to your CDN.

### Build the Project

To build the project and output the bundled files in the `dist/` directory, run:

```bash
yarn build
```

### Use jsDelivr to Serve Files

To serve the latest build files from jsDelivr, include the following in your HTML:

```html
<script src="https://cdn.jsdelivr.net/gh/GuerillaSports/CDNFlow@latest/dist/bundle.iife.js"></script>
```

---

## Features: 

- [Global Features](https://github.com/GuerillaSports/CDNFlow/tree/main/src/global):
  - custom story title formatting
  - Custom story title color contrast feature
  - Mobile navigation conditionall icon swapping
- Scoped page features
  - [Home Page Aggregation](https://github.com/GuerillaSports/CDNFlow/tree/main/src/pages/home)
    - Assuming the homepage is properly setup, this feature filters, aggregates, and sorts all different types of GS's content into a consumable homepage
  - [Articles Page Header removal]()
    - Conditionally removes content should no content exists/be rendered 
