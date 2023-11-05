 import { useState, useEffect, useContext } from 'react';
import { Box , TextareaAutosize , Button,styled} from '@mui/material';

import { DataContext } from '../../../context/DataProvider';

import { API } from '../../../service/api';

// //components
import Comment from './comment';










//     const [comments, setComments] = useState([]);

  



     
    
//     return (
//         <Box>
//             <Container>
//                 <Image src={url} alt="dp" />   
//                 <StyledTextArea 
//                     rowsMin={5} 
//                     placeholder="what's on your mind?"
//                     onChange={(e) => handleChange(e)} 
//                     value={comment.comments}
//                 />
//                 <Button 
//                     variant="contained" 
//                     color="primary" 
//                     size="medium" 
//                     style={{ height: 40 }}
//                     onClick={(e) => addComment(e)}
//                 >Post</Button>             
//             </Container>
//             <Box>
//                 {
//                     comments && comments.length > 0 && comments.map(comment => (
//                         <Comment comment={comment} setToggle={setToggle} />
//                     ))
//                 }
//             </Box>
//         </Box>
//     )
// }

const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;
const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});

 const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`
const initialValues = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}

const Comments=({ post }) =>{
    const url = 'https://static.thenounproject.com/png/12017-200.png';
    const [comment, setComment] = useState(initialValues);
    const { account } = useContext(DataContext);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);
   
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await API.getAllComments(post._id);
                if (response.isSuccess) {
                    setComments(response.data);
                } else {
                    console.error("API request was not successful:", response.error);
                }
            } catch (error) {
                console.error("Error while fetching data:", error);
            }
        }
    
        getData()
            .catch((error) => {
                console.error("Unhandled promise rejection:", error);
            });
    }, [toggle, post]);
    


        const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {
                let response =await API.newComment(comment);
                if(response.isSuccess){
                    setComment(initialValues)
                }
                
               
                setToggle(prevState => !prevState);
            }

    return(
        <Box>
            <Container>
                <Image src={url} alt="dp"/>
                <StyledTextArea 
                   minRows={5} 
                   placeholder="what's on your mind?"
                   onChange={(e) => handleChange(e)} 
                   value={comment.comments}
               />
                 <Button 
                    variant="contained" 
                    color="primary" 
                    size="medium" 
                    style={{ height: 40 }} 
                    onClick={(e) => addComment(e)}
                    
                >Post</Button>
            </Container>
            <Box>
               {  
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment}  setToggle={setToggle} />
                    ))
                }
            </Box>
        </Box>
    )
    
}

export default Comments;