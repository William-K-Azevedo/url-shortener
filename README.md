# Encurtador de URLs API

## Objetivo do projeto:  
- Criação de uma api de ecnurtação de URLs funcional

## O que o projeto faz: 
- A API possui um end-point: api/short que recebe um URL através da propriedade 
origUrl no corpo da requisição, e cria um novo url encurtado caso o url fornecido não exista ainda no banco,
caso contrario, ele somente retorna o url encurtado já existente.


# Tecnologias utilizadas: 
## Frameworks/Linguagens:

- Express
- Node.js 
- typescript
- Jest ( teste em andamneto )
 
 ## Pacotes auxiliares:  
- Prisma (orm) 
- NanoId
