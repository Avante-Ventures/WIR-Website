import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app.jsx';

// CSS imports — Vite bundles + minifies these into a single optimized stylesheet
import './styles/style.css';
import './styles/home.css';
import './styles/solutions.css';
import './styles/about.css';
import './styles/blog.css';
import './styles/contact.css';
import './styles/data-protection.css';

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
