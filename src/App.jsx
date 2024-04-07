import { For, Match, Switch, createSignal } from 'solid-js';

function App() {
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal(false);
  const [posts, setPosts] = createSignal([]);
  const postsLimit = 66;

  const getPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
      const postIds = await response.json();
      postIds.length = postsLimit; // limit number by mutating the array
      const postsJSON = await getPostDetails(postIds);

      setPosts(postsJSON);
      setError(false);
    } catch(error) {
      console.error('caught err', error);
      setError(true);
    } finally {
      setLoading(false);
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

  getPosts();

  return (
    <>
      <h1>Filtered HN Browser</h1>
      <Switch>
        <Match when={!loading() && !error()}>
          <For each={posts()}>
            {(post) => {
              return <a class="post" href={post.url}>{post.title}</a>
            }}
          </For>
        </Match>

        <Match when={loading()}>
          <span>loading...</span>
        </Match>

        <Match when={error()}>
          <div>
            Error loading posts.
            <button type="button" onClick={getPosts}>Reload</button>
             or see console for more details.
          </div>
        </Match>
      </Switch>
    </>
  )
}

export default App;
