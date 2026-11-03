// 管理サイトで編集できる設定の初期値（index.html と admin.html で共用）
// Firebase の config/main に保存された値があれば、そちらが優先される。
window.POCKY_DEFAULTS = {
  texts: {
    title: 'ポッキーの日 11.11秒チャレンジ',
    store: '東京理科大学生協',
    org: '学生委員会 神楽坂支部',
    notice: '',
  },
  // max: 誤差（1/100秒）。P は常に 0、D はそれ以外すべて。
  ranks: [
    { g: 'P', label: 'PERFECT!!' },
    { g: 'S', max: 5,   label: '神業' },
    { g: 'A', max: 15,  label: 'すごい！' },
    { g: 'B', max: 50,  label: 'いい感じ' },
    { g: 'C', max: 100, label: 'おしい…' },
    { g: 'D', label: 'ざんねん…' },
  ],
  // お邪魔の間隔（ミリ秒）
  jama: {
    normal: { min: 900, max: 2000 },
    hell:   { min: 350, max: 900 },
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

  const r = Array.isArray(c.ranks) ? c.ranks : [];
  let prev = 0;
  const ranks = D.ranks.map(d => {
    const s = r.find(x => x && x.g === d.g) || {};
    const out = { g: d.g, label: str(s.label, d.label) || d.label };
    if (d.max !== undefined) { out.max = Math.max(prev, num(s.max, d.max, 0, 9999)); prev = out.max; }
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
    jama: { normal: lv(j.normal, D.jama.normal), hell: lv(j.hell, D.jama.hell) },
    toasts: toasts.length ? toasts : D.toasts,
    lies: words(c.lies, D.lies),
    announce: words(c.announce, D.announce),
  };
};
