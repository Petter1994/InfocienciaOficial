
import BlogItemDetailContent  from '@/components/Blog/BlogItemDetailContent'

type Props = {
  params: { id: string }
}

const  SingleBlogPage =  ({params}: Props) => {
    const {id}  =  params
   
  return (
    <>
      <BlogItemDetailContent postId={params.id}/>
    </>
  );
};

export default SingleBlogPage;
