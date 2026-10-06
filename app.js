(() => {
  "use strict";

  const ROOT = document.getElementById("root");
  const CENTRAL_DRIVE = "https://drive.google.com/drive/folders/1dtzmMhlP1dCgt7fLgFgCQcs6MEsNOHzo";

  const banners = [
    "./assets/banners/consumer-protection.gif",
    "./assets/banners/food.gif",
    "./assets/banners/medicine.gif",
    "./assets/banners/herbal-products.gif",
    "./assets/banners/cosmetics.gif",
    "./assets/banners/hazardous.gif",
    "./assets/banners/narcotics.gif",
    "./assets/banners/medical-device.gif",
    "./assets/banners/healthcare-facility.gif",
    "./assets/banners/health-establishment.gif"
  ];

  const categories = [
    {
      name: "อาหาร",
      folder: "1CTNwN-wBOPnQXtLrE1JxlWf-hQ1gB5wh",
      tone: "#e66b36",
      banner: "./assets/banners/food.gif",
      icon: "food"
    },
    {
      name: "ยา",
      folder: "1v_BKXygYUjBGXC_CzS-IDKZdB5yGytGZ",
      tone: "#087f72",
      banner: "./assets/banners/medicine.gif",
      icon: "pill"
    },
    {
      name: "ผลิตภัณฑ์สมุนไพร",
      folder: "1kTUt9QOIbtM90K51GgiT56sU1htm2ASS",
      tone: "#48934d",
      banner: "./assets/banners/herbal-products.gif",
      icon: "leaf"
    },
    {
      name: "เครื่องสำอาง",
      folder: "1NPIlIpgvUrfJaP2OmnQ547MITMhymyh3",
      tone: "#c6547d",
      banner: "./assets/banners/cosmetics.gif",
      icon: "sparkles"
    },
    {
      name: "วัตถุอันตราย",
      folder: "1y74GVe0Mj05defM2xBdST5nN3oCfUmut",
      tone: "#c69222",
      banner: "./assets/banners/hazardous.gif",
      icon: "alert"
    },
    {
      name: "วัตถุเสพติด",
      folder: "1SQT6PuM4EhJgXhHMavASb06zZ2TXBU9b",
      tone: "#69429a",
      banner: "./assets/banners/narcotics.gif",
      icon: "shield"
    },
    {
      name: "เครื่องมือแพทย์",
      folder: "1SD1WaNqVl25QnB12FKgKc2HPx9WUtwOm",
      tone: "#2570a6",
      banner: "./assets/banners/medical-device.gif",
      icon: "stethoscope"
    },
    {
      name: "สถานพยาบาล",
      folder: "1UrsAQ5r7eQe4y0f32vzvtSnU69UjqEUM",
      tone: "#126c8a",
      banner: "./assets/banners/healthcare-facility.gif",
      icon: "hospital"
    },
    {
      name: "สถานประกอบการเพื่อสุขภาพ",
      folder: "1lXH4Er4CprXqJma5rmtpPWCUuHDB2sii",
      tone: "#417f70",
      banner: "./assets/banners/health-establishment.gif",
      icon: "heart"
    }
  ];

  const sectionNames = [
    "การขออนุญาตและขึ้นทะเบียน",
    "แก้ไขเปลี่ยนแปลง โอน และเลิกกิจการ",
    "หลักเกณฑ์และมาตรฐาน",
    "ต่ออายุและชำระค่าธรรมเนียม",
    "แบบฟอร์มและเอกสารที่เกี่ยวข้อง"
  ];

  const healthEstablishmentDocs = {
    "การขออนุญาตและขึ้นทะเบียน": [
      "สพส.1 คำขอรับใบอนุญาตประกอบกิจการสถานประกอบการเพื่อสุขภาพ",
      "สพส.12 คำขอขึ้นทะเบียนผู้ให้บริการ"
    ],
    "แก้ไขเปลี่ยนแปลง โอน และเลิกกิจการ": [
      "สพส.4 คำขอโอนใบอนุญาตสถานประกอบการเพื่อสุขภาพ",
      "สพส.5 คำขอรับโอนใบอนุญาตกรณีผู้รับอนุญาตถึงแก่ความตาย",
      "สพส.6 คำขอรับใบแทนใบอนุญาต",
      "สพส.7 คำขอแก้ไขเปลี่ยนแปลงรายการในใบอนุญาต",
      "สพส.15 คำขอรับใบแทนผู้ให้บริการ",
      "สพส.16 คำขอแก้ไขรายการผู้ให้บริการ",
      "คำขอแจ้งเลิกกิจการสถานประกอบการเพื่อสุขภาพ"
    ],
    "หลักเกณฑ์และมาตรฐาน": [
      "แบบตรวจประเมินมาตรฐานสถานประกอบการ ประเภทนวดเพื่อสุขภาพหรือเพื่อเสริมความงาม",
      "แบบตรวจประเมินมาตรฐานสถานประกอบการ ประเภทกิจการสปา"
    ],
    "ต่ออายุและชำระค่าธรรมเนียม": [
      "สพส.3 คำขอต่ออายุใบอนุญาตสถานประกอบการเพื่อสุขภาพ",
      "สพส.17 แบบคำขอชำระค่าธรรมเนียม"
    ],
    "แบบฟอร์มและเอกสารที่เกี่ยวข้อง": []
  };

  let activeBanner = 0;
  let timer = null;

  function svg(name, cls = "") {
    const common = `class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"`;
    const paths = {
      food: `<path d="M4 3v7a2 2 0 0 0 2 2h1"/><path d="M7 3v18"/><path d="M11 3v5a3 3 0 0 0 3 3h1v10"/><path d="M15 3v8"/>`,
      pill: `<path d="M10.5 5.5 18.5 13.5a4.95 4.95 0 0 1-7 7l-8-8a4.95 4.95 0 0 1 7-7Z"/><path d="m8.5 10.5 5-5"/>`,
      leaf: `<path d="M11 20A7 7 0 0 1 9 6c5-2 9-1 11-1 0 2 1 6-1 11-1.7 4.2-5.8 5.4-8 4Z"/><path d="M7 21c2-5 6-9 12-13"/>`,
      sparkles: `<path d="m12 3 1.2 3.2L16 7.5l-2.8 1.3L12 12l-1.2-3.2L8 7.5l2.8-1.3L12 3Z"/><path d="m18 13 .8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8L18 13Z"/><path d="m5 13 .6 1.4L7 15l-1.4.6L5 17l-.6-1.4L3 15l1.4-.6L5 13Z"/>`,
      alert: `<path d="M10.3 3.7 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.7a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>`,
      shield: `<path d="M12 3 5 6v5c0 4.6 2.9 8.1 7 10 4.1-1.9 7-5.4 7-10V6l-7-3Z"/><path d="m9.5 12 1.7 1.7 3.5-3.5"/>`,
      stethoscope: `<path d="M6 3v5a4 4 0 0 0 8 0V3"/><path d="M10 12v3a5 5 0 0 0 10 0v-1"/><circle cx="20" cy="11" r="2"/>`,
      hospital: `<path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/><path d="M3 21h18"/><path d="M9 7h6"/><path d="M12 4v6"/><path d="M8 14h2"/><path d="M14 14h2"/><path d="M10 21v-3h4v3"/>`,
      heart: `<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/><path d="M7.5 12h2l1-2.2 2.2 4.4 1.1-2.2h2.7"/>`,
      search: `<circle cx="11" cy="11" r="7"/><path d="m20 20-3.4-3.4"/>`,
      arrowRight: `<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>`,
      arrowLeft: `<path d="M19 12H5"/><path d="m11 18-6-6 6-6"/>`,
      menu: `<path d="M4 6h16M4 12h16M4 18h16"/>`,
      external: `<path d="M15 3h6v6"/><path d="m10 14 11-11"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>`,
      folder: `<path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/>`,
      chevronDown: `<path d="m6 9 6 6 6-6"/>`
    };
    return `<svg ${common}>${paths[name] || paths.folder}</svg>`;
  }

  function renderHome() {
    ROOT.innerHTML = `
      <main>
        <header class="main-header">
          <div class="container nav-wrap">
            <button class="brand" id="homeButton" type="button" aria-label="กลับหน้าหลัก">
              <img src="./assets/LogoOSSC.png" alt="OSSC นครปฐม" class="site-logo">
            </button>

            <nav class="nav-links" id="navLinks">
              <a href="#home">หน้าหลัก</a>
              <a href="#laws">ศูนย์บริการ</a>
              <button class="staff-link" id="staffButton" type="button">สำหรับเจ้าหน้าที่</button>
            </nav>

            <button class="menu-button" id="menuButton" type="button" aria-label="เปิดเมนู">
              ${svg("menu")}
            </button>
          </div>
        </header>

        <section class="hero-slider" id="home" aria-label="แบนเนอร์ประชาสัมพันธ์">
          <div class="hero-slide-track">
            ${banners.map((src, i) => `<img src="${src}" alt="แบนเนอร์ประชาสัมพันธ์ ${i + 1}" data-index="${i}" class="${i === 0 ? "active" : ""}">`).join("")}
          </div>
          <button class="hero-slide-arrow previous" id="prevBanner" type="button" aria-label="แบนเนอร์ก่อนหน้า">${svg("arrowLeft")}</button>
          <button class="hero-slide-arrow next" id="nextBanner" type="button" aria-label="แบนเนอร์ถัดไป">${svg("arrowRight")}</button>
          <div class="hero-slide-dots" id="bannerDots">
            ${banners.map((_, i) => `<button type="button" data-index="${i}" class="${i === 0 ? "active" : ""}" aria-label="ไปยังแบนเนอร์ ${i + 1}"></button>`).join("")}
          </div>
        </section>

        <section class="laws-section" id="laws">
          <div class="container">
            <div class="section-heading">
              <div>
                <span>ONE STOP SERVICE CENTER</span>
                <h1>ศูนย์บริการผลิตภัณฑ์สุขภาพเบ็ดเสร็จ</h1>
                <p>เลือกหมวดบริการเพื่อดูขั้นตอน แบบฟอร์ม หลักเกณฑ์ และเอกสารที่เกี่ยวข้อง</p>
              </div>

              <label class="search-box">
                ${svg("search")}
                <input id="searchInput" type="search" placeholder="ค้นหาหมวดบริการ" aria-label="ค้นหาหมวดบริการ">
              </label>
            </div>

            <div class="law-grid" id="lawGrid"></div>
          </div>
        </section>

        <div class="simple-footer">
          <div class="container">
            <span>สำนักงานสาธารณสุขจังหวัดนครปฐม</span>
            <a href="https://fda73.moph.go.th">fda73.moph.go.th</a>
          </div>
        </div>
      </main>
    `;

    renderCards(categories);
    bindHomeEvents();
    startBannerTimer();
  }

  function renderCards(items) {
    const grid = document.getElementById("lawGrid");
    grid.innerHTML = items.map((item, index) => `
      <button class="law-card" type="button" data-name="${item.name}" style="--tone:${item.tone}">
        <div class="law-card-top">
          <span class="law-icon">${svg(item.icon)}</span>
          <span class="law-number">${String(categories.indexOf(item) + 1).padStart(2, "0")}</span>
        </div>
        <h2>${item.name}</h2>
        <p>ขั้นตอน แบบฟอร์ม หลักเกณฑ์ และคู่มือ</p>
        <span class="law-open">เปิดรายละเอียด ${svg("arrowRight")}</span>
      </button>
    `).join("");

    grid.querySelectorAll(".law-card").forEach(card => {
      card.addEventListener("click", () => {
        const item = categories.find(c => c.name === card.dataset.name);
        if (item) renderDetail(item);
      });
    });
  }

  function bindHomeEvents() {
    document.getElementById("homeButton").addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("staffButton").addEventListener("click", () => {
      window.open(CENTRAL_DRIVE, "_blank", "noopener");
    });

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");
    menuButton.addEventListener("click", () => navLinks.classList.toggle("is-open"));

    document.getElementById("prevBanner").addEventListener("click", () => setBanner(activeBanner - 1));
    document.getElementById("nextBanner").addEventListener("click", () => setBanner(activeBanner + 1));

    document.querySelectorAll("#bannerDots button").forEach(dot => {
      dot.addEventListener("click", () => setBanner(Number(dot.dataset.index)));
    });

    document.getElementById("searchInput").addEventListener("input", e => {
      const keyword = e.target.value.trim().toLowerCase();
      renderCards(categories.filter(c => c.name.toLowerCase().includes(keyword)));
    });
  }

  function setBanner(index) {
    activeBanner = (index + banners.length) % banners.length;

    document.querySelectorAll(".hero-slide-track img").forEach((img, i) => {
      img.classList.toggle("active", i === activeBanner);
    });

    document.querySelectorAll("#bannerDots button").forEach((dot, i) => {
      dot.classList.toggle("active", i === activeBanner);
    });

    restartBannerTimer();
  }

  function startBannerTimer() {
    clearInterval(timer);
    timer = setInterval(() => setBanner(activeBanner + 1), 5500);
  }

  function restartBannerTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
      activeBanner = (activeBanner + 1) % banners.length;
      document.querySelectorAll(".hero-slide-track img").forEach((img, i) => {
        img.classList.toggle("active", i === activeBanner);
      });
      document.querySelectorAll("#bannerDots button").forEach((dot, i) => {
        dot.classList.toggle("active", i === activeBanner);
      });
    }, 5500);
  }

  function renderDetail(item) {
    clearInterval(timer);
    const hasDetailedDocs = item.name === "สถานประกอบการเพื่อสุขภาพ";

    ROOT.innerHTML = `
      <main>
        <header class="main-header">
          <div class="container nav-wrap detail-nav">
            <button class="brand" id="detailHomeButton" type="button">
              <img src="./assets/LogoOSSC.png" alt="OSSC นครปฐม" class="site-logo">
            </button>
            <button class="back-top" id="backTop" type="button">${svg("arrowLeft")} กลับหน้าหลัก</button>
          </div>
        </header>

        <section class="law-detail">
          <div class="law-hero">
            <img src="${item.banner}" alt="แบนเนอร์ ${item.name}">
          </div>

          <div class="container law-detail-wrap">
            <button class="back-button" id="backButton" type="button">${svg("arrowLeft")} กลับหน้ารวม</button>

            <div class="law-title" style="--tone:${item.tone}">
              <span>ศูนย์บริการผลิตภัณฑ์สุขภาพเบ็ดเสร็จ</span>
              <h1>${item.name}</h1>
              <p>รวมขั้นตอน แบบฟอร์ม หลักเกณฑ์ คู่มือ และเอกสารที่เกี่ยวข้อง</p>
            </div>

            <div class="accordion-grid">
              ${sectionNames.map((section, i) => {
                const docs = hasDetailedDocs ? (healthEstablishmentDocs[section] || []) : [];
                return `
                  <article class="accordion-card ${i === 0 ? "open" : ""}">
                    <button type="button" class="accordion-toggle">
                      <span>${section}</span>
                      ${svg("chevronDown")}
                    </button>
                    <div class="accordion-content">
                      ${
                        docs.length
                          ? `<ul>${docs.map(doc => `<li>${svg("folder")}<span>${doc}</span></li>`).join("")}</ul>`
                          : `<div class="empty-docs"><p>เปิดโฟลเดอร์ Google Drive เพื่อดูเอกสารล่าสุดของหมวดนี้</p></div>`
                      }
                      <a class="drive-button" href="https://drive.google.com/drive/folders/${item.folder}" target="_blank" rel="noopener noreferrer">
                        เปิดโฟลเดอร์ ${item.name} ใน Google Drive ${svg("external")}
                      </a>
                    </div>
                  </article>
                `;
              }).join("")}
            </div>
          </div>
        </section>
      </main>
    `;

    document.getElementById("detailHomeButton").addEventListener("click", renderHome);
    document.getElementById("backTop").addEventListener("click", renderHome);
    document.getElementById("backButton").addEventListener("click", renderHome);

    document.querySelectorAll(".accordion-card").forEach(card => {
      const button = card.querySelector(".accordion-toggle");
      button.addEventListener("click", () => {
        card.classList.toggle("open");
      });
    });

    window.scrollTo({ top: 0, behavior: "instant" });
  }

  renderHome();
})();