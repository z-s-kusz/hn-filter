import { TransitionGroup } from 'solid-transition-group';

export default function About() {
    return (
        <TransitionGroup name="slide-fade" appear>
            <h2>What is this site?</h2>
            <p>
                A Hacker News browser that uses the official&nbsp;
                <a href="https://github.com/HackerNews/API">hacker news api</a>.
            </p>
            <p>Add filters to prevent posts from appearing in the HN feed. Filter by keyword, author or domain.</p>

            <h2>What is the 'Posts For Haters' Section?</h2>
            <p>
                With the keyword filter, you can easily hide posts that discuss specific topics you're not interested in.
                However, we understand that sometimes it's not just about avoiding certain content, but also reveling in negativity.
            </p>
            <p>
                That's why we've introduced the "Posts for Haters" section.
                When you filter out posts by a keyword, our system identifies and resurfaces posts that negatively mention the keyword.
                This way, you can steer clear of the content you want to avoid but still be a hater.
            </p>

            <h2>How do you decide what goes in the 'Posts for Haters' section?</h2>
            <p>
                When an item is filtered via keyword, the app will use ChatGPT 3.5 Turbo to perform a sentiment analysis on the title.
                If the AI determines that the title portrays a negative sentiment about the keyword then the article will be resurfaced in the section.
                Posts that ChatGPT determines to be 'neutral' or 'positive' in regards to the keyword will stay hidden.
            </p>
    
            <hr/>
            <footer>Favicon by <a target="_blank" href="https://icons8.com">Icons8</a></footer>
        </TransitionGroup>
    );
}
