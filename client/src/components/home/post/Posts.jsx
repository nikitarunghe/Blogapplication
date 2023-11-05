import { useState, useEffect } from "react";
import {API} from '../../../service/api';
import { Box ,Grid} from "@mui/material";

import { useSearchParams ,Link} from 'react-router-dom';
import Post from './Post';
const Posts = ()=>{

    const [posts, setPosts] = useState([]);
    const [SearchParams] = useSearchParams();
    const category = SearchParams.get('category');
    useEffect(()=>{
        const fetchData= async()=>{
                let response = await API.getAllPosts({ category : category || '' });
                if(response.isSuccess){
                    setPosts(response.data);
                }
        }
        fetchData();
    },[category])
    return(

        <>
         {
           
             posts && posts.length >0? posts.map(post => (
                <Grid item lg={3} sm={4} xs={12}>
                    <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`}> 
                        <Post post={post} />
                     </Link>
                </Grid>
            )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                    No data is available for selected category
                </Box>
    
            
         }

 

        </>
    )
}


export default Posts;