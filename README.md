# Riptle

Riptle is a simple and lightweight static site generator made using [RippleJS](https://ripplejs.com/) that converts your Markdown files into a static website. It's built with TypeScript and is easy to extend and customize.

## Installation

To use Riptle, you need to have Node.js and npm installed. You can install Riptle as a dependency in your project:

```bash
npm install riptle
```

## Usage

1.  **Create your Markdown files:**

    Create a directory to store your Markdown files. For example, you can create a `content` directory and put your `.md` files inside it.

2.  **Create a configuration file:**

    Create a `ripple.config.ts` file in the root of your project. This file will define the routes for your static site.

    ```typescript
    // ripple.config.ts
    import type { Route } from 'riptle';

    export default {
      '/': './content/index.md',
      '/about': './content/about.md',
    } as Route;
    ```

3.  **Create a build script:**

    Create a build script (e.g., `build.ts`) to run the static site generation.

    ```typescript
    // build.ts
    import { buildStaticSite } from 'riptle';
    import { resolve } from 'path';

    const rootDir = resolve(__dirname);
    const outDir = resolve(__dirname, 'dist');

    buildStaticSite(rootDir, outDir);
    ```

4.  **Run the build script:**

    You can run the build script using `ts-node`:

    ```bash
    ts-node build.ts
    ```

    This will generate the static HTML files in the `dist` directory.

## Features

*   **Markdown to HTML:** Converts your Markdown files to HTML.
*   **Simple Routing:**  Define your routes in a simple configuration file.
*   **Customizable:**  Easy to extend and customize.
*   **TypeScript Support:** Written in TypeScript for better type safety.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
