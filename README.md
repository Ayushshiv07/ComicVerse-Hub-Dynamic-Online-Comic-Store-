🎨 ComicVerse Hub — Dynamic Online Comic Store (Frontend Only)

A fully responsive, high-fidelity, and interactive frontend comic store application built using HTML, CSS, JavaScript (ES6+), and GSAP animations.
Designed to mimic modern comic store experiences like Marvel, DC, and Image Comics, all without any backend.

<img width="1536" height="1024" alt="r2" src="https://github.com/user-attachments/assets/56142792-76d7-48ed-89ec-4c9e87b3a7d5" />

<img width="1536" height="1024" alt="r1" src="https://github.com/user-attachments/assets/45754836-821d-4489-8fba-c6156264d014" />



⭐ Project Overview

ComicVerse Hub is a static multi-page website that simulates an online comic book store.
All data and cart functionality are managed completely on the client side using:

JavaScript Objects / JSON

LocalStorage Persistence

Dynamic DOM Rendering

GSAP Animation Engine

This project showcases advanced frontend UI, responsive layouts, filtering, sorting, carousel animation, and shopping cart logic, making it a perfect portfolio project.

🎯 Core Features
🖼️ 1. Animated Hero Carousel (GSAP Powered)

Smooth slide transitions

Dot navigation

Auto-scrolling

Fade + slide-in effects

Fully responsive

Custom CSS variable-based slide switching

🔍 2. Browse Page with Smart Filters

Filter by Publisher (Marvel, DC, Image…)

Filter by Genre

Sort by:

Newest

Price ↑/↓

Title A–Z

Real-time search:

title

characters

keywords

📄 3. Comic Detail Page

Dynamic page content using ?id=001 URL parameters

Large comic cover

Creator credits

Full synopsis

Add-to-cart button

Sticky Add-to-Cart bar for mobile

🛒 4. Full Shopping Cart System

Slide-out cart (right sidebar)

Full cart page

Add / Remove / Update quantities

Real-time totals

LocalStorage persistence (cart never resets)

Cart badge synced across all pages

🎭 5. Stylish Modern UI / UX

Glassmorphism cards

Hover animations

Soft shadows

Custom cursor using GSAP

Magnetic buttons

Smooth page fade-in animations

📱 6. 100% Responsive

Works seamlessly across:

Mobile

Tablet

Desktop

Large displays

📂 Project Structure
comicverse-hub/
│── index.html
│── browse.html
│── comic-detail.html
│── cart.html
│── style.css
│── script.js
│── comics.js
│── assets/
│     └── covers/
│          ├── comic-001.jpg
│          ├── comic-002.jpg
│          └── comic-003.jpg
│── README.md

🧠 Tech Stack
Technology	Purpose
HTML5	Structure, semantics
CSS3 (Flexbox + Grid + Glass UI)	Responsive styling
JavaScript (ES6+)	Logic, filtering, cart system
LocalStorage	Saving cart persistence
GSAP 3	Animations, page transitions, cursor, UI motion
JSON / JS Data Objects	Comic catalog
