```
docker compose up
yarn run seed
yarn run test:e2e
```

Swagger API - http://localhost:5000/v1/docs


## Technical task

Дано дизайн настройки відслідковування слів в постах.

Відслідковування діляться на 2 частини, перша конфіг, друга парсер.

Потрібно розробити апі для роботи з конфігом. Добавлення, редагування, відображення, видалення і зміни стану відслідковувань.

Забезпечити можливість створення конфіга відслідковування.
Відслідковування складається з слова і налаштувань “де шукати”.
Відслідковування може бути в одному із станів: Активний, Призупинено, Заблоковано.

Для виводу списку відслідковувань потрібно реалізувати:
- фільтр по стану відслідковування
- сортування по: даті створення(asc, desc)
- для посторінкової навігації: skip, limit

Забезпечити можливість редагування відслідковування.

Забезпечити можливість зміни стану відслідковування.

Забезпечити можливість видалення відслідковування.

Покрити тестами добавлення, вивід і редагування.

Очікується створення проекту на nest.js, тести на jest, моделі на @nestjs/mongoose

---

The design of setting the tracking of words in posts is given.

Traces are divided into 2 parts, the first config, the second parser.

It is necessary to develop an api for working with config. Adding, editing, displaying, deleting and changing the status of tracking.

Provide the ability to create a tracking config.
Tracking consists of the word and settings "where to search".
Tracking can be in one of the following states: Active, Suspended, Blocked.

To display the tracking list, you need to implement:
filter by tracking status
sort by: creation date(asc, desc)
for page-by-page navigation: skip, limit

Provide the ability to edit tracking.

Provide the ability to change the tracking status.

Provide the ability to remove tracking.

Cover addition, output and editing tests.


The project is expected to be created on nest.js, tests on jest, models on @nestjs/mongoose
