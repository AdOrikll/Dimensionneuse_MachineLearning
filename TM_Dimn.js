const TeachableMachine = require("@sashido/teachablemachine-node");

const model = new TeachableMachine({
    modelUrl: "https://teachablemachine.withgoogle.com/models/u3cWdHHG1/"
});

exports.classify = async function(url) {
    return await model.classify({
        imageUrl: url,
    });
}
