export default function Post(props) {
    const hnCommentUrl = 'https://news.ycombinator.com/item?id=' + props.post.id;
    const link = props.post.url || hnCommentUrl;

    // affix file type if it is not declared in title
    // TODO handle others? I'm not sure HN allows other download types. Only seen pdf.
    const downloadType = (url, title) => {
        if (!url) return '';

        if (url.includes('.pdf') && !title.toLowerCase().includes('[pdf]')) {
            return ' [pdf]';
        } 
        return '';
    }

    const getBaseUrl = (url) => {
        if (!url) return '';

        const pathArray = url.split('/');
        const protocol = pathArray[0];
        const host = pathArray[2];
        const baseUrl = protocol + '//' + host;
        return baseUrl;
    };

    return (
        <div class="post">
            <a href={link}>
                {props.post.title}{downloadType(link, props.post.title)}
            </a>
            <div class="post-line-2">
                <span class="baseurl">{getBaseUrl(link)}</span>
                <a class="comments" href={hnCommentUrl}>View Comments</a>
            </div>
        </div>
    );
}
