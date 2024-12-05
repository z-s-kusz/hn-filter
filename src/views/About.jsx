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

            <p>
                <em>New!</em>&nbsp;
                Checkout the most recent issues of Frontend Focus or Javascript Weekly in the extras menu.
                Stories in both newsletters are filtered by your keyword filters.
            </p>

            <h2>What is the 'Posts For Haters' Section?</h2>
            <p>
                With the keyword filter, you can easily hide posts that discuss topics you're not interested in.
                That makes it easy to silence hype cycles around tools, frameworks, games or current events.
                However it can be nice to see the eventual posts criticizing these things once the hype dies down.
            </p>
            <p>
                That's why I added the "Posts for Haters" section.
                When you filter out posts by a keyword, the app identifies and resurfaces posts that negatively mention the keyword.
                This way, you can steer clear of the content you want to avoid but still be a hater.
            </p>

            <h2>How do you decide what goes in the 'Posts for Haters' section?</h2>
            <p>
                When an item is filtered via keyword, the app will use ChatGPT 4.0-Mini to perform a sentiment analysis on the title.
                If the AI determines that the title portrays a negative sentiment about the keyword then the article will be resurfaced in the section.
                Posts that ChatGPT determines to be 'neutral' or 'positive' in regards to the keyword will stay hidden.
            </p>
        
            <p>
                The reason I decided to use an LLM for this task instead of other sentiment analysis tools
                is that other tools don't allow for analysis by subject.
                For example, in the sentence
                &nbsp;<code>“Apples are better than oranges.”</code>&nbsp;
                other tools determine that the sentiment is positive because of the use of the word “better.”
                But what if we wanted to know the sentiment in regards to “oranges” specifically?
                As humans we understand that this sentence is only positive toward apples and is at best neutral toward oranges.
                From my testing with ChatGPT I found it's ~95% accurate and in agreement with me
                when I asked it to perform sentiment analysis with a specific subject in mind.
                I've since added logging to verify the analysis it provides.
            </p>
    
            <hr/>
            <footer>Favicon by <a target="_blank" href="https://icons8.com">Icons8</a></footer>
        </TransitionGroup>
    );
}
