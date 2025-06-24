const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = async (req, res) => {
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author", } }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing You Requested for does not exist!");
        return res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", { listing });
}


module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    let { title, description, price, location, country } = req.body.listing;

    const newListing = new Listing({
        title,
        description,
        image: { url , filename },
        price,
        location,
        country,
    });

    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");

}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing You Requested for does not exist!");
        return res.redirect("/listings");
    }

    res.render("listings/edit.ejs", { listing });
}

module.exports.updateListing = async (req, res) => {

    let { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, {...req.body.listing });

    // // Update the Listing with the new data..
    // listing.title = req.body.listing.title;
    // listing.description = req.body.listing.description;
    // listing.price = req.body.listing.price;
    // listing.location = req.body.listing.location;
    // listing.country = req.body.listing.country;

    if ( typeof req.file !== "undefined") {
      let url = req.file.path;
      let filename = req.file.filename;
      listing.image =  { url , filename };
      await listing.save();
    }
    

    // // Handle image update
    // if (req.body.listing.image) {
    //     // If image is a string (from form), update url
    //     listing.image.url = req.body.listing.image;
    // } else if (req.body.listing.image && req.body.listing.image.url) {
    //     // If image is an object with url property
    //     listing.image.url = req.body.listing.image.url;
    // }

    // await listing.save();

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    // console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
}