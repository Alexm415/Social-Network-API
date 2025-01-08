const { Thought, User } = require("../models");

module.exports = {
  // getting all the thoughts
  async getThought(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // TODO: Add comments to the functionality of the createApplication method
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thought: req.body } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but found no user with that ID",
        });
      }

      res.json("Created the Thought 🎉");
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // TODO: Add comments to the functionality of the updateApplication method
  async updateThought(req, res) {
    try {
      const updateThought = await Thought.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!updateThought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json("Updated the thought");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // deleting thought
  async deleteThought(req, res) {
    try {
      const deleter = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!deleter) {
        return res.status(404).json({ message: "No thoughts with this id!" });
      }

      const user = await User.findOneAndUpdate(
        { thought: req.params.thoughtId },
        { $pull: { thought: req.params.thoughtId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought Deleted not the user",
        });
      }

      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  },
  // TODO: Add comments to the functionality of the addTag method
  async addReaction(req, res) {
    try {
      const Thoughts = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reaction: req.body } },
        { runValidators: true, new: true }
      );

      if (!Thoughts) {
        return res.status(404).json({ message: "No Thought with this id!" });
      }

      res.json(Thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // TODO: Add comments to the functionality of the addTag method
  async removeReaction(req, res) {
    try {
      const thoughts = await Thought.findOneAndDelete(
        { _id: req.params.thoughtId },
        { $pull: { reaction: { reactionId: req.params.reactionIdId } } },
        { runValidators: true, new: true }
      );

      if (!thoughts) {
        return res
          .status(404)
          .json({ message: "No application with this id!" });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
