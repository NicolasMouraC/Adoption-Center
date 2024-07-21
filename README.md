# Adoption Center

## Instruções para rodar o projeto

### Backend
1. Certifique-se de ter o Java 17 instalado.
2. No diretório `api`, execute:
    ```
        Windows: .\mvnw.cmd spring-boot:run
        MacOS/Linux: ./mvnw spring-boot:run
    ```
3. Acesse o Swagger para documentação da API em `http://localhost:8080/swagger-ui/indexhtml#/`.

### Frontend
1. No diretório `frontend`, execute:
    ```sh
        yarn
        yarn start
    ```
2. A aplicação estará disponível em `http://localhost:3000/`.

### Banco de Dados
O projeto utiliza H2 Database. Ao iniciar o projeto, novos dados serão automaticamente criados.

### Testes
Para rodar os testes unitários, execute:
```sh
./mvnw test
