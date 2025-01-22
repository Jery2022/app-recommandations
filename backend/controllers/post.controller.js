const PostModel = require('../models/post.model');

module.exports.getPosts = async (req, res) => {
    const posts = await PostModel.find();
    res.status(200).json(posts);
};

module.exports.setPosts = async (req, res) => {
    console.log(req.body);
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ message: "Paramètres manquants" });
    }  
    const post = await PostModel.create({
            title: req.body.title,
            content: req.body.content,
        });
        res.status(200).json(post); 
};

module.exports.editPost = async (req, res) => {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: "Post non trouvé" });
    }   
    const updatePost = await PostModel.findByIdAndUpdate(post, req.body, { new: true });
    res.status(200).json(updatePost); 
};

module.exports.deletePost = async (req, res) => {
    const post = await PostModel.findById(req.params.id);
    if (!post) {
        return res.status(404).json({ message: "Post non trouvé" });
    }   
    const dpost = await PostModel.deleteOne({ _id: req.params.id });
    console.log(dpost);
    res.status(200).json({ message: "Message avec l'ID "+req.params.id + " supprimé avec succès" }); 
};

module.exports.likePost = async (req, res) => {
    try {
        const post = await PostModel.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post non trouvé" });
        }   
        const updatePost = await PostModel.findByIdAndUpdate(post, { $inc: { likes: 1 } }, { new: true });
        res.status(200).json(updatePost); 
    } 
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Erreur serveur" });    
    }

};