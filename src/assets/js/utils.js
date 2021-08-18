// utils to delay promise

function NavLinks(id) {
  let data = [
    { route: "About", title: "About" },
    { route: "Research", title: "Research" },
    { route: "Gallery", title: "Gallery" },
    { route: "Testimonials", title: "Testimonials" },
    { route: "WhatWeOffer", title: "What We Offer" },
    { route: "Shop", title: "Shop" },
    { route: "MediaBlogs", title: "Media & Blogs" },
    { route: "Contact", title: "Contact" },
  ];
  return data.find(function (object) {
    return object.id === id;
  });
}

function AgeGroups() {
  return [
    {
      id: 1,
      title: "EYFS",
      img: "lightgreen-ribbon",
      ages: "3-4",
      color: "#009BDA",
      type: "infant",
    },
    {
      id: 2,
      title: "KS1",
      img: "orange-ribbon",
      ages: "5-7",
      color: "#1A9C8A",
      type: "member",
    },
    {
      id: 3,
      title: "LKS2",
      img: "red-ribbon",
      ages: "8-9",
      color: "#934F99",
      type: "member",
    },
    {
      id: 4,
      title: "UKS2",
      img: "blue-ribbon",
      ages: "10-11",
      color: "#D44792",
      type: "member",
    },
  ];
}

export { NavLinks, AgeGroups };
