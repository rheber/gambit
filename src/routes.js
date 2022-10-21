import Home from './routes/Home.svelte';

export default {
    // The catch-all route must always be last
    '*': Home,
};
