import React, { useEffect, useState } from 'react';
import {db } from '../FirebaseConfig';
import { getDocs ,collection , addDoc, Timestamp, doc, deleteDoc} from 'firebase/firestore';

function Demo() {
    const [heading,setHeading] = useState("");
    const [description,setDescription] = useState("");
    const [imageurl,setImageurl] = useState("");

  const [posts,setPosts] = useState([]);
  
  const postsCollectionRef = collection(db,"posts");

  useEffect(()=>{
    const getPosts=async ()=>{
        //READ DATA
        //Set data to posts
        try{
            const data =  await getDocs(postsCollectionRef);
            const filterData = data.docs.map((doc) => ({...doc.data(),id:doc.id}));
            setPosts(filterData);
        }
        catch(err){
            console.log(err);
        }
       
    }
    getPosts();
  },[]);

  const onSubmitForm =async()=>{
    try{
        await addDoc(postsCollectionRef,{
            heading: heading,
            description : description,
            imageurl : imageurl,
            time : Timestamp.now()
        });
    }
    catch(err){
        console.log(err);
    }
   
  }
  const onDeletePost=async(id)=>{
    //Get the doc then delete it
    const post  = doc(db,"posts",id);
    await deleteDoc(post);
    
  }
   const onUpdatePost=async()=>{
    
  }
  return (
    <div>
        <h1>Posts</h1>
        <div className="mx-auto" style={{width:"50%"}}>
            Post Heading: <input type='text' onChange={(e)=>setHeading(e.target.value)} className="form-control" placeholder='Add your post heading'></input> <br/>
            Post description: <input type='text' onChange={(e)=>setDescription(e.target.value)} className="form-control"  placeholder='Add your post description'></input> <br/>
            Image Url : <input type='text' onChange={(e)=>setImageurl(e.target.value)} className="form-control"  placeholder='Add your post url'></input> <br/>
            <button type='submit'  onClick={onSubmitForm} className='btn btn-primary' >Submit</button>
        </div>
        <div className="row">
        {posts.map((post)=>(
            <div key={post.id} className="card mx-auto col-3" >
                <img className="card-img-top" src={post.imageurl} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{post.heading}</h5>
                    <p className="card-text">{post.description}</p>
                    <button  onClick={onUpdatePost} className='btn btn-warning m-1' >Update</button>
                    <button  onClick={()=>onDeletePost(post.id)} className='btn btn-danger' >Delete</button>
                </div>
            </div>
        ))}
        </div>
        
       
                
    </div>
 
  )
}

export default Demo