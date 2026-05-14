// ============================================
// Galaxy Learning Computer - Certificate Verification
// Enhanced JavaScript with Advanced Features
// ============================================

// Certificate Database
const certificateDatabase = {
    'GLC-2024-001234': {
        studentName: 'Raj Kumar',
        course: 'Advanced Python Programming',
        issueDate: '2024-05-10',
        expiryDate: '2027-05-10',
        grade: 'A+',
        description: 'Comprehensive course covering Python fundamentals, OOP, data structures, and advanced web development techniques.',
        verifiedBy: 'Dr. Priya Sharma',
        status: 'valid'
    },
    'GLC-2024-001235': {
        studentName: 'Aisha Patel',
        course: 'Web Design Fundamentals',
        issueDate: '2023-03-15',
        expiryDate: '2024-03-15',
        grade: 'A',
        description: 'Intensive training in HTML, CSS, JavaScript, and responsive web design principles.',
        verifiedBy: 'Mr. Vikram Singh',
        status: 'expired'
    },
    'GLC-2024-001236': {
        studentName: 'Vikram Desai',
        course: 'Data Science & Machine Learning',
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
        issueDate: '2023-08-10',
        expiryDate: '2025-08-10',
        grade: 'B+',
        description: 'Comprehensive training on AWS services, EC2, S3, Lambda, and cloud architecture design.',
        verifiedBy: 'Mr. Rajesh Kumar',
        status: 'valid'
    },
    'GLC-2024-001238': {
        studentName: 'Arjun Malhotra',
        course: 'Mobile App Development',
        issueDate: '2024-01-05',
        expiryDate: '2027-01-05',
        grade: 'A+',
        description: 'Complete course in React Native and Flutter for iOS and Android app development.',
        verifiedBy: 'Ms. Sneha Desai',
        status: 'valid'
    },
    'GLC-2024-001239': {
        studentName: 'Priya Sharma',
        course: 'Advanced Python Programming',
        issueDate: '2024-03-22',
        expiryDate: '2027-03-22',
        grade: 'A+',
        description: 'Mastery in Python programming with focus on enterprise applications.',
        verifiedBy: 'Dr. Priya Sharma',
        status: 'valid'
    },
    'GLC-2024-001240': {
        studentName: 'Rohan Singh',
        course: 'Web Design Fundamentals',
        issueDate: '2024-06-01',
        expiryDate: '2027-06-01',
        grade: 'A',
        description: 'Professional web design certification including UX/UI principles.',
        verifiedBy: 'Mr. Vikram Singh',
        status: 'valid'
    },
    'GLC-2024-001241': {
        studentName: 'Deepika Verma',
        course: 'Data Science & Machine Learning',
        issueDate: '2023-11-15',
        expiryDate: '2025-11-15',
        grade: 'B+',
        description: 'Intermediate ML course covering supervised and unsupervised learning.',
        verifiedBy: 'Prof. Anita Verma',
        status: 'valid'
    },
    'GLC-2024-001242': {
        studentName: 'Ajay Kumar',
        course: 'Cloud Computing with AWS',
        issueDate: '2022-12-01',
        expiryDate: '2024-12-01',
        grade: 'A',
        description: 'Expert level AWS certification.',
        verifiedBy: 'Mr. Rajesh Kumar',
        status: 'expired'
    }
};

// Global Variables
let currentPage = 1;
const itemsPerPage = 5;
let filteredCertificates = [];
let currentDisplayCertificate = null;
let currentTheme = localStorage.getItem('theme') || 'light';

// DOM Elements
const certificateForm = document.getElementById('certificateForm');
const certificateNumberInput = document.getElementById('certificateNumber');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const verificationSection = document.getElementById('verificationSection');
const resultsSection = document.getElementById('resultsSection');
const themeToggle = document.getElementById('themeToggle');
const filterStatusSelect = document.getElementById('filterStatus');
const filterCourseSelect = document.getElementById('filterCourse');
const filterSearchInput = document.getElementById('filterSearch');
const filterButtons = document.querySelectorAll('.filter-btn');
const resultsTableContainer = document.getElementById('resultsTableContainer');
const tableBody = document.getElementById('tableBody');
const noResults = document.getElementById('noResults');
const paginationContainer = document.getElementById('paginationContainer');

// Event Listeners
certificateForm.addEventListener('submit', handleFormSubmit);
certificateNumberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleFormSubmit(e);
    }
});

filterStatusSelect.addEventListener('change', applyFilters);
filterCourseSelect.addEventListener('change', applyFilters);
filterSearchInput.addEventListener('input', applyFilters);

filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const filter = e.target.dataset.filter;
        if (filter === 'valid') {
            filterStatusSelect.value = 'valid';
        } else if (filter === 'expired') {
            filterStatusSelect.value = 'expired';
        } else {
            filterStatusSelect.value = '';
        }
        applyFilters();
    });
});

// Initialize Theme
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    certificateNumberInput.focus();
    populateInitialTable();
    updateThemeToggleIcon();
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
// Main Functions
// ============================================

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Reset previous state
    hideError();
    hideResults();
    resultsTableContainer.classList.add('hidden');
    
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
// Filter & Search Functions
// ============================================

function applyFilters() {
    const statusFilter = filterStatusSelect.value;
    const courseFilter = filterCourseSelect.value;
    const searchFilter = filterSearchInput.value.toLowerCase();
    
    filteredCertificates = Object.entries(certificateDatabase)
        .filter(([certNum, certData]) => {
            // Status filter
            if (statusFilter && certData.status !== statusFilter) {
                return false;
            }
            
            // Course filter
            if (courseFilter && !certData.course.includes(courseFilter)) {
                return false;
            }
            
            // Search filter
            if (searchFilter) {
                const matchesName = certData.studentName.toLowerCase().includes(searchFilter);
                const matchesCourse = certData.course.toLowerCase().includes(searchFilter);
                if (!matchesName && !matchesCourse) {
                    return false;
                }
            }
            
            return true;
        })
        .map(([certNum, certData]) => ({ certNum, ...certData }));
    
    currentPage = 1;
    renderTable();
}

function renderTable() {
    tableBody.innerHTML = '';
    
    if (filteredCertificates.length === 0) {
        noResults.classList.remove('hidden');
        resultsTableContainer.classList.remove('hidden');
        paginationContainer.classList.add('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    resultsTableContainer.classList.remove('hidden');
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const paginatedItems = filteredCertificates.slice(startIdx, endIdx);
    
    // Render rows
    paginatedItems.forEach(cert => {
        const row = document.createElement('tr');
        const statusClass = cert.status === 'valid' ? '✓' : '✗';
        
        row.innerHTML = `
            <td><span class="mono">${cert.certNum}</span></td>
            <td>${cert.studentName}</td>
            <td>${cert.course}</td>
            <td>${cert.grade}</td>
            <td><span class="status-badge ${cert.status}">${statusClass} ${cert.status.toUpperCase()}</span></td>
            <td><button class="certificate-link" onclick="viewCertificateFromTable('${cert.certNum}')">View</button></td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Render pagination
    if (totalPages > 1) {
        renderPagination(totalPages);
    } else {
        paginationContainer.classList.add('hidden');
    }
}

function renderPagination(totalPages) {
    paginationContainer.innerHTML = '';
    paginationContainer.classList.remove('hidden');
    
    // Previous button
    if (currentPage > 1) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← Previous';
        prevBtn.onclick = () => {
            currentPage--;
            renderTable();
            document.querySelector('.results-table-container').scrollIntoView({ behavior: 'smooth' });
        };
        paginationContainer.appendChild(prevBtn);
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageSpan = document.createElement('span');
        if (i === currentPage) {
            const activeBtn = document.createElement('button');
            activeBtn.textContent = i;
            activeBtn.className = 'active';
            activeBtn.disabled = true;
            pageSpan.appendChild(activeBtn);
        } else {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.onclick = () => {
                currentPage = i;
                renderTable();
                document.querySelector('.results-table-container').scrollIntoView({ behavior: 'smooth' });
            };
            pageSpan.appendChild(pageBtn);
        }
        paginationContainer.appendChild(pageSpan);
    }
    
    // Next button
    if (currentPage < totalPages) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next →';
        nextBtn.onclick = () => {
            currentPage++;
            renderTable();
            document.querySelector('.results-table-container').scrollIntoView({ behavior: 'smooth' });
        };
        paginationContainer.appendChild(nextBtn);
    }
}

function populateInitialTable() {
    filteredCertificates = Object.entries(certificateDatabase)
        .map(([certNum, certData]) => ({ certNum, ...certData }));
    renderTable();
}

function resetFilters() {
    filterStatusSelect.value = '';
    filterCourseSelect.value = '';
    filterSearchInput.value = '';
    filterButtons.forEach(btn => btn.classList.remove('active'));
    filterButtons[0].classList.add('active');
    populateInitialTable();
}

function viewCertificateFromTable(certNum) {
    certificateNumberInput.value = certNum;
    handleFormSubmit(new Event('submit'));
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
            <title>Certificate - ${cert.certNum}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 40px;
                    background: white;
                }
                .certificate {
                    border: 3px solid #6366f1;
                    padding: 40px;
                    text-align: center;
                    background: linear-gradient(135deg, rgba(99, 102, 241, 0.02) 0%, rgba(139, 92, 246, 0.02) 100%);
                }
                .header {
                    font-size: 32px;
                    font-weight: bold;
                    color: #6366f1;
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
                    color: #6366f1;
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
                <div class="cert-number">Certificate #: ${cert.certNum}</div>
                
                <p>This is to certify that</p>
                <div class="student-name">${cert.studentName}</div>
                
                <p>has successfully completed the course</p>
                <div class="course">${cert.course}</div>
                
                <div class="details">
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
    element.setAttribute('download', `Certificate_${cert.certNum}.html`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    // Show success message
    showError('Certificate downloaded successfully! (HTML format)');
    setTimeout(() => hideError(), 3000);
}

// ============================================
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    certificateNumberInput.focus();
});
