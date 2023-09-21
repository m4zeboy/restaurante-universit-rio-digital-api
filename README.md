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
- [ ] recharge wallet
- [ ] purchase ticket
- [ ] validate ticket

### Unitary tests

- [x] it should be able to register
- [x] it should be able to register a student
- [x] it should be able to register a university server
- [x] it should be hash password upon registration
- [x] it should not be able to register with same passport twice
- [x] it sould be able to create student
- [x] it should not be able to create student with same RGA twice
- [x] it should be able to create university server
- [x] it should not be able to create university server with same SIAPE twice
- [x] it should be able to authenticate
- [x] it should not be able to authenticate with invalid credentials
- [x] it should be able create dishes
- [x] it should eb able to get dish of the day
- [x] it should be able to create a wallet
- [ ] it should not be able to create a wallet with non-existent userId
- [ ] it should not be able to create a wallet with same userId twice
- [x] it should be able to create a wallet recharge
- [x] it should not be able to create a wallet with amount less than or equal to zero
- [x] it should update the wallet balance after a wallet recharge
- [ ] purchase ticket
- [ ] list purchased tickets
- [ ] validate ticket


## Factories

- [x] register
- [ ] create student
- [ ] create university server
- [ ] authenticate
- [ ] create dishes
- [ ] get dish of the day
- [ ] recharge wallet
- [ ] purchase ticket
- [ ] validate ticket


## Controllers

- [ ] Register
- [ ] Authenticate
- [ ] get dish of the day
- [ ] recharge wallet
- [ ] purchase ticket
- [ ] validate ticket

### End to End tests

- [ ] Register
- [ ] Authenticate
- [ ] get dish of the day
- [ ] recharge wallet
- [ ] purchase ticket
- [ ] validate ticket
