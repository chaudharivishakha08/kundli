const Query = require("../models/query");

exports.createQuery = async (req, res) => {
    try {
        const { phoneNumber, title, description,name } = req.body;
        // console.log(req.body);
        const query = new Query({ 
            mobileNo: phoneNumber, 
            title, 
            desc: description,
            userId: req.user.id,
            name,
        });
        await query.save();
        res.status(201).json({ message: 'Query submitted successfully' });
    } catch (error) {
        console.error('Query submission error:', error);
        res.status(500).json({ error: 'Failed to submit query' });
    }
}

exports.getQuery = async (req, res) => {
     try {
    const id = req.params.id;
    const query = await Query.findById(id);
    if (!query) {
      return res.status(404).json({ error: 'Query not found' });
    }
    res.status(200).json(query);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.getAllQueries = async (req, res) => {
    try {
    const quries = await Query.find();
    res.status(200).json(quries);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.getUserQueries = async (req, res) => {
    try {
    const quries = await Query.find({userId : req.user.id});
    
    res.status(200).json(quries);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

exports.changeStatus = async (req, res) => {
  try {
    const query = await Query.findById(req.body.queryId);
    if (!query) {
      return res.status(404).json({ error: 'Query not found' });
    }

    query.status = req.body.status;
    await query.save();

    res.status(200).json({ message: 'Status updated successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
