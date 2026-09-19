let favourites = new Set();
let verbs = [];
let tenses = {};
let currentVerb = null;

/* FULL DATASET — UTF‑8 SAFE */
const data = {
  "To see": [
    { tense:"Past",englishTense:"Saw",verbRoot:"Feic",question:"An bhfaca tú?",action:"Chonaic mé",negative:"Ní fhaca mé",phonQ:"fak-ah",phonA:"khun-ick",phonN:"nee fak-ah",slug:"see-past" },
    { tense:"Present",englishTense:"See / Seeing",verbRoot:"Feic",question:"An bhfeiceann tú?",action:"Feicim",negative:"Ní fheicim",phonQ:"fek-unn",phonA:"fek-im",phonN:"nee fek-im",slug:"see-present" },
    { tense:"Future",englishTense:"Will see",verbRoot:"Feic",question:"An bhfeicfidh tú?",action:"Feicfidh mé",negative:"Ní bhfeicfidh mé",phonQ:"fek-hee",phonA:"fek-hee",phonN:"nee fek-hee",slug:"see-future" }
  ],

  "To go": [
    { tense:"Past",englishTense:"Went",verbRoot:"Téigh",question:"An ndeachaigh tú?",action:"Chuaigh mé",negative:"Ní dheachaigh mé",phonQ:"nya-kwee",phonA:"koo-ee",phonN:"nee nya-kwee",slug:"go-past" },
    { tense:"Present",englishTense:"Go / Going",verbRoot:"Téigh",question:"An dtéann tú?",action:"Téim",negative:"Ní théim",phonQ:"day-unn",phonA:"chay-im",phonN:"nee chay-im",slug:"go-present" },
    { tense:"Future",englishTense:"Will go",verbRoot:"Téigh",question:"An rachaidh tú?",action:"Rachaidh mé",negative:"Ní rachaidh mé",phonQ:"rah-hee",phonA:"rah-hee",phonN:"nee rah-hee",slug:"go-future" }
  ],

  "To come": [
    { tense:"Past",englishTense:"Came",verbRoot:"Tar",question:"Ar tháinig tú?",action:"Tháinig mé",negative:"Níor tháinig mé",phonQ:"haw-nig",phonA:"haw-nig",phonN:"nee haw-nig",slug:"come-past" },
    { tense:"Present",englishTense:"Come / Coming",verbRoot:"Tar",question:"An dtagann tú?",action:"Tagaim",negative:"Ní thagaim",phonQ:"tag-unn",phonA:"tag-im",phonN:"nee tag-im",slug:"come-present" },
    { tense:"Future",englishTense:"Will come",verbRoot:"Tar",question:"An dtiocfaidh tú?",action:"Tiocfaidh mé",negative:"Ní thiocfaidh mé",phonQ:"chuck-ee",phonA:"chuck-ee",phonN:"nee chuck-ee",slug:"come-future" }
  ],

  "To get": [
    { tense:"Past",englishTense:"Got",verbRoot:"Faigh",question:"An bhfuair tú?",action:"Fuair mé",negative:"Ní bhfuair mé",phonQ:"foor",phonA:"foor",phonN:"nee foor",slug:"get-past" },
    { tense:"Present",englishTense:"Get / Getting",verbRoot:"Faigh",question:"An bhfaigheann tú?",action:"Faighim",negative:"Ní fhaighim",phonQ:"fy-unn",phonA:"fy-im",phonN:"nee fy-im",slug:"get-present" },
    { tense:"Future",englishTense:"Will get",verbRoot:"Faigh",question:"An bhfaighidh tú?",action:"Gheobhaidh mé",negative:"Ní gheobhaidh mé",phonQ:"yo-vee",phonA:"yo-vee",phonN:"nee yo-vee",slug:"get-future" }
  ],

  "To do": [
    { tense:"Past",englishTense:"Did",verbRoot:"Déan",question:"An ndearna tú?",action:"Rinne mé",negative:"Ní dhearna mé",phonQ:"nyar-nah",phonA:"rin-yeh",phonN:"nee nyar-nah",slug:"do-past" },
    { tense:"Present",englishTense:"Do / Doing",verbRoot:"Déan",question:"An ndéanann tú?",action:"Déanaim",negative:"Ní dhéanaim",phonQ:"day-nun",phonA:"day-nim",phonN:"nee day-nim",slug:"do-present" },
    { tense:"Future",englishTense:"Will do",verbRoot:"Déan",question:"An ndéanfaidh tú?",action:"Déanfaidh mé",negative:"Ní dhéanfaidh mé",phonQ:"day-hee",phonA:"day-hee",phonN:"nee day-hee",slug:"do-future" }
  ],

  "To say": [
    { tense:"Past",englishTense:"Said",verbRoot:"Abair",question:"An ndúirt tú?",action:"Dúirt mé",negative:"Ní dúirt mé",phonQ:"doort",phonA:"doort",phonN:"nee doort",slug:"say-past" },
    { tense:"Present",englishTense:"Say / Saying",verbRoot:"Abair",question:"An ndeir tú?",action:"Deirim",negative:"Ní deirim",phonQ:"der",phonA:"der-im",phonN:"nee der-im",slug:"say-present" },
    { tense:"Future",englishTense:"Will say",verbRoot:"Abair",question:"An ndéarfaidh tú?",action:"Déarfaidh mé",negative:"Ní ndéarfaidh mé",phonQ:"dare-hee",phonA:"dare-hee",phonN:"nee dare-hee",slug:"say-future" }
  ],

  "To be": [
    { tense:"Past",englishTense:"Was / Were",verbRoot:"Bí",question:"Ar raibh tú?",action:"Bhí mé",negative:"Ní raibh mé",phonQ:"ar-rev",phonA:"vee",phonN:"nee rev",slug:"be-past" },
    { tense:"Present",englishTense:"Am / Is / Are",verbRoot:"Bí",question:"An bhfuil tú?",action:"Tá mé",negative:"Níl mé",phonQ:"ah-will",phonA:"tawh",phonN:"neel",slug:"be-present" },
    { tense:"Future",englishTense:"Will be",verbRoot:"Bí",question:"An mbeidh tú?",action:"Beidh mé",negative:"Ní bheidh mé",phonQ:"bay",phonA:"bay",phonN:"nee bay",slug:"be-future" }
  ],

  "To hear": [
    { tense:"Past",englishTense:"Heard",verbRoot:"Clois",question:"Ar chuala tú?",action:"Chuala mé",negative:"Níor chuala mé",phonQ:"koo-la",phonA:"koo-la",phonN:"nee koo-la",slug:"hear-past" },
    { tense:"Present",englishTense:"Hear / Hearing",verbRoot:"Clois",question:"An gcloiseann tú?",action:"Cloisim",negative:"Ní chloisim",phonQ:"closh-unn",phonA:"closh-im",phonN:"nee closh-im",slug:"hear-present" },
    { tense:"Future",englishTense:"Will hear",verbRoot:"Clois",question:"An gcloisfidh tú?",action:"Cloisfidh mé",negative:"Ní chloisfidh mé",phonQ:"closh-hee",phonA:"closh-hee",phonN:"nee closh-hee",slug:"hear-future" }
  ],

  "To eat": [
    { tense:"Past",englishTense:"Ate",verbRoot:"Ith",question:"Ar ith tú?",action:"D'ith mé",negative:"Níor ith mé",phonQ:"ith",phonA:"ith",phonN:"nee ith",slug:"eat-past" },
    { tense:"Present",englishTense:"Eat / Eating",verbRoot:"Ith",question:"An itheann tú?",action:"Ithim",negative:"Ní ithim",phonQ:"ih-unn",phonA:"ith-im",phonN:"nee ith-im",slug:"eat-present" },
    { tense:"Future",englishTense:"Will eat",verbRoot:"Ith",question:"An íosfaidh tú?",action:"Íosfaidh mé",negative:"Ní íosfaidh mé",phonQ:"ee-sig",phonA:"ee-sig",phonN:"nee ee-sig",slug:"eat-future" }
  ],

  "To give": [
    { tense:"Past",englishTense:"Gave",verbRoot:"Tabhair",question:"Ar thug tú?",action:"Thug mé",negative:"Níor thug mé",phonQ:"hug",phonA:"hug",phonN:"nee hug",slug:"give-past" },
    { tense:"Present",englishTense:"Give / Giving",verbRoot:"Tabhair",question:"An dtugann tú?",action:"Tugaim",negative:"Ní thugaim",phonQ:"tug-unn",phonA:"tug-im",phonN:"nee tug-im",slug:"give-present" },
    { tense:"Future",englishTense:"Will give",verbRoot:"Tabhair",question:"An dtabharfaidh tú?",action:"Tabharfaidh mé",negative:"Ní thabharfaidh mé",phonQ:"toe-ree",phonA:"toe-ree",phonN:"nee toe-ree",slug:"give-future" }
  ]
};

verbs = Object.keys(data);
tenses = data;

/* Render verb list */
function renderVerbList() {
  currentVerb = null;
  const container = document.getElementById('mainContainer');
  container.innerHTML = '';

  verbs.forEach(v => {
    const card = document.createElement('div');
    card.className = 'verb-card';
    card.textContent = v;
    card.onclick = () => showVerb(v);
    container.appendChild(card);
  });
}

/* Tense class */
function getTenseClass(tense) {
  return tense.toLowerCase();
}

/* Show verb */
function showVerb(v) {
  currentVerb = v;
  const container = document.getElementById('mainContainer');
  container.innerHTML = '';

  const backBtn = document.createElement('button');
  backBtn.className = 'back-btn';
  backBtn.textContent = 'Return to Verb List';
  backBtn.onclick = renderVerbList;
  container.appendChild(backBtn);

  const row = document.createElement('div');
  row.className = 'tense-row';

  tenses[v].forEach(t => {
    const card = document.createElement('div');
    card.className = 'tense-card';

    let revealed = false;

    function renderContent() {
      card.innerHTML = `
        <span class="tense-label ${getTenseClass(t.tense)}">${t.tense}</span><br>
        <strong>${t.englishTense}</strong><br><br>

        ${
          revealed
            ? `
              <em>${t.verbRoot}</em><br><br>

              <strong>Question:</strong> ${t.question}<br>
              <em>${t.phonQ}</em><br><br>

              <strong>Action:</strong> ${t.action}<br>
              <em>${t.phonA}</em><br><br>

              <strong>Negative:</strong> ${t.negative}<br>
              <em>${t.phonN}</em><br><br>

              <button class="audio-btn" onclick="event.stopPropagation(); playAudio('${t.slug}-audio')">🔊</button>
              <button class="fav-btn" onclick="event.stopPropagation(); toggleFavourite('${t.slug}')">
                ${favourites.has(t.slug) ? '★' : '☆'}
              </button>
              <audio id="${t.slug}-audio" src="${t.slug}.mpa"></audio>
            `
            : `Tap to reveal`
        }
      `;
    }

    card.onclick = () => {
      revealed = !revealed;
      renderContent();
    };

    renderContent();
    row.appendChild(card);
  });

  container.appendChild(row);
}

/* Shuffle */
function shuffleVerbs() {
  verbs.sort(() => Math.random() - 0.5);
  renderVerbList();
}

/* Dark mode */
function toggleDarkMode() {
  document.body.classList.toggle('dark');
}


/* Favourites */
function toggleFavourite(slug) {
  if (favourites.has(slug)) favourites.delete(slug);
  else favourites.add(slug);

  if (currentVerb) showVerb(currentVerb);
  else renderVerbList();
}

/* Audio */
function playAudio(id) {
  const audio = document.getElementById(id);
  if (audio) audio.play();
}

/* Search */
document.getElementById('searchInput').addEventListener('input', () => {
  const q = document.getElementById('searchInput').value.toLowerCase();
  const container = document.getElementById('mainContainer');
  container.innerHTML = '';

  verbs
    .filter(v => v.toLowerCase().includes(q))
    .forEach(v => {
      const card = document.createElement('div');
      card.className = 'verb-card';
      card.textContent = v;
      card.onclick = () => showVerb(v);
      container.appendChild(card);
    });
});

/* Init */
renderVerbList();


