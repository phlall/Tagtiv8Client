// utils to delay promise


function NavLinks() {
  let data = [
    { route: "About", title: "About"},
    { route: "Research", title: "Research"},
    { route: "Gallery", title: "Gallery"},
    { route: "Testimonials", title: "Testimonials"},
    { route: "WhatWeOffer", title: "What We Offer"},
    { route: "Shop", title: "Shop"},
    { route: "MediaBlogs", title: "Media & Blogs"},
    { route: "Contact", title: "Contact"},


]
  return data.find(function (object) {
    return object.id === id;
  });
}



export {
  NavLinks
};
