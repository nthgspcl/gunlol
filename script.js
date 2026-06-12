/**
 * =========================================================================
 * FULL INTEGRATED SCRIPT FILE (Mã nguồn tích hợp đầy đủ hệ thống)
 * =========================================================================
 * Đã tích hợp: Màn hình chờ (Start Screen), Nhạc nền, Hộp nhạc (Audio Player "loser"),
 * Hiệu ứng chuyển đổi Khung Kỹ Năng (GSAP) và Sửa lỗi tự động chạy hiệu ứng chữ (Typewriter).
 */

// --- 1. KHAI BÁO CÁC BIẾN TOÀN CỤC & ELEMENT DOM ---
const startScreen = document.getElementById('start-screen');
const backgroundMusic = document.getElementById('background-music');
const mainAudio = document.getElementById('main-audio');
const playPauseBtn = document.getElementById('play-pause-btn');

// Các block hiển thị (Profile Card & Skills Block)
const profileBlock = document.getElementById('profile-block') || document.querySelector('.profile-card') || document.querySelector('[class*="profile"]'); 
const skillsBlock = document.getElementById('skills-block');
const resultsHint = document.getElementById('results-hint') || document.querySelector('.results-hint');

// Biến trạng thái theo dõi Khung kỹ năng có đang mở hay không
let isShowingSkills = false;


// --- 2. XỬ LÝ ĐỒNG BỘ NÚT BẤM VÀ TRẠNG THÁI HỘP NHẠC (AUDIO PLAYER) ---
let iconPlay = null;
let iconPause = null;

if (playPauseBtn) {
    iconPlay = playPauseBtn.querySelector('.icon-play');
    iconPause = playPauseBtn.querySelector('.icon-pause');
}

// Hàm cập nhật giao diện nút bấm Play/Pause dựa theo trạng thái bài hát "loser"
function updateMusicButtonUI() {
    if (!mainAudio || !playPauseBtn) return;
    if (mainAudio.paused) {
        if (iconPlay) iconPlay.style.display = 'block';
        if (iconPause) iconPause.style.display = 'none';
    } else {
        if (iconPlay) iconPlay.style.display = 'none';
        if (iconPause) iconPause.style.display = 'block';
    }
}

// Sự kiện Click trực tiếp vào nút Play/Pause của hộp nhạc bài "loser"
if (playPauseBtn && mainAudio) {
    playPauseBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Chặn lan truyền sự kiện click ra ngoài làm ẩn/hiện card không mong muốn
        if (mainAudio.paused) {
            mainAudio.play().then(() => {
                updateMusicButtonUI();
            }).catch(err => console.log("Không thể phát nhạc:", err));
        } else {
            mainAudio.pause();
            updateMusicButtonUI();
        }
    });
}

// Theo dõi sự kiện thay đổi trạng thái phát của Audio để tự động cập nhật nút bấm
if (mainAudio) {
    mainAudio.addEventListener('play', updateMusicButtonUI);
    mainAudio.addEventListener('pause', updateMusicButtonUI);
}


// --- 3. ĐOẠN SỬA LỖI: SỰ KIỆN MÀN HÌNH CHỜ (START SCREEN) & KHỞI CHẠY ĐỒNG BỘ ---
if (startScreen) {
    // Đăng ký cho cả sự kiện click chuột (PC) và chạm cảm ứng (Điện thoại)
    ['click', 'touchstart'].forEach(eventType => {
        startScreen.addEventListener(eventType, (e) => {
            // Chỉ xử lý nếu màn hình chờ đang mở
            if (!startScreen.classList.contains('hidden')) {
                e.preventDefault();
                
                // [Bước 1]: Ẩn màn hình chờ ra khỏi giao diện chính
                startScreen.classList.add('hidden');

                // [Bước 2]: Kích hoạt phát nhạc nền của toàn trang web (background music)
                if (backgroundMusic) {
                    backgroundMusic.muted = false;
                    backgroundMusic.play().catch(err => {
                        console.log("Nhạc nền trang web tự động phát bị chặn:", err);
                    });
                }

                // [Bước 3]: Tự động kích hoạt phát bài hát trong Hộp nhạc (Bài "loser")
                if (mainAudio) {
                    setTimeout(() => {
                        mainAudio.play().then(() => {
                            updateMusicButtonUI();
                        }).catch(err => {
                            console.log("Hộp nhạc tự động phát bị chặn do chính sách trình duyệt:", err);
                        });
                    }, 150); // Độ trễ nhỏ giúp trình duyệt hàng gắn tương tác mượt mà hơn
                }

                // [Bước 4] -> FIX LỖI CHÍNH: GỌI CHẠY HIỆU ỨNG CHỮ GÕ MÁY ẢNH (TYPEWRITER) CỦA BẠN
                if (typeof typeWriterStart === 'function') {
                    typeWriterStart(); // Kích hoạt chạy hàm hiệu ứng chữ của bạn
                } else if (typeof typewriter === 'function') {
                    typewriter();
                } else {
                    console.warn("Không tìm thấy hàm khởi chạy hiệu ứng chữ chạy (typeWriterStart). Hãy chắc chắn hàm này được định nghĩa bên dưới.");
                }
            }
        }, { passive: false });
    });
}


// --- 4. GIỮ NGUYÊN HOÀN TOÀN ĐOẠN CODE LOGIC GSAP CỦA BẠN (Ảnh image_6b5476.png) ---
const pythonBar = document.querySelector('.skill-python .bar-fill') || { style: {} };
const cppBar = document.querySelector('.skill-cpp .bar-fill') || { style: {} };
const csharpBar = document.querySelector('.skill-csharp .bar-fill') || { style: {} };

function toggleSkillsDisplay() {
    if (!skillsBlock || !profileBlock) return;

    if (!isShowingSkills) {
        // Hoạt ảnh tăng thanh phần trăm khi mở khung kỹ năng (Giữ nguyên thông số của bạn)
        if (typeof gsap !== 'undefined') {
            gsap.to(pythonBar, { width: '87%', duration: 2, ease: 'power2.out' });
            gsap.to(cppBar, { width: '75%', duration: 2, ease: 'power2.out' });
            gsap.to(csharpBar, { width: '80%', duration: 2, ease: 'power2.out' });
        }
        if (resultsHint) resultsHint.classList.remove('hidden');
        isShowingSkills = true;
    } else {
        // Hoạt ảnh ẩn Khung kỹ năng đóng và mở lại Profile Card (D
