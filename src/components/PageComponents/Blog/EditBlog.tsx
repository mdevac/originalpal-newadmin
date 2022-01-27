import { deleteBlog, editBlog, getSingleBlog, removeItem, useStore } from 'utils'
import Layout from 'Layouts'
import { Card, CardBody, CardHeader, Checkbox, InputGroup, Modal } from '@paljs/ui'
import { BasicEditor, Button, FlexContainer, HeaderButton, ModalBox } from 'components'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import React, { useState, useLayoutEffect } from 'react'
import styled from 'styled-components'
import { MediaCard } from 'components/Card'
import router from 'next/router'

export const EditBlogPage: React.FC = () => {
  const { blog, reload } = useStore((state: any) => ({
    blog: state?.blog,
    reload: state?.reload,
  }))

  const reloadBlog = async () => {
    const reloadedBlog = await getSingleBlog(blog?.id)
    reload('blog', reloadedBlog)
  }

  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { dirtyFields },
  } = useForm({
    defaultValues: blog,
  })

  const onSubmit = async (form: any) => {
    setLoading(true)

    for (let key in form) {
      if (dirtyFields[key]) delete form[key]
    }

    const finalForm = {
      ...form,
    }

    const response = await editBlog(blog?.id, finalForm)

    if (response?.status === 'success') {
      toast.success('وبلاگ  بروز شد')
    } else {
      toast.error('بروزرسانی وبلاگ موفقیت آمیز نبود')
    }
    setLoading(false)
  }

  const [itemToRemove, setItemToRemove] = useState<any>(null)
  const closeRemovalModal = () => setItemToRemove(false)

  const remove = async (removeId: any) => {
    await removeItem('blog', removeId, deleteBlog, () => router.push('/blog'), [
      `وبلاگ ${removeId} با موفقیت حذف شد`,
      'حذف وبلاگ موفقیت آمیز نبود',
    ])
  }

  return (
    <Layout title={`${blog?.id}`}>
      <h1 style={{ marginBottom: '4rem' }}>
        ویرایش وبلاگ شماره {blog?.id}
        <HeaderButton status="Info" href={`/blog/${blog?.id}`}>
          مشاهده
        </HeaderButton>
        <HeaderButton status="Danger" onClick={() => setItemToRemove(blog)}>
          حذف
        </HeaderButton>
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>
          <span style={{ margin: '0 0 0 1rem' }}>ساخت وبلاگ</span>
          <Controller
            name="is_news"
            control={control}
            render={({ field }) => (
              // <Checkbox checked={field.value} onChange={(e: any) => field.onChange(e ? 1 : 0)}>
              <span style={{ color: 'transparent', fontSize: '0' }}>
                <Checkbox checked={field.value} onChange={(e: any) => field.onChange(e ? 1 : 0)}>
                  اخبار
                </Checkbox>
              </span>
            )}
          />
        </h2>

        {/* ....:::::: Remove Modals :::::.... */}
        <Modal on={itemToRemove} toggle={closeRemovalModal}>
          <ModalBox>
            <div style={{ marginBottom: '1rem' }}>
              آیا از حذف برچسب
              <span className="mx-1">{itemToRemove?.id}</span>
              اطمینان دارید؟
            </div>
            <FlexContainer jc="space-between">
              <Button onClick={closeRemovalModal}>انصراف</Button>
              <Button onClick={() => remove(itemToRemove?.id)} status="Danger">
                حذف
              </Button>
            </FlexContainer>
          </ModalBox>
        </Modal>

        <InputGroup className="col mb-4" fullWidth>
          <label>عنوان</label>
          <input {...register('title', { required: true })} placeholder="عنوان" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <Controller
            control={control}
            name="desc"
            rules={{
              required: true,
            }}
            render={({ field }) => <BasicEditor initialValue={blog?.desc} callback={field?.onChange} title="محتوا" />}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>اسلاگ</label>
          <input {...register('slug', { required: true })} placeholder="اسلاگ" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>نویسنده</label>
          <input {...register('writer')} placeholder="نویسنده" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>برچسب ها</label>
          <input {...register('labels')} placeholder="برچسب ها" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>دسته بندی ها</label>
          <input {...register('show_categories')} placeholder="دسته بندی ها" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>تصویر بنر ( برای جایگزینی تصویر، تصویر موردنظر خود را از طریق ورودی زیر بارگزاری کنید)</label>
          <input type="file" {...register('thumb')} placeholder="تصویر پایانی" />
          <MediaCard media={blog?.thumb} removalCallback={console.log} updateCallback={console.log} index={0} />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>خلاصه</label>
          <Controller
            control={control}
            name="summary"
            render={({ field }) => (
              <BasicEditor initialValue={blog?.summary} callback={field?.onChange} title="خلاصه" />
            )}
          />
        </InputGroup>

        <Card>
          <CardHeader>SEO</CardHeader>
          <CardBody>
            <InputGroup className="col" fullWidth>
              <label>کلمات مترادف (meta_keywords)</label>
              <input {...register('meta_keywords')} placeholder="کلمات مترادف" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>عنوان متا</label>
              <input {...register('meta_title')} placeholder="عنوان متا" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>توضیحات متا</label>
              <input {...register('meta_description')} placeholder="توضیحات متا" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>عنوان صفحه</label>
              <input {...register('title_page')} placeholder="عنوان" />
            </InputGroup>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>تصویر پایانی</CardHeader>
          <CardBody>
            <InputGroup className="col" fullWidth>
              <label>تصویر پایانی ( برای جایگزینی تصویر، تصویر موردنظر خود را از طریق ورودی زیر بارگزاری کنید)</label>
              <input type="file" {...register('endimage')} placeholder="تصویر پایانی" />
              <MediaCard media={blog?.endimage} removalCallback={console.log} updateCallback={console.log} index={0} />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>عنوان پایانی</label>
              <input {...register('endtitle')} placeholder="عنوان پایانی" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>تگ آلت تصویر پایانی</label>
              <input {...register('endtitle')} placeholder="تگ آلت تصویر پایانی" />
            </InputGroup>

            <InputGroup className="col" fullWidth>
              <label>متن تصویر پایانی</label>
              <input {...register('endtext')} placeholder="متن تصویر پایانی" />
            </InputGroup>
          </CardBody>
        </Card>

        <InputGroup className="col" fullWidth>
          <label>is board</label>
          <Controller
            control={control}
            name="isboard"
            render={({ field }) => (
              <CheckBoxWrapper>
                <Checkbox checked={field?.value} {...field} />
              </CheckBoxWrapper>
            )}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>is highlight</label>
          <Controller
            control={control}
            name="ishighlight"
            render={({ field }) => (
              <CheckBoxWrapper>
                <Checkbox checked={field?.value} {...field} />
              </CheckBoxWrapper>
            )}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>is top</label>
          <Controller
            control={control}
            name="istop"
            render={({ field }) => (
              <CheckBoxWrapper>
                <Checkbox checked={field?.value} {...field} />
              </CheckBoxWrapper>
            )}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>is cast</label>
          <Controller
            control={control}
            name="iscast"
            render={({ field }) => (
              <CheckBoxWrapper>
                <Checkbox checked={field?.value} {...field} />
              </CheckBoxWrapper>
            )}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>ویدیو دارد؟</label>
          <Controller
            control={control}
            name="isvideo"
            render={({ field }) => (
              <CheckBoxWrapper>
                <Checkbox checked={field?.value} {...field} />
              </CheckBoxWrapper>
            )}
          />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>فایل ویدیویی</label>
          <input type="file" {...register('srcvideo')} placeholder="فایل ویدیویی" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>هدر ها</label>
          <input {...register('headers')} placeholder="هدر ها" />
        </InputGroup>

        <InputGroup className="col" fullWidth>
          <label>ترند</label>
          <input {...register('trend')} placeholder="ترند" />
        </InputGroup>

        <Button disabled={loading} style={{ width: '10rem', marginTop: '3rem' }} status="Info" appearance="outline">
          {loading ? '...' : 'بروزرسانی وبلاگ'}
        </Button>
      </form>
    </Layout>
  )
}

const CheckBoxWrapper = styled.div`
  color: transparent;
  font-size: 0;
`
