import Work from "../model/work.js";

export const getWorks = async (req, res) => {
  try {
    const works = await Work.find();
    return res.status(200).json(works);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getWork = async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    return res.status(200).json(work);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addWork = async (req, res) => {
  try {
    const work = await Work.create(req.body);
    return res
      .status(200)
      .json({ data: work, message: "Work Added Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateWork = async (req, res) => {
  try {
    const work = await Work.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ data: work, message: "Work Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteWork = async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);
    return res.status(200).json({
      data: req.params.work_id,
      message: "Skill deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
