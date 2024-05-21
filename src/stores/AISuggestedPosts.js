import { createSignal } from 'solid-js';
import { filteredItems } from './filters';
import { getSentimentAnalysis } from '../services/sentiment-analysis';

const [suggestedPosts, setSuggestedPosts] = createSignal([]);

const checkForAISuggestedPosts = async () => {
    let aiSuggestedPosts = [];
    const postsToCheck = filteredItems().filter((item) => item.appliedFilter.type === 'keyword');
    const analysisPromises = postsToCheck.map((item) => {
        const message = {
            id: item.post.id,
            subject: item.appliedFilter.value,
            text: item.post.title,
            response: '',
        };
        return getSentimentAnalysis(message);
    });

    try {
        const values = await Promise.all(analysisPromises);
        values.forEach((value, i) => {
            if (value.response === 'negative') aiSuggestedPosts.push(postsToCheck[i]);
        });

        setSuggestedPosts(aiSuggestedPosts);
    } catch (error) {
        console.error(error);
    }
};

export { suggestedPosts, checkForAISuggestedPosts };
