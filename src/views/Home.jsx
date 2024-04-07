import { For, Match, Switch, createSignal } from 'solid-js';
import { getPosts as getHNPosts } from '../api/hn-firebase';

export default function Home() {
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal(false);
  const [posts, setPosts] = createSignal([]);

  const getPosts = async () => {
    setLoading(true);

    try {
      const postsJSON = await getHNPosts();
      setPosts(postsJSON);
      setError(false);
    } catch(error) {
      console.error('caught err', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  getPosts();

  return (
    <>
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
