var buttonAtualizar = document.getElementById('BtnAtualizar');
var usuario = document.getElementById('usuario');
var id = document.getElementById('id');
var titulo = document.getElementById('titulo');
var corpo = document.getElementById('corpo');
const Id = numeroAleatorio();

buttonAtualizar.addEventListener('click', function () {
  if (id.value != "") {
    atualizar();
  } else {
    Gerar();
  }

});

async function atualizar() {
  const url = `https://jsonplaceholder.typicode.com/posts/` + Id;
  fetch(url, {
    method: 'PUT',
    body: JSON.stringify({
      id: id.value,
      title: titulo.value,
      body: corpo.value,
      userId: usuario.value,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

}

function numeroAleatorio() {
  return Math.floor(Math.random() * 100) + 1;
}


async function Gerar() {

  const url = `https://jsonplaceholder.typicode.com/posts/` + Id;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data)
  usuario.value = data.userId;
  id.value = data.id;
  titulo.value = data.title;
  corpo.value = data.body;
}

