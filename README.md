# Restaurante Universitário Digial - API

## RF

- [ ] RF-01, Manter cadastro de usuários, Deve ser possível se cadastrar.
- [ ] RF-02, Autenticação, Deve ser possível se autenticar.
- [ ] RF-03, Manter cadastro de pratos, Deve ser possível se autenticar.
- [ ] RF-04, Obter o prato do dia, Deve ser possível obter o prato do dia.
- [ ] RF-05, Colocar crédito na carteira, Deve ser possível colocar crédito na carteira.
- [ ] RF-06, Comprar ficha, Deve ser possível comprar uma ficha.
- [ ] RF-07, Validar ficha, Deve ser possível validar uma ficha.
- [ ] RF-08, Listar fichas compradas, Deve ser possível obter a lista de fichas compradas identificadas pelo usuário..

## RNF

- [ ] RNF-01, Segurança, O sistema deve ser protegido por login e senha.
- [ ] RNF-02, Segurança, A senha do usuário deve ser criptografada.
- [ ] RNF-03, Integração, O cadastro de estudantes e servidores da universidade deve ser integrado com o Passaporte da UFMS.
- [ ] RNF-04, Conectividade, Deve haver disponibilidade de conexão com a internet para o sistema funcionar corretamente.
- [ ] RNF-05, Acessibilidade, Usuários comuns devem conseguir usufruir do restaurante sem a necessidade do celular.

## RN

- [ ] RN-01, Controle de Acesso, Somente administradores devem ser capazes de criar pratos.
- [ ] RN-02, Controle de Acesso, Somente administradores devem ser capazes de validar fichas.
- [x] RN-03, Controle de Acesso, Somente administradores devem ser capazes de comprar fichas sem possuírem saldo na carteira.
- [ ] RN-04, Verificar saldo suficiente, Usuários comuns, servidores da universidade e estudantes só podem comprar uma ficha se possuírem saldo suficiente em suas carteiras.
- [ ] RN-05, Verificar elegibilidade ao desconto, Somente estudantes que possuem o CADÚnico devem ser capazes de pagar menos ao comprar uma ficha.



## Use cases

- [x] register
- [x] create student
- [x] create university server
- [x] authenticate
- [x] create dishes
- [x] get dish of the day
- [x] create wallet
- [x] get wallet balance
- [x] recharge wallet
- [x] purchase ticket
- [x] list purchased tickets 
- [x] validate ticket
  - [x] define a `findById` method for the TicketsRepository
  - [x] implement a `findById` method for the InMemoryTicketsRepository
  - [x] define a `save` method for the TicketsRepository
  - [x] implement a `save` method for the InMemoryTicketsRepository
  - [x] create a error class for 'The ticket has already been validated.'


### Unitary tests

**register**

- [x] it should be able to register
- [x] it should be able to register a student
- [x] it should be able to register a university server
- [x] it should be hash password upon registration
- [x] it should not be able to register with same passport twice

**create student**

- [x] it sould be able to create student
- [x] it should not be able to create student with same RGA twice

**create university server**

- [x] it should be able to create university server
- [x] it should not be able to create university server with same SIAPE twice

**authenticate**

- [x] it should be able to authenticate
- [x] it should not be able to authenticate with invalid credentials

**create dishes**

- [x] it should be able create dishes
- [ ] it should not be able to create a dish with the same date twice

**get dish of the day**

- [x] it should be able to get dish of the day

**create wallet**

- [x] it should be able to create a wallet
- [x] it should not be able to create a wallet with non-existent userId
- [x] it should not be able to create a wallet with same userId twice

**recharge wallet**

- [x] it should be able to create a wallet recharge
- [x] it should not be able to create a wallet with amount less than or equal to zero
- [x] it should update the wallet balance after a wallet recharge

**purchase ticket**

- [x] it should be able to purchase ticket
- [x] it should not be able to purchase a ticket with insufficient balance
- [x] it should update the wallet balance after a ticket purchase
- [x] it should be able for a student eligible for the scholarship to pay less

**list purchased tickets**

- [x] it should be able to list purchased tickets
- [ ] it should be able to list paginated purchased tickets

**validate ticket**

- [x] it should be able to validate ticket
- [x] it should not be able to validate a non-existent ticket
- [x] it should not be able to validate a ticket twice


## Prisma Repositories

- [x] users
  - [x] create
  - [x] findByPassport
  - [x] findById
- [x] students
  - [x] create
  - [x] findByRga
  - [x] findByPassport
- [x] university servers
  - [x] create
  - [x] findBySiape
  - [x] findByPassport
- [x] dishes
  - [x] create
  - [x] findByDate
- [x] wallets
  - [x] create
  - [x] updateBalance
  - [x] findByUserId
- [x] wallet recharges
  - [x] create
- [x] tickets
  - [x] create
  - [x] findById
  - [x] findManyByWalletId
  - [x] save




## Factories

- [x] register
- [x] create student
- [x] create university server
- [x] authenticate
- [x] create dishes
- [x] get dish of the day
- [x] create wallet
- [x] get wallet balance
- [x] recharge wallet
- [x] purchase ticket
- [x] list purchased ticket
- [x] validate ticket


## Controllers

- [x] Register
  - [x] register use case
  - [x] create walelt use case
- [x] Authenticate
- [x] create dish
- [x] get dish of the day
- [x] recharge wallet
- [x] get wallet balance
- [x] purchase ticket
- [x] validate ticket

### End to End tests

- [ ] Register
- [ ] Authenticate
- [ ] get dish of the day
- [ ] recharge wallet
- [ ] purchase ticket
- [ ] validate ticket


## TODO

- [x] add role based acces control on controllers
  - [x] register: no required role
  - [x] authenticate: no required role
  - [x] create student: admin
  - [x] create university server: admin
  - [x] create dish: admin
  - [x] get dish of the day: all roles
  - [x] recharge: all roles
  - [x] purchase: all roles
  - [] validate: admin