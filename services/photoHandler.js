const Photo = require("../models/Photo");

exports.createPhoto = async ({ imgTitle, imgDescription, backPath }) => {
  try {
    const newPhoto = {
      imgTitle: imgTitle,
      imgDescription: imgDescription,
      imgPath: backPath,
    };
    const photo = new Photo(newPhoto);

    await photo.save();

    return photo;
  } catch (error) {
    console.log(error);
  }
};
