# رفع وسيلة على Netlify بشكل صحيح

## الطريقة 1: الربط مع Git (مُفضّلة)

### 1. رفع المشروع إلى GitHub/GitLab/Bitbucket
- أنشئ مستودعاً جديداً.
- ارفع المشروع:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. إنشاء موقع على Netlify
1. ادخل إلى [app.netlify.com](https://app.netlify.com) وسجّل الدخول.
2. اضغط **Add new site** → **Import an existing project**.
3. اختر **GitHub** (أو GitLab/Bitbucket) واختر المستودع الخاص بالمشروع.
4. **لا تغيّر** إعدادات البناء التالية (يجب أن تتطابق مع `netlify.toml`):

| الإعداد        | القيمة            |
|----------------|-------------------|
| Build command  | `npm run build`   |
| Publish directory | `dist`        |
| Functions directory | `netlify/functions` (إن لم يظهر اتركه؛ netlify.toml يحدده) |

5. اضغط **Deploy site**.

بعد كل `git push` على الفرع المرتبط، Netlify سيعيد البناء والنشر تلقائياً.

---

## الطريقة 2: السحب اليدوي (Drag and Drop)

مناسب للتجربة السريعة دون Git.

### 1. البناء محلياً
```bash
npm install
npm run build
```

### 2. رفع المخرجات يدوياً
- في Netlify: **Add new site** → **Deploy manually**.
- اسحب مجلد **`dist`** وأفلته في منطقة الرفع.

**تنبيه**: بهذه الطريقة **لا تُرفع الدوال (Functions)**. المتاجر والـ API لن تعمل لأن دوال Netlify تحتاج أن يكون المشروع مربوطاً بـ Git أو مرفوعاً عبر Netlify CLI (انظر الطريقة 3). للعمل الكامل استخدم الطريقة 1 أو 3.

---

## الطريقة 3: Netlify CLI (بناء ورفع كامل من الجهاز)

مناسب إذا لم تستخدم Git أو تريد نشر من الطرفية مع الدوال.

### 1. تثبيت وتسجيل الدخول
```bash
npm install -g netlify-cli
netlify login
```

### 2. ربط المشروع بموقع Netlify (مرة واحدة)
```bash
cd "e:\L\Abu Abdullah"
netlify init
```
- اختر **Create & configure a new site**.
- اختر فريقك (Team).
- اسم الموقع: مثلاً `wasila` (يُولّد رابط مثل `wasila.netlify.app`).

### 3. النشر
```bash
netlify deploy --prod
```
سيقوم Netlify بـ:
- تشغيل `npm run build`
- رفع مجلد `dist`
- رفع الدوال من `netlify/functions`

الرابط النهائي يظهر في الطرفية بعد انتهاء النشر.

---

## التحقق بعد الرفع

1. افتح رابط الموقع (مثل `https://YOUR-SITE.netlify.app`).
2. تأكد أن الصفحة الرئيسية تظهر.
3. ادخل إلى **المتاجر** وتأكد أن القائمة تُحمّل (هذا يختبر دوال الـ API).
4. إن فشل تحميل المتاجر: راجع **Functions** في لوحة Netlify (Site → Functions) وتأكد من عدم وجود أخطاء في الدوال.

---

## متغيرات بيئية (اختياري)

إذا استخدمت مفتاح API للشركاء:
- في Netlify: **Site configuration** → **Environment variables**.
- أضف `PARTNER_API_KEY` وقيمته.

---

## ملخص سريع

| الهدف              | الأفضل              |
|--------------------|---------------------|
| نشر دائم مع تحديثات تلقائية | الطريقة 1 (Git)     |
| تجربة سريعة بدون دوال   | الطريقة 2 (سحب dist) |
| نشر كامل مع دوال من الطرفية | الطريقة 3 (CLI)      |

للعمل الكامل (واجهة + متاجر + طلبات + شركاء): استخدم **الطريقة 1** أو **الطريقة 3**.
