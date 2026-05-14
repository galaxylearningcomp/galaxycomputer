// ============================================
// Galaxy Learning Computer - Certificate Verification
// JavaScript Logic
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
    }
};

// DOM Elements
const certificateForm = document.getElementById('certificateForm');
const certificateNumberInput = document.getElementById('certificateNumber');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const verificationSection = document.querySelector('.verification-section');
const resultsSection = document.getElementById('resultsSection');

// Event Listeners
certificateForm.addEventListener('submit', handleFormSubmit);
certificateNumberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleFormSubmit(e);
    }
});

// ============================================
// Main Functions
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
// Initialization
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    certificateNumberInput.focus();
});
