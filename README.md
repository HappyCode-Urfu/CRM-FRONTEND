## Стэк
- React 
- SCSS
- TS
- Axios 
- React Router Dom 
- Recoil 
- Vite 

## Импорт для .env

```
import.meta.env.[название]
```

Открытыми являются переменные, начинающиеся с VITE_

например:
```
PASSWORD=qwerty
VITE_SOME_KEY=some-public-value
```

В данном случае в клиентский код попадет только VITE_SOME_KEY

## Структура проекта
```
.
└── .../
    ├── dist/ - Сборка проекта
    ├── .env.production
    ├── .env.development
    ├── dist/ - Сборка проекта
    ├── public/ - Каталог, в котором лежат файлы, изменяемые и перемещаемые бандлером
    └── src/ - Корневая папка с кодом
        ├── assets/ 
        ├── components/
        ├── http/
        ├── layout/
        ├── pages/
        ├── router/
        ├── store/
        ├── styles/
        ├── utils/
        ├── App.tsx
        ├── vite-env.d.ts
        └── main.tsx
```

## Команды

```
# Установить зависимости
yarn install

# Запустить React приложение
yarn dev

# Проверяет наличие ошибок во всём проекте
yarn lint 

# исправление ошибок во всём проекте
yarn lint --fix

# Собрать проект
yarn build

# Просмотр собранного проекта
yarn preview
```
