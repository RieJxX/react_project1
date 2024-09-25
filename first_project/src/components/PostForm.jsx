import React , {useState} from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) =>{
    const [post , setPost] = useState( {title: "" , body : ""})

    const addNewPost = (e) =>{
        e.preventDefault()
        // console.log(title)
        // console.log(bodyInputRef.current.value)
        // console.log(newPost)
        // setPosts([...posts, {...post , id:Date.now()}])
        const newPost ={
            ...post , id:Date.now()
        }
        create(newPost)
        setPost({title: "" , body : ""})
    }


    return (
        <form>
        {/* Управляемый компонент */}
        <MyInput
          value = {post.title} 
          onChange = {e => setPost({...post , title: e.target.value})}
          type = "text" placeholder = "Название поста">
        </MyInput>
        {/* Неконтролируемый компонент */}
        {/* <MyInput 
          ref = {bodyInputRef}
          type = "text" placeholder = "Название поста">
        </MyInput> */}
        <MyInput
          value = {post.body} 
          onChange = {e => setPost({...post , body: e.target.value})}
          type = "text" placeholder = "Содержание поста">
        </MyInput>
        <MyButton onClick = {addNewPost}>Создать</MyButton>
      </form>   
    )
}

export default PostForm