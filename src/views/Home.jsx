import { For, Match, Switch, createSignal, onCleanup } from 'solid-js';
import { TransitionGroup } from 'solid-transition-group';
import { getPosts as getHNPosts, postLimit } from '../services/hn-firebase';
import { filters, filteredItems, setFilteredItems } from '../stores/filters';
import ScrollToTop from '../components/ScrollToTop';
import Post from '../components/Post';
import { checkForAISuggestedPosts } from '../stores/AISuggestedPosts';

export default function Home() {
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal(false);
  const [posts, setPosts] = createSignal([]);

  const getPosts = async () => {
    setLoading(true);

    try {
      const postsJSON = await getHNPosts();
      const nonNullPosts = postsJSON.filter(post => post);
      const filteredPosts = filterPosts(nonNullPosts);
      checkForAISuggestedPosts();
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
      let appliedFilter = null;
      const title = post.title.toLowerCase();
      const author = post.by;
  
      filters.forEach((filter) => {
        if (filter.type === 'keyword') {
          const keyword = filter.value.toLowerCase();

          // lazy yes but I need to account for potential kagi products that are one word (kagiRental or something idk)
          // will result in kagi posts that ALSO have 'packaging' in them to surface, I'll have to live with that
          const kagiFalseAlarm = keyword === 'kagi' && title.includes('packaging');

          if (title.includes(keyword) && !kagiFalseAlarm) {
            showPost = false;
            appliedFilter = filter;
          }
        } else if (filter.type === 'domain') {
          if (post.url && post.url.includes(filter.value)){
            showPost = false;
            appliedFilter = filter;
          }
        } else {
          if (author === filter.value) {
            showPost = false;
            appliedFilter = filter;
          }
        }
      });

      if (!showPost) {
        const filteredPost = {
          post,
          appliedFilter,
        };
        setFilteredItems([...filteredItems(), filteredPost]);
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
    <main>
      <Switch>
        <Match when={!loading() && !error()}>
          <TransitionGroup name="slide-fade" appear>
              <For each={posts()}>
                {(post) => {
                  return <Post post={post} />
                }}
              </For>

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
    </main>
  )
}
