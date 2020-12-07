

exports.classify = async function(url) {
    const results = await model.classify({
        imageUrl: url,
    });
    console.log(results)
    return results
}
