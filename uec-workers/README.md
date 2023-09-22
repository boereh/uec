This Nitro application is to fetch data from uecmovies.com every Sunday at 12:00 a.m.

### cron

```json
"crons": [
    {
        "path": "/movies",
        "schedule": "0 0 * * 0"
    },
    {
        "path": "/showings",
        "schedule": "0 0 * * 0"
    }
]
```
