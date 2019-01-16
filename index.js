let monsters;

function fetchMonsters() {
  fetch('http://localhost:3000/monsters/?_limit=50')
      .then(response => response.json())
      .then(result => {
        monsters = result;
        render()
      });
}

const render = () => {
  renderMonInfo();
  renderMonForm();
  // postMonster()
};

const renderMonInfo = () => {
  let monContainer = document.querySelector('#monster-container');
  monsters.forEach(monster => {
    const monList = document.createElement('ul');
    monList.innerHTML = `<li><strong>${monster.name}</strong></li>
                      <li>${parseInt(monster.age)}</li>
                      <li>${monster.description}</li>`;
    monContainer.append(monList);
  })
};

const renderMonForm = () => {
  let monFormFields = document.querySelector('#create-monster');
  const monForm = document.createElement('form');

  monFormFields.append(monForm);

  monForm.innerHTML = `
    <input name="name" placeholder="Add Name"/>
    <input name="age" placeholder="Add Age"/>
    <input name="desc" placeholder="Add Description"/>
    <button id="create-monster">Create</button>`;

  const createMonButton = document.querySelector('#create-monster');
  createMonButton.addEventListener('click', (e) => {
    e.preventDefault();
    postMonster()
  })

};

const postMonster = () => {
  fetch('http://localhost:3000/monsters/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: document.querySelector('[name="name"]').value,
      age: parseInt(document.querySelector('[name="age"]').value),
      description: document.querySelector('[name="desc"]').value
    })
  }).then(() => {
        document.querySelector('[name="name"]').value = '';
        document.querySelector('[name="age"]').value = '';
        document.querySelector('[name="description"]').value = '';
        fetchMonsters();

      });
};
