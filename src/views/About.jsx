import { TransitionGroup } from 'solid-transition-group';

export default function About() {
    return (
        <TransitionGroup name="slide-fade" appear>
            <p>Add filters to prevent posts from appearing in the HN feed. Filter by keyword or author.</p>
            <footer>Favicon by <a target="_blank" href="https://icons8.com">Icons8</a></footer>
        </TransitionGroup>
    );
}
