import React , {useState ,useMemo , useRef, useEffect} from 'react'
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';
import MyModal from '../components/UI/MyModal/MyModal';
import PostService from '../API/PostService';
import { usePosts } from '../hooks/usePosts';
import ErrorBanner from "../components/UI/ErrorBanner/ErrorBanner.jsx"
import '../styles/App.css'
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { getPagesCount } from '../utils/pages.jsx';
import Pagination from '../components/UI/pagination/Pagination.jsx';

function Posts() {
    // const [posts , setPosts] = useState([
    //   {id: 1 , title: "JavaScript" , body : "Description"},
    //   {id: 2 , title: "JavaScript" , body : "Description"},
    //   {id: 3 , title: "JavaScript" , body : "Description"}
    // ])
    const [posts , setPosts] = useState([])
    const [filter , setFilter] = useState({sort:'' , query:''})
    const [modal , setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts , filter.sort , filter.query)
    // const [isPostsLoading , setIsPostsLoading] = useState(false)
    const [totalPages , setTotalPages] = useState(0)
    const [limit , setLimit] = useState(10)
    const [page , setPage] = useState(1)
    const [fetchPosts , isPostsLoading , postError] = useFetching( async () => {
        const response = await PostService.getAll(limit , page)
        setPosts(response.data);
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount , limit))
    })
    const [pagesArray , setPagesArray] = useMemo( () => {
      let pArr = []
      for(let i = 0 ; i < totalPages ; i++){
        pArr.push(i+1)
      }
      console.log(totalPages)
      console.log(pArr)
      return [pArr]} , [totalPages])

    const createPost = (newPost) =>{
      setPosts([...posts , newPost])
      setModal(false)
    }
    const deletePost = (post) =>{
      setPosts(posts.filter( p => p.id !== post.id))
    }

    useEffect( () => {
      fetchPosts()
    } ,  [page])


    return(
      <div className='App'>
        <MyButton style = {{marginTop: 30}} onClick = {() => setModal(true)}>
          Создать пользователя
        </MyButton>
        <MyModal visible = {modal} setVisible = {setModal}>
          <PostForm create = {createPost}/>
          <MyButton onClick = {() => setModal(false)}>Выйти</MyButton>
          </MyModal>
        <hr style = {{margin:"12px 0"}}></hr>
        <PostFilter 
        filter = {filter} 
        setFilter = {setFilter}
        />
        {postError &&
        <ErrorBanner error = {postError}/>
        }
        {/* Условная отрисовка(deleted) */}
        {isPostsLoading
        ? <div style = {{display: 'flex' , justifyContent: 'center' , marginTop: '100px'}}><Loader/></div>
        : <div><PostList remove = {deletePost} posts = {sortedAndSearchedPosts} title = "ПОСТЫ" />
        <Pagination pagesArray = {pagesArray} page = {page} setPage = {setPage}/>
        </div>
        }
      </div>
    )
} 

export default Posts