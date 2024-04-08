export default function ScrollToTop() {
    const scroll = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    };

    return (
        <footer class="stt-footer">
            <button type="button" class="stt-button" onClick={scroll}>Scroll To Top</button>
        </footer>
    );
}
