# Projeto SOA (backend + frontend)

## Como rodar a aplicação

1. Certifique-se de ter o Docker e o Docker Compose instalados.

2. No terminal, na raiz do projeto (onde está o `docker-compose.yml`), rode:

```bash
docker compose up --build
```

3. Aguarde os containers buildarem e iniciarem.

---

## Acessando a aplicação

- **Frontend:**  
  Abra no navegador: [http://localhost:5173/home](http://localhost:5173/home)

- **Backend:**  
  A API estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## Comandos úteis

- Parar a aplicação:  
  ```bash
  docker compose down
  ```

- Rodar em modo detach (em background):  
  ```bash
  docker compose up --build -d
  ```

---

## Observações

- O modo de desenvolvimento está configurado com hot reload para backend (NestJS) e frontend (React + Vite).
- Volumes estão configurados para refletir alterações locais instantaneamente dentro dos containers.







---

descobrir Evolução do ranking
#GET - https://servicodados.ibge.gov.br/api/v2/censos/nomes/{nome}

exemplo: 
https://servicodados.ibge.gov.br/api/v2/censos/nomes/jesus

result: 
[{"nome":"JESUS","sexo":null,"localidade":"BR","res":[{"periodo":"1930[","frequencia":723},{"periodo":"[1930,1940[","frequencia":2386},{"periodo":"[1940,1950[","frequencia":5011},{"periodo":"[1950,1960[","frequencia":7976},{"periodo":"[1960,1970[","frequencia":7912},{"periodo":"[1970,1980[","frequencia":4953},{"periodo":"[1980,1990[","frequencia":3039},{"periodo":"[1990,2000[","frequencia":1814},{"periodo":"[2000,2010[","frequencia":1960}]}]

Evolução do ranking de nomes em uma localidade
#GET - https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking?localidade=3300100 //localidade

result:

[{"localidade":"3300100","sexo":null,"res":[{"nome":"MARIA","frequencia":7855,"ranking":1},{"nome":"JOSE","frequencia":3732,"ranking":2},{"nome":"ANA","frequencia":3386,"ranking":3},{"nome":"JOAO","frequencia":2662,"ranking":4},{"nome":"CARLOS","frequencia":1843,"ranking":5},{"nome":"PAULO","frequencia":1598,"ranking":6},{"nome":"ANTONIO","frequencia":1583,"ranking":7},{"nome":"PEDRO","frequencia":1206,"ranking":8},{"nome":"MARCOS","frequencia":1143,"ranking":9},{"nome":"LUIS","frequencia":1119,"ranking":10},{"nome":"LUCAS","frequencia":1064,"ranking":11},{"nome":"LUIZ","frequencia":1033,"ranking":12},{"nome":"GABRIEL","frequencia":921,"ranking":13},{"nome":"JORGE","frequencia":897,"ranking":14},{"nome":"MARCELO","frequencia":841,"ranking":15},{"nome":"FRANCISCO","frequencia":812,"ranking":16},{"nome":"RAFAEL","frequencia":730,"ranking":17},{"nome":"DANIEL","frequencia":689,"ranking":18},{"nome":"BRUNO","frequencia":670,"ranking":19},{"nome":"FABIO","frequencia":628,"ranking":20}]}]


Comparação de dois nomes ao longo do tempo (nacional)
GET - 
