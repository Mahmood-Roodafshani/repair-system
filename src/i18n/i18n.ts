import i18next from 'i18next';

i18next
  .init({
    lng: 'fa',
    debug: true,
    resources: {
      fa: {
        translation: {
          // MENU ITEMS
          signiture_sample: 'نمونه امضا',
          public_announcement: 'اطلاع رسانی عمومی',
          security_announcement: 'اطلاع رسانی امنیتی',
          // BUTTONS
          add: 'افزودن',
          delete: 'حذف',
          edit: 'اصلاح',
          search: 'جستجو',
          cancel: 'انصراف',
          close: 'بستن',
          clear: 'پاک',
          yes: 'بله',
          no: 'خیر',
          print: 'چاپ',
          select: 'انتخاب',
          ok: 'تایید',
          'create/edit': 'ثبت/ویرایش',
          confirm: 'تایید',
          show_menu: 'نمایش منو',
          hide_menu: 'عدم نمایش منو',
          active: 'فعال',
          deactive: 'غیرفعال',
          new_user: 'کاربر جدید',
          requester: 'درخواست کننده',
          logout: 'خروج از سامانه',
          page_not_found: 'متاسفانه صفحه مورد نظر شما یافت نشد',
          go_home_page: 'انتقال به صفحه اصلی',
          open_requests: 'درخواست های باز',
          access_control: 'مدیریت دسترسی',
          staff_code: 'شماره پرسنلی',
          national_code: 'کدملی',
          firstname: 'نام',
          lastname: 'نام خانوادگی',
          grants: 'مجوزهای عطا شده',
          choose_job: 'انتخاب شغل',
          job: 'شغل',
          roles: 'نقش‌ها',
          title: 'عنوان',
          group_access: 'گروه دسترسی',
          hefazat_access: 'یگان دسترسی حفاظت',
          faraja_access: 'یگان دسترسی فراجا',
          jobs_access: 'دسترسی مشاغل سازمانی',
          signiture_sample_file: 'بارگذاری عکس امضا',
          digital_signiture: 'امضای دیجیتال',
          // FILTER
          from: 'تاریخ شروع',
          to: 'تاریخ پایان',
          // MESSAGES
          op_done_successfully: 'عملیات موردنظر با موفقیت انجام شد',
          ckeditor_placeholder: 'متن پیام را وارد نمایید',
          // ERRORS
          please_fill_req_fields: 'لطفا تمام موارد لازم را پر نمایید',
          firstname_min_length: 'نام باید حداقل 2 کاراکتر باشد',
          firstname_max_length: 'نام باید حداکثر 50 کاراکتر باشد',
          lastname_min_length: 'نام خانوادگی باید حداقل 2 کاراکتر باشد',
          lastname_max_length: 'نام خانوادگی باید حداکثر 50 کاراکتر باشد',
          title_min_length: 'عنوان باید حداقل 2 کاراکتر باشد',
          title_max_length: 'عنوان باید حداکثر 50 کاراکتر باشد',
          title_is_req: 'لطفا عنوان را وارد نمایید',
          message_min_length: 'متن پیام باید حداقل 2 کاراکتر باشد',
          message_max_length: 'متن پیام باید حداکثر 1000 کاراکتر باشد',
          message_is_req: 'لطفا متن پیام را وارد نمایید',
          from_is_req: 'لطفا تاریخ شروع را وارد نمایید',
          to_is_req: 'لطفا تاریخ پایان را وارد نمایید',
          invalid_national_code: 'کدملی وارد شده نامعتبر است',
          invalid_staff_code: 'شماره پرسنلی وارد شده نامعتبر است'
        }
      }
    }
  })
  .then(function (t) {});
export default i18next;
