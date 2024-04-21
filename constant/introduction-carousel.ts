import connectImage from '@/public/assets/background/connect-unsplash.jpg'
import createImage from '@/public/assets/background/create-unsplash.jpg'
import discoverImage from '@/public/assets/background/discover-unsplash.jpg'
import foreverImage from '@/public/assets/background/forever-unsplash.jpg'

export const carouselData = [
  {
    id: 1,
    title: "Connect",
    image: connectImage,
    Iframe: `<iframe src="https://giphy.com/embed/l41YvpiA9uMWw5AMU" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`,
    description: "Follow your favorite content creator, discover new tasks to do, and stay up-to-date with new viral trends.",
  },
  {
    id: 2,
    title: "Create",
    image: createImage,
    Iframe: `<iframe src="https://giphy.com/embed/Mah9dFWo1WZX0WM62Q" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`,
    description: "Save tasks, create new tasks, view tasks and steps to do, ask questions, and much more.",
  },
  {
    id: 3,
    title: "Discover",
    image: discoverImage,
    Iframe: `<iframe src="https://giphy.com/embed/YQju9WEfIqsQoaMECT" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`,
    description: "Explore your tasks, friends tasks, journey to its completion all in one place.",
  },
  {
    id: 4,
    title: "No ads",
    image: foreverImage,
    Iframe: `<iframe src="https://giphy.com/embed/l2QZQ5NkLXrtjeXrG" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`,
    description: "Built from the  ground-up to help you discover tasks and their steps to completion like never before.",
  }
]