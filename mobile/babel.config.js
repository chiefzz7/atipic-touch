module.exports = function (api) {
    api.cache(true);
    return {
        presents: ['babel-present-expo'],
        plugins: ['nativewind/babel'],
    };
};
