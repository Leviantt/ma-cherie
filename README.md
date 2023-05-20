# MA CHERIE

## Необходимые программы
Для развертывания CRM приложения на вашем устройстве должны быть установлены [Node.js](https://nodejs.org/ru) и [PostgreSQL](https://www.postgresql.org/download/)

## Инструкция для развертывания 

1. Склонируйте репозиторий себе с помощью [git](https://git-scm.com/downloads) или как zip
```
git clone https://github.com/Leviantt/ma-cherie.git
```
2. В PostgreSQL создайте базу данных macherie командой:
```
CREATE DATABASE macherie;
```
4. Откройте проект в VS Code
5. Скопируйте файл .env.example, переименуйту в .env и поместите туда же, где был файл .env.example
6. В файле .env поменяйте значение DATABASE_URL со своими логином и паролем для подсоединения к базе данных PostgreSQL
7. Для установки все необходимых пакетов в терминале (Ctrl + \`) запустите команду:
```
npm install
```
8. Для создания схемы базы данных  в терминале запустите команду:
```
npx prisma migrate dev --name init
```

Проект успешно развернут.
Для запуска воспользуйтесь следующими командами:
<br>
В режиме development
```
npm run dev
```
В режиме production
```
npm run build
```
Ждем...
```
npm start
```
## Примечание!
При демонстрации проекта рекомендуется запускать в режиме production, т.к. в режиме development переход между страницами может занимать около 2 секунд, а то и больше.
