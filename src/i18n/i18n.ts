import i18next from 'i18next';

i18next.init({
    lng: 'fa',
    debug: true,
    resources: {
        fa: {
            translation: {
                add: "افزودن",
                delete: "حذف",
                edit: "اصلاح",
                search: "جستجو",
                cancel:"انصراف",
                yes:'بله',
                no:'خیر',
                print:'چاپ',
                select: "انتخاب",
                ok: "تایید",
                confirm: "تایید",
                show_menu: "نمایش منو",
                hide_menu: "عدم نمایش منو",
                logout: "خروج از سامانه",
                page_not_found: "متاسفانه صفحه مورد نظر شما یافت نشد",
                go_home_page: "انتقال به صفحه اصلی",
                open_requests: "درخواست های باز"
            }
        }
    }
}).then(function (t) {

});
export default i18next;