export interface ColumnProps {
  _id: number;
  title: string;
  avatar?: string;
  description: string;
}
export interface PostProps {
  _id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  excerpt?: string;
  columnId: number;
}
export const testData: ColumnProps[] = [{
  _id: 1,
  title: 'test1的专栏',
  description: '这是test1的专栏，有一段非常有意思的简介',
  avatar: 'https://img4.sycdn.imooc.com/56924eab000163f901000100-140-140.jpg'
}, {
  _id: 2,
  title: 'test1的专栏',
  description: '这是test1的专栏，有一段非常有意思的简介',
  avatar: 'https://img4.sycdn.imooc.com/56924eab000163f901000100-140-140.jpg'
}, {
  _id: 3,
  title: 'test1的专栏',
  description: '这是test1的专栏，有一段非常有意思的简介',
  avatar: 'https://img4.sycdn.imooc.com/56924eab000163f901000100-140-140.jpg'
}]
export const testPosts: PostProps[] = [
  {
    _id: 1,
    title: '这是我的第一篇文章',
    content: 'this is a new post you very ofen we weill need to ma',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1,
    excerpt: 'this is a new post you very ofen we weill need to ma'
  }, {
    _id: 2,
    title: '这是我的第二篇文章',
    content: 'this is a new post you very ofen we weill need to ma',
    image: 'https://img4.sycdn.imooc.com/56924eab000163f901000100-140-140.jpg',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1,
    excerpt: '123'
  }, {
    _id: 3,
    title: '这是我的第三篇文章',
    content: 'this is a new post you very ofen we weill need to ma',
    image: 'https://img4.sycdn.imooc.com/56924eab000163f901000100-140-140.jpg',
    createdAt: '2020-06-11 10:34:22',
    columnId: 1,
    excerpt: '123'
  }
]