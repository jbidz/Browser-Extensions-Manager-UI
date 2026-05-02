# Frontend Mentor - Browser extensions manager UI solution

This is a solution to the [Browser extensions manager UI challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/browser-extension-manager-ui-yNZnOfsMAp). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [AI Collaboration](#ai-collaboration)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Toggle extensions between active and inactive states
- Filter active and inactive extensions
- Remove extensions from the list
- Select their color theme
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./preview.jpg)
*(Note: You can replace this with a screenshot of your live solution when you host it)*

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Click here](https://jbidz.github.io/Browser-Extensions-Manager-UI/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties (Variables) for theming
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript (for DOM manipulation, JSON fetching, and theme toggling)

### What I learned

During this project, I implemented a robust dynamic rendering system using entirely Vanilla HTML, CSS, and JS. I also efficiently created a dynamic Dark/Light mode theme system by utilizing CSS custom properties mapped to a `data-theme` attribute on the `:root` element.

One of the elegant solutions implemented was inlining the SVG logo in the HTML document to allow the logo's text path to dynamically inherit the theme's text color using CSS variables.

```css
.logo-text-path {
  fill: var(--text-primary);
  transition: fill 0.3s ease;
}
```

### AI Collaboration

This project was built with the assistance of Antigravity, an AI coding assistant. The AI helped:
- Translate the design reference images into a responsive HTML layout
- Implement the Dark/Light mode CSS theme rules based on the `style-guide.md`
- Write the Vanilla JS logic to fetch and dynamically inject content from `data.json`
- Debug minor syntactical issues with template literals

## Author

- Coded by - [John Denver Bidong](#)
