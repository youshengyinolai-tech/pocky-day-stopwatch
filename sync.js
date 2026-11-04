// Firebase との同期（ランキングと管理サイトの設定）。失敗してもゲームはそのまま動く。
const SDK = 'https://www.gstatic.com/firebasejs/10.12.2/';
const P = window.Pocky;

async function main() {
  // 管理画面のプレビューでは Firebase に触らない（記録を送らない・保存済みの設定で上書きしない）
  if (P.preview) return P.setRanking(null, 'プレビュー');
  const conf = window.FIREBASE_CONFIG;
  if (!conf) return P.setRanking(null, '未設定');
  const { initializeApp } = await import(SDK + 'firebase-app.js');
  const fs = await import(SDK + 'firebase-firestore.js');
  const app = initializeApp(conf);
  let db;
  try {
    // 会場の Wi-Fi が切れても記録を貯めておき、つながったら送る
    db = fs.initializeFirestore(app, { localCache: fs.persistentLocalCache({ tabManager: fs.persistentMultipleTabManager() }) });
  } catch {
    db = fs.getFirestore(app);
  }

  fs.onSnapshot(fs.doc(db, 'config', 'main'), snap => {
    if (snap.exists()) P.applyConfig(snap.data());
    else if (!snap.metadata.fromCache) P.applyConfig(null);
  }, () => {});

  // 誤差の小さい順に取ってきて、モード別の表示はゲーム側で分ける
  const q = fs.query(fs.collection(db, 'scores'), fs.orderBy('diff'), fs.limit(300));
  fs.onSnapshot(q, snap => {
    P.setRanking(snap.docs.map(d => {
      const v = d.data({ serverTimestamps: 'estimate' });
      return { id: d.id, cs: v.cs, diff: v.diff, g: v.g, mode: v.mode, jama: v.jama, at: v.at ? v.at.toMillis() : Date.now() };
    }), snap.metadata.fromCache ? 'オフライン' : 'LIVE');
  }, () => P.setRanking(null, '接続エラー'));

  P.submit = rec => fs.addDoc(fs.collection(db, 'scores'), { ...rec, at: fs.serverTimestamp() }).catch(() => {});
}
main().catch(() => P.setRanking(null, 'オフライン'));
