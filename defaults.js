// 管理サイトで編集できる設定の初期値（index.html と admin.html で共用）
// Firebase の config/main に保存された値があれば、そちらが優先される。
window.POCKY_DEFAULTS = {
  texts: {
    title: 'ポッキーの日 11.11秒チャレンジ',
    store: '東京理科大学生協',
    org: '学生委員会 神楽坂支部',
    notice: '',
  },
  // 上から順に判定。max: 誤差（1/100秒）以内。最後の段階は「それ以外すべて」なので max なし。
  // color: POCKY_RANK_COLORS のキー、effect: POCKY_EFFECTS のキー
  ranks: [
    { g: 'P', label: 'PERFECT!!', max: 0,   color: 'gold',  effect: 'perfect' },
    { g: 'S', label: '神業',      max: 5,   color: 'ink',   effect: 'great' },
    { g: 'A', label: 'すごい！',  max: 15,  color: 'cream', effect: 'good' },
    { g: 'B', label: 'いい感じ',  max: 50,  color: 'choco', effect: 'meh' },
    { g: 'C', label: 'おしい…',   max: 100, color: 'beige', effect: 'meh' },
    { g: 'D', label: 'ざんねん…', color: 'red', effect: 'bad' },
  ],
  jama: {
    // 次のお邪魔までの間隔（ミリ秒）
    normal: { min: 900, max: 2000 },
    hell:   { min: 350, max: 900 },
    // 出してよい時間帯（GO からのミリ秒）。to が 0 なら最後まで
    from: 0,
    to: 0,
    // 地獄で 2 つ同時に出る確率（%）
    double: 35,
    // 種類ごとのオン・オフと出やすさ（0〜5）
    types: {},
  },
  toasts: [
    { icon: '🛒', color: '#1e7f4f', app: '生協', from: '東京理科大学生協', body: 'ポッキー、購買部で販売中です' },
    { icon: '🍫', color: '#7a3e27', app: '生協', from: '購買部', body: 'ポッキーの在庫、残り 11 箱です' },
    { icon: '📦', color: '#7a3e27', app: '生協', from: '入荷情報', body: 'ポッキー（極細）が入荷しました' },
    { icon: '💳', color: '#3b7be0', app: '生協', from: '組合員証', body: '組合員証をタッチしてください' },
    { icon: '🧾', color: '#555555', app: '生協', from: 'レジ', body: 'お会計 1,111 円になります' },
    { icon: '🍱', color: '#f0a400', app: '生協', from: '食堂', body: '本日の日替わり：ポッキー定食' },
    { icon: '💬', color: '#3ac569', app: 'LINE', from: '学生委員会 神楽坂支部', body: '次の人、もう並んでます！早く！' },
    { icon: '💬', color: '#3ac569', app: 'LINE', from: '学生委員会 神楽坂支部', body: 'いま何秒？ 9 秒くらい？' },
    { icon: '📢', color: '#e5533d', app: 'お知らせ', from: '学生委員会 神楽坂支部', body: 'ただいまの記録：11.11 秒（ウソです）' },
    { icon: '✉️', color: '#3b7be0', app: 'メール', from: '学生委員会', body: '【至急】ポッキーが 1 本足りません' },
    { icon: '💬', color: '#3ac569', app: 'LINE', from: '委員長', body: 'さっきの人ぴったり出してたよ' },
    { icon: '💬', color: '#3ac569', app: 'LINE', from: 'お母さん', body: '生協でポッキー買ってきて' },
    { icon: '💬', color: '#3ac569', app: 'LINE', from: '友だち', body: 'このあとポッキーゲームしよ' },
    { icon: '📅', color: '#e5533d', app: 'カレンダー', from: 'リマインダー', body: '11月11日 11:11 ポッキーの日' },
  ],
  lies: ['今だ！', 'まだ！', 'ポッキー！', 'レジ袋いりますか？', '組合員証お持ちですか？', 'あと3秒！', 'もう過ぎた？', '11.11!!', '押すな！', 'ポッキーの日！'],
  announce: [
    '本日 11月11日はポッキーの日。生協購買部ではポッキーを販売中です。',
    '東京理科大学生協 学生委員会 神楽坂支部より、お知らせいたします。',
    'お客様のお呼び出しを申し上げます。ポッキーをお忘れのお客様…',
    'まもなく 11 秒です。…たぶん。',
  ],
};

// スタンプの色 [背景, 文字]
window.POCKY_RANK_COLORS = {
  gold:  { name: '金',       bg: '#f2c14e', fg: '#2b100a' },
  ink:   { name: '黒',       bg: '#2b100a', fg: '#f2c14e' },
  cream: { name: 'クリーム×赤', bg: '#fff1dc', fg: '#b8141f' },
  choco: { name: 'クリーム×茶', bg: '#fff1dc', fg: '#4b2317' },
  beige: { name: 'ベージュ',  bg: '#f3dcb8', fg: '#4b2317' },
  red:   { name: '赤',       bg: '#7d0b14', fg: '#fff1dc' },
  green: { name: '緑',       bg: '#1e7f4f', fg: '#fff1dc' },
  pink:  { name: 'ピンク',    bg: '#f49ab0', fg: '#2b100a' },
};
// 結果の演出
window.POCKY_EFFECTS = {
  perfect: '大当たり（フラッシュ＋金色＋紙吹雪たくさん）',
  great:   'すごい（金色＋紙吹雪）',
  good:    'よい（紙吹雪すこし）',
  meh:     'ふつう（音だけ）',
  bad:     'がっくり（数字が崩れて暗くなる）',
};
// お邪魔の種類（index.html の JAMA と同じキー）
window.POCKY_JAMA_TYPES = {
  fakeTime: '偽タイム', toast: '偽の通知', cart: 'カート', flyby: '飛んでくるポッキー',
  rain: 'ポッキーの雨', regi: 'レジのピッ音', receipt: 'レシート', announce: '店内放送',
  shutter: 'シャッター', lie: 'ウソの声かけ', count: '本数カウント', warp: '画面の傾き・反転',
  fakeStop: '偽のストップ音',
};
for (const k in window.POCKY_JAMA_TYPES) window.POCKY_DEFAULTS.jama.types[k] = { on: true, weight: 3 };

// 保存された設定を初期値に重ねて、壊れた値は初期値に戻す
window.mergePockyConfig = function (cfg) {
  const D = window.POCKY_DEFAULTS;
  const c = cfg && typeof cfg === 'object' ? cfg : {};
  const str = (v, d) => typeof v === 'string' ? v : d;
  const num = (v, d, lo, hi) => Number.isFinite(v) && v >= lo && v <= hi ? Math.round(v) : d;
  const list = (v, d) => Array.isArray(v) && v.length ? v : d;

  const t = c.texts || {};
  const texts = {};
  for (const k in D.texts) texts[k] = str(t[k], D.texts[k]);

  // 古い形式（P と D に max がない）も読めるようにする
  const src = (Array.isArray(c.ranks) && c.ranks.filter(x => x && typeof x === 'object').length >= 2 ? c.ranks.filter(x => x && typeof x === 'object') : D.ranks).slice(0, 12);
  let prev = 0;
  const ranks = src.map((s, i) => {
    const d = D.ranks.find(x => x.g === s.g) || {};
    const out = {
      g: (str(s.g, '').trim() || '?').slice(0, 2),
      label: str(s.label, d.label || ''),
      color: window.POCKY_RANK_COLORS[s.color] ? s.color : d.color || 'cream',
      effect: window.POCKY_EFFECTS[s.effect] ? s.effect : d.effect || 'meh',
    };
    if (i < src.length - 1) { out.max = Math.max(prev, num(s.max, d.max === undefined ? 0 : d.max, 0, 9999)); prev = out.max; }
    return out;
  });

  const j = c.jama || {};
  const lv = (v, d) => {
    const min = num(v && v.min, d.min, 100, 20000), max = num(v && v.max, d.max, 100, 20000);
    return { min: Math.min(min, max), max: Math.max(min, max) };
  };

  const toasts = list(c.toasts, D.toasts)
    .filter(x => x && typeof x.body === 'string' && x.body)
    .map(x => ({ icon: str(x.icon, '💬') || '💬', color: /^#[0-9a-f]{3,8}$/i.test(x.color) ? x.color : '#555555', app: str(x.app, ''), from: str(x.from, ''), body: x.body }));
  const words = (v, d) => { const a = list(v, d).filter(x => typeof x === 'string' && x.trim()); return a.length ? a : d; };

  return {
    texts, ranks,
    jama: {
      normal: lv(j.normal, D.jama.normal), hell: lv(j.hell, D.jama.hell),
      from: num(j.from, 0, 0, 60000), to: num(j.to, 0, 0, 60000),
      double: num(j.double, D.jama.double, 0, 100),
      types: Object.fromEntries(Object.keys(D.jama.types).map(k => {
        const t = (j.types || {})[k] || {};
        return [k, { on: typeof t.on === 'boolean' ? t.on : true, weight: num(t.weight, 3, 0, 5) }];
      })),
    },
    toasts: toasts.length ? toasts : D.toasts,
    lies: words(c.lies, D.lies),
    announce: words(c.announce, D.announce),
  };
};
