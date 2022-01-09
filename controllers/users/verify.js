const { BadRequest, NotFound } = require("http-errors");
const { nanoid } = require("nanoid");
const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const verify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw NotFound("User not found");
  } else if (user.verify === true) {
    throw BadRequest("Verification has already been passed");
  }

  const verificationToken = nanoid();

  const mail = {
    to: email,
    subject: "Email verification",
    html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Verify your email</a>`,
  };

  await sendEmail(mail);

  res.json({
    status: "ok",
    code: 200,
    body: {
      message: "Verification email sent",
    },
  });
};

module.exports = verify;
