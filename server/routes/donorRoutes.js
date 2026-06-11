router.post("/register", async (req, res) => {
  try {
    const { email, phone } = req.body;

    const existingDonor = await Donor.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingDonor) {
      return res.status(400).json({
        success: false,
        message: "Donor already registered!"
      });
    }

    const donor = new Donor(req.body);
    await donor.save();

    res.json({
      success: true,
      message: "Donor Registered Successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});