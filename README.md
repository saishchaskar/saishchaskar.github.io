# Saish Chaskar Portfolio

A personal portfolio website built with plain HTML, CSS, and JavaScript. It showcases projects, skills, experience, and contact details with a modern dark theme and responsive layout.

## Live Site

https://saishchaskar.github.io/

## Features

- Responsive one-page portfolio layout
- Project showcase section
- Experience and skills timeline
- Contact form with email integration
- Clean GitHub Pages-friendly folder URLs such as /projects/, /contact/, and /skill/
- Tailwind CSS via CDN for rapid UI development

## Project Structure

```text
saishchaskar.github.io/
├── index.html
├── projects/
│   └── index.html
├── contact/
│   └── index.html
├── skill/
│   └── index.html
├── assets/
│   ├── css/
│   ├── images/
│   └── js/
├── favicon.svg
├── LICENSE
├── README.md
└── style-guide.md
```

## Local Development

Because this is a static site, no build step is required.

1. Open a terminal in the project root.
2. Start a local web server:

```bash
python3 -m http.server 8000
```

3. Visit:

```text
http://localhost:8000/
```

## GitHub Pages

This project is designed to work as a GitHub Pages static site. The clean URL structure is enabled by using folder directories with an index.html file inside them.

Example routes:

- https://saishchaskar.github.io/
- https://saishchaskar.github.io/projects/
- https://saishchaskar.github.io/contact/
- https://saishchaskar.github.io/skill/

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Credits

Built and maintained by Saish Chaskar.
