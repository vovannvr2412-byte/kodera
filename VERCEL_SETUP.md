# Настройка Kodera на Vercel

## Параметры проекта

- Framework Preset: `Other`
- Root Directory: корень репозитория
- Build Command: оставить пустым
- Output Directory: оставить пустым

Каталог `api` должен находиться в корне проекта: Vercel автоматически опубликует `api/lead.js` как функцию `/api/lead`.

## Отправка заявок через Resend

1. Подключить Resend в Vercel Marketplace либо создать ключ с правом отправки в кабинете Resend.
2. В Vercel открыть **Project → Settings → Environment Variables**.
3. Добавить переменные для Production и Preview:

| Переменная | Значение |
| --- | --- |
| `RESEND_API_KEY` | ключ Resend вида `re_...` |
| `LEAD_TO_EMAIL` | `volodimirnedosekin@yandex.ru` |
| `LEAD_FROM_EMAIL` | `Kodera <onboarding@resend.dev>` |

4. Выполнить Redeploy последнего деплоя.

Тестовый отправитель `onboarding@resend.dev` позволяет отправлять письма только на email владельца аккаунта Resend. Для отправки без этого ограничения нужно подтвердить собственный домен в Resend и заменить `LEAD_FROM_EMAIL`, например на `Kodera <site@ваш-домен.ru>`.

API-ключ нельзя добавлять в репозиторий, HTML или клиентский JavaScript.
