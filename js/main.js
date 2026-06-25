// ====== DOM 元素 ======
const photographersList = document.getElementById('photographersList');
const galleryGrid = document.getElementById('galleryGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const backToTopBtn = document.getElementById('backToTop');
const galleryModal = document.getElementById('galleryModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const sortTabs = document.querySelectorAll('.sort-tab');

// ====== 状态 ======
let currentPage = 1;
const pageSize = 20;
let currentSort = 'latest';
let currentSearch = '';
let displayedGalleries = [...galleries];

// ====== 工具函数 ======
function formatViews(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + '万';
  return n.toString();
}

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ====== 渲染摄影师列表 ======
function renderPhotographers() {
  photographersList.innerHTML = photographers
    .map(
      (p) => `
    <div class="photographer-card" data-id="${p.id}">
      <img class="photographer-avatar" src="${p.avatar}" alt="${p.name}" loading="lazy">
      <span class="photographer-name">${p.name}</span>
    </div>
  `
    )
    .join('');

  // 点击摄影师筛选作品
  photographersList.querySelectorAll('.photographer-card').forEach((card) => {
    card.addEventListener('click', () => {
      const name = card.querySelector('.photographer-name').textContent;
      currentSearch = name;
      searchInput.value = name;
      filterAndRender();
    });
  });
}

// ====== 排序 ======
function sortGalleries(list, sort) {
  const sorted = [...list];
  switch (sort) {
    case 'latest':
      return sorted.reverse(); // data 中后面的新
    case 'popular':
      return sorted.sort((a, b) => b.count - a.count);
    case 'views':
      return sorted.sort((a, b) => b.views - a.views);
    default:
      return sorted;
  }
}

// ====== 搜索过滤 ======
function filterGalleries(list, keyword) {
  if (!keyword.trim()) return list;
  const kw = keyword.toLowerCase();
  return list.filter(
    (g) =>
      g.title.toLowerCase().includes(kw) ||
      g.photographer.name.toLowerCase().includes(kw) ||
      (g.model && g.model.name.toLowerCase().includes(kw)) ||
      (g.tags && g.tags.some((t) => t.toLowerCase().includes(kw)))
  );
}

function filterAndRender() {
  let result = filterGalleries(galleries, currentSearch);
  result = sortGalleries(result, currentSort);
  displayedGalleries = result;
  currentPage = 1;
  renderGalleryPage(1);
}

// ====== 渲染图集卡片 ======
function renderGalleryCard(g) {
  const modelHtml = g.model
    ? `<a href="#" onclick="event.stopPropagation()">${g.model.name}</a>`
    : '';
  const separator = g.model ? ' / ' : '';

  return `
    <div class="gallery-card" data-id="${g.id}">
      <div class="gallery-card-img">
        <img src="${g.cover}" alt="${g.title}" loading="lazy">
        <span class="gallery-card-count">${g.count}p</span>
      </div>
      <div class="gallery-card-info">
        <div class="gallery-card-title">${g.title}</div>
        <div class="gallery-card-meta">
          <a href="#" onclick="event.stopPropagation()">${g.photographer.name}</a>
          ${separator}${modelHtml}
        </div>
      </div>
    </div>
  `;
}

function renderGalleryPage(page) {
  const start = 0;
  const end = page * pageSize;
  const pageItems = displayedGalleries.slice(start, end);

  if (page === 1) {
    galleryGrid.innerHTML = '';
  }

  if (pageItems.length === 0 && page === 1) {
    galleryGrid.innerHTML = `
      <div class="empty-state">
        <div style="font-size:48px">📭</div>
        <p>没有找到相关作品</p>
      </div>
    `;
    loadMoreBtn.style.display = 'none';
    return;
  }

  galleryGrid.innerHTML = pageItems.map(renderGalleryCard).join('');

  // 绑定点击事件
  galleryGrid.querySelectorAll('.gallery-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      openGalleryModal(id);
    });
  });

  // 加载更多按钮状态
  if (end >= displayedGalleries.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'inline-block';
  }
}

// ====== 图集详情弹窗 ======
function openGalleryModal(id) {
  const gallery = galleries.find((g) => g.id === id);
  if (!gallery) return;

  const modelHtml = gallery.model
    ? `<span>模特：<a href="#">${gallery.model.name}</a></span>`
    : '';

  modalBody.innerHTML = `
    <div class="modal-header">
      <h2>${gallery.title}</h2>
      <div class="modal-meta">
        <span>摄影师：<a href="#">${gallery.photographer.name}</a></span>
        ${modelHtml}
        <span>共 ${gallery.count} 张</span>
        <span>${formatViews(gallery.views)} 浏览</span>
        ${gallery.tags ? gallery.tags.map(t => `<span style="background:#ffe0e8;color:#e8547c;padding:2px 8px;border-radius:10px;font-size:12px;">#${t}</span>`).join('') : ''}
      </div>
    </div>
    <div class="modal-images">
      ${gallery.images
        .map(
          (img, i) =>
            `<img src="${img}" alt="${gallery.title} ${i + 1}" loading="lazy" data-index="${i}">`
        )
        .join('')}
    </div>
  `;

  // 点击图片打开灯箱
  modalBody.querySelectorAll('.modal-images img').forEach((img) => {
    img.addEventListener('click', () => {
      const idx = parseInt(img.dataset.index);
      openLightbox(gallery.images, idx);
    });
  });

  galleryModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
  galleryModal.classList.remove('active');
  document.body.style.overflow = '';
}

// ====== 图片灯箱 ======
let lightboxEl = null;

function createLightbox() {
  if (lightboxEl) return;
  lightboxEl = document.createElement('div');
  lightboxEl.className = 'lightbox-overlay';
  lightboxEl.innerHTML = `
    <button class="lightbox-close">&times;</button>
    <button class="lightbox-prev">&lt;</button>
    <button class="lightbox-next">&gt;</button>
    <img src="" alt="">
    <span class="lightbox-counter"></span>
  `;
  document.body.appendChild(lightboxEl);

  lightboxEl.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  lightboxEl.addEventListener('click', (e) => {
    if (e.target === lightboxEl) closeLightbox();
  });
}

let lightboxImages = [];
let lightboxIndex = 0;

function openLightbox(images, index) {
  createLightbox();
  lightboxImages = images;
  lightboxIndex = index;
  updateLightboxImage();
  lightboxEl.classList.add('active');
  document.body.style.overflow = 'hidden';

  // 键盘导航
  document.addEventListener('keydown', handleLightboxKey);

  // 左右按钮
  lightboxEl.querySelector('.lightbox-prev').onclick = () => {
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightboxImage();
  };
  lightboxEl.querySelector('.lightbox-next').onclick = () => {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    updateLightboxImage();
  };
}

function updateLightboxImage() {
  lightboxEl.querySelector('img').src = lightboxImages[lightboxIndex];
  lightboxEl.querySelector('.lightbox-counter').textContent =
    `${lightboxIndex + 1} / ${lightboxImages.length}`;
}

function closeLightbox() {
  lightboxEl.classList.remove('active');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleLightboxKey);
}

function handleLightboxKey(e) {
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') {
    lightboxIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    updateLightboxImage();
  }
  if (e.key === 'ArrowRight') {
    lightboxIndex = (lightboxIndex + 1) % lightboxImages.length;
    updateLightboxImage();
  }
}

// ====== 事件绑定 ======

// 搜索
searchInput.addEventListener(
  'input',
  debounce(() => {
    currentSearch = searchInput.value;
    filterAndRender();
  }, 400)
);

searchBtn.addEventListener('click', () => {
  currentSearch = searchInput.value;
  filterAndRender();
});

// 排序
sortTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    sortTabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    currentSort = tab.dataset.sort;
    filterAndRender();
  });
});

// 加载更多
loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  renderGalleryPage(currentPage);
  // 滚动到新内容
  const lastCard = galleryGrid.lastElementChild;
  if (lastCard) {
    lastCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

// 弹窗关闭
modalClose.addEventListener('click', closeGalleryModal);
galleryModal.addEventListener('click', (e) => {
  if (e.target === galleryModal) closeGalleryModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && galleryModal.classList.contains('active')) {
    closeGalleryModal();
  }
});

// 回到顶部
window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ====== 初始化 ======
function init() {
  renderPhotographers();
  filterAndRender();
}

init();
