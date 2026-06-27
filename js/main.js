// ====== DOM 元素 ======
const authorsList = document.getElementById('authorsList');
const modelGrid = document.getElementById('modelGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const backToTopBtn = document.getElementById('backToTop');
const modelModal = document.getElementById('modelModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const sortTabs = document.querySelectorAll('.sort-tab');
const navLinks = document.querySelectorAll('.nav-link');
const baseBtns = document.querySelectorAll('.base-btn');

// ====== 状态 ======
let currentPage = 1;
const pageSize = 20;
let currentSort = 'latest';
let currentSearch = '';
let currentType = 'all';
let currentBase = 'all';
let displayedModels = [...models];

// ====== 工具函数 ======
function formatNum(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 10000) return (n / 10000).toFixed(1) + '万';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return n.toString();
}

function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ====== 渲染作者列表 ======
function renderAuthors() {
  // 按模型数排序
  const sortedAuthors = [...authors].sort((a, b) => b.models - a.models).slice(0, 12);

  authorsList.innerHTML = sortedAuthors
    .map(
      (a) => `
    <div class="author-card" data-name="${a.name}">
      <img class="author-avatar" src="${a.avatar}" alt="${a.name}" loading="lazy">
      <span class="author-name">${a.name}</span>
      <span class="author-count">${a.models} 个模型</span>
    </div>
  `
    )
    .join('');

  authorsList.querySelectorAll('.author-card').forEach((card) => {
    card.addEventListener('click', () => {
      const name = card.dataset.name;
      currentSearch = name;
      searchInput.value = name;
      applyAllFilters();
    });
  });
}

// ====== 排序 ======
function sortModels(list, sort) {
  const sorted = [...list];
  switch (sort) {
    case 'latest':
      return sorted.sort((a, b) => new Date(b.updated) - new Date(a.updated));
    case 'popular':
      return sorted.sort((a, b) => b.likes - a.likes);
    case 'downloads':
      return sorted.sort((a, b) => b.downloads - a.downloads);
    default:
      return sorted;
  }
}

// ====== 搜索过滤 ======
function filterModels(list, keyword) {
  if (!keyword.trim()) return list;
  const kw = keyword.toLowerCase();
  return list.filter(
    (m) =>
      m.name.toLowerCase().includes(kw) ||
      m.author.name.toLowerCase().includes(kw) ||
      m.typeLabel.toLowerCase().includes(kw) ||
      m.type.toLowerCase().includes(kw) ||
      (m.baseModel && m.baseModel.some((b) => b.toLowerCase().includes(kw))) ||
      (m.tags && m.tags.some((t) => t.toLowerCase().includes(kw))) ||
      (m.description && m.description.toLowerCase().includes(kw))
  );
}

function filterByType(list, type) {
  if (type === 'all') return list;
  return list.filter((m) => m.type === type);
}

function filterByBase(list, base) {
  if (base === 'all') return list;
  return list.filter((m) => m.baseModel && m.baseModel.includes(base));
}

function applyAllFilters() {
  let result = [...models];
  result = filterByType(result, currentType);
  result = filterByBase(result, currentBase);
  result = filterModels(result, currentSearch);
  result = sortModels(result, currentSort);
  displayedModels = result;
  currentPage = 1;
  renderModelPage(1);
}

// ====== 渲染模型卡片 ======
function renderModelCard(m) {
  const baseTags = (m.baseModel || []).slice(0, 3).map((b) => `<span class="model-base-tag">${b}</span>`).join('');
  const moreTag = (m.baseModel || []).length > 3 ? `<span class="model-base-tag">+${m.baseModel.length - 3}</span>` : '';

  return `
    <div class="model-card" data-id="${m.id}">
      <div class="model-card-img">
        <img src="${m.cover}" alt="${m.name}" loading="lazy">
        <span class="model-type-badge ${m.type}">${m.typeLabel}</span>
        <div class="model-base-tags">${baseTags}${moreTag}</div>
      </div>
      <div class="model-card-info">
        <div class="model-card-name">${m.name}</div>
        <div class="model-card-author">by ${m.author.name}</div>
        <div class="model-card-stats">
          <span>⬇ ${formatNum(m.downloads)}</span>
          <span>❤ ${formatNum(m.likes)}</span>
          <span>⭐ ${m.rating}</span>
        </div>
      </div>
    </div>
  `;
}

function renderModelPage(page) {
  const start = 0;
  const end = page * pageSize;
  const pageItems = displayedModels.slice(start, end);

  if (page === 1) {
    modelGrid.innerHTML = '';
  }

  if (pageItems.length === 0 && page === 1) {
    modelGrid.innerHTML = `
      <div class="empty-state">
        <div style="font-size:48px">🔍</div>
        <p>没有找到相关模型</p>
      </div>
    `;
    loadMoreBtn.style.display = 'none';
    return;
  }

  modelGrid.innerHTML = pageItems.map(renderModelCard).join('');

  // 绑定点击事件
  modelGrid.querySelectorAll('.model-card').forEach((card) => {
    card.addEventListener('click', () => {
      const id = parseInt(card.dataset.id);
      openModelModal(id);
    });
  });

  // 加载更多按钮状态
  if (end >= displayedModels.length) {
    loadMoreBtn.style.display = 'none';
  } else {
    loadMoreBtn.style.display = 'inline-block';
  }
}

// ====== 模型详情弹窗 ======
function openModelModal(id) {
  const model = models.find((m) => m.id === id);
  if (!model) return;

  const baseTags = model.baseModel.map((b) => `<span class="badge" style="background:#1976d2;">${b}</span>`).join(' ');
  const tagBadges = model.tags ? model.tags.map((t) => `<span class="badge" style="background:#666;">#${t}</span>`).join(' ') : '';

  modalBody.innerHTML = `
    <div class="modal-detail-header">
      <img class="modal-detail-cover" src="${model.cover}" alt="${model.name}">
      <div class="modal-detail-info">
        <h2>${model.name}</h2>
        <div class="modal-detail-meta">
          <span class="badge ${model.type}" style="background: var(--type-${model.type.toLowerCase()})">${model.typeLabel}</span>
          ${baseTags}
          ${tagBadges}
        </div>
        <div class="modal-detail-author">作者：${model.author.name}</div>
        <div class="modal-detail-stats">
          <span>⬇ <strong>${formatNum(model.downloads)}</strong> 下载</span>
          <span>❤ <strong>${formatNum(model.likes)}</strong> 点赞</span>
          <span>⭐ <strong>${model.rating}</strong> 评分</span>
        </div>
        <div class="modal-detail-desc">${model.description}</div>
        <div class="modal-detail-info-row">
          <span>版本：<strong>${model.version}</strong></span>
          <span>文件大小：<strong>${model.fileSize}</strong></span>
          <span>更新日期：<strong>${model.updated}</strong></span>
          ${model.triggerWords ? `<span>触发词：<strong>${model.triggerWords}</strong></span>` : ''}
        </div>
      </div>
    </div>
    <div class="modal-sample-title">示例图片 (${model.sampleImages.length})</div>
    <div class="modal-images">
      ${model.sampleImages
        .map(
          (img, i) =>
            `<img src="${img}" alt="${model.name} 示例 ${i + 1}" loading="lazy" data-index="${i}">`
        )
        .join('')}
    </div>
  `;

  // 点击图片打开灯箱
  modalBody.querySelectorAll('.modal-images img').forEach((img) => {
    img.addEventListener('click', () => {
      const idx = parseInt(img.dataset.index);
      openLightbox(model.sampleImages, idx);
    });
  });

  modelModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModelModal() {
  modelModal.classList.remove('active');
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

  document.addEventListener('keydown', handleLightboxKey);

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

// 导航（模型类型筛选）
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach((l) => l.classList.remove('active'));
    link.classList.add('active');
    currentType = link.dataset.type;
    applyAllFilters();
  });
});

// 底模筛选
baseBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    baseBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    currentBase = btn.dataset.base;
    applyAllFilters();
  });
});

// 搜索
searchInput.addEventListener(
  'input',
  debounce(() => {
    currentSearch = searchInput.value;
    applyAllFilters();
  }, 400)
);

searchBtn.addEventListener('click', () => {
  currentSearch = searchInput.value;
  applyAllFilters();
});

// 排序
sortTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    sortTabs.forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');
    currentSort = tab.dataset.sort;
    applyAllFilters();
  });
});

// 加载更多
loadMoreBtn.addEventListener('click', () => {
  currentPage++;
  renderModelPage(currentPage);
  const lastCard = modelGrid.lastElementChild;
  if (lastCard) {
    lastCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});

// 弹窗关闭
modalClose.addEventListener('click', closeModelModal);
modelModal.addEventListener('click', (e) => {
  if (e.target === modelModal) closeModelModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modelModal.classList.contains('active')) {
    closeModelModal();
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
  renderAuthors();
  applyAllFilters();
}

init();
