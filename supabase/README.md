# Supabase لوسيلة

يمكنك استخدام **Neon** بدلاً من Supabase — انظر [../neon/README.md](../neon/README.md).

## إعداد المشروع

1. أنشئ مشروعاً في [Supabase](https://supabase.com).
2. من لوحة التحكم: **SQL Editor** → نفّذ محتويات `migrations/001_profiles.sql`.
3. في **Authentication → Providers** تأكد أن **Email** مفعّل.
4. أضف متغيرات البيئة في Netlify وملف `.env` محلياً:
   - `VITE_SUPABASE_URL`: عنوان مشروعك (Project URL)
   - `VITE_SUPABASE_ANON_KEY`: المفتاح العام (anon/public key)

## تعيين أول مدير (أدمن)

بعد تسجيل أول مستخدم، من **Table Editor** → جدول `profiles` → عدّل حقل `role` لقيمة `admin` لذلك المستخدم.
