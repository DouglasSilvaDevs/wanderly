(() => {
  'use strict';

  const destinations = {
    santorini: {
      name: 'Santorini', country: 'Grécia', image: 'santorini-hero.png',
      title: 'Onde o céu encontra o mar.',
      description: 'Entre ruelas claras, cúpulas azuis e o horizonte do mar Egeu, Santorini é um convite para desacelerar. Escolha um mirante, encontre uma mesa sem pressa e deixe o pôr do sol fazer parte da sua história.',
      tags: ['Mar e pôr do sol', 'Vilarejos', 'Uma viagem a dois'],
      ideas: ['Caminhar pelas ruelas de Oia.', 'Explorar a arquitetura e os mirantes de Fira.', 'Experimentar sabores locais com vista para o mar.'],
      journalTitle: 'A última luz de Santorini',
      journal: ['O sol vai descendo, e as paredes brancas ganham um tom de mel. Há um instante em que ninguém parece ter pressa: as conversas ficam baixas e o horizonte ocupa toda a atenção.', 'Santorini inspira esse tipo de pausa. Uma caminhada sem mapa, uma escadaria descoberta por acaso, uma mesa de frente para o mar. O roteiro deixa espaço para o que não estava previsto.', 'O que fica não é apenas a fotografia. É a sensação de ter estado inteiro naquele momento.'],
      quote: 'Há paisagens que continuam com a gente muito depois da volta.'
    },
    alpes: {
      name: 'Alpes Suíços', country: 'Suíça', image: 'alpes.png',
      title: 'Entre montanhas e silêncios.',
      description: 'Lagos de água azul, trilhas entre montanhas e pequenos vilarejos desenham uma viagem em que a natureza ocupa o centro. Nos Alpes Suíços, cada parada convida a respirar fundo e olhar com mais calma.',
      tags: ['Natureza', 'Lagos e montanhas', 'Caminhos ao ar livre'],
      ideas: ['Contemplar os lagos e a paisagem alpina.', 'Reservar tempo para conhecer pequenos vilarejos.', 'Escolher passeios na natureza de acordo com o seu ritmo.'],
      journalTitle: 'Entre montanhas e silêncios',
      journal: ['O primeiro impulso é pegar a câmera. O segundo, e talvez o mais bonito, é guardá-la por um instante. Diante de um lago cercado por montanhas, o silêncio tem uma presença própria.', 'A viagem pelos Alpes pode ser feita de pequenas descobertas: o som da água, uma estrada que se curva, uma janela aberta para os picos. Não é preciso preencher cada hora para que o dia seja memorável.', 'Às vezes, o capítulo mais marcante é aquele em que quase nada acontece. Você apenas respira, observa e percebe que chegou.'],
      quote: 'O silêncio também pode ser a melhor lembrança de uma viagem.'
    },
    bali: {
      name: 'Bali', country: 'Indonésia', image: 'bali.png',
      title: 'Encontre beleza em cada manhã.',
      description: 'Bali reúne paisagens tropicais, templos de pedra e uma cultura que se revela nos detalhes. Entre campos verdes e caminhos tranquilos, a ilha inspira uma viagem feita de encontros, cuidado e curiosidade.',
      tags: ['Cultura', 'Paisagens tropicais', 'Novos sabores'],
      ideas: ['Conhecer os templos com respeito aos costumes locais.', 'Descobrir paisagens verdes e caminhos de Ubud.', 'Provar a culinária e observar os pequenos rituais do cotidiano.'],
      journalTitle: 'O primeiro sol de Bali',
      journal: ['O dia começa devagar. A luz atravessa as árvores, toca os portais de pedra e revela detalhes que a pressa não deixaria ver. Bali parece pedir uma atenção diferente.', 'Entre a vegetação e as pequenas ruas, os encontros dão forma ao caminho. Conhecer um lugar também é aprender a ouvir: observar seus costumes, respeitar seus espaços e aceitar que nem tudo precisa ser explicado.', 'Na manhã seguinte, a paisagem é a mesma, mas o olhar mudou. Talvez seja isso que uma boa viagem faz: devolve a curiosidade.'],
      quote: 'Cada amanhecer é uma nova chance de olhar com mais calma.'
    },
    capadocia: {
      name: 'Capadócia', country: 'Turquia', image: 'capadocia.png',
      title: 'Para olhar o mundo de outro jeito.',
      description: 'Formações rochosas singulares, vales em tons de ocre e um céu que se enche de balões: a Capadócia cria um cenário que parece saído de outra história. Uma inspiração para quem procura paisagens inesquecíveis.',
      tags: ['Paisagens', 'Cultura e história', 'Horizontes diferentes'],
      ideas: ['Ver o amanhecer sobre os vales.', 'Explorar as paisagens e a arquitetura de Göreme.', 'Guardar um tempo para observar o céu e o horizonte.'],
      journalTitle: 'Quando os sonhos ganham céu',
      journal: ['Ainda está frio quando o horizonte começa a clarear. Aos poucos, os balões aparecem sobre os vales e o céu vira parte da paisagem. É difícil decidir para onde olhar primeiro.', 'A Capadócia tem uma beleza que muda com a luz. As pedras, os caminhos e as pequenas casas ganham novas cores ao longo do dia. Cada curva revela um ponto de vista diferente.', 'Na volta, sobra a vontade de manter esse olhar: encontrar um pouco de novidade mesmo nos caminhos conhecidos.'],
      quote: 'Mudar de perspectiva pode ser o começo de uma nova história.'
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const storageKey = 'wanderly.trip-plan.v1';
  const experienceDialog = $('#experience-dialog');
  const plannerDialog = $('#planner-dialog');
  const form = $('#planner-form');
  const resultPanel = $('#plan-result');
  const companyNames = {solo: 'Só eu e o mundo', casal: 'Uma viagem a dois', amigos: 'Com os amigos', familia: 'Com a família'};
  let currentPlan = null;
  let toastTimer;

  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const icon = name => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const today = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  };
  const formatDate = value => new Intl.DateTimeFormat('pt-BR', {day:'2-digit',month:'long',year:'numeric'}).format(new Date(`${value}T12:00:00`));

  function notify(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 3500);
  }

  function readPlan() {
    try {
      const plan = JSON.parse(localStorage.getItem(storageKey));
      if (!plan || typeof plan !== 'object' || !Object.hasOwn(destinations,plan.destination) || typeof plan.name !== 'string' || !plan.name.trim() || typeof plan.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(plan.date) || !Number.isFinite(new Date(`${plan.date}T12:00:00`).getTime()) || !Object.hasOwn(companyNames,plan.company) || !['tranquilidade','aventura','cultura','um pouco de tudo'].includes(plan.mood)) return null;
      return {...plan,name:plan.name.slice(0,70),notes:typeof plan.notes === 'string' ? plan.notes.slice(0,800) : ''};
    } catch { return null; }
  }

  function openDialog(dialog) {
    closeMenu();
    $$('dialog[open]').forEach(open => { if (open !== dialog) open.close(); });
    if (!dialog.open) dialog.showModal();
    document.body.classList.add('modal-open');
  }

  function closeMenu() {
    $('#main-nav').classList.remove('is-open');
    $('#menu-toggle').setAttribute('aria-expanded','false');
    $('#menu-toggle').setAttribute('aria-label','Abrir menu');
  }

  function openDestination(id) {
    if (!Object.hasOwn(destinations,id)) return;
    const destination = destinations[id];
    if (!destination) return;
    $('#experience-content').innerHTML = `
      <img class="experience-image ${id === 'santorini' ? 'santorini-image' : ''}" src="assets/${destination.image}" alt="Paisagem de ${destination.name}">
      <div class="experience-body"><p class="eyebrow">${destination.country.toUpperCase()} · SEU PRÓXIMO DESTINO</p><h2 id="experience-title">${destination.name}</h2><p>${destination.description}</p><div class="destination-tags">${destination.tags.map(tag => `<span>${tag}</span>`).join('')}</div><h3>Ideias para a sua história</h3><ul>${destination.ideas.map(idea => `<li>${idea}</li>`).join('')}</ul><button type="button" class="button button-gold" data-plan-destination="${id}">Quero planejar essa viagem ${icon('arrow')}</button></div>`;
    openDialog(experienceDialog);
  }

  function openJournal(id) {
    if (!Object.hasOwn(destinations,id)) return;
    const destination = destinations[id];
    if (!destination) return;
    $('#experience-content').innerHTML = `
      <img class="experience-image" src="assets/${destination.image}" alt="Paisagem de ${destination.name}">
      <article class="experience-body"><p class="eyebrow">DIÁRIO DE VIAGEM · ${destination.name.toUpperCase()}</p><h2 id="experience-title">${destination.journalTitle}</h2>${destination.journal.map(paragraph => `<p>${paragraph}</p>`).join('')}<blockquote class="experience-quote">${destination.quote}</blockquote><button type="button" class="button button-outline" data-plan-destination="${id}">Escreva o seu próximo capítulo ${icon('arrow')}</button></article>`;
    openDialog(experienceDialog);
  }

  function openStory() {
    $('#experience-content').innerHTML = `
      <img class="experience-image" src="assets/estrada.png" alt="Estrada junto ao mar ao pôr do sol">
      <div class="experience-body"><p class="eyebrow">VIVA. EXPLORE. INSPIRE.</p><h2 id="experience-title">A vida fica maior<br>quando a gente explora.</h2><p>A Wanderly é um espaço para quem acredita que uma viagem pode ser o começo de uma boa história. O destino é o ponto de partida; o que você sente, descobre e leva de volta é o que torna tudo especial.</p><p>Reunimos inspiração, paisagens e pequenas ideias para ajudar você a imaginar a próxima aventura. Sem pressa de preencher o roteiro. Com espaço para encontros, caminhos inesperados e momentos que merecem ser vividos por inteiro.</p><blockquote class="experience-quote">Colecione momentos, não coisas.</blockquote><button type="button" class="button button-gold" data-start-planning>Comece a sua história ${icon('arrow')}</button></div>`;
    openDialog(experienceDialog);
  }

  function openPrivacy() {
    $('#experience-content').innerHTML = `<div class="experience-body"><p class="eyebrow">SEUS DADOS, SEU CAMINHO</p><h2 id="experience-title">Privacidade</h2><div class="privacy-copy"><p>O planejador armazena seu nome, destino, data, companhia, preferências e observações apenas no armazenamento local deste navegador. O formulário não envia esses dados para uma empresa de turismo nem realiza reservas.</p><p>O plano pode ser baixado em um arquivo de texto ou excluído a qualquer momento. Se você utilizar um dispositivo compartilhado, exclua o plano ao terminar.</p><p>Esta landing page não inclui ferramentas de publicidade ou análise de visitantes. Os recursos de autenticação e hospedagem da plataforma podem ter suas próprias políticas.</p></div><button type="button" class="button button-outline" data-delete-saved>Excluir meu plano salvo ${icon('close')}</button></div>`;
    openDialog(experienceDialog);
  }

  function showPlannerForm(destinationId) {
    const saved = readPlan();
    currentPlan = saved;
    form.hidden = false;
    resultPanel.hidden = true;
    $('#planner-error').textContent = '';
    if (saved) {
      form.elements.name.value = saved.name;
      form.elements.destination.value = saved.destination;
      form.elements.date.value = saved.date;
      form.elements.company.value = saved.company;
      form.elements.mood.value = saved.mood;
      form.elements.notes.value = saved.notes;
    }
    if (destinationId && destinations[destinationId]) form.elements.destination.value = destinationId;
    form.elements.date.min = today();
  }

  function openPlanner(destinationId) {
    const saved = readPlan();
    if (saved && !destinationId) {
      currentPlan = saved;
      renderPlan(saved, true);
    } else showPlannerForm(destinationId);
    openDialog(plannerDialog);
  }

  function renderPlan(plan, persisted) {
    const destination = destinations[plan.destination];
    form.hidden = true;
    resultPanel.hidden = false;
    resultPanel.className = 'plan-result';
    resultPanel.innerHTML = `${icon('check')}<h3>${escapeHTML(plan.name)},<br>uma nova história espera por você.</h3><p>${persisted ? 'Seu plano está salvo neste dispositivo. Quando quiser, você pode voltar para continuar sonhando.' : 'Seu plano está pronto. Baixe o resumo para guardá-lo; o navegador não permitiu salvar automaticamente.'}</p><div class="plan-summary"><dl><dt>Destino</dt><dd>${destination.name} · ${destination.country}</dd><dt>Data desejada</dt><dd>${escapeHTML(formatDate(plan.date))}</dd><dt>Companhia</dt><dd>${companyNames[plan.company]}</dd><dt>Seu ritmo</dt><dd>${escapeHTML(plan.mood)}</dd>${plan.notes ? `<dt>Uma vontade</dt><dd>${escapeHTML(plan.notes)}</dd>` : ''}</dl></div><p>${destination.ideas[0]}<br>Deixe espaço para descobertas que ainda não estão no roteiro.</p><div class="plan-actions"><button type="button" class="button button-gold" data-download-plan>Baixar meu plano ${icon('download')}</button><button type="button" class="button button-outline" data-edit-plan>Editar escolhas ${icon('arrow')}</button></div><button type="button" class="plan-delete" data-delete-plan>Excluir este plano</button>`;
  }

  function downloadPlan() {
    if (!currentPlan) return;
    const plan = currentPlan;
    const destination = destinations[plan.destination];
    const lines = ['WANDERLY — SUA PRÓXIMA HISTÓRIA','',`Nome: ${plan.name}`,`Destino: ${destination.name} · ${destination.country}`,`Data desejada: ${formatDate(plan.date)}`,`Companhia: ${companyNames[plan.company]}`,`O que quero sentir: ${plan.mood}`,'',`Uma vontade especial: ${plan.notes || 'Deixar espaço para novas descobertas.'}`,'','IDEIAS PARA A VIAGEM',...destination.ideas.map(idea => `• ${idea}`),'','Este é um planejamento pessoal. Não representa uma reserva ou contratação de viagem.','','Colecione momentos, não coisas.'];
    const blob = new Blob(['\uFEFF' + lines.join('\n')],{type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `wanderly-plano-${plan.destination}.txt`;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    notify('Seu plano está pronto para baixar. Boa próxima história!');
  }

  function deletePlan() {
    let deleted = true;
    try { localStorage.removeItem(storageKey); } catch { deleted = false; }
    currentPlan = null;
    form.reset();
    form.hidden = false;
    resultPanel.hidden = true;
    form.elements.date.min = today();
    notify(deleted ? 'Seu plano foi excluído deste dispositivo.' : 'O navegador bloqueou o armazenamento. Use as configurações do navegador para limpar os dados.');
  }

  $('#copyright-year').textContent = String(new Date().getFullYear());
  $('#trip-date').min = today();
  $('#menu-toggle').addEventListener('click', () => {
    const expanded = $('#menu-toggle').getAttribute('aria-expanded') !== 'true';
    $('#menu-toggle').setAttribute('aria-expanded',String(expanded));
    $('#menu-toggle').setAttribute('aria-label',expanded ? 'Fechar menu' : 'Abrir menu');
    $('#main-nav').classList.toggle('is-open',expanded);
  });
  $$('#main-nav a').forEach(link => link.addEventListener('click',closeMenu));
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.matches('[data-destination]')) openDestination(button.dataset.destination);
    else if (button.matches('[data-journal]')) openJournal(button.dataset.journal);
    else if (button.matches('[data-open-story]')) openStory();
    else if (button.matches('[data-open-privacy]')) openPrivacy();
    else if (button.matches('[data-open-planner],[data-start-planning]')) openPlanner();
    else if (button.matches('[data-plan-destination]')) openPlanner(button.dataset.planDestination);
    else if (button.matches('[data-close-dialog]')) button.closest('dialog').close();
    else if (button.matches('[data-download-plan]')) downloadPlan();
    else if (button.matches('[data-edit-plan]')) showPlannerForm(currentPlan?.destination);
    else if (button.matches('[data-delete-plan],[data-delete-saved]')) deletePlan();
  });

  $$('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => {
      if (!document.querySelector('dialog[open]')) document.body.classList.remove('modal-open');
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const bounds = dialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
    });
  });

  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
  document.addEventListener('click', event => { if (!event.target.closest('.header-inner')) closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); }, {passive:true});

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const plan = {name:String(data.get('name') || '').trim().slice(0,70),destination:String(data.get('destination') || ''),date:String(data.get('date') || ''),company:String(data.get('company') || ''),mood:String(data.get('mood') || ''),notes:String(data.get('notes') || '').trim().slice(0,800)};
    if (!plan.name) { $('#planner-error').textContent = 'Conte como podemos chamar você.'; $('#traveler-name').focus(); return; }
    if (!Object.hasOwn(destinations,plan.destination) || !Object.hasOwn(companyNames,plan.company)) { $('#planner-error').textContent = 'Escolha um destino e uma companhia para continuar.'; return; }
    if (plan.date < today()) { $('#planner-error').textContent = 'Escolha a data de hoje ou uma data futura.'; $('#trip-date').focus(); return; }
    let persisted = true;
    try { localStorage.setItem(storageKey,JSON.stringify(plan)); } catch { persisted = false; }
    currentPlan = plan;
    renderPlan(plan,persisted);
    $('[data-download-plan]',resultPanel).focus();
  });

  const header = $('#site-header');
  const updateHeader = () => header.classList.toggle('is-scrolled',window.scrollY > 75);
  updateHeader();
  window.addEventListener('scroll',updateHeader,{passive:true});

  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js-enhanced');
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } });
    },{threshold:.09,rootMargin:'0px 0px 30px 0px'});
    $$('.reveal').forEach(element => revealObserver.observe(element));
    const navLinks = $$('#main-nav a:not(.nav-contact)');
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active',link.hash === `#${entry.target.id}`)); });
    },{rootMargin:'-20% 0px -45% 0px',threshold:0});
    ['jornadas','historias','destinos','sobre'].forEach(id => { const section = document.getElementById(id); if (section) sectionObserver.observe(section); });
  }
})();
