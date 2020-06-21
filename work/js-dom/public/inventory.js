(function IIFE() {

  const counter = () => {
    let count = 2;
    return () => {
      count += 1;
      return count;
    };
  };
  const nextId = counter();

  const items = {};
  items[0] = { name: 'Cherry', number: 0 };
  items[1] = { name: 'Strawberry', number: 0 };

  const addButton = document.querySelector('.outgoing button');
  const list = document.querySelector('.item-list');
  const newTask = document.querySelector('.to-add');

  const renderList = (items) => {
    list.innerHTML = Object.keys(items).map((key) => {
      const item = items[key];
      return `
        <li>
          <span data-id="${key}">${item.name}</span>
          <span data-id="${key}" class="minus">-</span>
          <span data-id="${key}" class="number">${item.number}</span>
          <span data-id="${key}" class="plus">+</span>
          <span data-id="${key}" class="delete">X</span>
        </li>
      `;
    }).join('\n');
  };

  addButton.addEventListener('click', function (event) {
    const text = newTask.value;

    items[nextId()] = { name: text, number: 0 };
    renderList(items);

    newTask.value = '';
    addButton.disabled = true;
  });

  list.addEventListener('click', function (event) {

    const id = event.target.dataset.id;

    if (event.target.classList.contains('delete')) {
      delete items[id];
      renderList(items);
    }

    if (event.target.classList.contains('plus')) {
      items[id].number += 1;
      renderList(items);
    }

    if (event.target.classList.contains('minus')) {
      if (items[id].number === 0) {
        minus.disabled = true; 
      } else {
        items[id].number -= 1;
      }
      renderList(items);
    }
  });

  newTask.addEventListener('keyup', function (event) {
    const text = event.target.value;
    addButton.disabled = !text;
  });

  addButton.disabled = true;
  renderList(items);

})();