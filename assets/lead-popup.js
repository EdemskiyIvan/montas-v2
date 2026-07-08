(function(){
'use strict';

const TG_TOKEN='8978813830:AAHZ9N9HR8J3sJ27GUpE0uGFfnP09envVNw';
const TG_CHATS=[484566819,-1003928460671];

/* ── CSS ── */
const css=`
#lp-overlay{
  position:fixed;inset:0;z-index:9000;
  background:rgba(14,15,12,.48);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);
  opacity:0;pointer-events:none;transition:opacity .25s ease;
}
#lp-overlay.lp-open{opacity:1;pointer-events:all;}

#lp-modal{
  position:fixed;z-index:9001;
  background:#fafafa;
  box-shadow:0 24px 80px rgba(0,0,0,.18);
  transition:transform .3s cubic-bezier(.32,1.2,.4,1),opacity .25s ease;
}

/* Desktop — centred */
@media(min-width:641px){
  #lp-modal{
    top:50%;left:50%;
    transform:translate(-50%,-44%);
    opacity:0;pointer-events:none;
    width:min(480px,94vw);
    border-radius:16px;
    padding:36px 36px 32px;
  }
  #lp-overlay.lp-open #lp-modal,
  #lp-modal.lp-open{
    transform:translate(-50%,-50%);
    opacity:1;pointer-events:all;
  }
}

/* Mobile — bottom sheet */
@media(max-width:640px){
  #lp-modal{
    left:0;right:0;bottom:0;
    border-radius:20px 20px 0 0;
    padding:28px 24px calc(28px + env(safe-area-inset-bottom));
    transform:translateY(100%);
    pointer-events:none;
  }
  #lp-overlay.lp-open #lp-modal,
  #lp-modal.lp-open{
    transform:translateY(0);
    pointer-events:all;
  }
  #lp-handle{display:block;}
}

#lp-handle{
  display:none;width:36px;height:4px;border-radius:999px;
  background:rgba(14,15,12,.15);margin:0 auto 20px;
}
#lp-close{
  position:absolute;top:16px;right:16px;
  width:32px;height:32px;border-radius:50%;
  border:none;background:rgba(14,15,12,.07);
  cursor:pointer;display:flex;align-items:center;justify-content:center;
  color:rgba(14,15,12,.5);font-size:16px;line-height:1;
  transition:background .15s,color .15s;
}
#lp-close:hover{background:rgba(14,15,12,.12);color:#0e0f0c;}
#lp-title{font-family:'Google Sans','Plus Jakarta Sans',system-ui,sans-serif;font-size:20px;font-weight:700;letter-spacing:-.02em;color:#0e0f0c;margin-bottom:6px;}
#lp-sub{font-size:13px;color:rgba(14,15,12,.5);margin-bottom:24px;line-height:1.5;}
.lp-row{display:flex;flex-direction:column;gap:5px;margin-bottom:14px;}
.lp-lbl{font-size:10px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:rgba(14,15,12,.4);}
.lp-inp{
  border:1px solid rgba(14,15,12,.14);border-radius:8px;
  background:#f1f0ec;padding:11px 14px;
  font-family:'Google Sans','Plus Jakarta Sans',system-ui,sans-serif;
  font-size:14px;color:#0e0f0c;outline:none;width:100%;
  transition:border-color .15s,background .15s;
}
.lp-inp:focus{border-color:#1a5cff;background:#fff;box-shadow:0 0 0 3px rgba(26,92,255,.1);}
.lp-inp.lp-err{border-color:rgba(220,38,38,.5);}
.lp-inp::placeholder{color:rgba(14,15,12,.35);}
.lp-errmsg{font-size:11px;color:rgba(220,38,38,.8);margin-top:3px;display:none;}
.lp-errmsg.lp-show{display:block;}
#lp-btn{
  width:100%;padding:13px;border:none;border-radius:8px;
  background:#1a5cff;color:#fff;
  font-family:'Google Sans','Plus Jakarta Sans',system-ui,sans-serif;
  font-size:14px;font-weight:600;cursor:pointer;
  transition:background .15s,transform .1s;margin-top:4px;
}
#lp-btn:hover:not(:disabled){background:#1448d6;}
#lp-btn:active:not(:disabled){transform:scale(.98);}
#lp-btn:disabled{opacity:.6;cursor:not-allowed;}
#lp-success{
  display:none;text-align:center;padding:12px 0 4px;
}
#lp-success svg{margin:0 auto 16px;color:#1a5cff;}
#lp-success h3{font-size:18px;font-weight:700;letter-spacing:-.02em;color:#0e0f0c;margin-bottom:8px;}
#lp-success p{font-size:13px;color:rgba(14,15,12,.5);line-height:1.55;}
`;

const styleEl=document.createElement('style');
styleEl.textContent=css+`
#tg-widget{
  position:fixed;bottom:24px;right:24px;z-index:8999;
  display:inline-flex;align-items:center;gap:8px;
  background:#1a5cff;color:#fff;
  padding:11px 18px 11px 14px;
  border-radius:999px;
  font-family:'Google Sans','Plus Jakarta Sans',system-ui,sans-serif;
  font-size:13px;font-weight:600;
  text-decoration:none;
  box-shadow:0 4px 20px rgba(26,92,255,.35);
  transition:background .15s,transform .2s,box-shadow .2s;
  white-space:nowrap;
}
#tg-widget:hover{background:#1448d6;transform:translateY(-2px);box-shadow:0 6px 28px rgba(26,92,255,.45)}
#tg-widget svg{width:18px;height:18px;flex-shrink:0}
@media(max-width:480px){#tg-widget span{display:none}#tg-widget{padding:12px}}
`;
document.head.appendChild(styleEl);

/* ── HTML ── */
const overlay=document.createElement('div');
overlay.id='lp-overlay';
overlay.innerHTML=`
<div id="lp-modal" role="dialog" aria-modal="true" aria-labelledby="lp-title">
  <div id="lp-handle"></div>
  <button id="lp-close" aria-label="Закрыть">✕</button>
  <div id="lp-form-wrap">
    <div id="lp-title">Оставить заявку</div>
    <div id="lp-sub">Ответим в течение рабочего дня</div>
    <form id="lp-form" novalidate>
      <div class="lp-row">
        <label class="lp-lbl" for="lp-name">Имя</label>
        <input class="lp-inp" id="lp-name" type="text" placeholder="Иван" autocomplete="given-name">
        <span class="lp-errmsg" id="lp-ename">Введите имя</span>
      </div>
      <div class="lp-row">
        <label class="lp-lbl" for="lp-contact">Телефон или мессенджер</label>
        <input class="lp-inp" id="lp-contact" type="text" placeholder="+7 999 000 00 00 или @username" autocomplete="tel">
        <span class="lp-errmsg" id="lp-econtact">Укажите контакт</span>
      </div>
      <div class="lp-row">
        <label class="lp-lbl" for="lp-msg">Задача (необязательно)</label>
        <textarea class="lp-inp" id="lp-msg" rows="2" placeholder="Кратко опишите задачу…" style="resize:none;line-height:1.5;min-height:64px;"></textarea>
      </div>
      <div style="display:flex;align-items:flex-start;gap:8px;margin-bottom:12px">
        <input type="checkbox" id="lp-consent" style="width:14px;height:14px;flex-shrink:0;margin-top:3px;accent-color:#1a5cff;cursor:pointer">
        <label for="lp-consent" style="font-size:11px;color:rgba(14,15,12,.45);line-height:1.5;cursor:pointer">Нажимая кнопку, я даю согласие на <a href="/privacy-policy.html" target="_blank" style="color:rgba(14,15,12,.6);text-decoration:underline">обработку персональных данных</a></label>
      </div>
      <span class="lp-errmsg" id="lp-econsent" style="display:none;margin-bottom:8px">Необходимо ваше согласие</span>
      <button type="submit" id="lp-btn">Отправить заявку</button>
    </form>
  </div>
  <div id="lp-success">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
    <h3>Заявка отправлена!</h3>
    <p>Мы получили ваш запрос и свяжемся с вами в течение рабочего дня.</p>
  </div>
</div>`;
document.body.appendChild(overlay);

/* ── TG Widget ── */
const tgWidget=document.createElement('a');
tgWidget.id='tg-widget';
tgWidget.href='https://t.me/Montas_IO';
tgWidget.target='_blank';
tgWidget.rel='noopener';
tgWidget.innerHTML=`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 7.13l-1.68 7.93c-.12.56-.46.7-.93.43l-2.58-1.9-1.24 1.2c-.14.14-.26.26-.52.26l.18-2.63 4.75-4.29c.21-.18-.04-.28-.32-.1L7.92 14.84l-2.52-.79c-.55-.17-.56-.55.12-.82l9.84-3.79c.45-.17.85.1.57.89z"/></svg><span>Мы на связи</span>`;
document.body.appendChild(tgWidget);

const modal=overlay.querySelector('#lp-modal');

/* ── Open / Close ── */
function openPopup(){
  overlay.classList.add('lp-open');
  modal.classList.add('lp-open');
  document.body.style.overflow='hidden';
  setTimeout(()=>overlay.querySelector('#lp-name').focus(),300);
}
function closePopup(){
  overlay.classList.remove('lp-open');
  modal.classList.remove('lp-open');
  document.body.style.overflow='';
}

overlay.addEventListener('click',e=>{if(e.target===overlay)closePopup();});
overlay.querySelector('#lp-close').addEventListener('click',closePopup);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closePopup();});

/* Touch swipe down to close (mobile) */
let touchY=0;
modal.addEventListener('touchstart',e=>{touchY=e.touches[0].clientY;},{passive:true});
modal.addEventListener('touchend',e=>{if(e.changedTouches[0].clientY-touchY>80)closePopup();},{passive:true});

/* ── Intercept CTA buttons ── */
document.addEventListener('click',e=>{
  const el=e.target.closest(
    '.nav-cta,.mob-btn,.btn-accent,.btn-white,[data-lead-popup]'
  );
  if(!el)return;
  const href=el.getAttribute('href')||'';
  if(href&&!href.includes('contact')&&!el.dataset.leadPopup)return;
  e.preventDefault();
  /* reset form state */
  overlay.querySelector('#lp-form-wrap').style.display='';
  overlay.querySelector('#lp-success').style.display='none';
  overlay.querySelector('#lp-form').reset();
  overlay.querySelectorAll('.lp-inp').forEach(i=>i.classList.remove('lp-err'));
  overlay.querySelectorAll('.lp-errmsg').forEach(m=>m.classList.remove('lp-show'));
  const btn=overlay.querySelector('#lp-btn');
  btn.disabled=false;btn.textContent='Отправить заявку';
  openPopup();
});

/* ── Telegram send (GET — no CORS preflight) ── */
async function sendTelegram(name,contact,msg){
  const page=location.href;
  const text=`🔥 Новая заявка с сайта\n\nИмя: ${name}\nКонтакт: ${contact}${msg?`\nЗадача: ${msg}`:''}\nСтраница: ${page}`;
  try{
    const results=await Promise.all(TG_CHATS.map(chat_id=>
      fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage?`+new URLSearchParams({chat_id,text})).then(r=>r.json())
    ));
    const failed=results.filter(d=>!d.ok);
    if(failed.length){
      window._lpLastTgError=`Telegram: ${failed[0].description} (${failed[0].error_code})`;
      console.error('[lead-popup] Telegram errors:',failed);
    }
    return results.some(d=>d.ok);
  }catch(err){
    console.error('[lead-popup] fetch error:',err);
    return false;
  }
}

/* ── Form submit ── */
overlay.querySelector('#lp-form').addEventListener('submit',async e=>{
  e.preventDefault();
  const nameEl=overlay.querySelector('#lp-name');
  const contactEl=overlay.querySelector('#lp-contact');
  const msgEl=overlay.querySelector('#lp-msg');
  const en=overlay.querySelector('#lp-ename');
  const ec=overlay.querySelector('#lp-econtact');
  const consentEl=overlay.querySelector('#lp-consent');
  const econsentEl=overlay.querySelector('#lp-econsent');
  let valid=true;
  [nameEl,contactEl].forEach(i=>i.classList.remove('lp-err'));
  [en,ec].forEach(m=>m.classList.remove('lp-show'));
  econsentEl.style.display='none';
  if(!nameEl.value.trim()){nameEl.classList.add('lp-err');en.classList.add('lp-show');valid=false;}
  if(!contactEl.value.trim()){contactEl.classList.add('lp-err');ec.classList.add('lp-show');valid=false;}
  if(!consentEl.checked){econsentEl.style.display='block';valid=false;}
  if(!valid)return;
  const btn=overlay.querySelector('#lp-btn');
  btn.disabled=true;btn.textContent='Отправляем…';
  const sent=await sendTelegram(nameEl.value.trim(),contactEl.value.trim(),msgEl.value.trim());
  if(sent){
    overlay.querySelector('#lp-form-wrap').style.display='none';
    overlay.querySelector('#lp-success').style.display='block';
    setTimeout(closePopup,3500);
  }else{
    btn.disabled=false;
    btn.textContent='Отправить заявку';
    btn.style.background='';
    // показать ошибку под кнопкой
    let errEl=overlay.querySelector('#lp-send-err');
    if(!errEl){errEl=document.createElement('p');errEl.id='lp-send-err';errEl.style.cssText='font-size:12px;color:#dc2626;margin-top:8px;text-align:center';overlay.querySelector('#lp-form').appendChild(errEl);}
    errEl.textContent=window._lpLastTgError||'Ошибка отправки — проверьте консоль (F12)';
  }
});

/* ── Wire up existing index.html inline form too ── */
document.addEventListener('DOMContentLoaded',()=>{
  const inlineForm=document.getElementById('cta-form');
  if(!inlineForm)return;
  inlineForm.addEventListener('submit',async e=>{
    e.stopImmediatePropagation();
  },true);
},true);

/* ── Cookie Banner ── */
if(!localStorage.getItem('montas_cookie')){
  const cbCss=`
#ck-card{
  position:fixed;bottom:24px;left:24px;z-index:8998;
  background:#fff;border-radius:20px;
  box-shadow:0 8px 40px rgba(0,0,0,.14),0 2px 8px rgba(0,0,0,.06);
  padding:24px;width:320px;max-width:calc(100vw - 48px);
  transform:translateY(24px);opacity:0;
  transition:transform .4s cubic-bezier(.16,1,.3,1),opacity .4s ease;
  font-family:'Google Sans','Plus Jakarta Sans',system-ui,sans-serif;
}
#ck-card.ck-show{transform:translateY(0);opacity:1}
#ck-card p{font-size:14px;line-height:1.6;color:rgba(14,15,12,.7);margin:0 0 20px}
#ck-btns{display:flex;gap:10px}
#ck-decline{flex:1;padding:12px 16px;border-radius:12px;border:1.5px solid rgba(14,15,12,.15);background:transparent;color:#1a5cff;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:border-color .15s}
#ck-decline:hover{border-color:#1a5cff}
#ck-accept{flex:1;padding:12px 16px;border-radius:12px;border:none;background:#1a5cff;color:#fff;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:background .15s}
#ck-accept:hover{background:#1448d6}
#ck-more-link{display:block;margin-top:14px;font-size:12px;color:rgba(14,15,12,.4);text-decoration:none;text-align:center;transition:color .15s}
#ck-more-link:hover{color:#1a5cff}
`;
  const ckStyle=document.createElement('style');
  ckStyle.textContent=cbCss;
  document.head.appendChild(ckStyle);

  const card=document.createElement('div');
  card.id='ck-card';
  card.innerHTML=`
<p>Нажимая «Принять все», вы соглашаетесь на сохранение файлов cookie на вашем устройстве для аналитики и улучшения сайта.</p>
<div id="ck-btns">
  <button id="ck-decline">Отклонить</button>
  <button id="ck-accept">Принять все</button>
</div>
<a href="/cookie-policy.html" id="ck-more-link">Подробнее о cookie</a>`;
  document.body.appendChild(card);

  requestAnimationFrame(()=>requestAnimationFrame(()=>card.classList.add('ck-show')));

  function dismissCookie(){
    localStorage.setItem('montas_cookie','accepted');
    card.style.transform='translateY(24px)';
    card.style.opacity='0';
    setTimeout(()=>card.remove(),400);
  }
  document.getElementById('ck-accept').addEventListener('click',dismissCookie);
  document.getElementById('ck-decline').addEventListener('click',dismissCookie);
}

})();
