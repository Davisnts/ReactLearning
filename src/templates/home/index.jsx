import { useCallback, useEffect, useState } from 'react';
import './styles.css';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export const Home = () => {
  
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const filteredPosts = !searchValue ? posts:
  posts.filter(post => {
    return post.title.toLowerCase().includes(
      searchValue.toLowerCase()
    );
  });
  const noMorePosts = page + postsPerPage >= allPosts.length;

  const handleChange = (event) => {
    const {value} = event.target;
    setSearchValue({searchValue: value});
  }

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage,nextPage + postsPerPage);
    posts.push(...nextPosts);
    console.log(nextPosts);
    setPosts(posts);
    setPage(nextPage);
  }

  const handleLoadPosts = useCallback(async (page,postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page,postsPerPage));
    setAllPosts(postsAndPhotos)
  },[])
  useEffect(() =>{
    handleLoadPosts(0,postsPerPage);
    console.log("oi");
  },[handleLoadPosts,postsPerPage]);
    
  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue &&(
            <h1>Search Value: {searchValue}</h1>
        )}
        <br />
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      <br />
      <br />
      <br />
      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )}
      {filteredPosts.length === 0 && (
        <p>Não existem posts =(</p>
      )}
      <div className="button-container">
        {!searchValue &&(
          <Button text="novos posts" action={loadMorePosts} disabled={noMorePosts}/>
        )}
      </div>
    </section>
  ); 
}
// export class Home2 extends Component {
  // state = {
  //   posts: [],
  //   allPosts: [],
  //   page:0,
  //   postsPerPage:10,
  //   searchValue: '',
  // };

  // async componentDidMount() {
  //   await this.loadPosts();
  // }
  // componentDidUpdate(){
  //   console.log(this.props);
  // }


  
  // render() {
    
   
   
  // }
// }
