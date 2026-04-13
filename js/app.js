const AppState = {
    isLoginMode: true,
    currentUser: null,
    selectedDonation: 100,
    STORAGE_KEY: 'ris_platform_users',
    SESSION_KEY: 'ris_platform_currentUser'
};

const AuthModule = {
    init() {
        const savedUser = localStorage.getItem(AppState.SESSION_KEY);
        if (savedUser) {
            try {
                AppState.currentUser = JSON.parse(savedUser);
                UIModule.showMainApp();
            } catch (e) {
                console.error('Error parsing session:', e);
                localStorage.removeItem(AppState.SESSION_KEY);
            }
        }
    },

    toggleMode() {
        AppState.isLoginMode = !AppState.isLoginMode;
        
        const authTitle = document.getElementById('authTitle');
        const authSubtitle = document.getElementById('authSubtitle');
        const authBtn = document.getElementById('authBtn');
        const authSwitchText = document.getElementById('authSwitchText');
        const nameGroup = document.getElementById('nameGroup');
        
        if (AppState.isLoginMode) {
            authTitle.textContent = 'Welcome Back';
            authSubtitle.textContent = 'Sign in to access the Resources Platform';
            authBtn.textContent = 'Sign In';
            authSwitchText.innerHTML = 'Don\'t have an account? <a onclick="AuthModule.toggleMode()" tabindex="0" role="button">Create one</a>';
            nameGroup.style.display = 'none';
        } else {
            authTitle.textContent = 'Join Our Community';
            authSubtitle.textContent = 'Create an account to access resources and support';
            authBtn.textContent = 'Create Account';
            authSwitchText.innerHTML = 'Already have an account? <a onclick="AuthModule.toggleMode()" tabindex="0" role="button">Sign in</a>';
            nameGroup.style.display = 'block';
        }
        
        UIModule.hideMessages();
        document.getElementById('authForm').reset();
    },

    handleSubmit(e) {
        e.preventDefault();
        UIModule.hideMessages();
        
        const email = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;
        const fullName = document.getElementById('fullName').value.trim();
        
        if (AppState.isLoginMode) {
            this.handleLogin(email, password);
        } else {
            this.handleRegister(email, password, fullName);
        }
    },

    handleLogin(email, password) {
        const users = JSON.parse(localStorage.getItem(AppState.STORAGE_KEY) || '[]');
        const user = users.find(u => u.email.toLowerCase() === email);
        
        if (!user) {
            UIModule.showError('No account found with this email. Please register first.');
            return;
        }
        
        if (user.password !== password) {
            UIModule.showError('Incorrect password. Please try again.');
            return;
        }
        
        AppState.currentUser = user;
        localStorage.setItem(AppState.SESSION_KEY, JSON.stringify(user));
        UIModule.showSuccess('Login successful! Redirecting...');
        
        setTimeout(() => UIModule.showMainApp(), 500);
    },

    handleRegister(email, password, fullName) {
        if (!fullName) {
            UIModule.showError('Please enter your full name.');
            return;
        }
        
        if (password.length < 6) {
            UIModule.showError('Password must be at least 6 characters long.');
            return;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            UIModule.showError('Please enter a valid email address.');
            return;
        }
        
        let users = JSON.parse(localStorage.getItem(AppState.STORAGE_KEY) || '[]');
        
        if (users.find(u => u.email.toLowerCase() === email)) {
            UIModule.showError('An account with this email already exists. Please login instead.');
            return;
        }
        
        const newUser = {
            email: email,
            password: password,
            fullName: fullName,
            phone: '',
            studentId: '',
            faculty: '',
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem(AppState.STORAGE_KEY, JSON.stringify(users));
        
        AppState.currentUser = newUser;
        localStorage.setItem(AppState.SESSION_KEY, JSON.stringify(newUser));
        
        UIModule.showSuccess('Account created successfully! Logging you in...');
        setTimeout(() => UIModule.showMainApp(), 1000);
    },

    logout() {
        AppState.currentUser = null;
        localStorage.removeItem(AppState.SESSION_KEY);
        
        UIModule.hideApp();
        document.getElementById('authForm').reset();
        AppState.isLoginMode = true;
        this.toggleMode();
        
        UIModule.showToast('Logged out successfully', 'success');
    },

    updateProfile(updates) {
        let users = JSON.parse(localStorage.getItem(AppState.STORAGE_KEY) || '[]');
        const userIndex = users.findIndex(u => u.id === AppState.currentUser.id);
        
        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updates };
            AppState.currentUser = users[userIndex];
            localStorage.setItem(AppState.STORAGE_KEY, JSON.stringify(users));
            localStorage.setItem(AppState.SESSION_KEY, JSON.stringify(AppState.currentUser));
            return true;
        }
        return false;
    },

    showProfile() {
        NavigationModule.hideAllViews();
        document.getElementById('profileView').classList.remove('hidden');
        
        if (AppState.currentUser) {
            const initials = AppState.currentUser.fullName
                ? AppState.currentUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                : AppState.currentUser.email[0].toUpperCase();
            
            document.getElementById('profileAvatar').textContent = initials;
            document.getElementById('profileName').textContent = AppState.currentUser.fullName || 'Not set';
            document.getElementById('profileEmail').textContent = AppState.currentUser.email || 'Not set';
            document.getElementById('profilePhone').textContent = AppState.currentUser.phone || 'Not set';
            document.getElementById('profileStudentId').textContent = AppState.currentUser.studentId || 'Not set';
            document.getElementById('profileFaculty').textContent = AppState.currentUser.faculty || 'Not set';
            document.getElementById('profileMemberSince').textContent = new Date(AppState.currentUser.createdAt).toLocaleDateString();
            
            document.getElementById('editName').value = AppState.currentUser.fullName || '';
            document.getElementById('editPhone').value = AppState.currentUser.phone || '';
            document.getElementById('editStudentId').value = AppState.currentUser.studentId || '';
            document.getElementById('editFaculty').value = AppState.currentUser.faculty || '';
        }
    }
};

const UIModule = {
    showMainApp() {
        document.getElementById('authContainer').classList.add('hidden');
        document.getElementById('mainApp').classList.remove('hidden');
        
        if (AppState.currentUser) {
            const initials = AppState.currentUser.fullName
                ? AppState.currentUser.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                : AppState.currentUser.email[0].toUpperCase();
            document.getElementById('userAvatar').textContent = initials;
        }
        
        NavigationModule.showPage('home');
    },

    hideApp() {
        document.getElementById('mainApp').classList.add('hidden');
        document.getElementById('authContainer').classList.remove('hidden');
    },

    showError(message) {
        const el = document.getElementById('errorMsg');
        el.textContent = message;
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 5000);
    },

    showSuccess(message) {
        const el = document.getElementById('successMsg');
        el.textContent = message;
        el.classList.add('show');
        setTimeout(() => el.classList.remove('show'), 3000);
    },

    hideMessages() {
        document.getElementById('errorMsg').classList.remove('show');
        document.getElementById('successMsg').classList.remove('show');
    },

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast ' + type;
        
        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
};

const NavigationModule = {
    currentPage: 'home',

    hideAllViews() {
        const views = ['home', 'about', 'services', 'volunteer', 'donate', 'resources', 'faq', 'contact', 'terms', 'profile'];
        views.forEach(view => {
            const el = document.getElementById(view + 'View');
            if (el) el.classList.add('hidden');
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
    },

    showPage(page) {
        this.hideAllViews();
        const view = document.getElementById(page + 'View');
        if (view) {
            view.classList.remove('hidden');
        }
        window.scrollTo(0, 0);
        this.closeMobileNav();
        
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(page)) {
                link.classList.add('active');
            }
        });
        
        this.currentPage = page;
    },

    toggleMobileNav() {
        const navLinks = document.getElementById('navLinks');
        const navToggle = document.querySelector('.nav-toggle');
        const navOverlay = document.querySelector('.nav-overlay');
        
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        if (navOverlay) {
            navOverlay.classList.toggle('active');
        }
    },

    closeMobileNav() {
        const navLinks = document.getElementById('navLinks');
        const navToggle = document.querySelector('.nav-toggle');
        const navOverlay = document.querySelector('.nav-overlay');
        
        if (navLinks) navLinks.classList.remove('active');
        if (navToggle) navToggle.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
    }
};

const ContactModule = {
    handleSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        const mailtoLink = `mailto:agnesntuli29@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message)}`;
        window.location.href = mailtoLink;
        
        UIModule.showToast('Opening your email client...', 'success');
        
        e.target.reset();
    }
};

const VolunteerModule = {
    handleSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('volName').value;
        const email = document.getElementById('volEmail').value;
        const interest = document.getElementById('volInterest').value;
        const message = document.getElementById('volMessage').value;
        
        const mailtoLink = `mailto:agnesntuli29@gmail.com?subject=${encodeURIComponent('Volunteer Application - ' + interest)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nInterest: ' + interest + '\n\nMessage:\n' + message)}`;
        window.location.href = mailtoLink;
        
        UIModule.showToast('Opening your email client...', 'success');
        
        e.target.reset();
    }
};

const DonationModule = {
    selectOption(element, amount) {
        document.querySelectorAll('.donation-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        element.classList.add('selected');
        
        document.getElementById('donAmount').value = amount;
        AppState.selectedDonation = amount;
    },

    handleSubmit(e) {
        e.preventDefault();
        
        const name = document.getElementById('donName').value;
        const email = document.getElementById('donEmail').value;
        const phone = document.getElementById('donPhone').value;
        const amount = document.getElementById('donAmount').value;
        const donorMessage = document.getElementById('donMessage').value;
        
        const mailtoLink = `mailto:agnesntuli29@gmail.com?subject=${encodeURIComponent('Donation - R' + amount)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + phone + '\nDonation Amount: R' + amount + '\n\nMessage:\n' + donorMessage)}`;
        window.location.href = mailtoLink;
        
        UIModule.showToast('Opening your email client...', 'success');
        
        e.target.reset();
    }
};

const ProfileModule = {
    handleSubmit(e) {
        e.preventDefault();
        
        const updates = {
            fullName: document.getElementById('editName').value.trim(),
            phone: document.getElementById('editPhone').value.trim(),
            studentId: document.getElementById('editStudentId').value.trim(),
            faculty: document.getElementById('editFaculty').value.trim()
        };
        
        if (!updates.fullName) {
            UIModule.showToast('Full name is required', 'error');
            return;
        }
        
        if (AuthModule.updateProfile(updates)) {
            UIModule.showToast('Profile updated successfully!', 'success');
            AuthModule.showProfile();
            
            const initials = updates.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
            document.getElementById('userAvatar').textContent = initials;
        } else {
            UIModule.showToast('Failed to update profile', 'error');
        }
    }
};

const DetailsModule = {
    toggle(detailsId, btn) {
        const details = document.getElementById(detailsId);
        const isActive = details.classList.contains('active');
        
        const parentGrid = btn.closest('.services-grid');
        if (parentGrid) {
            parentGrid.querySelectorAll('.service-details').forEach(d => {
                d.classList.remove('active');
            });
            parentGrid.querySelectorAll('.btn-expand').forEach(b => {
                b.textContent = 'Learn More';
            });
        }
        
        if (!isActive) {
            details.classList.add('active');
            btn.textContent = 'Show Less';
        }
    }
};

const FAQModule = {
    toggle(element) {
        const isActive = element.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        if (!isActive) {
            element.classList.add('active');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    AuthModule.init();
    
    document.getElementById('authForm').addEventListener('submit', (e) => {
        AuthModule.handleSubmit(e);
    });
    
    document.getElementById('authSwitchText').querySelector('a').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            AuthModule.toggleMode();
        }
    });
    
    document.querySelector('.logo').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            NavigationModule.showPage('home');
        }
    });
    
    document.querySelector('.nav-toggle').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            NavigationModule.toggleMobileNav();
        }
    });

    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            ProfileModule.handleSubmit(e);
        });
    }

    console.log('Resources & Information Scarcity Platform loaded successfully');
});

function toggleAuthMode() { AuthModule.toggleMode(); }
function showPage(page) { NavigationModule.showPage(page); }
function toggleMobileNav() { NavigationModule.toggleMobileNav(); }
function handleContactSubmit(e) { ContactModule.handleSubmit(e); }
function handleVolunteerSubmit(e) { VolunteerModule.handleSubmit(e); }
function handleDonationSubmit(e) { DonationModule.handleSubmit(e); }
function toggleDetails(id, btn) { DetailsModule.toggle(id, btn); }
function toggleFaq(element) { FAQModule.toggle(element); }
function selectDonation(element, amount) { DonationModule.selectOption(element, amount); }
function logout() { AuthModule.logout(); }
function showProfile() { AuthModule.showProfile(); }