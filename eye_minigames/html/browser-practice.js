(() => {
    if (typeof GetParentResourceName === 'function') return;

    const upstreamFetch = window.fetch.bind(window);

    window.fetch = (input, init) => {
        const url = new URL(
            input instanceof Request ? input.url : input,
            window.location.href
        );

        if (
            url.origin !== 'https://eye_minigames' ||
            !['/result', '/closed'].includes(url.pathname)
        ) {
            return upstreamFetch(input, init);
        }

        let payload = {};
        if (typeof init?.body === 'string') {
            payload = JSON.parse(init.body);
        }

        window.parent.postMessage(
            {
                source: 'eye-browser-practice',
                action: 'game-finished',
                success: url.pathname === '/result' && payload.success === true,
            },
            window.location.origin
        );

        return Promise.resolve(new Response('ok', { status: 200 }));
    };
})();
