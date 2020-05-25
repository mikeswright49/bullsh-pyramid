const stub = new Proxy(
    {},
    {
        get: (target, key) => key,
    }
);
export default stub;
