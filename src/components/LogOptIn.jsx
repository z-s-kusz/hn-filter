import { createSignal } from 'solid-js';
import { getLoggingPreference, saveLoggingPreference } from '../services/logs-local-sorage';

export default function LogOptIn() {
    const [consentToLogging, setSonsentToLogging] = createSignal(getLoggingPreference());

    const toggleLogging = () => {
        const newValue = !consentToLogging();

        setSonsentToLogging(newValue);
        saveLoggingPreference(newValue);
    };

    return (
        <section class="log-preferences">
            <label>
            <input type="checkbox"
                checked={consentToLogging()}
                onchange={toggleLogging}
            />
            Allow logging of filtered posts.
            </label>
            <details>
                <summary>More Information on Logging</summary>
                <h3>Key Info</h3>
                <ul>
                    <li>Only post title, subject, and AI analysis are logged.</li>
                    <li>Only posts that match a filter are logged.</li>
                    <li>Logging is disabled by default and is opt-in.</li>
                    <li>Your logging preference is saved locally on your device.</li>
                    <li>Logs are visible to anyone that visits this site.</li>
                </ul>

                <h3>What is the Point of Logging?</h3>
                <p>
                    Posts that are filtered out by the app are reviewed by AI for potential resurfacing in the 'Posts for Haters'
                    (<abbr title="Posts For Haters">PFH</abbr>) section.
                    For more details on <abbr>PFH</abbr>, visit the <a href="/about">About Page</a>.
                </p>
                <p>
                    After noticing inconsistencies in the AI's results,
                    I added logging to evaluate the accuracy of the AI's assessment.
                    This allows me to see how well the AI is performing.
                </p>
            </details>
        </section>
    );
}
