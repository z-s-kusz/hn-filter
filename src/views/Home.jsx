import { For, Match, Switch, createSignal, onCleanup } from 'solid-js';
import { TransitionGroup } from 'solid-transition-group';
import { getPosts as getHNPosts, postLimit } from '../services/hn-firebase';
import { filters, filteredItems, setFilteredItems } from '../stores/filters';
import FilteredOutPosts from '../components/FilteredOutPosts';
import ScrollToTop from '../components/ScrollToTop';

export default function Home() {
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal(false);
  const [posts, setPosts] = createSignal([]);

  const getPosts = async () => {
    setLoading(true);

    try {
      const postsJSON = await getHNPosts();
      const filteredPosts = filterPosts(postsJSON);
      if (filteredPosts.length > postLimit) filteredPosts.length = postLimit; // remove items past the limit by mutating
      setPosts(filteredPosts);
      setError(false);
    } catch(error) {
      console.error('caught err', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = (allPosts) => {
    if (filters.length < 1) {
      return allPosts;
    }

    const filteredPosts = allPosts.filter((post) => {
      let showPost = true;
      const title = post.title.toLowerCase();
      const author = post.by;
  
      filters.forEach((filter) => {
        if (filter.type === 'keyword') {
          const keyword = filter.value.toLowerCase();
          if (title.includes(keyword)) showPost = false;
        } else {
          if (author === filter.value) showPost = false;
        }
      });

      if (!showPost) {
        setFilteredItems([...filteredItems(), post]);
      }

      return showPost;
    });

    return filteredPosts;
  };

  const reload = () => {
    location.reload();
  };

  getPosts();

  onCleanup(() => {
    setFilteredItems([]);
  });

  return (
    <>
      <Switch>
        <Match when={!loading() && !error()}>
          <TransitionGroup name="slide-fade" appear>
              <For each={posts()}>
                {(post) => {
                  return <a class="post" href={post.url}>{post.title}</a>
                }}
              </For>

              <FilteredOutPosts />
              <ScrollToTop />
          </TransitionGroup>
        </Match>

        <Match when={loading()}>
          <span class="main-loading">loading...</span>
        </Match>

        <Match when={error()}>
          <div>
            Error loading posts.
            <button class="reload-btn" type="button" onClick={reload}>Reload</button>
             or see console for more details.
          </div>
        </Match>
      </Switch>
    </>
  )
}
