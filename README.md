# Challenge API

API desenvolvida para gerenciamento de clientes e suas listas de produtos favoritos. 

## Principais Tecnologias
- node: 12.15.0
- mongodb: 4.2.3
- express: 4.16.1
- mocha: 7.0.1
- supertest: 4.0.2
- Docker

## Executar o projeto

### Variáveis de ambiente

Onde estarão informações de conexão com o banco de dados e porta da aplicação. Os arquivos estão na pasta `./dotenv` separadas por seus respectivos ambiente. O módulo `./helpers/loadEnv` fará o carregamento utilizando a lib **dotenv** com base na variavel `NODE_ENV` passada na inicialização da aplicação.

### Via Docker Compose

Rodando o comando `docker-compose up --build` iniciará a imagem node e do banco Mongo. A variavel `NODE_ENV` está com o valor **develop** no arquivo `Dockerfile` para a aplicação apontar para o banco mongo do container.

## Executando local

Rodar os comandos abaixo para baixar as dependências e rodar o servidor.
``
npm install && 
npm start
``
## Testes e2e

Os testes farão a criação de um data base onde os dados serão persistidos e depois removidos ao final dos testes. Executar o comando abaixo:
``
npm test
``