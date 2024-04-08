/* fetch 66 items in hopes that I can still show 60 items post filtering
// if more than 6 items end up getting filtered I should remove some filters
// don't let this echo chamber get too small */
const fetchLimit = 66;
// only show 60 posts, if I'm trying to scroll past page 2 I should find something better to do
const postLimit = 60;

const getPosts = async () => {
    try {
        const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
        const postIds = await response.json();
        postIds.length = fetchLimit; // limit number by mutating the array
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

export { getPosts, postLimit };
