//import { useState, useEffect } from 'react';
import BlogList from './BlogList';
import useFetch from './useFetch';

const Home = () => {

    const { data:blogs, isPending, error } = useFetch('http://localhost:8000/blogs');

    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPending && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title ='All blogs!'/>}
            {/* ^ this is all props! && both sides must evaluate to true for the blogs to appear, and not be left as null */}
        </div>
     );
}
 
export default Home;