import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const pastaAtual = path.dirname(fileURLToPath(import.meta.url));

app.set('view engine', 'ejs');
app.set('views', path.join(pastaAtual, 'views'));

const times = [
  { id: 1, nome: 'Grêmio', estadio: 'Arena', cidade: 'Porto Alegre' },
  { id: 2, nome: 'Internacional', estadio: 'Beira-Rio', cidade: 'Porto Alegre' },
  { id: 3, nome: 'Juventude', estadio: 'Alfredo Jaconi', cidade: 'Caxias do Sul' },
  { id: 4, nome: 'Brasil de Pelotas', estadio: 'Bento Freitas', cidade: 'Pelotas' },
  { id: 5, nome: 'Chapecoense', estadio: 'Heriberto Hülse', cidade: 'Chapecó' },
  { id: 6, nome: 'Criciúma', estadio: 'Arena Condá', cidade: 'Criciúma' }
];

app.get('/', (req, res) => {
  res.render('index', { mensagem: 'Bem-vindo ao catálogo de times!' });
});

app.get('/times', (req, res) => {
  res.render('times', { times });
});

app.get('/times/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id < 1) {
    return res.status(404).send('Time não encontrado.');
  }

  const time = times.find((time) => time.id === id);

  if (!time) {
    return res.status(404).send('Time não encontrado.');
  }

  res.render('detalhe', { time });
});

app.listen(3000, () => {
  console.log('Servidor disponível em http://localhost:3000');
});
