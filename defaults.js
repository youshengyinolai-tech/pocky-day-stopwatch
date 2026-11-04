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
// お邪魔の種類と、種類ごとに変えられる設定（index.html の JAMA と同じキー）
// 管理画面のフォームも、設定の読み込み（壊れた値の修正）も、この一覧から作る。
// kind: num（数値）/ range（最小〜最大）/ pct（%）/ bool / text / list（文字のリスト）/ checks / toasts
// 時間はすべて秒。
window.POCKY_JAMA_TYPES = {
  fakeTime: {
    name: '偽タイム', desc: '隠れているタイムの代わりに、それっぽい数字が画面のどこかに大きく出ます。',
    fields: [
      { k: 'nums', kind: 'list', label: '惑わし数字', help: '「11.10」のような、本物っぽくて紛らわしい数字。', def: ['11.10', '11.12', '10.99', '11.11', '1.11', '111.1'] },
      { k: 'near', kind: 'pct', label: '惑わし数字を出す確率', help: 'それ以外のときは、下の範囲のランダムな数字が出ます。', def: 30 },
      { k: 'randRange', kind: 'range', label: 'ランダムな数字の範囲', unit: '秒', lo: 0, hi: 99, step: 0.1, def: { min: 1, max: 14 } },
      { k: 'size', kind: 'range', label: '文字の大きさ', unit: 'px', lo: 20, hi: 300, step: 1, def: { min: 48, max: 150 } },
      { k: 'life', kind: 'num', label: '表示時間', unit: '秒', lo: 0.3, hi: 5, step: 0.1, def: 1.4 },
    ],
  },
  toast: {
    name: '偽の通知', desc: 'スマホの通知のようなカードが右上に出ます。差出人や本文は自由に作れます。',
    fields: [
      { k: 'items', kind: 'toasts', label: '通知の一覧', help: 'ここからランダムに 1 つずつ出ます。', def: 'toasts' },
      { k: 'life', kind: 'num', label: '表示時間', unit: '秒', lo: 1, hi: 10, step: 0.1, def: 2.9 },
      { k: 'max', kind: 'num', label: '同時に並ぶ最大数', unit: '件', lo: 1, hi: 6, step: 1, def: 3, help: 'これを超えると古い通知から消えます。' },
    ],
  },
  cart: {
    name: 'カート', desc: '生協の買い物カートが、ガラガラ音を立てて画面の下を横切ります。',
    fields: [
      { k: 'emoji', kind: 'text', label: '横切るもの（絵文字）', def: '🛒', help: '🛒 以外に 🚲 や 🐈 なども使えます。' },
      { k: 'speed', kind: 'range', label: '横切るのにかかる時間', unit: '秒', lo: 0.5, hi: 10, step: 0.1, def: { min: 2.2, max: 3.4 }, help: '長いほどゆっくり。' },
      { k: 'size', kind: 'num', label: '大きさ', unit: 'px', lo: 30, hi: 300, step: 1, def: 110 },
    ],
  },
  flyby: {
    name: '飛んでくるポッキー', desc: 'ポッキーが回転しながら画面を横切ります。',
    fields: [
      { k: 'many', kind: 'pct', label: 'まとめて飛んでくる確率', def: 40 },
      { k: 'manyCount', kind: 'num', label: 'まとめて飛ぶときの本数', unit: '本', lo: 2, hi: 12, step: 1, def: 3 },
      { k: 'dur', kind: 'num', label: '飛ぶ時間', unit: '秒', lo: 0.3, hi: 4, step: 0.1, def: 1.1, help: '長いほどゆっくり。' },
    ],
  },
  rain: {
    name: 'ポッキーの雨', desc: '画面いっぱいにポッキーが降ってきます。',
    fields: [
      { k: 'normal', kind: 'num', label: '本数（お邪魔「あり」）', unit: '本', lo: 1, hi: 150, step: 1, def: 24 },
      { k: 'hell', kind: 'num', label: '本数（お邪魔「地獄」）', unit: '本', lo: 1, hi: 150, step: 1, def: 40 },
      { k: 'speed', kind: 'range', label: '落ちるのにかかる時間', unit: '秒', lo: 0.3, hi: 5, step: 0.1, def: { min: 0.9, max: 1.5 }, help: '長いほどゆっくり。' },
    ],
  },
  regi: {
    name: 'レジのピッ音', desc: 'バーコードを読む「ピッ」が何回か鳴り、赤い光と値札が出ます。テンポがわざとズレていて、頭の中のカウントを狂わせます。',
    fields: [
      { k: 'count', kind: 'range', label: 'ピッの回数', unit: '回', lo: 1, hi: 15, step: 1, def: { min: 3, max: 5 } },
      { k: 'fastRate', kind: 'pct', label: '速いテンポになる確率', def: 50, help: 'それ以外は遅いテンポ。どちらも 1 秒ちょうどからズラしてあります。' },
      { k: 'fast', kind: 'range', label: '速いテンポの間隔', unit: '秒', lo: 0.1, hi: 3, step: 0.05, def: { min: 0.45, max: 0.75 } },
      { k: 'slow', kind: 'range', label: '遅いテンポの間隔', unit: '秒', lo: 0.1, hi: 3, step: 0.05, def: { min: 1.2, max: 1.5 } },
      { k: 'item', kind: 'text', label: '値札の商品名', def: 'ポッキー', allowEmpty: true },
      { k: 'prices', kind: 'list', label: '値札の値段', def: ['¥111', '¥165', '¥1,111', '¥11', '¥216'] },
    ],
  },
  receipt: {
    name: 'レシート', desc: '生協のレシートがジジジと印刷されて垂れ下がってきます。',
    fields: [
      { k: 'qty', kind: 'range', label: '品数', unit: '品', lo: 1, hi: 15, step: 1, def: { min: 3, max: 7 } },
      { k: 'item', kind: 'text', label: '商品名', def: 'ポッキー' },
      { k: 'prices', kind: 'list', label: '値段', def: ['¥111', '¥165', '¥216'] },
      { k: 'date', kind: 'text', label: '日時の欄', def: '11/11 11:11', allowEmpty: true },
      { k: 'total', kind: 'text', label: '合計', def: '¥1,111' },
      { k: 'footer', kind: 'text', label: '一番下のひとこと', def: 'またのご来店を', allowEmpty: true },
      { k: 'life', kind: 'num', label: '表示時間', unit: '秒', lo: 0.8, hi: 8, step: 0.1, def: 2.3 },
    ],
  },
  announce: {
    name: '店内放送', desc: 'チャイムのあと、生協カラーの帯に放送の文が流れます。',
    fields: [
      { k: 'words', kind: 'list', label: '放送の文', help: 'ここからランダムに 1 つ流れます。', def: 'announce', wide: true },
      { k: 'chime', kind: 'bool', label: 'チャイムを鳴らす', def: true },
      { k: 'life', kind: 'num', label: '流れる時間', unit: '秒', lo: 1.5, hi: 12, step: 0.1, def: 3.6, help: '長いほど文字がゆっくり流れます。' },
    ],
  },
  shutter: {
    name: 'シャッター', desc: 'シャッターが下りてきて、画面全体をふさぎます（その間もボタンは押せます）。',
    fields: [
      { k: 'text', kind: 'text', label: '看板の文字', def: '本日の営業は終了しました' },
      { k: 'sub', kind: 'text', label: '看板の小さい文字', def: '', allowEmpty: true, help: '空欄なら「表示テキスト」の生協名が入ります。' },
      { k: 'life', kind: 'num', label: '下りている時間', unit: '秒', lo: 0.5, hi: 6, step: 0.1, def: 1.4 },
    ],
  },
  lie: {
    name: 'ウソの声かけ', desc: '「今だ！」のような文字が画面の真ん中にドンと出ます。',
    fields: [
      { k: 'words', kind: 'list', label: '出す文字', def: 'lies' },
      { k: 'shake', kind: 'bool', label: '画面を揺らす', def: true },
      { k: 'life', kind: 'num', label: '表示時間', unit: '秒', lo: 0.3, hi: 4, step: 0.1, def: 1 },
    ],
  },
  count: {
    name: '本数カウント', desc: '吹き出しで「ポッキー 7本」のように、デタラメな本数を数えます。',
    fields: [
      { k: 'prefix', kind: 'text', label: '前につく言葉', def: 'ポッキー', allowEmpty: true },
      { k: 'unit', kind: 'text', label: '単位', def: '本', allowEmpty: true },
      { k: 'nums', kind: 'range', label: '数の範囲', lo: 0, hi: 999, step: 1, def: { min: 1, max: 11 } },
      { k: 'life', kind: 'num', label: '表示時間', unit: '秒', lo: 0.3, hi: 4, step: 0.1, def: 1.3 },
    ],
  },
  warp: {
    name: '画面の傾き・反転', desc: 'タイマーの部分が一瞬だけ傾いたり、ぼやけたり、反転したりします。',
    fields: [
      { k: 'kinds', kind: 'checks', label: '動きの種類', options: { tilt: '傾く', zoom: 'ズーム', blur: 'ぼやける', flip: '左右反転' }, def: { tilt: true, zoom: true, blur: true, flip: true } },
      { k: 'dur', kind: 'range', label: '続く時間', unit: '秒', lo: 0.1, hi: 5, step: 0.1, def: { min: 0.6, max: 1.1 } },
    ],
  },
  fakeStop: {
    name: '偽のストップ音', desc: '止めたときと同じ音が鳴り、画面に文字が一瞬出ます。',
    fields: [
      { k: 'words', kind: 'list', label: '画面に出す文字', def: ['STOP?', 'ピッ'], allowEmpty: true, help: '空にすると音だけ鳴ります。' },
    ],
  },
};
// 地獄で 2 つ同時に出るとき、相方に選ばれやすい（短くて軽い）もの
const POCKY_PAIR = ['fakeTime', 'toast', 'count', 'flyby', 'regi'];
for (const [k, t] of Object.entries(window.POCKY_JAMA_TYPES)) {
  const d = { on: true, weight: 3, from: null, to: null, pair: POCKY_PAIR.includes(k) };
  for (const f of t.fields) d[f.k] = typeof f.def === 'string' && (f.kind === 'list' || f.kind === 'toasts') ? window.POCKY_DEFAULTS[f.def] : f.def;
  window.POCKY_DEFAULTS.jama.types[k] = d;
}

// 保存された設定を初期値に重ねて、壊れた値は初期値に戻す
window.mergePockyConfig = function (cfg) {
  const D = window.POCKY_DEFAULTS;
  const c = cfg && typeof cfg === 'object' ? cfg : {};
  const str = (v, d) => typeof v === 'string' ? v : d;
  const num = (v, d, lo, hi) => Number.isFinite(v) && v >= lo && v <= hi ? Math.round(v) : d;

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

  // 種類ごとの設定を 1 つ読む。壊れていたら初期値
  function fieldValue(f, v, d) {
    const n = x => Number.isFinite(x) && x >= f.lo && x <= f.hi ? x : null;
    switch (f.kind) {
      case 'num': return n(v) ?? d;
      case 'pct': return Number.isFinite(v) && v >= 0 && v <= 100 ? Math.round(v) : d;
      case 'range': {
        const a = n(v && v.min), b = n(v && v.max);
        if (a === null || b === null) return { ...d };
        return { min: Math.min(a, b), max: Math.max(a, b) };
      }
      case 'bool': return typeof v === 'boolean' ? v : d;
      case 'text': return typeof v === 'string' && (v.trim() || f.allowEmpty) ? v : d;
      case 'list': {
        if (!Array.isArray(v)) return [...d];
        const a = v.filter(x => typeof x === 'string' && x.trim());
        return a.length || f.allowEmpty ? a : [...d];
      }
      case 'checks': {
        const o = {};
        for (const k in f.options) o[k] = v && typeof v[k] === 'boolean' ? v[k] : d[k];
        return Object.values(o).some(Boolean) ? o : { ...d };
      }
      case 'toasts': {
        const a = (Array.isArray(v) ? v : []).filter(x => x && typeof x.body === 'string' && x.body.trim())
          .map(x => ({ icon: str(x.icon, '💬') || '💬', color: /^#[0-9a-f]{3,8}$/i.test(x.color) ? x.color : '#555555', app: str(x.app, ''), from: str(x.from, ''), body: x.body }));
        return a.length ? a : d.map(x => ({ ...x }));
      }
    }
    return d;
  }

  return {
    texts, ranks,
    jama: {
      normal: lv(j.normal, D.jama.normal), hell: lv(j.hell, D.jama.hell),
      from: num(j.from, 0, 0, 60000), to: num(j.to, 0, 0, 60000),
      double: num(j.double, D.jama.double, 0, 100),
      types: Object.fromEntries(Object.entries(window.POCKY_JAMA_TYPES).map(([k, T]) => {
        const t = (j.types || {})[k] || {}, d = D.jama.types[k];
        const sec = (v, lo, hi) => Number.isFinite(v) && v >= lo && v <= hi ? v : null;
        const out = {
          on: typeof t.on === 'boolean' ? t.on : true,
          weight: num(t.weight, 3, 1, 5),
          // 種類ごとの時間帯（null なら全体の設定に従う）
          from: sec(t.from, 0, 60), to: sec(t.to, 0, 60),
          pair: typeof t.pair === 'boolean' ? t.pair : d.pair,
        };
        // 以前の形式では一部のリストが外にあった
        const legacy = { toast: { items: c.toasts }, lie: { words: c.lies }, announce: { words: c.announce } }[k] || {};
        for (const f of T.fields) out[f.k] = fieldValue(f, t[f.k] !== undefined ? t[f.k] : legacy[f.k], d[f.k]);
        return [k, out];
      })),
    },
  };
};
