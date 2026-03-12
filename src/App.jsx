// WAMIDO Website Prototype — wamido.org
// Brand: Navy #172C57 | Gold #B58939
import { useState, useEffect, useRef } from "react";

const NAV = ["Home", "About Us", "Get Involved", "Donate", "Contact Us"];

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;0,900;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --navy: #172C57;
    --navy-deep: #0e1d3a;
    --navy-mid: #1e3a6e;
    --gold: #B58939;
    --gold-light: #d4a84b;
    --gold-pale: #f8f3e8;
    --cream: #faf8f4;
    --white: #ffffff;
    --dark: #1a1a2e;
    --grey: #6b7280;
    --grey-light: #f3f4f6;
    --red: #dc2626;
    --green: #16a34a;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--cream);
    color: var(--dark);
    line-height: 1.6;
    overflow-x: hidden;
  }

  .display { font-family: 'Playfair Display', serif; }

  /* NAV */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    background: rgba(23,44,87,0.97);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(181,137,57,0.3);
    padding: 0 2rem;
    display: flex; align-items: center; justify-content: space-between;
    height: 70px;
  }
  .nav-logo {
    display: flex; align-items: center; gap: 10px; cursor: pointer;
    text-decoration: none;
  }
  .nav-logo-w {
    width: 36px; height: 36px;
    background: var(--gold);
    clip-path: polygon(0 0, 20% 0, 50% 60%, 80% 0, 100% 0, 100% 100%, 80% 100%, 50% 40%, 20% 100%, 0 100%);
  }
  .nav-logo-text { color: white; font-weight: 600; font-size: 1.2rem; letter-spacing: 2px; }
  .nav-logo-text span { color: var(--gold); }
  .nav-links { display: flex; gap: 0.25rem; align-items: center; }
  .nav-link {
    color: rgba(255,255,255,0.8); background: none; border: none;
    font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 500;
    padding: 0.5rem 0.75rem; border-radius: 6px; cursor: pointer;
    transition: all 0.2s; letter-spacing: 0.3px;
  }
  .nav-link:hover { color: var(--gold); background: rgba(181,137,57,0.1); }
  .nav-link.active { color: var(--gold); }
  .nav-cta {
    background: var(--gold); color: var(--navy-deep);
    border: none; font-family: 'DM Sans', sans-serif;
    font-size: 0.875rem; font-weight: 600;
    padding: 0.6rem 1.25rem; border-radius: 8px; cursor: pointer;
    transition: all 0.2s; letter-spacing: 0.3px; margin-left: 0.5rem;
  }
  .nav-cta:hover { background: var(--gold-light); transform: translateY(-1px); }

  /* PAGE WRAPPER */
  .page { padding-top: 70px; min-height: 100vh; animation: fadeUp 0.4s ease; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }

  /* HERO */
  .hero {
    background: linear-gradient(135deg, var(--navy-deep) 0%, var(--navy) 50%, var(--navy-mid) 100%);
    min-height: 92vh; display: flex; align-items: center;
    position: relative; overflow: hidden; padding: 4rem 2rem;
  }
  .hero-bg-pattern {
    position: absolute; inset: 0; opacity: 0.04;
    background-image: repeating-linear-gradient(45deg, var(--gold) 0, var(--gold) 1px, transparent 0, transparent 50%);
    background-size: 20px 20px;
  }
  .hero-gold-bar {
    position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }
  .hero-content { max-width: 1100px; margin: 0 auto; width: 100%; position: relative; z-index: 2; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(181,137,57,0.15); border: 1px solid rgba(181,137,57,0.4);
    color: var(--gold-light); font-size: 0.8rem; font-weight: 600;
    padding: 0.4rem 1rem; border-radius: 100px; letter-spacing: 1.5px;
    text-transform: uppercase; margin-bottom: 2rem;
  }
  .hero-tag::before { content: ''; width: 6px; height: 6px; background: var(--gold); border-radius: 50%; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(1.3)} }

  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.8rem, 6vw, 5rem);
    font-weight: 900; color: white; line-height: 1.1;
    margin-bottom: 1.5rem;
  }
  .hero h1 em { color: var(--gold); font-style: italic; }
  .hero p {
    font-size: 1.15rem; color: rgba(255,255,255,0.75);
    max-width: 560px; margin-bottom: 2.5rem; font-weight: 300; line-height: 1.8;
  }
  .cta-group { display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; }
  .btn-primary {
    background: var(--gold); color: var(--navy-deep);
    border: none; font-family: 'DM Sans', sans-serif;
    font-size: 1rem; font-weight: 700;
    padding: 0.9rem 2rem; border-radius: 10px; cursor: pointer;
    transition: all 0.25s; display: flex; align-items: center; gap: 8px;
    letter-spacing: 0.3px;
  }
  .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(181,137,57,0.4); }
  .btn-secondary {
    background: transparent; color: white;
    border: 1.5px solid rgba(255,255,255,0.35);
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem; font-weight: 500;
    padding: 0.85rem 1.75rem; border-radius: 10px; cursor: pointer;
    transition: all 0.25s; display: flex; align-items: center; gap: 8px;
  }
  .btn-secondary:hover { border-color: var(--gold); color: var(--gold); background: rgba(181,137,57,0.08); }

  .hero-stats {
    display: flex; gap: 3rem; margin-top: 4rem;
    padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.1);
  }
  .stat-item { }
  .stat-num {
    font-family: 'Playfair Display', serif;
    font-size: 2rem; font-weight: 700; color: var(--gold);
    display: block; line-height: 1;
  }
  .stat-label { font-size: 0.8rem; color: rgba(255,255,255,0.5); font-weight: 400; margin-top: 4px; letter-spacing: 0.5px; }

  /* JOURNEY STRIP */
  .journey-strip {
    background: white;
    border-bottom: 2px solid var(--gold-pale);
    padding: 2.5rem 2rem;
  }
  .journey-inner { max-width: 1100px; margin: 0 auto; }
  .journey-title {
    text-align: center; font-size: 0.8rem; color: var(--grey);
    text-transform: uppercase; letter-spacing: 2px; font-weight: 600;
    margin-bottom: 1.5rem;
  }
  .journey-steps {
    display: flex; align-items: center; justify-content: center;
    gap: 0; flex-wrap: wrap;
  }
  .journey-step {
    display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 1rem 1.5rem;
    border-radius: 12px; transition: all 0.2s; min-width: 130px;
  }
  .journey-step:hover { background: var(--gold-pale); }
  .journey-icon { font-size: 1.8rem; margin-bottom: 0.5rem; }
  .journey-step-title { font-size: 0.75rem; color: var(--grey); font-weight: 500; margin-bottom: 2px; }
  .journey-step-label { font-size: 0.85rem; font-weight: 600; color: var(--navy); }
  .journey-step.highlight .journey-step-label { color: var(--gold); }
  .journey-arrow { color: var(--gold); font-size: 1.2rem; padding: 0 0.5rem; margin-top: -1rem; opacity: 0.5; }
  .journey-caption {
    text-align: center; margin-top: 1.5rem;
    font-size: 0.875rem; color: var(--grey);
    display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap;
  }
  .journey-caption a {
    color: var(--navy); font-weight: 600; cursor: pointer; text-decoration: none;
    border-bottom: 1px solid var(--gold); padding-bottom: 1px;
  }

  /* SECTION */
  .section { padding: 5rem 2rem; }
  .section-inner { max-width: 1100px; margin: 0 auto; }
  .section-label {
    font-size: 0.75rem; font-weight: 700; letter-spacing: 3px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 1rem;
  }
  .section-heading {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 700; color: var(--navy); line-height: 1.2; margin-bottom: 1.5rem;
  }
  .section-sub { font-size: 1.05rem; color: var(--grey); max-width: 580px; line-height: 1.8; }

  /* PROBLEM SECTION */
  .problem-section { background: var(--navy-deep); padding: 5rem 2rem; }
  .problem-inner { max-width: 900px; margin: 0 auto; text-align: center; }
  .problem-section .section-heading { color: white; }
  .problem-lead {
    font-size: 1.2rem; color: rgba(255,255,255,0.65); line-height: 1.9;
    margin-bottom: 1.5rem; font-weight: 300;
  }
  .problem-highlight {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem; color: var(--gold); font-style: italic; margin-top: 2rem;
  }

  /* FEATURES GRID */
  .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .feature-card {
    background: white; border: 1px solid #e8ebf2;
    border-radius: 16px; padding: 2rem;
    transition: all 0.25s;
    position: relative; overflow: hidden;
  }
  .feature-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--gold); transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s;
  }
  .feature-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(23,44,87,0.1); border-color: var(--gold); }
  .feature-card:hover::before { transform: scaleX(1); }
  .feature-check { font-size: 1.5rem; margin-bottom: 1rem; }
  .feature-title { font-weight: 700; color: var(--navy); font-size: 1rem; margin-bottom: 0.5rem; }
  .feature-desc { font-size: 0.9rem; color: var(--grey); line-height: 1.7; }

  /* STEPS */
  .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem; margin-top: 3rem; }
  .step-card { text-align: center; }
  .step-num {
    width: 52px; height: 52px; border-radius: 50%;
    background: var(--navy); color: var(--gold);
    font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1rem;
  }
  .step-badge { font-size: 1.8rem; margin-bottom: 0.5rem; }
  .step-title { font-weight: 700; color: var(--navy); margin-bottom: 0.5rem; }
  .step-desc { font-size: 0.9rem; color: var(--grey); line-height: 1.7; }

  /* MENTOR SPOTLIGHT */
  .mentor-section { background: var(--navy); padding: 5rem 2rem; }
  .mentor-inner { max-width: 1100px; margin: 0 auto; }
  .mentor-label { color: rgba(181,137,57,0.8); }
  .mentor-heading { color: white; }
  .mentor-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(181,137,57,0.25);
    border-radius: 20px; padding: 2.5rem;
    display: flex; gap: 2.5rem; align-items: center;
    margin-top: 2.5rem; flex-wrap: wrap;
  }
  .mentor-avatar {
    width: 100px; height: 100px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%);
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif; font-size: 2.5rem;
    color: var(--navy-deep); font-weight: 700; flex-shrink: 0;
  }
  .mentor-info { flex: 1; min-width: 200px; }
  .mentor-name { font-family: 'Playfair Display', serif; font-size: 1.6rem; color: white; font-weight: 700; margin-bottom: 0.25rem; }
  .mentor-role { color: var(--gold); font-size: 0.9rem; font-weight: 500; margin-bottom: 1rem; }
  .mentor-bio { color: rgba(255,255,255,0.65); font-size: 0.95rem; line-height: 1.8; }
  .mentor-badge {
    background: rgba(181,137,57,0.15); border: 1px solid rgba(181,137,57,0.3);
    color: var(--gold); font-size: 0.75rem; font-weight: 600; letter-spacing: 1px;
    text-transform: uppercase; padding: 0.3rem 0.75rem; border-radius: 100px;
    display: inline-block; margin-bottom: 0.75rem;
  }

  /* MISSION BOX */
  .mission-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center; }
  @media(max-width:768px){ .mission-grid{grid-template-columns:1fr;} }
  .mission-text p { color: var(--grey); line-height: 1.9; margin-bottom: 1.5rem; }
  .mission-quote {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem; font-style: italic; color: var(--navy);
    border-left: 3px solid var(--gold); padding-left: 1.5rem; line-height: 1.6;
  }
  .counter-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .counter-card {
    background: var(--navy); border-radius: 16px; padding: 2rem;
    text-align: center;
  }
  .counter-num {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem; font-weight: 700; color: var(--gold); display: block;
  }
  .counter-label { color: rgba(255,255,255,0.6); font-size: 0.85rem; margin-top: 0.25rem; }

  /* VALUES */
  .values-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .value-card { background: white; border-radius: 16px; padding: 1.75rem; border: 1px solid #e8ebf2; }
  .value-icon { font-size: 1.5rem; margin-bottom: 0.75rem; }
  .value-title { font-weight: 700; color: var(--navy); margin-bottom: 0.4rem; }
  .value-desc { font-size: 0.9rem; color: var(--grey); line-height: 1.7; }

  /* TIMELINE */
  .timeline { margin-top: 3rem; position: relative; }
  .timeline::before {
    content: ''; position: absolute; left: 20px; top: 0; bottom: 0;
    width: 2px; background: linear-gradient(to bottom, var(--gold), var(--navy));
  }
  .timeline-item { padding-left: 56px; position: relative; margin-bottom: 2.5rem; }
  .timeline-dot {
    position: absolute; left: 9px; top: 4px;
    width: 24px; height: 24px; border-radius: 50%;
    background: var(--navy); border: 3px solid var(--gold);
    display: flex; align-items: center; justify-content: center;
  }
  .timeline-year {
    font-size: 0.75rem; font-weight: 700; color: var(--gold);
    letter-spacing: 2px; text-transform: uppercase; margin-bottom: 0.5rem;
  }
  .timeline-title { font-weight: 700; color: var(--navy); margin-bottom: 0.5rem; }
  .timeline-items { list-style: none; }
  .timeline-items li { font-size: 0.9rem; color: var(--grey); padding: 0.25rem 0; display: flex; gap: 8px; }
  .timeline-items li::before { content: '—'; color: var(--gold); flex-shrink: 0; }

  /* GET INVOLVED */
  .involve-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 3rem; }
  @media(max-width:768px){ .involve-grid{grid-template-columns:1fr;} }
  .involve-card {
    background: white; border-radius: 20px; padding: 2rem;
    border: 1px solid #e8ebf2; transition: all 0.25s;
  }
  .involve-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(23,44,87,0.08); border-color: #c8d0e0; }
  .involve-card.featured { background: var(--navy); border-color: var(--navy); grid-column: span 2; }
  @media(max-width:768px){ .involve-card.featured{grid-column:span 1;} }
  .involve-num { font-family: 'Playfair Display', serif; font-size: 3rem; color: #e8ebf2; font-weight: 700; line-height: 1; margin-bottom: 0.5rem; }
  .involve-card.featured .involve-num { color: rgba(181,137,57,0.2); }
  .involve-title { font-weight: 700; color: var(--navy); font-size: 1.1rem; margin-bottom: 0.75rem; }
  .involve-card.featured .involve-title { color: white; font-size: 1.4rem; }
  .involve-desc { font-size: 0.9rem; color: var(--grey); line-height: 1.7; margin-bottom: 1.25rem; }
  .involve-card.featured .involve-desc { color: rgba(255,255,255,0.65); }

  /* DONATE */
  .donate-hero { background: linear-gradient(135deg, var(--navy-deep), var(--navy)); padding: 5rem 2rem; text-align: center; }
  .donate-hero .section-heading { color: white; }
  .donate-hero .section-sub { color: rgba(255,255,255,0.65); margin: 0 auto; }
  .donate-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 3rem; align-items: start; }
  @media(max-width:768px){ .donate-grid{grid-template-columns:1fr;} }
  .donate-card { background: white; border-radius: 20px; padding: 2.5rem; border: 1px solid #e8ebf2; }
  .donate-amounts { display: flex; gap: 0.75rem; flex-wrap: wrap; margin: 1.5rem 0; }
  .amount-btn {
    background: var(--gold-pale); border: 2px solid transparent;
    color: var(--navy); font-family: 'DM Sans', sans-serif; font-size: 1rem; font-weight: 600;
    padding: 0.6rem 1.25rem; border-radius: 10px; cursor: pointer; transition: all 0.2s;
  }
  .amount-btn:hover, .amount-btn.selected { background: var(--navy); color: white; border-color: var(--navy); }
  .amount-btn.gold { background: var(--gold); color: var(--navy-deep); }
  .donate-field {
    width: 100%; padding: 0.85rem 1rem; border: 2px solid #e8ebf2;
    border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 1rem;
    color: var(--dark); margin-bottom: 1rem; outline: none; transition: border 0.2s;
  }
  .donate-field:focus { border-color: var(--navy); }
  .gateway-note {
    background: var(--gold-pale); border: 1px solid rgba(181,137,57,0.3);
    border-radius: 10px; padding: 1rem; font-size: 0.85rem; color: var(--navy);
    margin: 1rem 0; display: flex; gap: 8px; align-items: flex-start;
  }
  .transparent-list { list-style: none; margin-top: 1.5rem; }
  .transparent-list li { display: flex; gap: 10px; padding: 0.6rem 0; border-bottom: 1px solid #f3f4f6; font-size: 0.9rem; color: var(--grey); }
  .transparent-list li::before { content: '✓'; color: var(--green); font-weight: 700; flex-shrink: 0; }

  /* CONTACT */
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
  @media(max-width:768px){ .contact-grid{grid-template-columns:1fr;} }
  .contact-form-card { background: white; border-radius: 20px; padding: 2.5rem; border: 1px solid #e8ebf2; }
  .form-group { margin-bottom: 1.25rem; }
  .form-label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--navy); margin-bottom: 0.4rem; }
  .form-input, .form-select, .form-textarea {
    width: 100%; padding: 0.75rem 1rem; border: 2px solid #e8ebf2;
    border-radius: 10px; font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
    color: var(--dark); outline: none; transition: border 0.2s;
    background: white; appearance: none;
  }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--navy); }
  .form-textarea { resize: vertical; min-height: 120px; }
  .contact-info { }
  .contact-info-title { font-weight: 700; color: var(--navy); margin-bottom: 1rem; font-size: 1.05rem; }
  .contact-detail { display: flex; gap: 12px; margin-bottom: 1.25rem; align-items: flex-start; }
  .contact-icon { font-size: 1.2rem; flex-shrink: 0; margin-top: 2px; }
  .contact-text { font-size: 0.9rem; color: var(--grey); line-height: 1.6; }
  .contact-text strong { color: var(--navy); display: block; margin-bottom: 2px; }
  .social-links { display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap; }
  .social-btn {
    background: var(--grey-light); border: none; color: var(--navy);
    font-family: 'DM Sans', sans-serif; font-size: 0.8rem; font-weight: 600;
    padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; transition: all 0.2s;
  }
  .social-btn:hover { background: var(--navy); color: white; }
  .faq-list { margin-top: 2rem; }
  .faq-item { border-bottom: 1px solid #e8ebf2; padding: 1rem 0; }
  .faq-q { font-weight: 600; color: var(--navy); font-size: 0.9rem; cursor: pointer; display: flex; justify-content: space-between; align-items: center; }
  .faq-a { font-size: 0.875rem; color: var(--grey); margin-top: 0.6rem; line-height: 1.7; }

  /* FOOTER */
  .footer { background: var(--navy-deep); padding: 4rem 2rem 2rem; }
  .footer-inner { max-width: 1100px; margin: 0 auto; }
  .footer-top { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem; flex-wrap: wrap; }
  @media(max-width:900px){ .footer-top{grid-template-columns:1fr 1fr;} }
  .footer-brand { }
  .footer-logo { display: flex; align-items: center; gap: 10px; margin-bottom: 1rem; }
  .footer-logo-w { width: 32px; height: 32px; background: var(--gold); clip-path: polygon(0 0, 20% 0, 50% 60%, 80% 0, 100% 0, 100% 100%, 80% 100%, 50% 40%, 20% 100%, 0 100%); }
  .footer-logo-text { color: white; font-weight: 600; font-size: 1.1rem; letter-spacing: 2px; }
  .footer-tagline { color: rgba(255,255,255,0.45); font-size: 0.85rem; line-height: 1.7; }
  .footer-col-title { color: var(--gold); font-size: 0.75rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 1rem; }
  .footer-links { list-style: none; }
  .footer-links li { margin-bottom: 0.5rem; }
  .footer-links a { color: rgba(255,255,255,0.55); font-size: 0.875rem; cursor: pointer; text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: var(--gold); }
  .footer-social { display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap; }
  .footer-social-btn {
    width: 36px; height: 36px; border-radius: 8px;
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
    color: rgba(255,255,255,0.55); font-size: 0.75rem; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s;
  }
  .footer-social-btn:hover { background: var(--gold); color: var(--navy-deep); border-color: var(--gold); }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.08); padding-top: 1.5rem;
    display: flex; justify-content: space-between; align-items: center; flex-wrap: gap;
    font-size: 0.8rem; color: rgba(255,255,255,0.3);
  }

  /* UTILITY */
  .btn-link {
    background: none; border: none; color: var(--navy); font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem; font-weight: 600; cursor: pointer; padding: 0;
    border-bottom: 1px solid var(--gold); padding-bottom: 1px; display: inline;
  }
  .btn-link:hover { color: var(--gold); }
  .btn-link.white { color: rgba(255,255,255,0.7); border-color: rgba(181,137,57,0.5); }
  .btn-link.white:hover { color: var(--gold); }
  .pill {
    display: inline-block; background: var(--gold-pale); color: var(--navy);
    font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.8rem;
    border-radius: 100px; border: 1px solid rgba(181,137,57,0.25);
  }
  .section-alt { background: var(--grey-light); }
  .text-center { text-align: center; }
  .text-center .section-sub { margin: 0 auto; }
  .mt1 { margin-top: 1rem; }
  .mt2 { margin-top: 2rem; }
  .mt3 { margin-top: 3rem; }
  .mb1 { margin-bottom: 1rem; }
  .w-full { width: 100%; }
`;

// ── COMPONENTS ────────────────────────────────────────────────────────────────

function Navbar({ page, setPage }) {
  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => setPage("Home")}>
        <div className="nav-logo-w" />
        <span className="nav-logo-text">WAMI<span>DO</span></span>
      </div>
      <div className="nav-links">
        {NAV.map(n => (
          <button key={n} className={`nav-link${page === n ? " active" : ""}`} onClick={() => setPage(n)}>
            {n}
          </button>
        ))}
        <button className="nav-cta" onClick={() => setPage("Home")}>Join the Family</button>
      </div>
    </nav>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-w" />
              <span className="footer-logo-text">WAMIDO</span>
            </div>
            <p className="footer-tagline">Where Questions Become Next Steps.<br />wamido.org</p>
            <div className="footer-social" style={{marginTop:"1.25rem"}}>
              {["IG","X","TK","YT","TG"].map(s => (
                <button key={s} className="footer-social-btn">{s}</button>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-title">Navigate</div>
            <ul className="footer-links">
              {NAV.map(n => <li key={n}><a onClick={() => setPage(n)}>{n}</a></li>)}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Legal</div>
            <ul className="footer-links">
              <li><a>Privacy Policy</a></li>
              <li><a>Terms of Service</a></li>
              <li><a>Cookie Policy</a></li>
            </ul>
            <div className="footer-col-title" style={{marginTop:"1.5rem"}}>Contact</div>
            <ul className="footer-links">
              <li><a>hello@wamido.org</a></li>
              <li><a>partnerships@wamido.org</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Get Started</div>
            <button className="btn-primary w-full" style={{marginBottom:"0.75rem", justifyContent:"center"}}>
              Join the Family
            </button>
            <button className="btn-secondary w-full" style={{justifyContent:"center", fontSize:"0.85rem"}}>
              Access the LMS →
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 WAMIDO. All rights reserved. wamido.org</span>
          <span>Free. Transparent. Family.</span>
        </div>
      </div>
    </footer>
  );
}

// ── PAGES ─────────────────────────────────────────────────────────────────────

function HomePage({ setPage }) {
  const [selectedAmt, setSelectedAmt] = useState(null);
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-pattern" />
        <div className="hero-gold-bar" />
        <div className="hero-content">
          <div className="hero-tag">Free · Transparent · Family</div>
          <h1 className="display">
            Stop Guessing<br />Your <em>Future.</em><br />Start Building It.
          </h1>
          <p>WAMIDO connects young people (ages 14–21) with industry mentors, structured training, and a family that genuinely cares about your success.</p>
          <div className="cta-group">
            <button className="btn-primary">Join the Family &nbsp;🏠</button>
            <button className="btn-secondary">Already a member? Access the LMS →</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-num">7,000+</span>
              <span className="stat-label">Target by 2030</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">100%</span>
              <span className="stat-label">Free forever</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">6wk</span>
              <span className="stat-label">Training programme</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">Fair</span>
              <span className="stat-label">Random.org lottery</span>
            </div>
          </div>
        </div>
      </section>

      {/* JOURNEY STRIP */}
      <div className="journey-strip">
        <div className="journey-inner">
          <div className="journey-title">Here's how WAMIDO works</div>
          <div className="journey-steps">
            {[
              ["🏠","Step 1","Join on Telegram"],
              null,
              ["⭐","Step 2","Complete Onboarding"],
              null,
              ["🏆","Step 3","Train on the LMS"],
              null,
              ["⭐⭐","Step 4","Enter the Lottery"],
              null,
              ["🪙","Alumni","Give Back"],
            ].map((s, i) => s === null
              ? <div key={i} className="journey-arrow">→</div>
              : <div key={i} className="journey-step">
                  <div className="journey-icon">{s[0]}</div>
                  <div className="journey-step-title">{s[1]}</div>
                  <div className="journey-step-label">{s[2]}</div>
                </div>
            )}
          </div>
          <div className="journey-caption">
            <span>New here? <a>Start with Telegram →</a></span>
            <span>·</span>
            <span>Already onboarded? <a>Head straight to the LMS →</a></span>
          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <section className="problem-section">
        <div className="problem-inner">
          <div className="section-label" style={{color:"rgba(181,137,57,0.8)", textAlign:"center"}}>The Reality</div>
          <h2 className="display section-heading" style={{color:"white", textAlign:"center"}}>We Know Exactly How It Feels</h2>
          <p className="problem-lead">You've got the ambition. You scroll endlessly through "how to start" videos. You collect free certificates hoping they'll mean something. You watch others succeed while you're still trying to figure out where to begin.</p>
          <p className="problem-lead">You're talented. You're driven. <strong style={{color:"white"}}>But you're stuck.</strong></p>
          <p className="problem-lead">Career guidance is either too vague — "just follow your passion!" — or completely gatekept by privilege and connections.</p>
          <p className="problem-highlight">"That's why WAMIDO exists."</p>
        </div>
      </section>

      {/* WHAT IS WAMIDO */}
      <section className="section">
        <div className="section-inner">
          <div className="section-label">What We Offer</div>
          <h2 className="display section-heading">More Than a Community.<br />We're Family.</h2>
          <p className="section-sub">WAMIDO is where young people transform confusion into clarity. We don't just motivate you with quotes — we equip you.</p>
          <div className="features-grid">
            {[
              ["✓","Real Training","A 6-week mentorship preparation programme that teaches you how industries actually work."],
              ["✓","Industry Mentors","Learn from professionals who've built successful careers — filmmakers, entrepreneurs, creatives who've been where you are."],
              ["✓","Fair Access","Transparent lottery via Random.org. No privilege. No connections. Just preparation and opportunity."],
              ["✓","A Family That Grows With You","From Newbie to Alumni — we're with you at every step of the journey."],
            ].map(([c,t,d]) => (
              <div key={t} className="feature-card">
                <div className="feature-check" style={{color:"var(--green)", fontWeight:700, fontSize:"1.2rem"}}>{c}</div>
                <div className="feature-title">{t}</div>
                <div className="feature-desc">{d}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:"center", marginTop:"2.5rem"}}>
            <div style={{fontSize:"1rem", color:"var(--navy)", fontWeight:700, marginBottom:"1rem"}}>And yes — it's 100% free.</div>
            <button className="btn-primary">Start Your Journey 🚀</button>
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section className="section section-alt">
        <div className="section-inner">
          <div className="section-label text-center" style={{textAlign:"center"}}>Your Path</div>
          <h2 className="display section-heading text-center" style={{textAlign:"center"}}>From Newbie to Alumni</h2>
          <div className="steps-grid">
            {[
              ["🆕","1","Join the Family","Complete our 5-day onboarding. Get oriented, meet your peers, understand the WAMIDO way."],
              ["⭐","2","Become an Ambassador","Access full family resources, weekly challenges, and mentorship preparation. Invite others."],
              ["🏆","3","Train & Enter the Lottery","Complete 6-week LMS training. Enter the fair, transparent lottery for direct mentorship."],
              ["🪙","4","Get Mentored & Give Back","Work with your mentor. Build real skills. Then become Alumni and mentor the next generation."],
            ].map(([badge, num, title, desc]) => (
              <div key={num} className="step-card">
                <div className="step-badge">{badge}</div>
                <div className="step-num">{num}</div>
                <div className="step-title">{title}</div>
                <div className="step-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENTOR */}
      <section className="mentor-section">
        <div className="mentor-inner">
          <div className="section-label mentor-label">Current Mentor</div>
          <h2 className="display section-heading mentor-heading">Learn From Those Who've Done It</h2>
          <div className="mentor-card">
            <div className="mentor-avatar">LT</div>
            <div className="mentor-info">
              <div className="mentor-badge">Inaugural Mentor · Film & Media</div>
              <div className="mentor-name">Lord Tanner</div>
              <div className="mentor-role">Award-Winning Filmmaker | CEO, Lord Tanner Studios</div>
              <div className="mentor-bio">From banking to creating acclaimed films like "Ajuwaya" and "The Millions," Lord Tanner represents the career pivot that works. He's showing WAMIDO members the real path to creative success in Nigeria.</div>
            </div>
          </div>
          <div style={{marginTop:"1.5rem", display:"flex", gap:"1rem", flexWrap:"wrap"}}>
            <button className="btn-primary">Meet Our Mentors</button>
            <button className="btn-secondary">Apply to Mentor</button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section" style={{background: "var(--gold-pale)", borderTop:"2px solid rgba(181,137,57,0.2)"}}>
        <div className="section-inner text-center">
          <div className="section-label text-center">Don't Wait</div>
          <h2 className="display section-heading text-center" style={{maxWidth:"700px", margin:"0 auto 1rem"}}>Your Future Doesn't Start 'Someday.' It Starts Now.</h2>
          <p className="section-sub text-center" style={{margin:"0 auto 2.5rem"}}>You're between 14 and 21. This is the moment to build your foundation right. Not when you feel ready. Not when it's convenient. Right now.</p>
          <div className="cta-group" style={{justifyContent:"center"}}>
            <button className="btn-primary" style={{fontSize:"1.05rem", padding:"1rem 2.5rem"}}>Join WAMIDO Family 🏠</button>
            <button onClick={() => setPage("Contact Us")} className="btn-secondary" style={{borderColor:"var(--navy)", color:"var(--navy)"}}>Questions? Email Us</button>
          </div>
        </div>
      </section>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page">
      <section className="hero" style={{minHeight:"50vh", padding:"5rem 2rem"}}>
        <div className="hero-bg-pattern" />
        <div className="hero-gold-bar" />
        <div className="hero-content" style={{textAlign:"center"}}>
          <div className="hero-tag">Our Story</div>
          <h1 className="display" style={{color:"white", fontSize:"clamp(2.2rem,4vw,3.5rem)", maxWidth:"700px", margin:"0 auto 1rem"}}>We Exist Because<br /><em>Talent Deserves a Fair Shot</em></h1>
          <p style={{color:"rgba(255,255,255,0.65)", maxWidth:"550px", margin:"0 auto"}}>WAMIDO was born from a simple belief: brilliant young people shouldn't have to navigate their futures alone.</p>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="section">
        <div className="section-inner">
          <div className="mission-grid">
            <div className="mission-text">
              <div className="section-label">Our Mission</div>
              <h2 className="display section-heading">Turning Questions Into Next Steps</h2>
              <p>WAMIDO exists to help young people (ages 14–21) navigate career growth and pivots in the age of AI — not through vague motivation, but through practical learning, real mentorship, and genuine family support.</p>
              <p>We're building a world where career clarity isn't reserved for the privileged or well-connected.</p>
              <div className="mission-quote mt2">"Create a space where preparation meets opportunity, where effort is rewarded fairly."</div>
            </div>
            <div className="counter-grid">
              {[["7,000+","Young people to transform by 2030"],["6 wks","Structured training programme"],["100%","Free — always"],["Fair","Random.org transparent lottery"]].map(([n,l]) => (
                <div key={l} className="counter-card">
                  <span className="counter-num">{n}</span>
                  <div className="counter-label">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDING STORY */}
      <section className="section section-alt">
        <div className="section-inner">
          <div style={{maxWidth:"760px", margin:"0 auto"}}>
            <div className="section-label text-center" style={{textAlign:"center"}}>The Founding Story</div>
            <h2 className="display section-heading text-center" style={{textAlign:"center"}}>Why WAMIDO Had to Exist</h2>
            <p style={{color:"var(--grey)", lineHeight:1.9, marginBottom:"1.25rem", fontSize:"1.05rem"}}>WAMIDO's founder, <strong style={{color:"var(--navy)"}}>Ayomide Arowolo-Ayodeji</strong>, knows what it's like to feel lost after graduation. Despite her education, she faced unemployment and uncertainty — until she found tech skills and a supportive community that changed everything.</p>
            <p style={{color:"var(--grey)", lineHeight:1.9, marginBottom:"1.25rem"}}>Even as she went on to found Know the Blocks Maven (KBM), train over 1,500 Nigerian students in emerging technologies, earn her Master's from <strong style={{color:"var(--navy)"}}>Harvard Graduate School of Education</strong>, and become a recognised EdTech innovator — she never forgot that feeling of being stuck.</p>
            <p style={{color:"var(--grey)", lineHeight:1.9, marginBottom:"1.5rem"}}>She saw thousands of talented young Nigerians with the same struggle: ambition without direction. Fire without a map. Meanwhile, the people with the answers were separated by an invisible wall.</p>
            <div style={{background:"var(--navy)", borderRadius:"16px", padding:"2rem", textAlign:"center"}}>
              <div className="display" style={{fontSize:"1.6rem", color:"var(--gold)", fontStyle:"italic", lineHeight:1.5}}>WAMIDO breaks down that wall.</div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section">
        <div className="section-inner">
          <div className="section-label text-center" style={{textAlign:"center"}}>Core Values</div>
          <h2 className="display section-heading text-center" style={{textAlign:"center"}}>What Drives Everything We Do</h2>
          <div className="values-grid">
            {[
              ["🎯","Clarity Over Noise","No vague motivation. Just clear direction, practical frameworks, and actionable next steps."],
              ["💡","Questions Are Power","The right question can change a trajectory. We teach people to ask better, sharper questions."],
              ["🚪","Mentorship That Opens Doors","We connect prepared members with proven mentors for real guidance and genuine opportunities."],
              ["❤️","Family, Not Just Community","We're driven by authentic care and passion for each other's success. Real, not performative."],
              ["⚖️","Fairness First","From our lottery to our training — transparent and merit-based. No backdoor deals. Ever."],
              ["🛡️","Preparation Before Opportunity","We train first, so when opportunities come, our members are ready."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="value-card">
                <div className="value-icon">{icon}</div>
                <div className="value-title">{title}</div>
                <div className="value-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section section-alt">
        <div className="section-inner" style={{maxWidth:"700px"}}>
          <div className="section-label">Our Journey</div>
          <h2 className="display section-heading">The WAMIDO Timeline</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-year">2025 — The Beginning</div>
              <ul className="timeline-items">
                <li>WAMIDO officially launched at wamido.org</li>
                <li>First family members join via Telegram</li>
                <li>Onboarding system and 6-week LMS programme established</li>
              </ul>
            </div>
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-year">2025 — First Mentor Partnership</div>
              <ul className="timeline-items">
                <li>Lord Tanner joins as inaugural mentor</li>
                <li>Random.org lottery system implemented</li>
                <li>First mentorship cohort selected live on YouTube</li>
              </ul>
            </div>
            <div className="timeline-item" style={{opacity:0.65}}>
              <div className="timeline-dot" style={{borderStyle:"dashed"}} />
              <div className="timeline-year">2026–2030 — Scaling Impact</div>
              <ul className="timeline-items">
                <li>Expand across film, tech, creative arts, business</li>
                <li>Partner with institutions and corporations</li>
                <li>7,000+ trained members with measurable impact</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section">
        <div className="section-inner">
          <div className="section-label text-center" style={{textAlign:"center"}}>The Team</div>
          <h2 className="display section-heading text-center" style={{textAlign:"center"}}>Meet the People Building WAMIDO</h2>
          <div style={{maxWidth:"600px", margin:"2.5rem auto 0", background:"white", borderRadius:"20px", padding:"2.5rem", border:"1px solid #e8ebf2", textAlign:"center"}}>
            <div style={{width:"80px", height:"80px", background:"var(--navy)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1rem", fontFamily:"Playfair Display, serif", fontSize:"1.8rem", color:"var(--gold)", fontWeight:700}}>A</div>
            <div className="display" style={{fontSize:"1.4rem", color:"var(--navy)", fontWeight:700, marginBottom:"0.25rem"}}>Ayomide Arowolo-Ayodeji</div>
            <div style={{color:"var(--gold)", fontSize:"0.875rem", fontWeight:600, marginBottom:"1rem"}}>Founder & Visionary</div>
            <p style={{color:"var(--grey)", fontSize:"0.9rem", lineHeight:1.8}}>EdTech innovator, instructional designer, and AI literacy advocate. Master's in Learning Design, Innovation, and Technology from Harvard Graduate School of Education. Trained 1,500+ Nigerian students in emerging technologies.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

function GetInvolvedPage() {
  return (
    <div className="page">
      <section className="hero" style={{minHeight:"45vh", padding:"5rem 2rem"}}>
        <div className="hero-bg-pattern" />
        <div className="hero-gold-bar" />
        <div className="hero-content" style={{textAlign:"center"}}>
          <div className="hero-tag">Join the Mission</div>
          <h1 className="display" style={{color:"white", fontSize:"clamp(2.2rem,4vw,3.5rem)", maxWidth:"700px", margin:"0 auto 1rem"}}>Help Us Build <em>Something That Matters</em></h1>
          <p style={{color:"rgba(255,255,255,0.65)", maxWidth:"520px", margin:"0 auto"}}>WAMIDO grows through the generosity of people who believe every young person deserves a fair shot at success.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="involve-grid">
            {/* Mentor — featured */}
            <div className="involve-card featured">
              <div className="involve-num">01</div>
              <div className="involve-title">Become a Mentor</div>
              <div className="involve-desc">Share your journey. Change a life. We're looking for professionals in Film & Media, Tech, Creative Arts, Entrepreneurship, Content Creation, Medicine, and more. 3-week commitment. Full logistical support from us.</div>
              <div style={{display:"flex", gap:"0.75rem", flexWrap:"wrap"}}>
                <button className="btn-primary">Apply to Mentor</button>
                <button className="btn-secondary">Email Your Interest</button>
              </div>
            </div>

            <div className="involve-card">
              <div className="involve-num">02</div>
              <div className="involve-title" style={{color:"var(--navy)"}}>Partner With Us</div>
              <div className="involve-desc">We welcome educational institutions, corporations, media organisations, tech companies, and foundations who share our vision. Custom partnership packages available.</div>
              <button className="btn-primary" style={{marginTop:"0.5rem"}}>Explore Partnership</button>
            </div>

            <div className="involve-card">
              <div className="involve-num">03</div>
              <div className="involve-title" style={{color:"var(--navy)"}}>Volunteer Your Skills</div>
              <div className="involve-desc">Community moderators, content creators, tech support, event coordinators, curriculum developers, mentor scouts — every hour counts and your skills matter.</div>
              <button className="btn-primary" style={{marginTop:"0.5rem"}}>Volunteer With Us</button>
            </div>

            <div className="involve-card" style={{borderColor:"var(--gold)", background:"var(--gold-pale)"}}>
              <div className="involve-num" style={{color:"rgba(181,137,57,0.2)"}}>04</div>
              <div className="involve-title" style={{color:"var(--navy)"}}>Support Us Financially</div>
              <div className="involve-desc">WAMIDO is free for every member. Your contribution keeps it that way — funding platform hosting, curriculum development, and mentor logistics.</div>
              <button className="btn-primary" style={{marginTop:"0.5rem", background:"var(--navy)", color:"white"}}>Donate to WAMIDO →</button>
            </div>

            <div className="involve-card" style={{gridColumn:"span 2", background:"var(--grey-light)"}}>
              <div className="involve-num" style={{color:"#d1d5db"}}>05</div>
              <div className="involve-title" style={{color:"var(--navy)"}}>Spread the Word</div>
              <div className="involve-desc">The biggest way you can help right now? Share WAMIDO with a young person who's stuck, a parent looking for real opportunities, or a professional who wants to give back.</div>
              <div style={{background:"white", borderRadius:"12px", padding:"1.25rem", marginTop:"1rem", border:"1px dashed var(--gold)"}}>
                <div style={{fontSize:"0.75rem", color:"var(--gold)", fontWeight:700, letterSpacing:"1px", marginBottom:"0.75rem"}}>COPY & SHARE</div>
                <p style={{fontSize:"0.875rem", color:"var(--grey)", lineHeight:1.7}}>"I found WAMIDO — a family helping young people (14–21) get real mentorship, structured training, and fair career access. It's completely free. Check it out: <strong>wamido.org</strong>"</p>
              </div>
              <div style={{display:"flex", gap:"0.5rem", marginTop:"1.25rem", flexWrap:"wrap"}}>
                {["WhatsApp","Twitter/X","TikTok","Instagram"].map(s => <button key={s} className="social-btn">{s}</button>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function DonatePage() {
  const [selected, setSelected] = useState("5000");
  return (
    <div className="page">
      <section className="donate-hero">
        <div className="section-label" style={{color:"rgba(181,137,57,0.8)", marginBottom:"1rem"}}>Make an Impact</div>
        <h1 className="display" style={{color:"white", fontSize:"clamp(2.2rem,4vw,3.5rem)", marginBottom:"1rem"}}>Invest in the Next Generation</h1>
        <p className="section-sub" style={{color:"rgba(255,255,255,0.65)", maxWidth:"540px", margin:"0 auto"}}>WAMIDO is free for every member — and we're committed to keeping it that way. Your contribution makes that possible.</p>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="donate-grid">
            {/* DONATION FORM */}
            <div>
              <div className="donate-card">
                <div className="section-label">Individual Contribution</div>
                <h3 className="display" style={{fontSize:"1.6rem", color:"var(--navy)", marginBottom:"0.5rem"}}>Make a Donation</h3>
                <p style={{fontSize:"0.9rem", color:"var(--grey)", marginBottom:"1rem"}}>Choose an amount or enter your own. All amounts welcome.</p>
                <div className="donate-amounts">
                  {["2000","5000","10000","25000"].map(a => (
                    <button key={a} className={`amount-btn${selected===a?" selected":""}`} onClick={() => setSelected(a)}>₦{parseInt(a).toLocaleString()}</button>
                  ))}
                  <button className={`amount-btn${selected==="custom"?" selected":""}`} onClick={() => setSelected("custom")}>Other</button>
                </div>
                {selected === "custom" && <input className="donate-field" placeholder="Enter amount (₦)" />}
                <input className="donate-field" placeholder="Your name" />
                <input className="donate-field" placeholder="Email address" />
                <div className="gateway-note">
                  <span>⚙️</span>
                  <span><strong>Payment gateway coming soon.</strong> We're finalising our Paystack / Flutterwave integration. To donate now, email hello@wamido.org with subject "Donation" — we'll respond within 24 hours.</span>
                </div>
                <button className="btn-primary w-full" style={{justifyContent:"center", marginTop:"0.5rem", padding:"1rem"}}>Proceed to Payment →</button>
                <p style={{fontSize:"0.75rem", color:"var(--grey)", textAlign:"center", marginTop:"0.75rem"}}>International contributions welcome · Secure payment processing</p>
              </div>
            </div>

            {/* INFO */}
            <div>
              <div style={{marginBottom:"2rem"}}>
                <div className="section-label">Where It Goes</div>
                <h3 className="display" style={{fontSize:"1.4rem", color:"var(--navy)", marginBottom:"1rem"}}>Your Support Directly Enables</h3>
                <ul className="transparent-list">
                  {[
                    ["More trained young people","LMS platform hosting, development, and maintenance"],
                    ["Higher-quality mentors","Logistics that make it easy for busy professionals to say yes"],
                    ["Better content","Curriculum development, video production, resources"],
                    ["Stronger community","Management and moderation to keep the family healthy"],
                    ["Scaled impact","Infrastructure to grow from hundreds to thousands"],
                  ].map(([t, d]) => (
                    <li key={t} style={{display:"flex", gap:"10px", padding:"0.7rem 0", borderBottom:"1px solid #f3f4f6", alignItems:"flex-start"}}>
                      <span style={{color:"var(--green)", fontWeight:700, flexShrink:0, marginTop:"2px"}}>✓</span>
                      <span><strong style={{color:"var(--navy)", display:"block", fontSize:"0.9rem"}}>{t}</strong><span style={{fontSize:"0.82rem", color:"var(--grey)"}}>{d}</span></span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{background:"var(--navy)", borderRadius:"16px", padding:"1.75rem"}}>
                <div style={{color:"var(--gold)", fontSize:"0.75rem", fontWeight:700, letterSpacing:"2px", textTransform:"uppercase", marginBottom:"0.75rem"}}>Our Transparency Commitment</div>
                <ul style={{listStyle:"none"}}>
                  {["We publish how every contribution is used","No funds go to founder salaries at this stage","Every naira goes toward platform, people, and programme","You can ask us directly: hello@wamido.org"].map(i => (
                    <li key={i} style={{color:"rgba(255,255,255,0.7)", fontSize:"0.875rem", padding:"0.35rem 0", display:"flex", gap:"8px"}}>
                      <span style={{color:"var(--gold)"}}>—</span> {i}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{marginTop:"2rem", background:"var(--gold-pale)", borderRadius:"16px", padding:"1.75rem", border:"1px solid rgba(181,137,57,0.2)"}}>
                <div className="section-label">Organisations</div>
                <h3 className="display" style={{fontSize:"1.2rem", color:"var(--navy)", marginBottom:"0.75rem"}}>Corporate & Foundation Giving</h3>
                <p style={{fontSize:"0.875rem", color:"var(--grey)", lineHeight:1.7, marginBottom:"1rem"}}>Sponsor a cohort, fund a training cycle, or establish a named partnership aligned with your CSR goals.</p>
                <button className="btn-primary" style={{background:"var(--navy)"}}>Discuss Organisational Support</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    ["How do I join WAMIDO?","Click 'Join the Family' anywhere on the site to join our Telegram channel. Complete the 5-day onboarding to become an Ambassador ⭐."],
    ["How does the lottery work?","We use Random.org for completely transparent random selection. Everyone watches live during our YouTube sessions. Completing 6-week training makes you eligible."],
    ["What is the LMS?","Our Learning Management System is where Ambassadors complete the 6-week training programme. You access it after completing onboarding on Telegram."],
    ["Can I become a mentor?","Yes! Visit Get Involved or email hello@wamido.org with subject 'Mentor Application.'"],
    ["Where are events announced?","All community calls, YouTube Lives, and events are announced first in our Telegram channel. Join to stay updated."],
  ];

  return (
    <div className="page">
      <section className="hero" style={{minHeight:"40vh", padding:"5rem 2rem"}}>
        <div className="hero-bg-pattern" />
        <div className="hero-gold-bar" />
        <div className="hero-content" style={{textAlign:"center"}}>
          <div className="hero-tag">Get in Touch</div>
          <h1 className="display" style={{color:"white", fontSize:"clamp(2rem,4vw,3.2rem)", maxWidth:"600px", margin:"0 auto 1rem"}}>We're Here. <em>Let's Talk.</em></h1>
          <p style={{color:"rgba(255,255,255,0.65)", maxWidth:"440px", margin:"0 auto"}}>Questions, ideas, feedback — we respond to every message within 24 hours.</p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner">
          <div className="contact-grid">
            {/* FORM */}
            <div className="contact-form-card">
              <div className="section-label">Send a Message</div>
              <h3 className="display" style={{fontSize:"1.5rem", color:"var(--navy)", marginBottom:"1.5rem"}}>We'd Love to Hear From You</h3>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" placeholder="Your full name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input className="form-input" placeholder="you@email.com" />
              </div>
              <div className="form-group">
                <label className="form-label">WhatsApp Number (optional)</label>
                <input className="form-input" placeholder="+234 xxx xxxx" />
              </div>
              <div className="form-group">
                <label className="form-label">I'm reaching out about *</label>
                <select className="form-select">
                  <option>General Inquiry</option>
                  <option>Mentorship Application</option>
                  <option>Partnership Opportunity</option>
                  <option>Volunteer Application</option>
                  <option>Donate / Financial Support</option>
                  <option>Technical Support</option>
                  <option>Media / Press Inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Your Message *</label>
                <textarea className="form-textarea" placeholder="Tell us what's on your mind..." />
              </div>
              <button className="btn-primary w-full" style={{justifyContent:"center", padding:"0.9rem"}}>Send Message →</button>
              <p style={{fontSize:"0.78rem", color:"var(--grey)", textAlign:"center", marginTop:"0.75rem"}}>We typically respond within 24 hours. For urgent matters: hello@wamido.org</p>
            </div>

            {/* INFO */}
            <div>
              <div className="contact-info">
                <div className="contact-info-title">Direct Contact</div>
                <div className="contact-detail">
                  <span className="contact-icon">✉️</span>
                  <div className="contact-text">
                    <strong>General Enquiries</strong>hello@wamido.org
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="contact-icon">🤝</span>
                  <div className="contact-text">
                    <strong>Partnerships & Sponsorships</strong>partnerships@wamido.org
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="contact-icon">🕐</span>
                  <div className="contact-text">
                    <strong>Office Hours</strong>Monday – Saturday · 9:00 AM – 9:00 PM WAT
                  </div>
                </div>
                <div className="contact-detail">
                  <span className="contact-icon">🌐</span>
                  <div className="contact-text">
                    <strong>Website</strong>wamido.org
                  </div>
                </div>

                <div style={{margin:"1.5rem 0", background:"var(--navy)", borderRadius:"16px", padding:"1.5rem"}}>
                  <div style={{color:"var(--gold)", fontWeight:700, fontSize:"0.85rem", marginBottom:"0.75rem"}}>Join the Family on Telegram</div>
                  <p style={{color:"rgba(255,255,255,0.65)", fontSize:"0.875rem", lineHeight:1.7, marginBottom:"1rem"}}>New here? The Telegram channel is your starting point — say hello, read the pinned messages, and begin your onboarding journey.</p>
                  <button className="btn-primary w-full" style={{justifyContent:"center"}}>Join WAMIDO Family 🏠</button>
                </div>

                <div className="contact-info-title">Follow Us</div>
                <div className="social-links">
                  {["Instagram","Twitter/X","TikTok","YouTube","Telegram"].map(s => (
                    <button key={s} className="social-btn">{s}</button>
                  ))}
                </div>
                <p style={{fontSize:"0.78rem", color:"var(--grey)", marginTop:"0.5rem"}}>@wamido.network across all platforms</p>

                <div className="faq-list" style={{marginTop:"2rem"}}>
                  <div className="contact-info-title">Quick Answers</div>
                  {faqs.map(([q, a], i) => (
                    <div key={i} className="faq-item">
                      <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                        <span>→ {q}</span>
                        <span style={{color:"var(--gold)", fontWeight:700}}>{openFaq === i ? "−" : "+"}</span>
                      </div>
                      {openFaq === i && <div className="faq-a">{a}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ── APP ────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("Home");

  const pages = {
    "Home": <HomePage setPage={setPage} />,
    "About Us": <AboutPage />,
    "Get Involved": <GetInvolvedPage />,
    "Donate": <DonatePage />,
    "Contact Us": <ContactPage />,
  };

  return (
    <>
      <style>{STYLES}</style>
      <Navbar page={page} setPage={setPage} />
      {pages[page] || pages["Home"]}
      <Footer setPage={setPage} />
    </>
  );
}
