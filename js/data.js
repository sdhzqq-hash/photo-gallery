// ====== 摄影师数据 ======
const photographers = [
  { id: 1, name: '芥茉', avatar: 'https://picsum.photos/seed/p1/150/150' },
  { id: 2, name: '倾海的小健健呀', avatar: 'https://picsum.photos/seed/p2/150/150' },
  { id: 3, name: 'Atom小强', avatar: 'https://picsum.photos/seed/p3/150/150' },
  { id: 4, name: '溜花梨', avatar: 'https://picsum.photos/seed/p4/150/150' },
  { id: 5, name: 'Tommy汤面', avatar: 'https://picsum.photos/seed/p5/150/150' },
  { id: 6, name: '六月月月er', avatar: 'https://picsum.photos/seed/p6/150/150' },
  { id: 7, name: '西瓜呆毛汪', avatar: 'https://picsum.photos/seed/p7/150/150' },
  { id: 8, name: '清洛', avatar: 'https://picsum.photos/seed/p8/150/150' },
  { id: 9, name: '夏弃疾', avatar: 'https://picsum.photos/seed/p9/150/150' },
  { id: 10, name: '花间', avatar: 'https://picsum.photos/seed/p10/150/150' },
  { id: 11, name: '从暮暮', avatar: 'https://picsum.photos/seed/p11/150/150' },
  { id: 12, name: '@鹏叔', avatar: 'https://picsum.photos/seed/p12/150/150' },
  { id: 13, name: '摄影师暗栀', avatar: 'https://picsum.photos/seed/p13/150/150' },
  { id: 14, name: '林薇维维', avatar: 'https://picsum.photos/seed/p14/150/150' },
  { id: 15, name: 'ONSET', avatar: 'https://picsum.photos/seed/p15/150/150' },
  { id: 16, name: '落尘', avatar: 'https://picsum.photos/seed/p16/150/150' },
];

// ====== 图集数据 ======
const galleries = [
  {
    id: 1,
    title: '中式',
    cover: 'https://picsum.photos/seed/g1/600/800',
    count: 62,
    photographer: { id: 1, name: '花房全' },
    model: { id: 1, name: '苗可青' },
    images: Array.from({ length: 62 }, (_, i) =>
      `https://picsum.photos/seed/g1-${i}/800/1200`
    ),
    tags: ['中式', '古风'],
    views: 15800,
  },
  {
    id: 2,
    title: '居家碎花裙',
    cover: 'https://picsum.photos/seed/g2/600/800',
    count: 58,
    photographer: { id: 2, name: '卡拉花' },
    model: { id: 2, name: '妮一' },
    images: Array.from({ length: 58 }, (_, i) =>
      `https://picsum.photos/seed/g2-${i}/800/1200`
    ),
    tags: ['居家', '碎花', '日系'],
    views: 12400,
  },
  {
    id: 3,
    title: '她的笑，比西瓜汽水更清爽',
    cover: 'https://picsum.photos/seed/g3/600/800',
    count: 28,
    photographer: { id: 15, name: 'ONSET' },
    model: { id: 3, name: '懒懒的睡眠羊' },
    images: Array.from({ length: 28 }, (_, i) =>
      `https://picsum.photos/seed/g3-${i}/800/1200`
    ),
    tags: ['夏日', '清新', '少女'],
    views: 23900,
  },
  {
    id: 4,
    title: '怀揣着清风，好像知道夏天就要来了',
    cover: 'https://picsum.photos/seed/g4/600/800',
    count: 23,
    photographer: { id: 4, name: '马大兴BossMa' },
    model: { id: 4, name: 'Yige一格' },
    images: Array.from({ length: 23 }, (_, i) =>
      `https://picsum.photos/seed/g4-${i}/800/1200`
    ),
    tags: ['夏日', '清风'],
    views: 9800,
  },
  {
    id: 5,
    title: '咖啡店里的回忆',
    cover: 'https://picsum.photos/seed/g5/600/800',
    count: 27,
    photographer: { id: 5, name: '火羽白' },
    model: { id: 5, name: '麻薯旎子' },
    images: Array.from({ length: 27 }, (_, i) =>
      `https://picsum.photos/seed/g5-${i}/800/1200`
    ),
    tags: ['咖啡店', '日常'],
    views: 11200,
  },
  {
    id: 6,
    title: '有小熊和暖光的日子太幸福啦',
    cover: 'https://picsum.photos/seed/g6/600/800',
    count: 34,
    photographer: { id: 6, name: 'Litchi·晨阳' },
    model: { id: 6, name: 'Enyyyn' },
    images: Array.from({ length: 34 }, (_, i) =>
      `https://picsum.photos/seed/g6-${i}/800/1200`
    ),
    tags: ['可爱', '居家'],
    views: 8700,
  },
  {
    id: 7,
    title: 'JK 甜妹 | 阳光是最好的滤镜',
    cover: 'https://picsum.photos/seed/g7/600/800',
    count: 26,
    photographer: { id: 16, name: '落尘' },
    model: { id: 7, name: '呆头飞鹅' },
    images: Array.from({ length: 26 }, (_, i) =>
      `https://picsum.photos/seed/g7-${i}/800/1200`
    ),
    tags: ['JK', '校园', '甜妹'],
    views: 32100,
  },
  {
    id: 8,
    title: '穷苦人家的女儿',
    cover: 'https://picsum.photos/seed/g8/600/800',
    count: 37,
    photographer: { id: 8, name: '十一' },
    model: { id: 8, name: '董yy' },
    images: Array.from({ length: 37 }, (_, i) =>
      `https://picsum.photos/seed/g8-${i}/800/1200`
    ),
    tags: ['复古', '情绪'],
    views: 18500,
  },
  {
    id: 9,
    title: '稻田风筝',
    cover: 'https://picsum.photos/seed/g9/600/800',
    count: 20,
    photographer: { id: 9, name: '宋宋' },
    model: null,
    images: Array.from({ length: 20 }, (_, i) =>
      `https://picsum.photos/seed/g9-${i}/800/1200`
    ),
    tags: ['田野', '自然'],
    views: 7600,
  },
  {
    id: 10,
    title: '春雨柔柔',
    cover: 'https://picsum.photos/seed/g10/600/800',
    count: 22,
    photographer: { id: 10, name: '肆月' },
    model: { id: 10, name: 'uu3_7' },
    images: Array.from({ length: 22 }, (_, i) =>
      `https://picsum.photos/seed/g10-${i}/800/1200`
    ),
    tags: ['春日', '柔美'],
    views: 9100,
  },
  {
    id: 11,
    title: '甜酷篇',
    cover: 'https://picsum.photos/seed/g11/600/800',
    count: 20,
    photographer: { id: 11, name: '七月平安喜乐' },
    model: { id: 11, name: '零零' },
    images: Array.from({ length: 20 }, (_, i) =>
      `https://picsum.photos/seed/g11-${i}/800/1200`
    ),
    tags: ['甜酷', '时尚'],
    views: 14500,
  },
  {
    id: 12,
    title: '绿色少女',
    cover: 'https://picsum.photos/seed/g12/600/800',
    count: 16,
    photographer: { id: 12, name: '摄影铁铁' },
    model: { id: 3, name: '懒懒的睡眠羊' },
    images: Array.from({ length: 16 }, (_, i) =>
      `https://picsum.photos/seed/g12-${i}/800/1200`
    ),
    tags: ['绿色', '少女', '自然'],
    views: 10800,
  },
  {
    id: 13,
    title: '闯入童话厨房，做一天快乐的小厨师',
    cover: 'https://picsum.photos/seed/g13/600/800',
    count: 23,
    photographer: { id: 15, name: 'ONSET' },
    model: { id: 3, name: '懒懒的睡眠羊' },
    images: Array.from({ length: 23 }, (_, i) =>
      `https://picsum.photos/seed/g13-${i}/800/1200`
    ),
    tags: ['童话', '厨房', '可爱'],
    views: 19300,
  },
  {
    id: 14,
    title: '紫色韵味',
    cover: 'https://picsum.photos/seed/g14/600/800',
    count: 46,
    photographer: { id: 13, name: '凌影' },
    model: { id: 13, name: '蓝莓' },
    images: Array.from({ length: 46 }, (_, i) =>
      `https://picsum.photos/seed/g14-${i}/800/1200`
    ),
    tags: ['紫色', '韵味', '时尚'],
    views: 12700,
  },
  {
    id: 15,
    title: '荷花小精灵',
    cover: 'https://picsum.photos/seed/g15/600/800',
    count: 21,
    photographer: { id: 14, name: '大王w' },
    model: { id: 14, name: '西洋西洋菜' },
    images: Array.from({ length: 21 }, (_, i) =>
      `https://picsum.photos/seed/g15-${i}/800/1200`
    ),
    tags: ['荷花', '精灵', '夏日'],
    views: 20100,
  },
  {
    id: 16,
    title: '夏日多巴胺 | 草地野餐',
    cover: 'https://picsum.photos/seed/g16/600/800',
    count: 19,
    photographer: { id: 16, name: '落尘' },
    model: { id: 3, name: '懒懒的睡眠羊' },
    images: Array.from({ length: 19 }, (_, i) =>
      `https://picsum.photos/seed/g16-${i}/800/1200`
    ),
    tags: ['夏日', '野餐', '多巴胺'],
    views: 28600,
  },
  {
    id: 17,
    title: '是谁的女仆，快来端走',
    cover: 'https://picsum.photos/seed/g17/600/800',
    count: 62,
    photographer: { id: 1, name: '糖水小胖子' },
    model: { id: 15, name: '林瑜' },
    images: Array.from({ length: 62 }, (_, i) =>
      `https://picsum.photos/seed/g17-${i}/800/1200`
    ),
    tags: ['女仆', '可爱', '二次元'],
    views: 45100,
  },
  {
    id: 18,
    title: '冬日序章',
    cover: 'https://picsum.photos/seed/g18/600/800',
    count: 20,
    photographer: { id: 11, name: '七月平安喜乐' },
    model: { id: 16, name: '菜菜不见了' },
    images: Array.from({ length: 20 }, (_, i) =>
      `https://picsum.photos/seed/g18-${i}/800/1200`
    ),
    tags: ['冬日', '雪景'],
    views: 8200,
  },
  {
    id: 19,
    title: '可爱少女',
    cover: 'https://picsum.photos/seed/g19/600/800',
    count: 14,
    photographer: { id: 12, name: '摄影铁铁' },
    model: { id: 17, name: '小了个飞象' },
    images: Array.from({ length: 14 }, (_, i) =>
      `https://picsum.photos/seed/g19-${i}/800/1200`
    ),
    tags: ['可爱', '少女'],
    views: 9500,
  },
  {
    id: 20,
    title: '河边仙女',
    cover: 'https://picsum.photos/seed/g20/600/800',
    count: 60,
    photographer: { id: 2, name: '卡拉花' },
    model: { id: 2, name: '妮一' },
    images: Array.from({ length: 60 }, (_, i) =>
      `https://picsum.photos/seed/g20-${i}/800/1200`
    ),
    tags: ['河边', '仙女', '唯美'],
    views: 35600,
  },
  {
    id: 21,
    title: '玫瑰园里，藏着一场粉色的童话',
    cover: 'https://picsum.photos/seed/g21/600/800',
    count: 16,
    photographer: { id: 15, name: 'ONSET' },
    model: { id: 3, name: '懒懒的睡眠羊' },
    images: Array.from({ length: 16 }, (_, i) =>
      `https://picsum.photos/seed/g21-${i}/800/1200`
    ),
    tags: ['玫瑰', '童话', '粉色'],
    views: 17200,
  },
  {
    id: 22,
    title: '旧纸浮生',
    cover: 'https://picsum.photos/seed/g22/600/800',
    count: 16,
    photographer: { id: 11, name: '七月平安喜乐' },
    model: { id: 18, name: '书翰' },
    images: Array.from({ length: 16 }, (_, i) =>
      `https://picsum.photos/seed/g22-${i}/800/1200`
    ),
    tags: ['复古', '文艺'],
    views: 6400,
  },
  {
    id: 23,
    title: '汽水、喇叭和碎花，解锁夏日限定快乐',
    cover: 'https://picsum.photos/seed/g23/600/800',
    count: 29,
    photographer: { id: 15, name: 'ONSET' },
    model: { id: 3, name: '懒懒的睡眠羊' },
    images: Array.from({ length: 29 }, (_, i) =>
      `https://picsum.photos/seed/g23-${i}/800/1200`
    ),
    tags: ['夏日', '快乐', '碎花'],
    views: 21800,
  },
  {
    id: 24,
    title: '粉色',
    cover: 'https://picsum.photos/seed/g24/600/800',
    count: 18,
    photographer: { id: 3, name: '猫八木' },
    model: { id: 19, name: '言叶' },
    images: Array.from({ length: 18 }, (_, i) =>
      `https://picsum.photos/seed/g24-${i}/800/1200`
    ),
    tags: ['粉色', '甜美'],
    views: 13300,
  },
  {
    id: 25,
    title: '牛油果棚拍日记',
    cover: 'https://picsum.photos/seed/g25/600/800',
    count: 19,
    photographer: { id: 11, name: '七月平安喜乐' },
    model: { id: 20, name: '心心' },
    images: Array.from({ length: 19 }, (_, i) =>
      `https://picsum.photos/seed/g25-${i}/800/1200`
    ),
    tags: ['棚拍', '牛油果', '清新'],
    views: 8900,
  },
  {
    id: 26,
    title: '可爱小厨娘（一）',
    cover: 'https://picsum.photos/seed/g26/600/800',
    count: 12,
    photographer: { id: 12, name: '摄影铁铁' },
    model: { id: 17, name: '小了个飞象' },
    images: Array.from({ length: 12 }, (_, i) =>
      `https://picsum.photos/seed/g26-${i}/800/1200`
    ),
    tags: ['厨娘', '可爱', '居家'],
    views: 11600,
  },
  {
    id: 27,
    title: '日系',
    cover: 'https://picsum.photos/seed/g27/600/800',
    count: 18,
    photographer: { id: 3, name: '猫八木' },
    model: { id: 19, name: '言叶' },
    images: Array.from({ length: 18 }, (_, i) =>
      `https://picsum.photos/seed/g27-${i}/800/1200`
    ),
    tags: ['日系', '小清新'],
    views: 15400,
  },
  {
    id: 28,
    title: '堕落天使',
    cover: 'https://picsum.photos/seed/g28/600/800',
    count: 21,
    photographer: { id: 11, name: '七月平安喜乐' },
    model: { id: 21, name: '橘子' },
    images: Array.from({ length: 21 }, (_, i) =>
      `https://picsum.photos/seed/g28-${i}/800/1200`
    ),
    tags: ['天使', '暗黑', '情绪'],
    views: 27800,
  },
  {
    id: 29,
    title: '夏日存档',
    cover: 'https://picsum.photos/seed/g29/600/800',
    count: 13,
    photographer: { id: 17, name: '月亮不打烊' },
    model: { id: 17, name: '小了个飞象' },
    images: Array.from({ length: 13 }, (_, i) =>
      `https://picsum.photos/seed/g29-${i}/800/1200`
    ),
    tags: ['夏日', '存档'],
    views: 7200,
  },
  {
    id: 30,
    title: '风递花笺',
    cover: 'https://picsum.photos/seed/g30/600/800',
    count: 29,
    photographer: { id: 18, name: '青陵' },
    model: { id: 22, name: '美女不吃榴莲' },
    images: Array.from({ length: 29 }, (_, i) =>
      `https://picsum.photos/seed/g30-${i}/800/1200`
    ),
    tags: ['花笺', '古风', '唯美'],
    views: 16300,
  },
];
