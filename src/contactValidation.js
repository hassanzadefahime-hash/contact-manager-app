import * as  Yup from 'yup';

export const contactSchema = Yup.object().shape({
    fullname:Yup.string().required("وارد کردن نام الزامی است"),
    photo:Yup.string().url("آدرس تصویر صحیح نمی‌باشد").required("وارد کردن آدرس تص.یر الزامی است"),
    mobile:Yup.number().required("وارد کردن شماره موبایل الزامی است."),
    email:Yup.string().email("ایمیل وارد شده صحیح نمی‌باشد").required("وارد کردن ایمیل الزامی است"),
    job:Yup.string().nullable(),
    group:Yup.string().required("وارد کردن گروه الزامی است‌")
})