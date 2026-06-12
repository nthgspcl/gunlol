let hasUserInteracted = false;

function initMedia() {
  console.log("initMedia called");
  const backgroundMusic = document.getElementById('background-music');
  const backgroundVideo = document.getElementById('background');
  if (!backgroundMusic || !backgroundVideo) {
    console.error("Media elements not found");
    return;
  }
  backgroundMusic.volume = 0.3;
  backgroundVideo.muted = true; 

  backgroundVideo.play().catch(err => {
    console.error("Failed to play background video:", err);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const startScreen = document.getElementById('start-screen');
  const startText = document.getElementById('start-text');
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');
  const visitorCount = document.getElementById('visitor-count');
  const backgroundMusic = document.getElementById('background-music');
  const hackerMusic = document.getElementById('hacker-music');
  const rainMusic = document.getElementById('rain-music');
  const animeMusic = document.getElementById('anime-music');
  const carMusic = document.getElementById('car-music');
  const homeButton = document.getElementById('home-theme');
  const hackerButton = document.getElementById('hacker-theme');
  const rainButton = document.getElementById('rain-theme');
  const animeButton = document.getElementById('anime-theme');
  const carButton = document.getElementById('car-theme');
  const resultsButtonContainer = document.getElementById('results-button-container');
  const resultsButton = document.getElementById('results-theme');
  const volumeIcon = document.getElementById('volume-icon');
  const volumeSlider = document.getElementById('volume-slider');
  const transparencySlider = document.getElementById('transparency-slider');
  const backgroundVideo = document.getElementById('background');
  const hackerOverlay = document.getElementById('hacker-overlay');
  const snowOverlay = document.getElementById('snow-overlay');
  const glitchOverlay = document.querySelector('.glitch-overlay');
  const profileBlock = document.getElementById('profile-block');
  const skillsBlock = document.getElementById('skills-block');
  const pythonBar = document.getElementById('python-bar');
  const cppBar = document.getElementById('cpp-bar');
  const csharpBar = document.getElementById('csharp-bar');
  const resultsHint = document.getElementById('results-hint');
  const profilePicture = document.querySelector('.profile-picture');
  const profileContainer = document.querySelector('.profile-container');
  const socialIcons = document.querySelectorAll('.social-icon');
  const badges = document.querySelectorAll('.badge');

  const cursor = document.querySelector('.custom-cursor');
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  // --- HỆ THỐNG ĐIỀU KHIỂN HỘP NHẠC CHẠY THEO THỜI GIAN THỰC ---
  const mainAudio = document.getElementById('main-audio');
  const playPauseBtn = document.getElementById('play-pause-btn');
  const iconPlay = playPauseBtn ? playPauseBtn.querySelector('.icon-play') : null;
  const iconPause = playPauseBtn ? playPauseBtn.querySelector('.icon-pause') : null;
  
  // Tìm các phần tử hiển thị tiến trình nhạc (Dựa trên cấu trúc player thông thường)
  const musicProgressBar = document.querySelector('.audio-player input[type="range"]') || document.querySelector('#main-audio + input') || document.querySelector('[class*="progress"] input') || document.querySelector('.audio-player-container input');
  const currentTimeDisplay = document.querySelector('.audio-player .time-start') || document.querySelector('.audio-player span:first-of-type') || document.getElementById('current-time');
  const durationTimeDisplay = document.querySelector('.audio-player .time-end') || document.querySelector('.audio-player span:last-of-type') || document.getElementById('duration-time');

  // Hàm định dạng giây thành cấu trúc hiển thị mm:ss
  function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function updateMusicButtonUI() {
    if (!playPauseBtn || !iconPlay || !iconPause || !mainAudio) return;
    if (mainAudio.paused) {
      iconPlay.classList.remove('hidden');
      iconPause.classList.add('hidden');
    } else {
      iconPlay.classList.add('hidden');
      iconPause.classList.remove('hidden');
    }
  }

  // Tự động cập nhật tổng thời gian và cấu hình thanh kéo khi file nhạc load xong
  if (mainAudio) {
    mainAudio.addEventListener('loadedmetadata', () => {
      if (musicProgressBar) {
        musicProgressBar.max = mainAudio.duration;
        musicProgressBar.value = 0;
      }
      if (durationTimeDisplay) {
        durationTimeDisplay.textContent = formatTime(mainAudio.duration);
      }
    });

    // Cập nhật thanh trượt và text thời gian liên tục khi bài nhạc đang phát
    mainAudio.addEventListener('timeupdate', () => {
      if (musicProgressBar) {
        musicProgressBar.value = mainAudio.currentTime;
      }
      if (currentTimeDisplay) {
        currentTimeDisplay.textContent = formatTime(mainAudio.currentTime);
      }
      // Khớp cứng tổng thời gian hiển thị nếu trình duyệt chưa load xong meta-data ban đầu
      if (durationTimeDisplay && mainAudio.duration) {
        durationTimeDisplay.textContent = formatTime(mainAudio.duration);
      }
    });
  }

  // Cho phép người dùng bấm click hoặc kéo thanh trượt để tua nhạc
  if (musicProgressBar && mainAudio) {
    musicProgressBar.addEventListener('input', () => {
      mainAudio.currentTime = musicProgressBar.value;
    });
  }

  // Custom Cursor
  if (isTouchDevice) {
    document.body.classList.add('touch-device');
    
    document.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      if(cursor) {
        cursor.style.left = touch.clientX + 'px';
        cursor.style.top = touch.clientY + 'px';
        cursor.style.display = 'block';
      }
    });

    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      if(cursor) {
        cursor.style.left = touch.clientX + 'px';
        cursor.style.top = touch.clientY + 'px';
        cursor.style.display = 'block';
      }
    });

    document.addEventListener('touchend', () => {
      if(cursor) cursor.style.display = 'none'; 
    });
  } else {
    document.addEventListener('mousemove', (e) => {
      if(cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.style.display = 'block';
      }
    });

    document.addEventListener('mousedown', () => {
      if(cursor) cursor.style.transform = 'scale(0.8) translate(-50%, -50%)';
    });

    document.addEventListener('mouseup', () => {
      if(cursor) cursor.style.transform = 'scale(1) translate(-50%, -50%)';
    });
  }

  const startMessage = "CLICK VÀO ĐÂY CHAN BỐ MÀY ĐI";
  let startTextContent = '';
  let startIndex = 0;
  let startCursorVisible = true;

  function typeWriterStart() {
    if (startIndex < startMessage.length) {
      startTextContent = startMessage.slice(0, startIndex + 1);
      startIndex++;
    }
    if(startText) startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
    setTimeout(typeWriterStart, 100);
  }

  setInterval(() => {
    startCursorVisible = !startCursorVisible;
    if(startText) startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
  }, 500);

  function initializeVisitorCounter() {
    let totalVisitors = localStorage.getItem('totalVisitorCount');
    if (!totalVisitors) {
      totalVisitors = 921234;
      localStorage.setItem('totalVisitorCount', totalVisitors);
    } else {
      totalVisitors = parseInt(totalVisitors);
    }

    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      totalVisitors++;
      localStorage.setItem('totalVisitorCount', totalVisitors);
      localStorage.setItem('hasVisited', 'true');
    }

    if(visitorCount) visitorCount.textContent = totalVisitors.toLocaleString();
  }

  initializeVisitorCounter();

  function handleStartCore() {
    if (startScreen && !startScreen.classList.contains('hidden')) {
      startScreen.classList.add('hidden');
      
      if (backgroundMusic) {
        backgroundMusic.muted = false;
        backgroundMusic.play().catch(err => console.error("Lỗi chạy nhạc nền:", err));
      }

      if (mainAudio) {
        setTimeout(() => {
          mainAudio.play().then(() => {
            updateMusicButtonUI();
          }).catch(err => console.log("Hộp nhạc tự động phát bị chặn:", err));
        }, 150);
      }

      if (profileBlock) {
        profileBlock.classList.remove('hidden');
        gsap.fromTo(profileBlock,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out', onComplete: () => {
            profileBlock.classList.add('profile-appear');
            if (profileContainer) profileContainer.classList.add('orbit');
          }}
        );
      }

      if (!isTouchDevice) {
        try {
          new cursorTrailEffect({ length: 10, size: 8, speed: 0.2 });
        } catch (err) {
          console.error("Lỗi load cursor trail:", err);
        }
      }

      typeWriterName();
      typeWriterBio();
    }
  }

  if(startScreen) {
    startScreen.addEventListener('click', handleStartCore);
    startScreen.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleStartCore();
    });
  }

  if (playPauseBtn && mainAudio) {
    playPauseBtn.addEventListener('click', (e) => {
      e.stopPropagation(); 
      if (mainAudio.paused) {
        mainAudio.play();
      } else {
        mainAudio.pause();
      }
      updateMusicButtonUI();
    });
  }

  const name = "SUNIII";
  let nameText = '';
  let nameIndex = 0;
  let isNameDeleting = false;
  let nameCursorVisible = true;

  function typeWriterName() {
    if(!profileName) return;
    if (!isNameDeleting && nameIndex < name.length) {
      nameText = name.slice(0, nameIndex + 1);
      nameIndex++;
    } else if (isNameDeleting && nameIndex > 0) {
      nameText = name.slice(0, nameIndex - 1);
      nameIndex--;
    } else if (nameIndex === name.length) {
      isNameDeleting = true;
      setTimeout(typeWriterName, 10000);
      return;
    } else if (nameIndex === 0) {
      isNameDeleting = false;
    }
    profileName.textContent = nameText + (nameCursorVisible ? '|' : ' ');
    if (Math.random() < 0.1) {
      profileName.classList.add('glitch');
      setTimeout(() => profileName.classList.remove('glitch'), 200);
    }
    setTimeout(typeWriterName, isNameDeleting ? 150 : 300);
  }

  setInterval(() => {
    nameCursorVisible = !nameCursorVisible;
    if(profileName) profileName.textContent = nameText + (nameCursorVisible ? '|' : ' ');
  }, 500);

  const bioMessages = [
    "Chỉ sợ người thương mình, mình không biết đáp trả thế nào, chứ người tệ với mình thì quá đơn giản rồi.",
    "\"Khong biet cach yeu nhung muon yeu va duoc yeu\""
  ];
  let bioText = '';
  let bioIndex = 0;
  let bioMessageIndex = 0;
  let isBioDeleting = false;
  let bioCursorVisible = true;

  function typeWriterBio() {
    if(!profileBio) return;
    if (!isBioDeleting && bioIndex < bioMessages[bioMessageIndex].length) {
      bioText = bioMessages[bioMessageIndex].slice(0, bioIndex + 1);
      bioIndex++;
    } else if (isBioDeleting && bioIndex > 0) {
      bioText = bioMessages[bioMessageIndex].slice(0, bioIndex - 1);
      bioIndex--;
    } else if (bioIndex === bioMessages[bioMessageIndex].length) {
      isBioDeleting = true;
      setTimeout(typeWriterBio, 2000);
      return;
    } else if (bioIndex === 0 && isBioDeleting) {
      isBioDeleting = false;
      bioMessageIndex = (bioMessageIndex + 1) % bioMessages.length;
    }
    profileBio.textContent = bioText + (bioCursorVisible ? '|' : ' ');
    if (Math.random() < 0.1) {
      profileBio.classList.add('glitch');
      setTimeout(() => profileBio.classList.remove('glitch'), 200);
    }
    setTimeout(typeWriterBio, isBioDeleting ? 75 : 150);
  }

  setInterval(() => {
    bioCursorVisible = !bioCursorVisible;
    if(profileBio) profileBio.textContent = bioText + (bioCursorVisible ? '|' : ' ');
  }, 500);

  let currentAudio = backgroundMusic;
  let isMuted = false;

  if(volumeIcon) {
    volumeIcon.addEventListener('click', () => {
      isMuted = !isMuted;
      if(currentAudio) currentAudio.muted = isMuted;
      volumeIcon.innerHTML = isMuted
        ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
        : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.
