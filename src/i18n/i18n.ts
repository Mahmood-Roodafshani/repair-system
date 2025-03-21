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
          roles_management: 'مدیریت نقش ها',
          dashboard: 'داشبورد',
          createGroupAccess: 'ایجاد گروه دسترسی',
          chooseReplacement: 'انتخاب جایگزین',
          staffInfo: 'اطلاعات پرسنل',
          other_info: 'اطلاعات غیر پرسنل',
          family_info: 'اطلاعات عائله',
          create_jobs: 'تعریف مشاغل',
          jobs_tree: 'درختواره مشاغل',
          tracking: 'سامانه ردیابی',
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
          save: 'ذخیره',
          ok: 'تایید',
          'create/edit': 'ثبت/ویرایش',
          confirm: 'تایید',
          show_menu: 'نمایش منو',
          hide_menu: 'عدم نمایش منو',
          active: 'فعال',
          deactive: 'غیرفعال',
          user: 'کاربر',
          new_user: 'کاربر جدید',
          requester: 'درخواست کننده',
          logout: 'خروج از سامانه',
          page_not_found: 'متاسفانه صفحه مورد نظر شما یافت نشد',
          go_home_page: 'انتقال به صفحه اصلی',
          open_requests: 'درخواست های باز',
          access_control: 'مدیریت دسترسی',
          staff_code: 'شماره پرسنلی',
          staff_name: 'نام پرسنل',
          national_code: 'کدملی',
          supervisor_national_code: 'کدملی سرپرست',
          supervisor: 'سرپرست',
          relation: 'نسبت',
          firstname: 'نام',
          lastname: 'نام خانوادگی',
          grants: 'مجوزهای عطا شده',
          choose_job: 'انتخاب شغل',
          choose_role: 'انتخاب نقش',
          job: 'شغل',
          job_title: 'عنوان شغل',
          role_title: 'عنوان نقش',
          role: 'نقش',
          roles: 'نقش‌ها',
          title: 'عنوان',
          status: 'وضعیت',
          name: 'نام',
          fullname: 'نام و نام خانوادگی',
          mobile: 'شماره موبایل',
          gender: 'جنسیت',
          religion: 'مذهب',
          address: 'آدرس',
          group_access: 'گروه دسترسی',
          group_name: 'نام گروه',
          created_groups: 'گروه‌های ایجاد شده',
          hefazat_access: 'یگان دسترسی حفاظت',
          faraja_access: 'یگان دسترسی فراجا',
          jobs_access: 'دسترسی مشاغل سازمانی',
          signiture_sample_file: 'بارگذاری عکس امضا',
          digital_signiture: 'امضای دیجیتال',
          system_title: 'عنوان سامانه',
          new_system: 'سامانه جدید',
          job_replacement: 'انتخاب شغل جایگزین',
          replacement_name: 'نام و نام خانوادگی جایگزین',
          role_replacement: 'انتخاب نقش جایگزین',
          available_grants: 'مجوزهای موجود',
          taken_grants: 'مجوزهای عطا شده',
          new_staff: 'پرسنل جدید',
          new_person: 'شخص جدید',
          new_job: 'شغل جدید',
          new_family_member: 'عائله جدید',
          organization_unit: 'واحد سازمانی',
          job_level: 'سطح شغل',
          job_status: 'وضعیت شغل',
          job_code: 'شناسه شغل',
          job_description: 'شرح شغل',
          responsibility_description: 'شرح وظایف شغل',
          job_fields: 'رشته‌های تحصیلی مورد نیاز',
          job_courses: 'دوره‌های تخصصی مورد نیاز',
          change_pass: 'تغییر رمزعبور',
          work_unit: 'یگان خدمتی',
          enter_national_code: 'کد ملی را وارد نمایید',
          form_name: 'نام فرم',
          time: 'ساعت',
          date: 'تاریخ',
          ip: 'آی پی',
          // TABLE
          operation: 'عملیات',
          row_number: 'ردیف',
          show_hide_search: 'نمایش/مخفی سازی جست و جو',
          show_hide_filters: 'نمایش/مخفی سازی فیلترها',
          // FILTER
          from: 'تاریخ شروع',
          to: 'تاریخ پایان',
          id_number: 'شماره شناسنامه',
          father_name: 'نام پدر',
          hire_date: 'تاریخ استخدام',
          service_status: 'وضعیت خدمتی',
          martial_status: 'وضعیت تاهل',
          position_degree: 'درجه/رتبه',
          position: 'جایگاه',
          degree: 'مدرک',
          work_location: 'محل خدمت',
          educational_field: 'رشته تحصیلی',
          birth_location: 'محل تولد',
          family_relation: 'نسبت با سرپرست',
          choose_form: 'انتخاب سامانه و فرم',
          choose_activity: 'انتخاب فعالیت',
          // FAMILY RELATION
          family_relation_wife_husband: 'همسر',
          family_relation_father: 'پدر',
          family_relation_mother: 'مادر',
          family_relation_son: 'پسر',
          family_relation_daughter: 'دختر',
          family_relation_sister: 'خواهر',
          family_relation_brother: 'برادر',
          // DEGREE
          phd: 'دکترا',
          master: 'کارشناسی ارشد',
          bachelor: 'کارشناسی',
          // GENDER
          gender_male: 'مرد',
          gender_female: 'زن',
          // MILITARY SERVICE
          military_service_done_status: 'اتمام خدمت',
          military_service_exempt_status: 'معاف از خدمت',
          // SERVICE STATUS
          service_in_progress_status: 'در حال خدمت',
          service_retried_status: 'بازنشسته',
          // MARITAL STATUS
          marital_single_status: 'مجرد',
          marital_married_status: 'متاهل',
          // JOB LEVEL
          job_level_manager: 'مدیر',
          job_level_expert: 'کارشناس',
          job_level_boss: 'رئیس',
          // RELIGION
          religion_shia: 'شیعه',
          religion_sunni: 'سنی',
          // MESSAGES
          op_done_successfully: 'عملیات موردنظر با موفقیت انجام شد',
          ckeditor_placeholder: 'متن پیام را وارد نمایید',
          confirm_remove: 'آیا از حذف آیتم مدنظر اطمینان دارید؟',
          user_removed: 'کاربر مورد نظر با موفقیت حذف گردید',
          job_removed: 'شغل مورد نظر با موفقیت حذف گردید',
          job_created: 'شغل مدنظر با موفقیت اضافه گردید',
          job_updated: 'شغل مدنظر با موفقیت ویرایش گردید',
          staff_created: 'اطلاعات پرسنل مدنظر با موفقیت ثبت گردید',
          staff_updated: 'اطلاعات پرسنل مدنظر با موفقیت ویرایش گردید',
          non_staff_created: 'اطلاعات فرد غیر پرسنل مدنظر با موفقیت ثبت گردید',
          non_staff_updated:
            'اطلاعات فرد غیر پرسنل مدنظر با موفقیت ویرایش گردید',
          family_member_created: 'اطلاعات عائله مدنظر با موفقیت ثبت گردید',
          family_member_updated: 'اطلاعات عائله مدنظر با موفقیت ویرایش گردید',
          new_access_created: 'دسترسی مدنظر با موفقیت ایجاد گردید',
          role_created: 'نقش مورد نظر با موفقیت افزوده شد',
          // ERRORS
          please_fill_req_fields: 'لطفا تمام موارد لازم را پر نمایید',
          firstname_is_req: 'لطفا فیلد نام را وارد نمایید',
          firstname_min_length: 'نام باید حداقل 2 کاراکتر باشد',
          firstname_max_length: 'نام باید حداکثر 50 کاراکتر باشد',
          lastname_is_req: 'لطفا فیلد نام خانوادگی را وارد نمایید',
          lastname_min_length: 'نام خانوادگی باید حداقل 2 کاراکتر باشد',
          lastname_max_length: 'نام خانوادگی باید حداکثر 50 کاراکتر باشد',
          father_name_is_req: 'لطفا فیلد نام پدر را وارد نمایید',
          father_name_min_length: 'نام پدر باید حداقل 2 کاراکتر باشد',
          father_name_max_length: 'نام پدر باید حداکثر 50 کاراکتر باشد',
          address_is_req: 'لطفا فیلد آدرس را وارد نمایید',
          address_min_length: 'آدرس باید حداقل 2 کاراکتر باشد',
          address_max_length: 'آدرس باید حداکثر 200 کاراکتر باشد',
          title_min_length: 'عنوان باید حداقل 2 کاراکتر باشد',
          title_max_length: 'عنوان باید حداکثر 50 کاراکتر باشد',
          title_is_req: 'لطفا عنوان را وارد نمایید',
          message_min_length: 'متن پیام باید حداقل 2 کاراکتر باشد',
          message_max_length: 'متن پیام باید حداکثر 1000 کاراکتر باشد',
          message_is_req: 'لطفا متن پیام را وارد نمایید',
          from_is_req: 'لطفا تاریخ شروع را وارد نمایید',
          to_is_req: 'لطفا تاریخ پایان را وارد نمایید',
          invalid_national_code: 'کدملی وارد شده نامعتبر است',
          national_code_is_req: 'لطفا فیلد کدملی را وارد نمایید',
          invalid_staff_code: 'شماره پرسنلی وارد شده نامعتبر است',
          staff_code_is_req: 'لطفا شماره پرسنلی را وارد نمایید',
          id_number_is_req: 'لطفا فیلد شماره شناسنامه را وارد نمایید',
          invalid_id_number: 'شماره شناسنامه وارد شده اشتباه است',
          mobile_is_req: 'لطفا فیلد شماره موبایل را وارد نمایید',
          invalid_mobile: 'شماره موبایل وارد شده اشتباه است',
          religion_is_req: 'لطفا فیلد مذهب را وارد نمایید',
          degree_is_req: 'لطفا فیلد مدرک را وارد نمایید',
          service_status_is_req: 'لطفا فیلد وضعیت خدمتی را وارد نمایید',
          gender_is_req: 'لطفا فیلد جنسیت را وارد نمایید',
          position_degree_is_req: 'لطفا فیلد درجه/رتبه را وارد نمایید',
          martial_status_is_req: 'لطفا فیلد وضعیت تاهل را وارد نمایید',
          birth_location_is_req: 'لطفا فیلد محل تولد را وارد نمایید',
          educational_field_is_req: 'لطفا فیلد رشته تحصیلی را وارد نمایید',
          work_location_is_req: 'لطفا فیلد محل خدمت را وارد نمایید',
          hire_date_is_req: 'لطفا فیلد تاریخ استخدام را وارد نمایید',
          invalid_supervisor_national_code: 'کدملی سرپرست وارد شده نامعتبر است',
          supervisor_national_code_is_req:
            'لطفا فیلد کدملی سرپرست را وارد نمایید',
          family_relation_field_is_req:
            'لطفا فیلد نسبت با سرپرست را وارد نمایید',
          job_title_is_req: 'لطفا فیلد عنوان شغل را وارد نمایید',
          job_title_min_length: 'عنوان شغل باید حداقل 2 کاراکتر باشد',
          job_title_max_length: 'عنوان شغل باید حداکثر 50 کاراکتر باشد',
          job_code_is_req: 'لطفا فیلد کد شغل را وارد نمایید',
          job_code_min_length: 'کد شغل باید حداقل 2 کاراکتر باشد',
          job_code_max_length: 'کد شغل باید حداکثر 10 کاراکتر باشد',
          job_description_max_length: 'شرح شغل باید حداکثر 100 کاراکتر باشد',
          organization_unit_is_req: 'لطفا واحد سازمانی را تعیین نمایید',
          job_level_is_req: 'لطفا سطح شغل را تعیین نمایید',
          job_status_is_req: 'لطفا وضعیت شغل را تعیین نمایید',
          job_fields_is_req:
            'لطفا رشته‌های تحصیلی مورد نیاز شغل را تعیین نمایید',
          job_courses_is_req:
            'لطفا دوره‌های تخصصی مورد نیاز شغل را تعیین نمایید',
          responsibility_description_is_req:
            'فیلد شرح وظایف شغل باید حداکثر 1000 کاراکتر باشد',
          role_title_is_req: 'لطفا عنوان نقش را وارد نمایید',
          role_is_req: 'لطفا نقش را وارد نمایید'
        }
      }
    }
  })
  .then(function (t) {});
export default i18next;
