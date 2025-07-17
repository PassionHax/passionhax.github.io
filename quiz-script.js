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
        "Survival Solo Passion Seeker": "Kamu sedang berada di tahap bertahan secara finansial. Setiap hari adalah perjuangan untuk mencukupi kebutuhan dasar. Saat ini kamu masih bergerak sendiri, mengandalkan diri sendiri dalam perjalananmu. Secara mindset, kamu sedang mencari apa yang benar-benar menjadi passion-mu. Fase ini penting untuk eksplorasi diri dan mengenal potensi pribadi.",
        "Survival Explorer Passion Seeker": "Kamu berada dalam kondisi keuangan yang masih sulit. Namun, kamu mulai membuka diri untuk menjelajahi koneksi dan interaksi sosial. Di saat yang sama, kamu masih mencari arah passion dan potensi terbaikmu. Ini adalah momen eksploratif yang penuh peluang jika dijalani dengan kesadaran.",
        "Survival Linked Passion Seeker": "Kamu sedang bertahan secara finansial namun telah memiliki jaringan sosial yang luas. Sekarang saatnya memanfaatkan koneksi tersebut untuk menemukan dan mengasih passion-mu. Kamu belum tahu pasti arahmu, tapi kamu tidak sendirian dalam proses ini.",
        "Survival Solo Passion Developer": "Kamu masih dalam kondisi bertahan secara finansial dan belum punya dukungan sosial yang kuat. Namun, kamu mulai serius membangun passion-mu. Progres ini menunjukkan ketangguhan mental yang luar biasa, meski dalam kesulitan.",
        "Survival Explorer Passion Developer": "Keuangan belum ideal, tapi kamu aktif menjelajah komunitas dan mulai membangun passion secara konsisten. Kamu sedang menyiapkan pondasi jangka panjang, meski dari titik nol.",
        "Survival Linked Passion Developer": "Meski kondisi keuanganmu menantang, kamu punya jaringan yang kuat dan mulai mengembangkan passion-mu dengan serius. Ini kombinasi berbahaya—dalam arti positif—karena kamu tinggal butuh momentum.",
        "Survival Solo Passion Hacker": "Dalam tekanan finansial dan berjalan sendirian, kamu sudah menguasai passion-mu. Ini bukan fase nyaman, tapi kamu punya fokus dan ketajaman yang jarang dimiliki di fase ini.",
        "Survival Explorer Passion Hacker": "Kamu sedang dalam fase sulit, tapi memiliki mindset yang tajam dan aktif menjalin koneksi. Kamu tahu apa yang kamu cari, dan tahu ke mana harus melangkah—kamu hanya butuh daya dorong.",
        "Survival Linked Passion Hacker": "Finansial belum bebas, tapi kamu punya dua kekuatan besar: jaringan solid dan kendali penuh atas passion-mu. Kombinasi ini bisa meledak jika diarahkan ke peluang yang tepat.",
        
        // Stable Ground
        "Stable Solo Passion Seeker": "Kamu sudah berada di zona keuangan yang relatif stabil, tapi masih melangkah sendirian dan belum menemukan passion-mu secara utuh. Ini saat yang tepat untuk mulai mengeksplorasi diri lebih dalam.",
        "Stable Explorer Passion Seeker": "Dengan kondisi keuangan yang stabil dan keinginan untuk berinteraksi sosial, kamu dalam momen tepat untuk menggali passion. Kamu terbuka terhadap peluang dan siap naik ke level berikutnya.",
        "Stable Linked Passion Seeker": "Keuanganmu stabil dan kamu punya jaringan yang siap mendukungmu. Sekarang saatnya memanfaatkan itu semua untuk benar-benar menemukan dan memahami passion-mu.",
        "Stable Solo Passion Developer": "Kamu punya kontrol finansial yang cukup, dan sedang membangun passion-mu dengan serius, meski masih sendirian. Ini adalah fase mandiri yang penuh potensi.",
        "Stable Explorer Passion Developer": "Keuanganmu mantap, koneksimu berkembang, dan passion-mu mulai kamu bentuk dengan penuh kesadaran. Kamu sedang berada di jalur pertumbuhan yang sangat menjanjikan.",
        "Stable Linked Passion Developer": "Kamu berada di titik solid: finansial aman, jaringan kuat, dan passion sedang berkembang. Ini fase pembangunan yang kokoh dan mengarah ke lompatan besar.",
        "Stable Solo Passion Hacker": "Kamu sudah stabil secara keuangan dan punya mindset yang tajam. Walau belum banyak kolaborasi, kamu bisa menciptakan dampak dari passion yang telah kamu kuasai.",
        "Stable Explorer Passion Hacker": "Kamu punya keuangan yang mantap, relasi yang aktif, dan kendali penuh atas passion-mu. Waktunya untuk menginspirasi dan membangun jejak nyata dari kekuatan tersebut.",
        "Stable Linked Passion Hacker": "Kombinasi ideal di tahap pembangunan: keuangan stabil, jaringan siap pakai, dan passion yang telah dioptimalkan. Saatnya ekspansi dan memberi dampak nyata.",
        
        // Boosted (Wealth Climber)
        "Boosted Solo Passion Seeker": "Kamu sedang mengalami pertumbuhan finansial, tapi belum terlalu terbuka terhadap koneksi sosial dan masih mencari passion. Ini masa penuh energi dan pencarian arah.",
        "Boosted Explorer Passion Seeker": "Finansialmu sedang naik, kamu mulai menjelajah komunitas, dan sedang menggali apa yang benar-benar kamu cintai. Ini fase eksplorasi dengan daya dorong tinggi.",
        "Boosted Linked Passion Seeker": "Asetmu berkembang, koneksi aktif, dan kamu dalam misi menemukan passion-mu. Kamu punya semua tools—tinggal fokus arahkan energimu.",
        "Boosted Solo Passion Developer": "Kamu sedang membangun kekayaan dan passion sekaligus, meski masih dalam kesendirian. Ini fase sunyi namun kuat.",
        "Boosted Explorer Passion Developer": "Dengan keuangan tumbuh dan jejaring yang meluas, kamu sedang merancang masa depan berbasis passion. Arahmu mulai jelas, tinggal perkuat fondasi.",
        "Boosted Linked Passion Developer": "Finansial bertumbuh, koneksi solid, passion berkembang—kamu berada di fase akselerasi. Terus konsisten, dan kamu bisa loncat lebih jauh dari yang kamu bayangkan.",
        "Boosted Solo Passion Hacker": "Kamu adalah mesin fokus. Keuangan naik, passion dikuasai, meski koneksi masih terbatas. Kamu independen dan visioner.",
        "Boosted Explorer Passion Hacker": "Dengan aset yang berkembang, komunitas yang aktif, dan kendali penuh atas passion, kamu punya semua bahan untuk menciptakan pengaruh besar.",
        "Boosted Linked Passion Hacker": "Kamu dalam fase emas: kekayaan naik, koneksi kuat, dan kamu tahu apa yang harus kamu lakukan dengan passion-mu. Waktunya mengeksekusi visi besar.",
        
        // Freedom
        "Freedom Solo Passion Seeker": "Kamu sudah bebas secara finansial, tapi masih menjelajah arah hidup dan passion secara mandiri. Ini momen langka yang bisa jadi awal kebangkitan pribadi.",
        "Freedom Explorer Passion Seeker": "Kamu punya kebebasan finansial dan keterbukaan sosial, tapi masih mencari makna dan arah. Waktunya gunakan kenyamananmu untuk eksplorasi mendalam.",
        "Freedom Linked Passion Seeker": "Kamu punya segalanya secara eksternal—uang dan jaringan—sekarang saatnya menggali sisi terdalam dirimu dan menemukan panggilan hidupmu.",
        "Freedom Solo Passion Developer": "Kamu bebas dari tekanan uang, dan sedang membentuk passion-mu dengan serius. Kamu tenang, tapi bergerak penuh arah.",
        "Freedom Explorer Passion Developer": "Dengan kebebasan finansial dan jejaring yang hidup, kamu sedang menumbuhkan passion secara nyata. Kamu tidak hanya sukses, tapi juga bertumbuh.",
        "Freedom Linked Passion Developer": "Kamu berada di fase optimal: bebas finansial, terkoneksi kuat, dan membangun passion yang bermakna. Potensi dampak sosialmu luar biasa.",
        "Freedom Solo Passion Hacker": "Kamu bebas secara keuangan dan telah menguasai passion-mu, meski masih independen dalam bergerak. Kamu tidak membutuhkan validasi—kamu membangun makna.",
        "Freedom Explorer Passion Hacker": "Kamu punya segalanya—uang, jejaring, dan passion yang solid. Saatnya menjadi pemimpin perubahan dan inspirasi yang hidup.",
        "Freedom Linked Passion Hacker": "Ini adalah level tertinggi: kamu bebas secara finansial, punya jaringan kuat, dan passion-mu menjadi kekuatan besar yang menciptakan dampak luas. Kamu bukan hanya berhasil, tapi juga menggerakkan dunia."
    };

    // Mapping icon untuk 36 identitas
    const profileIcons = {
        "Survival Solo Passion Seeker": "fas fa-search",
        "Survival Explorer Passion Seeker": "fas fa-compass",
        "Survival Linked Passion Seeker": "fas fa-users",
        "Survival Solo Passion Developer": "fas fa-seedling",
        "Survival Explorer Passion Developer": "fas fa-tree",
        "Survival Linked Passion Developer": "fas fa-hand-holding-heart",
        "Survival Solo Passion Hacker": "fas fa-rocket",
        "Survival Explorer Passion Hacker": "fas fa-satellite",
        "Survival Linked Passion Hacker": "fas fa-network-wired",
        "Stable Solo Passion Seeker": "fas fa-home",
        "Stable Explorer Passion Seeker": "fas fa-map-marked",
        "Stable Linked Passion Seeker": "fas fa-handshake",
        "Stable Solo Passion Developer": "fas fa-chess-pawn",
        "Stable Explorer Passion Developer": "fas fa-chess-knight",
        "Stable Linked Passion Developer": "fas fa-chess-queen",
        "Stable Solo Passion Hacker": "fas fa-chess-king",
        "Stable Explorer Passion Hacker": "fas fa-chess-bishop",
        "Stable Linked Passion Hacker": "fas fa-chess-rook",
        "Boosted Solo Passion Seeker": "fas fa-chart-line",
        "Boosted Explorer Passion Seeker": "fas fa-chart-bar",
        "Boosted Linked Passion Seeker": "fas fa-chart-pie",
        "Boosted Solo Passion Developer": "fas fa-briefcase",
        "Boosted Explorer Passion Developer": "fas fa-suitcase",
        "Boosted Linked Passion Developer": "fas fa-briefcase-medical",
        "Boosted Solo Passion Hacker": "fas fa-gem",
        "Boosted Explorer Passion Hacker": "fas fa-crown",
        "Boosted Linked Passion Hacker": "fas fa-medal",
        "Freedom Solo Passion Seeker": "fas fa-umbrella-beach",
        "Freedom Explorer Passion Seeker": "fas fa-plane",
        "Freedom Linked Passion Seeker": "fas fa-globe-americas",
        "Freedom Solo Passion Developer": "fas fa-university",
        "Freedom Explorer Passion Developer": "fas fa-graduation-cap",
        "Freedom Linked Passion Developer": "fas fa-landmark",
        "Freedom Solo Passion Hacker": "fas fa-infinity",
        "Freedom Explorer Passion Hacker": "fas fa-atom",
        "Freedom Linked Passion Hacker": "fas fa-globe"
    };
    
    // Variabel global
    let currentQuestion = -1;
    let answers = {};
    let financialScore = 0;
    let mindsetScore = 0;
    let networkScore = 0;
    let userName = "";
    let userEmail = "";
    
    // Data spesifik yang akan ditangkap
    let monthlyIncome = "";
    let financialProtection = "";
    let financialDebt = "";
    
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
        if (currentQuestion === -1) {
            // Tampilkan halaman pembuka metrik
            openingContainerEl.style.display = 'none';
            explanationContainerEl.style.display = 'block';
            questionContainerEl.style.display = 'none';
            resultContainerEl.style.display = 'none';
            return;
        }
        
        if (currentQuestion >= 0 && currentQuestion < questions.length) {
            const question = questions[currentQuestion];
            questionTextEl.textContent = question.question;
            optionsContainerEl.innerHTML = '';
            
            // Update step indicator
            const steps = document.querySelectorAll('.quiz-step');
            steps.forEach((step, index) => {
                if (index === currentQuestion) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active');
                }
            });
            
            // Buat opsi jawaban
            question.options.forEach((option, index) => {
                const optionEl = document.createElement('div');
                optionEl.className = 'option-item';
                
                // Cek apakah jawaban sudah dipilih sebelumnya
                const isSelected = answers[currentQuestion] === index;
                
                optionEl.innerHTML = `
                    <input type="radio" name="answer" id="option-${index}" value="${index}" 
                        ${isSelected ? 'checked' : ''}>
                    <label for="option-${index}" class="option-label">${option.text}</label>
                `;
                
                optionEl.addEventListener('click', () => {
                    // Hapus semua seleksi
                    document.querySelectorAll('.option-item').forEach(item => {
                        item.classList.remove('selected');
                    });
                    
                    // Tandai yang dipilih
                    optionEl.classList.add('selected');
                    
                    // Simpan jawaban
                    answers[currentQuestion] = index;
                    
                    // Aktifkan tombol selanjutnya
                    nextBtn.disabled = false;
                    
                    // Tangkap data spesifik jika pertanyaan terkait
                    if (currentQuestion === 1) {
                        monthlyIncome = option.text;
                    } else if (currentQuestion === 2) {
                        financialProtection = option.text;
                    } else if (currentQuestion === 4) {
                        financialDebt = option.text;
                    }
                });
                
                optionsContainerEl.appendChild(optionEl);
            });
            
            // Tampilkan tombol yang sesuai
            prevBtn.style.display = currentQuestion === 0 ? 'none' : 'inline-block';
            nextBtn.style.display = currentQuestion < questions.length - 1 ? 'inline-block' : 'none';
            submitBtn.style.display = currentQuestion === questions.length - 1 ? 'inline-block' : 'none';
            
            // Tampilkan container pertanyaan
            openingContainerEl.style.display = 'none';
            explanationContainerEl.style.display = 'none';
            questionContainerEl.style.display = 'block';
            resultContainerEl.style.display = 'none';
        }
    }
    
    // Fungsi untuk berpindah ke pertanyaan berikutnya
    function goToNextQuestion() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion();
        }
    }
    
    // Fungsi untuk kembali ke pertanyaan sebelumnya
    function goToPrevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    }
    
    // Fungsi untuk menentukan kategori finansial
    function getFinancialCategory(score) {
        if (score <= 10) {
            return {
                name: "Survival Mode",
                shortName: "Survival",
                description: "kamu sedang berjuang memenuhi kebutuhan dasar",
                icon: "fas fa-umbrella-beach",
                color: "#EF476F",
                maxScore: 22
            };
        } else if (score <= 15) {
            return {
                name: "Stable Ground",
                shortName: "Stable",
                description: "kamu memiliki stabilitas finansial dasar",
                icon: "fas fa-home",
                color: "#118AB2",
                maxScore: 22
            };
        } else if (score <= 19) {
            return {
                name: "Wealth Climber",
                shortName: "Boosted",
                description: "kamu sedang membangun kekuatan finansial",
                icon: "fas fa-chart-line",
                color: "#06D6A0",
                maxScore: 22
            };
        } else {
            return {
                name: "Financial Freedom",
                shortName: "Freedom",
                description: "kamu memiliki kebebasan finansial yang baik",
                icon: "fas fa-crown",
                color: "#FFD166",
                maxScore: 22
            };
        }
    }
    
    // Fungsi untuk menentukan kategori mindset
    function getMindsetCategory(score) {
        if (score <= 15) {
            return {
                name: "Passion Seeker",
                shortName: "Passion Seeker",
                description: "kamu sedang mencari passion yang tepat",
                icon: "fas fa-search",
                color: "#5E60CE",
                maxScore: 25
            };
        } else if (score <= 20) {
            return {
                name: "Passion Developer",
                shortName: "Passion Developer",
                description: "kamu sedang mengembangkan passion",
                icon: "fas fa-seedling",
                color: "#48BFE3",
                maxScore: 25
            };
        } else {
            return {
                name: "Passion Hacker",
                shortName: "Passion Hacker",
                description: "kamu ahli dalam mengeksekusi passion",
                icon: "fas fa-rocket",
                color: "#80FFDB",
                maxScore: 25
            };
        }
    }
    
    // Fungsi untuk menentukan kategori network
    function getNetworkCategory(score) {
        if (score <= 12) {
            return {
                name: "Solo Player",
                shortName: "Solo",
                description: "kamu masih membangun jaringan pendukung",
                icon: "fas fa-user",
                color: "#FF9F1C",
                maxScore: 25
            };
        } else if (score <= 18) {
            return {
                name: "Community Explorer",
                shortName: "Explorer",
                description: "kamu mulai aktif membangun jaringan",
                icon: "fas fa-users",
                color: "#4361EE",
                maxScore: 25
            };
        } else {
            return {
                name: "Network Master",
                shortName: "Linked",
                description: "kamu memiliki jaringan pendukung yang kuat",
                icon: "fas fa-handshake",
                color: "#7209B7",
                maxScore: 25
            };
        }
    }
    
    // Fungsi untuk menghitung hasil
    function calculateResults() {
        financialScore = 0;
        mindsetScore = 0;
        networkScore = 0;
        
        // Hitung skor finansial (pertanyaan 0-4)
        for (let i = 0; i < 5; i++) {
            if (answers[i] !== undefined) {
                const optionValue = questions[i].options[answers[i]].value;
                financialScore += optionValue;
            }
        }
        
        // Hitung skor mindset (pertanyaan 5-9)
        for (let i = 5; i < 10; i++) {
            if (answers[i] !== undefined) {
                const optionValue = questions[i].options[answers[i]].value;
                mindsetScore += optionValue;
            }
        }
        
        // Hitung skor network (pertanyaan 10-14)
        for (let i = 10; i < 15; i++) {
            if (answers[i] !== undefined) {
                const optionValue = questions[i].options[answers[i]].value;
                networkScore += optionValue;
            }
        }
        
        // Dapatkan kategori
        const financialCategory = getFinancialCategory(financialScore);
        const mindsetCategory = getMindsetCategory(mindsetScore);
        const networkCategory = getNetworkCategory(networkScore);
        
        // Hitung persentase
        const financialPercentage = Math.round((financialScore / financialCategory.maxScore) * 100);
        const mindsetPercentage = Math.round((mindsetScore / mindsetCategory.maxScore) * 100);
        const networkPercentage = Math.round((networkScore / networkCategory.maxScore) * 100);
        
        // Hitung skor keseluruhan
        const overallScore = Math.round((financialPercentage + mindsetPercentage + networkPercentage) / 3);
        
        // Generate profile key
        const profileKey = `${financialCategory.shortName} ${networkCategory.shortName} ${mindsetCategory.shortName}`;
        
        return {
            financialScore: financialScore,
            financialCategory: financialCategory,
            financialPercentage: financialPercentage,
            
            mindsetScore: mindsetScore,
            mindsetCategory: mindsetCategory,
            mindsetPercentage: mindsetPercentage,
            
            networkScore: networkScore,
            networkCategory: networkCategory,
            networkPercentage: networkPercentage,
            
            overallScore: overallScore,
            profileKey: profileKey,
            monthlyIncome: monthlyIncome,
            financialProtection: financialProtection,
            financialDebt: financialDebt
        };
    }
    
    // Fungsi untuk menyimpan lead ke Google Sheets
    async function saveLead(results) {
        // Ganti dengan entry IDs Anda
        const ENTRY_IDS = {
            name: "entry.1061851307",
            email: "entry.1086178316",
            financialScore: "entry.410714493",
            monthlyIncome: "entry.1110431153",
            financialProtection: "entry.1495113162",
            financialDebt: "entry.429919187",
            mindsetScore: "entry.1646428746",
            networkScore: "entry.1218947954",
            profileKey: "entry.1892433723"
        };

        const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfP-O2rLl--qOANW8_T_vgHIXjnn1MLRnsXL_YlOLVR5X9kmw/formResponse";
        
        const formData = new URLSearchParams();
        formData.append(ENTRY_IDS.name, userName);
        formData.append(ENTRY_IDS.email, userEmail);
        formData.append(ENTRY_IDS.financialScore, results.financialScore);
        formData.append(ENTRY_IDS.monthlyIncome, results.monthlyIncome);
        formData.append(ENTRY_IDS.financialProtection, results.financialProtection);
        formData.append(ENTRY_IDS.financialDebt, results.financialDebt);
        formData.append(ENTRY_IDS.mindsetScore, results.mindsetScore);
        formData.append(ENTRY_IDS.networkScore, results.networkScore);
        formData.append(ENTRY_IDS.profileKey, results.profileKey);

        try {
            await fetch(formUrl, {
                method: "POST",
                body: formData,
                mode: "no-cors"
            });
            console.log("Lead saved to Google Sheets");
        } catch (error) {
            console.error("Error saving lead:", error);
            // Fallback: simpan di localStorage
            const leads = JSON.parse(localStorage.getItem('quizLeads') || '[]');
            const newLeads = JSON.parse(leads);
            newLeads.push({
                name: userName,
                email: userEmail,
                financialScore: results.financialScore,
                monthlyIncome: results.monthlyIncome,
                financialProtection: results.financialProtection,
                financialDebt: results.financialDebt,
                mindsetScore: results.mindsetScore,
                networkScore: results.networkScore,
                profileKey: results.profileKey,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('quizLeads', JSON.stringify(newLeads));
        }
    }

    // Fungsi untuk menampilkan hasil
    function showResults() {
        const results = calculateResults();
        const profileDesc = profileDescriptions[results.profileKey] || "Profil kamu unik dan penuh potensi. Gunakan kekuatan finansial, jaringan, dan passion kamu untuk mencapai tujuan.";
        const profileIcon = profileIcons[results.profileKey] || 'fas fa-user';
        
        // Simpan lead ke database
        saveLead(results);
        
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
                priority: 0,
                // Tambahkan harga promo
                price: results.mindsetScore <= 15 
                    ? '<span class="original-price">Investasi Rp497.000</span> <span class="discounted-price">hanya Rp287.000</span>' 
                    : '<span class="original-price">Investasi Rp789.000</span> <span class="discounted-price">hanya Rp529.000</span>'
            },
            {
                title: "Passion Shield Projects",
                description: "Bangun '<u>cash armor</u>' untuk mendanai kebutuhan dasar hidupmu sambil mengejar passion",
                icon: "fas fa-shield-alt",
                tag: results.financialScore <= 10 ? "Sangat Dianjurkan" : results.financialScore <= 15 ? "Dianjurkan" : "Opsional",
                priority: results.financialScore <= 10 ? 1 : results.financialScore <= 15 ? 2 : 3,
                // Ubah teks promo
                note: "<div class='psp-tag'>🔥 Gratis, Melalui Seleksi. Kuota Sisa: 7 slot!</div>"
            },
            {
                title: "Financial Protection Check Up",
                description: "Pastikan perlindungan finansial kamu memadai dengan konsultasi gratis",
                icon: "fas fa-coins",
                tag: results.financialScore <= 15 ? "Dianjurkan" : "Opsional",
                priority: results.financialScore <= 15 ? 2 : 3,
                // Tambahkan harga promo
                price: '<span class="original-price">Investasi Rp1.290.000</span> <span class="discounted-price">hanya Rp39.000</span>'
            },
            {
                title: "Passion Collaboration Network",
                description: "Gabung dengan komunitas berbagai passion dengan peluang kolaborasi digital ataupun on ground activities", // Ubah deskripsi
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
                    <div class="rec-content">
                        <h4>${rec.title}</h4>
                        <p>${rec.description}</p>
                        ${rec.price ? `<div class="rec-price">${rec.price}</div>` : ''}
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
                <p class="best-rec-subtitle">Berdasarkan hasil analisis, kami merekomendasikan program utama berikut:</p>
                
                <div class="best-rec-container">
                    <div class="best-rec-card">
                        <h4>${results.mindsetScore <= 15 ? 'Passion Discovery Blueprint' : 'Passion Transformation Blueprint'}</h4>
                        <p class="best-rec-price">${mainProgramPrice}</p>
                        <p>Program utama untuk ${results.mindsetScore <= 15 ? 'menemukan passion sejati' : 'mengubah passion menjadi karier'} dengan pendekatan terstruktur.</p>
                        
                        <h5 style="margin-top: 1.5rem; margin-bottom: 1rem;">Sudah dapat Bonus Spesial:</h5>
                        <ul class="best-rec-list">
                            <li><i class="fas fa-check"></i> Passion Shield Projects <span class="bonus-note">Dapat Special Slot</span></li>
                            <li><i class="fas fa-check"></i> Passion Collaboration Network <span class="bonus-note">Gratis!</span></li>
                            <li><i class="fas fa-check"></i> Financial Protection Check Up <span class="bonus-note">Gratis!</span></li>
                        </ul>
                        
                        <p style="text-align: center; margin-bottom: 1.5rem;"><small>Kuota terbatas 100 peserta!</small></p>
                        <div style="text-align: center;">
                            <a href="#paket-lengkap" class="cta-button best-rec-cta">Dapatkan Paket Lengkap</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Bangun HTML untuk detail finansial
        const financialDetailsHTML = `
            <div class="financial-details">
                <h3>Detail Finansial</h3>
                <div class="detail-grid">
                    <div class="detail-card">
                        <h4><i class="fas fa-money-bill-wave"></i> Pendapatan Bulanan</h4>
                        <p>${results.monthlyIncome}</p>
                    </div>
                    <div class="detail-card">
                        <h4><i class="fas fa-shield-alt"></i> Perlindungan Finansial</h4>
                        <p>${results.financialProtection}</p>
                    </div>
                    <div class="detail-card">
                        <h4><i class="fas fa-credit-card"></i> Utang/Kewajiban</h4>
                        <p>${results.financialDebt}</p>
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
            
            ${financialDetailsHTML}
            
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
                    
                    <!-- Tambahkan elaborasi -->
                    <div class="elaboration">
                        <p><strong>Tantangan:</strong> ${results.financialScore <= 10 ? 
                            'Kondisi keuangan yang belum stabil membuatmu sulit fokus pada passion. Fokus utama saat ini adalah memenuhi kebutuhan dasar.' : 
                            results.financialScore <= 15 ? 
                            'Stabilitas finansial sudah cukup baik, tapi belum optimal untuk mendukung pengejaran passion secara penuh.' : 
                            results.financialScore <= 19 ? 
                            'Kamu sudah memiliki kemampuan finansial yang baik, tapi perlu mengoptimalkan alokasi dana untuk passion.' : 
                            'Kebebasan finansial sudah tercapai, saatnya fokus pada dampak yang ingin kamu ciptakan.'}</p>
                        
                        <p><strong>Solusi:</strong> ${results.financialScore <= 10 ? 
                            'Bangun pendapatan pasif untuk memastikan kebutuhan dasar terpenuhi, sehingga kamu punya waktu untuk mengejar passion.' : 
                            results.financialScore <= 15 ? 
                            'Mulai alokasikan sebagian pendapatan untuk pengembangan passion, sambil terus membangun tabungan darurat.' : 
                            results.financialScore <= 19 ? 
                            'Optimalkan investasi dan alokasikan dana khusus untuk mengembangkan passion menjadi sumber penghasilan.' : 
                            'Gunakan kebebasan finansial untuk fokus pada passion yang memberikan dampak sosial dan personal yang lebih besar.'}</p>
                    </div>
                    
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
                    
                    <!-- Tambahkan elaborasi -->
                    <div class="elaboration">
                        <p><strong>Tantangan:</strong> ${results.mindsetScore <= 15 ? 
                            'Ketidakpastian tentang passion membuatmu sulit mengambil langkah konkret.' : 
                            results.mindsetScore <= 20 ? 
                            'Kamu sudah mulai menemukan arah, tapi masih perlu memperkuat komitmen dan konsistensi.' : 
                            'Kesadaran penuh sudah ada, tantangannya adalah menjaga momentum dan menghindari kelelahan.'}</p>
                        
                        <p><strong>Solusi:</strong> ${results.mindsetScore <= 15 ? 
                            'Lakukan eksperimen kecil untuk menemukan aktivitas yang membuatmu lupa waktu dan penuh energi.' : 
                            results.mindsetScore <= 20 ? 
                            'Kembangkan rutinitas harian yang mendukung passion dan lakukan evaluasi berkala.' : 
                            'Bangun sistem pendukung dan delegasikan tugas-tugas rutin agar bisa fokus pada hal yang paling bermakna.'}</p>
                    </div>
                    
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
                    
                    <!-- Tambahkan elaborasi -->
                    <div class="elaboration">
                        <p><strong>Tantangan:</strong> ${results.networkScore <= 12 ? 
                            'Jaringan yang terbatas membuatmu kesulitan mendapatkan dukungan dan peluang kolaborasi.' : 
                            results.networkScore <= 18 ? 
                            'Koneksi sudah mulai terbangun, tapi perlu lebih strategis dalam membangun relasi yang bermakna.' : 
                            'Jaringan yang kuat adalah aset, tantangannya adalah mengelola dan memanfaatkannya secara optimal.'}</p>
                        
                        <p><strong>Solusi:</strong> ${results.networkScore <= 12 ? 
                            'Mulai bergabung dengan komunitas yang relevan dan aktif berpartisipasi dalam acara networking.' : 
                            results.networkScore <= 18 ? 
                            'Fokus pada kualitas relasi daripada kuantitas, dan cari mentor yang sesuai dengan jalur passionmu.' : 
                            'Leverage jaringan yang ada untuk menciptakan kolaborasi strategis dan peluang baru.'}</p>
                    </div>
                    
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
        
        // Header
        doc.setFontSize(20);
        doc.text("Laporan Passion Readiness Quiz", 105, 20, null, null, 'center');
        
        // Informasi pengguna
        doc.setFontSize(12);
        doc.text(`Nama: ${document.getElementById('name').value}`, 20, 30);
        doc.text(`Email: ${document.getElementById('email').value}`, 20, 38);
        doc.text(`Tanggal: ${new Date().toLocaleDateString()}`, 20, 46);
        
        // Garis pemisah
        doc.line(20, 50, 190, 50);
        
        // Konten laporan
        doc.setFontSize(16);
        doc.text("Ringkasan Hasil", 105, 60, null, null, 'center');
        
        const results = calculateResults();
        const profileDesc = profileDescriptions[results.profileKey] || "Profil kamu unik dan penuh potensi.";
        
        // Profile identity
        doc.setFontSize(14);
        doc.setTextColor(0);
        doc.text(`Profil kamu: ${results.profileKey}`, 20, 70);
        doc.setFontSize(12);
        doc.text(profileDesc, 20, 78, { maxWidth: 170 });
        
        // Overall score
        doc.setFontSize(14);
        doc.text(`Skor Keseluruhan: ${results.overallScore}/100`, 20, 100);
        
        // Financial
        doc.setFontSize(12);
        doc.setTextColor(results.financialCategory.color);
        doc.text(`Finansial: ${results.financialCategory.name} (${results.financialScore}/${results.financialCategory.maxScore})`, 20, 110);
        doc.setTextColor(0);
        doc.text(results.financialCategory.description, 20, 118, { maxWidth: 170 });
        
        // Detail finansial
        doc.setFontSize(14);
        doc.text("Detail Finansial", 20, 130);
        doc.setFontSize(12);
        doc.text(`Pendapatan Bulanan: ${results.monthlyIncome}`, 20, 138);
        doc.text(`Perlindungan Finansial: ${results.financialProtection}`, 20, 146);
        doc.text(`Utang/Kewajiban: ${results.financialDebt}`, 20, 154);
        
        // Mindset
        doc.setTextColor(results.mindsetCategory.color);
        doc.text(`Mindset: ${results.mindsetCategory.name} (${results.mindsetScore}/${results.mindsetCategory.maxScore})`, 20, 166);
        doc.setTextColor(0);
        doc.text(results.mindsetCategory.description, 20, 174, { maxWidth: 170 });
        
        // Network
        doc.setTextColor(results.networkCategory.color);
        doc.text(`Network: ${results.networkCategory.name} (${results.networkScore}/${results.networkCategory.maxScore})`, 20, 186);
        doc.setTextColor(0);
        doc.text(results.networkCategory.description, 20, 194, { maxWidth: 170 });
        
        // Rekomendasi
        doc.setFontSize(16);
        doc.text("Rekomendasi Utama", 105, 210, null, null, 'center');
        doc.setFontSize(12);
        doc.text("- Passion Shield Projects", 20, 220);
        doc.text("- Financial Protection Check Up", 20, 228);
        doc.text("- Passion Collaboration Network", 20, 236);
        
        // Footer
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text("© 2025 Passion Hax - passionhax.github.io", 105, 280, null, null, 'center');
        
        // Simpan PDF        
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
