document.addEventListener('DOMContentLoaded', function() {
    // Pertanyaan kuis
    const questions = [
        // Pertanyaan finansial (5 pertanyaan)
        {
            question: "Bagaimana kondisi keuangan kamu saat ini dalam mendukung pengembangan passion?",
            options: [
                { text: "Sangat tidak stabil", value: 1 },
                { text: "Butuh perbaikan", value: 2 },
                { text: "Cukup stabil", value: 3 },
                { text: "Sangat stabil", value: 4 }
            ],
            category: "financial"
        },
        {
            question: "Berapa besar pendapatan bulanan kamu saat ini?",
            options: [
                { text: "< Rp 5 juta", value: 1 },
                { text: "Rp 5-10 juta", value: 2 },
                { text: "Rp 10-20 juta", value: 3 },
                { text: "> Rp 20 juta", value: 4 }
            ],
            category: "financial"
        },
        {
            question: "Sudahkah kamu memiliki perlindungan finansial (asuransi, dana darurat, investasi)?",
            options: [
                { text: "Sama sekali tidak", value: 1 },
                { text: "Sangat minim", value: 2 },
                { text: "Cukup memadai", value: 3 },
                { text: "Sangat baik", value: 4 },
                { text: "Lengkap dan optimal", value: 5 }
            ],
            category: "financial"
        },
        {
            question: "Seberapa besar komitmen kamu untuk membangun kebebasan finansial dalam 5 tahun ke depan?",
            options: [
                { text: "Belum memikirkan sama sekali", value: 1 },
                { text: "Sedang merencanakan", value: 2 },
                { text: "Sudah mulai mengambil langkah kecil", value: 3 },
                { text: "Aktif mengejar dengan strategi jelas", value: 4 },
                { text: "Sangat berkomitmen dan sudah mengalami kemajuan", value: 5 }
            ],
            category: "financial"
        },
        {
            question: "Seberapa besar utang/kewajiban finansial yang kamu miliki?",
            options: [
                { text: "Sangat besar, melebihi kemampuan bayar", value: 1 },
                { text: "Cukup besar, tetapi masih bisa dikelola", value: 2 },
                { text: "Sedang, masih dalam batas wajar", value: 3 },
                { text: "Minimal, hampir tidak ada utang", value: 4 },
                { text: "Tidak ada utang sama sekali", value: 5 }
            ],
            category: "financial"
        },
        
        // Pertanyaan mindset (5 pertanyaan)
        {
            question: "Seberapa baik kamu memahami nilai-nilai hidup dan minat pribadi kamu?",
            options: [
                { text: "Sangat tidak memahami", value: 1 },
                { text: "Kurang memahami", value: 2 },
                { text: "Cukup memahami", value: 3 },
                { text: "Memahami dengan baik", value: 4 },
                { text: "Sangat memahami", value: 5 }
            ],
            category: "mindset"
        },
        {
            question: "Apakah kamu sudah memiliki aktivitas yang membuat kamu lupa waktu ketika melakukannya?",
            options: [
                { text: "Belum sama sekali", value: 1 },
                { text: "Sangat jarang", value: 2 },
                { text: "Kadang-kadang", value: 3 },
                { text: "Sering", value: 4 },
                { text: "Sangat sering", value: 5 }
            ],
            category: "mindset"
        },
        {
            question: "Seberapa besar kamu bersedia menginvestasikan sumber daya (waktu, uang) untuk passion?",
            options: [
                { text: "Sangat kecil", value: 1 },
                { text: "Kecil", value: 2 },
                { text: "Sedang", value: 3 },
                { text: "Besar", value: 4 },
                { text: "Sangat besar", value: 5 }
            ],
            category: "mindset"
        },
        {
            question: "Seberapa besar toleransi risiko kamu dalam mengejar passion?",
            options: [
                { text: "Sangat rendah", value: 1 },
                { text: "Rendah", value: 2 },
                { text: "Sedang", value: 3 },
                { text: "Tinggi", value: 4 },
                { text: "Sangat tinggi", value: 5 }
            ],
            category: "mindset"
        },
        {
            question: "Seberapa jelas visi kamu tentang peran passion dalam hidup kamu 5 tahun mendatang?",
            options: [
                { text: "Sangat tidak jelas", value: 1 },
                { text: "Kurang jelas", value: 2 },
                { text: "Cukup jelas", value: 3 },
                { text: "Jelas", value: 4 },
                { text: "Sangat jelas", value: 5 }
            ],
            category: "mindset"
        },
        
        // Pertanyaan network (5 pertanyaan)
        {
            question: "Seberapa luas jaringan profesional yang kamu miliki di bidang yang kamu minati?",
            options: [
                { text: "Sangat terbatas", value: 1 },
                { text: "Terbatas", value: 2 },
                { text: "Cukup luas", value: 3 },
                { text: "Luas", value: 4 },
                { text: "Sangat luas", value: 5 }
            ],
            category: "network"
        },
        {
            question: "Seberapa sering kamu terhubung dengan mentor atau orang yang lebih berpengalaman?",
            options: [
                { text: "Hampir tidak pernah", value: 1 },
                { text: "Jarang", value: 2 },
                { text: "Kadang-kadang", value: 3 },
                { text: "Sering", value: 4 },
                { text: "Sangat sering", value: 5 }
            ],
            category: "network"
        },
        {
            question: "Seberapa aktif kamu dalam komunitas yang relevan dengan minat kamu?",
            options: [
                { text: "Tidak aktif sama sekali", value: 1 },
                { text: "Sangat jarang aktif", value: 2 },
                { text: "Cukup aktif", value: 3 },
                { text: "Sangat aktif", value: 4 },
                { text: "Menjadi pengurus/pengelola komunitas", value: 5 }
            ],
            category: "network"
        },
        {
            question: "Seberapa mudah kamu mendapatkan dukungan atau saran ketika menghadapi masalah?",
            options: [
                { text: "Sangat sulit", value: 1 },
                { text: "Sulit", value: 2 },
                { text: "Cukup mudah", value: 3 },
                { text: "Mudah", value: 4 },
                { text: "Sangat mudah", value: 5 }
            ],
            category: "network"
        },
        {
            question: "Seberapa besar pengaruh jaringan kamu terhadap perkembangan karier/passion kamu?",
            options: [
                { text: "Sangat kecil", value: 1 },
                { text: "Kecil", value: 2 },
                { text: "Sedang", value: 3 },
                { text: "Besar", value: 4 },
                { text: "Sangat besar", value: 5 }
            ],
            category: "network"
        }
    ];
    
    // Profile descriptions
    const profileDescriptions = {
        // ... [deskripsi profil] ...
    };

    // Mapping icon untuk 36 identitas
    const profileIcons = {
        // ... [icon profil] ...
    };
    
    // Variabel global
    let currentQuestion = -1;
    let answers = {};
    let financialScore = 0;
    let mindsetScore = 0;
    let networkScore = 0;
    let userName = "";
    let userEmail = "";
    
    // Elemen DOM
    const openingContainerEl = document.getElementById('opening-container');
    const explanationContainerEl = document.getElementById('explanation-container');
    const questionContainerEl = document.getElementById('question-container');
    const questionTextEl = document.getElementById('question-text');
    const optionsContainerEl = document.getElementById('options-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const quizStepsEl = document.querySelector('.quiz-steps');
    const resultContainerEl = document.getElementById('result-container');
    const startQuizBtn = document.getElementById('start-quiz');
    const startQuestionsBtn = document.getElementById('start-questions');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    
    // Fungsi untuk menginisialisasi step indicator
    function initSteps() {
        quizStepsEl.innerHTML = '';
        for (let i = 0; i < questions.length; i++) {
            const step = document.createElement('div');
            step.className = 'quiz-step';
            quizStepsEl.appendChild(step);
        }
    }
    
    // Fungsi untuk menampilkan pertanyaan
    function showQuestion() {
        // ... [fungsi showQuestion] ...
    }
    
    // Fungsi untuk berpindah ke pertanyaan berikutnya
    function goToNextQuestion() {
        // ... [fungsi goToNextQuestion] ...
    }
    
    // Fungsi untuk kembali ke pertanyaan sebelumnya
    function goToPrevQuestion() {
        // ... [fungsi goToPrevQuestion] ...
    }
    
    // Fungsi untuk menentukan kategori finansial
    function getFinancialCategory(score) {
        // ... [fungsi getFinancialCategory] ...
    }
    
    // Fungsi untuk menentukan kategori mindset
    function getMindsetCategory(score) {
        // ... [fungsi getMindsetCategory] ...
    }
    
    // Fungsi untuk menentukan kategori network
    function getNetworkCategory(score) {
        // ... [fungsi getNetworkCategory] ...
    }
    
    // Fungsi untuk menghitung hasil
    function calculateResults() {
        // ... [fungsi calculateResults] ...
    }
    
    // Fungsi untuk menampilkan hasil
    function showResults() {
        const results = calculateResults();
        const userName = document.getElementById('name').value;
        const profileDesc = profileDescriptions[results.profileKey] || "Profil kamu unik dan penuh potensi. Gunakan kekuatan finansial, jaringan, dan passion kamu untuk mencapai tujuan.";
        const profileIcon = profileIcons[results.profileKey] || 'fas fa-user';
        
        // Sembunyikan kontainer pertanyaan dan tampilkan hasil
        questionContainerEl.style.display = 'none';
        resultContainerEl.style.display = 'block';
        openingContainerEl.style.display = 'none';
        explanationContainerEl.style.display = 'none';
        
        // Buat rekomendasi yang diurutkan
        const recommendations = [
            {
                title: results.mindsetScore <= 15 ? "Passion Discovery Blueprint" : "Passion Transformation Blueprint",
                description: results.mindsetScore <= 15 
                    ? "Temukan passion sejati melalui metode RES Framework" 
                    : "Temukan + eksekusi passion sejati dengan pendekatan full RESET Framework",
                icon: "fas fa-search",
                tag: "Program Utama",
                priority: 0
            },
            {
                title: "Passion Shield Projects",
                description: "Bangun '<u>cash armor</u>' untuk mendanai kebutuhan dasar hidupmu sambil mengejar passion",
                icon: "fas fa-shield-alt",
                tag: results.financialScore <= 10 ? "Sangat Dianjurkan" : results.financialScore <= 15 ? "Dianjurkan" : "Opsional",
                priority: results.financialScore <= 10 ? 1 : results.financialScore <= 15 ? 2 : 3,
                note: "<div class='psp-tag'>🔥 Gratis, dengan Commitment Fee, Kuota Sisa: 7 slot!</div>"
            },
            {
                title: "Financial Protection Check Up",
                description: "Pastikan perlindungan finansial kamu memadai dengan konsultasi gratis",
                icon: "fas fa-coins",
                tag: results.financialScore <= 15 ? "Dianjurkan" : "Opsional",
                priority: results.financialScore <= 15 ? 2 : 3
            },
            {
                title: "Passion Collaboration Network",
                description: "Komunitas berbagai passion dengan peluang kolaborasi digital ataupun on ground",
                icon: "fas fa-network-wired",
                tag: results.networkScore <= 12 ? "Sangat Dianjurkan" : "Dianjurkan",
                priority: results.networkScore <= 12 ? 1 : 2
            }
        ];
        
        // Urutkan rekomendasi berdasarkan prioritas
        recommendations.sort((a, b) => a.priority - b.priority);
        
        // Bangun HTML untuk rekomendasi aksi
        let recsHTML = '';
        recommendations.forEach(rec => {
            recsHTML += `
                <div class="recommendation-card">
                    <div class="rec-icon">
                        <i class="${rec.icon}"></i>
                    </div>
                    <div>
                        <h4>${rec.title}</h4>
                        <p>${rec.description}</p>
                        <div class="rec-tag ${rec.tag === 'Sangat Dianjurkan' ? 'tag-high' : rec.tag === 'Dianjurkan' ? 'tag-medium' : 'tag-low'}">
                            ${rec.tag}
                        </div>
                        ${rec.note ? rec.note : ''}
                        <a href="#${rec.title.split(' ').join('').toLowerCase()}" class="rec-button">Selengkapnya</a>
                    </div>
                </div>
            `;
        });
        
        // Bangun HTML untuk rekomendasi terbaik
        const mainProgramPrice = results.mindsetScore <= 15 ? 
            `<span class="original-price">Rp497.000</span> <span class="discounted-price">Rp287.000</span>` : 
            `<span class="original-price">Rp789.000</span> <span class="discounted-price">Rp529.000</span>`;
        
        const bestRecHTML = `
            <div class="best-recommendation">
                <h3 class="best-rec-title">Rekomendasi Terbaik untuk Perjalanan Passion Kamu</h3>
                <p class="best-rec-subtitle">Berdasarkan hasil analisis, kami merekomendasikan paket lengkap berikut untuk mempercepat perjalanan passion kamu dengan harga terbaik:</p>
                
                <div class="best-rec-container">
                    <div class="best-rec-card">
                        <h4>Paket Lengkap Passion Hax</h4>
                        <ul class="best-rec-list">
                            <li><i class="fas fa-check"></i> ${results.mindsetScore <= 15 ? 'Passion Discovery Blueprint' : 'Passion Transformation Blueprint'}</li>
                            <li><i class="fas fa-check"></i> Passion Shield Projects</li>
                            <li><i class="fas fa-check"></i> Passion Collaboration Network</li>
                            <li><i class="fas fa-check"></i> Financial Protection Check Up</li>
                        </ul>
                        <p class="best-rec-price">${mainProgramPrice}</p>
                        <p style="text-align: center; margin-bottom: 1.5rem;"><small>Kuota terbatas 100 peserta!</small></p>
                        <a href="#paket-lengkap" class="cta-button best-rec-cta">Dapatkan Paket Lengkap</a>
                    </div>
                </div>
            </div>
        `;
        
        // Isi hasil
        resultContainerEl.innerHTML = `
            <div class="result-header">
                <h2>Hasil Analisis Passion Readiness Quiz</h2>
                <p>Halo ${userName}, berikut analisis kesiapan passion kamu berdasarkan 3 pilar utama:</p>
            </div>
            
            <div class="profile-identity">
                <div class="profile-identity-header">Kamu adalah seorang...</div>
                <div class="profile-icon">
                    <i class="${profileIcon}"></i>
                </div>
                <div class="profile-label">${results.profileKey}</div>
                <div class="profile-description">${profileDesc}</div>
                <div class="overall-score">Skor Keseluruhan: ${results.overallScore}/100</div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${results.overallScore}%; background: var(--secondary);"></div>
                </div>
            </div>
            
            <div class="combined-status">
                <div class="status-card financial-status">
                    <div class="status-icon" style="color: ${results.financialCategory.color}">
                        <i class="${results.financialCategory.icon}"></i>
                    </div>
                    <div class="status-title">Status Finansial</div>
                    <div class="status-name" style="color: ${results.financialCategory.color}">
                        ${results.financialCategory.name}
                    </div>
                    <p>${results.financialCategory.description}</p>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${results.financialPercentage}%; background: ${results.financialCategory.color}"></div>
                    </div>
                    <p><strong>Skor: ${results.financialScore}/${results.financialCategory.maxScore}</strong></p>
                </div>
                
                <div class="status-card passion-status">
                    <div class="status-icon" style="color: ${results.mindsetCategory.color}">
                        <i class="${results.mindsetCategory.icon}"></i>
                    </div>
                    <div class="status-title">Status Mindset</div>
                    <div class="status-name" style="color: ${results.mindsetCategory.color}">
                        ${results.mindsetCategory.name}
                    </div>
                    <p>${results.mindsetCategory.description}</p>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${results.mindsetPercentage}%; background: ${results.mindsetCategory.color}"></div>
                    </div>
                    <p><strong>Skor: ${results.mindsetScore}/${results.mindsetCategory.maxScore}</strong></p>
                </div>
                
                <div class="status-card network-status">
                    <div class="status-icon" style="color: ${results.networkCategory.color}">
                        <i class="${results.networkCategory.icon}"></i>
                    </div>
                    <div class="status-title">Status Network</div>
                    <div class="status-name" style="color: ${results.networkCategory.color}">
                        ${results.networkCategory.name}
                    </div>
                    <p>${results.networkCategory.description}</p>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: ${results.networkPercentage}%; background: ${results.networkCategory.color}"></div>
                    </div>
                    <p><strong>Skor: ${results.networkScore}/${results.networkCategory.maxScore}</strong></p>
                </div>
            </div>
            
            <div class="financial-box">
                <h3>Rekomendasi Aksi</h3>
                <p>Berdasarkan profil kamu, kami merekomendasikan program-program berikut:</p>
                
                ${recsHTML}
            </div>
            
            ${bestRecHTML}
            
            <div style="text-align: center; margin-top: 2rem;">
                <button id="download-pdf" class="cta-button action-button">
                    <i class="fas fa-download"></i> Download PDF
                </button>
                <button id="send-email" class="cta-button action-button">
                    <i class="fas fa-paper-plane"></i> Kirim ke Email
                </button>
                <button id="retry-quiz" class="cta-button action-button outline-button">
                    <i class="fas fa-redo"></i> Tes Ulang
                </button>
                <p style="margin-top: 1rem;"><small>Atau bagikan hasilmu dengan teman-teman:</small></p>
                <div style="display: flex; justify-content: center; gap: 1rem; margin-top: 1rem;">
                    <a href="#" style="color: #3b5998; font-size: 1.5rem;"><i class="fab fa-facebook"></i></a>
                    <a href="#" style="color: #1da1f2; font-size: 1.5rem;"><i class="fab fa-twitter"></i></a>
                    <a href="#" style="color: #0077b5; font-size: 1.5rem;"><i class="fab fa-linkedin"></i></a>
                    <a href="#" style="color: #25d366; font-size: 1.5rem;"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
        `;
        
        // Animasi progress bar
        setTimeout(() => {
            document.querySelectorAll('.progress-bar').forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }, 300);
        
        // Tambahkan event listener
        document.getElementById('download-pdf').addEventListener('click', downloadPDF);
        document.getElementById('send-email').addEventListener('click', sendEmail);
        document.getElementById('retry-quiz').addEventListener('click', retryQuiz);
    }
    
    // Fungsi untuk download PDF
    function downloadPDF() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // ... [kode untuk membuat PDF] ...
        
        doc.save('passion-readiness-report.pdf');
    }
    
    // Fungsi untuk kirim email (simulasi)
    function sendEmail() {
        const email = document.getElementById('email').value;
        if (!email) {
            alert('Silakan masukkan alamat email yang valid');
            return;
        }
        
        // Simpan di localStorage sebagai simulasi
        localStorage.setItem('quizReportEmail', email);
        
        // Tampilkan pesan sukses
        alert(`Laporan berhasil dikirim ke ${email}. Silakan cek inbox kamu!`);
    }
    
    // Fungsi untuk tes ulang
    function retryQuiz() {
        // Reset jawaban
        answers = {};
        currentQuestion = -1;
        // Tampilkan opening container
        openingContainerEl.style.display = 'block';
        explanationContainerEl.style.display = 'none';
        questionContainerEl.style.display = 'none';
        resultContainerEl.style.display = 'none';
    }
    
    // Event listeners
    prevBtn.addEventListener('click', goToPrevQuestion);
    nextBtn.addEventListener('click', goToNextQuestion);
    submitBtn.addEventListener('click', showResults);
    
    // Event listener untuk mulai quiz
    startQuizBtn.addEventListener('click', function() {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        if (!name || !email) {
            alert('Silakan isi nama dan email terlebih dahulu');
            return;
        }
        
        userName = name;
        userEmail = email;
        
        currentQuestion = -1;
        showQuestion();
    });
    
    // Event listener untuk mulai pertanyaan
    startQuestionsBtn.addEventListener('click', function() {
        currentQuestion = 0;
        showQuestion();
    });
    
    // Mobile Menu Toggle
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.add('active');
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target) && 
            mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Inisialisasi step indicator
    initSteps();
    
    // Animasi step indicator
    let currentStep = 0;
    setInterval(() => {
        const steps = document.querySelectorAll('.quiz-step');
        steps.forEach(step => step.classList.remove('active'));
        
        if (steps.length > 0) {
            steps[currentStep].classList.add('active');
            currentStep = (currentStep + 1) % steps.length;
        }
    }, 800);
    
    // Mulai dengan halaman pembuka
    openingContainerEl.style.display = 'block';
    explanationContainerEl.style.display = 'none';
    questionContainerEl.style.display = 'none';
    resultContainerEl.style.display = 'none';
});
