## Result

### 1. Online Quiz
1. در فایل database.js، بهتر است متدها را به شکل promise تغییر داده و تا ایجاد جداول await  کنید.
2. به لحاظ صحیح پیاده‌سازی، بهتر است لایه‌های نرم‌افزار جدا شود.
3. بهتر هست ثابت‌های که تکرار میشوند یکبار تعریف و به دفعات استفاده شوند مانند نام جداول یا فیلد ها تا از تکرار جلوگیری شود.

موفق باشید.
###
-----------------------------------user-----------------------------------------
user request(get):
    localhost:3000/user                           (get users info)
    localhost:3000/user/:id                       (get user info)


user request(post):   
    localhost:3000/user                           (create new user)


user request(put):   
    localhost:3000/user/:id                       (change password)


user request(delete):   
    localhost:3000/user/:id                       (delete user)

-----------------------------------quiz-----------------------------------------
    quiz request(get):
    localhost:3000/quiz/category                  (get categories)
    localhost:3000/quiz/:id                       (get questions)


quiz request(post):
    localhost:3000/quiz/:id                       (send answers)
-----------------------------------history-----------------------------------------

history request(get):
    localhost:3000/history/:id                    (get passed quiz history)
    localhost:3000/history/:id/:quizID            (get special quiz history)


