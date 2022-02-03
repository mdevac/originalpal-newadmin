const dictionary = {
  id: 'شناسه',
  code: 'کد',
  name: 'نام',
  title: 'عنوان',
  slug: 'اسلاگ',
  price: 'قیمت',
  discount_price: 'قیمت با تخفیف',
  description: 'توضیحات',
  state: 'وضعیت',
  meta_keywords: 'کلمات کلیدی متا',
  meta_description: 'توضیحات متا',
  brand_id: 'آیدی برند',
  sold: 'فروخته شده',
  trend: 'ترند',
  category_id: 'آیدی دسته بندی',
  summary: 'خلاصه',
  site_main_picture: 'تصویر اصلی محصول',
  meta_title: 'عنوان متا',
  title_page: 'عنوان صفحه',
  onesize: 'تک سایز',
  Enable: 'فعال',
  collection_id: 'آیدی مجموعه',
  media: 'تصاویر',
  discount_exp: 'پایان تخفیف',
  updated_at: 'تاریخ آخرین بروزرسانی',
  created_at: 'تاریخ ساخت',
  type: 'نوع',
  platform: 'پلتفرم',
  content: 'محتوا',
  content_color: 'رنگ محتوا',
  title_color: 'رنگ عنوان',
  link: 'لینک',
  priority: 'اولویت',
  active: 'فعال',
  desktop: 'دسکتاپ',
  mobile: 'موبایل',
  stand: 'ایستاده',
  slide: 'اسلاید',
  paid: 'پرداخت شده',
  delivered: 'تحویل داده شده',
  address_id: 'شناسه آدرس',
  admin_check: 'بررسی ادمین',
  coupon_id: 'شناسه کد تخفیف',
  deleted_at: 'زمان حذف',
  delivery: 'تحویل',
  Events: 'جشنواره ها',
  newprice: 'قیمت جدید',
  notes: 'یادداشت ها',
  number: 'شماره',
  payable: 'قابل پرداخت',
  payment_id: 'شناسه پرداخت',
  post_fee: 'فی ارسال',
  status: 'وضعیت',
  typesell: 'نوع فروش',
  user_id: 'شناسه کاربر',
  role: 'نقش',
  admin: 'ادمین',
  desc: 'توضیحات',
  writer: 'نویسنده',
  show_categories: 'دسته بندی های نمایش',
  labels: 'برچسب',
  comments: 'نظرات',
  thumb: 'تصویر کوچک',
  endimage: 'پایانه تصویر',
  endtitle: 'پایانه عنوان',
  endalt: 'پایانه جایگزین',
  endtext: 'پایانه متن',
  isboard: 'isboard',
  ishighlight: 'ishighlight',
  istop: 'istop',
  isvideo: 'isvideo',
  iscast: 'iscast',
  srcvideo: 'منبع ویدیو',
  headers: 'هدر ها',
  is_news: 'is_news',
  rating: 'رتبه بندی',
  comfort: 'راحتی',
  quality: 'کیفیت',
  size: 'سایز',
  width: 'عرض',
  product_id: 'شناسه محصول',
  product: 'محصول',
  banner: 'بنر',
  purchased: 'خریداری شده',
  phone: 'شماره تلفن',
  lastname: 'نام خانوادگی',
  email: 'ایمیل',
  password: 'رمز عبور',
  points: 'امتیاز ها',
  decription: 'توضیحات',
  amount: 'تعداد',
  start: 'شروع',
  expiration: 'انقضاء',
  min_to_execute: 'حداقل برای شروع',
  max: 'بیشینه',
  deny_off: 'deny_off',
  limit: 'محدودیت',
  count: 'تعداد',
  discount_type: 'نوع تخفیف',
  discount_amount: 'مقدار تخفیف',
  discount_start: 'شروع تخفیف',
  discount_end: 'پایان تخفیف',
  disc: 'توضیحات',
  tagtext: 'متن برچسب',
  items: 'موارد',
  picture: 'تصویر',
  point: 'امتیاز',
  key: 'کلید',
  value: 'مقدار',
  city: 'شهر',
  province: 'استان',
  address: 'آدرس',
  postalcode: 'کد پستی',
  order_id: 'شناسه سفارش',
  quantity: 'تعداد',
  stock_id: 'شناسه انبار',
  post: 'پست شده',
  waiting: 'در انتظار پرداخت',
  process: 'در حال پردازش',
  discount_amout: 'مقدار تخفسف',
  cash: 'نقدی',
  percent: 'درصدی',
}

export const translator = (target: string) => {
  for (const [key, value] of Object.entries(dictionary)) {
    if (key === target) {
      return value
    }
  }
  return target
}
