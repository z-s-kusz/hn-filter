const postsLimit = 66;

const getPosts = async () => {
    try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
        const postIds = await response.json();
        postIds.length = postsLimit; // limit number by mutating the array
        const posts = await getPostDetails(postIds);

        return Promise.resolve(posts);
    } catch (error) {
        console.error('get posts err', error);
        return Promise.reject(error);
    }
};

const getPostDetails = async (postIds) => {
    try {
        const requests = postIds.map((postId) => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${postId}.json?print=pretty`).then((response) => {
                return response.json();
            });
        });
        const responses = await Promise.all(requests);

        return Promise.resolve(responses);
    } catch (error) {
        console.error('error getting post details', error);
        return Promise.reject('error getting post details');
    }
};

export { postsLimit, getPosts };
