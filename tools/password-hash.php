<?php
// Run from the project root: php -S localhost:8000 -t tools
// The password is hashed in this request and is never saved.
$hash = '';
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $password = (string) ($_POST['password'] ?? '');
    if ($password === '') {
        $error = 'Masukkan password terlebih dahulu.';
    } else {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        if ($hash === false) $error = 'Hash gagal dibuat. Periksa instalasi PHP.';
    }
}
function e(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
?>
<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="referrer" content="no-referrer">
  <title>Generator Hash Password</title>
  <style>
    :root{color-scheme:dark;--ink:#f7f8ff;--muted:#a6b1c8;--line:#ffffff19;--pink:#ff6fae;--blue:#78a9ff}
    *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:32px 18px;background:radial-gradient(ellipse at 14% 12%,#56327370,transparent 36%),radial-gradient(ellipse at 90% 85%,#153e6d80,transparent 38%),#090d18;color:var(--ink);font:16px/1.6 Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
    body:before,body:after{content:"";position:fixed;width:260px;height:260px;border:1px solid #ffffff0a;border-radius:50%;pointer-events:none}body:before{top:-140px;right:12%}body:after{bottom:-170px;left:8%;width:340px;height:340px}
    main{position:relative;width:min(100%,650px);padding:clamp(26px,6vw,52px);overflow:hidden;border:1px solid #ffffff20;border-radius:28px;background:linear-gradient(145deg,#ffffff0e,#ffffff05 55%),#101626ef;box-shadow:0 32px 100px #0008,inset 0 1px #ffffff12;backdrop-filter:blur(20px)}
    .topline{display:flex;align-items:center;gap:12px;margin-bottom:30px}.mark{display:grid;width:42px;height:42px;place-items:center;border:1px solid #ff6fae55;border-radius:14px;background:linear-gradient(145deg,#ff6fae26,#78a9ff20);color:#ff9bc5}.mark svg{width:21px;height:21px}.tag{color:#c5cde0;font-size:.75rem;font-weight:750;letter-spacing:.14em;text-transform:uppercase}.eyebrow{margin:0 0 8px;color:#ff91bc;font-size:.82rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase}h1{margin:0;font-size:clamp(2rem,6vw,3.1rem);line-height:1.08;letter-spacing:-.055em}h1 span{color:transparent;background:linear-gradient(95deg,#ff91bc,#ad9aff 60%,#86b9ff);background-clip:text}.intro{max-width:490px;margin:16px 0 0;color:var(--muted);font-size:.98rem}.intro code{padding:2px 6px;border:1px solid #ffffff12;border-radius:6px;background:#ffffff0a;color:#e7c6ff;font-size:.88em}
    label{display:block;margin:28px 0 9px;font-size:.9rem;font-weight:700}.field{position:relative}.field input,textarea{display:block;width:100%;border:1px solid #ffffff20;border-radius:13px;background:#090f1d;color:var(--ink);font:inherit;transition:border-color .2s,box-shadow .2s}.field input{height:54px;padding:0 54px 0 16px}.field input:focus,textarea:focus{outline:0;border-color:#9c8cff;box-shadow:0 0 0 4px #9c8cff20}.toggle{position:absolute;top:50%;right:8px;display:grid;width:38px;height:38px;place-items:center;transform:translateY(-50%);border:0;border-radius:9px;background:transparent;color:#a6b1c8;cursor:pointer}.toggle:hover{background:#ffffff10;color:#fff}.toggle svg{width:18px;height:18px}button{font:inherit}.primary,.copy{display:flex;width:100%;min-height:52px;align-items:center;justify-content:center;gap:9px;margin-top:14px;border:0;border-radius:13px;background:linear-gradient(100deg,#ff78ae,#b486ff 55%,#78a9ff);color:#111322;font-weight:800;cursor:pointer;box-shadow:0 8px 24px #a76eff28;transition:transform .2s,filter .2s}.primary:hover,.copy:hover{filter:brightness(1.08);transform:translateY(-1px)}.primary svg{width:18px;height:18px}.error{margin:10px 0 0;color:#ff9b9b}
    .result{margin-top:28px;padding:22px;border:1px solid #ffffff19;border-radius:17px;background:#080d19a8;animation:appear .3s ease-out}.result-head{display:flex;align-items:center;gap:10px}.result-dot{width:9px;height:9px;border-radius:50%;background:#72e2b4;box-shadow:0 0 14px #72e2b488}.result-head label{margin:0}.result textarea{min-height:94px;margin-top:12px;padding:14px;resize:vertical;overflow-wrap:anywhere;color:#c9d6ff;font:.85rem/1.6 ui-monospace,SFMono-Regular,Consolas,monospace}.copy{min-height:46px;margin-top:10px;border:1px solid #ffffff19;background:#ffffff0b;color:#e7eaff;box-shadow:none}.copy:hover{background:#ffffff14}.note{display:flex;gap:9px;margin:14px 0 0;color:var(--muted);font-size:.82rem}.note svg{flex:none;width:17px;height:17px;margin-top:3px;color:#8fb7ff}.footer{display:flex;align-items:center;gap:8px;margin:26px 0 0;padding-top:17px;border-top:1px solid var(--line);color:#8894ac;font-size:.78rem}.footer svg{width:15px;height:15px;color:#79d9ad}@keyframes appear{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}@media(max-width:480px){main{border-radius:22px}.topline{margin-bottom:25px}.result{padding:16px}}@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.01ms!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}
  </style>
</head>
<body>
<main>
  <div class="topline"><div class="mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="10" width="18" height="11" rx="2.5"/><path d="M7 10V7a5 5 0 0 1 10 0v3M12 14v3"/></svg></div><div class="tag">Portfolio · Security tools</div></div>
  <p class="eyebrow">Admin utility</p>
  <h1>Buat hash <span>password</span></h1>
  <p class="intro">Buat hash password admin dengan format PHP yang digunakan oleh sistem login project ini.</p>
  <form method="post" autocomplete="off">
    <label for="password">Password</label>
    <div class="field"><input id="password" name="password" type="password" required autocomplete="new-password" autofocus placeholder="Masukkan password admin"><button class="toggle" type="button" aria-label="Tampilkan password" onclick="const i=document.getElementById('password');const show=i.type==='password';i.type=show?'text':'password';this.setAttribute('aria-label',show?'Sembunyikan password':'Tampilkan password');this.innerHTML=show?'<svg viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'1.8\'><path d=\'M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8\'/><path d=\'M9.9 5.2A10.8 10.8 0 0112 5c6 0 9 7 9 7a14 14 0 01-3.1 4.2M6.2 6.2C4.1 7.6 3 12 3 12s3 7 9 7a9 9 0 004.2-1\'/></svg>':'<svg viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'1.8\'><path d=\'M2.5 12s3.2-7 9.5-7 9.5 7 9.5 7-3.2 7-9.5 7-9.5-7-9.5-7Z\'/><circle cx=\'12\' cy=\'12\' r=\'2.5\'/></svg>'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2.5 12s3.2-7 9.5-7 9.5 7 9.5 7-3.2 7-9.5 7-9.5-7-9.5-7Z"/><circle cx="12" cy="12" r="2.5"/></svg></button></div>
    <?php if ($error !== ''): ?><p class="error" role="alert"><?= e($error) ?></p><?php endif; ?>
    <button class="primary" type="submit"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.4-6.4-2.1 2.1M7.7 16.3l-2.1 2.1m12.8 0-2.1-2.1m-8.6-8.6L5.6 5.6"/><circle cx="12" cy="12" r="4"/></svg>Buat hash password</button>
  </form>
  <?php if ($hash !== ''): ?>
  <section class="result" aria-live="polite">
    <div class="result-head"><span class="result-dot"></span><label for="hash">Hash siap digunakan</label></div>
    <textarea id="hash" readonly><?= e($hash) ?></textarea>
    <button class="copy" type="button" onclick="navigator.clipboard.writeText(document.getElementById('hash').value).then(()=>{this.textContent='✓ Hash tersalin';setTimeout(()=>this.textContent='Salin hash',1800)})"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a2 2 0 00-2-2H5a2 2 0 00-2 2v9a2 2 0 002 2h3"/></svg>Salin hash</button>
    <p class="note"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></svg>Hash bisa berbeda setiap kali dibuat walaupun password sama. Salin nilainya ke kolom password admin.</p>
  </section>
  <?php endif; ?>
  <div class="footer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/></svg>Password diproses untuk membuat hash dan tidak disimpan.</div>
</main>
</body>
</html>
