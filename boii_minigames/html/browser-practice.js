(() => {
    if ('GetParentResourceName' in window) return;

    window.GetParentResourceName = () => 'browser-practice';

    const originalPost = window.$.post.bind(window.$);
    window.$.post = (url, data, ...args) => {
        const endpoint = new URL(url, window.location.href);
        if (endpoint.origin !== `https://${window.GetParentResourceName()}`) {
            return originalPost(url, data, ...args);
        }

        let result = data;
        if (typeof result === 'string') {
            result = JSON.parse(result);
        }

        window.parent.postMessage(
            {
                source: 'boii-browser-practice',
                action: 'game-finished',
                callback: endpoint.pathname.split('/').pop(),
                success: result.success,
            },
            window.location.origin
        );

        return window.$.Deferred().resolve(result).promise();
    };
})();
