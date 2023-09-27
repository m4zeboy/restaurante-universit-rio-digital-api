# Restaurante Universitário Digial - API

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