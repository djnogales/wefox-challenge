<p align="center">
  <a href="https://www.wefox.com/en-de">
    <img src="https://www.jobaidukraine.com/wp-content/uploads/job-manager-uploads/company_logo/2022/03/logo-37.jpg" width="150px" height="150px"/>
  </a>
</p>

<h1 align="center">
  🔶  Wefox Node.js Challenge
</h1>

<a  href="https://github.com/djnogales/wefox-challenge/actions"><img src="https://github.com/djnogales/wefox-challenge/workflows/Node%20CI/badge.svg" alt="CI pipeline status" align="center" /></a>

<p align="center">
  Node.js challenge from Wefox using <strong>TypeScript and following Domain Driven Design with hexagonal architecture, TDD and SOLID principles</strong>.
  <br />
  <br />
</p>

## 🚀 Setup

### 🔥  Challenge Application execution
1. Execute `make challenge`.
2. Once the application is up, you'll have these different endpoints:
    1. **POST** `http://localhost:3000/user`
    2. **POST** `http://localhost:3000/user/auth`
    3. **POST** `http://localhost:3000/address/validate`
    4. **GET** `http://localhost:3000/weather`

### ✅  Tests execution
Execute `make test`.

## Project explanation
This project is decoupled from any framework, but it has an implementation for **Express**.

### 🗃 Bounded Contexts
The project only has a bounded context named Challenge that has inside all the modules related with it.

### 🏛 Hexagonal Architecture
This project follows **Hexagonal Architecture**. For that reason the project has been structured as follows:
```scala
$ tree -L 5 src
src
├── Contexts
│   ├── Challenge // Bounded Context
│   │   ├── Address
│   │   │   ├── application
│   │   │   │   └── AddressValidator.ts // Use case
│   │   │   ├── domain
│   │   │   │   ├── Address.ts // Domain entity (Aggregate root)
│   │   │   │   └── AddressRepository.ts // Repository pattern
│   │   │   └── infrastructure
│   │   │       ├── NominatimAddressRepository.ts // Repository impl
│   │   │       └── RedisCacheAddressRepository.ts
│   │   ├── Shared // Shared resources between the same Bounded Context
│   │   │   └── infrastructure
│   │   │       ├── AuthConfigFactory.ts
│   │   │       ├── MongoConfigFactory.ts
│   │   │       ├── RedisConfigFactory.ts
│   │   │       └── config
│   │   ├── User
│   │   │   ├── application
│   │   │   │   ├── UserLogin.ts
│   │   │   │   └── UserRegister.ts
│   │   │   ├── domain
│   │   │   │   ├── InvalidUserCredentials.ts // Domain exception
│   │   │   │   ├── User.ts
│   │   │   │   ├── UserAlreadyExists.ts
│   │   │   │   └── UserRepository.ts
│   │   │   └── infrastructure
│   │   │       ├── MongoUserRepository.ts
│   │   │       └── MongoUserSchema.ts
│   │   └── Weather
│   │       ├── application
│   │       │   └── WeatherFinder.ts
│   │       ├── domain
│   │       │   ├── InvalidLatitude.ts
│   │       │   ├── InvalidLongitude.ts
│   │       │   ├── Weather.ts
│   │       │   ├── WeatherLatitude.ts // Value object
│   │       │   ├── WeatherLongitude.ts // Value object
│   │       │   └── WeatherRepository.ts
│   │       └── infrastructure
│   │           ├── RedisCacheWeatherRepository.ts
│   │           └── SevenTimerWeatherRepository.ts
│   └── Shared // Shared Kernel: Common domain and infrastructure shared between the Bounded Contexts
│       ├── domain
│       │   ├── Logger.ts
│       │   └── Nullable.ts
│       └── infrastructure
│           ├── AuthConfig.ts
│           ├── MongoConfig.ts
│           ├── RedisClientFactory.ts
│           ├── RedisClientType.ts
│           ├── RedisConfig.ts
│           └── WinstonLogger.ts
```


