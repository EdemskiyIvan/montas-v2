(function(){
'use strict';

/* Skip on main page — it already has its own CTA + footer */
if(document.getElementById('cta-form')) return;

/* ── CSS ── */
const css=`
.sl-cta-bg{background:url('/assets/cta-bg.jpg') center/cover no-repeat;position:relative}
.sl-cta-bg::before{content:'';position:absolute;inset:0;background:rgba(5,18,40,.62);pointer-events:none}
.sl-cta-inner{position:relative;z-index:1;max-width:1280px;margin:0 auto;padding:clamp(64px,8vw,96px) clamp(20px,4vw,64px)}
.sl-cta-head{text-align:center;margin-bottom:clamp(32px,4vw,48px)}
.sl-cta-h2{font-size:clamp(28px,4vw,52px);font-weight:700;letter-spacing:-.03em;color:#fff;margin-bottom:12px;line-height:1.05}
.sl-cta-sub{font-size:clamp(14px,1.3vw,17px);line-height:1.65;color:rgba(255,255,255,.72)}
.sl-form-wrap{background:#fff;border-radius:16px;padding:clamp(24px,3vw,36px);box-shadow:0 24px 64px rgba(0,0,0,.18);max-width:680px;margin:0 auto}
.sl-form-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
.sl-form-row{display:flex;flex-direction:column;gap:5px;margin-bottom:14px}
.sl-form-lbl{font-size:11px;font-weight:500;color:rgba(14,15,12,.45);letter-spacing:.02em;text-transform:uppercase}
.sl-form-inp{background:var(--paper-soft,#f1f0ec);border:1px solid rgba(14,15,12,.12);border-radius:8px;padding:11px 14px;font-family:inherit;font-size:14px;color:#0e0f0c;outline:none;width:100%;transition:border-color .15s,background .15s}
.sl-form-inp:focus{border-color:#1a5cff;background:#fff;box-shadow:0 0 0 3px rgba(26,92,255,.08)}
.sl-form-inp.error{border-color:rgba(220,38,38,.5)}
.sl-form-inp::placeholder{color:rgba(14,15,12,.35)}
.sl-form-err{font-size:11px;color:rgba(220,38,38,.8);margin-top:3px;display:none}
.sl-form-err.show{display:block}
.sl-form-consent{display:flex;align-items:flex-start;gap:8px;margin-top:14px;margin-bottom:16px}
.sl-form-consent input[type=checkbox]{width:15px;height:15px;flex-shrink:0;margin-top:2px;accent-color:#1a5cff;cursor:pointer}
.sl-form-consent label{font-size:12px;color:rgba(14,15,12,.45);line-height:1.5;cursor:pointer}
.sl-form-consent label a{color:rgba(14,15,12,.6);text-decoration:underline}
.sl-form-consent label a:hover{color:#0e0f0c}
.sl-form-bottom{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}
.sl-btn-submit{background:#1a5cff;color:#fff;font-family:inherit;font-size:14px;font-weight:600;padding:13px 28px;border-radius:8px;border:none;cursor:pointer;transition:background .15s;white-space:nowrap}
.sl-btn-submit:hover{background:#1448d6}
.sl-btn-submit:disabled{opacity:.5;cursor:default}
.sl-messengers{display:flex;gap:16px;align-items:center}
.sl-messenger-link{display:inline-flex;align-items:center;gap:6px;font-size:12px;color:rgba(14,15,12,.5);transition:color .15s;text-decoration:none}
.sl-messenger-link:hover{color:#0e0f0c}
.sl-messenger-link svg{width:14px;height:14px;color:#1a5cff}
.sl-form-success{display:none;text-align:center;padding:clamp(24px,4vw,48px) 16px}
.sl-form-success-ring{width:52px;height:52px;border-radius:50%;border:1px solid #1a5cff;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:#1a5cff}
.sl-form-success h3{font-size:18px;font-weight:600;margin-bottom:6px;color:#0e0f0c}
.sl-form-success p{font-size:13px;color:rgba(14,15,12,.5)}

/* FOOTER */
.sl-footer{background:var(--paper,#fafafa);border-top:1px solid rgba(14,15,12,.12)}
.sl-footer-inner{max-width:1280px;margin:0 auto;padding:clamp(40px,5vw,64px) clamp(20px,3vw,40px) clamp(20px,3vw,32px)}
.sl-footer-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:clamp(24px,4vw,48px);margin-bottom:clamp(32px,4vw,48px);align-items:start}
.sl-footer-logo{display:flex;align-items:center;gap:8px;margin-bottom:14px}
.sl-footer-logo-img{height:22px;width:auto;display:block}
.sl-footer-desc{font-size:13px;line-height:1.6;color:rgba(14,15,12,.55);max-width:280px}
.sl-footer-nav-title{font-size:11px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:rgba(14,15,12,.38);margin-bottom:14px}
.sl-footer-nav-links{display:flex;flex-direction:column;gap:8px}
.sl-footer-nav-link{font-size:13px;color:rgba(14,15,12,.55);transition:color .15s;text-decoration:none}
.sl-footer-nav-link:hover{color:#0e0f0c}
.sl-footer-contacts{display:flex;flex-direction:column;gap:10px}
.sl-footer-contact{display:inline-flex;align-items:center;gap:8px;font-size:13px;color:rgba(14,15,12,.55);transition:color .15s;text-decoration:none}
.sl-footer-contact:hover{color:#0e0f0c}
.sl-footer-contact svg{width:13px;height:13px;color:#1a5cff;flex-shrink:0}
.sl-footer-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:20px;border-top:1px solid rgba(14,15,12,.12);gap:16px;flex-wrap:wrap}
.sl-footer-copy{font-size:11px;color:rgba(14,15,12,.38)}
.sl-footer-priv{font-size:11px;color:rgba(14,15,12,.38);transition:color .15s;text-decoration:none}
.sl-footer-priv:hover{color:#0e0f0c}
@media(max-width:1000px){.sl-footer-grid{grid-template-columns:1fr 1fr}}
@media(max-width:700px){.sl-footer-grid{grid-template-columns:1fr}.sl-form-grid{grid-template-columns:1fr}.sl-form-bottom{flex-direction:column;align-items:flex-start}.sl-btn-submit{width:100%}}
`;

const styleEl=document.createElement('style');
styleEl.textContent=css;
document.head.appendChild(styleEl);

/* ── Remove existing inner-page CTA/footer placeholders ── */
document.querySelectorAll('.footer-simple,.cases-cta-sec').forEach(el=>el.remove());
/* Also remove any injected simple CTAs/footers from previous approach */
document.querySelectorAll('section[style*="cta"],footer[style*="footer-simple"]').forEach(el=>el.remove());

/* ── TG Send (reuse same logic) ── */
const TG_TOKEN='8978813830:AAHZ9N9HR8J3sJ27GUpE0uGFfnP09envVNw';
const TG_CHATS=[484566819,-1003928460671];
async function sendTg(name,contact,type,msg){
  const text=`🔥 Новая заявка с сайта\n\nИмя: ${name}\nКонтакт: ${contact}${type?`\nТип: ${type}`:''}\n${msg?`Задача: ${msg}\n`:''}Страница: ${location.href}`;
  await Promise.all(TG_CHATS.map(chat_id=>
    fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage?`+new URLSearchParams({chat_id,text}))
  ));
}

/* ── CTA HTML ── */
const ctaEl=document.createElement('section');
ctaEl.className='sl-cta-bg';
ctaEl.innerHTML=`
<div class="sl-cta-inner">
  <div class="sl-cta-head">
    <h2 class="sl-cta-h2">Обсудим ваш проект?</h2>
    <p class="sl-cta-sub">Расскажите о задаче — ответим в течение рабочего дня</p>
  </div>
  <div class="sl-form-wrap">
    <div id="sl-form-body">
      <form id="sl-cta-form" novalidate>
        <div class="sl-form-grid">
          <div class="sl-form-row" style="margin-bottom:0">
            <label class="sl-form-lbl" for="sl-name">Имя</label>
            <input class="sl-form-inp" id="sl-name" type="text" placeholder="Иван" autocomplete="given-name">
            <span class="sl-form-err" id="sl-ename">Введите имя</span>
          </div>
          <div class="sl-form-row" style="margin-bottom:0">
            <label class="sl-form-lbl" for="sl-contact">Телефон или мессенджер</label>
            <input class="sl-form-inp" id="sl-contact" type="text" placeholder="+7 999 000 00 00">
            <span class="sl-form-err" id="sl-econtact">Укажите контакт</span>
          </div>
        </div>
        <div class="sl-form-row">
          <label class="sl-form-lbl" for="sl-type">Тип задачи</label>
          <select class="sl-form-inp" id="sl-type">
            <option value="">Выберите направление</option>
            <option>Маркетинг</option>
            <option>SMM</option>
            <option>Дизайн</option>
            <option>Разработка</option>
            <option>AI и автоматизация</option>
            <option>Аналитика и стратегия</option>
            <option>Комплекс</option>
            <option>Другое</option>
          </select>
        </div>
        <div class="sl-form-row">
          <label class="sl-form-lbl" for="sl-msg">Расскажите о задаче</label>
          <textarea class="sl-form-inp" id="sl-msg" rows="3" placeholder="Коротко о проекте, бюджете или сроках — что важно знать заранее" style="resize:none"></textarea>
        </div>
        <div class="sl-form-consent">
          <input type="checkbox" id="sl-consent">
          <label for="sl-consent">Нажимая кнопку, я даю согласие на <a href="/privacy-policy.html" target="_blank">обработку персональных данных</a> в соответствии с <a href="/privacy-policy.html" target="_blank">Политикой конфиденциальности</a></label>
        </div>
        <span class="sl-form-err" id="sl-econsent">Необходимо ваше согласие</span>
        <div class="sl-form-bottom">
          <button type="submit" class="sl-btn-submit" id="sl-btn">Отправить заявку</button>
          <div class="sl-messengers">
            <span style="font-size:11px;color:rgba(14,15,12,.38)">или напишите:</span>
            <a href="https://t.me/Montas_IO" target="_blank" rel="noopener" class="sl-messenger-link">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 7.13l-1.68 7.93c-.12.56-.46.7-.93.43l-2.58-1.9-1.24 1.2c-.14.14-.26.26-.52.26l.18-2.63 4.75-4.29c.21-.18-.04-.28-.32-.1L7.92 14.84l-2.52-.79c-.55-.17-.56-.55.12-.82l9.84-3.79c.45-.17.85.1.57.89z"/></svg>
              Telegram
            </a>
            <a href="https://api.whatsapp.com/send/?phone=79112144344&text&type=phone_number&app_absent=0" target="_blank" rel="noopener" class="sl-messenger-link">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </form>
    </div>
    <div class="sl-form-success" id="sl-success">
      <div class="sl-form-success-ring">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 11l6 6L19 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <h3>Заявка отправлена</h3>
      <p>Ответим в течение рабочего дня</p>
    </div>
  </div>
</div>`;
document.body.appendChild(ctaEl);

/* Form submit */
document.getElementById('sl-cta-form').addEventListener('submit',async function(e){
  e.preventDefault();
  const nameEl=document.getElementById('sl-name');
  const contactEl=document.getElementById('sl-contact');
  const typeEl=document.getElementById('sl-type');
  const msgEl=document.getElementById('sl-msg');
  const consentEl=document.getElementById('sl-consent');
  const en=document.getElementById('sl-ename');
  const ec=document.getElementById('sl-econtact');
  const eco=document.getElementById('sl-econsent');
  let valid=true;
  [nameEl,contactEl].forEach(i=>i.classList.remove('error'));
  [en,ec,eco].forEach(m=>m.classList.remove('show'));
  if(!nameEl.value.trim()){nameEl.classList.add('error');en.classList.add('show');valid=false;}
  if(!contactEl.value.trim()){contactEl.classList.add('error');ec.classList.add('show');valid=false;}
  if(!consentEl.checked){eco.classList.add('show');valid=false;}
  if(!valid)return;
  const btn=document.getElementById('sl-btn');
  btn.disabled=true;btn.textContent='Отправляем…';
  await sendTg(nameEl.value.trim(),contactEl.value.trim(),typeEl.value,msgEl.value.trim());
  document.getElementById('sl-form-body').style.display='none';
  document.getElementById('sl-success').style.display='block';
});

/* ── FOOTER HTML ── */
const footerEl=document.createElement('footer');
footerEl.className='sl-footer';
footerEl.innerHTML=`
<div class="sl-footer-inner">
  <div class="sl-footer-grid">
    <div>
      <div class="sl-footer-logo">
        <a href="/"><img src="/assets/logo.svg" alt="MONTAS" class="sl-footer-logo-img"></a>
      </div>
      <p class="sl-footer-desc">Маркетинговое агентство полного цикла для малого и среднего бизнеса, застройщиков и логистики</p>
    </div>
    <div>
      <div class="sl-footer-nav-title">Навигация</div>
      <div class="sl-footer-nav-links">
        <a href="/#services" class="sl-footer-nav-link">Услуги</a>
        <a href="/cases/" class="sl-footer-nav-link">Кейсы</a>
        <a href="/about.html" class="sl-footer-nav-link">О нас</a>
        <a href="/blog/" class="sl-footer-nav-link">Блог</a>
        <a href="/#contact" class="sl-footer-nav-link">Контакты</a>
      </div>
    </div>
    <div>
      <div class="sl-footer-nav-title">Контакты</div>
      <div class="sl-footer-contacts">
        <a href="mailto:info@montas.io" class="sl-footer-contact">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          info@montas.io
        </a>
        <a href="https://t.me/Montas_IO" target="_blank" rel="noopener" class="sl-footer-contact">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.93 7.13l-1.68 7.93c-.12.56-.46.7-.93.43l-2.58-1.9-1.24 1.2c-.14.14-.26.26-.52.26l.18-2.63 4.75-4.29c.21-.18-.04-.28-.32-.1L7.92 14.84l-2.52-.79c-.55-.17-.56-.55.12-.82l9.84-3.79c.45-.17.85.1.57.89z"/></svg>
          @Montas_IO
        </a>
        <a href="https://api.whatsapp.com/send/?phone=79112144344&text&type=phone_number&app_absent=0" target="_blank" rel="noopener" class="sl-footer-contact">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          +7 (911) 214-43-44
        </a>
      </div>
    </div>
  </div>
  <div class="sl-footer-bottom">
    <div>
      <p class="sl-footer-copy">© 2026 Montas. Все права защищены.</p>
      <p class="sl-footer-copy" style="margin-top:4px">ООО «Арабелла» · 199034, г. Санкт-Петербург, 6-я линия В.О., д. 1/25, лит. А, офис 41, пом. 13-Н</p>
    </div>
    <div style="display:flex;gap:16px;flex-wrap:wrap">
      <a href="/privacy-policy.html" class="sl-footer-priv">Политика конфиденциальности</a>
      <a href="/cookie-policy.html" class="sl-footer-priv">Политика cookie</a>
    </div>
  </div>
</div>`;
document.body.appendChild(footerEl);

})();
