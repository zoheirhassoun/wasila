# Neon كبديل لـ Supabase

يمكنك استخدام **Neon** (Postgres serverless) للمصادقة وقاعدة البيانات بدلاً من Supabase.

## إعداد Neon

1. أنشئ مشروعاً في [Neon](https://neon.tech) واحصل على **Connection string**.
2. نفّذ الـ migration في لوحة Neon (SQL Editor):
   - انسخ محتوى `migrations/001_users.sql` ونفّذه.
3. في **Netlify** (أو `.env` محلياً للدوال):
   - `NEON_DATABASE_URL` أو `DATABASE_URL`: connection string من Neon.
   - `AUTH_JWT_SECRET`: سِرّ قوي (32 حرفاً على الأقل) لتوقيع JWT.
4. في مشروعك (متغيرات تُعرض للفرونت):
   - `VITE_AUTH_BACKEND=neon`

## تعيين أول مدير (أدمن)

من لوحة Neon (SQL Editor):

```sql
update users set role = 'admin' where email = 'your-admin@example.com';
```

## مقارنة سريعة

|            | Supabase                    | Neon                          |
|------------|-----------------------------|-------------------------------|
| المصادقة   | Supabase Auth (جاهز)        | عبر دوال Netlify + JWT        |
| قاعدة البيانات | Supabase Postgres + RLS   | Neon Postgres                 |
| المتغيرات  | VITE_SUPABASE_*             | VITE_AUTH_BACKEND=neon + NEON_DATABASE_URL + AUTH_JWT_SECRET |
