// ============================================
// Galaxy Learning Computer - Certificate Verification
// Enhanced JavaScript with Navigation & Features
// ============================================

// Certificate Database
const certificateDatabase = {
    'GLC-2024-001234': {
        studentName: 'Raj Kumar',
        course: 'Advanced Python Programming',
        rollNumber: 'DCA-2024-001',
        issueDate: '2024-05-10',
        expiryDate: '2027-05-10',
        grade: 'A+',
        description: 'Comprehensive course covering Python fundamentals, OOP, data structures, and advanced web development techniques.',
        verifiedBy: 'Dr. Priya Sharma',
        status: 'valid'
    },
    'GLC-2024-001235': {
        studentName: 'Aisha Patel',
        course: 'Diploma in Computer Application',
        rollNumber: 'DCA-2024-002',
        issueDate: '2023-03-15',
        expiryDate: '2024-03-15',
        grade: 'A',
        description: 'Intensive training in computer applications and modern software development.',
        verifiedBy: 'Mr. Vikram Singh',
        status: 'expired'
    },
    'GLC-2024-001236': {
        studentName: 'Vikram Desai',
        course: 'Data Science & Machine Learning',
        rollNumber: 'DSC-2024-001',
        issueDate: '2024-02-20',
        expiryDate: '2027-02-20',
        grade: 'A',
        description: 'Advanced course in Python, NumPy, Pandas, Scikit-learn, and machine learning algorithms.',
        verifiedBy: 'Prof. Anita Verma',
        status: 'valid'
    },
    'GLC-2024-001237': {
        studentName: 'Neha Gupta',
        course: 'Cloud Computing with AWS',
        rollNumber: 'AWS-2024-001',
        issueDate: '2023-08-10',
        expiryDate: '2025-08-10',
        grade: 'B+',
        description: 'Comprehensive training on AWS services, EC2, S3, Lambda, and cloud architecture design.',
        verifiedBy: 'Mr. Rajesh Kumar',
        status: 'valid'
    },
    'GLC-2024-001238': {
        studentName: 'Arjun Malhotra',
        course: 'Advanced Python Programming',
        rollNumber: 'PY-2024-001',
        issueDate: '2024-01-05',
        expiryDate: '2027-01-05',
        grade: 'A+',
        description: 'Complete course in Python programming with advanced OOP concepts and best practices.',
        verifiedBy: 'Ms. Sneha Desai',
        status: 'valid'
    },
    'GLC-2024-001239': {
        studentName: 'Shadab Khan',
        course: 'Diploma in CCTV and Security',
        rollNumber: 'CCTV-2024-001',
        issueDate: '2024-03-01',
        expiryDate: '2027-03-01',
        grade: 'A+',
        description: 'Expert training in closed-circuit television systems, surveillance technology, and modern security solutions.',
        verifiedBy: 'Mr. Ahmed Hassan',
        status: 'valid'
    },
    'GLC-2024-001240': {
        studentName: 'Shadab Khan',
        course: 'Certification in CAFM',
        rollNumber: 'CAFM-2024-001',
        issueDate: '2024-04-15',
        expiryDate: '2027-04-15',
        grade: 'A',
        description: 'Professional certification in Computer-Aided Facility Management covering systems and best practices.',
        verifiedBy: 'Dr. Fatima Khan',
        status: 'valid'
    }
};

// Global Variables
let currentTheme = localStorage.getItem('theme') || 'light';
let currentDisplayCertificate = null;

// DOM Elements
const certificateForm = document.getElementById('certificateForm');
const certificateNumberInput = document.getElementById('certificateNumber');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const verificationSection = document.querySelector('.verification-section');
const resultsSection = document.getElementById('resultsSection');
const themeToggle = document.getElementById('themeToggle');
const contactForm = document.getElementById('contactForm');
const navLinks = document.querySelectorAll('.nav-link');

// Event Listeners
certificateForm.addEventListener('submit', handleFormSubmit);
certificateNumberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleFormSubmit(e);
    }
});

themeToggle.addEventListener('click', toggleTheme);

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        navLinks.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');
    });
});

if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
}

// Initialize Theme
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    certificateNumberInput.focus();
    updateThemeToggleIcon();
});

// ============================================
// Navigation Scroll Function
// ============================================

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// Theme Management
// ============================================

function initializeTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggleIcon();
}

function updateThemeToggleIcon() {
    themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

// ============================================
// Certificate Verification Functions
// ============================================

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Reset previous state
    hideError();
    hideResults();
    
    // Show loading spinner
    loadingSpinner.classList.remove('hidden');
    certificateForm.style.opacity = '0.5';
    certificateForm.style.pointerEvents = 'none';
    
    // Get certificate number
    const certificateNumber = certificateNumberInput.value.trim().toUpperCase();
    
    // Simulate API call with delay
    setTimeout(() => {
        loadingSpinner.classList.add('hidden');
        certificateForm.style.opacity = '1';
        certificateForm.style.pointerEvents = 'auto';
        
        if (!certificateNumber) {
            showError('Please enter a certificate number');
            return;
        }
        
        // Check if certificate exists
        const certificate = certificateDatabase[certificateNumber];
        if (!certificate) {
            showError(`Certificate "${certificateNumber}" not found in our database.`);
            certificateNumberInput.focus();
            return;
        }
        
        // Display certificate
        displayCertificate(certificateNumber, certificate);
    }, 1000);
}

function displayCertificate(certNumber, certData) {
    // Calculate if certificate is valid
    const expiryDate = new Date(certData.expiryDate);
    const today = new Date();
    const isValid = today <= expiryDate;
    
    // Determine status
    const status = isValid ? 'valid' : 'expired';
    const statusText = isValid ? '✓ VALID' : '✗ EXPIRED';
    
    // Store current certificate for PDF download
    currentDisplayCertificate = { certNumber, ...certData };
    
    // Update DOM
    document.getElementById('detailCertNumber').textContent = certNumber;
    document.getElementById('detailStudentName').textContent = certData.studentName;
    document.getElementById('certificateName').textContent = certData.studentName;
    document.getElementById('detailCourse').textContent = certData.course;
    document.getElementById('detailRollNumber').textContent = certData.rollNumber;
    document.getElementById('detailIssueDate').textContent = formatDate(certData.issueDate);
    document.getElementById('detailExpiryDate').textContent = formatDate(certData.expiryDate);
    document.getElementById('detailGrade').textContent = certData.grade;
    document.getElementById('detailDescription').textContent = certData.description;
    document.getElementById('detailVerifiedBy').textContent = certData.verifiedBy;
    document.getElementById('verificationTime').textContent = new Date().toLocaleString();
    
    // Update status badge
    const statusBadge = document.getElementById('statusBadge');
    statusBadge.textContent = statusText;
    statusBadge.className = `status-badge ${status}`;
    
    // Show results section
    showResults();
    
    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ============================================
// Contact Form Handler
// ============================================

function handleContactSubmit(e) {
    e.preventDefault();
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.className = 'success-message';
    successMsg.textContent = '✓ Thank you! Your message has been sent successfully.';
    
    contactForm.appendChild(successMsg);
    contactForm.reset();
    
    setTimeout(() => {
        successMsg.remove();
    }, 3000);
}

// ============================================
// Utility Functions
// ============================================

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-IN', options);
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function hideError() {
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
}

function showResults() {
    resultsSection.classList.remove('hidden');
    verificationSection.style.display = 'none';
}

function hideResults() {
    resultsSection.classList.add('hidden');
    verificationSection.style.display = 'block';
}

function goBack() {
    hideResults();
    verificationSection.style.display = 'block';
    certificateNumberInput.value = '';
    certificateNumberInput.focus();
}

// ============================================
// PDF Download Function
// ============================================

function downloadCertificatePDF() {
    if (!currentDisplayCertificate) return;
    
    const cert = currentDisplayCertificate;
    const today = new Date().toLocaleDateString();
    
    // Create PDF content as HTML
    const pdfContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>Certificate - ${cert.certNumber}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    background: white;
                }
                .certificate {
                    border: 3px solid #0066cc;
                    padding: 40px;
                    text-align: center;
                    background: linear-gradient(135deg, rgba(0, 102, 204, 0.02) 0%, rgba(139, 92, 246, 0.02) 100%);
                }
                .header {
                    font-size: 32px;
                    font-weight: bold;
                    color: #0066cc;
                    margin-bottom: 20px;
                }
                .cert-number {
                    font-size: 14px;
                    color: #666;
                    margin-bottom: 30px;
                    font-family: monospace;
                }
                .student-name {
                    font-size: 24px;
                    font-weight: bold;
                    margin: 30px 0;
                }
                .course {
                    font-size: 18px;
                    color: #333;
                    margin: 20px 0;
                }
                .details {
                    margin: 40px 0;
                    text-align: left;
                    display: inline-block;
                }
                .detail-row {
                    margin: 15px 0;
                    font-size: 14px;
                }
                .detail-label {
                    font-weight: bold;
                    color: #0066cc;
                    width: 120px;
                    display: inline-block;
                }
                .detail-value {
                    color: #333;
                }
                .status {
                    margin: 30px 0;
                    font-size: 16px;
                    font-weight: bold;
                }
                .status.valid {
                    color: #10b981;
                }
                .status.expired {
                    color: #ef4444;
                }
                .footer {
                    margin-top: 40px;
                    font-size: 12px;
                    color: #999;
                    border-top: 1px solid #ccc;
                    padding-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="certificate">
                <div class="header">🎓 Certificate of Achievement</div>
                <div class="cert-number">Certificate #: ${cert.certNumber}</div>
                
                <p>This is to certify that</p>
                <div class="student-name">${cert.studentName}</div>
                
                <p>has successfully completed the course</p>
                <div class="course">${cert.course}</div>
                
                <div class="details">
                    <div class="detail-row">
                        <span class="detail-label">Roll Number:</span>
                        <span class="detail-value">${cert.rollNumber}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Issue Date:</span>
                        <span class="detail-value">${formatDate(cert.issueDate)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Expiry Date:</span>
                        <span class="detail-value">${formatDate(cert.expiryDate)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Grade/Score:</span>
                        <span class="detail-value">${cert.grade}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Verified By:</span>
                        <span class="detail-value">${cert.verifiedBy}</span>
                    </div>
                </div>
                
                <div class="status ${cert.status}">
                    ${cert.status === 'valid' ? '✓ VALID' : '✗ EXPIRED'}
                </div>
                
                <div class="footer">
                    Downloaded on: ${today}<br>
                    Galaxy Learning Computer Institute
                </div>
            </div>
        </body>
        </html>
    `;
    
    // Create and download
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(pdfContent));
    element.setAttribute('download', `Certificate_${cert.certNumber}.html`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    // Show success message
    showError('✓ Certificate downloaded successfully!');
    setTimeout(() => hideError(), 3000);
}

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    certificateNumberInput.focus();
});

// Enroll button functionality
document.querySelectorAll('.btn-enroll').forEach(btn => {
    btn.addEventListener('click', function() {
        alert('Thank you for your interest! Enrollment feature coming soon.');
    });
});
