const Option = require('../models/options');
const Question = require('../models/questions');

module.exports.create = async function (req, res) {
  try {
    
    console.log(req.params,'55555');
    console.log(req.query,'66666');
    

    // Create an option with the correct title from req.body
    const opt = await Option.create({
      
      option: req.query.content,
      question: req.params.id,
    });

    // Add the vote URL to the option
    const updateOpt = await Option.findByIdAndUpdate(opt._id, {
      add_vote: `http://localhost:8000/api/v1/options/${opt._id}/add_vote`,
    });

    // Append the option to the question's options array
    const ques = await Question.findById(req.params.id);
    if (ques) {
      ques.options.push(updateOpt);
      await ques.save();
      console.log(ques);
      res.send(ques);
    } else {
      res.send('Question does not exist');
    }
  } catch (error) {
    console.error('Error in creating the option:', error.message);
    res.status(500).send('Failed to create the option');
  }
};

module.exports.add_vote = async function (req, res) {
  try {
    console.log(req.params.id);

    // Increment the vote count for the option
    const opt = await Option.findByIdAndUpdate(req.params.id, { $inc: { vote: 1 } });
    if (opt) {
      await opt.save();
      console.log(opt);
      res.send(opt);
    } else {
      res.send('Option does not exist');
    }
  } catch (error) {
    console.error('Error in adding vote:', error.message);
    res.status(500).send('Failed to add vote');
  }
};

module.exports.delete = async function (req, res) {
  try {
    console.log('id', req.params.id);

    const opt = await Option.findById(req.params.id);
    if (opt) {
      const quesId = opt.question;

      // Find the question to which the option belongs and remove the option from its options array
      const ques = await Question.findByIdAndUpdate(quesId, { $pull: { options: req.params.id } });

      // Delete the option
      await Option.findByIdAndDelete(req.params.id);

      console.log(ques);
      res.send('Option deleted');
    } else {
      res.send('Option not found');
    }
  } catch (error) {
    console.error('Error in deleting option:', error.message);
    res.status(500).send('Failed to delete option');
  }
};
