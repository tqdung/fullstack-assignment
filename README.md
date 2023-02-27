<!-- Project title -->
<div align="center">
  <h3 align="center">Fullstack Assignment</h3>
  <p>tqdungit97@gmail.com</p>
</div>

# Table of contents

1. [ General Info. ](#general)
2. [ Technical Spec. ](#techical)
3. [ Project Structure. ](#project-structure)
4. [ Getting Started. ](#getting-started)

<a name="general"></a>

## 1. General Info

That project is an demo for a CRUD application named Cafe manager, which include Employee and Cafe. One Employee just only work for one Cafe and one Cafe can have many Employees

<a name="techical"></a>

## 2. Technical Spec

<strong>Frontend:</strong>
| Dependency | Link |
| ------ | ------ |
| ![React.js] | https://reactjs.org/ |
| ![React Router] | https://reactrouter.com/en/main |
| ![Redux Toolkit] | https://redux-toolkit.js.org/ |
| ![Ant Design] | https://ant.design/ |
| ![TypeScript] | https://www.typescriptlang.org/ |
| ![Jest] | https://jestjs.io/ |
| Another | Create React App: https://create-react-app.dev/ <br> Create React App config override: https://craco.js.org/ <br> Lodash: https://lodash.com/ <br> Axios: https://axios-http.com/docs/intro <br> AG-Grid: https://www.ag-grid.com/|
<br>

<strong>Backend:</strong>
| Dependency | Link |
| ------ | ------ |
| ![Express.js	] | https://expressjs.com/ |
| ![Sequelize] | https://sequelize.org/ |
| ![MySQL] | https://www.mysql.com/ |
| ![Docker] | https://www.docker.com/ |

<a name="project-structure"></a>

## 3. Project Structure

### Folder tree

```sh
  client #contain Frontend code
    | api
      # contain all APIs
    | components
      # contain all components
    | models
        #contain all models, interfaces, enums, constants...
    | pages
      # contain all page components
    | redux
    | routes
      #(contain all routes)
    | utils
      #(contain shared logics what`s use in more than 3 places)
  craco.config.js # customize webpack config
  package.json
  README.md
  tsconfig

  server #contain Backend code
    | bin
      # startup server
    | config
      # contain configuration for database
    | controllers
        # handle business logic (work directly with database)
    | models
      # contain Database models
    | public
      # frontend build files
    | routes
      # routing (API's endpoints)
    | seeders
      # data seeding (data example)
  Dockerfile
  docker-compose.yaml
```

<a name="getting-started"></a>

## 4. Getting Started

### Prerequisites

```sh
  npm install npm@latest -g
  npm install pnpm@latest -g
  Node version >= 18
  MySQL version 8.0.28
  Docker
```

### Installation

1. Clone the repo

```sh
  https://github.com/tqdung/fullstack-assignment.git
```

2. Install NPM packages

```sh
  pnpm install
  cd client
    pnpm install
  cd server
    pnpm install
```

### Start development

```sh
  cd server
  pnpm install
  pnpm start

  cd client
  pnpm install
  pnpm start
```

## Build production

```sh
  docker-compose -f docker-compose.yml up --build

  open http://localhost:3000
```

[React.js]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React Router]: https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white
[Redux Toolkit]: https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white
[Ant Design]: https://img.shields.io/badge/-AntDesign-%230170FE?style=for-the-badge&logo=ant-design&logoColor=white
[TypeScript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[Jest]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Sequelize]: https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white
[MySQL]: https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
