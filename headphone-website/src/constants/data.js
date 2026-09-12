import cat1 from "../assets/categories/1.png"
import cat2 from "../assets/categories/2.png"
import cat3 from "../assets/categories/3.png"
import cat4 from "../assets/categories/4.png"
import cat5 from "../assets/categories/5.png"
import cat6 from "../assets/categories/6.png"

import product1 from "../assets/products/1.jpg";
import product2 from "../assets/products/2.jpg";
import product3 from "../assets/products/3.jpg";
import product4 from "../assets/products/4.jpg";
import product5 from "../assets/products/5.jpg";
import product6 from "../assets/products/6.jpg";
import product7 from "../assets/products/7.jpg";
import product8 from "../assets/products/8.jpg";

import heroImg1 from "../assets/sliders/1.png"
import heroImg2 from "../assets/sliders/2.png"
import heroImg3 from "../assets/sliders/3.png"
import heroImg4 from "../assets/sliders/4.png"

import bnnr1 from "../assets/banners/1.png"
import bnnr2 from "../assets/banners/3.png"

export const categories = [
  {
    id: 0,
    cat: "EARPHONE",
    title: "Enjoy With",
    image: cat1,
    bg:"linear-gradient(300deg,#363636 13%,#222 38%)"
  },
  {
    id: 1,
    cat: "GADGETS",
    title: "New Wear",
    image: cat2,
    bg:"radial-gradient(at center center,#fec62e 0%,#fec62e 100%)"
  },
  {
    id: 2,
    cat: "LAPTOP",
    title: "Trend Devices",
    image: cat3,
    bg:"linear-gradient(90deg, #f42c37 61%, #ff4e59 100%)"
  },
  {
    id: 3,
    cat: "CONSOLE",
    title: "Best Gaming",
    image: cat4,
    bg:"linear-gradient(to bottom, #CCCCCC 0%, #B7B8BC 44%, #86888C 100%)"
  },
  {
    id: 4,
    cat: "oculus",
    title: "Play Game",
    image: cat5,
    bg:"linear-gradient(rgb(23, 140, 80) 0%, rgb(45, 208, 111) 100%)"
  },
  {
    id: 5,
    cat: "speaker",
    title: "New Amazon",
    image: cat6,
    bg:"linear-gradient(180deg,#1478ff 0%,#1891ff 100%)"
  },
];

export const products = [
  {
    id: 0,
    title: "Beats ",
    price: "$995",
    image: product1,
  },
  {
    id: 1,
    title: "Rocky Mountain",
    price: "$895",
    image: product2,
  },
  {
    id: 2,
    title: "Game Console Controller Cable",
    price: "$695",
    image: product3,
  },
  {
    id: 3,
    title: "White EliteBook Tablet 810",
    price: "$595",
    image: product4,
  },
  {
    id: 4,
    title: "Gore Wear C7",
    price: "$495",
    image: product5,
  },
  {
    id: 5,
    title: "Gore Wear C7",
    price: "$795",
    image: product6,
  },
  {
    id: 6,
    title: "Beats",
    price: "$995",
    image: product7,
  },
  {
    id: 7,
    title: "Smartwatch 2.0 LTE Wifi",
    price: "$995",
    image: product8,
  },
];


export const features = [
    {
        id: 0,
        icon: "bi bi-truck",
        title: "Free Shipping",
        desc: "Free Shipping On All Order",
        },
        {
        id: 1,
        icon: "bi bi-patch-check",
        title: "Money Guarantee ",
        desc: "30 Day Money Back",
        },
        {
        id: 2,
        icon: "bi bi-headphones",
        title: "Online Support 24/7 ",
        desc: "Technical Support 24/7",
        },
        {
        id: 3,
        icon: "bi bi-wallet2",
        title: "Secure Payment",
        desc: "All Cards Accepted  ",
    }
]

export const heroSlider = [
    {
      id: 0,
      title: "Apple AirPods Max Wireless Over-Ear Headphones.",
      desc:
        "Active Noise Cancelling, Transparency Mode, Spatial Audio, Digital Crown for Volume Control.",
      price: "$779.99",
      image:heroImg1,
      bg: "radial-gradient(50% 50% at 50% 50%, #C7F6D0 0%, #7CB686 92%)",
    },
    {
      id: 1,
      title: "AirPods Max — Cool Blue",
      desc: "Comfortable fit, premium sound — now in blue.",
      price: "$779.99",
      image: heroImg2,
      bg: "radial-gradient(50% 50% at 50% 50%, #D1E4F6 0%, #5F9CCF 100%)",
    },
    {
      id: 2,
      title: "AirPods Max — Coral",
      desc: "Warm tones, excellent presence.",
      price: "$779.99",
      image: heroImg3,
      bg: "radial-gradient(50% 50% at 50% 50%, #FFB7B2 0%, #ED746E 100%)",
    },
    {
      id: 3,
      title: "AirPods Max — White",
      desc: "Classic look, crystal clear audio.",
      price: "$779.99",
      image:heroImg4,
      bg: "radial-gradient(50% 50% at 50% 50%, #D7D7D7 0%, #979797 100%)",
    },
  ];


export const bannerDes = {
  discount: "20% OFF ",
  tag:"Fine Smile  ",
  date:"1 Aug to 31 Aug",
  subTitle:"Beats Solo Air",
  title: "Summer Sale",
  desc: "Company that’s grown from 270 to 480 employees in the last 12 months. ",
  image:bnnr1,
  bg:"radial-gradient(at center center,#f24c55 0%,#f42c37 40%)"

}


export const bannerDes1 = {
  discount: "20% OFF ",
  tag:"HAPPY HOURSE",
  date:"15 Sept To 7 Sept ",
  subTitle:"Beats Solo Air  ",
  title: "Summer Sale  ",
  desc: "Company that’s grown from 270 to 480 employees in the last 12 months. ",
  image:bnnr2,
  bg:"radial-gradient(at top center,#51ec90 10%,#2dcc6e 46%)"
}