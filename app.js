const categories = [
  ['อาหาร','▣'],['ยา','✚'],['ผลิตภัณฑ์สมุนไพร','❀'],
  ['เครื่องสำอาง','✧'],['วัตถุอันตราย','◇'],['วัตถุเสพติด','◈'],
  ['เครื่องมือแพทย์','⚕'],['สถานพยาบาล','⌂'],['สถานประกอบการเพื่อสุขภาพ','♧']
];
const grid = document.querySelector('#grid');
const detail = document.querySelector('#details');
const search = document.querySelector('#search');
function render(query = '') {
  const matches = categories.map(([name, icon], index) => ({name, icon, index})).filter(item => item.name.includes(query.trim()));
  grid.replaceChildren(...matches.map(({name, icon, index}) => {
    const card = document.createElement('button');
    card.className = 'card';
    card.type = 'button';
    card.setAttribute('aria-label', `เปิดรายละเอียด ${name}`);
    const number = document.createElement('span'); number.className = 'card-num'; number.textContent = String(index + 1).padStart(2, '0');
    const symbol = document.createElement('span'); symbol.className = 'card-symbol'; symbol.setAttribute('aria-hidden','true'); symbol.textContent = icon;
    const title = document.createElement('strong'); title.textContent = name;
    const sub = document.createElement('small'); sub.textContent = 'ขั้นตอน · แบบฟอร์ม · คู่มือ';
    const arrow = document.createElement('span'); arrow.className = 'card-arrow'; arrow.textContent = 'ดูรายละเอียด ↗';
    card.append(number, symbol, title, sub, arrow);
    card.addEventListener('click', () => { document.querySelector('#detailTitle').textContent = name; detail.hidden = false; detail.scrollIntoView({behavior:'smooth',block:'center'}); });
    return card;
  }));
  document.querySelector('#empty').hidden = matches.length > 0;
}
search.addEventListener('input', event => render(event.target.value));
document.querySelector('#closeDetail').addEventListener('click', () => { detail.hidden = true; document.querySelector('#categories').scrollIntoView({behavior:'smooth'}); });
render();
