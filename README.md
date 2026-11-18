# Saish Chaskar Portfolio

![Portfolio](https://img.shields.io/badge/Portfolio-Live-38bdf8?style=for-the-badge&logo=githubpages&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

A modern personal portfolio built with HTML, CSS, and JavaScript to present my work, technical skills, and professional background in a clean and responsive format.

## Live Portfolio

https://saishchaskar.github.io/

## Overview

This portfolio is designed to:

- highlight software engineering experience and technical skills
- showcase selected projects and case studies
- provide a professional contact channel
- deploy efficiently on GitHub Pages using clean folder-based URLs

## Tech Stack

- HTML5
- CSS3
- JavaScript
- Tailwind CSS (via CDN)
- GitHub Pages hosting

## Features

- Responsive layout for desktop and mobile
- Dark, modern UI with accent gradients and animations
- Apple-inspired light and dark themes with persistent theme preference
- Palette-driven light theme with navy, red, magenta, and pink accents
- Unified single-page portfolio with buttery smooth in-page scrolling, sticky glassmorphic navigation bar, and responsive active scroll-spy
- Theme-matched preloader entrance with glowing cyan indicator and multilingual greetings including Marathi (नमस्कार), Hindi (नमस्ते), English, French, Italian, Portuguese, Japanese, German, and Dutch with curved SVG curtain wipe
- Interactive Experience Timeline and categorized Technical Skills
- Complete 6-project showcase with technology tags, image previews, and direct repository links
- Dedicated AgroConnect open-source AgriTech spotlight linking to the 28-state interactive map
- Integrated contact information and interactive message form with direct dispatch
- Clean URLs for GitHub Pages routing

## Project Structure

```text
saishchaskar.github.io/
├── index.html
├── projects/
│   └── index.html
├── contribute/
│   └── index.html
├── contact/
│   └── index.html
├── skill/
│   └── index.html
├── assets/
│   ├── css/
│   ├── maps/
│   ├── images/
│   └── js/
├── favicon.svg
├── LICENSE
├── README.md
├── style-guide.md
└── .gitignore
```

## Local Development

No build step is required because the site is fully static.

The Contribute page loads the bundled state map from `assets/maps/india-states.svg`.
Its source, license, and boundary-vintage limitations are documented in
[`assets/maps/THIRD_PARTY_NOTICES.md`](assets/maps/THIRD_PARTY_NOTICES.md).

1. Open the project directory in a terminal.
2. Start a simple local server:

```bash
python3 -m http.server 8000
```

3. Open the site in your browser:

```text
http://localhost:8000/
```

## GitHub Pages Setup

This project is configured for GitHub Pages with folder-based clean URLs. Pages are structured as folders containing an index.html file, which allows routes like:

- https://saishchaskar.github.io/
- https://saishchaskar.github.io/projects/
- https://saishchaskar.github.io/contribute/
- https://saishchaskar.github.io/contact/
- https://saishchaskar.github.io/skill/

## Deployment

To deploy on GitHub Pages:

1. Push the repository to GitHub.
2. Open the repository settings.
3. Navigate to Pages.
4. Select the branch used for deployment, usually main.
5. Save the configuration.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Contact

For inquiries or collaboration opportunities, reach out via the contact page or the social links included in the portfolio.

---

Built and maintained by Saish Chaskar.
