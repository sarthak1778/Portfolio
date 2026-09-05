/**
 * Dynamic ATS-Compliant PDF Resume Generator
 * Module: js/resume-generator.js
 * 
 * Complies with strict Applicant Tracking System (ATS) guidelines:
 * - Single-column vertical layout (100% machine parseable)
 * - Standard web-safe typography (Helvetica, Arial, sans-serif)
 * - Clear semantic headings (SUMMARY, EDUCATION, TECHNICAL SKILLS, PROJECTS, CERTIFICATIONS)
 * - Zero graphical icons, complex SVG paths, or multi-column floats in the OCR layer
 * - Direct client-side PDF export without page reloads using html2pdf.js
 */

(function (window) {
  'use strict';

  function generateATSResume() {
    const data = window.PROFILE_DATA;
    if (!data) {
      alert('Profile data is currently loading. Please try again in a moment.');
      return;
    }

    const { personal, education, projects, skillsGrouped, certifications, achievements } = data;

    // Create container for ATS Resume
    const container = document.createElement('div');
    container.id = 'ats-resume-export-container';
    container.style.position = 'fixed';
    container.style.left = '-9999px';
    container.style.top = '0';
    container.style.width = '800px';
    container.style.padding = '36px 44px';
    container.style.background = '#FFFFFF';
    container.style.color = '#111111';
    container.style.fontFamily = 'Arial, Helvetica, sans-serif';
    container.style.fontSize = '11pt';
    container.style.lineHeight = '1.45';
    container.style.boxSizing = 'border-box';

    // Helper: Section title builder
    const makeSectionHeader = (title) => `
      <div style="margin-top: 14px; margin-bottom: 6px; border-bottom: 1.5px solid #111111; padding-bottom: 2px;">
        <h2 style="margin: 0; font-size: 11pt; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; color: #000000;">
          ${title}
        </h2>
      </div>
    `;

    // 1. Header (Centered, Clean ATS contact line)
    const headerHtml = `
      <div style="text-align: center; margin-bottom: 12px;">
        <h1 style="margin: 0 0 4px 0; font-size: 20pt; font-weight: bold; color: #000000; letter-spacing: 0.5px;">
          ${personal.name.toUpperCase()}
        </h1>
        <div style="font-size: 10pt; color: #333333; margin-bottom: 4px;">
          ${personal.location} | ${personal.phone} | ${personal.email}
        </div>
        <div style="font-size: 9.5pt; color: #222222;">
          LinkedIn: ${personal.linkedinUrl} | GitHub: ${personal.githubUrl}
        </div>
      </div>
    `;

    // 2. Professional Summary
    const summaryHtml = `
      ${makeSectionHeader('Professional Summary')}
      <div style="font-size: 10pt; text-align: justify; margin-top: 4px;">
        ${personal.resumeObjective || personal.bio}
      </div>
    `;

    // 3. Education
    const educationItems = (education || []).map(edu => `
      <div style="margin-bottom: 6px;">
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 10.5pt;">
          <span>${edu.institution}</span>
          <span>${edu.year}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 10pt; font-style: italic; color: #333333;">
          <span>${edu.level}</span>
          <span>Score / CGPA: ${edu.score}</span>
        </div>
      </div>
    `).join('');

    const educationHtml = `
      ${makeSectionHeader('Education')}
      <div style="margin-top: 4px;">
        ${educationItems}
      </div>
    `;

    // 4. Technical Skills (Grouped with clean colon separation)
    const skillsList = Object.values(skillsGrouped || {}).map(group => `
      <div style="font-size: 10pt; margin-bottom: 3px;">
        <strong style="color: #000000;">${group.category}:</strong>
        <span style="color: #222222;">${group.skills.join(', ')}</span>
      </div>
    `).join('');

    const skillsHtml = `
      ${makeSectionHeader('Technical Skills')}
      <div style="margin-top: 4px;">
        ${skillsList}
      </div>
    `;

    // 5. Featured Projects (filter featured: true)
    const featuredProjects = (projects || []).filter(p => p.featured === true);
    const projectItems = featuredProjects.map(p => `
      <div style="margin-bottom: 8px;">
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 10.5pt;">
          <span>${p.title} <span style="font-weight: normal; font-size: 9.5pt; font-style: italic;">| ${p.scope}</span></span>
          <span style="font-size: 9pt; font-weight: normal;">${p.status}</span>
        </div>
        <div style="font-size: 9.5pt; margin: 2px 0; color: #222222;">
          <strong>Technologies:</strong> ${p.technologies.join(', ')}
        </div>
        <ul style="margin: 2px 0 0 16px; padding: 0; font-size: 9.5pt; color: #222222;">
          <li><strong>Problem & Context:</strong> ${p.problem}</li>
          <li><strong>Implementation:</strong> ${p.solution}</li>
          <li><strong>Impact / Result:</strong> ${p.keyResult}</li>
        </ul>
      </div>
    `).join('');

    const projectsHtml = `
      ${makeSectionHeader('Key Engineering & Software Projects')}
      <div style="margin-top: 4px;">
        ${projectItems}
      </div>
    `;

    // 6. Leadership & Extracurricular Highlights
    const achievementItems = (achievements || []).map(a => `
      <li style="margin-bottom: 3px;">${a}</li>
    `).join('');

    const achievementsHtml = `
      ${makeSectionHeader('Leadership & Extracurricular Highlights')}
      <ul style="margin: 4px 0 0 16px; padding: 0; font-size: 9.5pt; color: #222222;">
        ${achievementItems}
      </ul>
    `;

    // 7. Certifications & Credentials
    const certItems = (certifications || []).map(c => `
      <div style="margin-bottom: 4px; font-size: 9.5pt;">
        <strong style="color: #000000;">${c.title}</strong> — ${c.issuer} (${c.issueDate})
        <div style="color: #444444; font-size: 9pt;">${c.description}</div>
      </div>
    `).join('');

    const certsHtml = `
      ${makeSectionHeader('Verified Certifications & Credentials')}
      <div style="margin-top: 4px;">
        ${certItems}
      </div>
    `;

    // Assemble document
    container.innerHTML = `
      ${headerHtml}
      ${summaryHtml}
      ${educationHtml}
      ${skillsHtml}
      ${projectsHtml}
      ${achievementsHtml}
      ${certsHtml}
    `;

    document.body.appendChild(container);

    // PDF options for optimal ATS rendering (clean text vectors, standard A4 letter size)
    const opt = {
      margin: [10, 12, 10, 12], // mm: top, right, bottom, left
      filename: 'Sarthak_Choudhary_Resume_ATS.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: false
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      }
    };

    // Show indicator on trigger button if available
    const downloadBtns = document.querySelectorAll('.resume-btn, .js-download-ats-resume, #download-resume-btn, #hero-resume-btn, #navResumeBtn');
    downloadBtns.forEach(b => {
      b.dataset.originalText = b.innerText;
      b.innerText = 'Generating ATS PDF...';
      b.style.pointerEvents = 'none';
      b.style.opacity = '0.7';
    });

    if (window.html2pdf) {
      window.html2pdf()
        .set(opt)
        .from(container)
        .save()
        .then(() => {
          document.body.removeChild(container);
          downloadBtns.forEach(b => {
            b.innerText = b.dataset.originalText || 'Download ATS Resume (PDF)';
            b.style.pointerEvents = 'auto';
            b.style.opacity = '1';
          });
          if (typeof showToast === 'function') {
            showToast('ATS Resume PDF generated successfully!');
          }
        })
        .catch(err => {
          console.error('PDF generation error:', err);
          document.body.removeChild(container);
          alert('Could not compile PDF directly. Opening print dialog as fallback.');
          window.print();
          downloadBtns.forEach(b => {
            b.innerText = b.dataset.originalText || 'Download ATS Resume (PDF)';
            b.style.pointerEvents = 'auto';
            b.style.opacity = '1';
          });
        });
    } else {
      window.print();
      document.body.removeChild(container);
    }
  }

  window.generateATSResume = generateATSResume;

})(window);
